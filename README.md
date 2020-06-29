# Serlo / Frontend

Welcome to the new serlo.org frontend.

## Getting started

### Installation

Install [Node.js](https://nodejs.org/en/) (current LTS) and [yarn](https://classic.yarnpkg.com/en/docs/install) on your system.

Clone this repo, install dependencies and start the dev server:

```sh
git clone https://github.com/serlo/frontend.git
cd frontend
yarn
yarn dev
```

The server is now running on `localhost:3000`. You can visit it in the browser.

### Overview

![grafik](https://user-images.githubusercontent.com/13507950/85958632-2595dc80-b997-11ea-937c-38169b514fe7.png)

You can request a page by alias (e.g. `/` or `/mathe/zahlen-größen`). The frontend decides how to handle the alias, and if necessary, fetches data from the backend. The frontend then processes the data and returns a prerendered HTML response.

### Routes

An alias will be handled by a specific route:

1. `/api/frontend/privacy`: Internal route for loading privacy revisions (proxies the request to the legacy system).

2. `/api/frontend/<slug>`: Internal route for data fetching from the backend API.

3. `/`, `/spenden`, `/search`: Custom built pages.

4. `/<slug>`: Entity route, the default case for almost every alias. Fetches data from backend with (2.) and renders page.

Notes: We need (1.) because of CORS-Issues. We use (2.) to enable caching for the frontend deployment, because requesting (2.) can be slow, in the range of 0.5-1.5s, depending on the complexity of the entity. Most entities have a default alias, if (4.) encounters an alias that is not the default (old alias: `/mathe-startseite`, access with id: `/1885`), it will redirect to the default alias by 301.

### Entities

Every entity belongs to a content type. These are the supported types:

| Content Type      | Description                                                                                                                  | Example   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- |
| `Page`            | A single page of static content.                                                                                             | `/serlo`  |
| `Article`         | A single page of learning content.                                                                                           | `/27801`  |
| `CoursePage`      | A single page of learning content that is part of a course.                                                                  | `/52020`  |
| `Video`           | A single video, embedded from Youtube, Vimeo, Wikimedia or BR (Bayerischer Rundfunk), with a description.                    | `/40744`  |
| `Applet`          | A single Geogebra-Applet, embedded from GeogebraTube.                                                                        | `/138114` |
| `TaxonomyTerm`    | Index page with links to descendant entities. Some entities are shown directly in the taxonomy (e.g. subterms or exercises). | `/5`      |
| `Exercise`        | A single exercise with solution, possibly with interactive element.                                                          | `/54210`  |
| `ExerciseGroup`   | A list of exercises in a group with a shared description in the beginning.                                                   | `/53205`  |
| `GroupedExercise` | A single exercise that is part of a exercise group.                                                                          | `/53209`  |
| `Course`          | Meta-entity of a course, redirects to first page.                                                                            | `/51979`  |
| `Event`           | Information about an upcoming event.                                                                                         | `/145590` |

### Repository

Here are some useful places to get started:

- `/src/pages`: Incoming requests are mapped to files by next.js, all routes are defined in this folder.

- `/src/components`: Collection of react components for the frontend.

- `/src/fetcher`: Requesting data from the GraphQL backend and process it.

- `/src/schema`: Definition of the frontend content format, with renderer, and converter for edtr-io and legacy.

- `/src/data`: Entries for main menu, footer and horizon.

- `/public/_assets`: A place for public assets, served as static files under the path `/_assets/`.

- `/external`: Third-party code that is not maintained by the frontend.

Some useful commands:

```
yarn dev
```

Starts the development server. This enables hot reloading and development warnings. Create a PR in this repository to get a preview deployment that uses production settings.

```
yarn format
```

Runs eslint and prettier, fixes issues automatically if possible.

```
yarn lint
```

Runs tsc, eslint and prettier. This command needs to pass before merging into master.

```
yarn analyze
```

Creates a build of the frontend, shows summary of build artefacts and creates in-depth analysis of the bundles.

All files are named with kebab-case. You can use `@/` to import files from `src/` instead of relative paths.

## Schema

Entities may contain a wide range of different elements. The elements are organized in a tree.

### Text

The most basic node type is text. A text node contain these attributes:

- `text`: The text content of this node.

- `color`: blue, green or orange

- `em`: true/undefined

- `strong`: true/undefined

### Elements

More complex nodes have a type and may have other nodes as children. Here is an overview of available elements:

| Type                | Attributes                                                                            | Description                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `a`                 | href, children                                                                        | A link.                                                                                                                                         |
| `inline-math`       | formula                                                                               | A latex formula rendered with KaTeX, displayed inline.                                                                                          |
| `p`                 | children                                                                              | A paragraph.                                                                                                                                    |
| `h`                 | level, id, children                                                                   | A heading of given level, can have an id for anchoring.                                                                                         |
| `math`              | formula, alignLeft                                                                    | A latex formula, displayed on a separate line.                                                                                                  |
| `img`               | src, href, alt, maxWidth                                                              | An image, with optional link, alternative text and a maximal width.                                                                             |
| `spoiler-container` | children: spoiler-title, spoiler-body                                                 | The outer container for a collapsible spoiler. Has one spoiler-title and one spoiler-body as children.                                          |
| `spoiler-title`     | children                                                                              | The title of the spoiler.                                                                                                                       |
| `spoiler-body`      | children                                                                              | The content of the spoiler.                                                                                                                     |
| `ul`                | children: li                                                                          | An unordered list.                                                                                                                              |
| `ol`                | children: li                                                                          | An ordered list.                                                                                                                                |
| `li`                | children                                                                              | A list item of an unorderd or ordered list.                                                                                                     |
| `row`               | children: col                                                                         | A responsive row with multiple columns.                                                                                                         |
| `col`               | size, children                                                                        | A column. The size is relative to the other sizes.                                                                                              |
| `important`         | children                                                                              | Highlights an element.                                                                                                                          |
| `anchor`            | id                                                                                    | An anchor tag with an id.                                                                                                                       |
| `table`             | children: tr                                                                          | A table.                                                                                                                                        |
| `tr`                | children: th, td                                                                      | A row in a table.                                                                                                                               |
| `th`                | children                                                                              | A heading cell.                                                                                                                                 |
| `td`                | children                                                                              | A content cell.                                                                                                                                 |
| `geogebra`          | id                                                                                    | A geogebra applet from GeogebraTube.                                                                                                            |
| `injection`         | href                                                                                  | Loads another entity on the client and injects it.                                                                                              |
| `exercise`          | task, solution, taskLicense, solutionLicense, grouped, positionInGroup,positionOnPage | An exercise with a task and a solution. The task and the solution have a separate license notice. This type includes grouped exercises as well. |
| `exercise-group`    | content, license, positionOnPage, children: exercise                                  | Intro of an exercise group, also with a separate license.                                                                                       |
| `video`             | src                                                                                   | An embedded video.                                                                                                                              |
| `code`              | content                                                                               | A block of monospaced code.                                                                                                                     |
| `equations`         | steps                                                                                 | A lists of steps for an equation (work in progress).                                                                                            |

###Notes

Not every com

---

OLD
OLD
OLD
OLD
OLD
OLD
OLD
OLD
OLD
OLD
OLD
OLD
OLD
OLD

### Creating pages

Routes are mapped to individual files in the `pages`-folder. Create a [page](https://nextjs.org/docs/basic-features/pages) by adding following file:

```tsx
// src/pages/hello-world.tsx

export default function HelloWorld() {
  return <p>Welcome to the frontend!</p>
}
```

Visit `localhost:3000/helloworld` to view this page.

### Adding styles

You can attach [styles](https://styled-components.com/docs/basics#getting-started) to html elements and use them in your component:

```tsx
// src/pages/hello-world.tsx

import styled from 'styled-components'

export default function HelloWorld() {
  return <BigParagraph>Welcome to the frontend!</BigParagraph>
}

const BigParagraph = styled.p`
  text-align: center;
  font-size: 3rem;
  color: lightgreen;
`
```

### Building components

Use functional components and [hooks](https://reactjs.org/docs/hooks-overview.html) to split your code into reusable pieces. Some basic features are shown in this example:

```tsx
// src/pages/hello-world.tsx

import React from 'react'
import styled from 'styled-components'

export default function HelloWorld() {
  return <ClickMeTitle title="Welcome to the frontend!" />
}

function ClickMeTitle({ title }) {
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
```

Visit `localhost:3000/hello-world`. Click on the text. Every click should toggle a smiley face:

![grafik](https://user-images.githubusercontent.com/13507950/76195662-1a048700-61e9-11ea-8abb-e98cf1bf3e32.png)

## Basic Features

### TypeScript

We love types. They help us to maintain code and keep the codebase consistent. We also love rapid development and prototyping. You decide: Add your type declarations immediately as you code or later when the codebase stabilizes. The choice is up to you:

```tsx
export default function HelloWorld() {
  return <Greeter title="Hello" subline="Welcome to the frontend!" />
}

interface GreeterProps {
  title: string
  subline?: string
}

function Greeter({ title, subline }: GreeterProps) {
  return (
    <>
      <h1>{title}</h1>
      {subline && <small>{subline}</small>}
    </>
  )
}
```

### Components

The frontend is a growing collection of components. Package every part of the UI as a component, save them in `src/components` and let the file name match the components name in kebab-case. Export the component and type the props. A complete component file would look like this:

```tsx
// src/components/greeter.tsx

interface GreeterProps {
  title: string
  subline?: string
}

export function Greeter({ title, subline }: GreeterProps) {
  return (
    <>
      <h1>{title}</h1>
      {subline && <small>{subline}</small>}
    </>
  )
}
```

### Responsive Design

Users will come to the frontend using very different devices, from narrow smartphones to very wide screens. Adapt your components and change there appearing with media queries:

```tsx
import styled from 'styled-components'

export function HelloWorld() {
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
```

This example makes use of [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). On wide screens, both paragraphs are shown next to each other:

![](https://user-images.githubusercontent.com/13507950/76287324-7d9fba80-62a4-11ea-9f59-6d682aa8ac36.png)

On smaller screens, they are below each other:

![](https://user-images.githubusercontent.com/13507950/76287406-b17ae000-62a4-11ea-9901-73f7b6b868cc.png)

### Theming

We can improve the previous example by extracting commenly used constants like breakpoints or colors into a [theme](https://styled-components.com/docs/advanced#theming). The file `src/theme.tsx` defines our global theme which you can access in every component:

```tsx
import styled from 'styled-components'

export function HelloWorld() {
  return (
    <ResponsiveBox>
      <GrowingParagraph>Hallo</GrowingParagraph>
      <GrowingParagraph>Welt</GrowingParagraph>
    </ResponsiveBox>
  )
}

const ResponsiveBox = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`

const GrowingParagraph = styled.p`
  flex-grow: 1;
  text-align: center;
  font-size: 2rem;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.brand};
`
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

export function HelloWorld() {
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
```

### Style Adaption

Often you need two components with only slightly different styles. Adapt your styles [based on props](https://styled-components.com/docs/basics#adapting-based-on-props):

```tsx
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane } from '@fortawesome/free-solid-svg-icons'

export function HelloWorld() {
  return (
    <BigIcon iconColor="pink">
      <FontAwesomeIcon icon={faCandyCane} size="1x" />
    </BigIcon>
  )
}

const BigIcon = styled.div<{ iconColor: string }>`
  text-align: center;
  font-size: 3rem;
  color: ${(props) => props.iconColor};
  margin: 30px;
`
```

This is one of the rare places where types are mandatory.

### Polished

To boost your creativity, we included a bunch of useful css [helper from polished](https://polished.js.org/docs/):

```tsx
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCandyCane } from '@fortawesome/free-solid-svg-icons'
import { lighten } from 'polished'

export function HelloWorld() {
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
  color: ${(props) => lighten(props.lighter, 'pink')};
  margin: 30px;
`
```

Import your helper from polished and use it in interpolations.

### Assets

Put static content like images or documents into the `public/_assets` folder.

Example: The file `public/_assets/img/placeholder.png` is accessible via `localhost:3000/_assets/img/placeholder.png`

You can use assets in your components:

```tsx
export function HelloWorld() {
  return <img src="/_assets/img/placeholder.png" alt="placeholder" />
}
```

### SVG

You can import a svg directly. They are inlined and usable as component:

```tsx
import SerloLogo from '../public/_assets/img/serlo-logo.svg'

export function HelloWorld() {
  return <SerloLogo />
}
```

### Tooltips, Dropdowns & Menus

You can add elements that [pop out](https://atomiks.github.io/tippyjs/) of the page with [Tippy](https://github.com/atomiks/tippyjs-react). A basic drop button looks like this:

```tsx
import styled from 'styled-components'
import Tippy from '@tippyjs/react'

export function HelloWorld() {
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
```

Surround the target element with the `Tippy` component and pass the content to it. There are many more [props](https://atomiks.github.io/tippyjs/v6/all-props/) to explore.

### Modals

Show information to the user with modals. [react-modal](https://github.com/reactjs/react-modal) provides the necessary functionality. This example shows how you can get started:

```tsx
import React from 'react'
import { Modal } from '@/components/Modal' // our wrapper

const centeredModal = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'static',
  },
}

export function HelloWorld() {
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
```

You handle the state by yourself. The `Modal` component has [many options](http://reactcommunity.org/react-modal/) available. Import the modal from `src/reactmodal.tsx`. This takes care of the app element.

### Formulas

You can use [KaTeX](https://github.com/KaTeX/KaTeX) to render formulas:

```tsx
import styled from 'styled-components'
import { Math } from '@/components/content/Math'

export function HelloWorld() {
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
```

Our math component takes two props: `formula` is the LaTeX string, `inline` is optional and will make the formula a bit smaller. The rendered formula is a `span` that can be placed anywhere.

## Advanced Topics

### Importing Component dynamically

If some part of a page is heavy and only relevant for a smaller fraction of users, import it dynamically. Write your component as usual:

```tsx
// src/components/fancy-component.tsx

export function FancyComponent() {
  return <p>This is some heavy component</p>
}
```

Use a [dynamic import](https://nextjs.org/docs/advanced-features/dynamic-import) to load the component:

```tsx
// src/pages/hello-world.tsx

import React from 'react'
import dynamic from 'next/dynamic'

const FancyComponent = dynamic(() =>
  import('@/components/fancy-component').then((mod) => mod.FancyComponent)
)

export default function HelloWorld() {
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
```

The source code of `FancyComponent` is splitting into a separate chunk and is only loaded when users click the button.

### Reusing CSS Snippets

You can extend components by adding style snippets. These snippets are functions that add new props to a styled component:

```tsx
import styled from 'styled-components'

export function HelloWorld() {
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

### \_document.tsx and \_app.jsx

Your pages get wrapped in two components, [\_document.tsx](https://nextjs.org/docs/advanced-features/custom-document) and [\_app.tsx](https://nextjs.org/docs/advanced-features/custom-app). You can override both files. The document contains everything that is outside of your react app, especially the html and body tag. This is a good place to set styles on these or to define the language. The document is rendered on the server only.

The app is the entrypoint of your page and is rendered client-side as well. You can add global providers or import css files here.

### Peer dependencies

Here is a list of included peer dependencies:

- `styled-components` depends on `react-is`

## FAQ

### Is there any css reset?

No, we are not using any [css resets](https://github.com/jaydenseric/Fix/issues/3). Each component should reset their own styles.

### Do I have to vendor prefix my css?

No, styled components [takes care](https://styled-components.com/docs/basics#motivation) of this already.

### Can I add external css?

Only if it is absolutely necessary. You are able to import external `.css` files in `src/pages/_app.tsx`. These stylesheets are always global and included in every page. If possible, use a package that supports styled components.

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

Attention: Make sure that the result of SSR and client side rendering is the same! Making a difference between environments can cause inconsistencies and will lead to react warnings.

### How can I focus an element?

To focus a html element, you need access to the underlying DOM node. Use the [ref hook](https://reactjs.org/docs/hooks-reference.html#useref) for this.

### What does this syntax mean?

JavaScript compilers allow a greater range of syntax. Here is a small cheatsheet.

#### Destructuring Object

```tsx
const { title, url } = props
// -->
const title = props.title
const url = props.url
```

#### Destructuing Array

```tsx
const [open, setOpen] = React.useState(false)
// -->
const __temp = React.useState(false)
const open = __temp[0]
const setOpen = __temp[1]
```

#### Object Property Shorthand

```tsx
return { title, content }
// -->
return { title: title, content: content }
```

#### String Interpolation

```tsx
return `The key ${key} can not be found in ${db}.`
// -->
return 'The key ' + key + ' can not be found in ' + db + '.'
```

#### JSX

```tsx
return <Par gray={true}>This is a paragraph</Par>
// -->
return React.createElement(Par, { gray: true }, `This is a paragraph`)
```

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
```

The brother can pass a message to its sister by declaring the state in the parent. React takes care of updating and rendering.

### How can I change the port of the dev server?

You can change the port by running `yarn dev --port 8080`.
