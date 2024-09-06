<script lang="ts">
  import type { AxiosResponse } from "axios";
  import type { EditMachineData } from "../../types/machines_management.types";
  import type { BaseResponse } from "$lib/types/global.types";
  import { editMachine } from "../../api/machines_management.api";
  import ToasterHandler from "$lib/toaster/toaster";
  import Button from "$lib/components/Buttons/Button.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import type { MachineGroup } from "../../../../types/machines.types";
  import { createEventDispatcher } from "svelte";
  import Title from "$lib/components/Texts/Title.svelte";

  const dispatch = createEventDispatcher();

  export let machineId: number;
  export let machineGroups: MachineGroup[];
  export let selectedMachine: string;

  const splittedMachineName = selectedMachine.split("-");
  const machineIndex = Number(splittedMachineName.at(-1));

  const editMachineInfo: EditMachineData = {
    machineId: machineId,
    machineIndex: machineIndex,
    efficiency: 0,
    machineGroupId: 0,
    monthLoad: 0,
    workingDays: 0,
  };

  const handleEditMachine = async (): Promise<void> => {
    const promise: Promise<AxiosResponse<BaseResponse<undefined>>> =
      editMachine(editMachineInfo);

    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Editando máquina",
    });
    promise.then(() => {
      dispatch("machineEdited", {
        machine: selectedMachine,
        efficiency: editMachineInfo.efficiency,
        machine_group_id: editMachineInfo.machineGroupId,
        id: editMachineInfo.machineId,
        machine_index: editMachineInfo.machineIndex,
        month_load: editMachineInfo.monthLoad,
        working_days: editMachineInfo.workingDays,
        machine_group:
          machineGroups.find(
            (group) => group.id === editMachineInfo.machineGroupId
          )?.machine_group ?? undefined,
      });
    });
  };
</script>

<div
  class="
        h-full w-full
        flex flex-col justify-between items-center
        p-base gap-base
        editCompanyMachineForm"
>
  <Title text="Editar máquina"></Title>
  <div
    class="
  grid grid-cols-3 content-start
  gap-base
  w-full h-full
  inputs"
  >
    <InputForm label="Grupo da máquina" type="vertical">
      <SelectInput
        bind:value={editMachineInfo.machineGroupId}
        options={machineGroups.map((machineGroup) => {
          return {
            text: machineGroup.machine_group,
            value: machineGroup.id,
          };
        })}
      ></SelectInput>
    </InputForm>
    <InputForm label="Eficiência (%)" type="vertical">
      <NumberInput bind:value={editMachineInfo.efficiency} max={100} min={0}
      ></NumberInput>
    </InputForm>
    <InputForm label="Dias trabalháveis (0-31)" type="vertical">
      <NumberInput bind:value={editMachineInfo.workingDays} max={31} min={0}
      ></NumberInput>
    </InputForm>
    <InputForm label="Carga mensal (horas)" type="vertical">
      <NumberInput bind:value={editMachineInfo.monthLoad} max={744} min={0}
      ></NumberInput>
    </InputForm>
  </div>
  <div
    class="
        w-full
        flex justify-end items-center
        addMachineButton"
  >
    <Button text="Editar" clickFunction={handleEditMachine}></Button>
  </div>
</div>
