import { gameUtils } from '../../utils/game.utils'
import { type GameMap } from '../../interface/game.interface'
import { mapValidator } from '../../validator/map.validator'

test('0,0 is a NOT valid position in X:0 and Y:0 when isInvalidPosition return true', () => {
  expect(gameUtils.isInvalidPosition(0, 0, [0, 0])).toEqual(true)
})

test('1,0 is a NOT valid position in X:0 and Y:0 when isInvalidPosition return true', () => {
  expect(gameUtils.isInvalidPosition(0, 0, [1, 0])).toEqual(true)
})

test('0,1 is a NOT valid position in X:0 and Y:0 when isInvalidPosition return true', () => {
  expect(gameUtils.isInvalidPosition(0, 0, [0, 1])).toEqual(true)
})

test('0,1 is a valid position in X:2 and Y:2 when isInvalidPosition return false', () => {
  expect(gameUtils.isInvalidPosition(2, 2, [0, 1])).toEqual(false)
})

test('1,0 is a valid position in X:2 and Y:2 when isInvalidPosition return false', () => {
  expect(gameUtils.isInvalidPosition(2, 2, [1, 0])).toEqual(false)
})

test('1,1 is a mountain tiles when isTileMountain return true', () => {
  const map: GameMap = {
    maxX: 2,
    maxY: 2,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }
  map.tiles.set('1,1', 'M')
  expect(gameUtils.isTileMountain(map, [1, 1])).toEqual(true)
})

test('1,0 is not a mountain tiles  when isTileMountain return false', () => {
  const map: GameMap = {
    maxX: 2,
    maxY: 2,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }
  map.tiles.set('1,1', 'M')
  expect(gameUtils.isTileMountain(map, [1, 0])).toEqual(false)
})

test('Lara on 0,0 and next position on 0,0  when isOtherPlayerOnPosition return false', () => {
  const map: GameMap = {
    maxX: 2,
    maxY: 2,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }
  const name = 'Lara'
  const sequence = 'A'

  mapValidator.assertValidName(name)
  mapValidator.assertValidSequence(sequence)
  map.players.set(name, { position: [0, 0], treasures: 1000, orientation: 'S', sequence })
  expect(gameUtils.isOtherPlayerOnPosition(map, [0, 0])).toEqual(true)
})
