<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import type { CompanyItemProcessInfo } from "../../Items/types/items.types";
  import { deleteItemProcess } from "../api/processes.api";
  import SimplePopup from "$lib/components/Popups/SimplePopup.svelte";
  import { fly } from "svelte/transition";
  import ProcessExtraInfosCard from "./ProcessExtraInfosCard.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let processInfo: CompanyItemProcessInfo;
  export let index: number;

  let cardIsOpen = false;

  const handleDeleteItem = () => {
    const promise = deleteItemProcess(processInfo.process_id);

    ToasterHandler.createPromiseToast({
      loadingMessage: "Deletando processo",
      promise: promise,
    });

    promise.then(() => {
      dispatch("processDeleted");
    });
  };
</script>

<div
  in:fly|global={{ x: -50, duration: 300, delay: index * 100 }}
  class="
    w-full
    flex flex-col
    rounded
    border-solid border-2 border-light-gray
    processCard"
>
  <div
    class="
    w-full h-horizontal-card
    flex
    border-solid border-2 border-light-gray
    rounded
    generalInfos"
  >
    <div
      on:click={() => dispatch("itemEdited")}
      aria-hidden
      class="
      cursor-pointer
      h-full w-[5%]
      flex items-center justify-center
    bg-black
      rounded-l
      hover:bg-black-hover
      transition duration-300"
    >
      <Icon icon="fas fa-edit" color="text-white" size="medium"></Icon>
    </div>
    <div
      on:dblclick={() => {
        cardIsOpen = !cardIsOpen;
      }}
      aria-hidden
      class="
      cursor-pointer
      h-full w-[95%]
      flex justify-between items-center
      p-base
      gap-base
      hover:bg-light-gray
      transition duration-300
      info"
    >
      <LabeledText
        width="w-[10%]"
        label="ID processo"
        text={processInfo.process_id}
      />
      <LabeledText width="w-[10%]" label="Item" text={processInfo.item} />
      <LabeledText width="w-[10%]" label="Nº op" text={processInfo.op_num} />
      <LabeledText
        width="w-[10%]"
        label="Máquina"
        text={processInfo.machine_name}
      />
      <LabeledText
        width="w-[15%]"
        label="Execução"
        text={`${processInfo.execut_time} s`}
      />
      <LabeledText
        width="w-[15%]"
        label="Setup"
        text={`${processInfo.setup_time} s`}
      />
      <Icon
        clickOptions={{
          isClickable: true,
          clickFunction: handleDeleteItem,
        }}
        color="text-base-red hover:text-base-red-hover transition duration-300"
        size="medium"
        icon="fas fa-trash-alt"
      ></Icon>
    </div>
  </div>
  <SimplePopup bind:isOpen={cardIsOpen} h="h-[900px]" w="w-[1200px]">
    <ProcessExtraInfosCard {processInfo}></ProcessExtraInfosCard>
  </SimplePopup>
</div>
