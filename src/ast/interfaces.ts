export interface Location {
  row: number
  col: number
}

export enum NodeType {
  Program = 'Program',
  Rule = 'Rule',
  Head = 'Head',
  Args = 'Args',
  Body = 'Body',
  Epxr = 'Expr',
  With = 'With',
  Term = 'Term',
}

export enum ValueType {
  Scalar = 'Scalar',
  Var = 'Var',
  Ref = 'Ref',
  Array = 'Array',
  Set = 'Set',
  Object = 'Object',
  ArrayComprehension = 'ArrayComprehension',
  SetComprehension = 'SetComprehension',
  ObjectComprehension = 'ObjectComprehension',
  Call = 'Call',
}

export interface IProgram {
  type: NodeType.Program
  location: Location
  statements: Array<IStatement>
}

export type IStatement = IRule | IBody

export interface IRule {
  type: NodeType.Rule
  location: Location
  default: boolean
  head: IHead
  body: IBody
  else?: IRule
}

export interface IRuleExt {
  location: Location
  term?: ITerm
  body: IBody
}

export interface IHead {
  type: NodeType.Head
  location: Location
  name: string
  args?: IArgs
  key?: ITerm
  value?: ITerm
}

export interface IArgs {
  type: NodeType.Args
  value: Array<ITerm>
}

export interface IBody {
  type: NodeType.Body
  location: Location
  value: Array<IExpr>
}

export interface IExpr {
  type: NodeType.Epxr
  location: Location
  negated: boolean
  terms: Array<ITerm>
  with: Array<IWith>
}

export interface IWith {
  type: NodeType.With
  location: Location
  target: ITerm
  value: ITerm
}

export interface ITerm {
  type: NodeType.Term
  location: Location
  value: IValue
}

export type IValue =
  | IScalar
  | IVar
  | IRef
  | IArray
  | ISet
  | IObject
  | IArrayComprehension
  | ISetComprehension
  | IObjectComprehension
  | ICall

export type IScalar = null | boolean | number | string

export interface IVar {
  type: ValueType.Var
  value: string
}

export interface IRef {
  type: ValueType.Ref
  value: Array<ITerm>
}

export interface IArray {
  type: ValueType.Array
  value: Array<ITerm>
}

export interface ISet {
  type: ValueType.Set
  value: Array<ITerm>
}

export interface IObject {
  type: ValueType.Object
  value: Array<[ITerm, ITerm]>
}

export interface IArrayComprehension {
  type: ValueType.ArrayComprehension
  value: {
    term: ITerm
    body: IBody
  }
}

export interface ISetComprehension {
  type: ValueType.SetComprehension
  value: {
    term: ITerm
    body: IBody
  }
}

export interface IObjectComprehension {
  type: ValueType.ObjectComprehension
  value: {
    key: ITerm
    value: ITerm
    body: IBody
  }
}

export interface ICall {
  type: ValueType.Call
  value: Array<ITerm>
}

export const newLocation = (row: number, col: number): Location => {
  return { row, col }
}

export const newBody = (exprs: IExpr[], location: Location): IBody => ({
  type: NodeType.Body,
  location,
  value: exprs,
})

export const newExpr = (terms: ITerm[], location: Location): IExpr => ({
  type: NodeType.Epxr,
  location,
  negated: false,
  terms: terms,
  with: [],
})

export const newTerm = (value: IValue, location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value,
})

export const nullTerm = (location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value: null,
})

export const booleanTerm = (value: boolean, location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value,
})

export const numberTerm = (value: number, location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value,
})

export const stringTerm = (value: string, location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value,
})

export const varTerm = (value: IVar, location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value,
})

export const emptyRef = (): IRef => ({
  type: ValueType.Ref,
  value: [],
})

export const refTerm = (terms: ITerm[], location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value: { type: ValueType.Ref, value: terms },
})

export const arrayTerm = (terms: ITerm[], location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value: { type: ValueType.Array, value: terms },
})

export const setTerm = (terms: ITerm[], location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value: { type: ValueType.Set, value: Array.from(new Set(terms)) },
})

export const objectTerm = (
  elems: [ITerm, ITerm][],
  location: Location
): ITerm => ({
  type: NodeType.Term,
  location,
  value: { type: ValueType.Object, value: Array.from(new Map(elems)) },
})

export const arrayComprehensionTerm = (
  term: ITerm,
  body: IBody,
  location: Location
): ITerm => ({
  type: NodeType.Term,
  location,
  value: {
    type: ValueType.ArrayComprehension,
    value: { term, body },
  },
})

export const setComprehensionTerm = (
  term: ITerm,
  body: IBody,
  location: Location
): ITerm => ({
  type: NodeType.Term,
  location,
  value: {
    type: ValueType.SetComprehension,
    value: { term, body },
  },
})

export const objectComprehensionTerm = (
  key: ITerm,
  value: ITerm,
  body: IBody,
  location: Location
): ITerm => ({
  type: NodeType.Term,
  location,
  value: {
    type: ValueType.ObjectComprehension,
    value: { key, value, body },
  },
})

export const callTerm = (terms: ITerm[], location: Location): ITerm => ({
  type: NodeType.Term,
  location,
  value: { type: ValueType.Call, value: terms },
})

export function isRule(stmt: IStatement): stmt is IRule {
  return stmt.type === NodeType.Rule
}

export function isBody(stmt: IStatement): stmt is IBody {
  return stmt.type === NodeType.Body
}

export const valueType = (value: IValue): ValueType => {
  if (isScalarValue(value)) {
    return ValueType.Scalar
  } else {
    return value.type
  }
}

export function isScalarValue(value: IValue): value is IScalar {
  if (typeof value === 'object') {
    return false
  } else {
    return true
  }
}

export function isVarValue(value: IValue): value is IVar {
  return valueType(value) === ValueType.Var
}

export function isRefValue(value: IValue): value is IRef {
  return valueType(value) === ValueType.Ref
}

export function isArrayValue(value: IValue): value is IArray {
  return valueType(value) === ValueType.Array
}

export function isSetValue(value: IValue): value is ISet {
  return valueType(value) === ValueType.Set
}

export function isObjectValue(value: IValue): value is IObject {
  return valueType(value) === ValueType.Object
}

export function isArrayComprehensionValue(
  value: IValue
): value is IArrayComprehension {
  return valueType(value) === ValueType.ArrayComprehension
}

export function isSetComprehensionValue(
  value: IValue
): value is ISetComprehension {
  return valueType(value) === ValueType.SetComprehension
}

export function isObjectComprehensionValue(
  value: IValue
): value is IObjectComprehension {
  return valueType(value) === ValueType.ObjectComprehension
}

export function isCallValue(value: IValue): value is ICall {
  return valueType(value) === ValueType.Call
}
