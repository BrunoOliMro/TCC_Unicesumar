<script lang="ts">
  export let value: number;
  export let max: number;
  export let min: number;

  export let size: "normal" | "small" = "normal";
</script>

<input
  {max}
  {min}
  class="
    {size === 'normal' ? 'w-[200px]' : 'w-[100px]'}
    border-solid border-2 border-light-gray
    rounded
    focus:border-main-color
    outline-none
    transition duration-300
    h-12
    py-2 px-2
    "
  type="number"
  bind:value
/>
