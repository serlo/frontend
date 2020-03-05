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

## Styling (the good way)

We approach styling through styled components. Styles are attached to components directly, not using selectors anymore. This will force to think a little bit differently about how to structure your code:

```tsx
import styled from 'styled-components'

export default function HelloWorld(props) {
  return (
    <Container>
      <Block>Hello World!</Block>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Block = styled.div`
  width: 10rem;
  text-align: center;
  background-color: lightblue;
  font-size: 30px;
`
```

More examples will follow in this guide.

## Styling (the bad, but sometimes necessary way)

You want to add some css? The most traditional approach is to import a css file:

```tsx
import '../css/example.css'

export default function HelloWorld(props) {
  return <p>Welcome to the frontend!</p>
}
```

You can also add css using the `createGlobalStyle` helper:

```tsx
import { createGlobalStyle } from 'styled-components'

export default function HelloWorld(props) {
  return <p>Welcome to the frontend!</p>
}

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: green;
  }
`
```

## Assets

Everything within the `public`-folder is automatically accessible. But your images and files, fonts, ... into this directory.
