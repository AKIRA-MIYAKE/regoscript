@{%
const moo = require('moo')
const i = require('./parser-internal')

const lexer = moo.compile(i.compileParam)
%}

@lexer lexer

Program -> _ (Stmt (_ Newline _ Stmt):*):? _ {%
  d => i.makeProgram(i.currentLocation(d), d[1])
%}

Stmt -> (Rules | Body) {% d => d[0][0] %}

Rules -> (DefaultRules | NormalRules) {% d => d[0][0] %}

DefaultRules -> %DEFAULT ws Var _ "=" _ Term {%
  d => i.makeDefaultRule(i.currentLocation(d), d[2], d[6])
%}

NormalRules -> RuleHead _ NonEmptyBraceEnclosedBody (_ RuleExt):* {%
  d => i.makeRule(i.currentLocation(d), d[0], d[2], d[3])
%}

RuleHead -> Var (_ "(" _ Args _  ")"):? ( _ "[" _ ExprTerm _ "]" _ ):? ( _ "=" _ ExprTerm ):? {%
  d => i.makeRuleHead(i.currentLocation(d), d[0], d[1], d[2], d[3])
%}

Args -> ExprTermList {%
  d => i.makeArgs(d[0])
%}

Else -> %ELSE (_ "=" _ Term):? _ NonEmptyBraceEnclosedBody {%
  d => i.makeRuleExt(i.currentLocation(d), d[1], d[3])
%}

RuleDup -> NonEmptyBraceEnclosedBody {%
  d => ({
    body: d[0],
    location: i.currentLocation(d),
  })
%}

RuleExt -> (Else | RuleDup) {% d => d[0][0] %}

Body -> (NonWhitespaceBody | BraceEnclosedBody) {% d => d[0][0] %}

NonEmptyBraceEnclosedBody -> "{" _ WhitespaceBody _ "}" {%
  d => i.makeBraceEnclosedBody(i.currentLocation(d), d[2])
%}

BraceEnclosedBody -> "{" _ WhitespaceBody:? _ "}" {%
  d => i.makeBraceEnclosedBody(i.currentLocation(d), d[2])
%}

WhitespaceBody -> Literal (WhitespaceLiteralSeparator _ Literal):* {%
  d => i.makeBody(d[0], d[1], 2)
%}

NonWhitespaceBody -> Literal (_ NonWhitespaceLiteralSeparator _ Literal):* {%
  d => i.makeBody(d[0], d[1], 3)
%}

WhitespaceLiteralSeparator ->
    Space:* NonWhitespaceLiteralSeparator Comment:? {% () => null %}
  | Comment:? Newline {% () => null %}

NonWhitespaceLiteralSeparator -> ";" {% () => null %}

Literal -> NotKeyword LiteralExpr WithKeywordList:? {%
  d => i.makeLiteral(d[0], d[1], d[2])
%}

LiteralExpr -> ExprTerm (_ LiteralExprOperator _ ExprTerm):? {%
  d => i.makeLiteralExpr(i.currentLocation(d), d[0], d[1])
%}

LiteralExprOperator -> ("=" | ":=") {%
  ([d]) => i.makeInfixOperator(i.currentLocation(d), d[0].text)
%}

NotKeyword -> (%NOT ws):? {% d => (d[0] !== null) ? true : false %}

WithKeywordList -> ws WithKeyword (ws WithKeyword):* {%
  d => i.makeWithKeywordList(d[1], d[2])
%}

WithKeyword -> %WITH ws ExprTerm ws %AS ws ExprTerm {%
  d => i.makeWithKeyword(i.currentLocation(d), d[2], d[6])
%}

ExprTerm -> RelationExpr (_ RelationOperator _ RelationExpr):* {%
  d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
%}

ExprTermPairList -> ExprTermPair:? (_ "," _ ExprTermPair):* _ ",":? {%
  d => i.makeExprTermPairList(d[0], d[1])
%}

ExprTermList -> ExprTerm:? (_ "," _ ExprTerm):* _ ",":? {%
  d => i.makeExprTermList(d[0], d[1])
%}

ExprTermPair -> ExprTerm _ ":" _ ExprTerm {%
  d => i.makeExprTermPair(d[0], d[4])
%}

