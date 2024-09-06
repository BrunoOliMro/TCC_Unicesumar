<script lang="ts">
  export let value: string;
</script>

<input
  class="
w-[200px]
border-solid border-2 border-light-gray
rounded
focus:border-main-color
outline-none
transition duration-300
h-12
py-2 px-2
"
  type="date"
  bind:value
/>
