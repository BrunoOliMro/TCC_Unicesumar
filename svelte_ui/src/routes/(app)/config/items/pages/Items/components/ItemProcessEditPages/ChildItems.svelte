<script lang="ts">
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import { findItemProcessChildItems } from "../../api/items.api";
  import type { GeneralItemInfo } from "../../types/items.types";
  import AddChildItemCard from "../AddChildItemCard.svelte";
  import ChildItemCard from "../ChildItemCard.svelte";
  import FullPageText from "$lib/components/Texts/FullPageText.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";

  export let processId: number;

  export let companyItems: GeneralItemInfo[];
  let processChildItems: { item: string; item_id: number; item_qtd: number }[] =
    [];

  let searchItem = "";

  $: visibleItems = companyItems.filter((item) => {
    return (
      !searchItem ||
      searchItem.trim() === "" ||
      (item.part_number &&
        item.part_number.toUpperCase().includes(searchItem.toUpperCase())) ||
      (item.type && item.type.toUpperCase().includes(searchItem.toUpperCase()))
    );
  });

  const fetchData = async () => {
    processChildItems = (await findItemProcessChildItems(processId)).data;
  };
</script>

{#await fetchData()}
  <Loader type="inner"></Loader>
{:then}
  <div
    class="
w-full h-full justify-between items-center
flex flex-col
gap-base
contentBox"
  >
    <div
      class="
    w-full h-[50%]
    flex flex-col justify-between items-center
    gap-base p-base
    border-solid border-2 border-light-gray
    rounded
    relative
    addChildItem"
    >
      <div
        class="
    absolute
    h-[40%]
    top-0 right-0
    flex items-center
    p-base
    searchDiv"
      >
        <SearchInput bind:value={searchItem}></SearchInput>
      </div>
      <div
        class="
      h-[40%] w-full
      flex items-center justify-center
      titleDiv"
      >
        <Title text="Itens disponíveis"></Title>
      </div>
      <div
        class="
      w-full h-[60%]
      flex flex-wrap content-start justify-between
      gap-base
      overflow-y-auto
      scrollbar-hide
      availableItems"
      >
        {#each visibleItems as item}
          <AddChildItemCard
            currChildItems={processChildItems}
            item={item.part_number}
            itemId={item.id}
            {processId}
          ></AddChildItemCard>
        {/each}
      </div>
    </div>
    <div
      class="
    w-full h-[50%]
    flex flex-col items-center justify-start
    p-base gap-base
    border-solid border-2 border-light-gray
    addedChildItens"
    >
      <div
        class="
  h-[40%] w-full
  flex items-center justify-center
  titleDiv"
      >
        <Title text="Itens filhos adicionados"></Title>
      </div>
      <div
        class="
    w-full h-[60%]
    flex flex-wrap content-start justify-between
    gap-base
    overflow-y-auto
    scrollbar-hide
    addedChildItems"
      >
        {#if processChildItems.length === 0}
          <FullPageText type="normal" text="Sem itens filhos"></FullPageText>
        {:else}
          {#each processChildItems as item, i}
            <ChildItemCard index={i} itemInfo={item} {processId}
            ></ChildItemCard>
          {/each}
        {/if}
      </div>
    </div>
  </div>
{/await}
