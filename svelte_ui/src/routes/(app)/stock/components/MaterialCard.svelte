<script lang="ts">
  import PlusMinusButton from "$lib/components/Buttons/PlusMinusButton.svelte";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { fly } from "svelte/transition";
  import { deleteMaterial, updateStockQtd } from "../api/stock.api";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let stockId: number;
  export let index: number;
  export let materialName: string;
  export let materialQtd: number;

  const handleDeleteMaterial = () => {
    const promise = deleteMaterial(stockId);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Removendo item do estoque",
    });
    promise.then(() => {
      dispatch("materialDeleted", { id: stockId });
    });
  };
  const handleIncreaseQtd = () => {
    const promise = updateStockQtd(stockId, Number(materialQtd) + 1);
    promise
      .then(() => {
        materialQtd = materialQtd + 1;
      })
      .catch((err) => {
        ToasterHandler.createErrorToast(err.response.data.message);
      });
  };
  const handleDecreaseQtd = () => {
    const promise = updateStockQtd(stockId, Number(materialQtd) - 1);
    promise
      .then(() => {
        materialQtd = materialQtd - 1;
      })
      .catch((err) => {
        ToasterHandler.createErrorToast(err.response.data.message);
      });
  };
</script>

<div
  in:fly|global={{ duration: 300, x: -50 }}
  class="
    h-24 w-full
    flex gap-base
    border-solid border-2 border-light-gray
    rounded
    materialCard"
>
  <div
    class="
      rounded-l
      h-full w-[5%]
      text-white font-semibold
      bg-black
      flex items-center justify-center
      index"
  >
    {index + 1}
  </div>
  <div
    class="
      h-full w-[95%]
      flex justify-between items-center
      p-base gap-base
      cardInfos"
  >
    <LabeledText width="w-[20%]" label="Material" text={materialName}
    ></LabeledText>
    <LabeledText
      width="w-[20%]"
      label="Quantidade"
      text={Number(materialQtd).toFixed(2)}
    ></LabeledText>
    <PlusMinusButton
      minusFunction={handleDecreaseQtd}
      plusFunction={handleIncreaseQtd}
    ></PlusMinusButton>
    <Icon
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteMaterial,
      }}
      icon="fas fa-trash-alt"
      size="medium"
      color="text-base-red hover:text-base-red-hover transition duration-300"
    ></Icon>
  </div>
</div>
