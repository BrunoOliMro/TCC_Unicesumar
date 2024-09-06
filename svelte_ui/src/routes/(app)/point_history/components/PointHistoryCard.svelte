<script lang="ts">
  import { Datetime } from "$lib/utils/Datetime";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import type { PointHistoryInfo } from "../types/point_history.types";
  import { fly } from "svelte/transition";

  export let pointInfo: PointHistoryInfo;
  export let index: number;
</script>

<div
  in:fly|global={{ duration: 300, x: -50 }}
  class="
h-24 w-full
rounded
flex
border-solid border-2 border-light-gray
pointHistoryCard"
>
  <div
    class="
    flex items-center justify-center
    text-white font-semibold
    {Datetime.isAfterStringDates(pointInfo.point_date, pointInfo.next_date)
      ? 'bg-base-red'
      : 'bg-base-green'}
    w-[5%] h-full
    indexBox"
  >
    {index + 1}
  </div>
  <div
    class="
    h-full w-[95%]
    flex items-center justify-between
    gap-base p-base
    pointInfos"
  >
    <LabeledText label="ODF" text={pointInfo.odf} width="w-[10%]"></LabeledText>
    <LabeledText label="Item" text={pointInfo.item} width="w-[10%]"
    ></LabeledText>
    <LabeledText label="Máquina" text={pointInfo.machine} width="w-[10%]"
    ></LabeledText>
    <LabeledText label="Nº op" text={pointInfo.op_num} width="w-[10%]"
    ></LabeledText>
    <LabeledText
      label="Data planejada"
      text={Datetime.formatDatetimeString(pointInfo.next_date)}
      width="w-[10%]"
    ></LabeledText>
    <LabeledText
      label="Data apontada"
      text={Datetime.formatDatetimeString(pointInfo.point_date)}
      width="w-[10%]"
    ></LabeledText>
  </div>
</div>
