<script lang="ts">
  import { onMount } from "svelte";
  import { executeCore } from "../../../routes/(app)/api/landing.api";
  import { keycloakInstance } from "../../auth/keycloak";
  import ToasterHandler from "../../toaster/toaster";
  import Button from "../Buttons/Button.svelte";
  import Icon from "../Icons/Icon.svelte";

  const isAdm =
    $keycloakInstance.tokenParsed.resource_access[
      import.meta.env["VITE_KC_ROLES_CLIENT"]
    ].roles.includes("Next_admin");

  const navButtons: {
    text: string;
    ref: string;
    icon: string;
  }[] = [
    {
      text: "Remodelagens",
      ref: "/remodel",
      icon: "fas fa-exchange-alt",
    },
    {
      text: "Máquinas",
      ref: "/config/machines",
      icon: "fas fa-industry",
    },
    {
      text: "Itens",
      ref: "/config/items",
      icon: "fas fa-scroll",
    },
    {
      text: "Configurações",
      ref: "/config/general",
      icon: "fas fa-cogs",
    },
    {
      text: "Estoque",
      ref: "/stock",
      icon: "fas fa-box",
    },
    {
      text: "Apontamentos",
      ref: "/point_history",
      icon: "fas fa-stream",
    },
  ];

  $: selectedNavIndex =
    localStorage.getItem("selectedPage") !== (null && undefined)
      ? Number(localStorage.getItem("selectedPage"))
      : null;

  const handleExecuteSequence = () => {
    const promise = executeCore();

    ToasterHandler.createPromiseToast({
      promise: promise,
      loadingMessage: "Sequenciando",
    });
  };

  onMount(() => {
    selectedNavIndex =
      localStorage.getItem("selectedPage") !== (null && undefined)
        ? Number(localStorage.getItem("selectedPage"))
        : null;
  });
</script>

<nav
  class="
h-[5vh] w-full
fixed
flex items-center justify-between
px-base
border-solid border-b-2 border-light-gray
z-20
bg-white
text-black"
>
  <a
    on:click={() => {
      selectedNavIndex = null;
      localStorage.removeItem("selectedPage");
    }}
    href="/"
  >
    <img
      src="{import.meta.env['VITE_SERVER_ROUTE']}/static/images/nextLogo.svg"
      alt="logo"
      class="
    h-12
    "
    />
  </a>
  {#if isAdm}
    <div
      class="
  h-full
  flex items-center
  gap-12
  buttons"
    >
      {#each navButtons as button, i}
        <div
          class="
    group
    flex items-center
    gap-2
    navButton"
        >
          <Icon
            size="small"
            icon={button.icon}
            color="
            {i === selectedNavIndex ? 'text-main-color' : ''}
            text-black group-hover:text-main-color transition duration-300"
          ></Icon>
          <a
            class="
      {i === selectedNavIndex ? 'text-main-color' : ''}
      group-hover:text-main-color
      transition duration-300
      relative
      overflow-y-hidden
      font-semibold"
            href={button.ref}
            on:click={() => {
              selectedNavIndex = i;
              localStorage.setItem("selectedPage", i.toString());
            }}
          >
            {button.text}</a
          >
        </div>
      {/each}
    </div>
    <Button clickFunction={handleExecuteSequence} text="Sequenciar"></Button>
  {/if}
</nav>
