const path = require('path')
const assert = require('assert')
const plugin = require('..')

describe('configg-plugin-vault-nacl', function () {
  beforeEach(() => {
    Reflect.deleteProperty(process.env, 'VAULT_NACL')
    Reflect.deleteProperty(process.env, 'VAULT_NACL_FILE')
  })

  it('shall decrypt using vault-nacl.txt file in config dir', function () {
    const dirname = path.resolve(__dirname, 'fixtures', 'config')
    const config = require(path.resolve(dirname, 'default.js'))
    const res = plugin({ dirname }, config)
    const exp = {
      common: {
        value: 'test'
      },
      config: {
        secret: 'not for your eyes',
        url: 'http://default/'
      }
    }
    assert.deepStrictEqual(res, exp)
  })

  it('shall decrypt using env VAULT_NACL', function () {
    const dirname = path.resolve(__dirname, 'fixtures', 'config')
    const config = require(path.resolve(dirname, 'production.js'))

    process.env.VAULT_NACL = 'pass@production'
    const res = plugin({ dirname }, config)
    const exp = {
      config: {
        secret: 'the production secret',
        url: 'http://default/'
      },
      common: {
        value: 'test'
      }
    }
    assert.deepStrictEqual(res, exp)
  })

  it('shall decrypt using env VAULT_NACL_FILE', function () {
    const dirname = path.resolve(__dirname, 'fixtures', 'config')
    const config = require(path.resolve(dirname, 'production.js'))

    process.env.VAULT_NACL_FILE = path.resolve(__dirname, 'fixtures', 'vault-nacl.txt')
    const res = plugin({ dirname }, config)
    const exp = {
      config: {
        secret: 'the production secret',
        url: 'http://default/'
      },
      common: {
        value: 'test'
      }
    }
    assert.deepStrictEqual(res, exp)
  })
})
