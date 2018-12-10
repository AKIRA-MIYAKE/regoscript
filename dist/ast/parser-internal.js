"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
exports.compileParam = {
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
};
exports.currentLocation = function (input) {
    var flatten = function (arr) {
        var reducer = function (acc, current) {
            if (Array.isArray(current)) {
                return current.reduce(reducer, acc);
            }
            else {
                return acc.concat([current]);
            }
        };
        return arr.reduce(reducer, []);
    };
    var data = flatten(input).reduceRight(function (acc, current) {
        return current !== null ? current : acc;
    }, null);
    if (data === null) {
        return interfaces_1.newLocation(0, 0);
    }
    if (data.location) {
        return interfaces_1.newLocation(data.location.row, data.location.col);
    }
    else {
        return interfaces_1.newLocation(data.line, data.col);
    }
};
exports.makeProgram = function (loc, stmts) {
    if (stmts === null) {
        return {
            type: interfaces_1.NodeType.Program,
            location: loc,
            statements: [],
        };
    }
    var first = stmts[0];
    var statements = stmts[1].reduce(function (acc, current) {
        var stmt = current[3];
        if (Array.isArray(stmt)) {
            return acc.concat(stmt);
        }
        else {
            return acc.concat([stmt]);
        }
    }, Array.isArray(first) ? first.slice() : [first]);
    return {
        type: interfaces_1.NodeType.Program,
        location: loc,
        statements: statements,
    };
};
exports.makeDefaultRule = function (loc, name, value) { return [
    {
        type: interfaces_1.NodeType.Rule,
        location: loc,
        default: true,
        head: {
            type: interfaces_1.NodeType.Head,
            name: name.value,
            value: value,
            location: loc,
        },
        body: interfaces_1.newBody([interfaces_1.newExpr([interfaces_1.booleanTerm(true, loc)], loc)], loc),
    },
]; };
exports.makeRule = function (loc, head, body, ruleExt) {
    var rules = [
        {
            type: interfaces_1.NodeType.Rule,
            location: loc,
            default: false,
            head: head,
            body: body,
        },
    ];
    var prev = rules[0];
    ruleExt.forEach(function (elem, i) {
        var re = elem[1];
        if (!re.term) {
            rules.push({
                type: interfaces_1.NodeType.Rule,
                location: re.location,
                default: false,
                head: prev.head,
                body: re.body,
            });
        }
        else {
            var curr = {
                type: interfaces_1.NodeType.Rule,
                location: re.location,
                default: false,
                head: {
                    type: interfaces_1.NodeType.Head,
                    location: re.location,
                    name: prev.head.name,
                    args: prev.head.args,
                    value: re.term,
                },
                body: re.body,
            };
            prev.else = curr;
            prev = curr;
        }
    });
    return rules;
};
exports.makeRuleHead = function (loc, name, args, key, value) {
    var head = {
        type: interfaces_1.NodeType.Head,
        location: loc,
        name: name.value.value,
    };
    if (args !== null && key !== null) {
        throw new Error('partial rules cannot take arguments');
    }
    if (args !== null) {
        head.args = args[3];
    }
    if (key !== null) {
        head.key = key[3];
    }
    if (value !== null) {
        head.value = value[3];
    }
    if (key === null && value === null) {
        head.value = interfaces_1.booleanTerm(true, loc);
    }
    if (head.key && head.value) {
        var _head = head;
        if (!_head.key.value.type || typeof _head.key.value !== 'string') {
            throw new Error('object key must be string, var, or ref');
        }
        else if (_head.key.value.type !== 'Var' &&
            _head.key.value.type !== 'Ref') {
            throw new Error('object key must be string, var, or ref');
        }
    }
    return head;
};
exports.makeArgs = function (list) { return ({
    type: interfaces_1.NodeType.Args,
    value: list,
}); };
exports.makeRuleExt = function (loc, value, body) {
    var term;
    if (value === null) {
        term = interfaces_1.booleanTerm(true, loc);
    }
    else {
        term = value[3];
    }
    return {
        location: loc,
        term: term,
        body: body,
    };
};
exports.makeLiteral = function (negated, value, withs) {
    value.negated = negated;
    if (withs !== null) {
        value.with = withs;
    }
    return value;
};
exports.makeLiteralExpr = function (loc, lhs, rest) {
    if (rest === null) {
        return interfaces_1.newExpr([lhs], lhs.location);
    }
    else {
        var terms = [rest[1], lhs, rest[3]];
        return interfaces_1.newExpr(terms, loc);
    }
};
exports.makeWithKeywordList = function (head, tail) {
    return tail.reduce(function (acc, current) {
        return acc.concat([current[1]]);
    }, [head]);
};
exports.makeWithKeyword = function (loc, target, value) { return ({
    type: interfaces_1.NodeType.With,
    location: loc,
    target: target,
    value: value,
}); };
exports.makeExprTerm = function (loc, lhs, rest) {
    if (rest === null) {
        return lhs;
    }
    else {
        var _lhs_1 = lhs;
        rest.forEach(function (termSlice) {
            var call = {
                type: interfaces_1.ValueType.Call,
                value: [termSlice[1], _lhs_1, termSlice[3]],
            };
            _lhs_1 = interfaces_1.newTerm(call, loc);
        });
        return _lhs_1;
    }
};
exports.makeCall = function (loc, operator, args) {
    var termOperator = operator;
    if (interfaces_1.isVarValue(termOperator.value)) {
        termOperator = interfaces_1.refTerm([termOperator], termOperator.location);
    }
    var call = {
        type: interfaces_1.ValueType.Call,
        value: [termOperator].concat(args),
    };
    return interfaces_1.newTerm(call, loc);
};
exports.makeBraceEnclosedBody = function (loc, body) {
    return body !== null ? body : interfaces_1.newBody([interfaces_1.newExpr([interfaces_1.objectTerm([], loc)], loc)], loc);
};
exports.makeBody = function (head, tail, pos) { return ({
    type: interfaces_1.NodeType.Body,
    location: head.location,
    value: tail.reduce(function (acc, current) {
        return acc.concat([current[pos]]);
    }, [head]),
}); };
exports.makeExprTermList = function (head, tail) {
    return head === null
        ? []
        : tail.reduce(function (acc, current) {
            return acc.concat([current[3]]);
        }, [head]);
};
exports.makeExprTermPairList = function (head, tail) {
    return head === null
        ? []
        : tail.reduce(function (acc, current) {
            return acc.concat([current[3]]);
        }, [head]);
};
exports.makeExprTermPair = function (key, value) { return [
    key,
    value,
]; };
exports.makeInfixOperator = function (loc, text) {
    return interfaces_1.refTerm([interfaces_1.varTerm({ type: interfaces_1.ValueType.Var, value: text }, loc)], loc);
};
exports.makeArray = function (loc, list) {
    return interfaces_1.arrayTerm(list, loc);
};
exports.makeObject = function (loc, list) {
    return interfaces_1.objectTerm(list, loc);
};
exports.makeSet = function (loc, list) {
    return interfaces_1.setTerm(list, loc);
};
exports.makeArrayComprehension = function (loc, head, body) { return interfaces_1.arrayComprehensionTerm(head, body, loc); };
exports.makeSetComprehension = function (loc, head, body) { return interfaces_1.setComprehensionTerm(head, body, loc); };
exports.makeObjectComprehension = function (loc, head, body) { return interfaces_1.objectComprehensionTerm(head[0], head[1], body, loc); };
exports.makeRef = function (loc, head, rest) {
    return interfaces_1.refTerm(rest.reduce(function (acc, current) {
        return acc.concat([current]);
    }, [head]), loc);
};
exports.makeRefOperandDot = function (loc, value) {
    return interfaces_1.stringTerm(value.value, loc);
};
exports.makeVar = function (loc, text) {
    return interfaces_1.varTerm({ type: interfaces_1.ValueType.Var, value: text }, loc);
};
exports.makeNumber = function (loc, text) {
    return interfaces_1.numberTerm(parseFloat(text), loc);
};
exports.makeString = function (loc, text) {
    return interfaces_1.stringTerm(JSON.parse(text), loc);
};
exports.makeBool = function (loc, text) {
    return text === 'true' ? interfaces_1.booleanTerm(true, loc) : interfaces_1.booleanTerm(false, loc);
};
exports.makeNull = function (loc) { return interfaces_1.nullTerm(loc); };
