<script lang="ts">
  import { clickOutside } from "../../events/outside_click";

  export let options: { text: string; value: any }[];
  export let value: any;
  export let changeFunction = (value: any) => {};
  export let placeholder = "";

  let textInputValue: string = "";
  let visibleOptions = options.slice(0, 50);

  let boxOpen = false;
</script>

<div
  use:clickOutside
  on:click_outside={() => (boxOpen = false)}
  class="
cursor-pointer
flex flex-col
relative
w-[200px]
autoComplete"
>
  <div
    on:click={() => (boxOpen = true)}
    aria-hidden
    class="
w-full h-full
flex justify-between items-center
border-solid border-2 border-light-gray
rounded
transition duration-300
focus:border-main-color
textInput"
  >
    <input
      class="
  cursor-pointer
  w-[90%]
  outline-none
  h-12
  py-2 px-2
  "
      type="text"
      {placeholder}
      on:input={() => {
        value = textInputValue;
        visibleOptions = options
          .filter((option) => {
            return (
              option.text &&
              option.text.toUpperCase().includes(textInputValue.toUpperCase())
            );
          })
          .slice(0, 100);
        if (options.some((option) => option.value === value))
          changeFunction(value);
      }}
      bind:value={textInputValue}
    />
    <i
      class="
    pointer-events-none
    mr-2
    text-black
    fas fa-angle-down"
    ></i>
  </div>
  <div
    class="
  {boxOpen ? 'opacity-1' : 'opacity-0 pointer-events-none'}
  border-solid border-2 border-light-gray
  h-fit max-h-32
  w-full
  overflow-y-auto
  rounded-b
  bg-white
  absolute
  mt-12
  transition duration-300
  selectOptions"
  >
    {#each visibleOptions as option}
      <div
        on:click={() => {
          value = option.value;
          textInputValue = option.text;
          boxOpen = false;
          changeFunction(value);
        }}
        on:keypress={() => {
          value = option.value;
          textInputValue = option.text;
          boxOpen = false;
          changeFunction(value);
        }}
        aria-hidden
        class="
      pl-2
      w-full
      hover:bg-light-gray
      transition duration-300
      overflow-x-hidden
      py-2
      rounded
      selectOption"
      >
        {option.text}
      </div>
    {/each}
  </div>
</div>
