<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import {
    addToolImg,
    deleteItemProcessTool,
    findToolImg,
  } from "../api/items.api";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let index: number;
  export let toolId: number;
  export let processId: number;
  export let tool: string;

  let imgInput: any;
  let showImgUpload = false;

  const handleImgInput = (ev: any) => {
    const promise = addToolImg(toolId, imgInput.files[0]);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando imagem",
    }).then(() => {
      dataPromise = fetchData();
    });
    showImgUpload = false;
  };

  const handleDeleteProcessTool = () => {
    const promise = deleteItemProcessTool(toolId, processId);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Deletando ferramental",
    });
    promise.then(() => {
      dispatch("toolDeleted", index);
    });
  };

  const fetchData = async (): Promise<{
    toolImg?: string;
  }> => {
    const toolImg = await findToolImg(toolId);

    return {
      toolImg: toolImg.data,
    };
  };

  let dataPromise = fetchData();
</script>

<div
  in:fade|global={{ duration: 300 }}
  class="
w-[375px] h-16
flex
gap-base
border-solid border-2 border-light-gray
rounded
processToolCard"
>
  <div
    class="
w-[20%] h-full
flex items-center justify-center
"
  >
    {#await dataPromise then data}
      {#if showImgUpload}
        <input
          accept="image/jpeg, image/jpg"
          on:input={(ev) => handleImgInput(ev)}
          bind:this={imgInput}
          type="file"
          class="hidden"
        />
        <div
          in:fade={{ duration: 300 }}
          on:mouseleave={() => (showImgUpload = false)}
          on:click={() => {
            imgInput.click();
          }}
          aria-hidden
          class="
h-12 w-full
mx-4
{!showImgUpload ? 'pointer-events-none' : 'pointer-events-auto'}
cursor-pointer
flex items-center justify-center
uploadImg"
        >
          <Icon
            color="text-main-color"
            icon="fas fa-file-upload"
            size="extra"
            clickOptions={{
              isClickable: true,
              clickFunction: () => {},
            }}
          ></Icon>
        </div>
      {:else}
        <div
          in:fade={{ duration: 300 }}
          on:mouseenter={() => (showImgUpload = true)}
          aria-hidden
          class="
h-12 w-full
relative mx-4
flex items-center justify-center
cursor-pointer {showImgUpload ? 'pointer-events-none' : 'pointer-events-auto'}
itemImg"
        >
          <!-- <img
      src={`${staticItemsRoute}/items/${itemImg}`}
      alt="part_img"
      class="h-full"
    /> -->
          <img
            src={`data:image/jpg;base64,${data.toolImg}`}
            alt="part_img"
            class="h-full"
          />
        </div>
      {/if}
    {/await}
  </div>
  <div
    class="
      w-[80%] h-full
      flex items-center justify-between
      p-base gap-base
      toolInfo"
  >
    <LabeledText width="w-[50%]" label="Ferramental" text={tool}></LabeledText>
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteProcessTool,
      }}
      color="text-base-red hover:text-base-red-hover transition duration-300"
      icon="fas fa-trash-alt"
      size="medium"
    ></Icon>
  </div>
</div>
