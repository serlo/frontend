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

There exists a bunch of different length units. Most of the time, [px](https://stackoverflow.com/questions/11799236/should-i-use-px-or-rem-value-units-in-my-css) is fine. Sometimes there are better alternativs, especially in regard of [a11y](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/):

- Use `rem` for `font-size`, so users can zoom the text (e.g. farsighted people or users on 4k monitors)
- Use dimensionless values for `line-height` to scale well.
- Test your component how it behaves when text zooms and eventually make adjustments.

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

### Formulas

You can use [KaTeX](https://github.com/KaTeX/KaTeX) to render formulas:

```tsx
import styled from 'styled-components'
import Math from '../src/math'

function HelloWorld() {
  return (
    <>
      <Paragraph>
        This changed the world:{' '}
        <Math formula={'c = \\pm\\sqrt{a^2 + b^2}'} inline />.
      </Paragraph>
      <Paragraph>This too:</Paragraph>
      <CenteredParagraph>
        <Math formula={'E = mc^2'} />
      </CenteredParagraph>
    </>
  )
}

const Paragraph = styled.p`
  margin: 20px;
  font-size: 18px;
`

const CenteredParagraph = styled.p`
  text-align: center;
  font-size: 18px;
`

export default HelloWorld
```

Our math component takes two props: `formula` is the LaTeX string, `inline` is optional and will make the formula a bit smaller. The rendered formula is a `span` that can be placed anywhere.

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

### Importing Component dynamically

If some part of a page is heavy and only relevant for a smaller fraction of users, import it dynamically. Write your component as usual:

```tsx
// src/fancycomponent.tsx

function FancyComponent() {
  return <p>This is some heavy component</p>
}

export default FancyComponent
```

Use a [dynamic import](https://nextjs.org/docs/advanced-features/dynamic-import) to load the component:

```tsx
// pages/helloworld.tsx

import React from 'react'
import dynamic from 'next/dynamic'

const FancyComponent = dynamic(import('../src/fancycomponent'))

function HelloWorld() {
  const [visible, setVisible] = React.useState(false)
  return (
    <>
      <p>
        <button onClick={() => setVisible(true)}>Load ...</button>
      </p>
      {visible && <FancyComponent />}
    </>
  )
}

export default HelloWorld
```

The source code of `FancyComponent` is splitting into a separate chunk and is only loaded when users click the button.

### Reusing CSS Snippets

You can extend components by adding style snippets. These snippets are functions that add new props to a styled component:

```tsx
import styled from 'styled-components'

function HelloWorld() {
  return (
    <>
      <ChatParagraph side="left">Hey, how are you?</ChatParagraph>
      <ChatParagraph side="right">I'm fine!</ChatParagraph>
    </>
  )
}

interface SideProps {
  side: 'left' | 'right'
}

function withSide(props: SideProps) {
  if (props.side === 'left') {
    return `
      color: blue;
      text-align: left;
    `
  } else if (props.side === 'right') {
    return `
      color: green;
      text-align: right;
    `
  } else {
    return ''
  }
}

const ChatParagraph = styled.p<SideProps>`
  ${withSide}
  margin: 20px;
`

export default HelloWorld
```

This example adds the `side` prop to the `ChatParagraph` and allows users to change the appearance of the component.

You can reuse this function in another component:

```tsx
const AnotherChatParagraph = styled.p<SideProps>`
  ${withSide}
  margin: 15px;
  border: 3px solid gray;
`
```

### \_document.js and \_app.js

Your pages get wrapped in two components, [\_document.js](https://nextjs.org/docs/advanced-features/custom-document) and [\_app.js](https://nextjs.org/docs/advanced-features/custom-app). You can override both files. The document contains everything that is outside of your react app, especially the html and body tag. This is a good place to set styles on these or to define the language. The document is rendered on the server only.

The app is the entrypoint of your page and is rendered client-side as well. You can add global providers or import css files here.

### Listening to Scroll & Resize

It is possible to listen to scroll and resize events as a last resort for responsive design, e.g. if media queries are insufficient. Use `useEffect` to accomplish this task:

```tsx
import React from 'react'
import styled from 'styled-components'

function HelloWorld() {
  const [gray, setGray] = React.useState(false)

  React.useEffect(() => {
    function handleScroll() {
      const scrollY = window.pageYOffset
      setGray(scrollY > 250)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <BigDiv>
      <Par gray={gray}>Please scroll down a little bit ...</Par>
    </BigDiv>
  )
}

const BigDiv = styled.div`
  height: 4000px;
`

const Par = styled.p<{ gray: boolean }>`
  font-size: 3rem;
  text-align: center;
  margin-top: 500px;
  ${props => (props.gray ? 'color:lightgray;' : '')}
`

export default HelloWorld
```

This text will gray out if you scroll down. `useEffect` with an empty dependency array is called once on mount. The return value is called when the component unmounts and will remove the event listener. Set the state directly within the event handler.

### Missing Dependencies

Sometimes, peer dependencies are missing. Install them manually and note it here:

- `styled-components` depends on `react-is` (missing)

## FAQ

### Is there any css reset?

No, we are not using any [css resets](https://github.com/jaydenseric/Fix/issues/3). Each component should reset their own styles.

### Do I have to vendor prefix my css?

No, styled components [takes care](https://styled-components.com/docs/basics#motivation) of this already.

### Can I add external css?

Only if it is absolutely necessary. You are able to import external `.css` files in `pages/_app.js`. These stylesheets are always global and included in every page. If possible, use a package that supports styled components.

### Some client specific objects (window, document) are causing trouble with server side rendering. What can I do?

Delay these parts of the code after your component mounted, using the `useEffect` hook:

```tsx
import React from 'react'
import styled from 'styled-components'

function HelloWorld() {
  const [href, setHref] = React.useState(undefined)

  React.useEffect(() => {
    setHref(window.location.href)
  }, [])

  return href ? <BigDiv>Your site's url is {href}</BigDiv> : null
}

const BigDiv = styled.div`
  text-align: center;
  margin-top: 100px;
`

export default HelloWorld
```

Using the state is important: This ensures that server side rendering and client side hydration matches up.

### How can I detect whether I am serverside or clientside?

The most idomatic way to do this is checking the type of window:

```tsx
if (typeof window === 'undefined') {
  // serverside
}
```

A bigger example:

```tsx
function HelloWorld(props) {
  return <>{JSON.stringify(props.data)}</>
}

HelloWorld.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    const fs = await import('fs')
    const util = await import('util')
    const data = await util.promisify(fs.readFile)('package.json', 'utf-8')
    console.log(data)
    return { data: JSON.parse(data) }
  }
  return {}
}

export default HelloWorld
```

The `fs` module is only available in nodejs, but it's ok to use it when you check that you are serverside and load it with a [dynamic import](https://javascript.info/modules-dynamic-imports). There is also some [async/await](https://javascript.info/async-await) syntax shown here.

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

- content-api is handling data fetching by parsing serlo.org
