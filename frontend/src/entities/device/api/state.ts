import { RestoreDefaultState, RestoreState, SaveState } from '$wailsjs/go/usecase/DeviceUsecase'

export async function saveState (): Promise<void> {
  return await SaveState()
}

export async function restoreState (): Promise<void> {
  return await RestoreState()
}

export async function restoreDefaultState (): Promise<void> {
  return await RestoreDefaultState()
}
