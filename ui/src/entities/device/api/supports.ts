import { GetSupports } from '$wails/go/usecase/DeviceUsecase'

import type { Supports } from '../model/types'

export async function getSupports (): Promise<Supports> {
  const supports = await GetSupports()
  return supports
}
