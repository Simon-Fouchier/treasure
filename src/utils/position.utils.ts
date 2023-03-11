import { type Position } from '../interface/game.interface'

function positionToKey ([x, y]: Position) {
  return `${x},${y}`
}

function keyToPosition (key: string) {
  return key.split(',').map(item => parseInt(item, 10))
}

export const positionUtils = Object.freeze({
  positionToKey,
  keyToPosition
})
