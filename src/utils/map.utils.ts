import { type GameMap, type Position } from '../interface/game.interface'
import { mapValidator } from '../validator/map.validator'
import { parseUtils } from './parse.utils'
import { positionUtils } from './position.utils'

export const MapTileFactory = {
  M: {
    arguments: 3,
    process: addTiles
  },
  T: {
    arguments: 4,
    process: addTreasure
  },
  A: {
    arguments: 6,
    process: addPlayer
  }
} as const

export const POSSIBLES_TILES = Object.keys(MapTileFactory)

function addTiles (map: GameMap, columns: string[]) {
  const positionX = parseUtils.parseFileNumber(columns.at(1))
  const positionY = parseUtils.parseFileNumber(columns.at(2))
  const position: Position = [positionX, positionY]

  validatePosition(map.maxX, map.maxY, position)
  map.tiles.set(positionUtils.positionToKey(position), 'M')
}

function addPlayer (map: GameMap, columns: string[]) {
  const positionX = parseUtils.parseFileNumber(columns.at(2))
  const positionY = parseUtils.parseFileNumber(columns.at(3))
  const position: Position = [positionX, positionY]
  const name = columns.at(1)
  const orientation = columns.at(4)
  const sequence = columns.at(5)

  validatePosition(map.maxX, map.maxY, position)

  mapValidator.assertValidName(name)
  mapValidator.assertValidSequence(sequence)
  mapValidator.assertValidOrientation(orientation)
  map.playerOrder.push(name)
  map.players.set(name, {
    position,
    sequence,
    orientation,
    treasures: 0
  })
}

function addTreasure (map: GameMap, columns: string[]) {
  const positionX = parseUtils.parseFileNumber(columns.at(1))
  const positionY = parseUtils.parseFileNumber(columns.at(2))
  const numberOfTreasure = parseUtils.parseFileNumber(columns.at(3))
  const position: Position = [positionX, positionY]

  validatePosition(map.maxX, map.maxY, position)
  map.treasures.set(positionUtils.positionToKey(position), numberOfTreasure)
}

function validatePosition (maxX: number, maxY: number, position: Position) {
  const [x, y] = position
  if (maxX <= x) {
    throw new Error(`Position X must be between 0 and ${maxX}`)
  }

  if (maxY <= y) {
    throw new Error(`Position Y must be between 0 and ${maxY}`)
  }
}

export const mapUtils = Object.freeze({
  addTiles,
  addPlayer,
  addTreasure
})
