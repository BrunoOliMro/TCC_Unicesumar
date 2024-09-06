<script lang="ts">
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import { fly } from "svelte/transition";
  import { Datetime } from "$lib/utils/Datetime";

  export let machine: string;
  export let opNum: number;
  export let startDatetime: string;
  export let endDatetime: string;
  export let grouping: string | undefined;
  export let invalidSequenceReason: string;
  export let index: number;
</script>

<div
  in:fly|global={{ x: -50, duration: 500, delay: index * 100 + 300 }}
  out:fly|global={{ x: -50, duration: 300 }}
  class="
        w-full h-24
        flex items-center justify-between
        border-solid border-2 border-light-gray
        rounded
        gap-base
        p-base
        processCard"
>
  <LabeledText width="w-[10%]" label="Máquina" text={machine}></LabeledText>
  <LabeledText width="w-[10%]" label="Nº op" text={opNum}></LabeledText>
  <LabeledText width="w-[10%]" label="Grupo" text={grouping || "Sem grupo"}
  ></LabeledText>
  {#if endDatetime}
    <LabeledText
      width="w-[10%]"
      label="Início"
      text={startDatetime
        ? Datetime.formatDatetimeString(startDatetime)
        : "Não sequenciado"}
    ></LabeledText>
    <LabeledText
      width="w-[10%]"
      label="Fim"
      text={endDatetime
        ? Datetime.formatDatetimeString(endDatetime)
        : "Não sequenciado"}
    ></LabeledText>
  {:else}
    <LabeledText
      width="w-[30%]"
      label="Justificativa"
      text={invalidSequenceReason || "Sem justificativa"}
    ></LabeledText>
  {/if}
</div>
