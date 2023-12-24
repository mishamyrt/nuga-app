<script lang="ts">
  import { SidebarLayout, ThemeProvider } from '@naco-ui/svelte'
  import { FeatureSlicedDebug } from 'feature-sliced-svelte'

  import { appSettingsStore } from '$entities/app'
  import { pages } from '$pages'
  import { activePage } from '$shared/model'
  import { AppDebugModal } from '$widgets/app'
  import { DeviceConnection } from '$widgets/device'

  import Content from './ui/Content.svelte'
  import Sidebar from './ui/Sidebar.svelte'
  import Toolbar from './ui/Toolbar.svelte'

  $: props = pages[$activePage].layoutProps ?? {}
  const sidebarWidth = 200
</script>

<FeatureSlicedDebug />
<ThemeProvider
  os={$appSettingsStore.ui}
  scheme={$appSettingsStore.theme}>
  <SidebarLayout {sidebarWidth} macInset={{
    show: true
  }} toolbar={{
    transparent: true,
    border: 'scroll'
  }} transparent {...props}>
    <Sidebar slot="sidebar" />
    <Toolbar slot="toolbar" />
    <Content />
  </SidebarLayout>
  <DeviceConnection {sidebarWidth} />
  <AppDebugModal />
</ThemeProvider>
