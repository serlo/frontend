# Integration frontend.serlo.org - Kratos

## Getting started

1. Run `yarn kratos`.
2. Run `yarn kratos:prepare`.
3. Change the following lines in `api.serlo.org/packages/server/src/internals/server/graphql-middleware.ts`:

```typescript
    const serviceToken = jwt.sign({}, process.env.SERLO_ORG_SECRET, {
        audience: 'api.serlo.org',
        issuer: Service.Serlo,
    })
    const user = authorizationHeader.replace('Bearer ', '')
    const headerFromCloudFlare = `Serlo Service=${serviceToken};User=${user}`
    return handleAuthentication(headerFromCloudFlare, async (token) => {
```

4. Make sure to use the local environment in `.env.local`:

```bash
NEXT_PUBLIC_ENV=local
# NEXT_PUBLIC_ENV=staging
```

5. Start frontend, api and db layer (with DB docker image).
6. Head to `localhost:3000/auth/login`.
7. For Login you can already use the id `dev` and password `123456`.
8. For Registration use the `kratos` branch in api.serlo.org and the `298-new-endpoint-usercreatemutation` branch in the serlo.org-database-layer (if they are not merged into main yet).
