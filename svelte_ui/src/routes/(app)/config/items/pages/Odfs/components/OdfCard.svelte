<script lang="ts">
  import ToasterHandler from "$lib/toaster/toaster";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import { deleteOdf, toggleOdfCritic } from "../api/odfs.api";
  import { Datetime } from "$lib/utils/Datetime";
  import { fly } from "svelte/transition";
  import OdfProcesses from "./OdfProcesses.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let selectedOdf: { odf: string; odfId: number };
  export let editIsOpen;

  export let selectedType: "all" | "normal" | "delayed";

  export let id: number;
  export let odf: string;
  export let odfId: number;
  export let item: string;
  export let qtd: number;
  export let shipDate: string;
  // export let active: number;
  export let critic: number;
  export let end_datetime: string | undefined;

  let cardIsOpen = false;

  const handleDeleteOdf = async () => {
    const promise = deleteOdf(id);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Deletando ODF",
    });
    promise.then(() => {
      dispatch("delete");
    });
  };

  // const toggleActive = async () => {
  //   const promise = toggleOdfActivation(id, !Boolean(active));
  //   ToasterHandler.createPromiseToast({
  //     promise: promise,
  //     loadingMessage: "Alterando ativação da ODF",
  //   });
  //   promise.then(() => {
  //     active = Number(!Boolean(active));
  //   });
  // };

  const shipDateString = `${shipDate.substring(0, 4)}-${shipDate.substring(4, 6)}-${shipDate.substring(6, 8)}`;

  const toggleCritic = async () => {
    const promise = toggleOdfCritic(id, !Boolean(critic));
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Alterando estado da ODF",
    });
    promise.then(() => {
      critic = Number(!Boolean(critic));
    });
  };
</script>

{#if selectedType === "all" || (selectedType === "normal" && end_datetime && Datetime.isAfterStringDates(shipDateString, end_datetime || "")) || (selectedType === "delayed" && end_datetime && !Datetime.isAfterStringDates(shipDateString, end_datetime || ""))}
  <div
    in:fly|global={{ x: -50, duration: 300 }}
    class="
    w-full
    flex flex-col
    max-h-72
    rounded
    odfCard"
  >
    <div
      class="
    {!end_datetime
        ? 'bg-white hover:bg-light-gray'
        : Datetime.isAfterStringDates(shipDateString, end_datetime || '')
          ? 'bg-base-green bg-opacity-30 hover:bg-opacity-20'
          : 'bg-base-red bg-opacity-30 hover:bg-opacity-20'}
    transition duration-300
    w-full h-24
    rounded
    flex
    z-20
    border-solid border-2 border-light-gray
    odfsGeneralInfo"
    >
      <div
        on:click={() => {
          selectedOdf = { odf: odf, odfId: id };
          editIsOpen = true;
        }}
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
        on:dblclick={() => (cardIsOpen = !cardIsOpen)}
        aria-hidden
        class="
    cursor-pointer
    w-[95%] h-full
    rounded-r
    flex justify-between items-center
    p-base
    gap-base
    transition duration-300
    z-20
    odfInfos"
      >
        <LabeledText width="w-[20%]" label="ODF" text={odf}></LabeledText>
        <LabeledText width="w-[10%]" label="Item" text={item}></LabeledText>
        <LabeledText
          width="w-[10%]"
          label="Data de entrega"
          text={Datetime.convertDatabaseDateToAppDate(shipDate)}
        ></LabeledText>
        <LabeledText width="w-[10%]" label="Quantidade" text={qtd}
        ></LabeledText>
        <div class="flex flex-col items-center w-[10%] z-30">
          <p class="text-md font-bold">Crítica</p>
          <div
            on:click={toggleCritic}
            aria-hidden
            class={`
        h-6 w-6
        border-solid border-2 border-light-gray
        rounded-full
        ${
          critic
            ? "bg-base-green hover:bg-base-red"
            : "bg-base-red hover:bg-base-green"
        }
          transition duration-300
          colorBox`}
          ></div>
        </div>
        <Icon
          clickOptions={{
            clickFunction: handleDeleteOdf,
            isClickable: true,
          }}
          color="text-base-red hover:text-base-red-hover transition duration-300"
          icon="fas fa-trash-alt"
          size="medium"
        ></Icon>
      </div>
    </div>
    {#if cardIsOpen}
      <OdfProcesses {odfId}></OdfProcesses>
    {/if}
  </div>
{/if}
