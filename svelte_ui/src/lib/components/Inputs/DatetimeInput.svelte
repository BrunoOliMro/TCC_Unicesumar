<script lang="ts">
  import InputForm from "../Forms/InputForm.svelte";
  import DateInput from "./DateInput.svelte";
  import TimeInput from "./TimeInput.svelte";

  export let date: string;
  export let time: string;

  export let datePlaceholder: string;
  export let timePlaceholder: string;
</script>

<div
  class="
flex gap-base
dateTimeInput"
>
  <InputForm type="vertical" label={datePlaceholder}>
    <DateInput bind:value={date}></DateInput>
  </InputForm>
  <InputForm type="vertical" label={timePlaceholder}>
    <TimeInput bind:value={time}></TimeInput>
  </InputForm>
</div>
