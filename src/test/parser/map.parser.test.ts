import { mapParser } from '../../parser/map.parser'
import { type GameMap, type MoveSequence, type Name } from '../../interface/game.interface'
import fs from 'fs/promises'

const pathToExemple = './src/test/resource/map'
const pathToResults = './src/test/resource/results'
const lara = 'Lara' as Name

describe('Parsing maps', () => {
  test('Parsing correct map', async () => {
    const map = await mapParser.parse(`${pathToExemple}/map-ok.txt`)
    expect(map.players.get(lara)).toEqual({ position: [1, 1], orientation: 'S', sequence: 'AADADAGGA' as MoveSequence, treasures: 0 })
    expect(map.maxX).toEqual(3)
    expect(map.maxY).toEqual(4)
    expect(map.tiles.get('1,0')).toEqual('M')
    expect(map.tiles.get('2,1')).toEqual('M')
    expect(map.treasures.get('0,3')).toEqual(2)
    expect(map.treasures.get('1,3')).toEqual(3)
  })

  test('Parsing with no C infos should throw', async () => {
    try {
      await mapParser.parse(`${pathToExemple}/map-error-no-c.txt`)
      expect(false).toEqual(true)
    } catch (e) {
      expect(e as Error).toEqual(new Error('The first letter of your input must be a C tile'))
    }
  })

  test('Parsing with no C infos should throw', async () => {
    try {
      await mapParser.parse(`${pathToExemple}/map-error-unknown-tile.txt`)
      expect(false).toEqual(true)
    } catch (e) {
      expect(e as Error).toEqual(new Error('The sequence: X is not a valid tiles'))
    }
  })

  test('Parsing recette gateau should throw', async () => {
    try {
      await mapParser.parse(`${pathToExemple}/recette-gateau.txt`)
      expect(false).toEqual(true)
    } catch (e) {
      expect(e as Error).toEqual(new Error('The first letter of your input must be a C tile'))
    }
  })
})

describe('Write file', () => {
  const map: GameMap = {
    maxX: 3,
    maxY: 4,
    tiles: new Map([['1,0', 'M'], ['2,1', 'M']]),
    players: new Map([[lara, { position: [1, 1], orientation: 'S', sequence: 'AADADAGGA' as MoveSequence, treasures: 0 }]]),
    treasures: new Map([['0,3', 2], ['1,3', 2]]),
    playerOrder: []
  }

  test('Write file', async () => {
    await mapParser.write(`${pathToResults}/map.txt`, map, pathToResults)
    const content = await fs.readFile(`${pathToResults}/map-result.txt`, { encoding: 'utf8' })
    expect(content).toEqual(
      'C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 2\nA - Lara - 1 - 1 - S - 0\n')
  })

  test('Write file with no txt ext', async () => {
    await mapParser.write(`${pathToResults}/map`, map, pathToResults)
    const content = await fs.readFile(`${pathToResults}/map-result`, { encoding: 'utf8' })
    expect(content).toEqual(
      'C - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 2\nA - Lara - 1 - 1 - S - 0\n')
  })
})
