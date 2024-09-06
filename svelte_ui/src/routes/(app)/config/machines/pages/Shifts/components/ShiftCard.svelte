<script lang="ts">
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import { deleteMachineShift } from "../api/machines_shifts.api";
  import { fly } from "svelte/transition";

  export let index: number;
  export let machineId: number;
  export let shiftId: number;
  export let machine: string;
  export let start: string;
  export let end: string;

  export let shiftDeleted: () => void;

  const splittedMachine = machine.split("-");
  const machineIndex = Number(splittedMachine.at(-1));

  const deleteShift = () => {
    const promise = deleteMachineShift({
      machineIndex: machineIndex,
      machineId: machineId,
      shiftId: shiftId,
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Removendo turno",
    });
    promise.then(() => {
      shiftDeleted();
    });
  };
</script>

<div
  in:fly|global={{ x: -50, duration: 300, delay: index * 100 }}
  class="
    flex
    h-24 w-full
    rounded
    border-solid border-2 border-light-gray
    shiftCard"
>
  <div
    class="
      h-full w-[5%]
      flex justify-center items-center
      bg-black
      rounded-l
      text-white
      font-semibold
      index"
  >
    {index + 1}
  </div>
  <div
    class="
      p-base
      flex items-center justify-between
      h-full w-[95%]
      shiftData"
  >
    <LabeledText width="w-[20%]" label="Máquina" text={machine}></LabeledText>
    <LabeledText width="w-[20%]" label="Hora inicial" text={start}
    ></LabeledText>
    <LabeledText width="w-[20%]" label="Hora final" text={end}></LabeledText>
    <Icon
      icon="fas fa-trash-alt"
      color="text-base-red hover:text-base-red-hover transition duration-300"
      clickOptions={{
        clickFunction: deleteShift,
        isClickable: true,
      }}
      size="medium"
    ></Icon>
  </div>
</div>
