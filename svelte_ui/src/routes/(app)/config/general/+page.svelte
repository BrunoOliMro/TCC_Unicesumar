<script lang="ts">
  import Auth from "$lib/auth/Auth.svelte";
  import Button from "../../../../lib/components/Buttons/Button.svelte";
  import GeneralConfig from "./pages/GeneralConfig.svelte";
  import TimersConfig from "./pages/TimersConfig.svelte";

  let currPage = 0;

  localStorage.setItem("selectedPage", "3");
</script>

<Auth>
  <div
    class="
  w-full h-full
  flex flex-col
        border-solid border-2 border-light-gray
      gap-base p-base
  config"
  >
    <div
      class="
  w-full h-[10%]
  flex items-center justify-start
  gap-base
  headers"
    >
      <Button
        text="Geral"
        buttonType="normal"
        clickFunction={() => (currPage = 0)}
      ></Button>
      <Button
        text="Timers"
        buttonType="normal"
        clickFunction={() => (currPage = 1)}
      ></Button>
    </div>
    {#if currPage === 0}
      <GeneralConfig></GeneralConfig>
    {:else}
      <TimersConfig></TimersConfig>
    {/if}
  </div>
</Auth>
