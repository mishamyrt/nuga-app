import { GetDefaultKeys, GetKeys, SetKeys } from '$wails/go/usecase/KeysUsecase'

import type { KeyMap } from '../model'

export async function getKeys (): Promise<KeyMap> {
  return await GetKeys()
}

export async function getDefaultKeys (): Promise<KeyMap> {
  return await GetDefaultKeys()
}

export async function setKeys (map: KeyMap): Promise<void> {
  return await SetKeys(map)
}
