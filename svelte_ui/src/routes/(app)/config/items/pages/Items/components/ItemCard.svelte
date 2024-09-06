<script lang="ts">
  import Icon from "$lib/components/Icons/Icon.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import { addItemImg, deleteItem } from "../api/items.api";
  import { fade, fly } from "svelte/transition";
  import ItemProcesses from "./ItemProcesses.svelte";
  import type { GeneralItemInfo } from "../types/items.types";
  import { createEventDispatcher } from "svelte";
  import SimplePopup from "$lib/components/Popups/SimplePopup.svelte";
  import TecDrawEdit from "./TecDrawEdit.svelte";

  const dispatch = createEventDispatcher();

  export let companyItems: GeneralItemInfo[];
  export let itemId: number;
  export let item: string;
  export let price: number;
  export let partNumberType: string | undefined;
  export let itemColor: string | undefined;
  export let itemImg: string;

  const itemBg = itemColor ? `bg-[${itemColor}]` : "bg-white";

  let showImgUpload = false;
  let imgInput: any;

  let tecDrawIsOpen = false;

  let cardIsOpen = false;

  const handleDeleteItem = () => {
    const promise = deleteItem(itemId);

    ToasterHandler.createPromiseToast({
      loadingMessage: "Deletando item",
      promise: promise,
    });

    promise.then(() => {
      dispatch("delete");
    });
  };

  const handleImgInput = (ev: any) => {
    const fileReader = new FileReader();
    let imgHex: string = "";
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
        const bytes = new Uint8Array(arrayBuffer);
        imgHex = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        const promise = addItemImg(itemId, imgInput.files[0]);
        ToasterHandler.createPromiseToast({
          promise: promise,
          loadingMessage: "Adicionando imagem",
        });
      } else {
        ToasterHandler.createErrorToast("Imagem inválida");
      }
    };
    const imgFile = ev.target.files[0];
    fileReader.readAsArrayBuffer(imgFile);
    showImgUpload = false;
  };
</script>

<div
  in:fly|global={{ x: -50, duration: 300 }}
  class="
w-full
flex flex-col
max-h-72
rounded
itemCard"
>
  <div
    in:fly|global={{ x: -50, duration: 300 }}
    class="
    w-full h-horizontal-card
    flex
    {itemBg}
    border-solid border-2 border-light-gray
    rounded
    itemInfos"
  >
    <div
      on:click={() => dispatch("edit")}
      aria-hidden
      class="
      cursor-pointer
      h-full w-[5%]
      flex items-center justify-center
    bg-black
      rounded-l
      hover:bg-black-hover
      transition duration-300"
    >
      <Icon icon="fas fa-edit" color="text-white" size="medium"></Icon>
    </div>
    <div
      class="
  w-[20%] h-full
  flex items-center justify-center
  "
    >
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
    cursor-pointer {showImgUpload
            ? 'pointer-events-none'
            : 'pointer-events-auto'}
    itemImg"
        >
          <!-- <img
            src={`${staticItemsRoute}/items/${itemImg}`}
            alt="part_img"
            class="h-full"
          /> -->
          <img
            src={`data:image/jpg;base64,${itemImg}`}
            alt="part_img"
            class="h-full"
          />
        </div>
      {/if}
    </div>
    <div
      on:dblclick={() => (cardIsOpen = !cardIsOpen)}
      aria-hidden
      class="
      h-full w-[75%]
      flex justify-between items-center
      p-base
      gap-base
      cursor-pointer
      info"
    >
      <LabeledText width="w-[30%]" label="Item" text={item} />
      <LabeledText width="w-[20%]" label="Preço" text={price} />
      <LabeledText
        width="w-[30%]"
        label="Tipo"
        text={partNumberType || "Normal"}
      />
      <Icon
        color="text-black hover:text-main-color transition duration-300"
        size="medium"
        clickOptions={{
          isClickable: true,
          clickFunction: () => (tecDrawIsOpen = true),
        }}
        icon="fas fa-ruler-combined"
      ></Icon>
      <Icon
        color="text-base-red hover:text-base-red-hover transition duration-300"
        size="medium"
        clickOptions={{
          isClickable: true,
          clickFunction: handleDeleteItem,
        }}
        icon="fas fa-trash-alt"
      ></Icon>
    </div>
  </div>
  {#if cardIsOpen}
    <ItemProcesses {companyItems} {itemId}></ItemProcesses>
  {/if}
</div>

<SimplePopup h="h-[95%]" w="w-[95%]" bind:isOpen={tecDrawIsOpen}>
  <TecDrawEdit {itemId}></TecDrawEdit>
</SimplePopup>
