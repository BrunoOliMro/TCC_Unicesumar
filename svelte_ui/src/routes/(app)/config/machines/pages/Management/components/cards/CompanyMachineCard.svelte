<script lang="ts">
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import type { CompanyMachineInfo } from "../../../../types/machines.types";
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { deleteMachine } from "../../api/machines_management.api";
  import ToasterHandler from "$lib/toaster/toaster";

  const dispatch = createEventDispatcher();

  export let companyMachineInfo: CompanyMachineInfo;

  const handleDeleteMachine = () => {
    const promise = deleteMachine(
      companyMachineInfo.id,
      companyMachineInfo.machine_index
    );
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Deletando máquina",
    }).then(() => {
      dispatch("machineDeleted");
    });
  };
</script>

<div
  in:fly|global={{ x: -50, duration: 300 }}
  class="
      h-24 w-full
      flex justify-around items-center
      rounded
      border-solid border-2 border-light-gray
      companyMachineCard"
>
  <div
    on:click={() => dispatch("editMachine", companyMachineInfo)}
    aria-hidden
    class={`
      cursor-pointer
      h-full w-[5%]
      flex items-center justify-center
    bg-black
      rounded-l
      hover:bg-black-hover
      transition duration-300
      processStatus`}
  >
    <Icon color="text-white" icon="fas fa-edit" size="medium"></Icon>
  </div>
  <div
    class="
      h-full w-[95%]
      flex justify-around items-center
      processData"
  >
    <LabeledText
      width="w-[10%]"
      label="Máquina"
      text={`${companyMachineInfo.machine}-${companyMachineInfo.machine_index}`}
    ></LabeledText>
    <LabeledText
      width="w-[10%]"
      label="Grupo"
      text={companyMachineInfo.machine_group || "Sem grupo"}
    ></LabeledText>
    <LabeledText
      width="w-[10%]"
      label="Eficiência"
      text={`${companyMachineInfo.efficiency}%`}
    ></LabeledText>
    <LabeledText
      width="w-[20%]"
      label="Dias trabalháveis"
      text={companyMachineInfo.working_days}
    ></LabeledText>
    <LabeledText
      width="w-[15%]"
      label="Horas mensais"
      text={`${companyMachineInfo.month_load} horas`}
    ></LabeledText>
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteMachine,
      }}
      icon="fas fa-trash-alt"
      size="medium"
      color="text-base-red hover:text-base-red-hover transition duration-300"
    ></Icon>
  </div>
</div>
