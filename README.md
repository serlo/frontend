# How to frontend

Welcome to the new serlo.org frontend. Read this document to get started it.

## Installation

Clone the repo, install dependencies and start the dev server:

```
git clone https://github.com/serlo/frontend.git
cd frontend
yarn
yarn dev
```

Now visit `localhost:3000` in the browser.

## Pages

Every route is mapped to an individual file in the `pages` folder. `_app.js` and `_document.js` are special pages for next.js to setup the environment. You can map dynamic routes to pages using `[]`-brackets.

Creating a new page is as easy as this:

```tsx
// helloworld.tsx

export default function HelloWorld(props) {
  return <p>Welcome to the frontend!</p>
}
```

## Typescript

Use Typescript and JSX for your components. Type-checking is not strict, so start prototyping without types and add them later when interfaces stabilize. The code is type-checked, even in development. Look at `tsconfig.json` to inspect typescript options.

## Data fetching

Your page needs data? Use getInitialProps to populate your component. Write the fetcher isomorphic: it should run on the server and the client, because we are doing ssr:

```tsx
import fetch from 'isomorphic-unfetch'

export default function Content(props) {
  return <p>JSON.stringify(props.data)</p>
}

Content.getInitialProps = async () => {
  const url = `https://somedomain.org/1234`
  const res = await fetch(url)
  return {data: res.json()}
}
```

The return value of `getInitialProps` is passed to the page and then you can access the data.
