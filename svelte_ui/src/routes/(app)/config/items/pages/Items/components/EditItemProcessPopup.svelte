<script lang="ts">
  import SimplePopup from "$lib/components/Popups/SimplePopup.svelte";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import General from "./ItemProcessEditPages/General.svelte";
  import { createEventDispatcher } from "svelte";
  import Tools from "./ItemProcessEditPages/Tools.svelte";
  import Material from "./ItemProcessEditPages/Material.svelte";
  import ChildItems from "./ItemProcessEditPages/ChildItems.svelte";
  import type { GeneralItemInfo } from "../types/items.types";

  export let companyItems: GeneralItemInfo[];

  export let itemId: number;
  export let isOpen: boolean;
  export let processId: number;

  const dispatch = createEventDispatcher();

  let headers = [
    {
      name: "Geral",
      icon: "fas fa-wave-square",
    },
    {
      name: "Ferramentais",
      icon: "fas fa-tools",
    },
    {
      name: "Materiais",
      icon: "fas fa-parachute-box",
    },
    {
      name: "Itens filhos",
      icon: "fas fa-baby-carriage",
    },
  ];
  let selectedHeaderIndex = 0;
</script>

<SimplePopup h="h-[600px]" w="w-[1200px]" bind:isOpen>
  <div
    class="
      w-full h-full
      flex flex-col
      p-base
      contentBox"
  >
    <div
      class="
      flex
      w-full h-[10%]
      gap-12
      items-center justify-center
      selectHeaders"
    >
      {#each headers as header, i}
        <div
          class="
          flex items-center
          gap-base
          header
          group
          cursor-pointer
          "
          on:click={() => (selectedHeaderIndex = i)}
          aria-hidden
        >
          <Icon
            icon={header.icon}
            color="text-main-color group-hover:text-main-color-hover"
            size="medium"
          ></Icon>
          <h2
            class="
            text-main-color group-hover:text-main-color-hover
            text-lg
            "
          >
            {header.name}
          </h2>
        </div>
      {/each}
    </div>
    <div
      class="
    w-full h-[90%]
    boxSelectedPage"
    >
      {#if selectedHeaderIndex === 0}
        <General
          {processId}
          {itemId}
          on:processEdited={(ev) => dispatch("processEdited", ev.detail)}
        ></General>
      {:else if selectedHeaderIndex === 1}
        <Tools {processId}></Tools>
      {:else if selectedHeaderIndex === 2}
        <Material {processId}></Material>
      {:else}
        <ChildItems {companyItems} {processId}></ChildItems>
      {/if}
    </div>
  </div>
</SimplePopup>
