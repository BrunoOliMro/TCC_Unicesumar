<script lang="ts">
  import Icon from "$lib/components/Icons/Icon.svelte";
  import { slide } from "svelte/transition";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import { addChildItem, updateChildItem } from "../api/processes.api";
  import { createEventDispatcher } from "svelte";
  import ToasterHandler from "$lib/toaster/toaster";

  const dispatch = createEventDispatcher();

  export let item: string;
  export let itemId: number;
  export let processId: number;
  export let currChildItems: {
    item: string;
    item_id: number;
    item_qtd: number;
  }[];

  const handleAddChildItem = () => {
    let promise;
    if (
      currChildItems.some((childItemInfo) => (childItemInfo.item_id = itemId))
    ) {
      promise = updateChildItem(processId, itemId, childItemQtd);
    } else {
      promise = addChildItem(processId, itemId, childItemQtd);
    }
    ToasterHandler.createPromiseToast({
      loadingMessage: "Alterando items filhos",
      promise: promise,
    });
    promise.then(() => {
      dispatch("childItemsUpdate");
    });
  };

  let childItemQtd = 1;

  let itemQtdIsOpen = false;
</script>

<div
  class="
flex flex-col
relative
{itemQtdIsOpen ? 'max-h-32' : 'max-h-16'} w-[300px]
addItemCard"
>
  <div
    class="
  flex justify-between items-center
  p-base gap-base
  w-full h-16
  rounded border-solid border-2 border-light-gray
  {itemQtdIsOpen ? 'rounded-b-0 border-b-0' : ''} w-[300px]
  itemInfos"
  >
    <p>{item}</p>
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: () => {
          itemQtdIsOpen = !itemQtdIsOpen;
        },
      }}
      color="{itemQtdIsOpen
        ? 'text-base-red hover:text-base-red-hover'
        : 'text-base-green hover:text-base-green-hover'} transition duration-300"
      icon={itemQtdIsOpen ? "fas fa-minus-circle" : "fas fa-plus-circle"}
      size="medium"
    ></Icon>
  </div>
  {#if itemQtdIsOpen}
    <div
      transition:slide={{ duration: 300 }}
      class="
  border-solid border-2 border-light-gray rounded-b border-t-0
  h-16 w-[300px]
  flex items-center justify-between
  p-base gap-base
  left-0 top-0
  itemQtd"
    >
      <NumberInput
        size="small"
        min={1}
        max={9999999}
        bind:value={childItemQtd}
      />
      <Button text="Adicionar" clickFunction={handleAddChildItem}></Button>
    </div>
  {/if}
</div>
