function splitFileLine (line: string) {
  return line.split('-').map(item => item?.trim())
}

function parseFileNumber (input: string | undefined, minInt = 0) {
  if (input === null || input === undefined) {
    throw new Error('Input must be a number')
  }

  const number = parseInt(input, 10)
  if (isNaN(number) || number < minInt) {
    throw new Error(`Input must be a positive number greater or equal than ${minInt}`)
  }

  return number
}

export const parseUtils = Object.freeze({
  parseFileNumber,
  splitFileLine
})
