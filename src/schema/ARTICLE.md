# Serlo Article Schema

Articles are the most complex entities on serlo.org. They allow a wide range of elements that can be composed and nested. To make working with them more predictable, it is useful to put some constraint on them. These constraints make up the schema of a serlo article. This document describes this schema.

## Terminology

### Text

The most low-level element of an article is text. A text is a string of characters.

### Mark

Text can be formatted with marks (like bold or italic). Marks apply to the characters of a string. The appearance of a text will not change if you split a text and apply the same marks to both parts.

### Element

Elements are container for other elements and text. Every element has a list of children.

### Type

Every element has a certain type. These types define the semantic structure of the article.

### Root

The top-level container is called the root. It contains a list of child elements. It has no type.

### Node

A node is refering to an element, text, or the root.

### Block vs. Inline

Elements can be block or inline. Block elements will occupy the whole width of the article and will be stacked vertically. Inline elements follow the 'flow' of the text. E.g. a heading is a block element, a `code` field is an inline element. All elements default to block.

### Voids

An element that contains no (directly) editable children is called a void element (e.g. images). The list of children consists of one empty text. All elements default to non-void.

### Path

A path is a list of indices that points to a node. The first index in the list specifies the index within root, the second index the index within this element, and so on. The path for root is an empty list.

## Mark Types

### `strong`

Possible values: undefined / true

### `em`

Possible values: undefined / true

### `color`

Possible values: undefined / blue / green / orange

## Element Types

### `a`

Attributes: href

Inline

### `inline-math`

Attributes: formula

Inline, Void

### `p`

Block

### `h`

Attributes: level (1-5)

Block

### `img`

Attributes: src, alt, href

Block, Void

### `math`

Attributes: formula

Block, Void

### `spoiler-container`

Block

### `spoiler-title`

Block

### `spoiler-body`

Block

### `ul`

Block

### `ol`

Block

### `li`

Block

### `row`

Block

### `col`

Attributes: size

Block

### `important`

Block

### `anchor`

Attributes: id

Block, Void

###

###

## Constraints

A _document_ is any combination of elements and text. Not every document has a useful structure. This section describes _constraints_ that a document must fulfill to become a serlo article.

All constraits are enforced by the _normalizer_. The normalizer takes a document and transforms it into an article. If the document breaks a constraint, the normalizer fixes the error by deleting, wrapping or moving parts of the document.

An article should be valid in all stages of its lifetime: In the editor, in the frontend and in the database. It will suffice that the editor takes care of normalization.

