import { type GameMap } from './interface/game.interface'
import fs from 'fs/promises'
import { MapTileFactory } from './constants/game.constants'
import { mapValidator } from './validator/map.validator'
import { parseUtils } from './utils/parse.utils'

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
    treasures: new Map()
  }

  for (const line of lines.slice(1)) {
    const columns = parseUtils.splitFileLine(line)
    const mapTile = mapValidator.validateArgumentsTile(columns)
    MapTileFactory[mapTile].process(map, columns)
  }

  return map
}

export const mapParser = Object.freeze({
  parse
})

