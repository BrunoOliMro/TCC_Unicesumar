<script lang="ts">
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { deleteGroupingProcess } from "../api/groups.api";
  import { fly } from "svelte/transition";

  export let processId: number;
  export let opNum: number;
  export let machine: string;
  export let odf: string;
  export let odfId: number;
  export let index: number;
  export let item: string;

  export let onProcessDelete: () => void;

  const handleDeleteGroupingProcess = () => {
    const promise = deleteGroupingProcess(processId, odfId);
    ToasterHandler.createPromiseToast({
      loadingMessage: "Deletando processo",
      promise: promise,
    });
    promise.then(() => {
      onProcessDelete();
    });
  };
</script>

<div
  in:fly|global={{ y: -50, duration: 300 }}
  class="
    h-24 w-full
    flex
    border-solid border-2 border-light-gray
    rounded
    groupProcessCard"
>
  <div
    class="
w-[5%] h=full
flex items-center justify-center
rounded-l
bg-black
font-semibold
text-white
indexBox"
  >
    {index + 1}
  </div>
  <div
    class="
  flex justify-between items-center
  p-base gap-base
  w-[95%] h-full
  groupProcessInfo"
  >
    <LabeledText label="ODF" text={odf}></LabeledText>
    <LabeledText label="Item" text={item}></LabeledText>
    <LabeledText label="Num.op" text={opNum}></LabeledText>
    <LabeledText label="Máquina" text={machine}></LabeledText>
    <Icon
      color="text-base-red hover:text-base-red-hover transition duration-300"
      icon="fas fa-trash-alt"
      size="medium"
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteGroupingProcess,
      }}
    ></Icon>
  </div>
</div>
