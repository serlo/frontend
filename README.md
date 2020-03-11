# How To Frontend

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

You can change the port by running `yarn dev --port 8080`.

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
  font-size: 3rem;
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
  const smiley = clicked ? ' :)' : ''
  return (
    <BigParagraph onClick={() => setClicked(!clicked)}>
      {title + smiley}
    </BigParagraph>
  )
}

const BigParagraph = styled.p`
  text-align: center;
  font-size: 3rem;
  color: lightgreen;
`

export default HelloWorld
```

Visit `localhost:3000/helloworld`. Click on the text. Every click should toggle a smiley face:

![grafik](https://user-images.githubusercontent.com/13507950/76195662-1a048700-61e9-11ea-8abb-e98cf1bf3e32.png)

## Basic Features

### TypeScript

We love types. They help us to maintain code and keep the codebase consistent. We also love rapid development and prototyping. You decide: Add your type declarations immediately as you code or later when the codebase stabilizes. The choice is up to you:

```tsx
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

Users will come to the frontend using very different devices, from narrow smartphones to very wide screens. Adapt your components and change there appearing with media queries:

```tsx
import styled from 'styled-components'

function HelloWorld() {
  return (
    <ResponsiveBox>
      <GrowingParagraph>Hallo</GrowingParagraph>
      <GrowingParagraph>Welt</GrowingParagraph>
    </ResponsiveBox>
  )
}

const ResponsiveBox = styled.div`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`

const GrowingParagraph = styled.p`
  flex-grow: 1;
  text-align: center;
  font-size: 2rem;
  padding: 16px;
  background-color: lightgreen;
`

export default HelloWorld
```

This example makes use of [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). On wide screens, both paragraphs are shown next to each other:

