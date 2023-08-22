<script lang="ts">
  import { changingColor, type Color, type LightMode, type LightState } from '@stores/lights'
  import type { MapStore, ReadableAtom } from 'nanostores'

  import Button from './Button.svelte'
  import ColorSelector from './ColorSelector.svelte'
  import Help from './Help.svelte'
  import Range from './Range.svelte'
  import { Select, type SelectOption } from './Select'
  import Switch from './Switch.svelte'

  export let title: string = ''
  export let state: MapStore<LightState>
  export let modes: ReadableAtom<LightMode[]>
  export let write: () => void
  export let colors: readonly Color[] | undefined = undefined
  export let canChangeColor = false
  export let help: string = ''

  function handleEnabled (event: CustomEvent<boolean>): void {
    state.setKey('enabled', event.detail)
    write()
  }

  function handleMode (event: CustomEvent<string>): void {
    state.setKey('mode', parseInt(event.detail, 10))
    write()
  }

  function handleColor (event: CustomEvent<number>): void {
    state.setKey('color', event.detail)
    write()
  }

  function handleBrightness (event: CustomEvent<number>): void {
    state.setKey('brightness', event.detail)
    write()
  }

  function handleSpeed (event: CustomEvent<number>): void {
    state.setKey('speed', event.detail)
    write()
  }

  function handleColorChange (): void {
    changingColor.set($state.color)
  }

  $: mode = $modes.filter(i => i.code === $state.mode)[0]
  $: supports = {
    color: (mode?.features & 1) !== 0,
    random: (mode?.features & 4) !== 0,
    speed: (mode?.features & 16) !== 0
  }
  $: modeOptions = $modes.map<SelectOption>(m => ({
    value: m.code.toString(),
    title: m.name,
    disabled: m.code === 18
  }))
</script>

<div class="form-group">
  {#if title.length > 0}
    <div class="form-heading">
      <h4>
        {title}
      </h4>
      <div>
        {#if help}
        <Help message={help} />
        {/if}
      </div>
    </div>
  {/if}
  <div class="form-rows">
    <div class="form-row centered">
      <span>Enable</span>
      <Switch on:click={handleEnabled} checked={$state.enabled} />
    </div>
    <div class="form-row centered">
      <span>Mode</span>
      <Select
        on:change={handleMode}
        disabled={!$state.enabled}
        options={modeOptions}
        value={$state.mode.toString()} />
    </div>
    <div class="form-row column">
      <div class="form-row-inner">
        <span>Color</span>
        <ColorSelector
          {colors}
          disabled={!$state.enabled || !supports.color}
          random={supports.random}
          selected={$state.color}
          canChange={canChangeColor}
          on:change={handleColor} />
      </div>
      {#if canChangeColor}
      <div class="form-row-actions">
        <Button
          disabled={!$state.enabled || !supports.color || $state.color === 7}
          on:click={handleColorChange}
          label='Edit' />
      </div>
      {/if}
    </div>
    <div class="form-row">
      <span>Brightness</span>
      <Range
        type="brightness"
        min={1}
        disabled={!$state.enabled}
        value={$state.brightness}
        on:change={handleBrightness} />
    </div>
    <div class="form-row">
      <span>Speed</span>
      <Range
        type="speed"
        disabled={!$state.enabled || !supports.speed}
        value={$state.speed}
        on:change={handleSpeed} />
    </div>
  </div>
</div>

<style lang="scss">
  .form-row-actions {
    margin-top: 10px;
  }
</style>
