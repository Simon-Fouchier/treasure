import { type GameMap } from '../interface/game.interface'
import fs from 'fs/promises'
import { mapValidator } from '../validator/map.validator'
import { parseUtils } from '../utils/parse.utils'
import { MapTileFactory } from '../utils/map.utils'
import { positionUtils } from '../utils/position.utils'

async function parse (path: string) {
  const bufferedFile = await fs.readFile(path, { encoding: 'utf8' })

  const lines = bufferedFile.split('\n')
  if (lines.at(-1) === '') {
    lines.pop()
  }

  const mapLine = lines.at(0) ?? ''
  const firstLineSplitted = parseUtils.splitFileLine(mapLine)
  const firstTile = firstLineSplitted.at(0)
  if (firstTile !== 'C') {
    throw new Error('The first letter of your input must be a C tile')
  } else if (firstLineSplitted.length !== 3) {
    throw new Error('You must have 2 arguments with tile C')
  }

  const map: GameMap = {
    maxX: parseUtils.parseFileNumber(firstLineSplitted.at(1), 1),
    maxY: parseUtils.parseFileNumber(firstLineSplitted.at(2), 1),
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }

  for (const line of lines.slice(1)) {
    const columns = parseUtils.splitFileLine(line)
    const mapTile = mapValidator.validateArgumentsTile(columns)
    MapTileFactory[mapTile].process(map, columns)
  }

  return map
}

async function write (path: string, map: GameMap) {
  const paths = path.split('.')
  paths[paths.length - 2] = `${paths.at(-2) ?? ''}-result`
  const processContent = () => {
    let content: string = ''
    content += `C - ${map.maxX} - ${map.maxY} \n`

    map.tiles.forEach((value, key) => {
      const [x, y] = positionUtils.keyToPosition(key)
      content += `${value} - ${x} - ${y} \n`
    })

    map.treasures.forEach((value, key) => {
      const [x, y] = positionUtils.keyToPosition(key)
      content += `T - ${x} - ${y} - ${value} \n`
    })

    map.players.forEach((player, name) => {
      const [x, y] = player.position
      content += `A - ${name} - ${x} - ${y} - ${player.orientation} - ${player.treasures} \n`
    })

    return content
  }
  await fs.writeFile(paths.join('.'), processContent())
}

export const mapParser = Object.freeze({
  parse,
  write
})
