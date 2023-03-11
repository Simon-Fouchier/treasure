import { type GameMap, type SingleMove } from './interface/game.interface'
import { playerUtils } from './utils/player.utils'
import { positionUtils } from './utils/position.utils'

/**
 * Start the gam from a map param
 * Stop whenever there's no more movement
 * In our case, if there's no more player in playerOrder then it stops
 * @param map
 */
function start (map: GameMap) {
  while (map.playerOrder?.length > 0) {
    [...map.playerOrder].forEach((playerName) => {
      const playerInfo = map.players.get(playerName)

      if (playerInfo?.sequence.at(0) != null) {
        const mouvement = playerInfo.sequence.at(0) as SingleMove
        playerUtils.move(map, playerInfo, playerName, mouvement)
      }
      playerUtils.attempToRemovePlayerFromOrder(playerName, map)
      draw(map)
    })
  }
}

/***
 * Debug puprose, or esthetic
 * @param map
 */
function draw (map: GameMap) {
  const array: string[][] = []
  for (let y = 0; y < map.maxY; y++) {
    const lines: string[] = []
    for (let x = 0; x < map.maxX; x++) {
      lines.push('-')
    }
    array[y] = lines
  }

  map.tiles.forEach((value, key) => {
    const [x, y] = positionUtils.keyToPosition(key)
    array[y][x] = value
  })

  map.treasures.forEach((value, key) => {
    const [x, y] = positionUtils.keyToPosition(key)
    array[y][x] = `T(${value})`
  })

  map.players.forEach(({ treasures, position }, key) => {
    const [x, y] = position
    array[y][x] = `A(${key} - ${treasures})`
  })

  for (let y = 0; y < map.maxY; y++) {
    console.log(array[y].join(' '))
  }
}

export const GameLoop = Object.freeze({
  start
})
