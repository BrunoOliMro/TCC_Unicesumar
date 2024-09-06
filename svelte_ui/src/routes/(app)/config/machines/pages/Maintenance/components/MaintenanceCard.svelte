<script lang="ts">
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { Datetime } from "$lib/utils/Datetime";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import { deleteMachineMaintenance } from "../api/machines_maintenance.api";
  import { fly } from "svelte/transition";

  export let params: {
    index: number;
    machineId: number;
    maintenanceUuid: string;
    machine: string;
    machineIndex: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };

  export let onDelete: () => void;

  const deleteMaintenance = () => {
    const promise = deleteMachineMaintenance({
      machineId: params.machineId,
      machineIndex: params.machineIndex,
      maintenanceUuid: params.maintenanceUuid,
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Removendo manutenção",
    });
    promise.then(() => {
      onDelete();
    });
  };
</script>

<div
  in:fly|global={{ x: -50, duration: 300, delay: params.index * 100 }}
  class="
        w-full h-24
        flex
        rounded
        border-solid border-2 border-light-gray
        maintenanceCard"
>
  <div
    class="
        h-full w-8
        flex items-center justify-center
        bg-black
        text-white
        rounded-l
        font-semibold
        index"
  >
    {params.index + 1}
  </div>
  <div
    class="
      flex items-center justify-between
      w-full
      p-base
      maintenanceData"
  >
    <LabeledText
      width="w-[20%]"
      label="Máquina"
      text={`${params.machine}-${params.machineIndex}`}
    ></LabeledText>
    <LabeledText
      width="w-[30%]"
      label="Data inicial"
      text={Datetime.createDatetimeString(params.startDate, params.startTime)}
    ></LabeledText>
    <LabeledText
      width="w-[30%]"
      label="Data final"
      text={Datetime.createDatetimeString(params.endDate, params.endTime)}
    ></LabeledText>
    <div
      class="
    h-full
    flex items-center
    deleteIcon"
    >
      <Icon
        clickOptions={{
          isClickable: true,
          clickFunction: deleteMaintenance,
        }}
        icon="fas fa-trash-alt"
        size="medium"
        color="text-base-red hover:text-base-red-hover transition duration-300"
      />
    </div>
  </div>
</div>
