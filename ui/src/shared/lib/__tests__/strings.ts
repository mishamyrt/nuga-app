import { describe, expect, it } from 'vitest'

import { capitalize } from '../strings'

describe('capitalize', () => {
  it('should capitalize the first letter of a word', () => {
    expect(capitalize('hello')).toEqual('Hello')
  })

  it('should capitalize the first letter of each word', () => {
    expect(capitalize('hello World, this is a test')).toEqual('Hello World, This Is A Test')
  })

  it('should handle empty input', () => {
    expect(capitalize('')).toEqual('')
  })
})
