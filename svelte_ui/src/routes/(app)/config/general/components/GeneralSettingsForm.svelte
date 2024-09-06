<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import NumberInput from "$lib/components/Inputs/NumberInput.svelte";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { editGeneralSettings, findGeneralSettings } from "../api/general.api";
  import type { GeneralSettings } from "../types/sequence.types";

  const fetchGeneralSettings = async (): Promise<GeneralSettings> => {
    const res = await findGeneralSettings();
    return res.data;
  };

  let generalSettings: Promise<GeneralSettings> = fetchGeneralSettings();

  let sequenceDays: number;

  const handleEditGeneralSettings = () => {
    const promise = editGeneralSettings({ sequence_days: sequenceDays });
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Editando configurações",
    }).then(() => {
      generalSettings = fetchGeneralSettings();
    });
  };
</script>

<div
  class="
        w-full h-gap-vertical-1/3-box
        flex flex-col justify-between items-center
        gap-base p-base
        border-solid border-2 border-light-gray
        rounded
        generalSettingsForm"
>
  <Subtitle text="Configurações gerais" />
  <div
    class="
      w-full
      flex items-center justify-around
      gap-base
      generalConfigs"
  >
    {#await generalSettings then settings}
      <InputForm label="Alterar dias para sequenciar" type="vertical">
        <NumberInput max={100} min={0} bind:value={sequenceDays}></NumberInput>
      </InputForm>
      <div class="sequenceDays gap-base text-lg flex flex-col items-center">
        <strong>Dias para sequenciar atuais: </strong>{settings.sequence_days} dias
      </div>
    {/await}
  </div>
  <div
    class="
          flex justify-end
          w-full
        editSettingsButton"
  >
    <Button clickFunction={handleEditGeneralSettings} text="Editar"></Button>
  </div>
</div>
