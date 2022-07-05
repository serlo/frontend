import { NextApiRequest, NextApiResponse } from 'next'

import { hydra, kratos } from '../../../helper/kratos'

async function consent(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query

  const challenge = String(query.consent_challenge)
  if (!challenge) {
    res.status(400)
    res.send('Expected a consent challenge to be set but received none.')
    return
  }
  const session = await kratos
    .toSession(undefined, String(req.headers.cookie))
    .then(({ data }) => data)
    .catch((error) => {
      res.status(500)
      res.send(error)
    })
  if (session) {
    const userId = (session.identity.metadata_public as { legacy_id: number })
      .legacy_id
    const username = (session.identity.traits as { username: string }).username

    hydra
      .getConsentRequest(challenge)
      .then(async ({ data: body }) => {
        return await hydra
          .acceptConsentRequest(challenge, {
            grant_scope: body.requested_scope,

            grant_access_token_audience: body.requested_access_token_audience,

            session: {
              id_token: {
                id: userId,
                username,
                // email? See https://github.com/serlo/serlo.org/blob/main/packages/public/server/src/module/Authentication/src/Controller/HydraConsentController.php#L74
              },
            },
          })
          .then(({ data: body }) => {
            res.redirect(body.redirect_to)
          })
          .catch((error) => {
            res.status(500)
            res.send(error)
          })
      })
      .catch((error) => {
        res.status(500)
        res.send(error)
      })
  }
}

export default consent
