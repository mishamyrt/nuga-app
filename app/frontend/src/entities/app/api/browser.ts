export function getBackgroundColor (): string {
  const node = document.querySelector('.plain-layout')
  if (!node) {
    throw Error('Node is not found')
  }
  const styles = getComputedStyle(node)
  return styles.getPropertyValue('--color-background-secondary')
}
