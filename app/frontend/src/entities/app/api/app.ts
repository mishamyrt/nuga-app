import { Restart } from '$wailsjs/go/usecase/EnvironmentUsecase'

export async function restartApp () {
  await Restart()
}
