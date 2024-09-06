<script lang="ts">
  import { staticItemsRoute } from "$lib/api/api.global";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import type { MachineProcess } from "../types/machine_parts.types";
  import { keycloakInstance } from "$lib/auth/keycloak";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import MachineProcessCard from "./MachineProcessCard.svelte";
  import { createEventDispatcher } from "svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import { finishGroupingPoint } from "../api/machine_parts.api";
  import ToastHandler from "$lib/toaster/toaster";
  import { Datetime } from "$lib/utils/Datetime";
  import { fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  let currIcon = "fas fa-caret-down";
  let cardIsOpen = false;

  const isAdm =
    $keycloakInstance.tokenParsed.resource_access[
      import.meta.env["VITE_KC_ROLES_CLIENT"]
    ].roles.includes("Next_admin");

  export let index: number;
  export let groupingProcesses: MachineProcess[];

  const cardBg = groupingProcesses.some((machineProcess) => {
    return machineProcess.remodel_index !== (null && undefined);
  })
    ? "bg-remodel-bg"
    : `bg-white`;

  const handleGroupingPoint = () => {
    const promise = finishGroupingPoint(groupingProcesses[0].grouping_id || 0);
    ToastHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Apontando grupo",
    });
  };
</script>

<div
  in:fly|global={{ duration: 300, x: -50 }}
  class="
          h-32 w-full
          flex justify-start items-start
          rounded
          relative
          border-solid border-2 border-light-gray
          {cardIsOpen ? 'border-b-0 rounded-b-0' : ''}
          machineProcessCard"
>
  <div
    aria-hidden
    class={`
        h-full w-[10%]
        ${
          groupingProcesses.some((machineProcess) => {
            return machineProcess.process_delayed;
          })
            ? "bg-base-red"
            : "bg-base-green"
        }
        rounded-l
        text-white
        z-30
        font-semibold
        flex items-center justify-center
        processStatus`}
  >
    {index + 1} - {index + groupingProcesses.length}
  </div>
  <div
    class="
        h-full w-[90%]
        z-30
        flex justify-between items-center
        gap-base p-base
        {cardBg}"
  >
    <div
      class="
  h-full w-full
  flex items-center justify-between
  gap-base pl-8
  groupBaseInfo"
    >
      <div
        class="
            h-full w-[10%]
            relative
            itemImg"
      >
        <img
          src={`${staticItemsRoute}/items/groupImg.png`}
          alt="part_img"
          class="h-full"
        />
      </div>
      <LabeledText
        width="w-[10%]"
        label="Grupo"
        text={groupingProcesses[0].item_grouping || ""}
      ></LabeledText>
      <LabeledText
        width="w-[10%]"
        label="Início"
        text={groupingProcesses[0].start_datetime
          ? Datetime.formatDatetimeString(groupingProcesses[0].start_datetime)
          : "Sem data"}
      ></LabeledText>
      <LabeledText
        width="w-[10%]"
        label="Fim"
        text={groupingProcesses[0].end_datetime
          ? Datetime.formatDatetimeString(groupingProcesses[0].end_datetime)
          : "Sem data"}
      ></LabeledText>
      <Button clickFunction={handleGroupingPoint} text="Finalizar"></Button>
      <Icon
        size="big"
        color="text-black"
        clickOptions={{
          isClickable: true,
          clickFunction: () => {
            cardIsOpen = !cardIsOpen;
            currIcon = cardIsOpen ? "fas fa-caret-up" : "fas fa-caret-down";
          },
        }}
        icon={currIcon}
      ></Icon>
    </div>
  </div>
  <div
    class="
  w-full max-h-60 h-fit
        {cardIsOpen
      ? 'opacity-1 border-solid translate-y-[6rem] border-x-2 border-b-2 border-light-gray'
      : 'opacity-0 pointer-events-none translate-y-[-1rem]'}
  top-0 left-0
  flex flex-col
  pt-12 pb-base px-base gap-base
  absolute
  bg-white
  overflow-y-scroll scrollbar-hide
  rounded-b
  transition duration-300
  border-solid border-2 border-t-0 border-light-gray
  groupingProcesses"
  >
    {#each groupingProcesses as groupingProcess, i}
      <MachineProcessCard
        on:pointOpen={(ev) => {
          if (isAdm) dispatch("pointOpen", ev.detail);
        }}
        params={{
          machineProcessInfo: groupingProcess,
          index: i,
        }}
      ></MachineProcessCard>
    {/each}
  </div>
</div>
