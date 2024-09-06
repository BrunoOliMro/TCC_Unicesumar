<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import FullPageText from "$lib/components/Texts/FullPageText.svelte";
  import { addItemTecDraw, findItemTecDraw } from "../api/items.api";
  import Title from "$lib/components/Texts/Title.svelte";

  export let itemId: number;

  let tecDrawInput: any;

  const handleUploadTecDraw = (ev: any) => {
    const promise = addItemTecDraw(itemId, tecDrawInput.files[0]);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando imagem",
    }).then(() => {
      dataPromise = fetchData();
    });
  };

  const fetchData = async (): Promise<{
    tecDraw?: string;
  }> => {
    const itemTecDraw = await findItemTecDraw(itemId);

    return {
      tecDraw: itemTecDraw.data,
    };
  };

  let dataPromise = fetchData();
</script>

<div
  class="
w-full h-full
flex flex-col
gap-base
tecDrawEdit"
>
  <div
    class="
w-full
flex justify-center items-center
titleDiv"
  >
    <Title text="Editar desenho"></Title>
  </div>
  <div
    class="
    w-full h-[90%]
    flex items-center justify-center
    rounded
    border-solid border-2 border-light-gray
    currentImage"
  >
    {#await dataPromise then data}
      {#if data.tecDraw}
        <img
          src={`data:image/jpg;base64,${data.tecDraw}`}
          alt="part_img"
          class="h-full"
        />
      {:else}
        <FullPageText text="Sem desenho" type="normal"></FullPageText>
      {/if}
    {/await}
  </div>
  <div
    class="
  w-full h-[10%]
  flex items-center justify-center
  addImgForm"
  >
    <input
      accept="image/jpeg, image/jpg"
      on:input={(ev) => handleUploadTecDraw(ev)}
      bind:this={tecDrawInput}
      type="file"
      class="hidden"
    />
    <Button
      clickFunction={() => tecDrawInput.click()}
      buttonType="normal"
      text="Adicionar"
    ></Button>
  </div>
</div>
