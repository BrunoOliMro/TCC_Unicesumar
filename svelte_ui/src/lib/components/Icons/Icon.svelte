<script lang="ts">
  export let icon: string;
  export let size: "big" | "medium" | "small" | "extra";
  export let color: string;

  export let clickOptions = {
    isClickable: false,
    clickFunction: () => {},
  };

  let textSize =
    size === "big"
      ? "text-2xl"
      : size === "medium"
        ? "text-lg"
        : size === "small"
          ? "text-md"
          : "text-4xl";
</script>

<i
  on:click={clickOptions.clickFunction}
  aria-hidden
  class="
{clickOptions.isClickable ? 'cursor-pointer' : ''}
{icon} {textSize} {color}
transition duration-300"
></i>
