export function capitalize (s: string): string {
  const clean = s.trim()
  if (clean.length === 0) {
    return ''
  }
  const words = clean.split(' ')
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substring(1)
  }
  return words.join(' ')
}
