<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let checked: boolean

  const dispatch = createEventDispatcher()

  function handleClick (): void {
    checked = !checked
    dispatch('click', checked)
  }
</script>

<label class:checked={checked}>
  <input type="checkbox" {checked} on:click={handleClick} />
</label>

<style lang="scss">
  label {
    --switch-width: 26px;
    --switch-height: 15px;
    --switch-offset: 11px;
    --switch-start-position: 1px;

    position: relative;

    &::before,
    &::after {
      content: '';
      background-color: #414141;
      position: absolute;
      top: 0;
      left: 0;
      width: var(--switch-width);
      height: var(--switch-height);
      display: block;
      border-radius: 99px;
      border: 0.5px solid rgb(255 255 255 / 17%);
    }

    &::after {
      top: 1px;
      left: var(--switch-start-position);
      background-color: #D9D9D9;
      width: calc(var(--switch-width) / 2);
      height: calc(var(--switch-width) / 2);
      box-shadow: 0 0 0 0 #000;
    }
  }

  input {
    width: var(--switch-width);
    height: 1px;
    appearance: none;
  }

  :global(.theme-light) {
    label {
      &::after {
        background-color: white;
      }

      &::before {
        background-color: #cfcfcf;
      }
    }
  }

  label.checked {
    &::before {
      background-color: var(--color-accent);
    }

    &::after {
      transform: translateX(var(--switch-offset));
    }
  }

  :global(.linux) label {
    --switch-width: 38px;
    --switch-height: 22px;
    --switch-offset: 15px;
    --switch-start-position: 2px;
  }
</style>
