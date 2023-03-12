import { describe } from 'node:test'
import { GameLoop } from '../gameloop'
import { type GameMap, type MoveSequence, type Name } from '../interface/game.interface'

describe("Let's party", () => {
  test('Game exemple', () => {
    const lara = 'Lara' as Name
    const map: GameMap = {
      maxX: 3,
      maxY: 4,
      tiles: new Map([['1,0', 'M'], ['2,1', 'M']]),
      players: new Map([[lara, { position: [1, 1], orientation: 'S', sequence: 'AADADAGGA' as MoveSequence, treasures: 0 }]]),
      treasures: new Map([['0,3', 2], ['1,3', 3]]),
      playerOrder: [lara]
    }

    GameLoop.start(map)

    expect(map.players.get(lara)).toEqual({ position: [0, 3], orientation: 'S', sequence: '' as MoveSequence, treasures: 3 })
    expect(map.maxX).toEqual(3)
    expect(map.maxY).toEqual(4)
    expect(map.playerOrder).toEqual([])
    expect(map.tiles.get('1,0')).toEqual('M')
    expect(map.tiles.get('2,1')).toEqual('M')
    expect(map.treasures.get('0,3')).toEqual(0)
    expect(map.treasures.get('1,3')).toEqual(2)
  })
})
