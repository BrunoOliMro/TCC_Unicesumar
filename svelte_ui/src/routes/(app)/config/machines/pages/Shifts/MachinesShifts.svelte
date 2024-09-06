<script lang="ts">
  import Title from "$lib/components/Texts/Title.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import type { CompanyMachineInfo } from "../../types/machines.types";
  import {
    addMachineShift,
    findMachinesShifts,
  } from "./api/machines_shifts.api";
  import ShiftCard from "./components/ShiftCard.svelte";
  import type { MachineShiftInfo } from "./types/machines_shifts.types";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import TimeInput from "$lib/components/Inputs/TimeInput.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import { findCompanyMachines } from "../../api/machines.api";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import { onDestroy, onMount } from "svelte";

  let searchMachine = "";

  let selectedMachine: CompanyMachineInfo;

  let newGroup: string;
  let machineShifts: {
    startTime: string;
    endTime: string;
  } = {
    startTime: "",
    endTime: "",
  };

  const handleAddMachineShift = async (): Promise<void> => {
    const promise = addMachineShift({
      machineIndex: selectedMachine.machine_index,
      machineId: selectedMachine.id,
      startTime: machineShifts["startTime"],
      endTime: machineShifts["endTime"],
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando turno",
    });

    promise.then(() => {
      currentMachineShifts = fetchMachinesShifts();
    });
  };

  let companyMachines: CompanyMachineInfo[] = [];
  let companyMachinesStream: EventSource | null;

  const startStreams = async (): Promise<void> => {
    companyMachinesStream = await findCompanyMachines();
    companyMachinesStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        companyMachinesStream?.close();
        companyMachinesStream = null;
        return;
      }
      companyMachines = companyMachines.concat(JSON.parse(ev.data));
    };
    companyMachinesStream.onerror = (err) => {
      companyMachinesStream?.close();
      companyMachinesStream = null;
    };
  };

  const fetchMachinesShifts = async (): Promise<MachineShiftInfo[]> => {
    const res = await findMachinesShifts();
    return res.data;
  };

  let currentMachineShifts: Promise<MachineShiftInfo[]> = fetchMachinesShifts();

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (companyMachinesStream) companyMachinesStream.close();
    companyMachinesStream = null;
  });
</script>

<div
  class="
  flex
  w-full h-full
  gap-base
  machinesShiftsAndGroups"
>
  <div
    class="
  h-full w-1/2
  flex flex-col
  gap-base
  currShifts"
  >
    <div
      class="
  w-full
  flex items-center justify-end
  searchDiv"
    >
      <SearchInput bind:value={searchMachine}></SearchInput>
    </div>
    {#await currentMachineShifts}
      <Loader></Loader>
    {:then shifts}
      <div
        class="
        h-[650px] w-full
        grid grid-cols-1
        content-start
        px-base gap-base
        overflow-y-scroll
        currentShifts"
      >
        {#each shifts as shift, i}
          {#if searchMachine.trim() === "" || !searchMachine || (shift.machine && shift.machine
                .toUpperCase()
                .includes(searchMachine.toUpperCase()))}
            <ShiftCard
              shiftDeleted={() => {
                currentMachineShifts = fetchMachinesShifts();
              }}
              index={i}
              machineId={shift.machine_id}
              shiftId={shift.id}
              machine={`${shift.machine}-${shift.machine_index}`}
              start={shift.start_time}
              end={shift.end_time}
            ></ShiftCard>
          {/if}
        {/each}
      </div>
    {/await}
  </div>
  <div
    class="
  h-full w-1/2
  flex flex-col
  gap-base
  forms"
  >
    <div
      class="
          h-gap-vertical-1/2-box w-full
          flex flex-col
          gap-base
          border-solid border-2 border-light-gray
          rounded
          p-base
          items-center justify-between
          addMachineForm"
    >
      <Title text="Adicionar turno"></Title>
      <div
        class="
        w-full
        flex items-center justify-between
        gap-base
        times"
      >
        <InputForm type="vertical" label="Máquina">
          <SelectInput
            bind:value={selectedMachine}
            options={companyMachines.map((companyMachineInfo) => {
              return {
                text: `${companyMachineInfo.machine}-${companyMachineInfo.machine_index}`,
                value: companyMachineInfo,
              };
            })}
          ></SelectInput>
        </InputForm>
        <InputForm label="Hora inicial" type="vertical">
          <TimeInput bind:value={machineShifts.startTime}></TimeInput>
        </InputForm>
        <InputForm label="Hora final" type="vertical">
          <TimeInput bind:value={machineShifts.endTime}></TimeInput>
        </InputForm>
      </div>
      <div
        class="
      w-full
      pt-base
      flex justify-end items-center
      addShiftButton"
      >
        <Button text="Adicionar" clickFunction={handleAddMachineShift}></Button>
      </div>
    </div>
  </div>
</div>
