import { createEvent, createStore, sample } from 'effector'

import { type KeyAction, keyActionChanged } from '$entities/keys'

import { defaultKeystroke, keystrokeFromEvent } from '../lib'

export const recordStarted = createEvent('recordStarted')
export const recordFinished = createEvent('recordFinished')
export const keystrokeChanged = createEvent<KeyAction>('keystrokeChanged')

export const isRecordingStore = createStore(false, { name: 'isRecording' })
export const recordedKeystrokeStore = createStore<KeyAction>(defaultKeystroke, {
  name: 'recordedKeystroke'
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'Escape') {
    e.preventDefault()
    recordFinished()
    return
  }
  const keystroke = keystrokeFromEvent(e)
  if (keystroke.key !== 'none') {
    e.preventDefault()
    recordFinished()
    keyActionChanged(keystroke)
  }
  keystrokeChanged(keystroke)
}

const handleKeyUp = (e: KeyboardEvent) => {
  keystrokeChanged(keystrokeFromEvent(e))
}

recordedKeystrokeStore
  .on(keystrokeChanged, (_, keystroke) => keystroke)
  .on(recordStarted, () => defaultKeystroke)

sample({
  clock: recordStarted,
  fn () {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return true
  },
  target: isRecordingStore
})

sample({
  clock: recordFinished,
  fn () {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
    return false
  },
  target: isRecordingStore
})
