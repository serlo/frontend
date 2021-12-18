<img src="https://raw.githubusercontent.com/serlo/frontend/staging/public/_assets/img/serlo-logo-gh.svg" alt="Serlo Logo" title="Serlo" align="right" height="75" style="padding-bottom:1rem"/>

# serlo/frontend

Welcome to the new frontend.

## Overview

The frontend fetches data from the [API server](https://github.com/serlo/api.serlo.org) and renders it to a web page. A standalone deployment of the frontend is enough to view most parts of Serlo.

In a more complete environment, the frontend sits behind a [cloudflare worker](https://github.com/serlo/serlo.org-cloudflare-worker) that handles routing and redirections. Many editing features are still handled by our [legacy server](https://github.com/serlo/serlo.org).

Deployment of the staging environment: https://frontend-git-staging-serlo.vercel.app

## Getting started

### Local installation

You can run the frontend on your local system. For that, install [Node.js > v12.22.0](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install).

Then, run following commands:

```sh
git clone https://github.com/serlo/frontend.git
cd frontend
yarn
yarn dev
```

The server is now running on [localhost:3000](http://localhost:3000).

### next.js framework

The frontend is built with [next.js](https://nextjs.org/) and uses many features of it. A good way to get started in this repo is to make yourself familiar with next.js. This will make it quite clear how the system is working. Features we use include (and are not limited to):

- Server-Side Rendering
- Router
- Internationalization
- Incremental Page Generation
- TypeScript

## Repository

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

All files are named with kebab-case. You should use `@/` to import files from `src/` instead of relative paths.

## More information

You can find more detailed explanations in our wiki. Currently, we have these pages available:

- [Internationalization](https://github.com/serlo/frontend/wiki/Internationalization)
- [Entities and Schema](https://github.com/serlo/frontend/wiki/Schema)
- [Tailwind Getting Started Guide](https://github.com/serlo/frontend/wiki/Tailwind-Getting-Started-Guide)
- [VS Code Setup](https://github.com/serlo/frontend/wiki/VS-Code)
- [Unsorted old stuff](https://github.com/serlo/frontend/wiki/Archive)
