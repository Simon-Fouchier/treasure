import process from 'process'
import { mapParser } from './src/parser/map.parser'
import { GameLoop } from './src/gameloop'

const args = process.argv.slice(2)

mapParser.parse('./maps/map-1.txt')
  .then((map) => {
    console.debug(map)
    GameLoop.start(map)
    mapParser.write('./results/map-1.txt', map)
      .catch(console.error)
  })
  .catch((e) => {
    console.error(e)
  })
