"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nearley = require('nearley');
var grammar = require('./grammar.js');
var Parser = /** @class */ (function () {
    function Parser() {
        this.parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    }
    Parser.prototype.feed = function (input) {
        var _input = input;
        if (this.parser.lexer.line > 1) {
            _input = "\n" + input;
        }
        this.parser.feed(_input);
    };
    Parser.prototype.parse = function () {
        var results = this.parser.results;
        return results[results.length - 1];
    };
    return Parser;
}());
exports.default = Parser;
