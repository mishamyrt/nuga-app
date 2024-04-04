<script lang="ts">
  import { macroStepsStore } from '$entities/keys'
  import { MacroStepType } from '$entities/keys/model/types'

  export let index: number

  $: isNew = index === -1
  $: macroSteps = isNew ? [] : $macroStepsStore[index]
</script>

<div class="container">
  <div class="steps">
    {#each macroSteps as step}
      <div class="step">
        <div class="title">
          {step.type}
        </div>
        <div class="value">
          {#if step.type === MacroStepType.KeyDown || step.type === MacroStepType.KeyUp}
            {step.keyName}
          {:else if step.type === MacroStepType.Wait}
            {step.delay} ms
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    height: 400px;
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
    overflow-y: scroll;
    overflow-x: hidden;
    margin-right: calc(var(--scroll-bar-track-width) * -1);
    padding: var(--space-m) 0;
  }

  .step {
    font: var(--typography-heading-s);
    color: var(--color-content-primary);
    display: flex;
    background-color: var(--color-background-secondary);
    padding: var(--space-s) var(--space-m);
    border-radius: var(--border-radius-l);
    border: 1px solid var(--color-border-dimmed);
    align-items: center;
  }

  .value {
    position: relative;
    margin-left: var(--space-s);
    padding: var(--space-xs);
    color: var(--color-content-accent);

    &::before {
      content: ' ';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--color-content-accent);
      opacity: 0.1;
      border-radius: var(--border-radius-s);
    }
  }
</style>
