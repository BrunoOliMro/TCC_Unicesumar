<script lang="ts">
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";
  import { findGroupingProcesses, findItemGroupings } from "./api/groups.api";
  import AddGroupingForm from "./components/AddGroupingForm.svelte";
  import AddProcessToGroupingForm from "./components/AddProcessToGroupingForm.svelte";
  import GroupProcessCard from "./components/GroupProcessCard.svelte";
  import GroupingCard from "./components/GroupingCard.svelte";
  import type {
    GroupingProcessInfo,
    ItemGroupingInfo,
  } from "./types/groups.types";
  import Icon from "$lib/components/Icons/Icon.svelte";
  import Loader from "$lib/components/Loaders/Loader.svelte";

  const fetchItemGroups = async (): Promise<ItemGroupingInfo[]> => {
    const res = await findItemGroupings();
    return res.data;
  };

  let selectedGroupingIndex = 0;

  let itemGroupings: Promise<ItemGroupingInfo[]> = fetchItemGroups();

  let searchGrouping = "";

  let selectedGrouping: { group: string; groupId: number };

  const fetchGroupingProcesses = async (): Promise<GroupingProcessInfo[]> => {
    const res = await findGroupingProcesses(selectedGrouping?.groupId ?? 0);
    return res.data;
  };

  let selectedGroupingProcesses: Promise<GroupingProcessInfo[]> =
    fetchGroupingProcesses();
</script>

<div
  class="
flex
w-full h-full
gap-base
companyGroups"
>
  <div
    class="
flex flex-col
w-1/2 h-full
gap-base
viewGroups"
  >
    <div
      class="
  w-full
  flex items-center justify-end
  searchDiv"
    >
      <SearchInput bind:value={searchGrouping}></SearchInput>
    </div>
    <div
      class="
    h-full w-full
    flex flex-col justify-between items-center
    gap-base
    companyGroups"
    >
      <div
        class="
        w-full h-full
        overflow-y-scroll
        flex flex-wrap justify-start items-start
        px-base gap-base
        content-start
        currentGroups"
      >
        {#await itemGroupings}
          <Loader></Loader>
        {:then groupings}
          {#each groupings as groupingInfo}
            {#if !searchGrouping || searchGrouping.trim() === "" || (groupingInfo.item_grouping && groupingInfo.item_grouping
                  .toUpperCase()
                  .includes(searchGrouping.toUpperCase())) || (groupingInfo.machine_name && groupingInfo.machine_name
                  .toUpperCase()
                  .includes(searchGrouping.toUpperCase()))}
              <GroupingCard
                bind:selectedGrouping
                onChange={() => {
                  selectedGroupingProcesses = fetchGroupingProcesses();
                }}
                grouping={groupingInfo.item_grouping}
                groupingId={groupingInfo.id}
                machine={groupingInfo.machine_name}
                onDelete={() => {
                  itemGroupings = fetchItemGroups();
                }}
              ></GroupingCard>
            {/if}
          {/each}
        {/await}
      </div>
    </div>
  </div>

  <div
    class="
      w-1/2 h-full
      flex flex-col items-center justify-between
      gap-base
      groupHandling"
  >
    <AddGroupingForm
      onAdd={() => {
        itemGroupings = fetchItemGroups();
      }}
    ></AddGroupingForm>
    <div
      class="
p-base
w-full h-gap-vertical-2/3-box
flex flex-col items-center
rounded
gap-base
border-solid border-2 border-light-gray
editGroup"
    >
      <Title text="Editar grupo"></Title>
      <div
        class="
        text-lg
        w-full
        selectedMachine"
      >
        <strong class="text-xl">Grupo selecionado: </strong>
        {selectedGrouping?.group ?? "Sem grupo selecionado"}
      </div>
      {#await selectedGroupingProcesses}
        <div
          class="
      w-full h-[125px]
      rounded
      border-solid border-2 border-light-gray
      loaderDiv"
        >
          <Loader></Loader>
        </div>
      {:then groupingProcesses}
        <div
          class="
        overflow-hidden
        w-full h-[125px]
        rounded
        border-solid border-2 border-light-gray
        p-base gap-base
        grid grid-cols-1
        {groupingProcesses.length === 0 ? '' : 'content-start'}
        groupProcesses"
        >
          {#if groupingProcesses.length === 0}
            <div
              class="
            h-full w-full
            flex items-center justify-center
            noProcessesWarn"
            >
              <Subtitle text="Sem processos disponíveis"></Subtitle>
            </div>
          {:else}
            <div
              class="
          w-full h-full
          flex
          selectedGroupingProcess"
            >
              <div
                class="
          h-full w-[90%]
          currProcess"
              >
                {#key selectedGroupingIndex}
                  <GroupProcessCard
                    onProcessDelete={() => {
                      selectedGroupingProcesses = fetchGroupingProcesses();
                    }}
                    index={selectedGroupingIndex}
                    machine={groupingProcesses[selectedGroupingIndex]
                      .machine_name}
                    odf={groupingProcesses[selectedGroupingIndex].odf}
                    odfId={groupingProcesses[selectedGroupingIndex].odf_id}
                    opNum={groupingProcesses[selectedGroupingIndex].op_num}
                    processId={groupingProcesses[selectedGroupingIndex]
                      .process_id}
                    item={groupingProcesses[selectedGroupingIndex].part_number}
                  ></GroupProcessCard>
                {/key}
              </div>
              <div
                class="
        h-full w-[10%]
        flex flex-col items-center justify-center
        gap-base
        processControlIcons"
              >
                <Icon
                  color="text-black"
                  size="medium"
                  icon="fas fa-caret-up"
                  clickOptions={{
                    isClickable: true,
                    clickFunction: () => {
                      if (selectedGroupingIndex === 0) {
                        selectedGroupingIndex = groupingProcesses.length - 1;
                      } else {
                        selectedGroupingIndex -= 1;
                      }
                    },
                  }}
                ></Icon>
                <Icon
                  color="text-black"
                  size="medium"
                  icon="fas fa-caret-down"
                  clickOptions={{
                    isClickable: true,
                    clickFunction: () => {
                      if (
                        selectedGroupingIndex ===
                        groupingProcesses.length - 1
                      ) {
                        selectedGroupingIndex = 0;
                      } else {
                        selectedGroupingIndex += 1;
                      }
                    },
                  }}
                ></Icon>
              </div>
            </div>
          {/if}
        </div>
      {/await}
      <AddProcessToGroupingForm
        onAdd={() => {
          selectedGroupingProcesses = fetchGroupingProcesses();
        }}
        selectedGroupingId={selectedGrouping?.groupId || 0}
      ></AddProcessToGroupingForm>
    </div>
  </div>
</div>
