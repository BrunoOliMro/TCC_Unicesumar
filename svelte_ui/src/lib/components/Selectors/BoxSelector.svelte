<script lang="ts">
  export let selectedOption: string;

  export let options: {
    label: string;
    description: string;
  }[];
</script>

<header
  class="
          h-24
          w-full
          rounded-t
          overflow-hidden
          flex justify-start
          border-b-solid border-light-gray border-b-4
          headerLineSelector"
>
  {#each options as option, i}
    <div
      on:click={() => {
        selectedOption = option.label;
      }}
      on:keypress={() => {
        selectedOption = option.label;
      }}
      aria-hidden
      class={`
                cursor-pointer
                h-full w-[20%]
                flex flex-col justify-start items-start
                p-base
                ${
                  option.label === selectedOption
                    ? "bg-main-color"
                    : "bg-transparent"
                }
                hover:bg-main-color
                transition duration-300
                selectBox
                group`}
    >
      <strong
        class={`
                ${option.label === selectedOption ? "text-white" : ""}
               text-xl
               group-hover:text-white
              `}
      >
        {option.label}
      </strong>
      <p
        class={`
                ${option.label === selectedOption ? "text-white" : ""}
                text-md text-text-gray
                group-hover:text-white
                labelDescription`}
      >
        {option.description}
      </p>
    </div>
  {/each}
</header>
