<script lang="ts">
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  const flipDurationMs = 100;

  export let onEdit: (list: ListItem[]) => void = () => {};

  interface ListItem {
    id: number;
    title: string;
    value: any;
  }

  export let items: ListItem[];

  const handleConsider = (evt: CustomEvent<DndEvent<ListItem>>) => {
    items = evt.detail.items;
  };

  const handleFinalize = (evt: CustomEvent<DndEvent<ListItem>>) => {
    items = evt.detail.items;
    onEdit(items);
  };
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <section
    use:dndzone={{
      items: items,
      flipDurationMs: flipDurationMs,
      dropTargetStyle: {},
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
  >
    {#each items as item (item.id)}
      <div
        class="card text-white bg-main-color
        font-semibold
        flex items-center justify-center
        rounded px-4 py-2 w-[250px] my-4 font-button shadow-button"
        animate:flip={{ duration: flipDurationMs }}
      >
        {item.title}
      </div>
    {/each}
  </section>
</div>
