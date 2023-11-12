<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'

  import { AppLogo, AppSidebarMenu } from '$entities/app'
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
</div>

<style lang="scss">
  .sidebar {
    display: flex;
    flex-direction: column;
  }

  .logo {
    padding: 0 var(--space-xs);
    margin-top: var(--space-s);
    margin-bottom: var(--space-l);
  }
</style>
