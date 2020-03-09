# How to frontend

Welcome to the new serlo.org frontend.

## Getting started

### Installation

Install [Node.js](https://nodejs.org/en/) (>=10) and [yarn](https://classic.yarnpkg.com/en/docs/install) on your system.

Clone this repo, install dependencies and start the dev server:

```
git clone https://github.com/serlo/frontend.git
cd frontend
yarn
yarn dev
```

The server is now running on `localhost:3000`.

You can change the port by running e.g. `yarn dev --port 8080`.

### Creating pages

Routes are mapped to individual files in the folder `pages`. Create a [page](https://nextjs.org/docs/basic-features/pages) by adding following file:

```tsx
// pages/helloworld.tsx

function HelloWorld() {
  return <p>Welcome to the frontend!</p>
}

export default HelloWorld
```

Visit `localhost:3000/helloworld` to view this page.

### Adding styles

You can attach [styles](https://styled-components.com/docs/basics#getting-started) to each html element and use them in your component:

```tsx
// pages/helloworld.tsx

import styled from 'styled-components'

function HelloWorld() {
  return <BigParagraph>Welcome to the frontend!</BigParagraph>
}

const BigParagraph = styled.p`
  text-align: center;
  font-size: 3em;
  color: lightgreen;
`

export default HelloWorld
```

### Building components

Use functional components and [hooks](https://reactjs.org/docs/hooks-overview.html) to split your code into reusable pieces. Some basic features are shown in this example:

```tsx
// pages/helloworld.tsx

import React from 'react'
import styled from 'styled-components'

function HelloWorld() {
  return <ClickMeTitle title="Welcome to the frontend!" />
}

function ClickMeTitle(props) {
  const { title } = props
  const [clicked, setClicked] = React.useState(false)
  return (
    <BigParagraph onClick={() => setClicked(!clicked)}>
      {title + (clicked ? ' :)' : '')}
    </BigParagraph>
  )
}

const BigParagraph = styled.p`
  text-align: center;
  font-size: 3em;
  color: lightgreen;
`

export default HelloWorld
```

Visit `localhost:3000/helloworld`. Click on the text. Every click should toggle a smiley face:

![grafik](https://user-images.githubusercontent.com/13507950/76195662-1a048700-61e9-11ea-8abb-e98cf1bf3e32.png)

## Features

### TypeScript

We love types. They help us to maintain code and keep the codebase consistent. We also love rapid development and prototyping. You decide: Add your type declarations immediately as you code or later when the codebase stabilizes. The choice is up to you:

```tsx
// pages/helloworld.tsx

function HelloWorld() {
  return <Greeter title="Hello" subline="Welcome to the frontend!" />
}

interface GreeterProps {
  title: string
  subline?: string
}

function Greeter(props: GreeterProps) {
  const { title, subline } = props
  return (
    <>
      <h1>{title}</h1>
      {subline && <small>{subline}</small>}
    </>
  )
}

export default HelloWorld
```

### Responsive Design

Optimize pages for mobile and desktop.

---

TODO below here

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
  return { data: res.json() }
}
```

The return value of `getInitialProps` is passed to the page and then you can access the data.

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

## Code style

We use Prettier to auto-format our code: `{"semi": false, "singleQuote": true}`.

## Assets

Everything within the `public`-folder is automatically accessible. But your images and files, fonts, ... into this directory.

## Fonts

The beautiful `Karmilla` font face is available by default. To include other fonts, you can add them as assets and reference them using css (`@font-face{...}`).

## Responsive designs

The recommend way is using media queries.

```tsx
EXAMPLE HERE
```

## Dependencies

Add packages with the command `yarn add packagename` or `yarn add -D packagename`. After installing the package, change the version in the `package.json` to the lowest necessary version, e.g. `^2.0.0` or `^16.8.0`. This will improve compatibility.

The difference between normal dependencies and devDependencies is probably not crucial. Rule of thumb: If something is run on the client, than add it as normal dependencies.

## Flexbox

[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is great and can easily be written in css. Currently no library here.

## Icons

We are including Fontawesome 5 free and brand icons. Using them is straight forward:

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '...'
import styled from 'styled-components'

export default function HelloWorld(props) {
  return (
    <StyledParagraph>
      <FontAwesomeIcon icon={faCoffee} />
    </StyledParagraph>
  )
}

const StyledParagraph = styled.p`
  color: brown;
  text-align: center;
`
```

## Deployment

Everytime you push to the master branch or merge a pull request, the frontend is built and deployed. To build the frontend on your local machine, run

```
yarn build
yarn start
```

and access the application through `localhost:3000`. The build also gives you a nice overview of the project's size.

## Theming

You can define global css vars in our theme. This theme is available to all styled-components. Tools from polished can be used, too. Look at `src/theme.tsx` for more information.

## CSS Reset

No css reset done, because it's not necessary because each component should take care of the styling themselves.

## onclickoutside

! add example here. take care: conflict between onclickoutside and original click handler, workaround with onMouseDown

## polished

! use some css helper functions

## Components

? How to structure components? Default to styled always?

## States and hierarchies

If you ever want to manipulate the dom of a sibling: don't do it! Push the state up the hierarchy instead, expose an onChange-handler and let the parent manipulate the sibling.

### missing peer dependencies

styled-components -> react-is

next-css -> webpack

### px in media queries

https://adamwathan.me/dont-use-em-for-media-queries/

### Passing functions as props

https://reactjs.org/docs/faq-functions.html

Small inline calbacks are generally ok.
