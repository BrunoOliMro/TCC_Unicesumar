<script>
  import BoxSelector from "$lib/components/Selectors/BoxSelector.svelte";
  import Items from "./pages/Items/Items.svelte";
  import Odfs from "./pages/Odfs/Odfs.svelte";
  import Groups from "./pages/Groups/Groups.svelte";
  // import Processes from "./pages/Processes/Processes.svelte";
  import Auth from "../../../../lib/auth/Auth.svelte";
  import ItemTypes from "./pages/ItemTypes/ItemTypes.svelte";

  const headerOptions = [
    {
      label: "Itens",
      description: "Gerencie os itens da empresa",
    },
    {
      label: "Tipos de item",
      description: "Administre os tipos de item da sua empresa",
    },
    {
      label: "ODFs",
      description: "Crie e administre ODFs",
    },
    {
      label: "Grupos",
      description: "Agrupe seus processos da forma que desejar",
    },
  ];

  let headerSelectedOption = headerOptions[0].label;

  localStorage.setItem("selectedPage", "2");
</script>

<Auth>
  <div
    class="
          w-full h-full
          bg-white
          rounded
          border-solid border-2 border-light-gray
          selectedPage"
  >
    <BoxSelector
      options={headerOptions}
      bind:selectedOption={headerSelectedOption}
    ></BoxSelector>
    <div
      class="
            w-full h-content-with-selector
             p-box
             selectedPage"
    >
      {#if headerSelectedOption === "Itens"}
        <Items></Items>
      {:else if headerSelectedOption === "Tipos de item"}
        <ItemTypes></ItemTypes>
      {:else if headerSelectedOption === "ODFs"}
        <Odfs></Odfs>
      {:else}
        <Groups></Groups>
      {/if}
    </div>
  </div>
</Auth>
