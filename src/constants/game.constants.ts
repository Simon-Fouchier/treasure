import { mapUtils } from '../utils/map.utils'

export const MapTileFactory = {
  M: {
    arguments: 3,
    process: mapUtils.addTiles
  },
  T: {
    arguments: 4,
    process: mapUtils.addTreasure
  },
  A: {
    arguments: 6,
    process: mapUtils.addPlayer
  }
} as const

export const POSSIBLES_TILES = Object.keys(MapTileFactory)
