<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { AppLogo, AppSidebarMenu } from '$entities/nuga'
  import { AppVersion } from '$features/nuga'
  import { type AppPage, pageChanged } from '$shared/model'

  function handleNavigation (e: CustomEvent<AppPage>) {
    pageChanged(e.detail)
  }
</script>

<div class="sidebar" use:fsd={'app/Sidebar'}>
  <div class="logo">
    <AppLogo />
  </div>

  <AppSidebarMenu on:change={handleNavigation} />

  <div class="version">
    <AppVersion />
  </div>
</div>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .logo {
    padding: 0 var(--space-xs);
    margin-top: var(--space-s);
    margin-bottom: var(--space-l);
  }

  .version {
    position: relative;
    top: 2px;
    margin: auto var(--space-m) 0;
  }

  :global(.os-linux) {
    .version {
      padding: 0 var(--space-xs) 16px;
    }

    .logo {
      padding: var(--space-xs) calc(var(--space-m) + var(--space-xs)) 0;
    }
  }
</style>
