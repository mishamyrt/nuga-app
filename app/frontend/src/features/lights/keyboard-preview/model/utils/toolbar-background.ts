export async function getToolbarBackground (): Promise<string> {
  const toolbarNode = document.querySelector('.toolbar')
  if (!toolbarNode) {
    throw Error('Toolbar node is not found')
  }
  const styles = getComputedStyle(toolbarNode)
  return styles.getPropertyValue('--color-background-toolbar')
}
