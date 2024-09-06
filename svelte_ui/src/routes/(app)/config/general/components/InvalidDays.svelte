<script lang="ts">
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import { findInvalidDays } from "../api/general.api";
  import InvalidDayCard from "./InvalidDayCard.svelte";

  const fetchInvalidDays = async (): Promise<number[]> => {
    const res = await findInvalidDays();
    return res.data;
  };

  let invalidDays: Promise<number[]> = fetchInvalidDays();
</script>

<div
  class="
    w-full h-gap-vertical-1/3-box
    flex flex-col items-center
    border-solid border-2 border-light-gray
    rounded
    p-base
    gap-base
    validDays"
>
  <Subtitle text="Dias válidos"></Subtitle>
  <div
    class="
        w-full h-full
        flex flex-wrap justify-center
        gap-base
        content-start
        invalidDays"
  >
    {#await invalidDays then days}
      <InvalidDayCard active={days.includes(1)} day="Segunda" dayId={1}
      ></InvalidDayCard>
      <InvalidDayCard active={days.includes(2)} day="Terça" dayId={2}
      ></InvalidDayCard>
      <InvalidDayCard active={days.includes(3)} day="Quarta" dayId={3}
      ></InvalidDayCard>
      <InvalidDayCard active={days.includes(4)} day="Quinta" dayId={4}
      ></InvalidDayCard>
      <InvalidDayCard active={days.includes(5)} day="Sexta" dayId={5}
      ></InvalidDayCard>
      <InvalidDayCard active={days.includes(6)} day="Sábado" dayId={6}
      ></InvalidDayCard>
      <InvalidDayCard active={days.includes(0)} day="Domingo" dayId={0}
      ></InvalidDayCard>
    {/await}
  </div>
</div>
