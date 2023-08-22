import { appearance } from './atoms'
import { setBackground } from './actions'

export function useBackgroundColor (ref: HTMLElement, property: string): () => void {
  return appearance.subscribe(() => {
    setTimeout(() => {
      const styles = getComputedStyle(ref)
      const color = styles.getPropertyValue(property)
      setBackground(color)
    }, 20)
  })
}
