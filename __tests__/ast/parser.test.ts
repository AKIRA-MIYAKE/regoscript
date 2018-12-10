import Parser from '../../src/ast/parser'
import * as I from '../../src/ast/interfaces'

describe('ast', () => {
  describe('Parser', () => {
    describe('parse()', () => {
      it('single feed.', () => {
        const parser = new Parser()
        const input = `a = 1`
        parser.feed(input)

        const r = parser.parse()
        expect(r.type).toBe(I.NodeType.Program)
        expect(r.statements.length).toBe(1)
        const stmt = r.statements[0]
        expect(stmt.type).toBe(I.NodeType.Body)
        const exprs = (stmt as I.IBody).value
        expect(exprs.length).toBe(1)
        const expr = exprs[0]
        expect(expr.terms.length).toBe(3)
        const terms = expr.terms
        expect(I.isRefValue(terms[0].value)).toBe(true)
        expect(I.isVarValue(terms[1].value)).toBe(true)
        expect(I.isScalarValue(terms[2].value)).toBe(true)
      })
    })

    it('multiple feeds.', () => {
      const parser = new Parser()
      const input0 = `a = 1`
      parser.feed(input0)

      const r0 = parser.parse()
      expect(r0.statements.length).toBe(1)

      const input1 = `b = a`
      parser.feed(input1)

      const r1 = parser.parse()
      expect(r1.statements.length).toBe(2)
    })
  })
})

