<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import LoadingView from './views/LoadingView.svelte'
  import { version } from '@stores/app'
  import SidebarItem from './components/SidebarItem.svelte'
  import { view, connected } from './stores/app'
  import LightsView from './views/LightsView.svelte'
  import DeviceView from './views/DeviceView.svelte'

  $: activeView = $view
  $: appVersion = $version

  let unsubscribeConnected: () => void

  let hideLoading = false

  onMount(() => {
    unsubscribeConnected = connected.subscribe(isConnected => {
      if (isConnected) {
        setTimeout(() => {
          hideLoading = true
        }, 1000)
      } else {
        hideLoading = false
      }
    })
  })

  onDestroy(() => {
    unsubscribeConnected()
  })
</script>

<main>
  <div class="app" class:ready={$connected}>
    <div class="sidebar">
      <div>
        <h1>Nuga</h1>
        <div class="menu">
          <SidebarItem title="Lights" target="lights" />
          <SidebarItem disabled title="Keys" target="keys" />
          <SidebarItem title="Device" target="device" />
        </div>
      </div>
      <div>
        <span class="version">{appVersion}</span>
      </div>
    </div>
    <div class="content">
      {#if activeView === 'lights'}
        {#if $connected}
        <LightsView />
        {/if}
      {:else if activeView === 'device'}
        <DeviceView />
      {:else if activeView === 'keys'}
        <div>
          <h1>Keys</h1>
        </div>
      {/if}
    </div>
  </div>
  {#if !hideLoading}
  <LoadingView hide={$connected} />
  {/if}
</main>
<div class="drag"></div>

<style>
  .app {
    display: grid;
    height: 100vh;
    grid-template-columns: 211px 1fr;
  }

  .sidebar > div {
    width: 100%;
    text-align: left;
  }

  .content {
    background-color: var(--color-background-main);
    border-left: 1px solid rgb(1 1 1 / 41.2%);
  }

  .sidebar {
    width: 211px;
    padding: 8px;
    opacity: 0;
    transition: opacity .3s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
  }

  .version {
    padding: 8px;
    margin-bottom: 0;
    display: block;
    font-weight: 500;
    font-size: 13px;
    opacity: 0.25;
  }

  .ready .sidebar {
    opacity: 1;
  }

  .drag {
    --wails-draggable:drag;
    z-index: 99999999;

    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  h1 {
    font-size: 32px;
    font-weight: bold;
    opacity: 0.2;
    text-align: left;
    padding: 0 8px;
    margin-top: 33px;
  }
</style>
