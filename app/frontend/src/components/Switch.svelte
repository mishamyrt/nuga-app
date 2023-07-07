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
  input {
    width: 26px;
    height: 1px;
    appearance: none;
  }

  label {
    position: relative;

    &::before,
    &::after {
      content: '';
      background-color: #414141;
      position: absolute;
      top: 0;
      left: 0;
      width: 26px;
      height: 15px;
      display: block;
      border-radius: 30px;
      border: 0.5px solid rgb(255 255 255 / 17%);
    }

    &::after {
      top: 1px;
      left: 1px;
      background-color: #D9D9D9;
      width: 13px;
      height: 13px;
      box-shadow: 0 0 0 0 #000;
    }
  }

  label.checked {
    &::before {
      background-color: #3869DE;
    }

    &::after {
      transform: translateX(11px);
    }
  }
</style>
