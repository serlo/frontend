# Serlo Article Schema

Articles are the most complex entities on serlo.org. They allow a wide range of elements that can be composed and nested. To make working with them more predictable, it is useful to put some constraint on them. These constraints make up the schema of a serlo article. This document describes this schema.

## Terminology

### Text

The most low-level element of an article is text. A text is a string of characters.

### Mark

Text can be formatted with marks (like bold or italic). Marks apply to the characters of a string. The appearance of a text will not change if you split it and apply the same marks to both parts.

### Element

Elements are container for other elements and text. Every element has a list of children.

### Type

Every element has a certain type. These types define the semantic structure of the article.

### Root

The top-level element is called the root.

### Block vs. Inline

Elements can be block or inlines. Block elements will occupy the whole width of the article and will be display below each other. Inline elements follow the 'flow' or the text. A heading is a block element, this `code` element is an inline element.

### Voids

An element that contains no (directly) editable children is called a void element (e.g. images)

## Marks

### `strong`

undefined / true

### `em`

undefined / true

### `color`

undefined / blue / green / orange

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

Attributes: src, alt

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

###

###

## Constraints

A _document_ is any combination of elements and text. Not every document has a useful structure. This section describe _constraints_ that a document must fulfill to become a serlo article.

All constraits are enforced by the _normalizer_. The normalizer takes a document and transforms it into an article. If the document breaks a constraint, the normalizer fixes the error by deleting, wrapping or moving parts of the document.

An article should be valid in all stages of its lifetime: In the editor, in the frontend and in the database. It will suffice if the editor takes care of normalization.

There are some [built-in constraint](https://docs.slatejs.org/concepts/10-normalizing). Based on them we have some additional constraints:

### Text

Text must not contain line breaks, tabs, or multiple whitespaces. The normalizer will remove them.

### Marks

A mark with an unspecified value will be removed.

### Void Elements

Every void element has exactly one empty text as a child. Additional children or text will be removed.

### a

A link must only contain text. Children that are elements will be unwrapped. A link that contains no text will be removed.

### inline-math

No addition constraints.

### p

A paragraph may only contain inlines. Block elements will be unwrapped.

### h

The level must be an integer between 1 and 5. A heading with an invalid level will be removed. A heading may only contains text. Elements will be unwrapped.

### img

No addition constraints.

### math

No addition constraints

### spoiler-container

A `spoiler-container` must have exactly two children: A `spoiler-title` and a `spoiler-body`. The `spoiler-container` will be removed, if it misses one of them or if the first child is not a `spoiler-title`. Every child, that is not an `spoiler-title` or an `spoiler-body`, and every addition `spoiler-title` and `spoiler-body`, will be removed.

### spoiler-title

A `spoiler-title` may only contain text. Elements will be unwrapped.

### spoiler-body

A `spoiler-body` may only contain elements of type `p`, `img`, `math`, `ul`, `ol`, `row`. Other elements will be unwrapped. Text will be wrapped in `p`.

### ul / ol

A list may only contain elements of type `li`. Elements of other types will be unwrapped. Text will be wrapped in `li`. Two adjacent lists will be merged.

### li

A list item may only only contain inlines. Block elements will be unwrapped. Text will be wrapped in `li`.

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

Implementing these guidelines needs user interaction. The editor will not enforce them, but will display a hint instead. The author gets a warning when she/he tries to submit an article that breaks some guidelines.

### No empty paragraphs

Most of the they are unnecessary.

### Correct nesting of headings

Don't skip levels when using headings.

### Urls should be valid

This is probably a mistake.

### Urls to serlo.org should be relative

To avoid being display as external link.

### Alt attribute on images should be set

Improves accessibility.
