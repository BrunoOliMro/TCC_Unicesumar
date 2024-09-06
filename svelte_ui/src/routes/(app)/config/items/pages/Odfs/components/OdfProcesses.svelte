<script lang="ts">
  import { slide } from "svelte/transition";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import ProcessCard from "./ProcessCard.svelte";
  import { findOdfProcesses } from "../api/odfs.api";
  import type { CompanyProcessInfo } from "../../Processes/types/processes.types";
  import Loader from "$lib/components/Loaders/Loader.svelte";

  export let odfId: number;

  const fetchOdfItemProcessesInfo = async (): Promise<CompanyProcessInfo[]> => {
    const res = await findOdfProcesses(odfId);
    return res.data;
  };

  let odfItemProcesses: Promise<CompanyProcessInfo[]> =
    fetchOdfItemProcessesInfo();
</script>

<div
  in:slide={{ duration: 300 }}
  out:slide={{ duration: 300, delay: 300 }}
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
  {#await odfItemProcesses}
    <div
      class="
h-12 w-full
flex justify-center items-center
loaderDiv"
    >
      <Loader type="inner"></Loader>
    </div>
  {:then processes}
    {#if processes.length === 0}
      <div
        class="
h-12 w-full
flex justify-center items-center
emptyItem"
      >
        <Subtitle text="Sem processos disponíveis"></Subtitle>
      </div>
    {:else}
      {#each processes as processInfo, i}
        <ProcessCard
          index={i}
          machine={`${processInfo.machine_name}${
            processInfo.machine_index ? `-${processInfo.machine_index}` : ""
          }`}
          invalidSequenceReason={processInfo.invalid_sequence_reason}
          opNum={processInfo.op_num}
          startDatetime={processInfo.start_datetime}
          endDatetime={processInfo.end_datetime}
          grouping={processInfo.item_grouping}
        ></ProcessCard>
      {/each}
    {/if}
  {/await}
</div>
