import {
  Location,
  NodeType,
  ValueType,
  IProgram,
  IRule,
  IHead,
  IArgs,
  IBody,
  IExpr,
  IWith,
  ITerm,
  IScalar,
  IVar,
  IRef,
  IArray,
  ISet,
  IObject,
  IArrayComprehension,
  ISetComprehension,
  IObjectComprehension,
  ICall,
  isRule,
  isBody,
  isScalarValue,
  isVarValue,
  isRefValue,
  isArrayValue,
  isSetValue,
  isObjectValue,
  isArrayComprehensionValue,
  isSetComprehensionValue,
  isObjectComprehensionValue,
  isCallValue,
} from '../ast/interfaces'

export class RegoProgram implements IProgram {
  static fromData(data: IProgram): RegoProgram {
    const location = data.location
    const statements = data.statements.map(s => {
      let stmt: RegoStatement | undefined = undefined

      if (isRule(s)) {
        stmt = RegoRule.fromData(s)
      } else if (isBody(s)) {
        stmt = RegoBody.fromData(s)
      }

      if (typeof stmt === 'undefined') {
        throw new Error('Create Program Error')
      }

      return stmt
    })

    return new RegoProgram(location, statements)
  }

  type: NodeType.Program = NodeType.Program
  location: Location
  statements: Array<RegoStatement>

  constructor(location: Location, statements: Array<RegoStatement>) {
    this.location = location
    this.statements = statements
  }
}

export type RegoStatement = RegoRule | RegoBody

export class RegoRule implements IRule {
  static fromData(data: IRule): RegoRule {
    const location = data.location
    const defaultFlag = data.default
    const head = RegoHead.fromData(data.head)
    const body = RegoBody.fromData(data.body)
    const elseRule = data.else ? RegoRule.fromData(data.else) : undefined
    return new RegoRule(location, defaultFlag, head, body, elseRule)
  }

  type: NodeType.Rule = NodeType.Rule
  location: Location
  default: boolean
  head: RegoHead
  body: RegoBody
  else?: RegoRule

  constructor(
    location: Location,
    defaultFlag: boolean,
    head: RegoHead,
    body: RegoBody,
    elseRule?: RegoRule
  ) {
    this.location = location
    this.default = defaultFlag
    this.head = head
    this.body = body
    this.else = elseRule
  }
}

export class RegoHead implements IHead {
  static fromData(data: IHead): RegoHead {
    const location = data.location
    const name = data.name
    const args = data.args ? RegoArgs.fromData(data.args) : undefined
    const key = data.key ? RegoTerm.fromData(data.key) : undefined
    const value = data.value ? RegoTerm.fromData(data.value) : undefined
    return new RegoHead(location, name, args, key, value)
  }

  type: NodeType.Head = NodeType.Head
  location: Location
  name: string
  args?: RegoArgs
  key?: RegoTerm
  value?: RegoTerm

  constructor(
    location: Location,
    name: string,
    args?: RegoArgs,
    key?: RegoTerm,
    value?: RegoTerm
  ) {
    this.location = location
    this.name = name
    this.args = args
    this.key = key
    this.value = value
  }
}

export class RegoArgs implements IArgs {
  static fromData(data: IArgs): RegoArgs {
    const value = data.value.map(v => RegoTerm.fromData(v))
    return new RegoArgs(value)
  }

  type: NodeType.Args = NodeType.Args
  value: Array<RegoTerm>

  constructor(value: Array<RegoTerm>) {
    this.value = value
  }
}

export class RegoBody implements IBody {
  static fromData(data: IBody): RegoBody {
    const location = data.location
    const value = data.value.map(v => RegoExpr.fromData(v))
    return new RegoBody(location, value)
  }

  type: NodeType.Body = NodeType.Body
  location: Location
  value: Array<RegoExpr>

  constructor(location: Location, value: Array<RegoExpr>) {
    this.location = location
    this.value = value
  }
}

export class RegoExpr implements IExpr {
  static fromData(data: IExpr): RegoExpr {
    const location = data.location
    const negated = data.negated
    const terms = data.terms.map(t => RegoTerm.fromData(t))
    const withs = data.with.map(w => RegoWith.fromData(w))
    return new RegoExpr(location, negated, terms, withs)
  }

  type: NodeType.Epxr = NodeType.Epxr
  location: Location
  negated: boolean
  terms: Array<RegoTerm>
  with: Array<RegoWith>

  constructor(
    location: Location,
    negated: boolean,
    terms: Array<RegoTerm>,
    withs: Array<RegoWith>
  ) {
    this.location = location
    this.negated = negated
    this.terms = terms
    this.with = withs
  }
}

export class RegoWith implements IWith {
  static fromData(data: IWith): RegoWith {
    const location = data.location
    const target = RegoTerm.fromData(data.target)
    const value = RegoTerm.fromData(data.value)
    return new RegoWith(location, target, value)
  }

  type: NodeType.With = NodeType.With
  location: Location
  target: RegoTerm
  value: RegoTerm

  constructor(location: Location, target: RegoTerm, value: RegoTerm) {
    this.location = location
    this.target = target
    this.value = value
  }
}

