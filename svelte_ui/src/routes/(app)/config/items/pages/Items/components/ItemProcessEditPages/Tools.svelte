<script lang="ts">
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import { findProcessTools } from "../../../Processes/api/processes.api";
  import type { ToolInfo } from "../../../Processes/types/processes.types";
  import Button from "$lib/components/Buttons/Button.svelte";
  import { addItemProcessTool } from "../../api/items.api";
  import ToasterHandler from "$lib/toaster/toaster";
  import ProcessToolCard from "../ProcessToolCard.svelte";

  export let processId: number;

  let processTools: ToolInfo[] = [];

  let newTool: string;

  const handleAddTool = () => {
    const promise = addItemProcessTool(processId, newTool);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando ferramental",
    });
    promise.then((res) => {
      processTools.push({ tool: newTool, tool_id: res.data.data.tool_id });
      processTools = processTools;
    });
  };

  const handleToolDelete = (ev: any) => {
    processTools.splice(ev.detail.index, 1);
    processTools = processTools;
  };

  const fetchData = async () => {
    processTools = (await findProcessTools(processId)).data;
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
    addTool"
    >
      <Title text="Adicionar ferramental"></Title>
      <TextInput bind:value={newTool}></TextInput>
      <div
        class="
      w-full
      flex items-center justify-end
      buttonDiv"
      >
        <Button text="Adicionar" clickFunction={handleAddTool}></Button>
      </div>
    </div>
    <div
      class="
    w-full h-[50%]
    flex flex-col items-center justify-start
    p-base gap-base
    border-solid border-2 border-light-gray
    currToolsDiv"
    >
      <Title text="Ferramentais adicionados"></Title>
      <div
        class="
    w-full h-[90%]
    flex flex-wrap content-start
    gap-base p-base
    overflow-y-auto
    border-solid border-2 border-light-gray
    rounded
    currTools"
      >
        {#each processTools as tool, i}
          <ProcessToolCard
            tool={tool.tool}
            toolId={tool.tool_id}
            {processId}
            index={i}
            on:toolDeleted={handleToolDelete}
          ></ProcessToolCard>
        {/each}
      </div>
    </div>
  </div>
{/await}
