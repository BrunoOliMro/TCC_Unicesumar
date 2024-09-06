<script lang="ts">
  import Icon from "../Icons/Icon.svelte";

  export let plusFunction: () => void;
  export let minusFunction: () => void;
  export let width = "w-[150px]";
</script>

<div
  class={`
        h-full ${width}
        flex items-center
        p-base gap-base
        updatedQtd`}
>
  <Icon
    clickOptions={{
      isClickable: true,
      clickFunction: plusFunction,
    }}
    color="text-base-green hover:text-base-green-hover transition duration-300"
    icon="fas fa-plus-circle"
    size="medium"
  ></Icon>
  <Icon
    clickOptions={{
      isClickable: true,
      clickFunction: minusFunction,
    }}
    color="text-base-red hover:text-base-red-hover transition duration-300"
    icon="fas fa-minus-circle"
    size="medium"
  ></Icon>
</div>
