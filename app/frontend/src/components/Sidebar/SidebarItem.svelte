<script lang="ts">
import { view, type SettingsView } from '../../stores/app'
import LightBulb from './Icons/LightBulb.svelte'
import Keyboard from './Icons/Keyboard.svelte'
import GearShape from './Icons/GearShape.svelte'

export let title: string
export let target: SettingsView
export let disabled = false

function handleClick (): void {
  view.set(target)
}
</script>

<button {disabled} on:click={handleClick} class:selected={$view === target}>
  <div class="icon">
    {#if target === 'lights'}
      <LightBulb />
    {:else if target === 'device'}
      <GearShape />
    {:else if target === 'keys'}
      <Keyboard />
    {/if}
  </div>
  {title}
</button>

<style lang="scss">
  button {
    width: 100%;
    appearance: none;
    border: none;
    border-radius: 5px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 8px 8px 5px;
    font-size: 15px;
    font-weight: 400;
    color: white;
    background: transparent;

    .icon {
      position: relative;
      top: -1px;
      margin-right: 3px;
      width: 20px;
      height: 20px;

      --sidebar-icon-color: #009AFF;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    &.selected {
      background: rgb(255 255 255 / 14%);
    }
  }

  :global(.blurred) button.selected {
    background-color: rgb(255 255 255 / 30%);
  }
</style>
