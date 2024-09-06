<script lang="ts">
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import { Datetime } from "$lib/utils/Datetime";
  import { fly } from "svelte/transition";
  import type { SequenceHistoryRegister } from "../types/sequence.types";

  export let registerInfo: SequenceHistoryRegister;
  export let index: number;

  const cardBackground = registerInfo.sequence_error
    ? "bg-base-red"
    : registerInfo.ended
      ? "bg-base-green"
      : "bg-base-yellow";
</script>

<div
  in:fly|global={{ duration: 300, x: -50 }}
  class="
    h-24 w-full
    rounded
    border-solid border-2 border-light-gray
    flex
    sequenceHistoryCard"
>
  <div
    class={`
        w-[5%] h-full
        ${cardBackground}
        font-semibold
        flex items-center justify-center
        text-white
        rounded-l
        index`}
  >
    {index + 1}
  </div>
  <div
    class="
      w-[95%] h-full
      flex justify-between items-start
      p-base gap-base
      sequenceCardInfo"
  >
    <LabeledText label="Observação" text={registerInfo.obs} width="w-[30%]"
    ></LabeledText>
    <LabeledText label="Usuário" text={registerInfo.username} width="w-[20%]"
    ></LabeledText>
    <LabeledText
      width="w-[25%]"
      label="Início"
      text={Datetime.convertDatabaseDatetimeStringToAppDatetime(
        registerInfo.start_timestamp
      )}
    ></LabeledText>
    <LabeledText
      width="w-[25%]"
      label="Fim"
      text={registerInfo.end_timestamp
        ? Datetime.convertDatabaseDatetimeStringToAppDatetime(
            registerInfo.end_timestamp
          )
        : "Não finalizado"}
    ></LabeledText>
  </div>
</div>
