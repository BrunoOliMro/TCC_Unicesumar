<script lang="ts">
  import { findStock } from "./api/stock.api";
  import MaterialCard from "./components/MaterialCard.svelte";
  import type { StockInfo } from "./types/stock.types";
  import AddMaterialForm from "./components/AddMaterialForm.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import Auth from "$lib/auth/Auth.svelte";
  import { onDestroy, onMount } from "svelte";
  import PaginationSelectors from "$lib/components/Pagination/PaginationSelectors.svelte";

  let companyStock: StockInfo[] = [];
  let stockStream: EventSource | null;

  const pace = 10;
  let currPage = 0;

  $: pages = Math.ceil(companyStock.length / pace);

  $: stockVisibleItems = companyStock
    .filter((stockInfo) => {
      return (
        !stockSearch ||
        stockSearch.trim() === "" ||
        (stockInfo.material_name &&
          stockInfo.material_name
            .toUpperCase()
            .includes(stockSearch.toUpperCase()))
      );
    })
    .slice(currPage * pace, (currPage + 1) * pace);

  const startStreams = async (): Promise<void> => {
    if (stockStream) stockStream.close();
    stockStream = null;
    stockStream = await findStock();
    stockStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        stockStream?.close();
        stockStream = null;
        return;
      }
      companyStock = companyStock.concat(JSON.parse(ev.data));
    };
    stockStream.onerror = (err) => {
      stockStream?.close();
      stockStream = null;
    };
  };

  let stockSearch = "";

  localStorage.setItem("selectedPage", "4");

  const handleDeleteMaterial = (ev: { detail: { id: number } }) => {
    companyStock = companyStock.filter(
      (stockItem) => stockItem.id !== ev.detail.id
    );
  };

  const handleMaterialAdd = (ev: {
    detail: {
      id: number;
      material: string;
      materialId: number;
      materialQtd: number;
    };
  }) => {
    const existingCompanyStockIndex = companyStock.findIndex(
      (stockInfo) => stockInfo.material_id === ev.detail.materialId
    );
    if (existingCompanyStockIndex !== -1) {
      companyStock[existingCompanyStockIndex].material_qtd +=
        ev.detail.materialQtd;
    } else {
      companyStock.push({
        id: ev.detail.id,
        material_name: ev.detail.material,
        material_id: ev.detail.materialId,
        material_qtd: ev.detail.materialQtd,
      });
    }
    companyStock = companyStock;
  };

  onMount(() => {
    startStreams();
  });

  onDestroy(() => {
    if (stockStream) stockStream.close();
    stockStream = null;
  });
</script>

<Auth>
  <div
    class="
    w-full h-full
    bg-white
    rounded
    flex items-center
    gap-base p-base
    border-solid border-2 border-light-gray
    selectedPage"
  >
    <div
      class="
w-1/2 h-full
flex flex-col justify-between
gap-base
viewStock"
    >
      <div
        class="
  w-full
  flex items-center justify-end
  searchDiv"
      >
        <SearchInput bind:value={stockSearch}></SearchInput>
      </div>
      <div
        class="
    flex flex-col
    h-full w-full
    gap-base
    currentStockItems"
      >
        <div
          class="
        grid grid-cols-1
    h-[700px] w-full
    overflow-y-auto
    gap-base px-base
    content-start
        stockItems"
        >
          {#each stockVisibleItems as stockInfo, i}
            <MaterialCard
              on:materialDeleted={handleDeleteMaterial}
              stockId={stockInfo.id}
              index={i + currPage * pace}
              materialName={stockInfo.material_name}
              materialQtd={stockInfo.material_qtd}
            ></MaterialCard>
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
    </div>
    <div
      class="
      h-full w-1/2
      addMaterial"
    >
      <AddMaterialForm on:materialAdded={handleMaterialAdd}></AddMaterialForm>
    </div>
  </div>
</Auth>
