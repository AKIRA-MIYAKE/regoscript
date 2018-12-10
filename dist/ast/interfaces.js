"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeType;
(function (NodeType) {
    NodeType["Program"] = "Program";
    NodeType["Rule"] = "Rule";
    NodeType["Head"] = "Head";
    NodeType["Args"] = "Args";
    NodeType["Body"] = "Body";
    NodeType["Epxr"] = "Expr";
    NodeType["With"] = "With";
    NodeType["Term"] = "Term";
})(NodeType = exports.NodeType || (exports.NodeType = {}));
var ValueType;
(function (ValueType) {
    ValueType["Scalar"] = "Scalar";
    ValueType["Var"] = "Var";
    ValueType["Ref"] = "Ref";
    ValueType["Array"] = "Array";
    ValueType["Set"] = "Set";
    ValueType["Object"] = "Object";
    ValueType["ArrayComprehension"] = "ArrayComprehension";
    ValueType["SetComprehension"] = "SetComprehension";
    ValueType["ObjectComprehension"] = "ObjectComprehension";
    ValueType["Call"] = "Call";
})(ValueType = exports.ValueType || (exports.ValueType = {}));
exports.newLocation = function (row, col) {
    return { row: row, col: col };
};
exports.newBody = function (exprs, location) { return ({
    type: NodeType.Body,
    location: location,
    value: exprs,
}); };
exports.newExpr = function (terms, location) { return ({
    type: NodeType.Epxr,
    location: location,
    negated: false,
    terms: terms,
    with: [],
}); };
exports.newTerm = function (value, location) { return ({
    type: NodeType.Term,
    location: location,
    value: value,
}); };
exports.nullTerm = function (location) { return ({
    type: NodeType.Term,
    location: location,
    value: null,
}); };
exports.booleanTerm = function (value, location) { return ({
    type: NodeType.Term,
    location: location,
    value: value,
}); };
exports.numberTerm = function (value, location) { return ({
    type: NodeType.Term,
    location: location,
    value: value,
}); };
exports.stringTerm = function (value, location) { return ({
    type: NodeType.Term,
    location: location,
    value: value,
}); };
exports.varTerm = function (value, location) { return ({
    type: NodeType.Term,
    location: location,
    value: value,
}); };
exports.emptyRef = function () { return ({
    type: ValueType.Ref,
    value: [],
}); };
exports.refTerm = function (terms, location) { return ({
    type: NodeType.Term,
    location: location,
    value: { type: ValueType.Ref, value: terms },
}); };
exports.arrayTerm = function (terms, location) { return ({
    type: NodeType.Term,
    location: location,
    value: { type: ValueType.Array, value: terms },
}); };
exports.setTerm = function (terms, location) { return ({
    type: NodeType.Term,
    location: location,
    value: { type: ValueType.Set, value: Array.from(new Set(terms)) },
}); };
exports.objectTerm = function (elems, location) { return ({
    type: NodeType.Term,
    location: location,
    value: { type: ValueType.Object, value: Array.from(new Map(elems)) },
}); };
exports.arrayComprehensionTerm = function (term, body, location) { return ({
    type: NodeType.Term,
    location: location,
    value: {
        type: ValueType.ArrayComprehension,
        value: { term: term, body: body },
    },
}); };
exports.setComprehensionTerm = function (term, body, location) { return ({
    type: NodeType.Term,
    location: location,
    value: {
        type: ValueType.SetComprehension,
        value: { term: term, body: body },
    },
}); };
exports.objectComprehensionTerm = function (key, value, body, location) { return ({
    type: NodeType.Term,
    location: location,
    value: {
        type: ValueType.ObjectComprehension,
        value: { key: key, value: value, body: body },
    },
}); };
exports.callTerm = function (terms, location) { return ({
    type: NodeType.Term,
    location: location,
    value: { type: ValueType.Call, value: terms },
}); };
function isRule(stmt) {
    return stmt.type === NodeType.Rule;
}
exports.isRule = isRule;
function isBody(stmt) {
    return stmt.type === NodeType.Body;
}
exports.isBody = isBody;
exports.valueType = function (value) {
    if (isScalarValue(value)) {
        return ValueType.Scalar;
    }
    else {
        return value.type;
    }
};
function isScalarValue(value) {
    if (typeof value === 'object') {
        return false;
    }
    else {
        return true;
    }
}
exports.isScalarValue = isScalarValue;
function isVarValue(value) {
    return exports.valueType(value) === ValueType.Var;
}
exports.isVarValue = isVarValue;
function isRefValue(value) {
    return exports.valueType(value) === ValueType.Ref;
}
exports.isRefValue = isRefValue;
function isArrayValue(value) {
    return exports.valueType(value) === ValueType.Array;
}
exports.isArrayValue = isArrayValue;
function isSetValue(value) {
    return exports.valueType(value) === ValueType.Set;
}
exports.isSetValue = isSetValue;
function isObjectValue(value) {
    return exports.valueType(value) === ValueType.Object;
}
exports.isObjectValue = isObjectValue;
function isArrayComprehensionValue(value) {
    return exports.valueType(value) === ValueType.ArrayComprehension;
}
exports.isArrayComprehensionValue = isArrayComprehensionValue;
function isSetComprehensionValue(value) {
    return exports.valueType(value) === ValueType.SetComprehension;
}
exports.isSetComprehensionValue = isSetComprehensionValue;
function isObjectComprehensionValue(value) {
    return exports.valueType(value) === ValueType.ObjectComprehension;
}
exports.isObjectComprehensionValue = isObjectComprehensionValue;
function isCallValue(value) {
    return exports.valueType(value) === ValueType.Call;
}
exports.isCallValue = isCallValue;
