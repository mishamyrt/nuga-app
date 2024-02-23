import { GetKeyNames } from '$wailsjs/go/usecase/KeysUsecase'

export async function getKeyNames (): Promise<string[]> {
  return await GetKeyNames()
}
