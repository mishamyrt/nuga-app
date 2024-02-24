import { GetKeys } from '$wailsjs/go/usecase/KeysUsecase'

import type { KeyMap } from '../model'

export async function getKeys (): Promise<KeyMap> {
  return await GetKeys()
}
