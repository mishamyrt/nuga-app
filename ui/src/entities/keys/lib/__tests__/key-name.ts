import { describe, expect, it } from 'vitest'

import { getShortName } from '../key-name'

describe('getShortName', () => {
  it('should return the short name if it exists', () => {
    expect(getShortName('lmeta')).toEqual('⌘')
  })

  it('should return the key without prefix if it matches any prefix', () => {
    expect(getShortName('numpad2')).toEqual('2')
    expect(getShortName('num1')).toEqual('1')
  })

  it('should return the key in uppercase if it has length <= 3', () => {
    expect(getShortName('abc')).toEqual('ABC')
    expect(getShortName('123')).toEqual('123')
  })

  it('should return an empty string if no conditions are met', () => {
    expect(getShortName('longKey')).toEqual('')
  })
})
