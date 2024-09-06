<script lang="ts">
  import { findCompanyItems } from "../../Items/api/items.api";
  import type { GeneralItemInfo } from "../../Items/types/items.types";
  import AddChildItemCard from "./AddChildItemCard.svelte";
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  export let processId: number;
  export let processItemId: number;
  export let currChildItems: {
    item: string;
    item_id: number;
    item_qtd: number;
  }[];

  let companyItems: GeneralItemInfo[] = [];
  let companyItemsStream: EventSource | null;

  const startStreams = async (): Promise<void> => {
    companyItemsStream = await findCompanyItems();
    companyItemsStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        companyItemsStream?.close();
        companyItemsStream = null;
        return;
      }
      companyItems = companyItems.concat(JSON.parse(ev.data));
    };
    companyItemsStream.onerror = (err) => {
      companyItemsStream?.close();
      companyItemsStream = null;
    };
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (companyItemsStream) companyItemsStream.close();
    companyItemsStream = null;
  });
</script>

<div
  class="
h-full w-full
gap-base
flex flex-wrap
overflow-y-auto
addChildItemForm"
>
  {#each companyItems as item}
    {#if item.id !== processItemId}
      <AddChildItemCard
        on:childItemsUpdate={() => dispatch("childItemsUpdate")}
        itemId={item.id}
        {processId}
        {currChildItems}
        item={item.part_number}
      ></AddChildItemCard>
    {/if}
  {/each}
</div>
