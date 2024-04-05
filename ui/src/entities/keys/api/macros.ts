import { GetMacros, SetMacros } from '$wails/go/usecase/KeysUsecase'

import type { Macro } from '../model/types'

export async function getMacros (): Promise<Macro[]> {
  const macros = await GetMacros()
  return macros
}

export async function setMacros (macros: Macro[]): Promise<void> {
  await SetMacros(macros)
}
