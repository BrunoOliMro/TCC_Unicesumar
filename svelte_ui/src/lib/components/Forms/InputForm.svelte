<script lang="ts">
  import FormLabel from "../Texts/FormLabel.svelte";

  export let type: "horizontal" | "vertical";
  export let label: string;
</script>

<div
  class="
flex {type === 'vertical' ? 'flex-col items-start' : 'items-center'}
gap-[4px]
inputForm"
>
  <FormLabel text="{label}: "></FormLabel>
  <slot></slot>
</div>
