<script lang="ts">
  import {
    BodyThemeProvider,
    SidebarLayout
  } from '@naco-ui/svelte'
  import { FeatureSlicedDebug } from 'feature-sliced-svelte'
  import { onDestroy } from 'svelte'

  import { settingsStore, themeContextFromSettings } from '$entities/app'
  import { pages } from '$pages'
  import { activePage } from '$shared/model'
  import { AppDebugModal, DeviceConnection } from '$widgets'

  import Content from './ui/Content.svelte'
  import Sidebar from './ui/Sidebar.svelte'
  import Toolbar from './ui/Toolbar.svelte'

  const [context, subscription] = themeContextFromSettings(settingsStore)

  $: props = pages[$activePage].layoutProps ?? {}

  const sidebarWidth = 200

  onDestroy(() => {
    subscription.unsubscribe()
  })
</script>

<FeatureSlicedDebug />
<BodyThemeProvider {context}>
  <SidebarLayout
    {sidebarWidth}
    macInset={{
      enable: true
    }}
    toolbar={{
      transparent: true,
      border: 'scroll'
    }}
    transparent
    {...props}
  >
    <Sidebar slot="sidebar" />
    <Toolbar slot="toolbar" />
    <Content />
  </SidebarLayout>
  <DeviceConnection {sidebarWidth} />
  <AppDebugModal />
</BodyThemeProvider>
