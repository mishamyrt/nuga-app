import { createEffect, sample, type StoreWritable } from 'effector'

type AttachStorageParams<T> = {
  source: StoreWritable<T>
  key: string
}

export function attachStorage<T> ({ source, key }: AttachStorageParams<T>) {
  const readStorageFx = createEffect('readStorageFx', {
    handler: async () => {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value) as T
      }
      return null as T
    }
  })
  const writeStorageFx = createEffect('writeStorageFx', {
    handler: (value: T) => {
      localStorage.setItem(key, JSON.stringify(value))
    }
  })

  sample({
    clock: source,
    target: writeStorageFx
  })
  sample({
    clock: readStorageFx.doneData,
    filter: (value) => value !== null,
    target: source
  })
  readStorageFx()
}
