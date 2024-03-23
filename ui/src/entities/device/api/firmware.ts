import { GetFirmware } from '$wailsjs/go/usecase/DeviceUsecase'

export async function getFirmware (): Promise<string> {
  const version = await GetFirmware()
  if (!version) {
    throw new Error('Version is not defined')
  }
  return version
}
