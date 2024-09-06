<script lang="ts">
  export let type: "normal" | "warn" = "normal";
  export let text: string;
</script>

<div
  class="
w-full h-full
flex items-center justify-center
text-xl font-semibold
{type === 'warn' ? 'text-base-red' : 'text-black'}
tracking-wider
fullPageText"
>
  {text}
</div>
