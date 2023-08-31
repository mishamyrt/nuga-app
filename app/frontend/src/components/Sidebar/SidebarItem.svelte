<script lang="ts">
import { type AppView, view } from '@stores/app'

import GearShape from './Icons/GearShape.svelte'
import Keyboard from './Icons/Keyboard.svelte'
import LightBulb from './Icons/LightBulb.svelte'
import TV from './Icons/TV.svelte'

export let title: string
export let target: AppView
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
    {:else if target === 'application'}
      <TV />
    {/if}
  </div>
  <span class="title">
    {title}
  </span>
</button>

<style lang="scss">
  button {
    --sidebar-icon-color: #009AFF;

    width: 100%;
    appearance: none;
    border: none;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 8px 8px 5px;
    margin: 0;
    font-size: 15px;
    font-weight: 400;
    color: var(--color-text);
    background: transparent;

    .icon {
      position: relative;
      top: -1px;
      margin-right: 3px;
      width: 20px;
      height: 20px;
    }

    &:disabled {
      pointer-events: none;

      .title {
        opacity: 0.4;
      }
    }

    &.selected {
      background: rgb(255 255 255 / 14%);
    }
  }

  :global(.blurred) button.selected {
    background-color: rgb(255 255 255 / 30%);
  }

  :global(.mac) button {
    border-radius: 5px;
  }

  :global(.linux) button {
    --sidebar-icon-color: var(--color-text);

    padding: 11px 11px 13px 8px;
    transition: background-color .3s ease-out;

    &:hover {
      transition: background-color 0s;
      background-color: rgb(255 255 255 / 11%);
    }

    &.selected {
      background-color: var(--color-accent);
    }

    &:focus {
      outline: none;
    }

    .icon {
      margin-right: 6px;
      margin-left: 5px;
    }
  }

  :global(.mac.theme-light) button.selected {
    background-color: rgb(0 0 0 / 9%)
  }

  :global(.linux.theme-light) button.selected {
    color: white;

    --sidebar-icon-color: white;
  }
</style>
