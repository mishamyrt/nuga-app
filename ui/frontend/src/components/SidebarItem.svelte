<script lang="ts">
import { view, type SettingsView } from '../stores/app'
import lightIcon from '../assets/images/lights.sidebar@2x.png'
import systemIcon from '../assets/images/system.sidebar@2x.png'
import keysIcon from '../assets/images/keys.sidebar@2x.png'

const icons: Record<SettingsView, string> = {
  lights: lightIcon,
  system: systemIcon,
  keys: keysIcon
}

export let title: string
export let target: SettingsView
let currentView: SettingsView

function handleClick() {
  view.set(target)
}

view.subscribe(v => {
  currentView = v
})
</script>

<button on:click={handleClick} class:selected={currentView === target}>
  <img class="icon" src={icons[target]} alt="asd" />
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
    padding: 4px 8px;
    font-size: 13px;
    color: white;
    background: transparent;

    &.selected {
      background: #3665CB;
    }
  }

  .icon {
    width: 20px;
    height: 20px;
  }
</style>
