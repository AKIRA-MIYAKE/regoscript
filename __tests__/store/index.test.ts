import Store from '../../src/store'
import { IVar, ValueType } from '../../src/ast/interfaces';

declare var require: any

const { mori } = require('datascript-mori')
const { hashMap, isMap, set, isSet, list, isList } = mori

describe('Store', () => {
  it('Set scalar value.', () => {
    const store = new Store()
    store.defineVar('a')
    store.setValue('a', 42)
    expect(store.getValue('a')).toBe(42)
  })

  describe('clone()', () => {
    it ('Get cloned store.', () => {
      const store = new Store()
      store.defineVar('a')
      store.setValue('a', 42)

      const cloned = store.clone()
      expect(cloned.getValue('a')).toBe(42)

      cloned.defineVar('b')
      cloned.setValue('b', 21)
      expect(cloned.getValue('b')).toBe(21)

      expect(store.getValue('b')).toBeUndefined()
    })
  })
})
