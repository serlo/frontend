// need to install mysql lib
const mysql = require('mysql')
const Configuration = require('@ory/kratos-client').Configuration
const V0alpha2Api = require('@ory/kratos-client').V0alpha2Api

const config = {
  kratosHost: 'http://localhost:4433',
  db: {
    host: 'localhost',
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
    await importUsers(result)
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
    await kratos.adminCreateIdentity(user)
  }
}

kratos.adminListIdentities().then(({ data }) => console.log(data))
