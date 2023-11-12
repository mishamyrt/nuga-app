import { createEffect, type Effect } from 'effector'

type EffectHandlerFn<Params, Done> = (params: Params) => Promise<Done>

type EffectCreatorFn<Params = any, Done = any, Fail = Error> =
  (effectName: string, handler: EffectHandlerFn<Params, Done>) => Effect<Params, Done, Fail>

interface SequenceHooks {
  stop: () => void
  start: () => void
}

interface SequenceParams {
  minInterval?: number
  started?: boolean
}

type SequenceReturn = [EffectCreatorFn, SequenceHooks]

export function createSequence ({
  minInterval = 0,
  started = true
}: SequenceParams): SequenceReturn {
  let currentTask: Promise<any> = Promise.resolve()
  let lastTaskTime: number = 0
  let isActive = started
  const taskQueue: Array<() => Promise<any>> = []

  function processQueue () {
    if (taskQueue.length === 0 || !isActive) return

    const task = taskQueue.shift()
    if (task) {
      const currentTime = Date.now()
      const timeSinceLastTask = currentTime - lastTaskTime
      const delay = Math.max(0, minInterval - timeSinceLastTask)

      currentTask = new Promise((resolve) => {
        setTimeout(() => {
          task().then((result) => {
            lastTaskTime = Date.now()
            resolve(result)
            processQueue()
          })
        }, delay)
      })
    }
  }

  function createSequentialEffect<Params, Done> (
    effectName: string,
    handler: EffectHandlerFn<Params, Done>
  ) {
    const handlerWrapper = async (params: Params): Promise<Done> => {
      await currentTask
      return await new Promise<Done>((resolve) => {
        taskQueue.push(() => handler(params).then(resolve))
        processQueue()
      })
    }
    return createEffect(effectName, {
      handler: handlerWrapper
    })
  }

  function start () {
    isActive = true
  }

  function stop () {
    isActive = false
  }

  return [
    createSequentialEffect,
    { start, stop }
  ]
}
