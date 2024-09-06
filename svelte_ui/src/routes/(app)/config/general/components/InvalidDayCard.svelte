<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import { fade } from "svelte/transition";
  import { addInvalidDay, deleteInvalidDay } from "../api/general.api";

  export let day: string;
  export let dayId: number;
  export let active: boolean;

  $: cardBackground = active
    ? "bg-base-red hover:bg-base-green"
    : "bg-base-green hover:bg-base-red";

  const handleInvalidDaysClick = () => {
    const promise = active ? deleteInvalidDay(dayId) : addInvalidDay(dayId);

    ToasterHandler.createPromiseToast({
      loadingMessage: active
        ? "Removendo dia inválido"
        : "Adicionando dia inválido",
      promise: promise,
    });
    promise.then(() => {
      active = !active;
    });
  };
</script>

<div
  in:fade|global={{ duration: 300 }}
  on:click={handleInvalidDaysClick}
  aria-hidden
  class={`
    cursor-pointer
    h-12 w-40
    rounded
    border-solid border-2 border-light-gray
    flex items-center justify-center
    font-semibold
    text-white
    ${cardBackground}
    p-base
    transition duration-300
    dayCard`}
>
  {day}
</div>
