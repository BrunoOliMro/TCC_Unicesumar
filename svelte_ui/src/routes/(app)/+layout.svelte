<script>
  import "../../app.css";

  import Nav from "$lib/components/Nav/Nav.svelte";
  import { Toaster } from "svelte-french-toast";
  import svelteCloak from "../../lib/auth/SvelteCloak";
  import Auth from "../../lib/auth/Auth.svelte";

  const keycloakConfig = {
    url: import.meta.env["VITE_KC_CAS_URL"],
    realm: import.meta.env["VITE_KC_REALM"],
    clientId: import.meta.env["VITE_KC_CLIENT_ID"],
  };

  const options = {
    strict: false,
    unauthorizedUrl: "/unauthorized",
  };

  svelteCloak.config(keycloakConfig, options);
</script>

<svelte:head>
  <title>Axon Next</title>
</svelte:head>

<Auth>
  <Nav></Nav>
  <div
    class="
  w-full h-[95vh]
  mt-[5vh]
  overflow-y-auto
  p-box
  content-box"
    data-sveltekit-preload-data="off"
  >
    <slot />
  </div>
  <Toaster></Toaster>
</Auth>
