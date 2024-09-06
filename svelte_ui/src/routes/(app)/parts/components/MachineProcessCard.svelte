<script lang="ts">
  import { staticItemsRoute } from "$lib/api/api.global";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { addRemodelProcess } from "../../remodel/api/remodel.api";
  import type { MachineProcess } from "../types/machine_parts.types";
  import { keycloakInstance } from "$lib/auth/keycloak";
  import { Datetime } from "$lib/utils/Datetime";
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import SimplePopup from "../../../../lib/components/Popups/SimplePopup.svelte";
  import ProcessDetail from "./ProcessDetail.svelte";
  import ItemTecDraw from "./ItemTecDraw.svelte";

  const dispatch = createEventDispatcher();

  const isAdm =
    $keycloakInstance.tokenParsed.resource_access[
      import.meta.env["VITE_KC_ROLES_CLIENT"]
    ].roles.includes("Next_admin");

  export let params: {
    machineProcessInfo: MachineProcess;
    index: number;
  };

  let detailIsOpen = false;
  let tecDrawIsOpen = false;

  const cardBg =
    params.machineProcessInfo.remodel_index ||
    params.machineProcessInfo.remodel_index === 0
      ? "bg-remodel-bg"
      : params.machineProcessInfo.type_hex
        ? `bg-[${params.machineProcessInfo.type_hex}]`
        : `bg-white`;

  let remodelFormIsOpen = false;
  let newRemodelIndex = params.index + 1;

  const handleRemodelProcess = () => {
    const promise = addRemodelProcess(
      params.machineProcessInfo.odf_id,
      params.machineProcessInfo.id,
      newRemodelIndex
    );
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando remodelagem",
    });
  };

  // const handleUpdatePoint = () => {
  //   const promise = updatePointQtd({
  //     finishedQtd: params.machineProcessInfo.finished_qtd,
  //     missingQtd: params.machineProcessInfo.missing_qtd,
  //     refusedQtd: params.machineProcessInfo.refused_qtd,
  //     odfId: params.machineProcessInfo.odf_id,
  //     processId: params.machineProcessInfo.id,
  //   });

  //   ToasterHandler.createPromiseToast({
  //     promise: promise,
  //     loadingMessage: "Alterando informações de apontamento",
  //   });
  // };
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
    on:click={() => {
      if (isAdm) remodelFormIsOpen = !remodelFormIsOpen;
    }}
    aria-hidden
    class={`
      cursor-pointer
      h-full w-[5%]
      ${
        params.machineProcessInfo.process_delayed
          ? "bg-base-red"
          : "bg-base-green"
      }
      hover:opacity-70
      rounded-l
      transition duration-300
      text-white
      z-30
      font-semibold
      flex items-center justify-center
      processStatus`}
  >
    {params.index + 1}
  </div>
  <div
    class="
      h-full w-[90%]
      flex justify-around items-center
      relative
      {cardBg}"
  >
    <div
      class="
  left-0 top-0
  absolute
  flex flex-col items-center justify-center
  w-[20%] h-32
  p-base gap-base
  z-20
  bg-white
  border-solid border-2 border-light-gray
  {remodelFormIsOpen
        ? 'translate-x-0 opacity-1 pointer-events-auto'
        : 'translate-x-[-20px] opacity-0 pointer-events-none'}
  transition duration-300
  remodelForm"
    >
      <div
        class="
      flex items-center justify-center
      gap-base
      remodelFormIndex"
      >
        <Subtitle text="Novo índice:"></Subtitle>
        <Icon
          icon="fas fa-plus-circle"
          color="text-base-green"
          size="medium"
          clickOptions={{
            isClickable: true,
            clickFunction: () => (newRemodelIndex = newRemodelIndex + 1),
          }}
        ></Icon>
        <p
          class="
        text-xl
        font-semibold
        "
        >
          {newRemodelIndex}
        </p>
        <Icon
          icon="fas fa-minus-circle"
          color="text-base-red"
          size="medium"
          clickOptions={{
            isClickable: true,
            clickFunction: () => {
              if (newRemodelIndex - 1 >= 1) {
                newRemodelIndex = newRemodelIndex - 1;
              }
            },
          }}
        ></Icon>
      </div>
      <Button clickFunction={handleRemodelProcess} text="Remodelar"></Button>
    </div>
    <div
      class="
        h-full w-[15%]
        relative
        itemImg"
    >
      <!-- <img
        src={`${staticItemsRoute}/items/${params.machineProcessInfo.item_img}`}
        alt="part_img"
        class="h-full"
      /> -->
      <img
        src={`data:image/jpg;base64,${params.machineProcessInfo.item_img}`}
        alt="part_img"
        class="h-full"
      />
    </div>
    <LabeledText label="ODF" text={params.machineProcessInfo.odf}></LabeledText>
    <LabeledText label="Item" text={params.machineProcessInfo.item}
    ></LabeledText>
    <LabeledText
      label="Início"
      text={Datetime.formatDatetimeString(
        params.machineProcessInfo.start_datetime
      )}
    ></LabeledText>
    <LabeledText
      label="Fim"
      text={Datetime.formatDatetimeString(
        params.machineProcessInfo.end_datetime
      )}
    ></LabeledText>
    <LabeledText label="Qtd. disponível" text={params.machineProcessInfo.av_qtd}
    ></LabeledText>
  </div>
  <div
    class="
  w-[10%] h-full
  flex items-center justify-end
  gap-base p-base
  icons"
  >
    <Icon
      color="text-black"
      icon="fas fa-info-circle"
      size="medium"
      clickOptions={{
        isClickable: true,
        clickFunction: () => {
          detailIsOpen = true;
        },
      }}
    ></Icon>
    {#if isAdm}
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
        color="text-black"
        clickOptions={{
          isClickable: true,
          clickFunction: () => {
            if (isAdm) {
              dispatch("pointOpen", {
                avQtd: params.machineProcessInfo.av_qtd,
                finishedQtd: params.machineProcessInfo.finished_qtd,
                missingQtd: params.machineProcessInfo.missing_qtd,
                refusedQtd: params.machineProcessInfo.refused_qtd,
                odfId: params.machineProcessInfo.odf_id,
                processId: params.machineProcessInfo.id,
              });
            }
          },
        }}
        icon="fas fa-stream"
        size="medium"
      ></Icon>
    {/if}
  </div>
</div>

<SimplePopup h="h-[80%]" w="w-[90%]" bind:isOpen={detailIsOpen}>
  <ProcessDetail
    processInfo={{
      id: params.machineProcessInfo.id,
      av_qtd: params.machineProcessInfo.av_qtd,
      qtd: params.machineProcessInfo.odf_qtd,
      finished_qtd: params.machineProcessInfo.finished_qtd,
      img: params.machineProcessInfo.item_img,
      item: params.machineProcessInfo.item,
      group: params.machineProcessInfo.item_grouping,
      odf: params.machineProcessInfo.odf,
      odf_id: params.machineProcessInfo.odf_id,
      op_num: params.machineProcessInfo.op_num,
      status: params.machineProcessInfo.status ? "Em dia" : "Atrasado",
      end_datetime: params.machineProcessInfo.start_datetime,
      start_datetime: params.machineProcessInfo.end_datetime,
      missing_qtd: params.machineProcessInfo.missing_qtd,
      refused_qtd: params.machineProcessInfo.refused_qtd,
    }}
  ></ProcessDetail>
</SimplePopup>

<SimplePopup h="h-[95%]" w="w-[95%]" bind:isOpen={tecDrawIsOpen}>
  <ItemTecDraw itemId={params.machineProcessInfo.item_id}></ItemTecDraw>
</SimplePopup>
