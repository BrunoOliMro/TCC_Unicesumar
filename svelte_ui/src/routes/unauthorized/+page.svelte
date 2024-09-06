<script lang="ts">
  import ball from "$assets/misc/big-green-ball.svg";

  import { page } from "$app/stores";
  import svelteCloak from "../../lib/auth/SvelteCloak";

  async function handleLogout() {
    await svelteCloak.keycloak.logout({ redirectUri: $page.url.origin + "/" });
  }

  let showBackBtn = true;
</script>

<div class="page-wrapper">
  <div class="wrapper">
    <div class="text-box">
      <h2>OOPS!</h2>
      <h3>Você não está autorizado a acessar este conteúdo.</h3>
      <p>Peça ao administrador do HUB para obter autorização.</p>
      <div class="btns-wrapper">
        {#if showBackBtn}
          <button
            on:click={() => history.go(-3)}
            aria-hidden
            class="
            rounded
            px-4 py-2
            bg-base-green
            hover:opacity-70
            transition duration-300
            text-white font-semibold"
          >
            Voltar à aplicação
          </button>
        {/if}
        <button
          class="
        rounded
        px-4 py-2
        bg-base-green
        hover:opacity-70
        transition duration-300
        text-white font-semibold"
          on:click={handleLogout}
          aria-hidden
        >
          Fazer login com outro usuário
        </button>
      </div>
    </div>
    <div class="ball-wrapper">
      <h1>401</h1>
      <img class="ball" src={ball} alt="" />
    </div>
  </div>
</div>

<style>
  .page-wrapper {
    height: 100vh;
    width: 100%;
    background: -moz-linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 40%,
      rgba(3, 140, 107, 1) 100%
    );
    background: -webkit-linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 40%,
      rgba(3, 140, 107, 1) 100%
    );
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 40%,
      rgba(3, 140, 107, 1) 100%
    );
    overflow: hidden;
    display: grid;
    place-content: center;
    padding-inline: 2rem;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
  }

  .wrapper > div {
    width: 100%;
  }
  .text-box {
    color: var(--cl-green-500);
  }
  h2 {
    font-size: clamp(5rem, 5vw, 7rem);
  }

  h3 {
    font-size: 1.4rem;
    color: var(--cl-green-500);
    /* margin-bottom: 0.5rem; */
  }

  .btns-wrapper {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .ball-wrapper {
    margin-left: auto;
    display: grid;
    grid-template-areas: "stack";
    place-items: center;
  }

  .ball-wrapper > * {
    grid-area: stack;
  }

  .ball-wrapper h1 {
    z-index: 10;
    translate: -30px 0;
    /* position: absolute; */
    color: var(--cl-white);
    font-size: clamp(8rem, 40vw, 16rem);
    line-height: 0px;
    text-shadow: 8px 8px 2px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1080px) {
    .wrapper {
      flex-direction: column;
      align-items: center;
      gap: 3rem;
    }

    .text-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .ball-wrapper {
      max-width: 500px;
      margin-left: unset;
    }

    .page-wrapper {
      background: -moz-linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 40%,
        rgba(3, 140, 107, 1) 100%
      );
      background: -webkit-linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 40%,
        rgba(3, 140, 107, 1) 100%
      );
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 40%,
        rgba(3, 140, 107, 1) 100%
      );
    }
  }
</style>
