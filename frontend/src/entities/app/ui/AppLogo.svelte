<script lang="ts">
  import { fsd } from 'feature-sliced-svelte'
</script>

<div use:fsd={'entities/AppLogo'}>
  <h1 class="logo">
    Nuga
  </h1>
</div>

<style lang="scss">
  .logo {
    font-family: var(--typography-font-family);
    margin: 0;
    font-size: 32px;
    line-height: 1.2;
    color: var(--color-content-primary);
    opacity: 0.2;
  }
</style>
