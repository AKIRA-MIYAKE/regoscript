import {
  Location,
  NodeType,
  ValueType,
  IProgram,
  IStatement,
  IRule,
  IRuleExt,
  IHead,
  IArgs,
  IBody,
  IExpr,
  IWith,
  ITerm,
  IVar,
  ICall,
  newLocation,
  newBody,
  newExpr,
  newTerm,
  nullTerm,
  booleanTerm,
  numberTerm,
  stringTerm,
  varTerm,
  refTerm,
  arrayTerm,
  setTerm,
  objectTerm,
  objectComprehensionTerm,
  setComprehensionTerm,
  arrayComprehensionTerm,
  isVarValue,
} from './interfaces'

export const compileParam = {
  SPACE: /[ \t]/,
  NEWLINE: { match: /(?:\r\n|\r|\n)/, lineBreaks: true },
  RELATION_OPERATOR: /(?:\=\=|\!\=|<\=|>\=|>|<)/,
  BITWISE_OR_OPERATOR: '|',
  BITWISE_AND_OPERATOR: '&',
  ARITH_OPERATOR: /[+-]/,
  FACTOR_OPERATOR: /[*%/]/,
  AS: 'as',
  DEFAULT: 'default',
  ELSE: 'else',
  FALSE: 'false',
  PACKAGE: 'package',
  NULL: 'null',
  NOT: 'not',
  TRUE: 'true',
  WITH: 'with',
  '=': '=',
  ':=': ':=',
  'set(': 'set(',
  '(': '(',
  ')': ')',
  '{': '{',
  '}': '}',
  '[': '[',
  ']': ']',
  ',': ',',
  '.': '.',
  ':': ':',
  ';': ';',
  VAR: /[a-zA-Z_][a-zA-Z0-9_]*/,
  NUMBER: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  STRING: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/,
  COMMENT: /[ \t]*#[^\r\n]*/,
}

export const currentLocation = (input: any): Location => {
  const flatten = (arr: Array<any>): Array<any> => {
    const reducer: any = (acc: any, current: any) => {
      if (Array.isArray(current)) {
        return current.reduce(reducer, acc)
      } else {
        return [...acc, current]
      }
    }
    return arr.reduce(reducer, [])
  }

  const data = flatten(input).reduceRight((acc: any, current: any) => {
    return current !== null ? current : acc
  }, null)
  if (data === null) {
    return newLocation(0, 0)
  }

  if (data.location) {
    return newLocation(data.location.row, data.location.col)
  } else {
    return newLocation(data.line, data.col)
  }
}

export const makeProgram = (loc: Location, stmts: any): IProgram => {
  if (stmts === null) {
    return {
      type: NodeType.Program,
      location: loc,
      statements: [],
    }
  }

  const first = stmts[0]

  const statements = stmts[1].reduce(
    (acc: IStatement[], current: any) => {
      const stmt = current[3]
      if (Array.isArray(stmt)) {
        return [...acc, ...stmt]
      } else {
        return [...acc, stmt]
      }
    },
    Array.isArray(first) ? [...first] : [first]
  )

  return {
    type: NodeType.Program,
    location: loc,
    statements,
  }
}

export const makeDefaultRule = (
  loc: Location,
  name: IVar,
  value: ITerm
): IRule[] => [
  {
    type: NodeType.Rule,
    location: loc,
    default: true,
    head: {
      type: NodeType.Head,
      name: name.value,
      value,
      location: loc,
    },
    body: newBody([newExpr([booleanTerm(true, loc)], loc)], loc),
  },
]

export const makeRule = (
  loc: Location,
  head: IHead,
  body: IBody,
  ruleExt: any
): IRule[] => {
  const rules: IRule[] = [
    {
      type: NodeType.Rule,
      location: loc,
      default: false,
      head,
      body,
    },
  ]

  let prev = rules[0]
  ruleExt.forEach((elem: any, i: number) => {
    const re = elem[1] as IRuleExt
    if (!re.term) {
      rules.push({
        type: NodeType.Rule,
        location: re.location,
        default: false,
        head: prev.head,
        body: re.body,
      })
    } else {
      const curr: IRule = {
        type: NodeType.Rule,
        location: re.location,
        default: false,
        head: {
          type: NodeType.Head,
          location: re.location,
          name: prev.head.name,
          args: prev.head.args,
          value: re.term,
        },
        body: re.body,
      }
      prev.else = curr
      prev = curr
    }
  })

  return rules
}

export const makeRuleHead = (
  loc: Location,
  name: any,
  args: any,
  key: any,
  value: any
): IHead => {
  const head: IHead = {
    type: NodeType.Head,
    location: loc,
    name: name.value.value,
  }

  if (args !== null && key !== null) {
    throw new Error('partial rules cannot take arguments')
  }

  if (args !== null) {
    head.args = args[3]
  }

  if (key !== null) {
    head.key = key[3]
  }

  if (value !== null) {
    head.value = value[3]
  }

  if (key === null && value === null) {
    head.value = booleanTerm(true, loc)
  }

  if (head.key && head.value) {
    const _head = head as any
    if (!_head.key.value.type || typeof _head.key.value !== 'string') {
      throw new Error('object key must be string, var, or ref')
    } else if (
      _head.key.value.type !== 'Var' &&
      _head.key.value.type !== 'Ref'
    ) {
      throw new Error('object key must be string, var, or ref')
    }
  }

  return head
}

