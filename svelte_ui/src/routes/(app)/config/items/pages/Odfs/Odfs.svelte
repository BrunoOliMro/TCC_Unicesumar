<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import DateInput from "$lib/components/Inputs/DateInput.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import { findCompanyItems } from "../Items/api/items.api";
  import type { GeneralItemInfo } from "../Items/types/items.types";
  import { addOdf, editOdf, findCompanyOdfs } from "./api/odfs.api";
  import OdfCard from "./components/OdfCard.svelte";
  import type {
    AddOdfInfo,
    EditOdfInfo,
    OdfGeneralInfo,
  } from "./types/odfs.types";
  import { onDestroy, onMount } from "svelte";
  import PaginationSelectors from "$lib/components/Pagination/PaginationSelectors.svelte";
  import { Datetime } from "$lib/utils/Datetime";
  import SimplePopup from "../../../../../../lib/components/Popups/SimplePopup.svelte";

  let companyOdfs: OdfGeneralInfo[] = [];
  let companyItems: GeneralItemInfo[] = [];

  let companyItemsStream: EventSource | null;
  let companyOdfsStream: EventSource | null;

  let editPopupIsOpen = false;

  const pace = 10;
  let currPage = 0;

  $: pages = Math.ceil(companyOdfs.length / pace);

  $: visibleOdfs = companyOdfs
    .filter((odfInfo) => {
      return (
        !searchOdf ||
        searchOdf.trim() === "" ||
        (odfInfo.odf &&
          odfInfo.odf.toUpperCase().includes(searchOdf.toUpperCase())) ||
        (odfInfo.part_number &&
          odfInfo.part_number.toUpperCase().includes(searchOdf.toUpperCase()))
      );
    })
    .slice(currPage * pace, (currPage + 1) * pace);

  const startStreams = async () => {
    companyOdfsStream = await findCompanyOdfs();
    companyOdfsStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        companyOdfsStream?.close();
        companyOdfsStream = null;
        return;
      }
      companyOdfs = companyOdfs.concat(JSON.parse(ev.data));
    };
    companyOdfsStream.onerror = (err) => {
      companyOdfsStream?.close();
      companyOdfsStream = null;
    };
    companyItemsStream = await findCompanyItems();
    companyItemsStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        companyItemsStream?.close();
        companyItemsStream = null;
        return;
      }
      companyItems = companyItems.concat(JSON.parse(ev.data));
    };
    companyItemsStream.onerror = (err) => {
      companyItemsStream?.close();
      companyItemsStream = null;
    };
  };

  let searchOdf = "";
  let selectedType: "normal" | "delayed" | "all" = "all";

  let selectedOdf: { odf: string; odfId: number };

  let addOdfInfo: AddOdfInfo = {
    itemId: 0,
    odf: "",
    odfQtd: 0,
    shipDate: "",
  };

  let editOdfInfo: EditOdfInfo = {
    odfId: 0,
    odfQtd: 0,
    shipDate: "",
  };

  const handleAddOdf = () => {
    const promise = addOdf(addOdfInfo);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando odf",
    });
    promise.then((res) => {
      companyOdfs.push({
        id: res.data.data.odf_id,
        critic: 0,
        odf: addOdfInfo.odf,
        odf_qtd: addOdfInfo.odfQtd,
        part_number: res.data.data.item,
        part_number_id: addOdfInfo.itemId,
        ship_date: Datetime.convertGMTDateToAppDate(addOdfInfo.shipDate),
      });
      companyOdfs = companyOdfs;
    });
  };

  const handleEditOdf = () => {
    const promise = editOdf({
      odfId: selectedOdf?.odfId ?? 0,
      odfQtd: editOdfInfo.odfQtd,
      shipDate: editOdfInfo.shipDate,
    });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Editando odf",
    });
    promise.then(() => {
      const editOdfIndex = companyOdfs.findIndex(
        (odf) => odf.id === selectedOdf?.odfId
      );
      if (editOdfIndex === -1) return;
      Object.assign(companyOdfs[editOdfIndex], {
        odf_qtd: editOdfInfo.odfQtd,
        ship_date: Datetime.convertGMTDateToAppDate(editOdfInfo.shipDate),
      });
      companyOdfs = companyOdfs;
    });
  };

  const handleDeleteOdf = (odfId: number) => {
    companyOdfs = companyOdfs.filter((odfInfo) => odfInfo.id !== odfId);
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (companyItemsStream) companyItemsStream.close();
    if (companyOdfsStream) companyOdfsStream.close();
    companyItemsStream = null;
    companyOdfsStream = null;
  });
