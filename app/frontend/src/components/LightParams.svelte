<script lang="ts">
import { type Color, type LightMode, type LightState, lightState, setLight } from '@stores/lights'
import { editableColor, lightModes } from '@stores/lights/atoms'
import type { LightDomain } from '@stores/lights/types'
import { listenKeys } from 'nanostores'
import { onDestroy, onMount } from 'svelte'

import Button from './Button.svelte'
import ColorSelector from './ColorSelector.svelte'
import Help from './Help.svelte'
import Range from './Range.svelte'
import { Select, type SelectOption } from './Select'
import Switch from './Switch.svelte'

export let title: string
export let domain: LightDomain
export let colors: readonly Color[] | undefined = undefined
export let canChangeColor = false
export let help: string = ''

let state: LightState = lightState.get()[domain]
let modes: LightMode[] = []
const subscriptions: Array<() => void> = []

function apply (): void {
  setLight(domain, { ...state })
}

function handleEnabled (event: CustomEvent<boolean>): void {
  state.enabled = event.detail
  apply()
}

function handleMode (event: CustomEvent<string>): void {
  state.mode = parseInt(event.detail, 10)
  apply()
}

function handleColor (event: CustomEvent<number>): void {
  state.color = event.detail
  apply()
}

function handleBrightness (event: CustomEvent<number>): void {
  state.brightness = event.detail
  apply()
}

function handleSpeed (event: CustomEvent<number>): void {
  state.speed = event.detail
  apply()
}

function handleColorEdit (): void {
  editableColor.set(state.color)
}

$: activeMode = modes.find(m => m.code === state.mode)
$: modeOptions = modes.map<SelectOption>(m => ({
  value: m.code.toString(),
  title: m.name,
  disabled: m.code === 18 // Disable custom mode
}))

onMount(() => {
  state = lightState.get()[domain]
  modes = lightModes.get()[domain]

  subscriptions.push(
    listenKeys(lightState, [domain], s => { state = s[domain] }),
    listenKeys(lightModes, [domain], s => { modes = s[domain] })
  )
})

onDestroy(() => {
  subscriptions.forEach(unsubscribe => unsubscribe())
})
</script>

{#if activeMode !== undefined}
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
      <Switch on:click={handleEnabled} checked={state.enabled} />
    </div>
    <div class="form-row centered">
      <span>Mode</span>
      <Select
        on:change={handleMode}
        disabled={!state.enabled}
        options={modeOptions}
        value={state.mode.toString()} />
    </div>
    <div class="form-row column">
      <div class="form-row-inner">
        <span>Color</span>
        <ColorSelector
          {colors}
          disabled={!state.enabled || !activeMode.supports.specificColor}
          random={activeMode.supports.randomColor}
          selected={state.color}
          canChange={canChangeColor}
          on:change={handleColor} />
      </div>
      {#if canChangeColor}
      <div class="form-row-actions">
        <Button
          disabled={!state.enabled || !activeMode.supports.specificColor || state.color === 7}
          on:click={handleColorEdit}
          label='Edit' />
      </div>
      {/if}
    </div>
    <div class="form-row">
      <span>Brightness</span>
      <Range
        type="brightness"
        min={1}
        disabled={!state.enabled}
        value={state.brightness}
        on:change={handleBrightness} />
    </div>
    <div class="form-row">
      <span>Speed</span>
      <Range
        type="speed"
        disabled={!state.enabled || !activeMode.supports.speed}
        value={state.speed}
        on:change={handleSpeed} />
    </div>
  </div>
</div>
{/if}

<style lang="scss">
  .form-row-actions {
    margin-top: 10px;
  }
</style>
