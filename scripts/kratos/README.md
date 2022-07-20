# Integration frontend.serlo.org - Kratos

## Getting started using staging API (simple)

_note: make sure the staging kratos and hydra are pointing to localhost:3000. Ask the infrastructure unit_

Make sure your `NEXT_PUBLIC_ENV=staging`, run `yarn dev` to start the frontend and
head to `localhost:3000` and try to register, verify email, log in, log out, and reset password.

## Getting started using local API and database layer

1. Run `yarn kratos` (or `yarn kratos:detach` if you want to have control of the terminal).
2. Run `yarn kratos:prepare`.
3. Make sure to use the local environment in `.env.local`:

```bash
NEXT_PUBLIC_ENV=local
# NEXT_PUBLIC_ENV=staging
```

5. Head to `localhost:3000/auth/login`.
6. For Login you can already use the id `dev` and password `123456`.
7. For verifying email go to `localhost:4436`.

_Important: the file src/api/graphql-fetch.ts was modified in order to imitate the authentication made by the cloudflare worker. DO NOT COMMIT this change._
