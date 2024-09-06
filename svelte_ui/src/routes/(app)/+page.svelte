<script lang="ts">
  import ActiveMachineCard from "./components/ActiveMachineCard.svelte";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import type { ActiveMachineEntity } from "./types/landing.types";
  import { findNextActiveMachines } from "./api/landing.api";
  import FullPageText from "$lib/components/Texts/FullPageText.svelte";
  import { onDestroy, onMount } from "svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";

  let streamEventReceived = false;

  localStorage.removeItem("selectedPage");

  let activeMachinesStream: EventSource | null;
  let activeMachines: {
    [machineGroup: string]: ActiveMachineEntity[];
  } = {};

  const startStreams = async () => {
    activeMachinesStream = await findNextActiveMachines();
    activeMachinesStream.onmessage = (ev) => {
      streamEventReceived = true;
      const parsedEvData = JSON.parse(ev.data);
      if (parsedEvData.end) {
        activeMachinesStream?.close();
        activeMachinesStream = null;
        return;
      }

      for (const machine of parsedEvData as ActiveMachineEntity[]) {
        if (!activeMachines[machine.machine_group])
          activeMachines[machine.machine_group] = [];
        activeMachines[machine.machine_group].push(machine);
        activeMachines = activeMachines;
      }
    };
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (activeMachinesStream) activeMachinesStream.close();
    activeMachinesStream = null;
  });
</script>

<div class="main-container h-full w-full">
  <div
    class="machines
      h-full w-full
      flex flex-col flex-wrap justify-start items-start content-start
      overflow-x-auto gap-base
      "
  >
    {#if !streamEventReceived}
      <Loader></Loader>
    {:else if Object.entries(activeMachines).length === 0}
      <FullPageText type="normal" text="Sem máquinas disponíveis" />
    {:else}
      {#each Object.entries(activeMachines) as [machineGroup, machines]}
        <Subtitle text={machineGroup}></Subtitle>
        {#each machines as machine}
          <ActiveMachineCard
            params={{
              delayed: machine.machine_delayed,
              machineId: machine.id,
              machineIndex: machine.machine_index,
              machine: `${machine.machine_name}-${machine.machine_index}`,
            }}
          ></ActiveMachineCard>
        {/each}
      {/each}
    {/if}
  </div>
</div>
