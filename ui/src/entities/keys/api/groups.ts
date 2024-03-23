import { GetKeyGroups } from '$wails/go/usecase/KeysUsecase'

import type { KeyGroup } from '../model'

export async function getGroups (): Promise<KeyGroup[]> {
  return await GetKeyGroups()
}
