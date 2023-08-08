<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import LoadingView from './views/LoadingView.svelte'
  import { BrowserOpenURL } from '../wailsjs/runtime'
  import { focused, version, os } from '@stores/app'
  import SidebarItem from './components/Sidebar/SidebarItem.svelte'
  import Button from './components/Button.svelte'
  import { view, connected, updateUrl } from './stores/app'
  import LightsView from './views/LightsView.svelte'
  import DeviceView from './views/DeviceView.svelte'

  $: activeView = $view
  $: appVersion = $version

  let unsubscribeConnected: () => void

  let hideLoading = false

  function openUpdate (): void {
    const url = $updateUrl
    if (!url) {
      return
    }
    BrowserOpenURL(url)
  }

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

<main class="{$os}">
  <div class="app" class:blurred={!$focused} class:ready={$connected}>
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
        {#if $updateUrl}
        <Button on:click={openUpdate} label="Update available" autosize variant="bubble" />
        {/if}
        <span class="version">{appVersion}&nbsp;<span class="os">on {$os}</span></span>
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
<div class="border"></div>

<style lang="scss">
  .app {
    display: grid;
    height: 100vh;
    grid-template-columns: 211px 1fr;
    color: var(--color-text);

    &.blurred {
      background-color: var(--color-background-main);
    }
  }

  .sidebar > div {
    width: 100%;
    text-align: left;
  }

  .content {
    background-color: var(--color-background-main);
    border-left: 1px solid rgb(1 1 1 / 41.2%);
  }

  .border {
    position: fixed;
    pointer-events: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99999;
    box-shadow: inset 0 0 0 1px rgb(255 255 255 / 20%);
    border-radius: 11px;
  }

  .sidebar {
    width: 211px;
    padding: 8px;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
  }

  .ready .sidebar {
    opacity: 1;
  }

  .app.blurred .sidebar {
    opacity: 0.4;
  }

  .version {
    padding: 8px;
    margin-bottom: 0;
    display: block;
    font-weight: 500;
    font-size: 13px;
    opacity: 0.25;
  }

  .os {
    opacity: 0;
    transition: opacity .3s ease-out;
    transition-delay: 2s;
  }

  .version:hover .os {
    transition-delay: 0s;
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
