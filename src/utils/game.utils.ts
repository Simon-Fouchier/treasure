import { type GameMap, type Position } from '../interface/game.interface'
import { positionUtils } from './position.utils'

function isInvalidPosition (maxX: number, maxY: number, position: Position) {
  const [x, y] = position
  return y >= maxY || x >= maxX || y < 0 || x < 0
}

function isTileMountain (map: GameMap, position: Position) {
  return map.tiles.get(positionUtils.positionToKey(position)) === 'M'
}

function isOtherPlayerOnPosition (map: GameMap, position: Position) {
  const [x, y] = position
  return ([...map.players.values()].some(otherPlayers => {
    const [oX, oY] = otherPlayers.position
    return oX === x && oY === y
  }))
}

export const gameUtils = Object.freeze({
  isInvalidPosition,
  isTileMountain,
  isOtherPlayerOnPosition
})
