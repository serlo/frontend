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
3. Change the following lines in `src/api/graphql-fetch.ts`:

```typescript
import jwt from 'jsonwebtoken'
...
    function executeQuery() {
      const serviceToken = jwt.sign({}, "serlo.org-secret", {
        audience: 'api.serlo.org',
        issuer: 'serlo.org',
      })
      const client = new GraphQLClient(endpoint, {
        headers: auth.current
          ? {
              Authorization: `Serlo Service=${serviceToken};User=${auth.current.token}`,
            }
          : {},
      })
      return client.request(query, variables)
    }
```

4. Make sure to use the local environment in `.env.local`:

```bash
NEXT_PUBLIC_ENV=local
# NEXT_PUBLIC_ENV=staging
```

5. Head to `localhost:3000/auth/login`.
6. For Login you can already use the id `dev` and password `123456`.
