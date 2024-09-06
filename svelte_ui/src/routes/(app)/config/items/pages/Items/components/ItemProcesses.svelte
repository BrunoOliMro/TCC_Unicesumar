<script lang="ts">
  import { slide } from "svelte/transition";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import AddItemProcessPopup from "./AddItemProcessPopup.svelte";
  import type {
    CompanyItemProcessInfo,
    GeneralItemInfo,
  } from "../types/items.types";
  import { findItemProcesses } from "../api/items.api";
  import ItemProcessCard from "./ItemProcessCard.svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";

  export let itemId: number;
  export let companyItems: GeneralItemInfo[];

  let addProcessPopupIsOpen = false;
  let itemProcesses: CompanyItemProcessInfo[] = [];

  const fetchData = async (): Promise<void> => {
    const response = await findItemProcesses(itemId);
    itemProcesses = response.data;
  };
</script>

<div
  in:slide={{ duration: 300 }}
  out:slide={{ duration: 300 }}
  class="
z-10
overflow-y-auto scrollbar-hide
border-solid border-x-2 border-b-2 border-light-gray
rounded-b
grid grid-cols-1
max-h-48 w-full
transition duration-300
p-base gap-base
itemProcesses"
>
  {#await fetchData()}
    <Loader type="inner"></Loader>
  {:then}
    {#each itemProcesses as itemProcess, i}
      <ItemProcessCard
        {companyItems}
        on:processDeleted={fetchData}
        on:processEdited={fetchData}
        index={i + 1}
        processInfo={itemProcess}
      ></ItemProcessCard>
    {/each}
    <div
      class="
  w-full
  flex items-center justify-center
  p-base
  iconDiv"
    >
      <Icon
        icon="fas fa-plus-circle"
        color="text-base-green hover:text-base-green-hover"
        size="medium"
        clickOptions={{
          isClickable: true,
          clickFunction: () => (addProcessPopupIsOpen = true),
        }}
      ></Icon>
    </div>
  {/await}
</div>

<AddItemProcessPopup
  on:processAdded={(ev) => {
    itemProcesses.push(ev.detail);
    itemProcesses = itemProcesses;
  }}
  bind:isOpen={addProcessPopupIsOpen}
  {itemId}
></AddItemProcessPopup>
