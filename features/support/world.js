const { setWorldConstructor, Before, After } = require('cucumber')
const { browser } = require('./browser')
const { exec } = require('child_process')
const { Configuration, V0alpha2Api } = require('@ory/kratos-client')

class World {
  constructor() {
    this.browser = browser
  }
}

setWorldConstructor(World)

// hooks

Before(async function () {
  await browser.start()
})

After(async function () {
  browser.close()
})
After({ tags: '@registration' }, async function () {
  const kratos = new V0alpha2Api(
    new Configuration({
      basePath: `http://localhost:4434`,
    })
  )
  const allIdentities = await kratos
    .adminListIdentities()
    .then(({ data }) => data)
  if (allIdentities) {
    for (const identity of allIdentities) {
      await kratos.adminDeleteIdentity(identity.id)
    }
  }
  // TODO: find a way of deleting user in legacy db
  // exec(`docker-compose -f scripts/kratos/docker-compose.yml exec mysql mysql --user=root --password=secret serlo  --execute="DELETE FROM user WHERE username = 'serlouser'"`, (error, stdout, stderr) => {
  //   if (error) {
  //       console.log(`error: ${error.message}`);
  //       return;
  //   }
  //   if (stderr) {
  //       console.log(`stderr: ${stderr}`);
  //       return;
  //   }
  //   console.log(`stdout: ${stdout}`); })
})
