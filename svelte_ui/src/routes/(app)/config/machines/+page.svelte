<script>
  import BoxSelector from "$lib/components/Selectors/BoxSelector.svelte";
  import Auth from "../../../../lib/auth/Auth.svelte";
  import MachinesGroups from "./pages/Groups/MachinesGroups.svelte";
  import MachinesMaintenance from "./pages/Maintenance/MachinesMaintenance.svelte";
  import MachinesManagement from "./pages/Management/MachinesManagement.svelte";
  import MachinesShifts from "./pages/Shifts/MachinesShifts.svelte";

  const headerOptions = [
    {
      label: "Gerenciar",
      description: "Gerencie as máquinas da sua empresa",
    },
    {
      label: "Grupos",
      description: "Faça a manutenção dos grupos de máquinas aqui",
    },
    {
      label: "Turnos",
      description: "Administre os turnos de suas máquinas",
    },
    {
      label: "Manutenção",
      description: "Máquina precisa de parada? Deixe registrado aqui",
    },
  ];

  let headerSelectedOption = headerOptions[0].label;

  localStorage.setItem("selectedPage", "1");
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
         border-solid border-2 border-light-gray
         selectedPage"
    >
      {#if headerSelectedOption === "Gerenciar"}
        <MachinesManagement></MachinesManagement>
      {:else if headerSelectedOption === "Grupos"}
        <MachinesGroups></MachinesGroups>
      {:else if headerSelectedOption === "Turnos"}
        <MachinesShifts></MachinesShifts>
      {:else}
        <MachinesMaintenance></MachinesMaintenance>
      {/if}
    </div>
  </div>
</Auth>
