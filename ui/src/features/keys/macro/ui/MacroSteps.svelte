<script lang="ts">
  import { Typography } from '@naco-ui/svelte'
  import type { Subscription } from 'effector'
  import { onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import { StepDelayInput } from '$entities/keys/ui'
  import StepKeystrokeInput from '$entities/keys/ui/StepKeystrokeInput.svelte'

  import { checkMacroStepsOrder, observeStepsOn } from '../lib'
  import {
    currentMacroStepsStore,
    macroStepDelayAdded,
    macroStepDelayChanged,
    macroStepKeystrokeAdded,
    macroStepKeystrokeChanged,
    macroStepRemoved,
    macroStepsChanged
  } from '../model'
  import { type CustomDragEvent, MacroStepType } from '../model/types'

  let stepsContainer: HTMLDivElement
  let subscriptions: Subscription[]

  const flipDurationMs = 300
  function handleDndConsider (e: CustomDragEvent) {
    if (checkMacroStepsOrder(e.detail.items)) {
      macroStepsChanged(e.detail.items)
    }
  }
  function handleDndFinalize (e: CustomDragEvent) {
    if (checkMacroStepsOrder(e.detail.items)) {
      macroStepsChanged(e.detail.items)
    }
  }

  $: macroSteps = $currentMacroStepsStore
  $: dndZoneParams = {
    items: macroSteps,
    flipDurationMs,
    dropTargetStyle: {
      outline: 'none'
    }
  }

  onMount(() => {
    subscriptions = observeStepsOn(stepsContainer,
      {
        event: macroStepKeystrokeAdded,
        offset: 1,
        actionSelector: '.step-keystroke',
        fn: (node: HTMLButtonElement) => node.click()
      },
      {
        event: macroStepDelayAdded,
        actionSelector: 'input',
        fn: (node: HTMLInputElement) => node.focus()
      }
    )

    return () => subscriptions.forEach((s) => s.unsubscribe())
  })
</script>

<div class="container">
  <div
    class="steps"
    bind:this={stepsContainer}
    use:dndzone="{dndZoneParams}"
    on:consider="{handleDndConsider}"
    on:finalize="{handleDndFinalize}"
  >
    {#if macroSteps.length === 0}
      <div class="empty">
        <Typography variant="caption-m" color="tertiary">
          Add actions by pressing buttons on the bottom to build your macro.
        </Typography>
      </div>
    {/if}
    {#each macroSteps as step(step.id)}
      <div animate:flip="{{ duration: flipDurationMs }}" class="step">
        <div class="step-value">
          <div class="title">
            {step.type}
          </div>
          {#if step.type === MacroStepType.KeyDown || step.type === MacroStepType.KeyUp}
            <StepKeystrokeInput
              on:input={(e) => macroStepKeystrokeChanged({
                id: step.id,
                keyName: e.detail
              })}
              keyName={step.keyName} />
          {:else if step.type === MacroStepType.Wait}
            <StepDelayInput
              on:input={(e) => macroStepDelayChanged({
                id: step.id,
                delay: e.detail
              })}
              value={step.delay} />
          {/if}
        </div>
        <button on:click={() => macroStepRemoved(step.id)} class="delete">×</button>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    height: 386px;
    padding: 0 var(--space-m);
    background-color: var(--color-background-overlay);
    border: 1px solid var(--color-border-main);
    border-radius: var(--border-radius-m);
  }

  .delete {
    background-color: transparent;
    border: none;
    border-radius: var(--border-radius-s);
    appearance: none;
    margin: 0;
    padding: 0;
    font: var(--typography-heading-m);
    display: flex;
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
    color: var(--color-content-secondary);
    font-weight: 400;
    opacity: 0;
  }

  .steps {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    overflow: hidden scroll;
    margin-right: calc(var(--scroll-bar-track-width) * -1);
    padding: var(--space-m) 0;
  }

  .step-value {
    display: flex;
    align-items: center;
  }

  .step {
    cursor: default !important;
    font: var(--typography-heading-s);
    color: var(--color-content-primary);
    display: flex;
    justify-content: space-between;
    background-color: var(--color-background-secondary);
    padding: var(--space-s) var(--space-m);
    border-radius: var(--border-radius-l);
    border: 1px solid var(--color-border-dimmed);
    align-items: center;
    user-select: none;

    &:hover .delete {
      opacity: 0.7;
    }
  }

  .empty {
    display: flex;
    justify-content: center;
    margin-top: var(--space-m);
  }
</style>
