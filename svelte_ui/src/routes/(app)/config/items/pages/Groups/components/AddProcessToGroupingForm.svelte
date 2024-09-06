<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import SelectInput from "$lib/components/Inputs/SelectInput.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import {
    findCompanyOdfs,
    findOdfProcessesGeneralInfo,
  } from "../../Odfs/api/odfs.api";
  import type { OdfGeneralInfo } from "../../Odfs/types/odfs.types";
  import type { OdfProcessGeneralInfo } from "../../Processes/types/processes.types";
  import { addProcessToGrouping } from "../api/groups.api";
  import { onDestroy, onMount } from "svelte";

  export let onAdd: () => void;
  export let selectedGroupingId: number;

  let companyOdfs: OdfGeneralInfo[] = [];
  let companyOdfsStream: EventSource | null;

  const startStreams = async (): Promise<void> => {
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
  };

  const fetchOdfAvailableProcesses = async (
    odfId: number
  ): Promise<OdfProcessGeneralInfo[]> => {
    selectedOdfId = odfId;
    const res = await findOdfProcessesGeneralInfo(odfId);
    return res.data;
  };

  let selectedOdfId = 0;
  let selectedProcessId = 0;

  let odfAvailableProcesses: Promise<OdfProcessGeneralInfo[]> = new Promise(
    (resolve) => {
      resolve([]);
    }
  );

  const handleAddProcessToGroup = () => {
    const promise = addProcessToGrouping(
      selectedGroupingId,
      selectedOdfId,
      selectedProcessId
    );
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando processo ao grupo",
    });
    promise.then(() => {
      onAdd();
    });
  };

  onMount(() => {
    startStreams();
  });
  onDestroy(() => {
    if (companyOdfsStream) {
      companyOdfsStream.close();
    }
    companyOdfsStream = null;
  });
</script>

<div
  class="
        w-full
        flex flex-col
        gap-base
        addProcessToGroupingForm"
>
  <div
    class="
    w-full
    flex flex-col
    gap-base
    inputLine"
  >
    <Subtitle text="Adicionar processo ao grupo"></Subtitle>
    <div
      class="
      grid grid-cols-3
      gap-base
      w-full
      formInputs"
    >
      <InputForm label="ODF" type="vertical">
        <SelectInput
          bind:value={selectedOdfId}
          changeFunction={(odfId) => {
            odfAvailableProcesses = fetchOdfAvailableProcesses(odfId);
          }}
          options={companyOdfs.map((odfInfo) => {
            return { text: odfInfo.odf, value: odfInfo.id };
          })}
        ></SelectInput>
      </InputForm>
      {#await odfAvailableProcesses then availableProcesses}
        <InputForm label="Processo" type="vertical">
          <SelectInput
            bind:value={selectedProcessId}
            options={availableProcesses.map((processInfo) => {
              return {
                text: `Máquina: ${processInfo.machine}, Num.op: ${processInfo.op_num}`,
                value: processInfo.process_id,
              };
            })}
          ></SelectInput>
        </InputForm>
      {/await}
    </div>
  </div>

  <div
    class="
      w-full
      flex justify-end items-center
      pt-base
      addButton"
  >
    <Button clickFunction={handleAddProcessToGroup} text="Adicionar"></Button>
  </div>
</div>
