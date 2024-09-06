<script lang="ts">
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { fly } from "svelte/transition";
  import { deleteRemodelProcess } from "../api/remodel.api";
  import type { MachineProcess } from "../../parts/types/machine_parts.types";

  export let processInfo: MachineProcess;
  export let onDelete: (odfId: number, processId: number) => void;

  const handleDeleteRemodel = () => {
    const promise = deleteRemodelProcess(processInfo.odf_id, processInfo.id);
    ToasterHandler.createPromiseToast({
      loadingMessage: "Deletando processo",
      promise: promise,
    });
    promise.then(() => {
      onDelete(processInfo.odf_id, processInfo.id);
    });
  };
</script>

<div
  in:fly|global={{ duration: 300, x: -50 }}
  class={`
        h-32 w-full
        flex justify-start items-start
        rounded
        border-solid border-2 border-light-gray
        machineProcessCard`}
>
  <div
    class={`
      h-full w-[5%]
      bg-main-color
      rounded-l
      text-white
      font-semibold
      flex items-center justify-center
      processStatus`}
  >
    {processInfo.remodel_index || 0}
  </div>
  <div
    class="
      h-full w-[95%]
      flex justify-around items-center
      processData"
  >
    <div
      class="
        h-full w-[15%]
        relative
        itemImg"
    >
      <!-- <img
        src={`${staticItemsRoute}/items/${processInfo.item_img}`}
        alt="part_img"
        class="h-full"
      /> -->
      <img
        src={`data:image/jpg;base64,${processInfo.item_img}`}
        alt="part_img"
        class="h-full"
      />
    </div>
    <LabeledText label="ODF" text={processInfo.odf}></LabeledText>
    <LabeledText label="Item" text={processInfo.item}></LabeledText>
    <LabeledText label="Máquina" text={processInfo.machine_name}></LabeledText>
    <LabeledText label="Nº op" text={processInfo.op_num}></LabeledText>
    <Icon
      icon="fas fa-trash-alt"
      color="text-base-red hover:text-base-red-hover transition duration-300"
      size="big"
      clickOptions={{
        isClickable: true,
        clickFunction: handleDeleteRemodel,
      }}
    ></Icon>
  </div>
</div>
