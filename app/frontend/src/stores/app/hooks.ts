import { onMount, onDestroy } from 'svelte'
import { appearance } from './atoms'
import { setBackground } from './actions'

export function useBackgroundColor (ref: HTMLElement, property: string): void {
  let unsubscribeAppearance: () => void
  onMount(() => {
    unsubscribeAppearance = appearance.subscribe(() => {
      setTimeout(() => {
        const styles = getComputedStyle(ref)
        const color = styles.getPropertyValue(property)
        setBackground(color)
      }, 20)
    })
  })
  onDestroy(() => {
    unsubscribeAppearance()
  })
}
