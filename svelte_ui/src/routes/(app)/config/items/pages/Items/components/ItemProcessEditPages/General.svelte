<script lang="ts">
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import { createEventDispatcher } from "svelte";
  import { findMachinesGeneralInfo } from "../../../../../machines/api/machines.api";
  import type { GeneralMachineInfo } from "../../../../../machines/types/machines.types";
  import { editItemProcess } from "../../../Processes/api/processes.api";
  import ToasterHandler from "$lib/toaster/toaster";
  import Button from "$lib/components/Buttons/Button.svelte";

  const dispatch = createEventDispatcher();

  export let processId: number;
  export let itemId: number;

  let machineOptions: GeneralMachineInfo[] = [];

  let processInfos = {
    selectedMachineId: 0,
    opNum: 0,
    execut: 0,
    setup: 0,
  };

  const handleEditItemProcess = () => {
    const promise = editItemProcess({
      executTime: processInfos.execut,
      setupTime: processInfos.setup,
      itemId: itemId,
      machineId: processInfos.selectedMachineId,
      opNum: processInfos.opNum,
      processId: processId,
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Editando processo",
    });
    promise.then(() => {
      const companyMachineInfo = machineOptions.find(
        (machine) => machine.id === processInfos.selectedMachineId
      );
      dispatch("processEdited", {
        processId: processId,
        itemId: itemId,
        machine: companyMachineInfo,
        processInfos: processInfos,
      });
    });
  };

  const fetchData = async () => {
    machineOptions = (await findMachinesGeneralInfo()).data;
  };
</script>

{#await fetchData()}
  <Loader type="inner"></Loader>
{:then}
  <div
    class="
w-full h-full justify-between items-center
border-solid border-2 border-light-gray
flex flex-col
gap-12 p-base
contentBox"
  >
    <Title text="Editar processo"></Title>
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
      <Button text="Editar" clickFunction={handleEditItemProcess}></Button>
    </div>
  </div>
{/await}
