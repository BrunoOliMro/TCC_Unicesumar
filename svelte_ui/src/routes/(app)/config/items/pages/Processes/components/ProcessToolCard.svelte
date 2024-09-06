<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import { deleteProcessTool } from "../api/processes.api";
  import { fade } from "svelte/transition";

  export let onDelete: () => void;

  export let index: number;
  export let toolId: number;
  export let processId: number;
  export let tool: string;

  const handleDeleteProcessTool = () => {
    const promise = deleteProcessTool(toolId, processId);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Deletando ferramental",
    });
    promise.then(() => {
      onDelete();
    });
  };
</script>

<div
  in:fade|global={{ duration: 300 }}
  class="
    w-full h-24
    flex
    gap-base
    border-solid border-2 border-light-gray
    rounded
    processToolCard"
>
  <div
    class="
        w-[10%] h-full
        text-white font-semibold
        flex items-center justify-center
        rounded-l
        bg-black
        toolIndex"
  >
    {index + 1}
  </div>
  <div
    class="
      w-[90%] h-full
      flex items-center justify-between
      p-base gap-base
      toolInfo"
  >
    <LabeledText width="w-[50%]" label="Ferramental" text={tool}></LabeledText>
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteProcessTool,
      }}
      color="text-base-red hover:text-base-red-hover transition duration-300"
      icon="fas fa-trash-alt"
      size="medium"
    ></Icon>
  </div>
</div>
