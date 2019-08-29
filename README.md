# configg-plugin-vault-nacl

> vault-nacl plugin for configg

[![NPM version](https://badge.fury.io/js/configg-plugin-vault-nacl.svg)](https://www.npmjs.com/package/configg-plugin-vault-nacl/)
[![Build Status](https://secure.travis-ci.org/commenthol/configg-plugin-vault-nacl.svg?branch=master)](https://travis-ci.org/commenthol/configg-plugin-vault-nacl)

Sensitive information can be encrypted using [vault-nacl][]. Providing the
password via env-var `VAULT_NACL` or within a file allows automatic decryption
of your app. The password file could e.g. be provided using [docker-secret][].

## Usage

1. `npm install --save configg configg-plugin-vault-nacl`

2. `mkdir config; touch config/default.js`

3. Edit `config/default.js`

    ```js
    /* config/default.js */
    module.exports = {
      config: {
        // your configuration options go in here
      },
      plugins: [
        ['configg-plugin-vault-nacl']
      ]
    }
    ```

## Encrypt values with vault-nacl

To create a file with an encrypted value surround the value in question with
`VAULT_NACL()VAULT_NACL`.

```js
/* config/default.js */
module.exports = {
  config: {
    host: 'test-db',
    port: 1529,
    user: 'test',
    pass: 'VAULT_NACL(my db password)VAULT_NACL'
  },
  plugins: [
    ['configg-plugin-vault-nacl']
  ]
}
```

then encrypt the value(s) with a single password, e.g. 'password123'

```
npx vault-nacl encrypt -p password123 config/default.js
```

Now you are able to store the file within GIT or CVS of choice.

To start the application provide the environment variable `VAULT_NACL` e.g.

```
VAULT_NACL=password123 npm start
```

Other options include mounting a `vault-nacl.txt` file into `./config` using
[docker-secret][] or explicitly naming with the `VAULT_NACL_FILE` env-variable.

For further [documentation][vault-nacl] check `npx vault-nacl --help`

> **NOTE**   
> Make sure that all encrypted values for a given environment can be
> decrypted with **ONE single password**.

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your
code to be distributed under the MIT license. You are also implicitly
verifying that all code is your original work or correctly attributed
with the source of its origin and license.

## License

Copyright (c) commenthol (MIT License)

See [LICENSE][] for more info.

[LICENSE]: ./LICENSE
[configg]: https://npmjs.com/package/configg
[configg-plugin-vault-nacl]: https://npmjs.com/package/configg-plugin-vault-nacl
[configg-plugin]: https://www.npmjs.com/search?q=keywords:configg-plugin
[vault-nacl]: https://npmjs.com/package/vault-nacl
