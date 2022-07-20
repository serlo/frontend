# Integration frontend.serlo.org - Kratos

## Getting started using staging API (simple)

_note: make sure the staging kratos and hydra are pointing to localhost:3000. Ask the infrastructure unit_

1. Run `yarn kratos`.
2. Run `yarn kratos:prepare`.
3. Run `yarn dev` to start the frontend
4. Head to `localhost:3000` and try to register or log in.

## Getting started using local API and database layer

1. Run `yarn kratos`.
2. Run `yarn kratos:prepare`.
<!--
TODO: that will not be possible for now, since we are using api image in docker-compose.yml
3. Change the following lines in `api.serlo.org/packages/server/src/internals/server/graphql-middleware.ts`:

````typescript
    const serviceToken = jwt.sign({}, process.env.SERLO_ORG_SECRET, {
        audience: 'api.serlo.org',
        issuer: Service.Serlo,
    })
    const user = authorizationHeader.replace('Bearer ', '')
    const headerFromCloudFlare = `Serlo Service=${serviceToken};User=${user}`
    return handleAuthentication(headerFromCloudFlare, async (token) => {
``` -->

3. Make sure to use the local environment in `.env.local`:

```bash
NEXT_PUBLIC_ENV=local
# NEXT_PUBLIC_ENV=staging
````

4. Head to `localhost:3000/auth/login`.
5. For Login you can already use the id `dev` and password `123456`.
   _note: unfortunately you will not be able to be logged in with hydra. We are working on it_
