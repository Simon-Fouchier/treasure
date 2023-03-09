import { MapTileFactory } from '../constants/game.constants'


export type MapTilesType = keyof typeof MapTileFactory

export interface GameMap {
  maxY: Readonly<number>
  maxX: Readonly<number>
  tiles: Map<Position, MapTilesType>
  players: Map<Name, { position: Position, sequence: MoveSequence, orientation: Orientation }>
  treasures: Map<Position, number>
}

declare const validSequence: unique symbol
declare const validName: unique symbol

export type MoveSequence = string & {
  [validSequence]: true
}

export type Orientation = 'S' | 'N' | 'O' | 'E'
export type Position = [x: number, y: number]
export type Name = string & {
  [validName]: true
}
