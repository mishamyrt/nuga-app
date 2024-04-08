import { Restart } from '$wails/go/usecase/EnvironmentUsecase'

export async function restartApp () {
  await Restart()
}
