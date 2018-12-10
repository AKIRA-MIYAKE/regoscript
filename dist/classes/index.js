"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../ast/interfaces");
var RegoProgram = /** @class */ (function () {
    function RegoProgram(location, statements) {
        this.type = interfaces_1.NodeType.Program;
        this.location = location;
        this.statements = statements;
    }
    RegoProgram.fromData = function (data) {
        var location = data.location;
        var statements = data.statements.map(function (s) {
            var stmt = undefined;
            if (interfaces_1.isRule(s)) {
                stmt = RegoRule.fromData(s);
            }
            else if (interfaces_1.isBody(s)) {
                stmt = RegoBody.fromData(s);
            }
            if (typeof stmt === 'undefined') {
                throw new Error('Create Program Error');
            }
            return stmt;
        });
        return new RegoProgram(location, statements);
    };
    return RegoProgram;
}());
exports.RegoProgram = RegoProgram;
var RegoRule = /** @class */ (function () {
    function RegoRule(location, defaultFlag, head, body, elseRule) {
        this.type = interfaces_1.NodeType.Rule;
        this.location = location;
        this.default = defaultFlag;
        this.head = head;
        this.body = body;
        this.else = elseRule;
    }
    RegoRule.fromData = function (data) {
        var location = data.location;
        var defaultFlag = data.default;
        var head = RegoHead.fromData(data.head);
        var body = RegoBody.fromData(data.body);
        var elseRule = data.else ? RegoRule.fromData(data.else) : undefined;
        return new RegoRule(location, defaultFlag, head, body, elseRule);
    };
    return RegoRule;
}());
exports.RegoRule = RegoRule;
var RegoHead = /** @class */ (function () {
    function RegoHead(location, name, args, key, value) {
        this.type = interfaces_1.NodeType.Head;
        this.location = location;
        this.name = name;
        this.args = args;
        this.key = key;
        this.value = value;
    }
    RegoHead.fromData = function (data) {
        var location = data.location;
        var name = data.name;
        var args = data.args ? RegoArgs.fromData(data.args) : undefined;
        var key = data.key ? RegoTerm.fromData(data.key) : undefined;
        var value = data.value ? RegoTerm.fromData(data.value) : undefined;
        return new RegoHead(location, name, args, key, value);
    };
    return RegoHead;
}());
exports.RegoHead = RegoHead;
var RegoArgs = /** @class */ (function () {
    function RegoArgs(value) {
        this.type = interfaces_1.NodeType.Args;
        this.value = value;
    }
    RegoArgs.fromData = function (data) {
        var value = data.value.map(function (v) { return RegoTerm.fromData(v); });
        return new RegoArgs(value);
    };
    return RegoArgs;
}());
exports.RegoArgs = RegoArgs;
var RegoBody = /** @class */ (function () {
    function RegoBody(location, value) {
        this.type = interfaces_1.NodeType.Body;
        this.location = location;
        this.value = value;
    }
    RegoBody.fromData = function (data) {
        var location = data.location;
        var value = data.value.map(function (v) { return RegoExpr.fromData(v); });
        return new RegoBody(location, value);
    };
    return RegoBody;
}());
exports.RegoBody = RegoBody;
var RegoExpr = /** @class */ (function () {
    function RegoExpr(location, negated, terms, withs) {
        this.type = interfaces_1.NodeType.Epxr;
        this.location = location;
        this.negated = negated;
        this.terms = terms;
        this.with = withs;
    }
    RegoExpr.fromData = function (data) {
        var location = data.location;
        var negated = data.negated;
        var terms = data.terms.map(function (t) { return RegoTerm.fromData(t); });
        var withs = data.with.map(function (w) { return RegoWith.fromData(w); });
        return new RegoExpr(location, negated, terms, withs);
    };
    return RegoExpr;
}());
exports.RegoExpr = RegoExpr;
var RegoWith = /** @class */ (function () {
    function RegoWith(location, target, value) {
        this.type = interfaces_1.NodeType.With;
        this.location = location;
        this.target = target;
        this.value = value;
    }
    RegoWith.fromData = function (data) {
        var location = data.location;
        var target = RegoTerm.fromData(data.target);
        var value = RegoTerm.fromData(data.value);
        return new RegoWith(location, target, value);
    };
    return RegoWith;
}());
exports.RegoWith = RegoWith;
var RegoTerm = /** @class */ (function () {
    function RegoTerm(location, value) {
        this.type = interfaces_1.NodeType.Term;
        this.location = location;
        this.value = value;
    }
    RegoTerm.fromData = function (data) {
        var location = data.location;
        var value = undefined;
        if (interfaces_1.isScalarValue(data.value)) {
            value = data.value;
        }
        else if (interfaces_1.isVarValue(data.value)) {
            value = RegoVar.fromData(data.value);
        }
        else if (interfaces_1.isRefValue(data.value)) {
            value = RegoRef.fromData(data.value);
        }
        else if (interfaces_1.isArrayValue(data.value)) {
            value = RegoArray.fromData(data.value);
        }
        else if (interfaces_1.isSetValue(data.value)) {
            value = RegoSet.fromData(data.value);
        }
        else if (interfaces_1.isObjectValue(data.value)) {
            value = RegoObject.fromData(data.value);
        }
        else if (interfaces_1.isArrayComprehensionValue(data.value)) {
            value = RegoArrayComprehension.fromData(data.value);
        }
        else if (interfaces_1.isSetComprehensionValue(data.value)) {
            value = RegoSetComprehension.fromData(data.value);
        }
        else if (interfaces_1.isObjectComprehensionValue(data.value)) {
            value = RegoObjectComprehension.fromData(data.value);
        }
        else if (interfaces_1.isCallValue(data.value)) {
            value = RegoCall.fromData(data.value);
        }
        if (typeof value === 'undefined') {
            throw new Error('Create Term Error');
        }
        return new RegoTerm(location, value);
    };
    return RegoTerm;
}());
exports.RegoTerm = RegoTerm;
var RegoVar = /** @class */ (function () {
    function RegoVar(value) {
        this.type = interfaces_1.ValueType.Var;
        this.value = value;
    }
    RegoVar.fromData = function (data) {
        return new RegoVar(data.value);
    };
    return RegoVar;
}());
exports.RegoVar = RegoVar;
var RegoRef = /** @class */ (function () {
    function RegoRef(value) {
        this.type = interfaces_1.ValueType.Ref;
        this.value = value;
    }
    RegoRef.fromData = function (data) {
        var value = data.value.map(function (v) { return RegoTerm.fromData(v); });
        return new RegoRef(value);
    };
    return RegoRef;
}());
exports.RegoRef = RegoRef;
var RegoArray = /** @class */ (function () {
    function RegoArray(value) {
        this.type = interfaces_1.ValueType.Array;
        this.value = value;
    }
    RegoArray.fromData = function (data) {
        var value = data.value.map(function (v) { return RegoTerm.fromData(v); });
        return new RegoArray(value);
    };
    return RegoArray;
}());
exports.RegoArray = RegoArray;
var RegoSet = /** @class */ (function () {
    function RegoSet(value) {
        this.type = interfaces_1.ValueType.Set;
        this.value = value;
    }
    RegoSet.fromData = function (data) {
        var value = data.value.map(function (v) { return RegoTerm.fromData(v); });
        return new RegoSet(value);
    };
    return RegoSet;
}());
exports.RegoSet = RegoSet;
var RegoObject = /** @class */ (function () {
    function RegoObject(value) {
        this.type = interfaces_1.ValueType.Object;
        this.value = value;
    }
    RegoObject.fromData = function (data) {
        var value = data.value.map(function (_a) {
            var k = _a[0], v = _a[1];
            return [
                RegoTerm.fromData(k),
                RegoTerm.fromData(v),
            ];
        });
        return new RegoObject(value);
    };
    return RegoObject;
}());
exports.RegoObject = RegoObject;
var RegoArrayComprehension = /** @class */ (function () {
    function RegoArrayComprehension(value) {
        this.type = interfaces_1.ValueType.ArrayComprehension;
        this.value = value;
    }
    RegoArrayComprehension.fromData = function (data) {
        var term = RegoTerm.fromData(data.value.term);
        var body = RegoBody.fromData(data.value.body);
        return new RegoArrayComprehension({ term: term, body: body });
    };
    return RegoArrayComprehension;
}());
exports.RegoArrayComprehension = RegoArrayComprehension;
var RegoSetComprehension = /** @class */ (function () {
    function RegoSetComprehension(value) {
        this.type = interfaces_1.ValueType.SetComprehension;
        this.value = value;
    }
    RegoSetComprehension.fromData = function (data) {
        var term = RegoTerm.fromData(data.value.term);
        var body = RegoBody.fromData(data.value.body);
        return new RegoSetComprehension({ term: term, body: body });
    };
    return RegoSetComprehension;
}());
exports.RegoSetComprehension = RegoSetComprehension;
var RegoObjectComprehension = /** @class */ (function () {
    function RegoObjectComprehension(value) {
        this.type = interfaces_1.ValueType.ObjectComprehension;
        this.value = value;
    }
    RegoObjectComprehension.fromData = function (data) {
        var key = RegoTerm.fromData(data.value.key);
        var value = RegoTerm.fromData(data.value.value);
        var body = RegoBody.fromData(data.value.body);
        return new RegoObjectComprehension({ key: key, value: value, body: body });
    };
    return RegoObjectComprehension;
}());
exports.RegoObjectComprehension = RegoObjectComprehension;
var RegoCall = /** @class */ (function () {
    function RegoCall(value) {
        this.type = interfaces_1.ValueType.Call;
        this.value = value;
    }
    RegoCall.fromData = function (data) {
        var value = data.value.map(function (v) { return RegoTerm.fromData(v); });
        return new RegoCall(value);
    };
    return RegoCall;
}());
exports.RegoCall = RegoCall;
