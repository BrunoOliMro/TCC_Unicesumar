<script lang="ts">
  import Icon from "../Icons/Icon.svelte";

  export let value: string;
</script>

<div
  class="
flex items-center
gap-base p-2
h-12 w-[200px]
border-solid border-2 border-light-gray
rounded
searchInput"
>
  <input
    class="
  border-none outline-none
  w-[90%] h-full
  pl-2
  "
    type="text"
    bind:value
  />
  <Icon color="text-black" size="medium" icon="fas fa-search"></Icon>
</div>
