import { disconnect } from '@stores/device/actions'
import { Disconnect } from '@wailsjs/go/nuga/App'

import { sleep } from '../../utils/timing'
import { domains } from '.'
import { loadState } from './actions'

type AsyncTask = () => Promise<void>

export class UpdateSynchronizer {
  private readonly tasks: AsyncTask[] = []
  private active = false

  constructor (
    private readonly interval: number
  ) {}

  public addTask (t: AsyncTask): void {
    this.tasks.push(t)
  }

  public pause (): void {
    if (!this.active) {
      return
    }
    this.active = false
  }

  public start (): void {
    if (this.active) {
      return
    }
    this.active = true
    this.loop()
      .then(() => {})
  }

  private async sleepTight (): Promise<void> {
    let attempts = this.interval / 10
    while (attempts > 0) {
      if (this.tasks.length > 0) {
        return
      }
      await sleep(10)
      attempts--
    }
  }

  private async loop (): Promise<void> {
    while (this.active) {
      if (this.tasks.length > 0) {
        const task = this.tasks.shift()
        if (task) {
          await task()
        }
        continue
      }
      try {
        await loadState()
      } catch (e: any) {
        const message = e as string
        if (message.includes('disconnected')) {
          await Disconnect()
          disconnect()
          domains.backlight.set([])
          domains.halo.set([])
          domains.sidelight.set([])
          this.active = false
        } else {
          // TODO: Show error to UI
          console.error('Backend error', e)
        }
        return
      }

      await this.sleepTight()
    }
  }
}
