import process from 'process'
import { mapParser } from './src/parser/map.parser'
import { GameLoop } from './src/gameloop'

const args = process.argv.slice(2)

mapParser.parse(args[0])
  .then((map) => {
    GameLoop.start(map)
    mapParser.write(args[0], map)
      .catch(console.error)
  })
  .catch((e) => {
    console.error(e)
  })
