<script lang="ts">
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import type { ProcessMaterialInfo } from "../../../Processes/types/processes.types";
  import Button from "$lib/components/Buttons/Button.svelte";
  import {
    addItemProcessMaterial,
    findItemProcessMaterials,
  } from "../../api/items.api";
  import ToasterHandler from "$lib/toaster/toaster";
  import ProcessMaterialCard from "../ProcessMaterialCard.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import type { MaterialInfo } from "../../../../../../stock/types/stock.types";
  import { findMaterials } from "../../../../../../stock/api/stock.api";

  export let processId: number;

  let processMaterials: ProcessMaterialInfo[] = [];
  let companyMaterials: MaterialInfo[] = [];

  let newMaterial = {
    materialId: 0,
    qtd: 0,
  };

  const handleAddTool = () => {
    const promise = addItemProcessMaterial(
      processId,
      newMaterial.materialId,
      newMaterial.qtd
    );
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando material",
    });
    promise.then((res) => {
      processMaterials.push({
        material_id: newMaterial.materialId,
        material_name: res.data.data.material,
        material_qtd: newMaterial.qtd,
        id: res.data.data.id,
      });
      processMaterials = processMaterials;
    });
  };

  const handleDeleteProcessMaterial = (ev: { detail: { index: number } }) => {
    processMaterials = processMaterials.filter((_, i) => i !== ev.detail.index);
  };

  const fetchData = async () => {
    processMaterials = (await findItemProcessMaterials(processId)).data;
    companyMaterials = (await findMaterials()).data;
  };
</script>

{#await fetchData()}
  <Loader type="inner"></Loader>
{:then}
  <div
    class="
  w-full h-full justify-between items-center
  flex flex-col
  gap-base
  contentBox"
  >
    <div
      class="
      w-full h-[50%]
      flex flex-col justify-between items-center
      gap-base p-base
      border-solid border-2 border-light-gray
      rounded
      addTool"
    >
      <Title text="Adicionar material"></Title>
      <div
        class="
        flex
        gap-base
        inputs"
      >
        <InputForm label="Material" type="vertical">
          <SelectInput
            placeholder="Material"
            options={companyMaterials.map((materialInfo) => {
              return {
                text: materialInfo.material_name,
                value: materialInfo.id,
              };
            })}
            bind:value={newMaterial.materialId}
          ></SelectInput>
        </InputForm>
        <InputForm label="Quantidade" type="vertical">
          <NumberInput min={0} max={99999} bind:value={newMaterial.qtd}
          ></NumberInput>
        </InputForm>
      </div>
      <div
        class="
        w-full
        flex items-center justify-end
        buttonDiv"
      >
        <Button text="Adicionar" clickFunction={handleAddTool}></Button>
      </div>
    </div>
    <div
      class="
      w-full h-[50%]
      flex flex-col items-center justify-start
      p-base gap-base
      border-solid border-2 border-light-gray
      currToolsDiv"
    >
      <Title text="Materiais adicionados"></Title>
      <div
        class="
      w-full h-[90%]
      flex flex-wrap content-start
      gap-base p-base
      overflow-y-auto
      border-solid border-2 border-light-gray
      rounded
      currTools"
      >
        {#each processMaterials as material, i}
          <ProcessMaterialCard
            index={i}
            material={material.material_name}
            materialId={material.material_id}
            {processId}
            qtd={material.material_qtd}
            on:processMaterialDeleted={handleDeleteProcessMaterial}
          ></ProcessMaterialCard>
        {/each}
      </div>
    </div>
  </div>
{/await}
