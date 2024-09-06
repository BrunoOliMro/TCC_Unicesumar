<script lang="ts">
  import SimplePopup from "$lib/components/Popups/SimplePopup.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import type { GeneralMachineInfo } from "../../../../machines/types/machines.types";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import { addItemProcess } from "../api/items.api";
  import ToasterHandler from "$lib/toaster/toaster";
  import { createEventDispatcher } from "svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import { findMachinesGeneralInfo } from "../../../../machines/api/machines.api";

  const dispatch = createEventDispatcher();

  export let itemId: number;
  export let isOpen: boolean;

  let machineOptions: GeneralMachineInfo[] = [];

  let processInfos = {
    selectedMachineId: 0,
    opNum: 0,
    execut: 0,
    setup: 0,
  };

  const handleAddItemProcess = () => {
    const promise = addItemProcess({
      executTime: processInfos.execut,
      itemId: itemId,
      machineId: processInfos.selectedMachineId,
      opNum: processInfos.opNum,
      setupTime: processInfos.setup,
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando processo",
    });
    promise.then(async (res) => {
      dispatch;
      const companyMachineInfo = machineOptions.find(
        (machine) => machine.id === processInfos.selectedMachineId
      );
      dispatch("processAdded", {
        item: res.data.data.item,
        process_id: res.data.data.process_id,
        execut_time: processInfos.execut,
        setup_time: processInfos.setup,
        item_id: itemId,
        machine_name: companyMachineInfo?.machine ?? "Sem máquina",
        op_num: processInfos.opNum,
      });
    });
  };

  const fetchData = async () => {
    machineOptions = (await findMachinesGeneralInfo()).data;
  };
</script>

<SimplePopup h="h-[400px]" w="w-[1200px]" bind:isOpen>
  {#await fetchData()}
    <Loader type="inner"></Loader>
  {:then}
    <div
      class="
    w-full h-[90%] justify-between items-center
    flex flex-col
    p-base gap-12
    border-solid border-2 border-light-gray
    rounded
    contentBox"
    >
      <Title text="Adicionar processo"></Title>
      <div
        class="
    gap-8 p-base
    flex items-center justify-center
    w-full
    addInfos"
      >
        <InputForm type="vertical" label="Máquina">
          <SelectInput
            bind:value={processInfos.selectedMachineId}
            options={machineOptions.map((info) => {
              return {
                text: info.machine,
                value: info.id,
              };
            })}
            placeholder="Máquina"
          ></SelectInput>
        </InputForm>
        <InputForm type="vertical" label="Nº operação">
          <NumberInput bind:value={processInfos.opNum} min={0} max={100}
          ></NumberInput>
        </InputForm>
        <InputForm type="vertical" label="Tempo execução">
          <NumberInput bind:value={processInfos.execut} min={0} max={99999}
          ></NumberInput>
        </InputForm>
        <InputForm type="vertical" label="Tempo setup">
          <NumberInput bind:value={processInfos.setup} min={0} max={99999}
          ></NumberInput>
        </InputForm>
      </div>
      <div
        class="
    w-full
    flex items-center justify-end
    buttonDiv"
      >
        <Button text="Adicionar" clickFunction={handleAddItemProcess}></Button>
      </div>
    </div>
  {/await}
</SimplePopup>