![](https://user-images.githubusercontent.com/13507950/76287324-7d9fba80-62a4-11ea-9f59-6d682aa8ac36.png)

On smaller screens, they are below each other:

![](https://user-images.githubusercontent.com/13507950/76287406-b17ae000-62a4-11ea-9901-73f7b6b868cc.png)

### Theming

We can improve the previous example by extracting commenly used constants like breakpoints or colors into a [theme](https://styled-components.com/docs/advanced#theming). The file `src/theme.tsx` defines our global theme which you can access in every component:

```tsx
import styled from 'styled-components'

function HelloWorld() {
  return (
    <ResponsiveBox>
      <GrowingParagraph>Hallo</GrowingParagraph>
      <GrowingParagraph>Welt</GrowingParagraph>
    </ResponsiveBox>
  )
}

const ResponsiveBox = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const GrowingParagraph = styled.p`
  flex-grow: 1;
  text-align: center;
  font-size: 2rem;
  padding: 16px;
  background-color: ${props => props.theme.colors.brand};
`

export default HelloWorld
```

### Units

There exists a bunch of different length units.

**tl;dr**

- Use [px](https://stackoverflow.com/questions/11799236/should-i-use-px-or-rem-value-units-in-my-css)
- [Don't](https://mindtheshift.wordpress.com/2015/04/02/r-i-p-rem-viva-css-reference-pixel/) [use](https://blog.usejournal.com/dont-use-rem-em-for-paddings-margins-and-more-94e19026b000) [rem/em](https://adamwathan.me/dont-use-em-for-media-queries/) unless you know what you are [doing](https://blog.evanshunt.com/using-proportional-font-scaling-with-responsive-web-design-30e99094fca0)

### Icons

Add some eye candy by using icons. We integrated [Font Awesome](https://github.com/FortAwesome/react-fontawesome) and adding icons is straight forward:

```tsx
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function HelloWorld() {
  return (
    <BigIcon>
      <FontAwesomeIcon icon={faCoffee} size="1x" />
    </BigIcon>
  )
}

const BigIcon = styled.div`
  text-align: center;
  font-size: 3rem;
  color: brown;
  margin: 30px;
`

export default HelloWorld
```

### Style Adaption

Often you need two components with only slightly different styles. Adapt your styles [based on props](https://styled-components.com/docs/basics#adapting-based-on-props):

```tsx
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane } from '@fortawesome/free-solid-svg-icons'

function HelloWorld() {
  return (
    <BigIcon iconColor="pink">
      <FontAwesomeIcon icon={faCandyCane} size="1x" />
    </BigIcon>
  )
}

const BigIcon = styled.div<{ iconColor: string }>`
  text-align: center;
  font-size: 3rem;
  color: ${props => props.iconColor};
  margin: 30px;
`

export default HelloWorld
```

This is one of the rare places where typing is mandatory.

### CSS Helper

To boost your creativity, we included a bunch of useful css [helper](https://polished.js.org/docs/):

```tsx
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane } from '@fortawesome/free-solid-svg-icons'
import { lighten } from 'polished'

function HelloWorld() {
  const [lighter, setLighter] = React.useState(0)
  return (
    <>
      <p>Click it:</p>
      <BigIcon lighter={lighter} onClick={() => setLighter(lighter + 0.01)}>
        <FontAwesomeIcon icon={faCandyCane} size="1x" />
      </BigIcon>
    </>
  )
}

const BigIcon = styled.div<{ lighter: number }>`
  text-align: center;
  font-size: 3rem;
  color: ${props => lighten(props.lighter, 'pink')};
  margin: 30px;
`

export default HelloWorld
```

Import your helper from polished and use it in interpolations.

### Assets

Put static content like images or documents into the `public` folder.

Example: The file `public/img/serlo-logo.svg` is accessible at `localhost:3000/img/serlo-logo.svg`

You can use assets in your components as well:

```tsx
function HelloWorld() {
  return <img src="/img/serlo-logo.svg" alt="serlo logo" />
}

export default HelloWorld
```

### Code Formatting

Format your code in a consistent way by running

```
yarn prettify
```

Make sure your code is properly formatted before every commit.

### Tooltips, Dropdowns & Menus

You can add elements that [pop out](https://atomiks.github.io/tippyjs/) of the page with [Tippy](https://github.com/atomiks/tippyjs-react). A basic drop button looks like this:

```tsx
import styled from 'styled-components'
import Tippy from '@tippyjs/react'

function HelloWorld() {
  return (
    <Wall>
      <Tippy
        content={<Drop>Surprise )(</Drop>}
        trigger="click"
        placement="bottom-start"
      >
        <button>Click Me!</button>
      </Tippy>
    </Wall>
  )
}

const Wall = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`

const Drop = styled.div`
  background-color: lightgreen;
  padding: 5px;
  box-shadow: 8px 8px 2px 1px rgba(0, 255, 0, 0.2);
`

export default HelloWorld
```

Surround the target element with the `Tippy` component and pass the content to it. There are many more [props](https://atomiks.github.io/tippyjs/v6/all-props/) to explore.

### Modals

Show information to the user with modals. [react-modal](https://github.com/reactjs/react-modal) provides the necessary functionality. This example shows how you can get started:

```tsx
import React from 'react'
import Modal from '../src/reactmodal' // our wrapper

const centeredModal = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    position: 'static'
  }
}

function HelloWorld() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={centeredModal}
      >
        This is the content of the modal
      </Modal>
    </>
  )
}

export default HelloWorld
```

You handle the state by yourself. The `Modal` component has [many options](http://reactcommunity.org/react-modal/) available. Import the modal from `src/reactmodal.tsx`. This takes care of the app element.

## Advanced Topics

### Data Fetching

Before you render a page, you can fetch data from an external source. Use `getInitialProps` and an [isomorphic fetch](https://www.npmjs.com/package/isomorphic-unfetch) library:

```tsx
import fetch from 'isomorphic-unfetch'
import styled from 'styled-components'

function HelloWorld(props) {
  const allFacts = props.data.all
  const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)]
  return <Wall>{randomFact.text}</Wall>
}

HelloWorld.getInitialProps = async () => {
  const url = 'https://cat-fact.herokuapp.com/facts'
  const res = await fetch(url)
  return { data: await res.json() }
}

const Wall = styled.div`
  text-align: center;
  background-color: ${props => props.theme.colors.brand};
  color: white;
  padding: 20px;
  margin-top: 50px;
`

export default HelloWorld
```

This example fetches some random cat facts and pass them on to the page. Some more error handling wouldn't hurt.

### Deployment

Build and run the frontend with these commands:

```
yarn build
yarn start
```

This will trigger a production build. It will also summarize the size of all output artifacts.

To get detailed information about bundle size, run this:

```
yarn analyze
```

Results are saved to `.next/analyze/client.html` and `.next/analyze/server.html`.

### Missing Dependencies

Sometimes, peer dependencies are missing. Add them to `package.json` and note it here:

- `styled-components` depends on `react-is` (missing)
- `next-css` depends on `webpack` (missing)

## FAQ

### Is there any css reset?

No, we are not using any [css resets](https://github.com/jaydenseric/Fix/issues/3). Each component should reset their own styles.

### Do I have to vendor prefix my css?

No, styled components [takes care](https://styled-components.com/docs/basics#motivation) of this already.

### How do I disable server side rendering for a component?

[WARNING: This is dangerous! Use this with care!!!!] Some components rely on client specific objects (window, document). The server can not render them and will throw an error. You can disable server side rendering by checking `window` and returning early:

```tsx
function FancyComponent() {
  if (typeof window === 'undefined') return null
  return <span>{window.location.href}</span>
}
```

### How can I focus an element?

To focus a html element, you need access to the underlying DOM node. Use the [ref hook](https://reactjs.org/docs/hooks-reference.html#useref) for this.

### How can I change the state of a sibling?

Generally, you can't and shouldn't. Extract the state to the parent instead and pass change handlers:

```tsx
import React from 'react'

function HelloWorld() {
  return <Parent />
}

function Parent() {
  const [msg, setMsg] = React.useState('hello')
  return (
    <>
      <Brother setMsg={setMsg} />
      <hr />
      <Sister msg={msg} />
    </>
  )
}

function Brother(props) {
  const { setMsg } = props
  return <button onClick={() => setMsg('Yeah!')}>Click here</button>
}

function Sister(props) {
  const { msg } = props
  return <p>{msg}</p>
}

export default HelloWorld
```

The brother can pass a message to its sister by declaring the state in the parent. React takes care of updating and rendering.

## Notes

- react-use-scroll-position ...
