import { describe, expect, it } from 'vitest'

import type {
  LightDomainMode,
  RawLightDomain,
  RawLightMode,
} from '../../model/types'
import { LightSupportsCode } from '../constants'
import {
  byModeCode,
  featuresToSupports,
  parseRawDomains,
  parseRawMode,
} from '../modes'

describe('featuresToSupports', () => {
  it('returns supported specific color feature', () => {
    const features = LightSupportsCode.SpecificColor
    expect(featuresToSupports(features)).toStrictEqual({
      specificColor: true,
      randomColor: false,
      speed: false,
    })
  })

  it('returns supported random color feature', () => {
    const features = LightSupportsCode.RandomColor
    expect(featuresToSupports(features)).toStrictEqual({
      specificColor: false,
      randomColor: true,
      speed: false,
    })
  })

  it('returns supported speed feature', () => {
    const features = LightSupportsCode.Speed
    expect(featuresToSupports(features)).toStrictEqual({
      specificColor: false,
      randomColor: false,
      speed: true,
    })
  })

  it('returns supported mixed features', () => {
    const features = LightSupportsCode.SpecificColor | LightSupportsCode.RandomColor
    expect(featuresToSupports(features)).toStrictEqual({
      specificColor: true,
      randomColor: true,
      speed: false,
    })
  })

  it('returns no supported features', () => {
    const features = 0
    expect(featuresToSupports(features)).toStrictEqual({
      specificColor: false,
      randomColor: false,
      speed: false,
    })
  })
})

describe('parseRawMode', () => {
  it('converts light mode to domain mode', () => {
    const mode: RawLightMode = {
      name: 'rainbow dash',
      code: 1,
      features: LightSupportsCode.SpecificColor,
    }
    expect(parseRawMode(mode)).toStrictEqual({
      name: 'Rainbow Dash',
      supports: {
        specificColor: true,
        randomColor: false,
        speed: false,
      },
      code: 1,
    })
  })
})

describe('parseRawDomains', () => {
  it('converts light domains array to light modes map', () => {
    const modes: RawLightDomain[] = [
      {
        name: 'backlight',
        modes: [
          {
            name: 'rainbow dash',
            code: 1,
            features: LightSupportsCode.SpecificColor,
          },
        ],
      },
      {
        name: 'sidelight',
        modes: [
          {
            name: 'Aunt and Uncle Orange',
            code: 2,
            features: LightSupportsCode.RandomColor,
          },
        ],
      },
    ]
    expect(parseRawDomains(modes)).toStrictEqual({
      backlight: [
        {
          name: 'Rainbow Dash',
          supports: {
            specificColor: true,
            randomColor: false,
            speed: false,
          },
          code: 1,
        },
      ],
      sidelight: [
        {
          name: 'Aunt And Uncle Orange',
          supports: {
            specificColor: false,
            randomColor: true,
            speed: false,
          },
          code: 2,
        },
      ],
    })
  })
})

describe('byModeCode', () => {
  it('search mode by code', () => {
    const modes: LightDomainMode[] = [
      {
        name: 'rainbow dash',
        supports: {
          specificColor: true,
          randomColor: false,
          speed: false,
        },
        code: 1,
      },
      {
        name: 'Aunt And Uncle Orange',
        supports: {
          specificColor: false,
          randomColor: true,
          speed: false,
        },
        code: 2,
      },
      {
        name: 'Granny Smith',
        supports: {
          specificColor: false,
          randomColor: true,
          speed: false,
        },
        code: 3,
      },
    ]

    expect(modes.find(byModeCode(1))).toStrictEqual(modes[0])
  })

  it('returns undefined if mode not found', () => {
    const modes: LightDomainMode[] = [
      {
        name: 'rainbow dash',
        supports: {
          specificColor: true,
          randomColor: false,
          speed: false,
        },
        code: 1,
      },
    ]

    expect(modes.find(byModeCode(2))).toBeUndefined()
  })
})
