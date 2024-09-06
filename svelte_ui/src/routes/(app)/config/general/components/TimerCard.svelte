<script lang="ts">
  import Icon from "$lib/components/Icons/Icon.svelte";
  import { createEventDispatcher } from "svelte";
  import { deleteSequenceTimer } from "../api/general.api";
  import ToasterHandler from "$lib/toaster/toaster";

  const dispatch = createEventDispatcher();

  export let timer;
  export let timerId: number;

  const handleDeleteTimer = async () => {
    await deleteSequenceTimer(timerId)
      .then(() => {
        dispatch("delete");
      })
      .catch((err) => {
        ToasterHandler.createErrorToast(err.response.data.message);
      });
  };
</script>

<div
  class="
h-12 w-[150px]
flex justify-between items-center
p-base
rounded
border-solid border-2 border-light-gray
timer"
>
  {timer}
  <Icon
    clickOptions={{
      isClickable: true,
      clickFunction: handleDeleteTimer,
    }}
    icon="fas fa-trash-alt"
    size="medium"
    color="text-base-red hover:text-base-red-hover transition duration-300"
  ></Icon>
</div>
