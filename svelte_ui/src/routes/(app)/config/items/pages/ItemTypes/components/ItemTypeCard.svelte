<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { deleteItemType, editItemType } from "../api/item_types.api";

  const dispatch = createEventDispatcher();

  export let itemType: string;
  export let itemTypeId: number;
  export let bgColor: string;

  let typeHex = bgColor;

  const handleEditItemType = async () => {
    if (!typeHex) {
      ToasterHandler.createErrorToast("Selecione uma cor");
    }
    const promise = editItemType(itemTypeId, typeHex);
    ToasterHandler.createPromiseToast({
      loadingMessage: "Editando cor do tipo",
      promise: promise,
    });
    promise.then(() => {
      dispatch("itemTypeDelete");
    });
  };

  const handleDeleteItemType = () => {
    const promise = deleteItemType(itemTypeId);
    ToasterHandler.createPromiseToast({
      loadingMessage: "Removendo tipo de item",
      promise: promise,
    });
    promise.then(() => {
      dispatch("itemTypeDelete");
    });
  };
</script>

<div
  in:fade={{ duration: 300 }}
  class="
        w-[300px] h-12
        rounded
        border-solid border-2 border-light-gray
        font-medium
        text-md
        gap-base
        p-base
        flex justify-between items-center
        itemTypeCard"
>
  {itemType}
  <div
    class="
  flex items-center
  gap-2
  color"
  >
    <input
      type="color"
      color-format="rgba"
      on:input={(ev) => {
        typeHex = ev.target.value;
        //@ts-ignore
      }}
      value={bgColor}
      class="cursor-pointer w-[25px] h-[25px]"
    />
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: handleEditItemType,
      }}
      color="text-black hover:text-main-color transition duration-300"
      size="small"
      icon="fas fa-pen"
    ></Icon>
  </div>

  <Icon
    clickOptions={{
      isClickable: true,
      clickFunction: handleDeleteItemType,
    }}
    color="text-base-red hover:text-base-red-hover transition duration-300"
    size="medium"
    icon="fas fa-trash-alt"
  ></Icon>
</div>
