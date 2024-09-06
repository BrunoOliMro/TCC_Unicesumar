<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Title from "$lib/components/Texts/Title.svelte";
  import { findCompanyMachines } from "../../api/machines.api";
  import type { CompanyMachineInfo } from "../../types/machines.types";
  import {
    addMachineMaintenance,
    findMachinesMaintenance,
  } from "./api/machines_maintenance.api";
  import MaintenanceCard from "./components/MaintenanceCard.svelte";
  import type { MachineMaintenance } from "./types/machines_maintenance.types";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import DateInput from "$lib/components/Inputs/DateInput.svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import { onDestroy, onMount } from "svelte";
  import TimeInput from "$lib/components/Inputs/TimeInput.svelte";
  import { Datetime } from "../../../../../../lib/utils/Datetime";

  let selectedMachine: CompanyMachineInfo;
  let isAddingMaintenance = false;

  let searchMachine = "";

  const maintenanceInfo: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  } = {
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  };

  const handleAddMaintenance = async () => {
    isAddingMaintenance = true;
    const res = addMachineMaintenance({
      machineId: selectedMachine.id,
      machineIndex: selectedMachine.machine_index,
      startDate: maintenanceInfo.startDate,
      endDate: maintenanceInfo.endDate,
      startTime: maintenanceInfo.startTime,
      endTime: maintenanceInfo.endTime,
    });
    ToasterHandler.createPromiseToast({
      loadingMessage: "Adicionando manutenção",
      promise: res,
    })
      .then(() => {
        machinesMaintenance = fetchMachinesMaintenance();
        isAddingMaintenance = false;
      })
      .catch(() => {
        isAddingMaintenance = false;
      });
  };

  const fetchMachinesMaintenance = async (): Promise<{
    [uuid: string]: MachineMaintenance[];
  }> => {
    const res = await findMachinesMaintenance();
    const parsedMachinesMaintenance = res.data.reduce(
      (
        parsedMaintenanceData: { [uuid: string]: MachineMaintenance[] },
        currMaintenace: MachineMaintenance
      ) => {
        if (!parsedMaintenanceData[currMaintenace.maintenance_uuid])
          parsedMaintenanceData[currMaintenace.maintenance_uuid] = [];
        parsedMaintenanceData[currMaintenace.maintenance_uuid].push(
          currMaintenace
        );

        return parsedMaintenanceData;
      },
      {}
    );

    return parsedMachinesMaintenance;
  };

  let machinesMaintenance: Promise<{ [uuid: string]: MachineMaintenance[] }> =
    fetchMachinesMaintenance();

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
  machinesMaintenance"
>
  <div
    class="
  h-full w-1/2
  flex flex-col gap-base
  viewMaintenances"
  >
    <div
      class="
  w-full
  flex items-center justify-end
  searchDiv"
    >
      <SearchInput bind:value={searchMachine}></SearchInput>
    </div>
    {#await machinesMaintenance}
      <Loader></Loader>
    {:then allMaintenances}
      <div
        class="
        w-full h-[650px]
        grid grid-cols-1
        content-start
        gap-base
        px-base
        overflow-y-scroll
        currentMaintenances"
      >
        {#each Object.entries(allMaintenances) as [uuid, maintenances], i}
          {#if searchMachine.trim() === "" || !searchMachine || (maintenances[0].machine && maintenances[0].machine
                .toUpperCase()
                .includes(searchMachine.toUpperCase()))}
            <h1>
              <MaintenanceCard
                onDelete={() => {
                  machinesMaintenance = fetchMachinesMaintenance();
                }}
                params={{
                  index: i,
                  machine: maintenances[0].machine,
                  machineIndex: maintenances[0].machine_index,
                  startDate: maintenances[0].start_date,
                  endDate: maintenances.at(-1)?.end_date ?? "",
                  startTime: maintenances[0].start_time,
                  endTime: maintenances.at(-1)?.end_time ?? "",
                  machineId: maintenances[0].machine_id,
                  maintenanceUuid: uuid,
                }}
              />
            </h1>
          {/if}
        {/each}
      </div>
    {/await}
  </div>
  <div
    class="
      h-full w-1/2
      px-base
      addMaintenance"
  >
    <div
      class="
        w-full h-1/2
        flex flex-col items-center justify-between
        gap-base p-base
        border-solid border-2 border-light-gray
        rounded
        maintenanceForm"
    >
      <Title text="Adicionar manutenção"></Title>
      <div
        class="
      w-full
      grid grid-cols-3
      gap-base
      inputs"
      >
        <InputForm label="Máquina" type="vertical">
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
        <InputForm label="Data inicial" type="vertical">
          <DateInput bind:value={maintenanceInfo.startDate}></DateInput>
        </InputForm>
        <InputForm label="Data final" type="vertical">
          <DateInput bind:value={maintenanceInfo.endDate}></DateInput>
        </InputForm>
        <InputForm label="Hora inicial" type="vertical">
          <TimeInput bind:value={maintenanceInfo.startTime}></TimeInput>
        </InputForm>
        <InputForm label="Hora final" type="vertical">
          <TimeInput bind:value={maintenanceInfo.endTime}></TimeInput>
        </InputForm>
      </div>
      <div
        class="
        w-full
        pt-base
        flex justify-end items-center
        addShiftButton"
      >
        <Button text="Adicionar" clickFunction={handleAddMaintenance}></Button>
      </div>
    </div>
  </div>
</div>
