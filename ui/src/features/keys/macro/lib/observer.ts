import type { Event, Observer, Subscription } from 'effector'
import { tick } from 'svelte'

type StepObserverParams = {
  actionSelector: string
  offset?: number
  fn: (actionNode: any) => void
}

type ObserveStepsOnParams = {
  event: Event<void>
} & StepObserverParams

export function createStepObserver<T extends Element> (
  parent: Element,
  params: StepObserverParams,
): Observer<void> {
  const { actionSelector, offset = 0, fn } = params
  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    next: async () => {
      await tick()
      const stepNodes = parent.querySelectorAll('.step')
      parent.scrollTo({ top: 999999 })
      const lastKeyDown = stepNodes[stepNodes.length - (1 + offset)]
      const actionNode = lastKeyDown.querySelector<T>(actionSelector)
      if (!actionNode) {
        throw new Error('Unexpected layout')
      }
      fn(actionNode)
    },
  }
}

export function observeStepsOn (
  parent: Element,
  ...params: ObserveStepsOnParams[]
): Subscription[] {
  const subscriptions = []
  for (const { event, actionSelector, offset, fn } of params) {
    subscriptions.push(
      event.subscribe(
        createStepObserver(parent, {
          actionSelector,
          offset,
          fn,
        }),
      ),
    )
  }
  return subscriptions
}
