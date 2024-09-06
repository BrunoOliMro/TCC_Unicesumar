<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import { findCompanyMachines } from "../../../machines/api/machines.api";
  import { findCompanyItems } from "../Items/api/items.api";
  import type {
    CompanyItemProcessInfo,
    GeneralItemInfo,
  } from "../Items/types/items.types";
  import {
    addItemProcess,
    editItemProcess,
    findCompanyProcesses,
  } from "./api/processes.api";
  import type {
    AddItemProcess,
    EditItemProcess,
  } from "./types/processes.types";
  import ItemProcessCard from "./components/ItemProcessCard.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import type { CompanyMachineInfo } from "../../../machines/types/machines.types";
  import { onDestroy, onMount } from "svelte";

  let searchProcess = "";

  let machinesStream: EventSource | null;
  let itemsStream: EventSource | null;
  let processesStream: EventSource | null;

  let companyProcesses: CompanyItemProcessInfo[] = [];
  let companyMachines: CompanyMachineInfo[] = [];
  let companyItems: { item: string; id: number }[] = [];

  const startStreams = async () => {
    processesStream = await findCompanyProcesses();
    itemsStream = await findCompanyItems();
    machinesStream = await findCompanyMachines();

    processesStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        processesStream?.close();
        processesStream = null;
        return;
      }
      companyProcesses = companyProcesses.concat(JSON.parse(ev.data));
    };
    processesStream.onerror = (err) => {
      processesStream?.close();
      processesStream = null;
    };
    itemsStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        itemsStream?.close();
        itemsStream = null;
        return;
      }
      companyItems = companyItems.concat(JSON.parse(ev.data));
    };
    itemsStream.onerror = (err) => {
      itemsStream?.close();
      itemsStream = null;
    };
    machinesStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        machinesStream?.close();
        machinesStream = null;
        return;
      }
      companyMachines = companyMachines.concat(JSON.parse(ev.data));
    };
    machinesStream.onerror = (err) => {
      machinesStream?.close();
      machinesStream = null;
    };
  };

  let selectedProcessId: number;
  let newProcessInfo: AddItemProcess = {
    executTime: 0,
    itemId: 0,
    machineId: 0,
    opNum: 0,
    setupTime: 0,
  };
  let editProcessInfo: EditItemProcess = {
    executTime: 0,
    itemId: 0,
    machineId: 0,
    opNum: 0,
    processId: 0,
    setupTime: 0,
  };

  const handleAddProcess = () => {
    const promise = addItemProcess(newProcessInfo);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando processo",
    });
    promise.then(async (res) => {
      const companyMachineInfo = companyMachines.find(
        (machine) => machine.id === newProcessInfo.machineId
      );
      companyProcesses.push({
        item: res.data.data.item,
        process_id: res.data.data.process_id,
        execut_time: newProcessInfo.executTime,
        setup_time: newProcessInfo.setupTime,
        item_id: newProcessInfo.itemId,
        machine_name: companyMachineInfo?.machine ?? "Sem máquina",
        op_num: newProcessInfo.opNum,
      });
      companyProcesses = companyProcesses;
    });
  };
  const handleEditProcess = () => {
    const promise = editItemProcess({
      executTime: editProcessInfo.executTime,
      setupTime: editProcessInfo.setupTime,
      itemId: editProcessInfo.itemId,
      machineId: editProcessInfo.machineId,
      opNum: editProcessInfo.opNum,
      processId: selectedProcessId,
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Editando processo",
    });
    promise.then(() => {
      const editProcessIndex = companyProcesses.findIndex(
        (itemProcess) => itemProcess.process_id === selectedProcessId
      );
      const companyMachineInfo = companyMachines.find(
        (machine) => machine.id === newProcessInfo.machineId
      );
      if (editProcessIndex === -1) return;
      Object.assign(companyProcesses[editProcessIndex], {
        executTime: editProcessInfo.executTime,
        setupTime: editProcessInfo.setupTime,
        machineId: editProcessInfo.machineId,
        opNum: editProcessInfo.opNum,
        machine: companyMachineInfo?.machine ?? "Sem máquina",
      });
      companyProcesses = companyProcesses;
    });
  };
  const handleDeleteProcess = (processId: number) => {
    companyProcesses = companyProcesses.filter(
      (itemProcess) => itemProcess.process_id !== processId
    );
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (machinesStream) machinesStream.close();
    if (processesStream) processesStream.close();
    if (itemsStream) itemsStream.close();
    machinesStream = null;
    processesStream = null;
    itemsStream = null;
  });
</script>

<div
  class="
