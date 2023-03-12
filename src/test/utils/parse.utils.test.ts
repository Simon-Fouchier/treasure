import { parseUtils } from '../../utils/parse.utils'

describe('Parsing utils tests', () => {
  test('Trim on A split when splitFileLine then A', () => {
    expect(parseUtils.splitFileLine(' A ')).toEqual(['A'])
  })
  test('split by - when splitFileLine then splitted', () => {
    expect(parseUtils.splitFileLine(' A  - B   - C - 1   ')).toEqual(['A', 'B', 'C', '1'])
  })
  test('empty string when splitFileLine then splitted', () => {
    expect(parseUtils.splitFileLine('')).toEqual([''])
  })

  test('undefined when parseFileNumber then throw error', () => {
    expect(() => { parseUtils.parseFileNumber(undefined) }).toThrow('Input must be a number')
  })
  test('not a number when parseFileNumber then throw error', () => {
    expect(() => { parseUtils.parseFileNumber('R') }).toThrow('Input must be a positive number greater or equal than 0')
  })

  test('Negative number when parseFileNumber then throw error', () => {
    expect(() => { parseUtils.parseFileNumber('-1') }).toThrow('Input must be a positive number greater or equal than 0')
  })

  test('10 with min 10 when parseFileNumber then throw error', () => {
    expect(() => { parseUtils.parseFileNumber('9', 10) }).toThrow('Input must be a positive number greater or equal than 10')
  })

  test('11 with min 10 when parseFileNumber then 11', () => {
    expect(() => { parseUtils.parseFileNumber('10', 10) }).not.toThrow('Input must be a positive number greater or equal than 10')
  })

  test('11 with min 0 when parseFileNumber then 1', () => {
    expect(() => { parseUtils.parseFileNumber('1') }).not.toThrow('Input must be a positive number greater or equal than 10')
  })
})
