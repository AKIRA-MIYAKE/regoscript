import { IVar } from '../ast/interfaces'

declare var require: any

const { datascript, mori, helpers } = require('datascript-mori')
const d = datascript.core
const djs = datascript.js
const { parse, vector, get } = mori
const { DB_ADD } = helpers

export default class Store {
  private conn: any

  constructor(conn?: any) {
    if (typeof conn === 'undefined') {
      this.conn = d.create_conn()
    } else {
      this.conn = conn
    }
  }

  clone(): Store {
    const newConn = d.conn_from_db(d.db(this.conn))
    return new Store(newConn)
  }

  isDefined(variable: string): boolean {
    return this.getId(variable) !== null ? true : false
  }

  defineVar(variable: string) {
    djs.transact(this.conn, [[DB_ADD, -1, 'var', variable]])
  }

  getValue(variable: string): any {
    const id = this.getId(variable)

    if (id === null) {
      return undefined
    }

    return get(this.getVar(id), 'value')
  }

  setValue(variable: string, value: any): any {
    const id = this.getId(variable)

    if (id === null) {
      throw new Error()
    }

    d.transact(this.conn, vector(vector(DB_ADD, id, 'value', value)))
  }

  private getId(variable: string): number | null {
    return djs.q(
      `[
      :find ?eid .
      :where [?eid "var" "${variable}"]
    ]`,
      djs.db(this.conn)
    )
  }

  private getVar(id: number): any {
    return d.pull(djs.db(this.conn), parse('[*]'), id)
  }
}
