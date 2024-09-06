<script lang="ts">
  import type { CompanyProcessInfo } from "../../config/items/pages/Processes/types/processes.types";

  export let pointsInfo: CompanyProcessInfo[];
</script>

<div
  class="
w-full h-[250px]
rounded
border-solid border-2 border-light-gray
odfPointsTable"
>
  <div
    class="
grid grid-cols-4
bg-light-gray
gap-x-base
overflow-hidden
h-[50px]
headers"
  >
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Máquina
    </div>
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Apontado
    </div>
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Faltante
    </div>
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Refugado
    </div>
  </div>
  <div
    class="
  w-full h-[200px]
  grid grid-cols-4
  overflow-y-auto
  scrollbar-hide
  gap-base
  rounded-b
  points"
  >
    {#each pointsInfo as point}
      <div
        class="
        text-md
  flex items-center justify-center
  p-2"
      >
        {point.machine_name}
      </div>
      <div
        class="
        text-md
  flex items-center justify-center
  p-2"
      >
        {point.finished_qtd}
      </div>
      <div
        class="
        text-md
  flex items-center justify-center
  p-2"
      >
        {point.missing_qtd}
      </div>
      <div
        class="
        text-md
  flex items-center justify-center
  p-2"
      >
        {point.refused_qtd}
      </div>
    {/each}
  </div>
</div>
