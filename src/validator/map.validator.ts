import { type MapTilesType, type MoveSequence, type Name, type Orientation } from '../interface/game.interface'
import { MapTileFactory, POSSIBLES_TILES } from '../utils/map.utils'

interface IMapValidator {
  assertValidSequence: (input: string | undefined) => asserts input is MoveSequence
  assertValidName: (input: string | undefined) => asserts input is Name
  assertValidOrientation: (input: string | undefined) => asserts input is Orientation
  assertValidMapTiles: (input: string | undefined) => asserts input is MapTilesType
  validateArgumentsTile: (columns: string[]) => MapTilesType
}

const assertValidSequence: (input: string | undefined) => asserts input is MoveSequence = (input) => {
  if (input !== undefined && !/^[ADG]*$/.test(input)) {
    throw new Error(`The sequence: ${input} is not a valid move sequence. Authorized keys : [A,D,G]`)
  }
}

const assertValidName: (input: string | undefined) => asserts input is Name = (input) => {
  if (input !== undefined && !/^[a-zA-Z ]+$/.test(input)) {
    throw new Error(`The name: ${input} is not a valid name: Character '-' is forbidden`)
  }
}

const assertValidOrientation: (input: string | undefined) => asserts input is Orientation = (input) => {
  if (input !== undefined && !/^[SNOE]$/.test(input)) {
    throw new Error(`Orientation: ${input} is not a valid orientation: Authorized keys : [S,N,O,E]`)
  }
}

const assertValidMapTiles: (input: string | undefined) => asserts input is MapTilesType = (input) => {
  if (input == null || input.length !== 1) {
    throw new Error('The map tile must be a letter')
  }
  if (!POSSIBLES_TILES.includes(input)) {
    throw new Error(`The sequence: ${input} is not a valid tiles`)
  }
}

/**
 * Validate the first element of a line
 * @param columns
 */
function validateArgumentsTile (columns: string[]) {
  const mapTile = columns.at(0)
  assertValidMapTiles(mapTile)
  if (columns.length !== MapTileFactory[mapTile].arguments) {
    throw new Error(`You must have ${MapTileFactory[mapTile].arguments} with tile ${mapTile}`)
  }

  return mapTile
}

export const mapValidator: IMapValidator = Object.freeze({
  assertValidMapTiles,
  assertValidOrientation,
  assertValidName,
  assertValidSequence,
  validateArgumentsTile
})
