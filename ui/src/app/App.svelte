<script lang="ts">
  import { fromMatchMedia, prefersDarkMediaQuery, SidebarLayout, ThemeProvider } from '@naco-ui/svelte'
  import { FeatureSlicedDebug } from 'feature-sliced-svelte'

  import { settingsStore } from '$entities/app'
  import { pages } from '$pages'
  import { activePage } from '$shared/model'
  import { AppDebugModal, DeviceConnection } from '$widgets'

  import Content from './ui/Content.svelte'
  import Sidebar from './ui/Sidebar.svelte'
  import Toolbar from './ui/Toolbar.svelte'

  export const [isDark] = fromMatchMedia(prefersDarkMediaQuery)

  $: props = pages[$activePage].layoutProps ?? {}
  $: theme = $settingsStore.theme
  $: scheme = theme === 'auto'
    ? $isDark
      ? 'dark'
      : 'light'
    : theme
  const sidebarWidth = 200
</script>

<FeatureSlicedDebug />
<ThemeProvider
  os={$settingsStore.ui}
  {scheme}>
  <SidebarLayout {sidebarWidth} macInset={{
    enable: true
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
