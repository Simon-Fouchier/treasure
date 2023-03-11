import { type MapTileFactory } from '../utils/map.utils'
import { type mouvementEnum, type singleMoveEnum } from '../utils/player.utils'

export type MapTilesType = keyof typeof MapTileFactory

export interface GameMap {
  maxY: Readonly<number>
  maxX: Readonly<number>
  tiles: Map<string, MapTilesType>
  players: Map<Name, Player>
  playerOrder: Name[]
  treasures: Map<string, number>
}

export interface Player {
  position: Position
  sequence: MoveSequence
  orientation: Orientation
  treasures: number
}

declare const validSequence: unique symbol
declare const validName: unique symbol

export type MoveSequence = string & {
  [validSequence]: true
}

export type Position = [x: number, y: number]
export type Name = string & {
  [validName]: true
}

export type Orientation = keyof typeof mouvementEnum
export type SingleMove = keyof typeof singleMoveEnum
