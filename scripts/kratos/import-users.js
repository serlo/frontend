const mysql = require('mysql')
const Configuration = require('@ory/client').Configuration
const V0alpha2Api = require('@ory/client').V0alpha2Api
const hashService = require('./legacy-password-hash-service').hashService

const config = {
  kratosHost: 'http://kratos:4434',
  db: {
    host: 'host.docker.internal',
    user: 'root',
    password: 'secret',
    database: 'serlo',
  },
}

const kratos = new V0alpha2Api(
  new Configuration({
    basePath: config.kratosHost,
  })
)

const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
})

connection.connect(async (error) => {
  if (error) throw error

  let allIdentities = []

  for (let page = 1; true; page++) {
    const data = await kratos
      .adminListIdentities(10, page)
      .then(({ data }) => data)
    if (!data.length) break
    allIdentities = [...allIdentities, ...data]
  }

  if (allIdentities) {
    allIdentities.map(async (identity) => {
      await kratos.adminDeleteIdentity(identity.id)
    })
  }

  connection.query('SELECT * FROM user', async (error, result) => {
    if (error) throw error
    await importUsers(result)
    console.log('Successful Import of Users')
    process.exit(0)
  })
})

async function importUsers(users) {
  for (const legacyUser of users) {
    const passwordSaltBase64 = Buffer.from(
      hashService.findSalt(legacyUser.password)
    ).toString('base64')
    const hashedPasswordBase64 = Buffer.from(
      hashService.findSha(legacyUser.password),
      'hex'
    ).toString('base64')
    const user = {
      traits: {
        username: legacyUser.username,
        email: legacyUser.email,
        description: legacyUser.description || '',
      },
      credentials: {
        password: {
          config: {
            // [p]assword[f]ormat = {SALT}{PASSWORD}
            hashed_password: `$sha1$pf=e1NBTFR9e1BBU1NXT1JEfQ==$${passwordSaltBase64}$${hashedPasswordBase64}`,
          },
        },
      },
      metadata_public: { legacy_id: legacyUser.id },
      verifiable_addresses: [
        {
          value: legacyUser.email,
          verified: true,
          via: 'email',
          status: 'completed',
        },
      ],
    }
    console.log('Importing user...')
    await kratos.adminCreateIdentity(user)
  }
}
