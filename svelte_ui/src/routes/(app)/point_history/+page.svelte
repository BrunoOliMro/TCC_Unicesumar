<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { findPointHistory } from "./api/point_history.api";
  import type { PointHistoryInfo } from "./types/point_history.types";
  import PointHistoryCard from "./components/PointHistoryCard.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import { Datetime } from "$lib/utils/Datetime";

  let searchPoint = "";
  let selectedType: "delayed" | "normal" | "all" = "all";

  let pointHistory: PointHistoryInfo[] = [];
  let pointHistoryStream: EventSource | null;

  const startStreams = async () => {
    pointHistoryStream = await findPointHistory();
    pointHistoryStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        pointHistoryStream?.close();
        pointHistoryStream = null;
        return;
      }
      pointHistory = pointHistory.concat(JSON.parse(ev.data));
    };
    pointHistoryStream.onerror = (err) => {
      pointHistoryStream?.close();
      pointHistoryStream = null;
    };
  };

  localStorage.setItem("selectedPage", "5");

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (pointHistoryStream) pointHistoryStream.close();
    pointHistoryStream = null;
  });
</script>

<div
  class="
w-full h-full
flex flex-col
gap-base
pointsContent"
>
  <div
    class="
h-[10%] w-full
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
    <SearchInput bind:value={searchPoint}></SearchInput>
  </div>
  <div
    class="
w-full h-[90%]
overflow-y-auto
grid grid-cols-1
content-start
gap-base
points"
  >
    {#each pointHistory as pointInfo, index}
      {#if !searchPoint || searchPoint.trim() === "" || (pointInfo.odf && pointInfo.odf
            .toUpperCase()
            .includes(searchPoint.toUpperCase())) || (pointInfo.item && pointInfo.item
            .toUpperCase()
            .includes(searchPoint.toUpperCase())) || (pointInfo.machine && pointInfo.machine
            .toUpperCase()
            .includes(searchPoint.toUpperCase()))}
        {#if selectedType === "all" || (selectedType === "normal" && !Datetime.isAfterStringDates(pointInfo.point_date, pointInfo.next_date)) || (selectedType === "delayed" && Datetime.isAfterStringDates(pointInfo.point_date, pointInfo.next_date))}
          <PointHistoryCard {pointInfo} {index}></PointHistoryCard>
        {/if}
      {/if}
    {/each}
  </div>
</div>
