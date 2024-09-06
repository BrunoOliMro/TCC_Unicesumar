<script lang="ts">
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { fade } from "svelte/transition";
  import { deleteItemGrouping } from "../api/groups.api";

  export let grouping: string;
  export let groupingId: number;
  export let machine: string;
  export let onDelete: () => void;
  export let selectedGrouping: { group: string; groupId: number };
  export let onChange: () => void;

  const handleDeleteGrouping = () => {
    const promise = deleteItemGrouping({ groupingId: groupingId });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Deletando grupo",
    });
    promise.then(() => {
      onDelete();
    });
  };
</script>

<div
  in:fade|global={{ duration: 300 }}
  class="
    h-20 w-[400px]
    border-solid border-2 border-light-gray
    rounded
    flex
    groupingCard"
>
  <div
    on:click={() => {
      selectedGrouping = { group: grouping, groupId: groupingId };
      onChange();
    }}
    aria-hidden
    class="
        h-full w-[10%]
        bg-black
        rounded-l
        cursor-pointer
        text-white font-semibold
        flex items-center justify-center
        hover:bg-black-hover
        transition duration-300
        showMoreIcon"
  >
    <Icon size="medium" icon="fas fa-info-circle" color="text-white"></Icon>
  </div>
  <div
    class="
        h-full w-[90%]
            p-base
            gap-base
            flex items-center justify-between
        groupingInfo"
  >
    <LabeledText label="Grupo" text={grouping}></LabeledText>
    <LabeledText label="Máquina" text={machine}></LabeledText>
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteGrouping,
      }}
      icon="fas fa-trash-alt"
      size="medium"
      color="text-base-red hover:text-base-red-hover transition duration-300"
    ></Icon>
  </div>
</div>
