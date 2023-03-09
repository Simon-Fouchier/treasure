import process from 'process'
import { mapParser } from './src/map.parser'

const args = process.argv.slice(2)

mapParser.parse('./maps/map-1.txt')
  .then((map) => { console.log(map) })
  .catch((e) => {
    console.error(e)
  })
