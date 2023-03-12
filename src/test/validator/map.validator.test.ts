import { mapValidator } from '../../validator/map.validator'

describe('Validating sequence parsing', () => {
  test('input A when assertValidSequence then OK', () => {
    expect(() => { mapValidator.assertValidSequence('A') }).not.toThrow('NO ERROR')
  })

  test('input D when assertValidSequence then OK', () => {
    expect(() => { mapValidator.assertValidSequence('D') }).not.toThrow('NO ERROR')
  })

  test('input G when assertValidSequence then OK', () => {
    expect(() => { mapValidator.assertValidSequence('G') }).not.toThrow('NO ERROR')
  })

  test('input AGADAAA when assertValidSequence then OK', () => {
    expect(() => { mapValidator.assertValidSequence('AGADAAA') }).not.toThrow('The sequence: AGADAAA is not a valid move sequence. Authorized keys : [A,D,G]')
  })

  test('input N when assertValidSequence then throw error', () => {
    expect(() => { mapValidator.assertValidSequence('N') }).toThrow('The sequence: N is not a valid move sequence. Authorized keys : [A,D,G]')
  })

  test('input ABC when assertValidSequence then throw error', () => {
    expect(() => { mapValidator.assertValidSequence('ABC') }).toThrow('The sequence: ABC is not a valid move sequence. Authorized keys : [A,D,G]')
  })
})

describe('Validating naming parsing', () => {
  test('input ABC when assertValidName then OK', () => {
    expect(() => { mapValidator.assertValidName('ABC') }).not.toThrow('')
  })

  test('input ABC when assertValidName then throw error', () => {
    expect(() => { mapValidator.assertValidName('A-BC') }).toThrow('The name: A-BC is not a valid name: Character \'-\' is forbidden')
  })
})

describe('Validating orientation parsing', () => {
  test('input ABC when assertValidOrientation then throw', () => {
    expect(() => { mapValidator.assertValidOrientation('ABC') }).toThrow('Orientation: ABC is not a valid orientation: Authorized keys : [S,N,O,E]')
  })

  test('input S when assertValidOrientation then OK', () => {
    expect(() => { mapValidator.assertValidOrientation('S') }).not.toThrow('')
  })

  test('input N when assertValidOrientation then OK', () => {
    expect(() => { mapValidator.assertValidOrientation('N') }).not.toThrow('')
  })

  test('input O when assertValidOrientation then OK', () => {
    expect(() => { mapValidator.assertValidOrientation('O') }).not.toThrow('')
  })

  test('input E when assertValidOrientation then OK', () => {
    expect(() => { mapValidator.assertValidOrientation('E') }).not.toThrow('')
  })
})

describe('Validating tiles parsing', () => {
  test('input M when assertValidMapTiles then OK', () => {
    expect(() => { mapValidator.assertValidMapTiles('M') }).not.toThrow('The sequence: M is not a valid tiles')
  })

  test('input T when assertValidMapTiles then OK', () => {
    expect(() => { mapValidator.assertValidMapTiles('T') }).not.toThrow('The sequence: T is not a valid tiles')
  })

  test('input A when assertValidMapTiles then OK', () => {
    expect(() => { mapValidator.assertValidMapTiles('A') }).not.toThrow('The sequence: A is not a valid tiles')
  })

  test('input B when assertValidMapTiles then throw', () => {
    expect(() => { mapValidator.assertValidMapTiles('B') }).toThrow('The sequence: B is not a valid tiles')
  })

  test('input DB when assertValidMapTiles then throw must be one letter', () => {
    expect(() => { mapValidator.assertValidMapTiles('DB') }).toThrow('The map tile must be a letter')
  })
})

describe('Validating tiles argument parsing', () => {
  test('bad numbers of arguments for A when validateArgumentsTile then throw', () => {
    expect(() => { mapValidator.validateArgumentsTile(['A']) }).toThrow('You must have 6 arguments with tile A')
  })

  test('good numbers of arguments for A when validateArgumentsTile then OK', () => {
    expect(() => { mapValidator.validateArgumentsTile(['A', '2', '3', '4', '5', '6']) }).not.toThrow('You must have 6 arguments with tile A')
  })

  test('bad numbers of arguments for M when validateArgumentsTile then throw', () => {
    expect(() => { mapValidator.validateArgumentsTile(['M']) }).toThrow('You must have 3 arguments with tile M')
  })

  test('good numbers of arguments for M when validateArgumentsTile then OK', () => {
    expect(() => { mapValidator.validateArgumentsTile(['M', '2', '3']) }).not.toThrow('You must have 3 arguments with tile M')
  })

  test('bad numbers of arguments for T when validateArgumentsTile then throw', () => {
    expect(() => { mapValidator.validateArgumentsTile(['T']) }).toThrow('You must have 4 arguments with tile T')
  })

  test('good numbers of arguments for T when validateArgumentsTile then OK', () => {
    expect(() => { mapValidator.validateArgumentsTile(['T', '2', '3', '4']) }).not.toThrow('You must have 4 arguments with tile T')
  })

  test('No existing letter for T when validateArgumentsTile then throw', () => {
    expect(() => { mapValidator.validateArgumentsTile(['X', '2', '3', '4']) }).toThrow('The sequence: X is not a valid tiles')
  })
})
