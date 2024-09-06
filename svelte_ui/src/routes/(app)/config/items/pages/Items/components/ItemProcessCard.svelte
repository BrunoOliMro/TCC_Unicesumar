<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import type {
    CompanyItemProcessInfo,
    GeneralItemInfo,
  } from "../../Items/types/items.types";
  import { deleteItemProcess } from "../api/items.api";
  import { fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import EditItemProcessPopup from "./EditItemProcessPopup.svelte";

  const dispatch = createEventDispatcher();

  export let companyItems: GeneralItemInfo[];
  export let processInfo: CompanyItemProcessInfo;
  export let index: number;

  let editProcessPopupIsOpen = false;

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

  const handleEditItemProcess = (ev: {
    detail: {
      machine: string;
      infos: {
        execut: number;
        setup: number;
        opNum: number;
      };
    };
  }) => {
    processInfo.execut_time = ev.detail.infos.execut;
    processInfo.setup_time = ev.detail.infos.setup;
    processInfo.machine_name = ev.detail.machine;
    processInfo.op_num = ev.detail.infos.opNum;
  };
</script>

<div
  in:fly|global={{ x: -50, duration: 300, delay: index * 100 }}
  class="
    w-full
    flex flex-col
    rounded
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
      aria-hidden
      class="
      h-full w-[5%]
      flex items-center justify-center
    bg-black
      rounded-l
      font-semibold
      text-white
      transition duration-300"
    >
      {processInfo.op_num}
    </div>
    <div
      aria-hidden
      class="
      h-full w-[95%]
      flex justify-between items-center
      p-base
      gap-base
      info"
    >
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
      <div
        class="
      h-full
      flex items-center justify-center
      gap-base
      icons"
      >
        <Icon
          clickOptions={{
            isClickable: true,
            clickFunction: () => (editProcessPopupIsOpen = true),
          }}
          color="text-black hover:opacity-60"
          size="medium"
          icon="fas fa-edit"
        ></Icon>
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
  </div>
</div>

<EditItemProcessPopup
  {companyItems}
  on:processEdited={handleEditItemProcess}
  processId={processInfo.process_id}
  bind:isOpen={editProcessPopupIsOpen}
  itemId={processInfo.item_id}
></EditItemProcessPopup>
