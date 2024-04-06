import { sample } from 'effector'

import { macroChanged } from '$entities/keys'

import { normalizeDelaySteps, stepsToActions } from '../../lib'
import type { MacroStep } from '../types'
import { editedIndexStore, editedMacroSubmitted } from './lifecycle'
import { macroRepeatsStore, macroTitleStore } from './meta'
import { stepsStore } from './steps'

sample({
  clock: editedMacroSubmitted,
  source: [macroTitleStore, macroRepeatsStore, stepsStore, editedIndexStore],
  fn: (source) => {
    const [title, repeats, steps, index] = source as [string, number, MacroStep[], number]
    return {
      title,
      repeats,
      actions: stepsToActions(
        normalizeDelaySteps(steps)
      ),
      index
    }
  },
  target: macroChanged
})
