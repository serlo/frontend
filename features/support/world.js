const { setWorldConstructor, Before, After, AfterAll } = require('cucumber')
const { browser } = require('./browser')
const { exec } = require('child_process')
const { Configuration, V0alpha2Api } = require('@ory/kratos-client')

Before(async function () {
  this.browser = browser
  await this.browser.start()
})

After(async function () {
  await this.browser.close()
})

AfterAll({ tags: '@registration' }, async function () {
  const kratos = new V0alpha2Api(
    new Configuration({
      basePath: `http://localhost:4434`,
    })
  )
  const allIdentities = await kratos
    .adminListIdentities()
    .then(({ data }) => data)
  if (allIdentities) {
    const testUser = allIdentities.find(
      (user) => user.traits.username === 'serlouser'
    )
    if (testUser) await kratos.adminDeleteIdentity(testUser.id)
  }
  exec(
    `docker-compose -f scripts/kratos/docker-compose.yml exec -T mysql mysql --password=secret serlo --execute="DELETE FROM user WHERE username = 'serlouser'"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      return
    }
  )
})
