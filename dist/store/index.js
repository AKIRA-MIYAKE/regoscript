"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('datascript-mori'), datascript = _a.datascript, mori = _a.mori, helpers = _a.helpers;
var d = datascript.core;
var djs = datascript.js;
var parse = mori.parse, vector = mori.vector, get = mori.get;
var DB_ADD = helpers.DB_ADD;
var Store = /** @class */ (function () {
    function Store(conn) {
        if (typeof conn === 'undefined') {
            this.conn = d.create_conn();
        }
        else {
            this.conn = conn;
        }
    }
    Store.prototype.clone = function () {
        var newConn = d.conn_from_db(d.db(this.conn));
        return new Store(newConn);
    };
    Store.prototype.isDefined = function (variable) {
        return this.getId(variable) !== null ? true : false;
    };
    Store.prototype.defineVar = function (variable) {
        djs.transact(this.conn, [[DB_ADD, -1, 'var', variable]]);
    };
    Store.prototype.getValue = function (variable) {
        var id = this.getId(variable);
        if (id === null) {
            return undefined;
        }
        return get(this.getVar(id), 'value');
    };
    Store.prototype.setValue = function (variable, value) {
        var id = this.getId(variable);
        if (id === null) {
            throw new Error();
        }
        d.transact(this.conn, vector(vector(DB_ADD, id, 'value', value)));
    };
    Store.prototype.getId = function (variable) {
        return djs.q("[\n      :find ?eid .\n      :where [?eid \"var\" \"" + variable + "\"]\n    ]", djs.db(this.conn));
    };
    Store.prototype.getVar = function (id) {
        return d.pull(djs.db(this.conn), parse('[*]'), id);
    };
    return Store;
}());
exports.default = Store;
