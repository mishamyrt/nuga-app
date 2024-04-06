import { type MacroStep, MacroStepType } from '../model'

/**
 * Takes MacroStep objects and combines consecutive Wait steps
 * into a single Wait step with the cumulative delay.
 * @param steps - an array of MacroStep objects
 * @returns normalized steps
 */
export function normalizeDelaySteps (steps: MacroStep[]): MacroStep[] {
  let sumDelay = 0
  let lastDelayId = ''
  const result: MacroStep[] = []
  for (const step of steps) {
    if (step.type === MacroStepType.Wait) {
      sumDelay += step.delay
      lastDelayId = step.id
    } else {
      if (sumDelay > 0) {
        result.push({
          id: lastDelayId,
          type: MacroStepType.Wait,
          delay: sumDelay
        })
        sumDelay = 0
      }
      result.push(step)
    }
  }
  if (sumDelay > 0) {
    result.push({
      id: lastDelayId,
      type: MacroStepType.Wait,
      delay: sumDelay
    })
  }
  return result
}
