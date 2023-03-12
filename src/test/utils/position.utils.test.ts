import { positionUtils } from '../../utils/position.utils'

describe('Position util tests', () => {
  test('[0,0] to 0,0', () => {
    expect(positionUtils.positionToKey([0, 0])).toEqual('0,0')
  })

  test('0,0 to [0,0]', () => {
    expect(positionUtils.keyToPosition('0,0')).toEqual([0, 0])
  })

  test('wrong key return NaN', () => {
    expect(positionUtils.keyToPosition('else')).toEqual([NaN])
  })
})
