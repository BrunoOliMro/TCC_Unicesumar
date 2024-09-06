<script lang="ts">
  export let text: string;
  export let buttonType: "normal" | "red" | "green" = "normal";
  export let clickFunction: () => any;
  const buttonBg =
    buttonType === "normal"
      ? "bg-main-color hover:bg-main-color-hover"
      : buttonType === "red"
        ? "bg-base-red hover:bg-base-red-hover"
        : "bg-base-green hover:bg-base-green-hover";
</script>

<button
  on:click={clickFunction}
  class="
rounded
{buttonBg}
transition duration-300
text-white font-semibold uppercase
px-2 py-2
text-md
w-[150px]
">{text}</button
>
