<script lang="ts">
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import {
    addMachineGroup,
    findMachineGroups,
  } from "./api/machines_groups.api";
  import GroupCard from "./components/GroupCard.svelte";
  import type { MachineGroupInfo } from "./types/machines_groups.types";

  let groups: MachineGroupInfo[] = [];
  let newGroup = "";

  const handleAddGroup = () => {
    const promise = addMachineGroup(newGroup);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando grupo",
    });

    promise.then(() => {
      fetchData();
    });
  };

  const fetchData = async () => {
    const res = await findMachineGroups();
    groups = res.data;
  };

  fetchData();
</script>

<div
  class="
  flex
  gap-base p-base
  w-full h-full
  machinesGroups"
>
  <div
    class="
  h-[675px] w-full
  flex flex-wrap justify-start items-start
  content-start
  gap-base
  p-base
  overflow-y-scroll
  currentGroups"
  >
    {#await fetchData}
      <Loader></Loader>
    {:then}
      {#each groups as group}
        <GroupCard
          groupId={group.id}
          groupsUpdated={() => {
            fetchData();
          }}
          group={group.machine_group}
        ></GroupCard>
      {/each}
    {/await}
  </div>
  <div
    class="
  h-fit w-full
  flex flex-col
  gap-base p-base
  border-solid border-2 border-light-gray
  rounded
  justify-between items-start
  addMachineGroup"
  >
    <div
      class="
w-full
flex justify-center
gap-base
addGroupTitle"
    >
      <Title text="Adicionar grupo"></Title>
    </div>
    <InputForm label="Nome do grupo" type="vertical">
      <TextInput bind:value={newGroup}></TextInput>
    </InputForm>
    <div
      class="
  w-full
  pt-base
  flex justify-end items-center
  addShiftButton"
    >
      <Button text="Adicionar" clickFunction={handleAddGroup}></Button>
    </div>
  </div>
</div>
