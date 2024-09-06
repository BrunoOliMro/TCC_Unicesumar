<script lang="ts">
  import DragList from "$lib/components/List/DragList.svelte";
  import Subtitle from "$lib/components/Texts/Subtitle.svelte";
  import ToasterHandler from "$lib/toaster/toaster";
  import {
    editSequencePriorities,
    findSequencePriorities,
  } from "../api/general.api";
  import type { SequencePriorityInfo } from "../types/sequence.types";

  const fetchSequencePriorities = async (): Promise<SequencePriorityInfo[]> => {
    const res = await findSequencePriorities();
    return res.data;
  };

  const sequencePriorities: Promise<SequencePriorityInfo[]> =
    fetchSequencePriorities();

  const handleDragEdit = (
    list: { id: number; title: string; value: any }[]
  ) => {
    const promise = editSequencePriorities(
      list.map((listItem, i) => {
        return {
          priority_id: listItem.id,
          priority_index: i,
        };
      })
    );
    promise.catch((err) => {
      ToasterHandler.createErrorToast(err.response.data.message);
    });
  };
</script>

<div
  class="
w-full h-gap-vertical-1/3-box
flex flex-col items-center
p-base
border-solid border-2 border-light-gray
rounded
sequencePriority"
>
  <Subtitle text="Prioridade de sequenciamento"></Subtitle>
  {#await sequencePriorities then priorities}
    <DragList
      items={priorities.map((priority) => {
        return {
          id: priority.id,
          title: priority.priority,
          value: priority.priority_index,
        };
      })}
      onEdit={handleDragEdit}
    ></DragList>
  {/await}
</div>
