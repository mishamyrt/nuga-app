import { describe, expect, it } from 'vitest'

import { removeStep, updateDelay, updateKeystroke } from '../edit'
import { mockKeyDown, mockKeyUp, mockPatchStep, mockWait } from './__utils__'

describe('updateDelay', () => {
  it('should update delay of correct step', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('a'),
      mockWait(200)
    ]
    const result = updateDelay(steps, steps[1].id, 200)
    expect(result).toEqual([
      steps[0],
      mockPatchStep(steps[1], 200),
      steps[2],
      steps[3]
    ])
  })

  it('should throw error if step not found', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('a')
    ]
    expect(() => updateDelay(steps, 'unknown', 200)).toThrow()
  })
})

describe('updateKeystroke', () => {
  it('should update keystroke of corresponding key up if key down is updated', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('a'),
      mockWait(200)
    ]
    const result = updateKeystroke(steps, steps[0].id, 'b')
    expect(result).toEqual([
      mockPatchStep(steps[0], 'b'),
      steps[1],
      mockPatchStep(steps[2], 'b'),
      steps[3]
    ])
  })

  it('should update keystroke of corresponding key down if key up is updated', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('a'),
      mockWait(200)
    ]
    const result = updateKeystroke(steps, steps[2].id, 'b')
    expect(result).toEqual([
      mockPatchStep(steps[0], 'b'),
      steps[1],
      mockPatchStep(steps[2], 'b'),
      steps[3]
    ])
  })

  it('should update keystroke of correct key up pair even in hard cases', () => {
    const steps = [
      mockKeyDown('a'),
      mockKeyDown('b'),
      mockKeyUp('b'),
      mockKeyDown('c'),
      mockKeyUp('c'),
      mockKeyUp('a')
    ]
    const result = updateKeystroke(steps, steps[5].id, 'x')
    expect(result).toEqual([
      mockPatchStep(steps[0], 'x'),
      steps[1],
      steps[2],
      steps[3],
      steps[4],
      mockPatchStep(steps[5], 'x')
    ])
  })

  it('should update keystroke of correct key down pair even in hard cases', () => {
    const steps = [
      mockKeyDown('a'),
      mockKeyDown('b'),
      mockKeyUp('b'),
      mockKeyDown('c'),
      mockKeyUp('c'),
      mockKeyUp('a')
    ]
    const result = updateKeystroke(steps, steps[0].id, 'x')
    expect(result).toEqual([
      mockPatchStep(steps[0], 'x'),
      steps[1],
      steps[2],
      steps[3],
      steps[4],
      mockPatchStep(steps[5], 'x')
    ])
  })

  it('should throw error if step not found', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('a')
    ]
    expect(() => updateKeystroke(steps, 'unknown', 'b')).toThrow()
  })

  it('should throw error if pair not found', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('b')
    ]
    expect(() => updateKeystroke(steps, steps[0].id, 'x')).toThrow()
  })
})

describe('removeStep', () => {
  it('should remove correct step', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('a'),
      mockWait(200)
    ]
    const result = removeStep(steps, steps[1].id)
    expect(result).toEqual([steps[0], steps[2], steps[3]])
  })

  it('should throw error if step not found', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('a')
    ]
    expect(() => removeStep(steps, 'unknown')).toThrow()
  })

  it('should throw error if pair not found', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockKeyUp('b')
    ]
    expect(() => removeStep(steps, steps[0].id)).toThrow()
  })

  it('should throw error if step is the only step', () => {
    const steps = [
      mockKeyDown('a')
    ]
    expect(() => removeStep(steps, steps[0].id)).toThrow()
  })

  it('should correctly find and remove pair for key up', () => {
    const steps = [
      mockKeyDown('a'),
      mockKeyDown('b'),
      mockKeyUp('b'),
      mockKeyUp('a')
    ]
    const result = removeStep(steps, steps[3].id)
    expect(result).toEqual([
      steps[1],
      steps[2]
    ])
  })

  it('should correctly find and remove pair for key down', () => {
    const steps = [
      mockKeyDown('a'),
      mockKeyDown('b'),
      mockKeyUp('b'),
      mockKeyUp('a')
    ]
    const result = removeStep(steps, steps[0].id)
    expect(result).toEqual([
      steps[1],
      steps[2]
    ])
  })

  it('should correctly skip waits after first key', () => {
    const steps = [
      mockKeyDown('a'),
      mockWait(100),
      mockWait(200),
      mockKeyDown('b'),
      mockKeyUp('b'),
      mockKeyUp('a')
    ]
    const result = removeStep(steps, steps[5].id)
    expect(result).toEqual([
      steps[3],
      steps[4]
    ])
  })

  const sameNameSteps = [
    mockKeyDown('a'),
    mockKeyUp('a'),
    mockKeyDown('a'),
    mockKeyUp('a'),
    mockKeyDown('a'),
    mockKeyUp('a')
  ]

  it('should correctly remove first steps with same keyName', () => {
    const result = removeStep(sameNameSteps, sameNameSteps[0].id)
    expect(result).toEqual([
      sameNameSteps[2],
      sameNameSteps[3],
      sameNameSteps[4],
      sameNameSteps[5]
    ])
  })

  it('should correctly remove second steps with same keyName', () => {
    const result = removeStep(sameNameSteps, sameNameSteps[3].id)
    expect(result).toEqual([
      sameNameSteps[0],
      sameNameSteps[1],
      sameNameSteps[4],
      sameNameSteps[5]
    ])
  })

  it('should correctly remove third steps with same keyName', () => {
    const result = removeStep(sameNameSteps, sameNameSteps[5].id)
    expect(result).toEqual([
      sameNameSteps[0],
      sameNameSteps[1],
      sameNameSteps[2],
      sameNameSteps[3]
    ])
  })
})