flex
w-full h-full
gap-base
itemProcesses"
>
  <div
    class="
  flex flex-col
  w-1/2 h-full
  gap-base
  viewProcesses"
  >
    <div
      class="
  flex items-center justify-end
  w-full
  searchDiv"
    >
      <SearchInput bind:value={searchProcess}></SearchInput>
    </div>
    <div
      class="
    h-[650px] w-full
    overflow-y-scroll
    gap-base
    px-base
    flex flex-col
    currProcesses"
    >
      {#each companyProcesses as itemProcess, i}
        {#if !searchProcess || searchProcess.trim() === "" || (itemProcess.process_id && itemProcess.process_id
              .toString()
              .includes(searchProcess)) || (itemProcess.item && itemProcess.item
              .toUpperCase()
              .includes(searchProcess.toUpperCase())) || (itemProcess.machine_name && itemProcess.machine_name
              .toUpperCase()
              .includes(searchProcess.toUpperCase()))}
          <ItemProcessCard
            index={i}
            processInfo={itemProcess}
            on:processDeleted={() => {
              handleDeleteProcess(itemProcess.process_id);
            }}
            on:itemEdited={() => {
              handleEditProcess();
            }}
          ></ItemProcessCard>
        {/if}
      {/each}
    </div>
  </div>
  <div
    class="
      h-full w-1/2
      flex flex-col items-center
      gap-base
      handleProcesses"
  >
    <div
      class="
    h-gap-vertical-1/2-box w-full
    border-solid border-2 border-light-gray
    gap-base
    p-base
    flex flex-col justify-between items-center
    addNewProcess"
    >
      <Title text="Adicionar processo"></Title>
      <div
        class="
        gap-base
        grid grid-cols-3
        w-full
        inputs"
      >
        <InputForm label="Item" type="vertical">
          <SelectInput
            bind:value={newProcessInfo.itemId}
            options={companyItems.map((currItemInfo) => {
              return {
                text: currItemInfo.item,
                value: currItemInfo.id,
              };
            })}
          ></SelectInput>
        </InputForm>
        <InputForm label="Máquina" type="vertical">
          <SelectInput
            bind:value={newProcessInfo.machineId}
            options={companyMachines.map((machine) => {
              return {
                text: machine.machine,
                value: machine.id,
              };
            })}
          ></SelectInput>
        </InputForm>
        <InputForm label="Num. op" type="vertical">
          <NumberInput max={50} min={0} bind:value={newProcessInfo.opNum}
          ></NumberInput>
        </InputForm>
        <InputForm label="Execução" type="vertical">
          <NumberInput
            max={999999}
            min={0}
            bind:value={newProcessInfo.executTime}
          ></NumberInput>
        </InputForm>
        <InputForm label="Setup" type="vertical">
          <NumberInput
            max={999999}
            min={0}
            bind:value={newProcessInfo.setupTime}
          ></NumberInput>
        </InputForm>
      </div>
      <div
        class="
        w-full
        flex justify-end items-end
        addProcessButton"
      >
        <Button clickFunction={handleAddProcess} text="Adicionar"></Button>
      </div>
    </div>
    <div
      class="
    h-full w-full
    gap-base
    p-base
    border-solid border-2 border-light-gray
    rounded
    flex flex-col justify-between items-center
    editProcess"
    >
      <Title text="Editar processo"></Title>
      <div
        class="
        text-lg
        w-full
        flex justify-start items-center
        selectedMachine"
      >
        <strong class="text-xl">Processo selecionado: </strong>
        {selectedProcessId ? `ID-${selectedProcessId}` : "Sem ID selecionado"}
      </div>
      <div
        class="
        gap-base
        w-full
        grid grid-cols-3
        editProcessForm"
      >
        <InputForm type="vertical" label="Item">
          <SelectInput
            bind:value={editProcessInfo.itemId}
            options={companyItems.map((currItemInfo) => {
              return {
                text: currItemInfo.item,
                value: currItemInfo.id,
              };
            })}
          ></SelectInput>
        </InputForm>
        <InputForm type="vertical" label="Máquina">
          <SelectInput
            bind:value={editProcessInfo.machineId}
            options={companyMachines.map((machine) => {
              return {
                text: machine.machine,
                value: machine.id,
              };
            })}
          ></SelectInput>
        </InputForm>
        <InputForm type="vertical" label="Num. op">
          <NumberInput max={50} min={0} bind:value={editProcessInfo.opNum}
          ></NumberInput>
        </InputForm>
        <InputForm label="Execução" type="vertical">
          <NumberInput
            max={999999}
            min={0}
            bind:value={editProcessInfo.executTime}
          ></NumberInput>
        </InputForm>
        <InputForm label="Setup" type="vertical">
          <NumberInput
            max={999999}
            min={0}
            bind:value={editProcessInfo.setupTime}
          ></NumberInput>
        </InputForm>
      </div>
      <div
        class="
        w-full
        flex justify-end items-end
        addProcessButton"
      >
        <Button clickFunction={handleEditProcess} text="Editar"></Button>
      </div>
    </div>
  </div>
</div>
