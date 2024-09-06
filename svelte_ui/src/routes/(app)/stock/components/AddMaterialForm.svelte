<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { createEventDispatcher } from "svelte";
  import { addMaterial } from "../api/stock.api";

  const dispatch = createEventDispatcher();

  let materialName: string;
  let materialQtd: number;

  const handleAddMaterial = () => {
    const promise = addMaterial(materialName, materialQtd);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando material",
    });
    promise.then((res) => {
      dispatch("materialAdded", {
        id: res.data.data.stock_id,
        material: materialName,
        materialQtd: materialQtd,
        materialId: res.data.data.material_id,
      });
    });
  };
</script>

<div
  class="
    h-1/3 w-full
    flex flex-col items-center justify-between
    border-solid border-2 border-light-gray
    rounded
    gap-base p-base
    addMaterialForm"
>
  <Title text="Adicionar material" />
  <div
    class="
  w-full
  grid grid-cols-3
  form"
  >
    <InputForm label="Material" type="vertical">
      <TextInput bind:value={materialName}></TextInput>
    </InputForm>
    <InputForm label="Quantidade" type="vertical">
      <NumberInput bind:value={materialQtd} max={999999} min={0}></NumberInput>
    </InputForm>
  </div>
  <div
    class="
  w-full
  flex items-center justify-end
  buttonDiv"
  >
    <Button clickFunction={handleAddMaterial} text="Adicionar"></Button>
  </div>
</div>
