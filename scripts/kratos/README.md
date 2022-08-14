# Integration frontend.serlo.org - Kratos

## Getting started using staging API (simple)

_note: make sure the staging kratos and hydra are pointing to localhost:3000. Ask the infrastructure unit_

Make sure your `NEXT_PUBLIC_ENV=staging`, run `yarn dev` to start the frontend and
head to `localhost:3000` and try to register, verify email, log in, log out, and reset password.

### Developing email templates

Change files in `src/pages/api/.ory/mail-templates/`, commit and push. And ask the infrastructure unit to redeploy kratos.

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

### Developing email templates

Kratos has to be rebuild every time you change an email template in `scripts/kratos/email-templates/`. Use the following workflow:

1. Change something in the `email-templates/` folder.
2. Run `yarn kratos:rebuild`
3. Test the verification or the recovery email. Repeat the process.

## Folder explanation

You find here different files that help you to have a mini serlo infrastructure in your local machine, and all that integrating kratos.

**Kratos specific files:**

- `config.yml` contains kratos configuration.
- `register_legacy.jsonnet` contains the jsonnet used at the web hook after registering a new user.
- `new-user.sh` is a script for creating new users.
- `identity.schema.json` has identity schema that maps the user.
- `import-users.js` is a script to import users from legacy db into kratos.

**For your development:**

- `docker-compose.yml` sets up containers to enable dev environment.
- `prepare.sh`is a script for fine tuning your local dev environment.
- `graphql-fetch-cloudflare-auth.template` should replace current `src/api/graphql-fetch.ts` to allow authenticated api calls.
- `docker-entrypoint-initdb.d` initiates db for the DB layer.

**Others:**

- `legacy-password-hash-service.js` ports the password hash service from legacy.
