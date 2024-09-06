<script lang="ts">
  import Icon from "$lib/components/Icons/Icon.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import { fade } from "svelte/transition";
  import { deleteMachineGroup } from "../api/machines_groups.api";

  export let group: string;
  export let groupId: number;
  export let groupsUpdated: () => void;

  const deleteGroup = () => {
    const promise = deleteMachineGroup(groupId);

    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Removendo grupo",
    }).then(() => {
      groupsUpdated();
    });
  };
</script>

<div
  in:fade|global={{ duration: 300 }}
  class="
        flex justify-between items-center
        p-base
        text-md
        w-[250px] h-fit
        rounded
        border-solid border-2 border-light-gray
        groupCard"
>
  {group}
  <Icon
    color="text-base-red hover:text-base-red-hover transition duration-300"
    icon="fas fa-trash-alt"
    size="medium"
    clickOptions={{
      isClickable: true,
      clickFunction: deleteGroup,
    }}
  ></Icon>
</div>
