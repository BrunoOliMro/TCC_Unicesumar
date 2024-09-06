<script lang="ts">
  export let label: string;
  export let text: String | number;
  export let width: string = "w-auto";
</script>

<div
  class={`
    ${width}
    flex flex-col items-center text-center
    `}
>
  <p class="text-md font-bold">{label}</p>
  <p class="text-sm font-light">{text}</p>
</div>
