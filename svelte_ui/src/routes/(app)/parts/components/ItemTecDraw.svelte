<script lang="ts">
  import Loader from "../../../../lib/components/Loaders/Loader.svelte";
  import FullPageText from "../../../../lib/components/Texts/FullPageText.svelte";
  import Title from "../../../../lib/components/Texts/Title.svelte";
  import { findItemTecDraw } from "../../config/items/pages/Items/api/items.api";

  export let itemId: number;

  const fetchData = async (): Promise<{
    itemTecDraw?: string;
  }> => {
    const itemTecDraw = await findItemTecDraw(itemId);
    return {
      itemTecDraw: itemTecDraw.data,
    };
  };
</script>

<div
  class="
w-full h-full
flex flex-col
items-center justify-between
itemTecDraw"
>
  <Title text="Desenho técnico"></Title>
  <div
    class="
  h-[90%] w-full
  flex items-center justify-center
  rounded
  border-solid border-2 border-light-gray
  img"
  >
    {#await fetchData()}
      <Loader type="inner"></Loader>
    {:then data}
      {#if data.itemTecDraw}
        <img
          src={`data:image/jpg;base64,${data.itemTecDraw}`}
          alt="part_img"
          class="h-full"
        />
      {:else}
        <FullPageText text="Sem desenho"></FullPageText>
      {/if}
    {/await}
  </div>
</div>
