<script lang="ts">
  import { onHotkey } from '@naco-ui/svelte'

  import AppConnectionDialog from '$entities/app/ui/AppConnectionDialog.svelte'
  import { isConnected, simulating } from '$shared/model'

  export let sidebarWidth: number
  const unmountDelay = 1000
  let isMounted = true
  let isShowHelp = false
  let isHidden = false

  function hide () {
    setTimeout(() => {
      isHidden = true
      setTimeout(() => {
        isMounted = false
      }, unmountDelay)
    }, 500)
  }

  function show () {
    isMounted = true
    isHidden = false
    setTimeout(() => {
      isShowHelp = true
    }, 2000)
  }

  onHotkey('ctrl+shift+KeyS', () => {
    if (!$isConnected) {
      simulating()
    }
  })

  $: $isConnected ? hide() : show()
</script>

{#if isMounted}
<div
  class="dialog"
  class:hidden={isHidden}
  style:--connection-dialog-sidebar-width="{sidebarWidth}px"
>
  <AppConnectionDialog showHelp={isShowHelp} />
</div>
{/if}

<style>
  .dialog {
    position: absolute;
    --wails-draggable: drag;
    width: 100%;
    height: 100%;
    z-index: 999;
    transition:
      transform var(--transition-slow),
      opacity var(--transition-slow) var(--transition-time-slow);

    &.hidden {
      pointer-events: none;
      transform: translateX(var(--connection-dialog-sidebar-width));
      opacity: 0;
    }
  }
</style>
