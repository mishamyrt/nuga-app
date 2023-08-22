import type { Key, KeyboardLayout, KeyboardTemplate, KeyDescription } from './types'

function fillKey (k: KeyDescription): Key {
  return {
    width: k.width ? k.width * 4 : 4,
    height: k.height ?? 1,
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
      columns += key.width
    }
    if (previousColumns === 0) {
      previousColumns = columns
      continue
    }
    // if (columns !== previousColumns) {
    //   continue
    //   // throw new Error(
    //   //   `Columns count mismatch: expected ${previousColumns}, got ${columns} `
    //   // )
    // }
  }
  return previousColumns
}

export function buildTemplate (description: KeyboardLayout): KeyboardTemplate {
  const keys = description.map(row => row.map(fillKey))
  return {
    columns: getColumns(keys),
    keys
  }
}
