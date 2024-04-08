<script lang="ts">
  import MoreIcon from './MoreIcon.svelte'
</script>

<div>
  <button class="context-menu-button" on:click>
    <MoreIcon />
  </button>
</div>

<style lang="scss">
  .context-menu-button {
    border: none;
    background: none;
    appearance: none;
    padding: 0;
    margin: 0;
    display: flex;
    opacity: 0.6;
  }
</style>
