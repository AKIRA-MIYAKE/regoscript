export interface Location {
    row: number;
    col: number;
}
export declare enum NodeType {
    Program = "Program",
    Rule = "Rule",
    Head = "Head",
    Args = "Args",
    Body = "Body",
    Epxr = "Expr",
    With = "With",
    Term = "Term"
}
export declare enum ValueType {
    Scalar = "Scalar",
    Var = "Var",
    Ref = "Ref",
    Array = "Array",
    Set = "Set",
    Object = "Object",
    ArrayComprehension = "ArrayComprehension",
    SetComprehension = "SetComprehension",
    ObjectComprehension = "ObjectComprehension",
    Call = "Call"
}
export interface IProgram {
    type: NodeType.Program;
    location: Location;
    statements: Array<IStatement>;
}
export declare type IStatement = IRule | IBody;
export interface IRule {
    type: NodeType.Rule;
    location: Location;
    default: boolean;
    head: IHead;
    body: IBody;
    else?: IRule;
}
export interface IRuleExt {
    location: Location;
    term?: ITerm;
    body: IBody;
}
export interface IHead {
    type: NodeType.Head;
    location: Location;
    name: string;
    args?: IArgs;
    key?: ITerm;
    value?: ITerm;
}
export interface IArgs {
    type: NodeType.Args;
    value: Array<ITerm>;
}
export interface IBody {
    type: NodeType.Body;
    location: Location;
    value: Array<IExpr>;
}
export interface IExpr {
    type: NodeType.Epxr;
    location: Location;
    negated: boolean;
    terms: Array<ITerm>;
    with: Array<IWith>;
}
export interface IWith {
    type: NodeType.With;
    location: Location;
    target: ITerm;
    value: ITerm;
}
export interface ITerm {
    type: NodeType.Term;
    location: Location;
    value: IValue;
}
export declare type IValue = IScalar | IVar | IRef | IArray | ISet | IObject | IArrayComprehension | ISetComprehension | IObjectComprehension | ICall;
export declare type IScalar = null | boolean | number | string;
export interface IVar {
    type: ValueType.Var;
    value: string;
}
export interface IRef {
    type: ValueType.Ref;
    value: Array<ITerm>;
}
export interface IArray {
    type: ValueType.Array;
    value: Array<ITerm>;
}
export interface ISet {
    type: ValueType.Set;
    value: Array<ITerm>;
}
export interface IObject {
    type: ValueType.Object;
    value: Array<[ITerm, ITerm]>;
}
export interface IArrayComprehension {
    type: ValueType.ArrayComprehension;
    value: {
        term: ITerm;
        body: IBody;
    };
}
export interface ISetComprehension {
    type: ValueType.SetComprehension;
    value: {
        term: ITerm;
        body: IBody;
    };
}
export interface IObjectComprehension {
    type: ValueType.ObjectComprehension;
    value: {
        key: ITerm;
        value: ITerm;
        body: IBody;
    };
}
export interface ICall {
    type: ValueType.Call;
    value: Array<ITerm>;
}
export declare const newLocation: (row: number, col: number) => Location;
export declare const newBody: (exprs: IExpr[], location: Location) => IBody;
export declare const newExpr: (terms: ITerm[], location: Location) => IExpr;
export declare const newTerm: (value: IValue, location: Location) => ITerm;
export declare const nullTerm: (location: Location) => ITerm;
export declare const booleanTerm: (value: boolean, location: Location) => ITerm;
export declare const numberTerm: (value: number, location: Location) => ITerm;
export declare const stringTerm: (value: string, location: Location) => ITerm;
export declare const varTerm: (value: IVar, location: Location) => ITerm;
export declare const emptyRef: () => IRef;
export declare const refTerm: (terms: ITerm[], location: Location) => ITerm;
export declare const arrayTerm: (terms: ITerm[], location: Location) => ITerm;
export declare const setTerm: (terms: ITerm[], location: Location) => ITerm;
export declare const objectTerm: (elems: [ITerm, ITerm][], location: Location) => ITerm;
export declare const arrayComprehensionTerm: (term: ITerm, body: IBody, location: Location) => ITerm;
export declare const setComprehensionTerm: (term: ITerm, body: IBody, location: Location) => ITerm;
export declare const objectComprehensionTerm: (key: ITerm, value: ITerm, body: IBody, location: Location) => ITerm;
export declare const callTerm: (terms: ITerm[], location: Location) => ITerm;
export declare function isRule(stmt: IStatement): stmt is IRule;
export declare function isBody(stmt: IStatement): stmt is IBody;
export declare const valueType: (value: IValue) => ValueType;
export declare function isScalarValue(value: IValue): value is IScalar;
export declare function isVarValue(value: IValue): value is IVar;
export declare function isRefValue(value: IValue): value is IRef;
export declare function isArrayValue(value: IValue): value is IArray;
export declare function isSetValue(value: IValue): value is ISet;
export declare function isObjectValue(value: IValue): value is IObject;
export declare function isArrayComprehensionValue(value: IValue): value is IArrayComprehension;
export declare function isSetComprehensionValue(value: IValue): value is ISetComprehension;
export declare function isObjectComprehensionValue(value: IValue): value is IObjectComprehension;
export declare function isCallValue(value: IValue): value is ICall;
//# sourceMappingURL=interfaces.d.ts.map