</script>

<div
  class="
flex
gap-base
w-full h-full
companyOdfs"
>
  <div
    class="
h-full w-1/2
flex flex-col
gap-base
odfsView"
  >
    <div
      class="
  w-full
  flex items-center justify-between
  searchDiv"
    >
      <div
        class="
  flex items-center
  gap-base
  buttonFilters"
      >
        <Button
          text="Em dia"
          buttonType="green"
          clickFunction={() => {
            selectedType = "normal";
          }}
        ></Button>
        <Button
          text="Atrasados"
          buttonType="red"
          clickFunction={() => {
            selectedType = "delayed";
          }}
        ></Button>
        <Button
          text="Todos"
          clickFunction={() => {
            selectedType = "all";
          }}
        ></Button>
      </div>
      <SearchInput bind:value={searchOdf}></SearchInput>
    </div>
    <div
      class="
    h-[600px] w-full
    overflow-y-scroll
    gap-base
    pr-base
    grid grid-cols-1
    content-start
    currentOdfs"
    >
      {#each visibleOdfs as odfInfo}
        <OdfCard
          {selectedType}
          bind:selectedOdf
          bind:editIsOpen={editPopupIsOpen}
          id={odfInfo.id}
          item={odfInfo.part_number}
          odf={odfInfo.odf}
          qtd={odfInfo.odf_qtd}
          shipDate={odfInfo.ship_date}
          critic={odfInfo.critic}
          odfId={odfInfo.id}
          end_datetime={odfInfo.end_datetime}
          on:delete={() => {
            handleDeleteOdf(odfInfo.id);
          }}
        ></OdfCard>
      {/each}
    </div>
    <div
      class="
    w-full h-[10%]
    flex justify-end items-center
    pagination"
    >
      <PaginationSelectors bind:currPage {pages}></PaginationSelectors>
    </div>
  </div>
  <div
    class="
      h-full w-1/2
      flex flex-col items-center
      gap-base
      handleOdfs"
  >
    <div
      class="
    h-gap-vertical-1/2-box w-full
    gap-base
    p-base
    flex flex-col justify-between items-center
    rounded
    border-solid border-2 border-light-gray
    addNewOdf"
    >
      <Title text="Adicionar ODF"></Title>
      <div
        class="
          w-full
          grid grid-cols-3
          gap-base
          form"
      >
        <InputForm label="ODF" type="vertical">
          <TextInput bind:value={addOdfInfo.odf}></TextInput>
        </InputForm>
        <InputForm label="Item" type="vertical">
          <SelectInput
            bind:value={addOdfInfo.itemId}
            options={companyItems.map((itemInfo) => {
              return { text: itemInfo.part_number, value: itemInfo.id };
            })}
          ></SelectInput>
        </InputForm>
        <InputForm label="Data de entrega" type="vertical">
          <DateInput bind:value={addOdfInfo.shipDate}></DateInput>
        </InputForm>
        <InputForm label="Quantidade" type="vertical">
          <NumberInput min={0} max={99999} bind:value={addOdfInfo.odfQtd}
          ></NumberInput>
        </InputForm>
      </div>
      <div
        class="
      w-full
      flex justify-end items-end
      addProcessButton"
      >
        <Button clickFunction={handleAddOdf} text="Adicionar"></Button>
      </div>
    </div>
  </div>
</div>

<SimplePopup h="h-[35%]" w="w-[50%]" bind:isOpen={editPopupIsOpen}>
  <div
    class="
h-full w-full
gap-base p-base
rounded
flex flex-col justify-between items-center
editOdf"
  >
    <Title text="Editar ODF"></Title>
    <div
      class="
    grid grid-cols-3
    w-full
    gap-base
    form"
    >
      <InputForm type="vertical" label="Data de entrega">
        <DateInput bind:value={editOdfInfo.shipDate}></DateInput>
      </InputForm>
      <InputForm type="vertical" label="Quantidade">
        <NumberInput min={0} max={99999} bind:value={editOdfInfo.odfQtd}
        ></NumberInput>
      </InputForm>
    </div>
    <div
      class="
  w-full
  flex justify-end items-end
  addProcessButton"
    >
      <Button clickFunction={handleEditOdf} text="Editar"></Button>
    </div>
  </div>
</SimplePopup>
