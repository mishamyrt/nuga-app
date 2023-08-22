<script lang="ts">
  import { focused, os, theme, useBackgroundColor, view } from '@stores/app'
  import { connected } from '@stores/device'
  import { initLogger } from '@stores/logger'
  import { hasUpdate, updateUrl, version } from '@stores/version'
  import { BrowserOpenURL } from '@wailsjs/runtime'
  import { onDestroy, onMount } from 'svelte'

  import Button from './components/Button.svelte'
  import SidebarItem from './components/Sidebar/SidebarItem.svelte'
  import ApplicationView from './views/ApplicationView.svelte'
  import DeviceView from './views/DeviceView.svelte'
  import LightsView from './views/LightsView.svelte'
  import LoadingView from './views/LoadingView.svelte'

  $: activeView = $view
  $: appVersion = $version

  let unsubscribeConnected: () => void
  let unsubscribeBackground: () => void
  let rootRef: HTMLDivElement

  let hideLoading = false

  function openUpdate (): void {
    const url = $updateUrl
    if (!url) {
      return
    }
    BrowserOpenURL(url)
  }

  onMount(() => {
    initLogger()
    unsubscribeBackground = useBackgroundColor(rootRef, '--color-background-main')
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
    unsubscribeBackground()
  })
</script>

<div bind:this={rootRef} class="{$os} theme-{$theme}">
  <main>
    <div class="app" class:blurred={!$focused} class:ready={$connected}>
      <div class="sidebar">
        <div>
          <h1>Nuga</h1>
          <div class="menu">
            <SidebarItem title="Lights" target="lights" />
            <SidebarItem disabled title="Keys" target="keys" />
            <SidebarItem title="Device" target="device" />
            {#if $version === 'dev'}
            <SidebarItem title="Application" target="application" />
            {/if}
          </div>
        </div>
        <div class="version-container">
          {#if $hasUpdate}
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
        {:else if activeView === 'application'}
          <ApplicationView />
        {/if}
      </div>
    </div>
    {#if !hideLoading}
    <LoadingView hide={$connected} />
    {/if}
  </main>
  {#if $os === 'mac'}
  <div class="drag" />
  {/if}
  {#if $os === 'mac' && $theme === 'dark'}
  <div class="border" />
  {/if}
  {#if $os === 'linux'}
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');
  </style>
  {/if}
</div>

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

  :global(.linux) .version-container {
    padding: 15px;
  }

  :global(.mac) .version-container {
    padding: 8px;
  }

  .content {
    background-color: var(--color-background-main);
    border-left: 1px solid var(--color-line);
    box-shadow: -0.5px 0 2px -1px rgb(0 0 0 / 7%);
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
    background-color: var(--color-background-sidebar);
  }

  .ready .sidebar {
    opacity: 1;
  }

  :global(.linux) .sidebar {
    padding: 0;
  }

  .app.blurred .sidebar {
    opacity: 0.4;
  }

  .version {
    margin-bottom: 0;
    margin-top: 5px;
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

  :global(.linux) {
    h1 {
      display: none;
    }

    .app.blurred .sidebar {
      opacity: 1;
    }

    .border {
      display: none;
    }
  }
</style>
