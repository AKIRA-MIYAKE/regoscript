import { IProgram } from './interfaces'

declare var require: any

const nearley = require('nearley')
const grammar = require('./grammar.js')

export default class Parser {
  parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))

  feed(input: string) {
    let _input = input
    if (this.parser.lexer.line > 1) {
      _input = `\n${input}`
    }
    this.parser.feed(_input)
  }

  parse(): IProgram {
    const results = this.parser.results

    return results[results.length - 1]
  }
}