RelationOperator -> %RELATION_OPERATOR {%
  d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
%}

RelationExpr -> BitwiseOrExpr (_ BitwiseOrOperator _ BitwiseOrExpr):* {%
  d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
%}

BitwiseOrOperator -> %BITWISE_OR_OPERATOR {%
  d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
%}

BitwiseOrExpr -> BitwiseAndExpr (_ BitwiseAndOperator _ BitwiseAndExpr):* {%
  d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
%}

BitwiseAndOperator -> %BITWISE_AND_OPERATOR {%
  d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
%}

BitwiseAndExpr -> ArithExpr (_ ArithOperator _ ArithExpr):* {%
  d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
%}

ArithOperator -> %ARITH_OPERATOR {%
  d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
%}

ArithExpr -> FactorExpr (_ FactorOperator _ FactorExpr):* {%
  d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
%}

FactorOperator -> %FACTOR_OPERATOR {%
  d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
%}

FactorExpr -> ("(" _ ExprTerm _ ")" | Term) {% d => d[0][0] %}

Call -> (Ref | Var) "(" _ ExprTermList _ ")" {%
  d => i.makeCall(i.currentLocation(d), d[0][0], d[3])
%}

Term -> (Comprehension | Composit | Scalar | Call | Ref | Var) {%
  d => d[0][0]
%}

TermPair -> Term _ ":" _ Term {%
  d => i.makeExprTermPair(d[0], d[4])
%}

Comprehension -> (ArrayComprehension | ObjectComprehension | SetComprehension) {% d => d[0][0] %}

ArrayComprehension -> "[" _ Term _ "|" _ WhitespaceBody _ "]" {%
  d => i.makeArrayComprehension(i.currentLocation(d), d[2], d[6])
%}

ObjectComprehension -> "{" _ TermPair _ "|" _ WhitespaceBody _ "}" {%
  d => i.makeObjectComprehension(i.currentLocation(d), d[2], d[6])
%}

SetComprehension -> "{" _ Term _ "|" _ WhitespaceBody _ "}" {%
  d => i.makeSetComprehension(i.currentLocation(d), d[2], d[6])
%}

Composit -> (Object | Array | Set) {% d => d[0][0] %}

Scalar -> (Number | String | Bool | Null) {% d => d[0][0] %}

Object -> "{" _ ExprTermPairList _ "}" {%
  d => i.makeObject(i.currentLocation(d), d[2])
%}

Array -> "[" _ ExprTermList _ "]" {%
  d => i.makeArray(i.currentLocation(d), d[2])
%}

Set -> (SetEmpty | SetNonEmpty) {% d => d[0][0] %}

SetEmpty -> "set(" _ ")" {%
  d => i.makeSet(i.currentLocation(d), [])
%}

SetNonEmpty -> "{" _ ExprTermList _ "}" {%
  d => i.makeSet(i.currentLocation(d), d[2])
%}

Ref -> Var RefOperand:+ {%
  d => i.makeRef(i.currentLocation(d), d[0], d[1])
%}

RefOperand -> (RefOperandDot | RefOperandCanonical) {% d => d[0][0] %}

RefOperandDot -> "." Var {%
  d => i.makeRefOperandDot(i.currentLocation(d), d[1])
%}

RefOperandCanonical -> "[" ExprTerm "]" {%
  d => d[1]
%}

Var -> %VAR {%
  d => i.makeVar(i.currentLocation(d), d[0].text)
%}

Number -> %NUMBER {%
  d => i.makeNumber(i.currentLocation(d), d[0].text)
%}

String -> %STRING {%
  d => i.makeString(i.currentLocation(d), d[0].text)
%}

Bool -> (%TRUE | %FALSE) {%
  ([d]) => i.makeBool(i.currentLocation(d), d[0].text)
%}

Null -> %NULL {%
  d => i.makeNull(i.currentLocation(d))
%}

ws -> Whitespace:+ {% () => null %}
_ -> (Whitespace | Comment):* {% () => null %}

Comment -> %COMMENT {% () => null %}

Whitespace -> (Space | Newline) {% () => null %}
Newline -> %NEWLINE {% () => null %}
Space -> %SPACE {% () => null %}
