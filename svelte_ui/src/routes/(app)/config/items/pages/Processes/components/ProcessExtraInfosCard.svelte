<script lang="ts">
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import type { CompanyItemProcessInfo } from "../../Items/types/items.types";
  import {
    findProcessChildItems,
    findProcessMaterials,
    findProcessTools,
  } from "../api/processes.api";
  import type { ProcessMaterialInfo, ToolInfo } from "../types/processes.types";
  import AddChildItemForm from "./AddChildItemForm.svelte";
  import AddProcessMaterialForm from "./AddProcessMaterialForm.svelte";
  import AddProcessToolForm from "./AddProcessToolForm.svelte";
  import ChildItemCard from "./ChildItemCard.svelte";
  import ProcessMaterialCard from "./ProcessMaterialCard.svelte";
  import ProcessToolCard from "./ProcessToolCard.svelte";

  export let processInfo: CompanyItemProcessInfo;

  const fetchProcessTools = async (): Promise<ToolInfo[]> => {
    const res = await findProcessTools(processInfo.process_id);
    return res.data;
  };

  let processTools: Promise<ToolInfo[]> = fetchProcessTools();

  const fetchProcessMaterials = async (): Promise<ProcessMaterialInfo[]> => {
    const res = await findProcessMaterials(processInfo.process_id);
    return res.data;
  };

  let processMaterials: Promise<ProcessMaterialInfo[]> =
    fetchProcessMaterials();

  const fetchProcessChildItems = async (): Promise<
    { item: string; item_id: number; item_qtd: number }[]
  > => {
    const res = await findProcessChildItems(processInfo.process_id);
    return res.data;
  };

  let processChildItems: Promise<
    { item: string; item_id: number; item_qtd: number }[]
  > = fetchProcessChildItems();
</script>

<div
  class="
w-full h-full
flex flex-col
gap-base p-base
processExtraInfos"
>
  <div
    class="
flex gap-base
w-full h-1/2
processMaterialsAndTools"
  >
    <div
      class="
h-full w-1/2
flex flex-col items-center
rounded border-solid border-2 border-light-gray
p-base gap-base
tools"
    >
      <Title text="Ferramentais"></Title>
      {#await processTools}
        <div
          class="
    w-full h-[50%]
    loaderDiv"
        >
          <Loader></Loader>
        </div>
      {:then tools}
        <div
          class="
  w-full h-[50%]
  grid grid-cols-1
  px-base
  overflow-y-scroll
  currTools"
        >
          {#if tools.length === 0}
            <div
              class="
w-full h-full
flex items-center justify-center
noMaterials"
            >
              <Subtitle text="Sem ferramentais"></Subtitle>
            </div>
          {:else}
            {#each tools as toolInfo, i}
              <ProcessToolCard
                onDelete={() => {
                  processTools = fetchProcessTools();
                }}
                processId={processInfo.process_id}
                toolId={toolInfo.tool_id}
                index={i}
                tool={toolInfo.tool}
              ></ProcessToolCard>
            {/each}
          {/if}
        </div>
      {/await}
      <AddProcessToolForm
        processId={processInfo.process_id}
        onEdit={() => {
          processTools = fetchProcessTools();
        }}
      ></AddProcessToolForm>
    </div>
    <div
      class="
h-full w-1/2
flex flex-col items-center
rounded border-solid border-2 border-light-gray
p-base gap-base
materials"
    >
      <Title text="Materiais"></Title>
      {#await processMaterials}
        <Loader></Loader>
      {:then materials}
        <div
          class="
w-full h-[50%]
grid grid-cols-1
px-base
overflow-y-scroll
currMaterials"
        >
          {#if materials.length === 0}
            <div
              class="
w-full h-full
flex items-center justify-center
noMaterials"
            >
              <Subtitle text="Sem materiais"></Subtitle>
            </div>
          {:else}
            {#each materials as materialInfo, i}
              <ProcessMaterialCard
                onDelete={() => {
                  processMaterials = fetchProcessMaterials();
                }}
                processId={processInfo.process_id}
                materialId={materialInfo.material_id}
                material={materialInfo.material_name}
                qtd={materialInfo.material_qtd}
              ></ProcessMaterialCard>
            {/each}
          {/if}
        </div>
        <AddProcessMaterialForm
          processId={processInfo.process_id}
          onEdit={() => {
            processMaterials = fetchProcessMaterials();
          }}
        ></AddProcessMaterialForm>
      {/await}
    </div>
  </div>
  <div
    class="
w-full h-[45%]
flex flex-col items-center
gap-base p-base
border-solid border-2 border-light-gray
rounded
childItems"
  >
    {#await processChildItems}
      <Loader></Loader>
    {:then childItems}
      <Title text="Itens filhos" />
      <div
        class="
  h-1/2 w-full
  overflow-y-auto
  border-solid border-2 border-light-gray
  rounded
  gap-base p-base
  flex flex-wrap items-start justify-start
  currChildItems"
      >
        {#if childItems.length === 0}
          <div
            class="
      w-full h-full
      flex items-center justify-center
      emptyWarn"
          >
            <Subtitle text="Sem itens filhos"></Subtitle>
          </div>
        {:else}
          {#each childItems as item, i}
            <ChildItemCard
              on:childItemRemoved={() => {
                processChildItems = fetchProcessChildItems();
              }}
              index={i}
              processId={processInfo.process_id}
              itemInfo={item}
            ></ChildItemCard>
          {/each}
        {/if}
      </div>
      <div
        class="
  w-full h-1/2
  addChildItem"
      >
        <AddChildItemForm
          on:childItemsUpdate={() => {
            processChildItems = fetchProcessChildItems();
          }}
          processItemId={processInfo.item_id}
          processId={processInfo.process_id}
          currChildItems={childItems}
        ></AddChildItemForm>
      </div>
    {/await}
  </div>
</div>
