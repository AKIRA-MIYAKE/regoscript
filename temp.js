const Parser = require('./dist/ast/parser').default
const { RegoProgram } = require('./dist/classes')

const input = `
b = {x | x = a[_]}
`

const parser = new Parser()
parser.feed(input)
const r = parser.parse()
const program = RegoProgram.fromData(r)
console.log(JSON.stringify(program.statements[0], null, 2))
