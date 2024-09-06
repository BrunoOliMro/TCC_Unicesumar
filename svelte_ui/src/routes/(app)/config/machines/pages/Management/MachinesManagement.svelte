<script lang="ts">
  import Title from "$lib/components/Texts/Title.svelte";
  import {
    findCompanyMachines,
    findMachineGroups,
  } from "../../api/machines.api";
  import type {
    CompanyMachineInfo,
    MachineGroup,
  } from "../../types/machines.types";
  import CompanyMachineCard from "./components/cards/CompanyMachineCard.svelte";
  import AddMachineForm from "./components/forms/AddMachineForm.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import type { AddMachineData } from "./types/machines_management.types";
  import { onDestroy, onMount } from "svelte";
  import SimplePopup from "$lib/components/Popups/SimplePopup.svelte";
  import EditMachineForm from "./components/forms/EditMachineForm.svelte";

  let searchMachine: string = "";

  let selectedMachineId = 0;
  let selectedMachine = "";

  let companyMachines: CompanyMachineInfo[] = [];
  let companyMachinesStream: EventSource | null;

  let editPopupIsOpen = false;

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

  const fetchMachineGroups = async (): Promise<MachineGroup[]> => {
    const res = await findMachineGroups();
    return res.data;
  };

  const machineGroups: Promise<MachineGroup[]> = fetchMachineGroups();

  const handleMachineAdd = (
    machineInfo: AddMachineData,
    machineId: number,
    machineIndex: number,
    machineGroup?: string
  ) => {
    companyMachines.push({
      id: machineId,
      efficiency: machineInfo.efficiency,
      machine: machineInfo.machine,
      machine_group: machineGroup,
      machine_group_id: machineInfo.machineGroupId,
      machine_index: machineIndex,
      month_load: machineInfo.monthLoad,
      working_days: machineInfo.workingDays,
    });
    companyMachines = companyMachines;
  };

  const handleMachineEdit = (machineInfo: CompanyMachineInfo) => {
    const editedMachineIndex = companyMachines.findIndex(
      (machine) => machine.id === machineInfo.id
    );
    if (editedMachineIndex === -1) return;
    Object.assign(companyMachines[editedMachineIndex], {
      efficiency: machineInfo.efficiency,
      machineGroupId: machineInfo.machine_group_id,
      monthLoad: machineInfo.month_load,
      workingDays: machineInfo.working_days,
      machine_group: machineInfo.machine_group,
    });
    companyMachines = companyMachines;
  };

  const handleMachineDelete = (machineId: number) => {
    companyMachines = companyMachines.filter(
      (machineInfo) => machineInfo.id !== machineId
    );
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
    w-full h-full justify-between
    machinesManagement"
>
  <div
    class="
flex flex-col
w-1/2 h-full
viewMachines"
  >
    <div
      class="
w-full
flex justify-end items-center
mb-2
searchInputDiv"
    >
      <SearchInput bind:value={searchMachine}></SearchInput>
    </div>
    <div
      class="
w-full h-[650px]
grid grid-cols-1
content-start
gap-base
px-base
overflow-y-scroll
currentMachines"
    >
      {#each companyMachines as machine, i}
        {#if searchMachine.trim() === "" || !searchMachine || !machine.machine_group || machine.machine_group
            .toUpperCase()
            .includes(searchMachine.toUpperCase()) || (machine.machine && machine.machine
              .toUpperCase()
              .includes(searchMachine.toUpperCase()))}
          <CompanyMachineCard
            on:machineDeleted={() => handleMachineDelete(machine.id)}
            on:editMachine={() => {
              selectedMachine = `${machine.machine}-${machine.machine_index}`;
              selectedMachineId = machine.id;
              editPopupIsOpen = true;
            }}
            companyMachineInfo={machine}
          ></CompanyMachineCard>
        {/if}
      {/each}
    </div>
  </div>
  <div
    class="
        w-1/2 h-full
        flex flex-col items-start
        pl-box
        gap-base
        handleMachines"
  >
    {#await machineGroups then groups}
      <div
        class="
        flex flex-col justify-start items-center
        border-solid border-2 border-light-gray
        rounded
        w-full h-gap-vertical-1/2-box
        pt-base
        addMachine"
      >
        <Title text="Adicionar máquina"></Title>
        <AddMachineForm
          machineAdded={(
            machineInfo,
            machineId,
            machineIndex,
            machineGroup
          ) => {
            handleMachineAdd(
              machineInfo,
              machineId,
              machineIndex,
              machineGroup
            );
          }}
          machineGroups={groups}
        ></AddMachineForm>
      </div>
      <!-- <div
        class="
        flex flex-col justify-start items-center
        w-full h-gap-vertical-1/2-box
        border-solid border-2 border-light-gray
        rounded
        py-base
        editMachine"
      >
        <Title text="Editar máquina"></Title>
        {#key selectedMachineId}
          <EditMachineForm
            bind:machineId={selectedMachineId}
            machineEdited={(machineInfo) => {
              handleMachineEdit(machineInfo);
            }}
            machineGroups={groups}
            bind:selectedMachine={currentEditMachine}
          ></EditMachineForm>
        {/key}
      </div> -->
      <SimplePopup h="h-[35%]" w="w-[50%]" bind:isOpen={editPopupIsOpen}>
        <EditMachineForm
          on:machineEdited={(ev) => {
            handleMachineEdit(ev.detail);
          }}
          machineGroups={groups}
          bind:machineId={selectedMachineId}
          bind:selectedMachine
        ></EditMachineForm>
      </SimplePopup>
    {/await}
  </div>
</div>
