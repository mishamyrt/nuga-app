<script lang="ts">
  import { onMount } from 'svelte';
  import LoadingView from './views/LoadingView.svelte';
  import { connect } from '@stores/device';
  import { sleep } from './utils/timing';
  import SidebarItem from './components/SidebarItem.svelte';
  import { view, connected, type SettingsView } from './stores/app';
  import LightsView from './views/LightsView.svelte';

  let isConnected: boolean
  let activeView: SettingsView

  onMount(async () => {
    await Promise.all([
      connect(),
      sleep(1000),
    ])
    connected.set(true)
  })

  view.subscribe(val => {
    activeView = val
  })
  connected.subscribe(c => {
    isConnected = c
  })
</script>

<main>
  <div class="app" class:ready={isConnected}>
    <div class="sidebar">
      <h1>Nuga</h1>
      <div class="menu">
        <SidebarItem title="Lights" target="lights" />
        <SidebarItem title="Keys" target="keys" />
        <SidebarItem title="System" target="system" />
      </div>
    </div>
    <div class="content">
      {#if activeView === 'lights'}
        <LightsView />
      {:else if activeView === 'system'}
        <div>
          <h1>System</h1>
        </div>
      {:else if activeView === 'keys'}
        <div>
          <h1>Keys</h1>
        </div>
      {/if}
    </div>
  </div>
  <!-- TODO: Remove from DOM when connected -->
  <LoadingView hide={isConnected} />
</main>
<div class="drag"></div>

<style>
  .app {
    display: grid;
    height: 100vh;
    grid-template-columns: 211px 1fr;
  }

  .content {
    background-color: #282828;
    border-left: 1px solid rgba(1, 1, 1, 0.4117647059);
  }

  .sidebar {
    width: 211px;
    padding: 8px;
    opacity: 0;
    transition: opacity .3s ease-out;
  }

  .ready .sidebar {
    opacity: 1;
  }

  .drag {
    --wails-draggable:drag;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    opacity: 0.2;
    text-align: left;
    padding: 0 8px;
    margin-top: 33px;
  }
</style>
