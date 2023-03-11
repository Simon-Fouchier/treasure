import { type GameMap } from '../../interface/game.interface'
import { mapUtils } from '../../utils/map.utils'
import { mapValidator } from '../../validator/map.validator'

test('Adding player to a good location should pass', () => {
  const map: GameMap = {
    maxX: 2,
    maxY: 2,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }
  const name = 'Player'
  mapValidator.assertValidName(name)
  mapUtils.addPlayer(map, ['A', name, '0', '1', 'S', 'AA'])
  expect(map.playerOrder.at(0)).toEqual(name)
  expect(map.players.get(name)).toEqual({ position: [0, 1], sequence: 'AA', orientation: 'S', treasures: 0 })
})

test('Adding player to a wrong Y location should throw on position Y', () => {
  const map: GameMap = {
    maxX: 1,
    maxY: 1,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }
  expect(() => {
    mapUtils.addPlayer(map, ['A', 'Player', '0', '2', 'S', 'AA'])
  }).toThrow('Position Y must be between 0 and 1')
})

test('Adding player to a wrong X location should throw on position X', () => {
  const map: GameMap = {
    maxX: 1,
    maxY: 1,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }

  expect(() => {
    mapUtils.addPlayer(map, ['A', 'Player', '2', '0', 'S', 'AA'])
  }).toThrow('Position X must be between 0 and 1')
})

test('Player with incorrect name should throw on name -', () => {
  const map: GameMap = {
    maxX: 1,
    maxY: 1,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }

  expect(() => {
    mapUtils.addPlayer(map, ['A', 'Pla-yer', '0', '0', 'S', 'AA'])
  }).toThrow('The name: Pla-yer is not a valid name: Character \'-\' is forbidden')
})

test('Player with incorrect sequence AX should throw on sequence name', () => {
  const map: GameMap = {
    maxX: 1,
    maxY: 1,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }

  expect(() => {
    mapUtils.addPlayer(map, ['A', 'Player', '0', '0', 'S', 'AX'])
  }).toThrow('The sequence: AX is not a valid move sequence. Authorized keys : [A,D,G]')
})

test('Player with incorrect orientation L should throw on orientation', () => {
  const map: GameMap = {
    maxX: 1,
    maxY: 1,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }

  expect(() => {
    mapUtils.addPlayer(map, ['A', 'Player', '0', '0', 'L', 'AA'])
  }).toThrow('Orientation: L is not a valid orientation: Authorized keys : [S,N,O,E]')
})
