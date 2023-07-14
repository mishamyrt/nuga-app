import { onDestroy, onMount } from 'svelte'

interface HotKey {
  code: string
  shift?: boolean
  alt?: boolean
}

export function onHotkey (description: HotKey, callback: () => void): void {
  function handleKeys (e: KeyboardEvent): void {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if ((description.shift && !e.shiftKey) || (description.alt && !e.altKey)) {
      return
    }
    if (e.code === description.code) {
      e.preventDefault()
      callback()
    }
  }
  const eventType = 'keydown'
  onMount(() => window.addEventListener(eventType, handleKeys))
  onDestroy(() => window.removeEventListener(eventType, handleKeys))
}
