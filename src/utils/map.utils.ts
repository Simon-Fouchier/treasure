import { type GameMap } from '../interface/game.interface'
import { mapValidator } from '../validator/map.validator'
import { parseUtils } from './parse.utils'

function addTiles (map: GameMap, columns: string[]) {
  const positionX = parseUtils.parseFileNumber(columns.at(1))
  const positionY = parseUtils.parseFileNumber(columns.at(2))
  map.tiles.set([positionX, positionY], 'M')
}

function addPlayer (map: GameMap, columns: string[]) {
  const positionX = parseUtils.parseFileNumber(columns.at(2))
  const positionY = parseUtils.parseFileNumber(columns.at(3))
  const name = columns.at(1)
  const orientation = columns.at(4)
  const sequence = columns.at(5)

  mapValidator.assertValidName(name)
  mapValidator.assertValidSequence(sequence)
  mapValidator.assertValidOrientation(orientation)

  map.players.set(name, { position: [positionX, positionY], sequence, orientation })
}

function addTreasure (map: GameMap, columns: string[]) {
  const positionX = parseUtils.parseFileNumber(columns.at(1))
  const positionY = parseUtils.parseFileNumber(columns.at(2))
  const numberOfTreasure = parseUtils.parseFileNumber(columns.at(3))

  map.tiles.set([positionX, positionY], 'T')
  map.treasures.set([positionX, positionY], numberOfTreasure)
}

export const mapUtils = Object.freeze({
  addTiles,
  addPlayer,
  addTreasure
})