export const makeArgs = (list: ITerm[]): IArgs => ({
  type: NodeType.Args,
  value: list,
})

export const makeRuleExt = (
  loc: Location,
  value: any,
  body: IBody
): IRuleExt => {
  let term
  if (value === null) {
    term = booleanTerm(true, loc)
  } else {
    term = value[3]
  }

  return {
    location: loc,
    term: term,
    body,
  }
}

export const makeLiteral = (
  negated: boolean,
  value: IExpr,
  withs: IWith[] | null
) => {
  value.negated = negated
  if (withs !== null) {
    value.with = withs
  }
  return value
}

export const makeLiteralExpr = (loc: Location, lhs: any, rest: any): IExpr => {
  if (rest === null) {
    return newExpr([lhs], lhs.location)
  } else {
    const terms = [rest[1], lhs, rest[3]]
    return newExpr(terms, loc)
  }
}

export const makeWithKeywordList = (head: IWith, tail: any): IWith[] =>
  tail.reduce(
    (acc: IWith[], current: any) => {
      return [...acc, current[1]]
    },
    [head]
  )

export const makeWithKeyword = (
  loc: Location,
  target: ITerm,
  value: ITerm
): IWith => ({
  type: NodeType.With,
  location: loc,
  target,
  value,
})

export const makeExprTerm = (loc: Location, lhs: ITerm, rest: any): ITerm => {
  if (rest === null) {
    return lhs
  } else {
    let _lhs = lhs
    rest.forEach((termSlice: any) => {
      const call: ICall = {
        type: ValueType.Call,
        value: [termSlice[1], _lhs, termSlice[3]],
      }
      _lhs = newTerm(call, loc)
    })
    return _lhs
  }
}

export const makeCall = (
  loc: Location,
  operator: any,
  args: ITerm[]
): ITerm => {
  let termOperator = operator

  if (isVarValue(termOperator.value)) {
    termOperator = refTerm([termOperator], termOperator.location)
  }

  const call: ICall = {
    type: ValueType.Call,
    value: [termOperator, ...args],
  }

  return newTerm(call, loc)
}

export const makeBraceEnclosedBody = (
  loc: Location,
  body: IBody | null
): IBody =>
  body !== null ? body : newBody([newExpr([objectTerm([], loc)], loc)], loc)

export const makeBody = (head: IExpr, tail: any, pos: number): IBody => ({
  type: NodeType.Body,
  location: head.location,
  value: tail.reduce(
    (acc: IExpr[], current: any) => {
      return [...acc, current[pos]]
    },
    [head]
  ),
})

export const makeExprTermList = (head: ITerm | null, tail: any): ITerm[] =>
  head === null
    ? []
    : tail.reduce(
        (acc: [ITerm], current: any) => {
          return [...acc, current[3]]
        },
        [head]
      )

export const makeExprTermPairList = (
  head: [ITerm, ITerm] | null,
  tail: any
): [ITerm, ITerm][] =>
  head === null
    ? []
    : tail.reduce(
        (acc: [ITerm, ITerm], current: any) => {
          return [...acc, current[3]]
        },
        [head]
      )

export const makeExprTermPair = (key: ITerm, value: ITerm): [ITerm, ITerm] => [
  key,
  value,
]

export const makeInfixOperator = (loc: Location, text: string): ITerm =>
  refTerm([varTerm({ type: ValueType.Var, value: text }, loc)], loc)

export const makeArray = (loc: Location, list: ITerm[]): ITerm =>
  arrayTerm(list, loc)

export const makeObject = (loc: Location, list: [ITerm, ITerm][]): ITerm =>
  objectTerm(list, loc)

export const makeSet = (loc: Location, list: ITerm[]): ITerm =>
  setTerm(list, loc)

export const makeArrayComprehension = (
  loc: Location,
  head: ITerm,
  body: IBody
): ITerm => arrayComprehensionTerm(head, body, loc)

export const makeSetComprehension = (
  loc: Location,
  head: ITerm,
  body: IBody
): ITerm => setComprehensionTerm(head, body, loc)

export const makeObjectComprehension = (
  loc: Location,
  head: [ITerm, ITerm],
  body: IBody
): ITerm => objectComprehensionTerm(head[0], head[1], body, loc)

export const makeRef = (loc: Location, head: ITerm, rest: ITerm[]): ITerm =>
  refTerm(
    rest.reduce(
      (acc: ITerm[], current: any) => {
        return [...acc, current]
      },
      [head]
    ),
    loc
  )

export const makeRefOperandDot = (loc: Location, value: IVar): ITerm =>
  stringTerm(value.value, loc)

export const makeVar = (loc: Location, text: string): ITerm =>
  varTerm({ type: ValueType.Var, value: text }, loc)

export const makeNumber = (loc: Location, text: string): ITerm =>
  numberTerm(parseFloat(text), loc)

export const makeString = (loc: Location, text: string): ITerm =>
  stringTerm(JSON.parse(text), loc)

export const makeBool = (loc: Location, text: string): ITerm =>
  text === 'true' ? booleanTerm(true, loc) : booleanTerm(false, loc)

export const makeNull = (loc: Location): ITerm => nullTerm(loc)
