<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { onDestroy, onMount } from "svelte";
  import { findCompanyMachines } from "../../../../machines/api/machines.api";
  import type { CompanyMachineInfo } from "../../../../machines/types/machines.types";
  import { createItemGrouping } from "../api/groups.api";

  let groupName: string;
  let selectedMachineId = 0;

  export let onAdd: () => void;

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

  const handleAddGroup = () => {
    const promise = createItemGrouping({
      grouping: groupName,
      machineId: selectedMachineId,
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando grupo",
    });
    promise.then(() => {
      onAdd();
    });
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (companyMachinesStream) {
      companyMachinesStream.close();
    }
    companyMachinesStream = null;
  });
</script>

<div
  class="
      h-gap-vertical-1/3-box w-full
      flex flex-col items-center justify-between
      border-solid border-2 border-light-gray
      rounded
      gap-base p-base
      addGroup"
>
  <div
    class="
      w-full
      flex justify-center
      addGroupTitle"
  >
    <Title text="Adicionar grupo"></Title>
  </div>
  <div
    class="
      w-full
      grid grid-cols-3
      gap-base
      form"
  >
    <InputForm label="Nome do grupo" type="vertical">
      <TextInput bind:value={groupName}></TextInput>
    </InputForm>
    <InputForm label="Máquina" type="vertical">
      <SelectInput
        bind:value={selectedMachineId}
        options={companyMachines.map((machine) => {
          return { text: machine.machine, value: machine.id };
        })}
      ></SelectInput>
    </InputForm>
  </div>

  <div
    class="
      w-full
      flex items-center justify-end
      addGroupButton"
  >
    <Button clickFunction={handleAddGroup} text="Adicionar"></Button>
  </div>
</div>
