<script lang="ts">
  import LabeledText from "$lib/components/Texts/LabeledText.svelte";
  import Title from "$lib/components/Texts/Title.svelte";
  import { Datetime } from "$lib/utils/Datetime";
  import Loader from "$lib/components/Loaders/Loader.svelte";
  import FullPageText from "$lib/components/Texts/FullPageText.svelte";
  import { findOdfProcesses } from "../../config/items/pages/Odfs/api/odfs.api";
  import type { CompanyProcessInfo } from "../../config/items/pages/Processes/types/processes.types";
  import { findProcessNeededItemsInfo } from "../api/machine_parts.api";
  import type { ProcessNeededItemInfo } from "../types/machine_parts.types";
  import OdfItemsInfoTable from "./OdfItemsInfoTable.svelte";
  import OdfPointsTable from "./OdfPointsTable.svelte";

  export let processInfo: {
    id: number;
    img: string;
    odf: string;
    odf_id: number;
    item: string;
    op_num: number;
    qtd: number;
    av_qtd: number;
    finished_qtd: number;
    start_datetime: string;
    end_datetime: string;
    missing_qtd: number;
    refused_qtd: number;
    status: string;
    group?: string;
  };

  let stockQtd = 1;

  const fetchData = async (): Promise<{
    odfProcessesInfo: CompanyProcessInfo[];
    processNeededItems: ProcessNeededItemInfo[];
  }> => {
    const odfProcessesInfo = await findOdfProcesses(processInfo.odf_id);
    const processNeededItems = await findProcessNeededItemsInfo(processInfo.id);

    return {
      odfProcessesInfo: odfProcessesInfo.data,
      processNeededItems: processNeededItems.data,
    };
  };
  console.log(processInfo);
</script>

<div
  class="
w-full h-full
flex flex-col
p-base gap-base
processDetail"
>
  {#await fetchData()}
    <Loader type="inner"></Loader>
  {:then data}
    <div
      class="
w-full
flex items-center justify-center
titleDiv"
    >
      <div
        class="ProcessNeededItemInfo
    w-fit
    px-8 py-2
rounded
{processInfo.status === 'Atrasado' ? 'bg-base-red' : 'bg-base-green'}
    titleBox"
      >
        <Title color="text-white" text={`Detalhado ODF: ${processInfo.odf}`}
        ></Title>
      </div>
    </div>
    <div
      class="
    w-full h-[40%]
    flex gap-base
    generalInfo"
    >
      <div
        class="
        h-full w-[60%]
        grid grid-cols-4
        items-center justify-center
        gap-base
        partInfo"
      >
        <div
          class="
    h-32
    flex items-center justify-center
    itemImg"
        >
          <img
            src={`data:image/jpg;base64,${processInfo.img}`}
            alt="part_img"
            class="h-full"
          />
        </div>
        <LabeledText label="ODF" text={processInfo.odf}></LabeledText>
        <LabeledText
          label="Saldo"
          text={`${processInfo.finished_qtd}/${Number(processInfo.av_qtd) + processInfo.finished_qtd + processInfo.refused_qtd + processInfo.missing_qtd}`}
        ></LabeledText>
        <LabeledText
          label="Início"
          text={Datetime.formatDatetimeString(processInfo.start_datetime)}
        ></LabeledText>
        <LabeledText label="Status" text={processInfo.status}></LabeledText>
        <LabeledText label="Estoque" text={stockQtd}></LabeledText>
        <LabeledText label="Número op." text={processInfo.op_num}></LabeledText>
        <LabeledText
          label="Fim"
          text={Datetime.formatDatetimeString(processInfo.end_datetime)}
        ></LabeledText>
        <LabeledText label="Part number" text={processInfo.item}></LabeledText>
        <LabeledText label="Qtd. ODF" text={processInfo.qtd}></LabeledText>
        <LabeledText label="Grupo" text={processInfo.group || "Sem grupo"}
        ></LabeledText>
      </div>
      <div
        class="
h-full w-[40%]
flex items-center justify-center
processesDetail"
      >
        {#if data.odfProcessesInfo.length === 0}
          <div
            class="
  w-full h-full
  border-solid border-2 border-light-gray
  rounded"
          >
            <FullPageText type="normal" text="Não há informações"
            ></FullPageText>
          </div>
        {:else}
          <OdfPointsTable pointsInfo={data.odfProcessesInfo}></OdfPointsTable>
        {/if}
      </div>
    </div>
    <div
      class="
  w-full h-[60%]
  flex items-center justify-center
  neededItems"
    >
      {#if data.processNeededItems.length === 0}
        <div
          class="
      w-full h-full
      border-solid border-2 border-light-gray
      rounded"
        >
          <FullPageText type="normal" text="Não há componentes"></FullPageText>
        </div>
      {:else}
        <OdfItemsInfoTable processNeededItems={data.processNeededItems}
        ></OdfItemsInfoTable>
      {/if}
    </div>
  {/await}
</div>