There are some [built-in constraint](https://docs.slatejs.org/concepts/10-normalizing). Based on them we have added some additional constraints:

### Text

Text must not contain line breaks. The normalizer will remove them.

### Marks

A mark with an unspecified value will be removed.

### Void Elements

Every void element has exactly one empty text as a child. Additional children or text will be removed.

### a

A link must only contain text or `inline-math`. Children that are elements will be unwrapped. A link that contains no text will be removed.

### inline-math

No addition constraints.

### p

A paragraph may only contain inline elements or text. Block elements will be unwrapped.

### h

The level must be an integer between 1 and 5. A heading with an invalid level will be removed. A heading may only contain text or `inline-math`. Other elements will be unwrapped.

### img

No addition constraints.

### math

No addition constraints

### spoiler-container

A `spoiler-container` must have exactly two children: A `spoiler-title` and a `spoiler-body`. The `spoiler-container` will be removed if it misses one of them or if the first child is not a `spoiler-title`. Every child, that is not an `spoiler-title` or an `spoiler-body`, and every addition `spoiler-title` and `spoiler-body`, will be removed.

### spoiler-title

A `spoiler-title` may only contain text or `inline-math`. Other elements will be unwrapped.

### spoiler-body

A `spoiler-body` may only contain elements of type `p`, `img`, `math`, `ul`, `ol`, `row`. Other elements will be unwrapped. Text will be wrapped in `p`.

### ul / ol

A list may only contain elements of type `li`. Elements of other types will be unwrapped. Text will be wrapped in `li`. Two adjacent lists will be merged.

### li

A list item may only contain elements of type `p`, `img`, `math` or another `ul` or `ol` of the same parent type, maximal nested twice. Other elements will be unwrapped. Text will be wrapped in `p`.

### row

A layout row may only contain elements of type `col`. Elements of other types will be unwrapped. Text will be wrapped in `col`.

### col

The column must have a size attribute. This attribute must be an integer greater equals 1. If the size is invalid, it will be reset to 4. A column may only contain following block elements: `p`, `img`, `math`, `ul`, `ol`. Other elements will be unwrapped. Text will be wrapped in `p`.

### important

A important container may only contain elements of type `p`, `img`, `math`, `ul`, `ol`, `row`. Other elements will be unwrapped. Text will be wrapped in `p`.

### Root

The document root may only contain elements of type `p`, `h`, `img`, `math`, `spoiler-container`, `ul`, `ol`, `row`, `important`. Other elements will be unwrapped. Text will be wrapped in `p`. A h1 may only appear as first child of root. Otherwise, it will be unwrapped.

## Guidelines

These constraints are a good foundation and especially useful, because they can be enforced programmatically. In addition, there are a list of _guidelines_ a valid article should follow.

Implementing these guidelines needs user interaction. The normalizer can or should not fix them automatically, but the editor will display a warning instead.

### No empty paragraphs

Most of the time they are unnecessary.

## No doubled spaces

Most of the time not intended.

### Correct nesting of headings

Don't skip levels when using headings.

### a tags should have non-empty href

Thats the minimum requirement

### Urls to serlo.org should be relative

To avoid being displayed as external link.

### Alt attribute on images should be set

Improves accessibility.

## Normalizer Implementation

### Usage

The normalizer with the implementation of the constraints lives in `src/schema/articleNormalizer.tsx`. It exposes `withArticle()` that you can use to extend a slate editor. Here is an example how to normalize a document:

```tsx
import withArticle from '../src/schema/articleNormalizer'
import { createEditor, Editor } from 'slate'

const document = {
  children: [
    {
      type: 'p',

      children: [{ type: 'p', children: [{ text: '123' }] }]
    }
  ]
}

function HelloWorld() {
  const editor = withArticle(createEditor())
  editor.children = document.children
  Editor.normalize(editor, { force: true })
  return JSON.stringify(editor.children)
}

export default HelloWorld
```

Running this example should remove the nested paragraph.

### Adding constraints

This is the overall structure of the normalizer:

```tsx
export default function withArticle(editor) {
  const { normalizeNode } = editor

  editor.normalizeNode = entry => {
    /*
     * our rules
     */

    normalizeNode(entry)
  }
}
```

It extends the built-in normalized and calls it at the end. A rule consists of four parts:

- One or multiple conditions that triggers the rule
- A small log message to indicate the error.
- A transformation that fixes the detected error
- returning `normalizeNode`

Using this structure, you can build multi-pass rules: Everytime something is wrong, you can a little bit. This change will trigger another normalization and you can fix the next thing.

The tree is normalized from the leafs to the root. After normalization, the node itself and its children should be normalized. You can assume that the children are normalized. All constraints will only regard the node and its children.

Take a look at the existing rules to get an impression of the availabe API.

### Add voids or inlines

To set an element type as void or inline, add them to the arrays `voidsElements` or `inlineElements` at the top of the file.

###

## Renderer Implementation

### Usage

You can find the default renderer at `src/schema/articleRenderer.tsx`. It exports the component `Article`. It takes a prop `value`, which should be a list of nodes. Give it the children of root to render a document:

```tsx
import Article from '../src/schema/articleRenderer'

const document = {
  children: [
    {
      type: 'p',
      children: [{ text: '123' }]
    },
    {
      type: 'p',
      children: [{ text: '567' }]
    }
  ]
}

function HelloWorld() {
  return <Article value={document.children} />
}

export default HelloWorld
```

### Adding element renderer

The object `renderer` defines a mapping of element types to render functions. Every render function gets called with five arguments: `element` is the element object itself, `attributes` are the props you should pass to the next react component. `children` is a react component of the children. `value` is the root of the document. `path` is the path to the element. This is an example:

```tsx
const renderer = {
  /* ... */
  important: renderImportant
}

export function renderImportant({ attributes, children }) {
  return <Important {...attributes}>{children}</Important>
}
```

### Adding leaf renderer

Leafs (aka texts) are rendered separately with `renderLeaf`. They become spans with styles attached.

## Guidelines Implementation

tba

## Converter

### From edtr-io state

Use `convertEdtrioState(state)` to convert a edtr-io state. Normalize result before usage.

### From legacy state

Use `convertLegacyState(state)` to convert legacy state (json format). Normalize result before usage.
