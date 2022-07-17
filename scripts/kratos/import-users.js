const mysql = require('mysql')
const Configuration = require('@ory/kratos-client').Configuration
const V0alpha2Api = require('@ory/kratos-client').V0alpha2Api

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
  connection.query('SELECT * FROM user', async (error, result) => {
    if (error) throw error
    let allIdentities = []
    for (let page = 1; page < result.length / 1000 + 1; page++) {
      allIdentities = [
        ...allIdentities,
        ...(await kratos
          .adminListIdentities(1000, page)
          .then(({ data }) => data)),
      ]
    }
    if (allIdentities) {
      for (const identity of allIdentities) {
        await kratos.adminDeleteIdentity(identity.id)
      }
    }
    await importUsers(result)
    console.log('Successful Import of Users')
    process.exit(0)
  })
})

async function importUsers(users) {
  for (const legacyUser of users) {
    const user = {
      traits: {
        username: legacyUser.username,
        email: legacyUser.email,
        description: legacyUser.description || '',
      },
      credentials: {
        password: {
          config: {
            password: legacyUser.password,
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
