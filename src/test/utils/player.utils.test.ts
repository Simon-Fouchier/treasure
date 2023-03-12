import { type GameMap, type MoveSequence, type Player, type SingleMove } from '../../interface/game.interface'
import { playerUtils } from '../../utils/player.utils'
import { mapValidator } from '../../validator/map.validator'

let map: GameMap
const Lara = 'Lara'
mapValidator.assertValidName(Lara)
beforeEach(() => {
  map = {
    maxX: 4,
    maxY: 4,
    tiles: new Map(),
    players: new Map(),
    treasures: new Map(),
    playerOrder: []
  }
})

describe('Movement orientations tests', () => {
  it('Circular move from S to S going G when move return ONES', () => {
    const sequence = 'A'
    mapValidator.assertValidSequence(sequence)
    const player: Player = { orientation: 'S', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'O' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'N' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'E' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'S' })
  })

  it('Circular move from S to S going D when move return ENOS', () => {
    const sequence = 'A'
    mapValidator.assertValidSequence(sequence)
    const player: Player = { orientation: 'S', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'E' })
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'N' })
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'O' })
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'S' })
  })

  it('Alternate moves from S to S going D-G-D-G when move return SESE', () => {
    const sequence = 'A'
    mapValidator.assertValidSequence(sequence)
    const player: Player = { orientation: 'S', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'E' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'S' })
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'E' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'S' })
  })

  it('Alternate moves from N to N going D-G-D-G when move return ONON', () => {
    const sequence = 'A'
    mapValidator.assertValidSequence(sequence)
    const player: Player = { orientation: 'N', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'O' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'N' })
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'O' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'N' })
  })

  it('Alternate moves from E to E going D-G-D-G when move return NENE', () => {
    const sequence = 'A'
    mapValidator.assertValidSequence(sequence)
    const player: Player = { orientation: 'E', treasures: 0, position: [0, 0], sequence }

    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'N' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'E' })
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'N' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'E' })
  })

  it('Alternate moves from O to O going D-G-D-G when move return SESE', () => {
    const sequence = 'A'
    mapValidator.assertValidSequence(sequence)
    const player: Player = { orientation: 'O', treasures: 0, position: [0, 0], sequence }

    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'S' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'O' })
    playerUtils.move(map, player, Lara, 'D')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'S' })
    playerUtils.move(map, player, Lara, 'G')
    expect(map.players.get(Lara)).toEqual({ ...player, orientation: 'O' })
  })
})

describe('Remove player with no sequence', () => {
  test('No more sequence when attempToRemovePlayerFromOrder then remove', () => {
    const sequence = '' as MoveSequence
    map.playerOrder.push(Lara)
    map.players.set(Lara, { orientation: 'O', treasures: 0, position: [0, 0], sequence })
    playerUtils.attempToRemovePlayerFromOrder(Lara, map)
    expect(map.playerOrder).toEqual([])
  })

  test('Player undefined when attempToRemovePlayerFromOrder then remove player', () => {
    const sequence = 'A' as MoveSequence
    const nameWithNoPlayer = 'Larax'
    mapValidator.assertValidName(nameWithNoPlayer)

    map.playerOrder.push(nameWithNoPlayer)
    map.players.set(Lara, { orientation: 'O', treasures: 0, position: [0, 0], sequence })
    playerUtils.attempToRemovePlayerFromOrder(nameWithNoPlayer, map)
    expect(map.playerOrder).toEqual([])
  })
})

describe('Get treasures by moving on it!', () => {
  test('Move to treasure when processMouvement then +1 treasure', () => {
    map.treasures.set('0,1', 3)
    const sequence = 'A' as MoveSequence
    const player: Player = { orientation: 'S', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.treasures.get('0,1')).toEqual(2)
    expect(map.players.get(Lara)).toEqual({ ...player, position: [0, 1], treasures: 1 })
  })

  test('Already on treasure and change orientation with G then no treasure', () => {
    map.treasures.set('0,0', 3)
    const sequence = 'G' as MoveSequence
    const player: Player = { orientation: 'S', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.treasures.get('0,0')).toEqual(3)
    expect(map.players.get(Lara)).toEqual({ ...player, treasures: 0 })
  })

  test('Already on treasure and change orientation with D then no treasure', () => {
    map.treasures.set('0,0', 3)
    const sequence = 'D' as MoveSequence
    const player: Player = { orientation: 'S', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.treasures.get('0,0')).toEqual(3)
    expect(map.players.get(Lara)).toEqual({ ...player, treasures: 0 })
  })
})

describe('Strange mouvement', () => {
  test('Trying to be out of map using S and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'S', treasures: 0, position: [0, 3], sequence }
    map.players.set(Lara, player)

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([0, 3])
  })

  test('Trying to be out of map using N and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'N', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([0, 0])
  })

  test('Trying to be out of map using E and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'E', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([0, 0])
  })

  test('Trying to be out of map using O and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'O', treasures: 0, position: [3, 0], sequence }
    map.players.set(Lara, player)

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([3, 0])
  })
})

describe('Mountains cannot be climbed', () => {
  test('Trying to climb mountain using O and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'O', treasures: 0, position: [2, 0], sequence }
    map.players.set(Lara, player)
    map.tiles.set('3,0', 'M')

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([2, 0])
  })

  test('Trying to climb mountain using S and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'S', treasures: 0, position: [0, 0], sequence }
    map.players.set(Lara, player)
    map.tiles.set('0,1', 'M')

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([0, 0])
  })

  test('Trying to climb mountain using N and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'N', treasures: 0, position: [0, 1], sequence }
    map.players.set(Lara, player)
    map.tiles.set('0,0', 'M')

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([0, 1])
  })

  test('Trying to climb mountain using E and A when move then keep the same position', () => {
    const sequence = 'A' as MoveSequence

    const player: Player = { orientation: 'E', treasures: 0, position: [1, 0], sequence }
    map.players.set(Lara, player)
    map.tiles.set('0,0', 'M')

    playerUtils.move(map, player, Lara, sequence as SingleMove)
    expect(map.players.get(Lara)?.position).toEqual([1, 0])
  })
})
