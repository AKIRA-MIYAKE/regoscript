import { Location, IProgram, IRule, IRuleExt, IHead, IArgs, IBody, IExpr, IWith, ITerm, IVar } from './interfaces';
export declare const compileParam: {
    SPACE: RegExp;
    NEWLINE: {
        match: RegExp;
        lineBreaks: boolean;
    };
    RELATION_OPERATOR: RegExp;
    BITWISE_OR_OPERATOR: string;
    BITWISE_AND_OPERATOR: string;
    ARITH_OPERATOR: RegExp;
    FACTOR_OPERATOR: RegExp;
    AS: string;
    DEFAULT: string;
    ELSE: string;
    FALSE: string;
    PACKAGE: string;
    NULL: string;
    NOT: string;
    TRUE: string;
    WITH: string;
    '=': string;
    ':=': string;
    'set(': string;
    '(': string;
    ')': string;
    '{': string;
    '}': string;
    '[': string;
    ']': string;
    ',': string;
    '.': string;
    ':': string;
    ';': string;
    VAR: RegExp;
    NUMBER: RegExp;
    STRING: RegExp;
    COMMENT: RegExp;
};
export declare const currentLocation: (input: any) => Location;
export declare const makeProgram: (loc: Location, stmts: any) => IProgram;
export declare const makeDefaultRule: (loc: Location, name: IVar, value: ITerm) => IRule[];
export declare const makeRule: (loc: Location, head: IHead, body: IBody, ruleExt: any) => IRule[];
export declare const makeRuleHead: (loc: Location, name: any, args: any, key: any, value: any) => IHead;
export declare const makeArgs: (list: ITerm[]) => IArgs;
export declare const makeRuleExt: (loc: Location, value: any, body: IBody) => IRuleExt;
export declare const makeLiteral: (negated: boolean, value: IExpr, withs: IWith[] | null) => IExpr;
export declare const makeLiteralExpr: (loc: Location, lhs: any, rest: any) => IExpr;
export declare const makeWithKeywordList: (head: IWith, tail: any) => IWith[];
export declare const makeWithKeyword: (loc: Location, target: ITerm, value: ITerm) => IWith;
export declare const makeExprTerm: (loc: Location, lhs: ITerm, rest: any) => ITerm;
export declare const makeCall: (loc: Location, operator: any, args: ITerm[]) => ITerm;
export declare const makeBraceEnclosedBody: (loc: Location, body: IBody | null) => IBody;
export declare const makeBody: (head: IExpr, tail: any, pos: number) => IBody;
export declare const makeExprTermList: (head: ITerm | null, tail: any) => ITerm[];
export declare const makeExprTermPairList: (head: [ITerm, ITerm] | null, tail: any) => [ITerm, ITerm][];
export declare const makeExprTermPair: (key: ITerm, value: ITerm) => [ITerm, ITerm];
export declare const makeInfixOperator: (loc: Location, text: string) => ITerm;
export declare const makeArray: (loc: Location, list: ITerm[]) => ITerm;
export declare const makeObject: (loc: Location, list: [ITerm, ITerm][]) => ITerm;
export declare const makeSet: (loc: Location, list: ITerm[]) => ITerm;
export declare const makeArrayComprehension: (loc: Location, head: ITerm, body: IBody) => ITerm;
export declare const makeSetComprehension: (loc: Location, head: ITerm, body: IBody) => ITerm;
export declare const makeObjectComprehension: (loc: Location, head: [ITerm, ITerm], body: IBody) => ITerm;
export declare const makeRef: (loc: Location, head: ITerm, rest: ITerm[]) => ITerm;
export declare const makeRefOperandDot: (loc: Location, value: IVar) => ITerm;
export declare const makeVar: (loc: Location, text: string) => ITerm;
export declare const makeNumber: (loc: Location, text: string) => ITerm;
export declare const makeString: (loc: Location, text: string) => ITerm;
export declare const makeBool: (loc: Location, text: string) => ITerm;
export declare const makeNull: (loc: Location) => ITerm;
//# sourceMappingURL=parser-internal.d.ts.map