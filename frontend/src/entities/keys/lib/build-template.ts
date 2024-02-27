import type { Key, KeyboardLayout, KeyboardTemplate, KeyDescription } from '../model/types'

function toKey (k: KeyDescription): Key {
  return {
    width: k.width ? k.width * 4 : 4,
    height: k.height ?? 1,
    color: k.color ?? 'light',
    code: k.code ?? 'spacer',
    secondaryCode: k.secondaryCode
  }
}

function countColumns (keyMatrix: Key[][], validate: boolean): number {
  let previousColumns = 0
  let columns = 0
  for (const row of keyMatrix) {
    columns = row.reduce((sum, { width }) => sum + width, 0)
    if (!validate) {
      return columns
    }
    if (previousColumns === 0) {
      previousColumns = columns
    }
    if (columns !== previousColumns) {
      throw new Error(
        `Columns count mismatch: expected ${previousColumns}, got ${columns} `
      )
    }
  }
  return previousColumns
}

export function buildTemplate (layout: KeyboardLayout, validate = false): KeyboardTemplate {
  const keys = layout.map(row => row.map(toKey))
  return {
    columns: countColumns(keys, validate),
    keys
  }
}