export class RegoTerm implements ITerm {
  static fromData(data: ITerm): RegoTerm {
    const location = data.location
    let value: RegoValue | undefined = undefined

    if (isScalarValue(data.value)) {
      value = data.value
    } else if (isVarValue(data.value)) {
      value = RegoVar.fromData(data.value)
    } else if (isRefValue(data.value)) {
      value = RegoRef.fromData(data.value)
    } else if (isArrayValue(data.value)) {
      value = RegoArray.fromData(data.value)
    } else if (isSetValue(data.value)) {
      value = RegoSet.fromData(data.value)
    } else if (isObjectValue(data.value)) {
      value = RegoObject.fromData(data.value)
    } else if (isArrayComprehensionValue(data.value)) {
      value = RegoArrayComprehension.fromData(data.value)
    } else if (isSetComprehensionValue(data.value)) {
      value = RegoSetComprehension.fromData(data.value)
    } else if (isObjectComprehensionValue(data.value)) {
      value = RegoObjectComprehension.fromData(data.value)
    } else if (isCallValue(data.value)) {
      value = RegoCall.fromData(data.value)
    }

    if (typeof value === 'undefined') {
      throw new Error('Create Term Error')
    }

    return new RegoTerm(location, value)
  }

  type: NodeType.Term = NodeType.Term
  location: Location
  value: RegoValue

  constructor(location: Location, value: RegoValue) {
    this.location = location
    this.value = value
  }
}

export type RegoValue =
  | RegoScalar
  | RegoVar
  | RegoRef
  | RegoArray
  | RegoSet
  | RegoObject
  | RegoArrayComprehension
  | RegoSetComprehension
  | RegoObjectComprehension
  | RegoCall

export type RegoScalar = IScalar

export class RegoVar implements IVar {
  static fromData(data: IVar): RegoVar {
    return new RegoVar(data.value)
  }

  type: ValueType.Var = ValueType.Var
  value: string

  constructor(value: string) {
    this.value = value
  }
}

export class RegoRef implements IRef {
  static fromData(data: IRef): RegoRef {
    const value = data.value.map(v => RegoTerm.fromData(v))
    return new RegoRef(value)
  }

  type: ValueType.Ref = ValueType.Ref
  value: Array<RegoTerm>

  constructor(value: Array<RegoTerm>) {
    this.value = value
  }
}

export class RegoArray implements IArray {
  static fromData(data: IArray): RegoArray {
    const value = data.value.map(v => RegoTerm.fromData(v))
    return new RegoArray(value)
  }

  type: ValueType.Array = ValueType.Array
  value: Array<RegoTerm>

  constructor(value: Array<RegoTerm>) {
    this.value = value
  }
}

export class RegoSet implements ISet {
  static fromData(data: ISet): RegoSet {
    const value = data.value.map(v => RegoTerm.fromData(v))
    return new RegoSet(value)
  }

  type: ValueType.Set = ValueType.Set
  value: Array<RegoTerm>

  constructor(value: Array<RegoTerm>) {
    this.value = value
  }
}

export class RegoObject implements IObject {
  static fromData(data: IObject): RegoObject {
    const value = data.value.map(([k, v]) => [
      RegoTerm.fromData(k),
      RegoTerm.fromData(v),
    ]) as Array<[RegoTerm, RegoTerm]>
    return new RegoObject(value)
  }

  type: ValueType.Object = ValueType.Object
  value: Array<[RegoTerm, RegoTerm]>

  constructor(value: Array<[RegoTerm, RegoTerm]>) {
    this.value = value
  }
}

export class RegoArrayComprehension implements IArrayComprehension {
  static fromData(data: IArrayComprehension): RegoArrayComprehension {
    const term = RegoTerm.fromData(data.value.term)
    const body = RegoBody.fromData(data.value.body)
    return new RegoArrayComprehension({ term, body })
  }

  type: ValueType.ArrayComprehension = ValueType.ArrayComprehension
  value: {
    term: RegoTerm
    body: RegoBody
  }

  constructor(value: { term: RegoTerm; body: RegoBody }) {
    this.value = value
  }
}

export class RegoSetComprehension implements ISetComprehension {
  static fromData(data: ISetComprehension): RegoSetComprehension {
    const term = RegoTerm.fromData(data.value.term)
    const body = RegoBody.fromData(data.value.body)
    return new RegoSetComprehension({ term, body })
  }

  type: ValueType.SetComprehension = ValueType.SetComprehension
  value: {
    term: RegoTerm
    body: RegoBody
  }

  constructor(value: { term: RegoTerm; body: RegoBody }) {
    this.value = value
  }
}

export class RegoObjectComprehension implements IObjectComprehension {
  static fromData(data: IObjectComprehension): RegoObjectComprehension {
    const key = RegoTerm.fromData(data.value.key)
    const value = RegoTerm.fromData(data.value.value)
    const body = RegoBody.fromData(data.value.body)
    return new RegoObjectComprehension({ key, value, body })
  }

  type: ValueType.ObjectComprehension = ValueType.ObjectComprehension
  value: {
    key: RegoTerm
    value: RegoTerm
    body: RegoBody
  }

  constructor(value: { key: RegoTerm; value: RegoTerm; body: RegoBody }) {
    this.value = value
  }
}

export class RegoCall implements ICall {
  static fromData(data: ICall): RegoCall {
    const value = data.value.map(v => RegoTerm.fromData(v))
    return new RegoCall(value)
  }

  type: ValueType.Call = ValueType.Call
  value: Array<RegoTerm>

  constructor(value: Array<RegoTerm>) {
    this.value = value
  }
}
