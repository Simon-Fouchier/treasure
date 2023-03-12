import {
  type GameMap,
  type MoveSequence,
  type Name,
  type Orientation,
  type Player,
  type Position,
  type SingleMove
} from '../interface/game.interface'
import { gameUtils } from './game.utils'
import { positionUtils } from './position.utils'

const ORIENTATION_TRANSFORMATION_REFERENTIAL: Record<Orientation, Record<Exclude<SingleMove, 'A'>, Orientation>> = {
  N: {
    G: 'E',
    D: 'O'
  },
  E: {
    G: 'S',
    D: 'N'
  },
  S: {
    G: 'O',
    D: 'E'
  },
  O: {
    G: 'N',
    D: 'S'
  }
} as const

export const mouvementEnum = {
  N: {
    nextPosition: ([x, y]: Position): Position => {
      return [x, y - 1]
    }
  },
  E: {
    nextPosition: ([x, y]: Position): Position => {
      return [x - 1, y]
    }
  },
  S: {
    nextPosition: ([x, y]: Position): Position => {
      return [x, y + 1]
    }
  },
  O: {
    nextPosition: ([x, y]: Position): Position => {
      return [x + 1, y]
    }
  }
} as const

export const singleMoveEnum = {
  A: 'A',
  G: 'G',
  D: 'D'
} as const

function processMouvement (map: GameMap, playerName: Name, player: Player) {
  const position = mouvementEnum[player.orientation].nextPosition(player.position)
  // Verify if
  // - Position is valid
  // - Tile is not a mountain
  // - An other player is not on the position
  if (gameUtils.isInvalidPosition(map.maxX, map.maxY, position) ||
    gameUtils.isTileMountain(map, position) ||
    gameUtils.isOtherPlayerOnPosition(map, position)) {
    return
  }

  // Add treasure to the player if there(s one
  const key = positionUtils.positionToKey(position)
  const treasureTile = map.treasures.get(key)
  if (treasureTile !== undefined && treasureTile > 0) {
    map.treasures.set(key, treasureTile - 1)
    player.treasures = player.treasures + 1
  }

  player.position = position
  map.players.set(playerName, player)
}
function attempToRemovePlayerFromOrder (playerName: Name, map: GameMap) {
  const player = map.players.get(playerName)
  if (player === undefined || player.sequence?.length === 0) {
    // Remove the player from turn order if sequence is empty
    map.playerOrder.splice(map.playerOrder.indexOf(playerName), 1)
  }
}

// Move forward or change orientation
function move (map: GameMap, player: Player, playerName: Name, move: SingleMove) {
  if (move === singleMoveEnum.A) {
    processMouvement(map, playerName, player)
  } else {
    player.orientation = ORIENTATION_TRANSFORMATION_REFERENTIAL[player.orientation][move]
  }
  player.sequence = player.sequence.substring(1) as MoveSequence
}

export const playerUtils = Object.freeze({
  move,
  attempToRemovePlayerFromOrder
})
