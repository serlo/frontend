<img src="https://raw.githubusercontent.com/serlo/frontend/staging/apps/web/public/_assets/img/serlo-logo-gh.svg" alt="Serlo Logo" title="Serlo" align="right" height="75"/>

# serlo.org – Frontend

Next.js app that serves [serlo.org](https://serlo.org).
You can find it in `apps/web`.

## Overview

The frontend turns the data it receives from our [GraphQL API](https://github.com/serlo/api.serlo.org) into pretty views.
In our [staging](https://de.serlo-staging.dev/) and [production](https://serlo.org/) enviroments the frontend sits behind a [cloudflare worker](https://github.com/serlo/serlo.org-cloudflare-worker) that mostly does redirects and could be used for A/B testing etc.

## Getting started

### Local installation

You can run the frontend on your local system. Install [Node.js v18](https://nodejs.org/en/) and yarn (`npm install --global yarn`), then run the following commands:

```sh
git clone --filter=blob:none https://github.com/serlo/frontend.git
cd frontend
yarn
yarn dev
```

The developement server is now live on [localhost:3000](http://localhost:3000). Use same username/password as on staging.

Choose language using `http://localhost:3000/{es|de|hi|ta|en|fr}/`

Tip for windows users: [Set execution policy](https://pureinfotech.com/change-execution-policy-run-scripts-powershell/) to remote signed to allow yarn to run.

### Libraries

To make working with this codebase easier a basic understanding of [React](https://beta.reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind](https://tailwindcss.com/) and [useSWR](https://swr.vercel.app/) is very helpful.

### Next.js

The frontend is built with the [Next.js React Framework](https://nextjs.org/). A good way to get started in this repo is to make yourself familiar with Next.js.

Some of the features we use:

- [Routing](https://nextjs.org/docs/routing/introduction)
- [Internationalised Routing](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Static Site Generation](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)
- [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- …

### Optional: Prisma + Planetscale (experimental)

We are trying out a [serverless sql database](https://app.planetscale.com/serlo/serlo_planetscale) and use it to build prototypes. Don't use for production features yet!

Add the environment variable `DATABASE_URL` to `apps/web/.env.local` (next.js). You can generate the database url from planetscale or ping one of us to generat one for you. (sorry for the inconvienience here). Run `yarn prisma:build` to update the prisma client and test the database connection. Run `yarn prisma:studio` for Prisma Studio, run `yarn prisma:db-pull` to download db schema.

## Repository Overview

Here are some useful places:

- `/src/pages`: File-system routing root directory. Add new routes by creating files in this folder.

- `/src/components`: Collection of react components for the frontend.

- `/src/fetcher`: Requesting data from the GraphQL backend and process it.

- `/src/schema`: Definition of the frontend content format, with renderer, and converter for edtr-io and legacy.

- `/src/data`: Translations, entries for navigation

- `/public/_`: A place for public assets, served as static files under the path `/_assets/`. Don't use `import` from here, but use the path as `src` instead.

- `/external`: Third-party code that is not maintained by the frontend.

Some useful commands:

```
yarn dev
```

Starts the development server. This enables hot reloading and development warnings.

```
yarn format
```

Runs eslint and prettier, fixes issues automatically if possible.

```
yarn lint
```

Runs tsc, eslint and prettier (without automatic fixes). This command needs to pass before merging into staging.

```
yarn analyze
```

Creates a build of the frontend, shows summary of build artefacts and creates in-depth analysis of the bundles.

```
yarn test
```

Runs jest tests.

```
yarn codegen
```

Generates exact types for some GraphQL queries and mutations. Add yours in `codegen.yml`.

All files are named with kebab-case. You should use `@/` to import files from `src/` instead of relative paths.

## Issues and backlog

Technical issues are opened for bugs and feature that we decided to work on. For improvements and backlogs that will take more resources, we have the Feature-Entwicklungsprozess with its Trello-Board. The backlog is tracked there.

This method should avoid stale issues and make it possible to keep an "zero inbox".

## e2e testing

This repo includes e2e test with codeceptjs.
To run them for the first time:

```sh
cd e2e-tests
yarn
yarn playwright install
cd ..
yarn e2e
```

You can find the [full readme here](https://github.com/serlo/frontend/tree/staging/e2e-tests#readme).

## More information

You can find more detailed explanations in our wiki. Currently, we have these pages available:

- [Internationalization](https://github.com/serlo/frontend/wiki/Internationalization)
- [Entities and Schema](https://github.com/serlo/frontend/wiki/Schema)
- [Tailwind Getting Started Guide](https://github.com/serlo/frontend/wiki/Tailwind-Getting-Started-Guide)
- [VS Code Setup](https://github.com/serlo/frontend/wiki/VS-Code)
- [Unsorted old stuff](https://github.com/serlo/frontend/wiki/Archive)
