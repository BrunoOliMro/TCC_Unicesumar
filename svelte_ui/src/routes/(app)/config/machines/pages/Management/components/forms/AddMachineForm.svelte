<script lang="ts">
  import { addMachine } from "../../api/machines_management.api";
  import type { AddMachineData } from "../../types/machines_management.types";
  import ToasterHandler from "$lib/toaster/toaster";
  import Button from "$lib/components/Buttons/Button.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import type { MachineGroup } from "../../../../types/machines.types";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";

  export let machineAdded: (
    machineInfo: AddMachineData,
    machineId: number,
    machineIndex: number,
    machineGroup?: string
  ) => void;
  export let machineGroups: MachineGroup[];

  const addMachineInfo: AddMachineData = {
    machine: "",
    efficiency: 0,
    machineGroupId: 0,
    monthLoad: 0,
    workingDays: 0,
  };

  const handleAddMachine = async (): Promise<void> => {
    const promise = addMachine(addMachineInfo);

    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando máquina",
    });
    promise.then((res) => {
      machineAdded(
        addMachineInfo,
        res.data.data.machine_id,
        res.data.data.machine_index,
        machineGroups.find(
          (machineGroup) => machineGroup.id,
          addMachineInfo.machineGroupId
        )?.machine_group
      );
    });
  };
</script>

<div
  class="
        h-full w-full
        flex flex-col justify-between
        p-4
        gap-base
        addCompanyMachineForm"
>
  <div
    class="
w-full
grid grid-cols-3 content-start
gap-base
generalInfo"
  >
    <InputForm label="Máquina" type="vertical">
      <TextInput bind:value={addMachineInfo.machine}></TextInput>
    </InputForm>
    <InputForm label="Grupo da máquina" type="vertical">
      <SelectInput
        bind:value={addMachineInfo.machineGroupId}
        options={machineGroups.map((machineGroup) => {
          return {
            text: machineGroup.machine_group,
            value: machineGroup.id,
          };
        })}
      ></SelectInput>
    </InputForm>
    <InputForm label="Eficiência (%)" type="vertical">
      <NumberInput bind:value={addMachineInfo.efficiency} max={100} min={0}
      ></NumberInput>
    </InputForm>
  </div>
  <div
    class="
  w-full
  gap-base
  grid grid-cols-3 content-start
  additionalInfo"
  >
    <InputForm label="Dias trabalháveis (0-31)" type="vertical">
      <NumberInput bind:value={addMachineInfo.workingDays} max={31} min={0}
      ></NumberInput>
    </InputForm>
    <InputForm label="Carga mensal (horas)" type="vertical">
      <NumberInput bind:value={addMachineInfo.monthLoad} max={744} min={0}
      ></NumberInput>
    </InputForm>
  </div>
  <div
    class="
        w-full
        flex justify-end items-center
        addMachineButton"
  >
    <Button text="Adicionar" clickFunction={handleAddMachine}></Button>
  </div>
</div>
