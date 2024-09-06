<script lang="ts">
  import type { ProcessNeededItemInfo } from "../types/machine_parts.types";

  export let processNeededItems: ProcessNeededItemInfo[];
</script>

<div
  class="
  w-full h-[350px]
  rounded
  border-solid border-2 border-light-gray
  overflow-hidden
  odfItemsInfoTable"
>
  <div
    class="
    h-[50px] w-full
    grid grid-cols-4
    gap-x-base
    bg-light-gray
    headers"
  >
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Imagem
    </div>
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Componente
    </div>
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Necessidade total
    </div>
    <div
      class="
    font-semibold text-lg
    flex items-center justify-center
    p-2
    tableHeader"
    >
      Em estoque
    </div>
  </div>
  <div
    class="
w-full h-[300px]
grid grid-cols-4
overflow-y-auto
scrollbar-hide
gap-base
rounded-b
items"
  >
    {#each processNeededItems as item}
      <div
        class="
      text-md
flex items-center justify-center
h-20
p-2"
      >
        <img
          src={`data:image/jpg;base64,${item.img}`}
          alt="part_img"
          class="h-full"
        />
      </div>
      <div
        class="
      text-md
flex items-center justify-center
p-2"
      >
        {item.item}
      </div>
      <div
        class="
      text-md
flex items-center justify-center
p-2"
      >
        {item.needed_qtd}
      </div>
      <div
        class="
      text-md
flex items-center justify-center
p-2"
      >
        {item.stock_qtd || "Sem estoque"}
      </div>
    {/each}
  </div>
</div>
