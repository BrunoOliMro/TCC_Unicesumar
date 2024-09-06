<script lang="ts">
  import Button from "$lib/components/Buttons/Button.svelte";
  import TextInput from "$lib/components/Inputs/TextInput.svelte";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import InputForm from "$lib/components/Forms/InputForm.svelte";
  import { addProcessTool } from "../api/processes.api";

  export let onEdit: () => void;
  export let processId: number;

  let tool: string;

  const handleAddProcessTool = () => {
    const promise = addProcessTool(processId, tool);
    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Adicionando ferramental",
    });
    promise.then(() => {
      onEdit();
    });
  };
</script>

<div
  class="
    w-full
    flex flex-col items-center
    gap-base
    addProcessToolForm"
>
  <Subtitle text="Adicionar ferramental"></Subtitle>
  <div
    class="
        w-full
        grid grid-cols-3
        gap-base
        inputs"
  >
    <InputForm label="Ferramental" type="vertical">
      <TextInput bind:value={tool}></TextInput>
    </InputForm>
  </div>
  <div
    class="
    w-full
    flex justify-end
    buttonDiv"
  >
    <Button clickFunction={handleAddProcessTool} text="Adicionar"></Button>
  </div>
</div>
