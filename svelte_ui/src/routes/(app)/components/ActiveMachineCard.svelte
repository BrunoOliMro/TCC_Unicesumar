<script lang="ts">
  import { goto } from "$app/navigation";

  export let params: {
    machine: string;
    delayed: 0 | 1;
    machineId: number;
    machineIndex: number;
  };

  const handleRedirect = () => {
    goto(
      `/parts?machine_id=${params.machineId}&machine_index=${params.machineIndex}`
    );
  };
</script>

<div
  on:click={handleRedirect}
  aria-hidden
  class="
    relative
    bg-white
    cursor-pointer
    w-40
    h-12
    rounded
    border-solid border-2 border-light-gray
    flex
    machineCard
    group
    "
>
  <div
    class={`
      w-40
      max-w-8
      h-12
      group-hover:max-w-40
      group-hover:rounded-r
      absolute
      ${params.delayed ? "bg-base-red" : "bg-base-green"}
      transition-auto duration-300
      rounded-l
      machineStatus`}
  ></div>
  <div
    class="
  w-40
  font-semibold
  flex items-center justify-start
  ml-8
  px-base py-2
  rounded-r
  z-30
  group-hover:text-white
  transition duration-300
  machineName
  "
  >
    {params.machine}
  </div>
</div>
