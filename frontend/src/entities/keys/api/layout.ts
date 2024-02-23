import { GetKeyGroups } from '$wailsjs/go/usecase/KeysUsecase'

import type { KeyGroup } from '../model/types'

export async function getGroups (): Promise<KeyGroup[]> {
  return GetKeyGroups()
}
