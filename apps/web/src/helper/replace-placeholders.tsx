import { Fragment } from 'react'

import { replaceWithJSX } from './replace-with-jsx'

//expects placeholders to be in this format: %placeholder%

export function replacePlaceholders(
  string: string,
  replaceables: { [key: string]: JSX.Element | string }
) {
  return replaceWithJSX([string], /%(.+?)%/g, (str, i) => (
    <Fragment key={i}>{replaceables[str] ?? `%${str}%`}</Fragment>
  ))
}
