<script lang="ts">
  import type { Color, LightMode, LightState } from "@stores/lights"
  import Switch from "./Switch.svelte";
  import type { MapStore, ReadableAtom } from "nanostores"
  import ColorSelector from "./ColorSelector.svelte";
  import Range from "./Range.svelte";
  import { Select, type SelectOption } from "./Select";

  export let title: string = ''
  export let state: MapStore<LightState>
  export let modes: ReadableAtom<LightMode[]>
  export let write: () => Promise<void>
  export let colors: readonly Color[] = undefined
  export let canChangeColor = false

  function handleEnabled (event: CustomEvent<boolean>) {
    state.setKey('enabled', event.detail)
    write()
  }

  function handleMode (event: CustomEvent<string>) {
    state.setKey('mode', parseInt(event.detail, 10))
    write()
  }

  function handleColor (event: CustomEvent<number>) {
    state.setKey('color', event.detail)
    write()
  }

  function handleBrightness (event: CustomEvent<number>) {
    state.setKey('brightness', event.detail)
    write()
  }

  function handleSpeed (event: CustomEvent<number>) {
    state.setKey('speed', event.detail)
    write()
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
  }))
</script>

<div class="form-group">
  {#if title.length > 0}
    <h4>
      {title}
    </h4>
  {/if}
  <div class="form-rows">
    <div class="form-row">
      <span>Enable</span>
      <Switch on:click={handleEnabled} checked={$state.enabled} />
    </div>
    <div class="form-row">
      <span>Mode</span>
      <Select
        on:change={handleMode}
        disabled={!$state.enabled}
        options={modeOptions}
        value={$state.mode.toString()} />
    </div>
    <div class="form-row" class:hidden={!$state.enabled} class:disabled={!supports.color}>
      <span>Color</span>
      <ColorSelector
        {colors}
        random={supports.random}
        selected={$state.color}
        canChange={canChangeColor}
        on:change={handleColor} />
    </div>
    <div class="form-row" class:hidden={!$state.enabled}>
      <span>Brightness</span>
      <Range
        type="brightness"
        disabled={!$state.enabled}
        value={$state.brightness}
        on:change={handleBrightness} />
    </div>
    <div class="form-row" class:hidden={!$state.enabled}>
      <span>Speed</span>
      <Range
        type="speed"
        disabled={!$state.enabled || !supports.speed}
        value={$state.speed}
        on:change={handleSpeed} />
    </div>
  </div>
</div>
