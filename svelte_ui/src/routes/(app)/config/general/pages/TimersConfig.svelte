<script lang="ts">
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import TimeInput from "$lib/components/Inputs/TimeInput.svelte";
  import FullPageText from "$lib/components/Texts/FullPageText.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { addSequenceTimer, findSequenceTimers } from "../api/general.api";
  import TimerCard from "../components/TimerCard.svelte";
  import type { TimerInfo } from "../types/sequence.types";

  let inputTime: string;

  const handleAddTimer = async () => {
    const dataPromise = addSequenceTimer(inputTime);

    ToasterHandler.createPromiseToast({
      promise: dataPromise,
      loadingMessage: "Adicionando timer",
    }).then(() => {
      promise = fetchData();
    });
  };

  const fetchData = async (): Promise<{
    timers: TimerInfo[];
  }> => {
    const timersInfo = await findSequenceTimers();

    return {
      timers: timersInfo.data,
    };
  };

  let promise = fetchData();
</script>

{#await promise}
  <Loader type="inner"></Loader>
{:then data}
  <div
    class="
w-full h-[90%]
rounded
gap-base
flex
timersConfig"
  >
    {#if data.timers.length > 0}
      <div
        class="
    h-[700px] w-1/2
    flex flex-wrap content-start
    rounded
    overflow-y-auto
    border-solid border-2 border-light-gray
    gap-base p-base
    currentTimers"
      >
        {#each data.timers as timer}
          <TimerCard
            on:delete={() => {
              promise = fetchData();
            }}
            timer={timer.sequence_time}
            timerId={timer.id}
          ></TimerCard>
        {/each}
      </div>
    {:else}
      <div
        class="
        h-full w-1/2
        rounded
        border-solid border-2 border-light-gray
        emptyTimers"
      >
        <FullPageText text="Sem timers" type="normal"></FullPageText>
      </div>
    {/if}
    <div
      class="
    w-1/2 h-full
    addTimer"
    >
      <div
        class="
        w-full h-1/2
        rounded
        p-base gap-base
        border-solid border-2 border-light-gray
        flex flex-col justify-between
        addTimerForm"
      >
        <div
          class="
      w-full
      flex items-center justify-center
      titleDiv"
        >
          <Title text="Adicionar timer"></Title>
        </div>
        <InputForm label="Horário" type="vertical">
          <TimeInput bind:value={inputTime}></TimeInput>
        </InputForm>
        <div
          class="
        w-full
        flex items-center justify-end
        buttonDiv"
        >
          <Button
            text="Adicionar"
            buttonType="normal"
            clickFunction={handleAddTimer}
          ></Button>
        </div>
      </div>
    </div>
  </div>
{/await}
