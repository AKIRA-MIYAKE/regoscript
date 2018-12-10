// Generated automatically by nearley, version 2.15.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo')
const i = require('./parser-internal')

const lexer = moo.compile(i.compileParam)
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "Program$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "Program$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", "Newline", "_", "Stmt"]},
    {"name": "Program$ebnf$1$subexpression$1$ebnf$1", "symbols": ["Program$ebnf$1$subexpression$1$ebnf$1", "Program$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Program$ebnf$1$subexpression$1", "symbols": ["Stmt", "Program$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "Program$ebnf$1", "symbols": ["Program$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Program$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Program", "symbols": ["_", "Program$ebnf$1", "_"], "postprocess": 
        d => i.makeProgram(i.currentLocation(d), d[1])
        },
    {"name": "Stmt$subexpression$1", "symbols": ["Rules"]},
    {"name": "Stmt$subexpression$1", "symbols": ["Body"]},
    {"name": "Stmt", "symbols": ["Stmt$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "Rules$subexpression$1", "symbols": ["DefaultRules"]},
    {"name": "Rules$subexpression$1", "symbols": ["NormalRules"]},
    {"name": "Rules", "symbols": ["Rules$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "DefaultRules", "symbols": [(lexer.has("DEFAULT") ? {type: "DEFAULT"} : DEFAULT), "ws", "Var", "_", {"literal":"="}, "_", "Term"], "postprocess": 
        d => i.makeDefaultRule(i.currentLocation(d), d[2], d[6])
        },
    {"name": "NormalRules$ebnf$1", "symbols": []},
    {"name": "NormalRules$ebnf$1$subexpression$1", "symbols": ["_", "RuleExt"]},
    {"name": "NormalRules$ebnf$1", "symbols": ["NormalRules$ebnf$1", "NormalRules$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NormalRules", "symbols": ["RuleHead", "_", "NonEmptyBraceEnclosedBody", "NormalRules$ebnf$1"], "postprocess": 
        d => i.makeRule(i.currentLocation(d), d[0], d[2], d[3])
        },
    {"name": "RuleHead$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"("}, "_", "Args", "_", {"literal":")"}]},
    {"name": "RuleHead$ebnf$1", "symbols": ["RuleHead$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "RuleHead$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RuleHead$ebnf$2$subexpression$1", "symbols": ["_", {"literal":"["}, "_", "ExprTerm", "_", {"literal":"]"}, "_"]},
    {"name": "RuleHead$ebnf$2", "symbols": ["RuleHead$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "RuleHead$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RuleHead$ebnf$3$subexpression$1", "symbols": ["_", {"literal":"="}, "_", "ExprTerm"]},
    {"name": "RuleHead$ebnf$3", "symbols": ["RuleHead$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "RuleHead$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "RuleHead", "symbols": ["Var", "RuleHead$ebnf$1", "RuleHead$ebnf$2", "RuleHead$ebnf$3"], "postprocess": 
        d => i.makeRuleHead(i.currentLocation(d), d[0], d[1], d[2], d[3])
        },
    {"name": "Args", "symbols": ["ExprTermList"], "postprocess": 
        d => i.makeArgs(d[0])
        },
    {"name": "Else$ebnf$1$subexpression$1", "symbols": ["_", {"literal":"="}, "_", "Term"]},
    {"name": "Else$ebnf$1", "symbols": ["Else$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "Else$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Else", "symbols": [(lexer.has("ELSE") ? {type: "ELSE"} : ELSE), "Else$ebnf$1", "_", "NonEmptyBraceEnclosedBody"], "postprocess": 
        d => i.makeRuleExt(i.currentLocation(d), d[1], d[3])
        },
    {"name": "RuleDup", "symbols": ["NonEmptyBraceEnclosedBody"], "postprocess": 
        d => ({
          body: d[0],
          location: i.currentLocation(d),
        })
        },
    {"name": "RuleExt$subexpression$1", "symbols": ["Else"]},
    {"name": "RuleExt$subexpression$1", "symbols": ["RuleDup"]},
    {"name": "RuleExt", "symbols": ["RuleExt$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "Body$subexpression$1", "symbols": ["NonWhitespaceBody"]},
    {"name": "Body$subexpression$1", "symbols": ["BraceEnclosedBody"]},
    {"name": "Body", "symbols": ["Body$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "NonEmptyBraceEnclosedBody", "symbols": [{"literal":"{"}, "_", "WhitespaceBody", "_", {"literal":"}"}], "postprocess": 
        d => i.makeBraceEnclosedBody(i.currentLocation(d), d[2])
        },
    {"name": "BraceEnclosedBody$ebnf$1", "symbols": ["WhitespaceBody"], "postprocess": id},
    {"name": "BraceEnclosedBody$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "BraceEnclosedBody", "symbols": [{"literal":"{"}, "_", "BraceEnclosedBody$ebnf$1", "_", {"literal":"}"}], "postprocess": 
        d => i.makeBraceEnclosedBody(i.currentLocation(d), d[2])
        },
    {"name": "WhitespaceBody$ebnf$1", "symbols": []},
    {"name": "WhitespaceBody$ebnf$1$subexpression$1", "symbols": ["WhitespaceLiteralSeparator", "_", "Literal"]},
    {"name": "WhitespaceBody$ebnf$1", "symbols": ["WhitespaceBody$ebnf$1", "WhitespaceBody$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WhitespaceBody", "symbols": ["Literal", "WhitespaceBody$ebnf$1"], "postprocess": 
        d => i.makeBody(d[0], d[1], 2)
        },
    {"name": "NonWhitespaceBody$ebnf$1", "symbols": []},
    {"name": "NonWhitespaceBody$ebnf$1$subexpression$1", "symbols": ["_", "NonWhitespaceLiteralSeparator", "_", "Literal"]},
    {"name": "NonWhitespaceBody$ebnf$1", "symbols": ["NonWhitespaceBody$ebnf$1", "NonWhitespaceBody$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "NonWhitespaceBody", "symbols": ["Literal", "NonWhitespaceBody$ebnf$1"], "postprocess": 
        d => i.makeBody(d[0], d[1], 3)
        },
    {"name": "WhitespaceLiteralSeparator$ebnf$1", "symbols": []},
    {"name": "WhitespaceLiteralSeparator$ebnf$1", "symbols": ["WhitespaceLiteralSeparator$ebnf$1", "Space"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WhitespaceLiteralSeparator$ebnf$2", "symbols": ["Comment"], "postprocess": id},
    {"name": "WhitespaceLiteralSeparator$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "WhitespaceLiteralSeparator", "symbols": ["WhitespaceLiteralSeparator$ebnf$1", "NonWhitespaceLiteralSeparator", "WhitespaceLiteralSeparator$ebnf$2"], "postprocess": () => null},
    {"name": "WhitespaceLiteralSeparator$ebnf$3", "symbols": ["Comment"], "postprocess": id},
    {"name": "WhitespaceLiteralSeparator$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "WhitespaceLiteralSeparator", "symbols": ["WhitespaceLiteralSeparator$ebnf$3", "Newline"], "postprocess": () => null},
    {"name": "NonWhitespaceLiteralSeparator", "symbols": [{"literal":";"}], "postprocess": () => null},
    {"name": "Literal$ebnf$1", "symbols": ["WithKeywordList"], "postprocess": id},
    {"name": "Literal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Literal", "symbols": ["NotKeyword", "LiteralExpr", "Literal$ebnf$1"], "postprocess": 
        d => i.makeLiteral(d[0], d[1], d[2])
        },
    {"name": "LiteralExpr$ebnf$1$subexpression$1", "symbols": ["_", "LiteralExprOperator", "_", "ExprTerm"]},
    {"name": "LiteralExpr$ebnf$1", "symbols": ["LiteralExpr$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "LiteralExpr$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "LiteralExpr", "symbols": ["ExprTerm", "LiteralExpr$ebnf$1"], "postprocess": 
        d => i.makeLiteralExpr(i.currentLocation(d), d[0], d[1])
        },
    {"name": "LiteralExprOperator$subexpression$1", "symbols": [{"literal":"="}]},
    {"name": "LiteralExprOperator$subexpression$1", "symbols": [{"literal":":="}]},
    {"name": "LiteralExprOperator", "symbols": ["LiteralExprOperator$subexpression$1"], "postprocess": 
        ([d]) => i.makeInfixOperator(i.currentLocation(d), d[0].text)
        },
    {"name": "NotKeyword$ebnf$1$subexpression$1", "symbols": [(lexer.has("NOT") ? {type: "NOT"} : NOT), "ws"]},
    {"name": "NotKeyword$ebnf$1", "symbols": ["NotKeyword$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "NotKeyword$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "NotKeyword", "symbols": ["NotKeyword$ebnf$1"], "postprocess": d => (d[0] !== null) ? true : false},
    {"name": "WithKeywordList$ebnf$1", "symbols": []},
    {"name": "WithKeywordList$ebnf$1$subexpression$1", "symbols": ["ws", "WithKeyword"]},
    {"name": "WithKeywordList$ebnf$1", "symbols": ["WithKeywordList$ebnf$1", "WithKeywordList$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "WithKeywordList", "symbols": ["ws", "WithKeyword", "WithKeywordList$ebnf$1"], "postprocess": 
        d => i.makeWithKeywordList(d[1], d[2])
        },
    {"name": "WithKeyword", "symbols": [(lexer.has("WITH") ? {type: "WITH"} : WITH), "ws", "ExprTerm", "ws", (lexer.has("AS") ? {type: "AS"} : AS), "ws", "ExprTerm"], "postprocess": 
        d => i.makeWithKeyword(i.currentLocation(d), d[2], d[6])
        },
    {"name": "ExprTerm$ebnf$1", "symbols": []},
    {"name": "ExprTerm$ebnf$1$subexpression$1", "symbols": ["_", "RelationOperator", "_", "RelationExpr"]},
    {"name": "ExprTerm$ebnf$1", "symbols": ["ExprTerm$ebnf$1", "ExprTerm$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ExprTerm", "symbols": ["RelationExpr", "ExprTerm$ebnf$1"], "postprocess": 
        d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
        },
    {"name": "ExprTermPairList$ebnf$1", "symbols": ["ExprTermPair"], "postprocess": id},
    {"name": "ExprTermPairList$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprTermPairList$ebnf$2", "symbols": []},
    {"name": "ExprTermPairList$ebnf$2$subexpression$1", "symbols": ["_", {"literal":","}, "_", "ExprTermPair"]},
    {"name": "ExprTermPairList$ebnf$2", "symbols": ["ExprTermPairList$ebnf$2", "ExprTermPairList$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ExprTermPairList$ebnf$3", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "ExprTermPairList$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprTermPairList", "symbols": ["ExprTermPairList$ebnf$1", "ExprTermPairList$ebnf$2", "_", "ExprTermPairList$ebnf$3"], "postprocess": 
        d => i.makeExprTermPairList(d[0], d[1])
        },
    {"name": "ExprTermList$ebnf$1", "symbols": ["ExprTerm"], "postprocess": id},
    {"name": "ExprTermList$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprTermList$ebnf$2", "symbols": []},
    {"name": "ExprTermList$ebnf$2$subexpression$1", "symbols": ["_", {"literal":","}, "_", "ExprTerm"]},
    {"name": "ExprTermList$ebnf$2", "symbols": ["ExprTermList$ebnf$2", "ExprTermList$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ExprTermList$ebnf$3", "symbols": [{"literal":","}], "postprocess": id},
    {"name": "ExprTermList$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ExprTermList", "symbols": ["ExprTermList$ebnf$1", "ExprTermList$ebnf$2", "_", "ExprTermList$ebnf$3"], "postprocess": 
        d => i.makeExprTermList(d[0], d[1])
        },
    {"name": "ExprTermPair", "symbols": ["ExprTerm", "_", {"literal":":"}, "_", "ExprTerm"], "postprocess": 
        d => i.makeExprTermPair(d[0], d[4])
        },
    {"name": "RelationOperator", "symbols": [(lexer.has("RELATION_OPERATOR") ? {type: "RELATION_OPERATOR"} : RELATION_OPERATOR)], "postprocess": 
        d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
        },
    {"name": "RelationExpr$ebnf$1", "symbols": []},
    {"name": "RelationExpr$ebnf$1$subexpression$1", "symbols": ["_", "BitwiseOrOperator", "_", "BitwiseOrExpr"]},
    {"name": "RelationExpr$ebnf$1", "symbols": ["RelationExpr$ebnf$1", "RelationExpr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "RelationExpr", "symbols": ["BitwiseOrExpr", "RelationExpr$ebnf$1"], "postprocess": 
        d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
        },
    {"name": "BitwiseOrOperator", "symbols": [(lexer.has("BITWISE_OR_OPERATOR") ? {type: "BITWISE_OR_OPERATOR"} : BITWISE_OR_OPERATOR)], "postprocess": 
        d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
        },
    {"name": "BitwiseOrExpr$ebnf$1", "symbols": []},
    {"name": "BitwiseOrExpr$ebnf$1$subexpression$1", "symbols": ["_", "BitwiseAndOperator", "_", "BitwiseAndExpr"]},
    {"name": "BitwiseOrExpr$ebnf$1", "symbols": ["BitwiseOrExpr$ebnf$1", "BitwiseOrExpr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "BitwiseOrExpr", "symbols": ["BitwiseAndExpr", "BitwiseOrExpr$ebnf$1"], "postprocess": 
        d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
        },
    {"name": "BitwiseAndOperator", "symbols": [(lexer.has("BITWISE_AND_OPERATOR") ? {type: "BITWISE_AND_OPERATOR"} : BITWISE_AND_OPERATOR)], "postprocess": 
        d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
        },
    {"name": "BitwiseAndExpr$ebnf$1", "symbols": []},
    {"name": "BitwiseAndExpr$ebnf$1$subexpression$1", "symbols": ["_", "ArithOperator", "_", "ArithExpr"]},
    {"name": "BitwiseAndExpr$ebnf$1", "symbols": ["BitwiseAndExpr$ebnf$1", "BitwiseAndExpr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "BitwiseAndExpr", "symbols": ["ArithExpr", "BitwiseAndExpr$ebnf$1"], "postprocess": 
        d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
        },
    {"name": "ArithOperator", "symbols": [(lexer.has("ARITH_OPERATOR") ? {type: "ARITH_OPERATOR"} : ARITH_OPERATOR)], "postprocess": 
        d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
        },
    {"name": "ArithExpr$ebnf$1", "symbols": []},
    {"name": "ArithExpr$ebnf$1$subexpression$1", "symbols": ["_", "FactorOperator", "_", "FactorExpr"]},
    {"name": "ArithExpr$ebnf$1", "symbols": ["ArithExpr$ebnf$1", "ArithExpr$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ArithExpr", "symbols": ["FactorExpr", "ArithExpr$ebnf$1"], "postprocess": 
        d => i.makeExprTerm(i.currentLocation(d), d[0], d[1])
        },
    {"name": "FactorOperator", "symbols": [(lexer.has("FACTOR_OPERATOR") ? {type: "FACTOR_OPERATOR"} : FACTOR_OPERATOR)], "postprocess": 
        d => i.makeInfixOperator(i.currentLocation(d), d[0].text)
        },
    {"name": "FactorExpr$subexpression$1", "symbols": [{"literal":"("}, "_", "ExprTerm", "_", {"literal":")"}]},
    {"name": "FactorExpr$subexpression$1", "symbols": ["Term"]},
    {"name": "FactorExpr", "symbols": ["FactorExpr$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "Call$subexpression$1", "symbols": ["Ref"]},
    {"name": "Call$subexpression$1", "symbols": ["Var"]},
    {"name": "Call", "symbols": ["Call$subexpression$1", {"literal":"("}, "_", "ExprTermList", "_", {"literal":")"}], "postprocess": 
        d => i.makeCall(i.currentLocation(d), d[0][0], d[3])
        },
    {"name": "Term$subexpression$1", "symbols": ["Comprehension"]},
    {"name": "Term$subexpression$1", "symbols": ["Composit"]},
    {"name": "Term$subexpression$1", "symbols": ["Scalar"]},
    {"name": "Term$subexpression$1", "symbols": ["Call"]},
    {"name": "Term$subexpression$1", "symbols": ["Ref"]},
    {"name": "Term$subexpression$1", "symbols": ["Var"]},
    {"name": "Term", "symbols": ["Term$subexpression$1"], "postprocess": 
        d => d[0][0]
        },
    {"name": "TermPair", "symbols": ["Term", "_", {"literal":":"}, "_", "Term"], "postprocess": 
        d => i.makeExprTermPair(d[0], d[4])
        },
    {"name": "Comprehension$subexpression$1", "symbols": ["ArrayComprehension"]},
    {"name": "Comprehension$subexpression$1", "symbols": ["ObjectComprehension"]},
    {"name": "Comprehension$subexpression$1", "symbols": ["SetComprehension"]},
    {"name": "Comprehension", "symbols": ["Comprehension$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "ArrayComprehension", "symbols": [{"literal":"["}, "_", "Term", "_", {"literal":"|"}, "_", "WhitespaceBody", "_", {"literal":"]"}], "postprocess": 
        d => i.makeArrayComprehension(i.currentLocation(d), d[2], d[6])
        },
    {"name": "ObjectComprehension", "symbols": [{"literal":"{"}, "_", "TermPair", "_", {"literal":"|"}, "_", "WhitespaceBody", "_", {"literal":"}"}], "postprocess": 
        d => i.makeObjectComprehension(i.currentLocation(d), d[2], d[6])
        },
    {"name": "SetComprehension", "symbols": [{"literal":"{"}, "_", "Term", "_", {"literal":"|"}, "_", "WhitespaceBody", "_", {"literal":"}"}], "postprocess": 
        d => i.makeSetComprehension(i.currentLocation(d), d[2], d[6])
        },
    {"name": "Composit$subexpression$1", "symbols": ["Object"]},
    {"name": "Composit$subexpression$1", "symbols": ["Array"]},
    {"name": "Composit$subexpression$1", "symbols": ["Set"]},
    {"name": "Composit", "symbols": ["Composit$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "Scalar$subexpression$1", "symbols": ["Number"]},
    {"name": "Scalar$subexpression$1", "symbols": ["String"]},
    {"name": "Scalar$subexpression$1", "symbols": ["Bool"]},
    {"name": "Scalar$subexpression$1", "symbols": ["Null"]},
    {"name": "Scalar", "symbols": ["Scalar$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "Object", "symbols": [{"literal":"{"}, "_", "ExprTermPairList", "_", {"literal":"}"}], "postprocess": 
        d => i.makeObject(i.currentLocation(d), d[2])
        },
    {"name": "Array", "symbols": [{"literal":"["}, "_", "ExprTermList", "_", {"literal":"]"}], "postprocess": 
        d => i.makeArray(i.currentLocation(d), d[2])
        },
    {"name": "Set$subexpression$1", "symbols": ["SetEmpty"]},
    {"name": "Set$subexpression$1", "symbols": ["SetNonEmpty"]},
    {"name": "Set", "symbols": ["Set$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "SetEmpty", "symbols": [{"literal":"set("}, "_", {"literal":")"}], "postprocess": 
        d => i.makeSet(i.currentLocation(d), [])
        },
    {"name": "SetNonEmpty", "symbols": [{"literal":"{"}, "_", "ExprTermList", "_", {"literal":"}"}], "postprocess": 
        d => i.makeSet(i.currentLocation(d), d[2])
        },
    {"name": "Ref$ebnf$1", "symbols": ["RefOperand"]},
    {"name": "Ref$ebnf$1", "symbols": ["Ref$ebnf$1", "RefOperand"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "Ref", "symbols": ["Var", "Ref$ebnf$1"], "postprocess": 
        d => i.makeRef(i.currentLocation(d), d[0], d[1])
        },
    {"name": "RefOperand$subexpression$1", "symbols": ["RefOperandDot"]},
    {"name": "RefOperand$subexpression$1", "symbols": ["RefOperandCanonical"]},
    {"name": "RefOperand", "symbols": ["RefOperand$subexpression$1"], "postprocess": d => d[0][0]},
    {"name": "RefOperandDot", "symbols": [{"literal":"."}, "Var"], "postprocess": 
        d => i.makeRefOperandDot(i.currentLocation(d), d[1])
        },
    {"name": "RefOperandCanonical", "symbols": [{"literal":"["}, "ExprTerm", {"literal":"]"}], "postprocess": 
        d => d[1]
        },
    {"name": "Var", "symbols": [(lexer.has("VAR") ? {type: "VAR"} : VAR)], "postprocess": 
        d => i.makeVar(i.currentLocation(d), d[0].text)
        },
    {"name": "Number", "symbols": [(lexer.has("NUMBER") ? {type: "NUMBER"} : NUMBER)], "postprocess": 
        d => i.makeNumber(i.currentLocation(d), d[0].text)
        },
    {"name": "String", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": 
        d => i.makeString(i.currentLocation(d), d[0].text)
        },
    {"name": "Bool$subexpression$1", "symbols": [(lexer.has("TRUE") ? {type: "TRUE"} : TRUE)]},
    {"name": "Bool$subexpression$1", "symbols": [(lexer.has("FALSE") ? {type: "FALSE"} : FALSE)]},
    {"name": "Bool", "symbols": ["Bool$subexpression$1"], "postprocess": 
        ([d]) => i.makeBool(i.currentLocation(d), d[0].text)
        },
    {"name": "Null", "symbols": [(lexer.has("NULL") ? {type: "NULL"} : NULL)], "postprocess": 
        d => i.makeNull(i.currentLocation(d))
        },
    {"name": "ws$ebnf$1", "symbols": ["Whitespace"]},
    {"name": "ws$ebnf$1", "symbols": ["ws$ebnf$1", "Whitespace"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ws", "symbols": ["ws$ebnf$1"], "postprocess": () => null},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1$subexpression$1", "symbols": ["Whitespace"]},
    {"name": "_$ebnf$1$subexpression$1", "symbols": ["Comment"]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "_$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "Comment", "symbols": [(lexer.has("COMMENT") ? {type: "COMMENT"} : COMMENT)], "postprocess": () => null},
    {"name": "Whitespace$subexpression$1", "symbols": ["Space"]},
    {"name": "Whitespace$subexpression$1", "symbols": ["Newline"]},
    {"name": "Whitespace", "symbols": ["Whitespace$subexpression$1"], "postprocess": () => null},
    {"name": "Newline", "symbols": [(lexer.has("NEWLINE") ? {type: "NEWLINE"} : NEWLINE)], "postprocess": () => null},
    {"name": "Space", "symbols": [(lexer.has("SPACE") ? {type: "SPACE"} : SPACE)], "postprocess": () => null}
]
  , ParserStart: "Program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
