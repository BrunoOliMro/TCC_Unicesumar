<script lang="ts">
  import PlusMinusButton from "$lib/components/Buttons/PlusMinusButton.svelte";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { deleteItemProcessMaterial } from "../api/items.api";
  import { updateItemProcessMaterial } from "../../Processes/api/processes.api";

  const dispatch = createEventDispatcher();

  export let materialId: number;
  export let processId: number;
  export let material: string;
  export let qtd: number;
  export let index: number;

  const handleDeleteProcessMaterial = () => {
    const promise = deleteItemProcessMaterial(materialId, processId);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Removendo material",
    });
    promise.then(() => {
      dispatch("processMaterialDeleted", { index: index });
    });
  };

  const handleIncreaseQtd = () => {
    updateItemProcessMaterial(materialId, Number(qtd) + 1, processId)
      .catch((err) => {
        ToasterHandler.createErrorToast(err.response.data.message);
      })
      .then(() => {
        qtd++;
      });
  };

  const handleDecreaseQtd = () => {
    updateItemProcessMaterial(materialId, Number(qtd) - 1, processId)
      .catch((err) => {
        ToasterHandler.createErrorToast(err.response.data.message);
      })
      .then(() => {
        qtd--;
      });
  };
</script>

<div
  in:fade|global={{ duration: 300 }}
  class="
    w-[400px] h-16
    flex items-center justify-between
    p-base gap-base
    border-solid border-2 border-light-gray
    rounded
    processMaterialCard"
>
  <LabeledText width="w-[20%]" label="Material" text={material}></LabeledText>
  <LabeledText width="w-[20%]" label="Quantidade" text={qtd}></LabeledText>
  <PlusMinusButton
    minusFunction={handleDecreaseQtd}
    plusFunction={handleIncreaseQtd}
  ></PlusMinusButton>
  <Icon
    clickOptions={{
      isClickable: true,
      clickFunction: handleDeleteProcessMaterial,
    }}
    size="medium"
    color="text-base-red hover:text-base-red-hover transition duration-300"
    icon="fas fa-trash-alt"
  ></Icon>
</div>
