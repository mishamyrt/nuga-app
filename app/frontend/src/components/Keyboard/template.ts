import type { Key, KeyDescription, KeyboardLayout, KeyboardTemplate } from './types'

function fillKey (k: KeyDescription): Key {
  return {
    size: k.size ? k.size * 4 : 4,
    color: k.color ?? 'light',
    code: k.code ?? 'spacer'
  }
}

function getColumns (k: Key[][]): number {
  let previousColumns = 0
  let columns = 0
  for (const row of k) {
    columns = 0
    for (const key of row) {
      columns += key.size
    }
    if (previousColumns === 0) {
      previousColumns = columns
      continue
    }
    if (columns !== previousColumns) {
      throw new Error(
        `Columns count mismatch: expected ${previousColumns}, got ${columns} `
      )
    }
  }
  return columns
}

export function buildTemplate (description: KeyboardLayout): KeyboardTemplate {
  const keys = description.map(row => row.map(fillKey))
  return {
    columns: getColumns(keys),
    keys
  }
}
