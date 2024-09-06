<script lang="ts">
  import Icon from "../Icons/Icon.svelte";

  export let pages: number;
  export let currPage: number;
</script>

<div
  class="
h-full w-fit
flex items-center justify-between
gap-base
paginationPages"
>
  <Icon
    size="small"
    icon="fas fa-caret-left"
    color="text-black hover:text-main-color"
    clickOptions={{
      isClickable: true,
      clickFunction: () => {
        if (currPage !== 0) currPage = currPage - 1;
      },
    }}
  ></Icon>
  <!-- <div
    class="
h-full
flex items-center
gap-base
paginationSelectors"
  >
    {#each Array.from(Array(pages).keys()).slice(currPaginationPage * paginationPace, (currPaginationPage + 1) * paginationPace) as page}
      <p
        class="
font-semibold
{currPage === page
          ? 'text-main-color hover:text-main-color-hover'
          : 'text-black hover:text-main-color'}
 text-sm
cursor-pointer
transition duration-300
"
        aria-hidden
        on:click={() => (currPage = page)}
      >
        {page + 1}
      </p>
    {/each}
  </div> -->
  <Icon
    size="small"
    icon="fas fa-caret-right"
    color="text-black hover:text-main-color"
    clickOptions={{
      isClickable: true,
      clickFunction: () => {
        if (currPage !== pages) currPage = currPage + 1;
      },
    }}
  ></Icon>
</div>
