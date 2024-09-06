<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Button from "$lib/components/Buttons/Button.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import { findMaterials } from "../../../../../stock/api/stock.api";
  import type { MaterialInfo } from "../../../../../stock/types/stock.types";
  import { addProcessMaterial } from "../api/processes.api";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";

  export let onEdit: () => void;
  export let processId: number;

  const fetchCompanyMaterials = async (): Promise<MaterialInfo[]> => {
    const res = await findMaterials();
    return res.data;
  };

  const companyMaterials: Promise<MaterialInfo[]> = fetchCompanyMaterials();

  let selectedMaterialId: number;
  let materialQtd: number;

  const handleAddProcessMaterial = () => {
    const promise = addProcessMaterial(
      processId,
      selectedMaterialId,
      materialQtd
    );
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando material",
    });
    promise.then(() => {
      onEdit();
    });
  };
</script>

<div
  class="
    w-full
    flex flex-col items-center
    gap-base
    addProcessToolForm"
>
  <Subtitle text="Adicionar material"></Subtitle>
  <div
    class="
        w-full
        flex justify-around items-center
        gap-base
        inputs"
  >
    <InputForm label="Material" type="vertical">
      {#await companyMaterials}
        <Loader></Loader>
      {:then materials}
        <SelectInput
          options={materials.map((materialInfo) => {
            return {
              text: materialInfo.material_name,
              value: materialInfo.id,
            };
          })}
          bind:value={selectedMaterialId}
        ></SelectInput>
      {/await}
    </InputForm>
    <InputForm label="Quantidade" type="vertical">
      <NumberInput max={999999} min={0} bind:value={materialQtd}></NumberInput>
    </InputForm>
  </div>
  <div
    class="
    w-full
    flex justify-end
    buttonDiv"
  >
    <Button clickFunction={handleAddProcessMaterial} text="Adicionar"></Button>
  </div>
</div>
