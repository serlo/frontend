// lib 'js-sha1' has to be installed
sha1 = require('js-sha1')

function uniqid(prefix = '', random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000
  const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0')
  return `${prefix}${id}${
    random ? `.${Math.trunc(Math.random() * 100000000)}` : ''
  }`
}

class HashService {
  salt_pattern = '1,3,5,9,14,15,20,21,28,30'

  constructor() {
    this.salt_pattern = this.salt_pattern.split(',')
  }

  hashPassword(password, salt = false) {
    if (salt === false) {
      salt = sha1(uniqid(null, true), this.salt_pattern)
    }

    let hash = sha1(salt + password)

    salt = salt.split('')

    password = ''

    let last_offset = 0

    for (const offset of this.salt_pattern) {
      const part = hash.substr(0, offset - last_offset)

      hash = hash.substr(offset - last_offset)

      password += part + salt.shift()

      last_offset = offset
    }

    return password + hash
  }

  findSalt(password) {
    let salt = ''
    for (const [index, offset] of this.salt_pattern.entries()) {
      salt += password.substr(parseInt(offset) + index, 1)
    }

    return salt
  }
}

const hashService = new HashService()

switch (process.argv[2]) {
  case 'hash':
    console.log(hashService.hashPassword(process.argv[3], process.argv[4]))
    break
  case 'find':
    console.log(hashService.findSalt(process.argv[3]))
    break
  default:
    console.log(
      'use `hash [string] [optional salt] ` or `find [hashed password]`'
    )
}
