import { Location, NodeType, ValueType, IProgram, IRule, IHead, IArgs, IBody, IExpr, IWith, ITerm, IScalar, IVar, IRef, IArray, ISet, IObject, IArrayComprehension, ISetComprehension, IObjectComprehension, ICall } from '../ast/interfaces';
export declare class RegoProgram implements IProgram {
    static fromData(data: IProgram): RegoProgram;
    type: NodeType.Program;
    location: Location;
    statements: Array<RegoStatement>;
    constructor(location: Location, statements: Array<RegoStatement>);
}
export declare type RegoStatement = RegoRule | RegoBody;
export declare class RegoRule implements IRule {
    static fromData(data: IRule): RegoRule;
    type: NodeType.Rule;
    location: Location;
    default: boolean;
    head: RegoHead;
    body: RegoBody;
    else?: RegoRule;
    constructor(location: Location, defaultFlag: boolean, head: RegoHead, body: RegoBody, elseRule?: RegoRule);
}
export declare class RegoHead implements IHead {
    static fromData(data: IHead): RegoHead;
    type: NodeType.Head;
    location: Location;
    name: string;
    args?: RegoArgs;
    key?: RegoTerm;
    value?: RegoTerm;
    constructor(location: Location, name: string, args?: RegoArgs, key?: RegoTerm, value?: RegoTerm);
}
export declare class RegoArgs implements IArgs {
    static fromData(data: IArgs): RegoArgs;
    type: NodeType.Args;
    value: Array<RegoTerm>;
    constructor(value: Array<RegoTerm>);
}
export declare class RegoBody implements IBody {
    static fromData(data: IBody): RegoBody;
    type: NodeType.Body;
    location: Location;
    value: Array<RegoExpr>;
    constructor(location: Location, value: Array<RegoExpr>);
}
export declare class RegoExpr implements IExpr {
    static fromData(data: IExpr): RegoExpr;
    type: NodeType.Epxr;
    location: Location;
    negated: boolean;
    terms: Array<RegoTerm>;
    with: Array<RegoWith>;
    constructor(location: Location, negated: boolean, terms: Array<RegoTerm>, withs: Array<RegoWith>);
}
export declare class RegoWith implements IWith {
    static fromData(data: IWith): RegoWith;
    type: NodeType.With;
    location: Location;
    target: RegoTerm;
    value: RegoTerm;
    constructor(location: Location, target: RegoTerm, value: RegoTerm);
}
export declare class RegoTerm implements ITerm {
    static fromData(data: ITerm): RegoTerm;
    type: NodeType.Term;
    location: Location;
    value: RegoValue;
    constructor(location: Location, value: RegoValue);
}
export declare type RegoValue = RegoScalar | RegoVar | RegoRef | RegoArray | RegoSet | RegoObject | RegoArrayComprehension | RegoSetComprehension | RegoObjectComprehension | RegoCall;
export declare type RegoScalar = IScalar;
export declare class RegoVar implements IVar {
    static fromData(data: IVar): RegoVar;
    type: ValueType.Var;
    value: string;
    constructor(value: string);
}
export declare class RegoRef implements IRef {
    static fromData(data: IRef): RegoRef;
    type: ValueType.Ref;
    value: Array<RegoTerm>;
    constructor(value: Array<RegoTerm>);
}
export declare class RegoArray implements IArray {
    static fromData(data: IArray): RegoArray;
    type: ValueType.Array;
    value: Array<RegoTerm>;
    constructor(value: Array<RegoTerm>);
}
export declare class RegoSet implements ISet {
    static fromData(data: ISet): RegoSet;
    type: ValueType.Set;
    value: Array<RegoTerm>;
    constructor(value: Array<RegoTerm>);
}
export declare class RegoObject implements IObject {
    static fromData(data: IObject): RegoObject;
    type: ValueType.Object;
    value: Array<[RegoTerm, RegoTerm]>;
    constructor(value: Array<[RegoTerm, RegoTerm]>);
}
export declare class RegoArrayComprehension implements IArrayComprehension {
    static fromData(data: IArrayComprehension): RegoArrayComprehension;
    type: ValueType.ArrayComprehension;
    value: {
        term: RegoTerm;
        body: RegoBody;
    };
    constructor(value: {
        term: RegoTerm;
        body: RegoBody;
    });
}
export declare class RegoSetComprehension implements ISetComprehension {
    static fromData(data: ISetComprehension): RegoSetComprehension;
    type: ValueType.SetComprehension;
    value: {
        term: RegoTerm;
        body: RegoBody;
    };
    constructor(value: {
        term: RegoTerm;
        body: RegoBody;
    });
}
export declare class RegoObjectComprehension implements IObjectComprehension {
    static fromData(data: IObjectComprehension): RegoObjectComprehension;
    type: ValueType.ObjectComprehension;
    value: {
        key: RegoTerm;
        value: RegoTerm;
        body: RegoBody;
    };
    constructor(value: {
        key: RegoTerm;
        value: RegoTerm;
        body: RegoBody;
    });
}
export declare class RegoCall implements ICall {
    static fromData(data: ICall): RegoCall;
    type: ValueType.Call;
    value: Array<RegoTerm>;
    constructor(value: Array<RegoTerm>);
}
//# sourceMappingURL=index.d.ts.map