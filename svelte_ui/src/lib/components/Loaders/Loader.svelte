<script lang="ts">
  export let type: "inner" | "fixed" = "inner";
</script>

<div
  class="
flex justify-center items-center
{type === 'inner' ? 'h-full w-full' : 'w-[100dvw] h-[100dvh] fixed'}
loader"
>
  <img
    class="
    {type === 'inner' ? 'w-[200px] h-[100px]' : 'w-[500px] h-[250px]'}"
    src="{import.meta.env['VITE_SERVER_ROUTE']}/static/gifs/axonLoader.gif"
    alt="logo"
  />
</div>
