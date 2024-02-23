<script>
  import { SidebarMenu } from '@naco-ui/svelte'
  import { fsd } from 'feature-sliced-svelte'

  import { AppIconBulb, AppIconGear, AppIconKeyboard } from './icons'
</script>

<div use:fsd={'entities/AppSidebarMenu'}>
  <SidebarMenu size="l" on:change items={[
    { title: 'Lights', value: 'lights', icon: AppIconBulb },
    { title: 'Keys', value: 'keys', icon: AppIconKeyboard },
    { title: 'Device', value: 'device', icon: AppIconGear }
  ]} />
</div>
