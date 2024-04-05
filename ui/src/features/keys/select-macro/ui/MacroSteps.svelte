<script lang="ts">
  import type { Subscription } from 'effector'
  import { onDestroy, onMount } from 'svelte'
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import { StepDelayInput } from '$entities/keys/ui'
  import StepKeystrokeInput from '$entities/keys/ui/StepKeystrokeInput.svelte'

  import { checkMacroStepsOrder, observeStepsOn } from '../lib'
  import { currentMacroStepsStore, macroStepDelayAdded, macroStepDelayChanged, macroStepKeystrokeAdded, macroStepKeystrokeChanged, macroStepsChanged } from '../model'
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
    macroStepsChanged(e.detail.items)
  }

  $: macroSteps = $currentMacroStepsStore

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
  })

  onDestroy(() => {
    subscriptions.forEach((s) => s.unsubscribe())
  })
</script>

<div class="container">
  <div
    class="steps"
    bind:this={stepsContainer}
    use:dndzone="{{ items: macroSteps, flipDurationMs }}"
    on:consider="{handleDndConsider}"
    on:finalize="{handleDndFinalize}"
  >
    {#each macroSteps as step(step.id)}
      <div animate:flip="{{ duration: flipDurationMs }}" class="step">
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

  .steps {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
    overflow: hidden scroll;
    margin-right: calc(var(--scroll-bar-track-width) * -1);
    padding: var(--space-m) 0;
  }

  .step {
    cursor: default !important;
    font: var(--typography-heading-s);
    color: var(--color-content-primary);
    display: flex;
    background-color: var(--color-background-secondary);
    padding: var(--space-s) var(--space-m);
    border-radius: var(--border-radius-l);
    border: 1px solid var(--color-border-dimmed);
    align-items: center;
    user-select: none;
  }
</style>
