<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import SequenceHistoryCard from "../components/SequenceHistoryCard.svelte";
  import type { SequenceHistoryRegister } from "../types/sequence.types";
  import { findSequenceHistoryRegisters } from "../api/general.api";
  import InvalidDays from "../components/InvalidDays.svelte";
  import GeneralSettingsForm from "../components/GeneralSettingsForm.svelte";
  import SequencePriority from "../components/SequencePriority.svelte";

  let sequenceHistoryRegisters: SequenceHistoryRegister[] = [];
  let sequenceHistoryRegistersStream: EventSource | null;

  const startStreams = async (): Promise<void> => {
    sequenceHistoryRegistersStream = await findSequenceHistoryRegisters();
    sequenceHistoryRegistersStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        sequenceHistoryRegistersStream?.close();
        sequenceHistoryRegistersStream = null;
        return;
      }
      sequenceHistoryRegisters = sequenceHistoryRegisters.concat(
        JSON.parse(ev.data)
      );
    };
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (sequenceHistoryRegistersStream) {
      sequenceHistoryRegistersStream.close();
    }
    sequenceHistoryRegistersStream = null;
  });
</script>

<div
  class="
w-full h-[90%]
rounded
flex
generalConfig"
>
  <div
    class="
h-full w-1/2
flex flex-col items-center
gap-base
sequenceHistory"
  >
    <Title text="Histórico de sequenciamentos"></Title>
    <div
      class="
h-full w-full
content-start
grid grid-cols-1
overflow-y-scroll
gap-base
pr-base
registers"
    >
      {#each sequenceHistoryRegisters as register, i}
        <SequenceHistoryCard registerInfo={register} index={i}
        ></SequenceHistoryCard>
      {/each}
    </div>
  </div>
  <div
    class="
h-full w-1/2
flex flex-col
gap-base
p-base
config"
  >
    <InvalidDays></InvalidDays>
    <GeneralSettingsForm></GeneralSettingsForm>
    <SequencePriority></SequencePriority>
  </div>
</div>
