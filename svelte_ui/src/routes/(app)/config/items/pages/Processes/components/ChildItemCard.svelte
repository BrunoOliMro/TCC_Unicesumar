<script lang="ts">
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import { createEventDispatcher } from "svelte";
  import { deleteChildItem } from "../api/processes.api";
  import ToasterHandler from "$lib/toaster/toaster";

  const dispatch = createEventDispatcher();

  export let processId: number;
  export let index: number;
  export let itemInfo: { item: string; item_id: number; item_qtd: number };

  const handleDeleteChildItem = () => {
    const promise = deleteChildItem(processId, itemInfo.item_id);
    ToasterHandler.createPromiseToast({
      loadingMessage: "Removendo item filho",
      promise: promise,
    });
    promise.then(() => {
      dispatch("childItemRemoved");
    });
  };
</script>

<div
  class="
w-[400px] h-16
rounded
flex
border-solid border-2 border-light-gray
childItemCard"
>
  <div
    class="
h-full w-[10%]
rounded-l
bg-black
text-white
flex items-center justify-center
font-semibold
indexBox"
  >
    {index + 1}
  </div>
  <div
    class="
w-[90%] h-full
flex justify-between items-center
gap-base p-base
itemInfo"
  >
    <LabeledText label="Item" text={itemInfo.item} width="w-[40%]"
    ></LabeledText>
    <LabeledText label="Quantidade" text={itemInfo.item_qtd} width="w-[40%]"
    ></LabeledText>
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteChildItem,
      }}
      icon="fas fa-trash-alt"
      size="medium"
      color="text-base-red hover:text-base-red-hover transition duration-300"
    ></Icon>
  </div>
</div>
