<script lang="ts">
  import type { MachineProcess } from "./types/machine_parts.types";
  import MachineProcessCard from "./components/MachineProcessCard.svelte";
  import {
    findMachineProcesses,
    updatePointQtd,
  } from "./api/machine_parts.api";
  import { onDestroy, onMount } from "svelte";
  import Auth from "$lib/auth/Auth.svelte";
  import GroupCard from "./components/GroupCard.svelte";
  import SimplePopup from "$lib/components/Popups/SimplePopup.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import Button from "$lib/components/Buttons/Button.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { keycloakInstance } from "$lib/auth/keycloak";
  import { page } from "$app/stores";
  import SearchInput from "$lib/components/Filters/SearchInput.svelte";

  let completeListOpen = false;
  let searchInput = "";

  const isAdm =
    $keycloakInstance.tokenParsed.resource_access[
      import.meta.env["VITE_KC_ROLES_CLIENT"]
    ].roles.includes("Next_admin");

  const machineId = Number($page.url.searchParams.get("machine_id"));
  const machineIndex = Number($page.url.searchParams.get("machine_index"));

  let pointIsOpen = false;
  let pointQtdInfos = {
    avQtd: 0,
    finishedQtd: 0,
    missingQtd: 0,
    refusedQtd: 0,
    odfId: 0,
    processId: 0,
  };

  $: pointAvQtd =
    pointQtdInfos.avQtd -
    (pointQtdInfos.finishedQtd +
      pointQtdInfos.missingQtd +
      pointQtdInfos.refusedQtd);

  let machineProcesses: MachineProcess[] = [];
  let groupings: { [grouping: string]: MachineProcess[] } = {};
  let machineProcessesStream: EventSource | null;

  const startStreams = async () => {
    machineProcessesStream = await findMachineProcesses(
      machineId,
      machineIndex
    );
    machineProcessesStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        machineProcessesStream?.close();
        machineProcessesStream = null;
        return;
      }
      const newProcesses = JSON.parse(ev.data);
      for (const newProcess of newProcesses) {
        if (newProcess.item_grouping) {
          if (groupings[newProcess.item_grouping]) {
            groupings[newProcess.item_grouping].push(newProcess);
          } else {
            groupings[newProcess.item_grouping] = [newProcess];
            machineProcesses.push(newProcess);
          }
        } else {
          machineProcesses.push(newProcess);
        }
        machineProcesses = machineProcesses;
      }
    };
    machineProcessesStream.onerror = (err) => {
      machineProcessesStream?.close();
      machineProcessesStream = null;
    };
  };

  const handleUpdatePoint = () => {
    const promise = updatePointQtd({
      finishedQtd: pointQtdInfos.finishedQtd,
      missingQtd: pointQtdInfos.missingQtd,
      refusedQtd: pointQtdInfos.refusedQtd,
      odfId: pointQtdInfos.odfId,
      processId: pointQtdInfos.processId,
    });

    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Alterando informações de apontamento",
    });
  };

  localStorage.removeItem("selectedPage");

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (machineProcessesStream) machineProcessesStream.close();
    machineProcessesStream = null;
  });
</script>

<Auth>
  <div
    class="
flex flex-col
gap-base
p-base
machineProcesses"
  >
    <div
      class="
  w-full
  flex items-center justify-between
  searchDiv"
    >
      <Button
        buttonType="normal"
        text={completeListOpen ? "Disponíveis" : "Todos"}
        clickFunction={() => {
          completeListOpen = !completeListOpen;
        }}
      ></Button>
      <SearchInput bind:value={searchInput}></SearchInput>
    </div>
    {#each machineProcesses as machineProcess, i}
      {#if completeListOpen || Number(machineProcess.av_qtd) > 0}
        {#if searchInput.trim() === "" || (machineProcess.odf && machineProcess.odf
              .toUpperCase()
              .includes(searchInput.toUpperCase())) || (machineProcess.item && machineProcess.item
              .toUpperCase()
              .includes(searchInput.toUpperCase()))}
          {#if machineProcess.item_grouping}
            <GroupCard
              on:pointOpen={(ev) => {
                console.log(ev.detail);
                if (isAdm) {
                  pointQtdInfos = {
                    avQtd: ev.detail.avQtd,
                    finishedQtd: ev.detail.finishedQtd,
                    missingQtd: ev.detail.missingQtd,
                    refusedQtd: ev.detail.refusedQtd,
                    odfId: ev.detail.odfId,
                    processId: ev.detail.processId,
                  };
                  pointIsOpen = true;
                }
              }}
              groupingProcesses={groupings[machineProcess.item_grouping]}
              index={i}
            ></GroupCard>
          {:else}
            <MachineProcessCard
              on:pointOpen={(ev) => {
                if (isAdm) {
                  pointQtdInfos = {
                    avQtd: ev.detail.avQtd,
                    finishedQtd: ev.detail.finishedQtd,
                    missingQtd: ev.detail.missingQtd,
                    refusedQtd: ev.detail.refusedQtd,
                    odfId: ev.detail.odfId,
                    processId: ev.detail.processId,
                  };
                  pointIsOpen = true;
                }
              }}
              params={{
                machineProcessInfo: machineProcess,
                index: i,
              }}
            ></MachineProcessCard>
          {/if}
        {/if}
      {/if}
    {/each}
  </div>

  <SimplePopup bind:isOpen={pointIsOpen} h="h-[250px]" w="w-[800px]">
    <div
      class="
w-full h-[90%]
flex flex-col items-center justify-between
gap-base
pointPopup"
    >
      <div
        class="
  h-[10%]
  titleDiv"
      >
        <Title text="Apontamento"></Title>
      </div>
      <div
        class="
  w-full
  flex items-center justify-between
  gap-base
  inputs"
      >
        <InputForm label="Qtd. apontada" type="vertical">
          <NumberInput
            bind:value={pointQtdInfos.finishedQtd}
            max={pointAvQtd}
            min={0}
          ></NumberInput>
        </InputForm>
        <InputForm label="Qtd. refugada" type="vertical">
          <NumberInput
            bind:value={pointQtdInfos.refusedQtd}
            max={pointAvQtd}
            min={0}
          ></NumberInput>
        </InputForm>
        <InputForm label="Qtd. faltante" type="vertical">
          <NumberInput
            bind:value={pointQtdInfos.missingQtd}
            max={pointAvQtd}
            min={0}
          ></NumberInput>
        </InputForm>
      </div>
      <div
        class="
      updateButton
      w-full
      flex justify-end items-center
      "
      >
        <Button text="Atualizar" clickFunction={handleUpdatePoint}></Button>
      </div>
    </div>
  </SimplePopup>
</Auth>
