<script lang="ts">
  import { fade } from "svelte/transition";
  import Icon from "../Icons/Icon.svelte";

  export let w: string;
  export let h: string;

  export let isOpen: boolean;
</script>

{#if isOpen}
  <div
    on:click={() => (isOpen = false)}
    transition:fade={{ duration: 300 }}
    aria-hidden
    class="
opacity-50
bg-black
fixed inset-0
left-0 top-0
min-h-[100dvh] min-w-[100vw]
h-full w-full
z-40
blackBg"
  ></div>
  <div
    class="
min-h-[100dvh] min-w-[100vw]
h-full w-full
absolute inset-0
flex items-center justify-center
top-0 left-0
popupDiv"
  >
    <div
      class="
  z-50
  bg-white
  rounded
  border-solid border-2 border-light-gray
  {w} {h}
  p-base
  transition duration-300
  relative
  popup"
    >
      <div
        class="
    absolute
    right-2 top-1
    header"
      >
        <Icon
          size="big"
          color="text-black"
          icon="fas fa-times"
          clickOptions={{
            isClickable: true,
            clickFunction: () => {
              isOpen = false;
            },
          }}
        ></Icon>
      </div>
      <div
        class="
      h-full w-full
      flex items-end justify-center
      popupContent"
      >
        <slot></slot>
      </div>
    </div>
  </div>
{/if}
