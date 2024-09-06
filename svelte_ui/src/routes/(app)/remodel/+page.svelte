<script lang="ts">
  import { onMount } from "svelte";
  import { findRemodelProcesses } from "./api/remodel.api";
  import RemodelCard from "./components/RemodelCard.svelte";
  import Auth from "../../../lib/auth/Auth.svelte";
  import type { MachineProcess } from "../parts/types/machine_parts.types";

  let companyRemodelProcesses: MachineProcess[] = [];
  let companyRemodelProcessesStream: EventSource | null;

  const fetchRemodelProcesses = async () => {
    if (companyRemodelProcessesStream) companyRemodelProcessesStream.close();
    companyRemodelProcessesStream = null;
    companyRemodelProcessesStream = await findRemodelProcesses();
    companyRemodelProcessesStream.onmessage = (ev) => {
      if (JSON.parse(ev.data).end) {
        companyRemodelProcessesStream?.close();
        companyRemodelProcessesStream = null;
        return;
      }
      companyRemodelProcesses = companyRemodelProcesses.concat(
        JSON.parse(ev.data)
      );
    };
    companyRemodelProcessesStream.onerror = (err) => {
      companyRemodelProcessesStream?.close();
      companyRemodelProcessesStream = null;
    };
  };

  const handleDeleteRemodelProcess = (odfId: number, processId: number) => {
    for (const [i, processInfo] of companyRemodelProcesses.entries()) {
      if (processInfo.odf_id === odfId && processInfo.id === processId) {
        companyRemodelProcesses.splice(i, 1);
        companyRemodelProcesses = companyRemodelProcesses;
        break;
      }
    }
  };

  localStorage.setItem("selectedPage", "0");

  onMount(() => {
    fetchRemodelProcesses();
  });
</script>

<Auth>
  <div
    class="
w-full h-full
flex flex-col
overflow-y-auto
gap-base p-base
remodelItems"
  >
    {#each companyRemodelProcesses as remodelProcess}
      <RemodelCard
        onDelete={handleDeleteRemodelProcess}
        processInfo={remodelProcess}
      ></RemodelCard>
    {/each}
  </div>
</Auth>
