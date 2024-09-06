<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { addItemType } from "../Items/api/items.api";
  import { findItemTypes } from "./api/item_types.api";
  import ItemTypeCard from "./components/ItemTypeCard.svelte";
  import type { ItemTypeInfo } from "./types/item_types.types";

  let newItemType = "";

  let itemTypes: ItemTypeInfo[] = [];

  const handleAddItemType = () => {
    const promise = addItemType(newItemType, "rgba(255,38,38,0.5)");
    ToasterHandler.createPromiseToast({
      loadingMessage: "Adicionando tipo de item",
      promise: promise,
    });
    promise.then(() => {
      fetchData();
    });
  };

  const fetchData = async () => {
    const res = await findItemTypes();
    itemTypes = res.data;
  };

  fetchData();
</script>

<div
  class="
flex
gap-base p-base
itemTypes"
>
  <div
    class="
w-1/2 h-[700px]
overflow-y-scroll
flex flex-wrap
gap-base px-base
currentItemTypes"
  >
    {#await fetchData}
      <Loader></Loader>
    {:then}
      {#each itemTypes as itemType}
        <ItemTypeCard
          bgColor={itemType.type_hex}
          itemTypeId={itemType.id}
          itemType={itemType.type}
          on:itemTypeDelete={() => {
            fetchData();
          }}
        ></ItemTypeCard>
      {/each}
    {/await}
  </div>
  <div
    class="
  w-1/2 h-fit
  flex flex-col items-center
  gap-base p-base
  border-solid border-2 border-light-gray
  rounded
  itemTypes"
  >
    <Title text="Adicionar tipo"></Title>
    <div
      class="
flex flex-col
w-full
gap-base
addItemType"
    >
      <InputForm type="vertical" label="Tipo">
        <TextInput bind:value={newItemType}></TextInput>
      </InputForm>
      <div
        class="
w-full
flex justify-end items-center
buttonDiv"
      >
        <Button clickFunction={handleAddItemType} text="Adicionar"></Button>
      </div>
    </div>
  </div>
</div>
