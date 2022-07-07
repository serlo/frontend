import { NextApiRequest, NextApiResponse } from 'next'

import { hydra, kratos } from '@/helper/kratos'

async function login(req: NextApiRequest, res: NextApiResponse) {
  const session = await kratos
    .toSession(undefined, String(req.headers.cookie))
    .then(({ data }) => data)
    .catch((error) => {
      res.status(500)
      res.send(error)
    })
  const query = req.query
  const challenge = String(query.login_challenge)
  if (!challenge) {
    res.status(400)
    res.send('Expected a login challenge to be set but received none.')
    return
  }

  if (session) {
    const userId = (session.identity.metadata_public as { legacy_id: number })
      .legacy_id
    hydra
      .getLoginRequest(challenge)
      .then(async () => {
        return await hydra
          .acceptLoginRequest(challenge, {
            subject: String(userId),
            context: session || undefined,
          })
          .then(({ data: body }) => {
            res.redirect(body.redirect_to)
          })
          .catch(() => {
            res.status(500)
            // TODO
            res.send('Error when accepting login request')
            // res.send(error)
          })
      })
      .catch(() => {
        res.status(500)
        // TODO
        res.send('Error when getting login request')
        // res.send(error)
      })
  }
}

export default login
