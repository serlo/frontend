export const makeMargin = props =>
  props.full ? '' : 'margin-left:15px;margin-right:15px;'

export const makePadding = props =>
  props.full ? '' : 'padding-left:15px;padding-right:15px;'

export const makeButton = props =>
  `
    font-weight: bold;
    transition: all 0.2s ease-in-out 0s;
    border-radius: 2em;
    padding: 0.27em 0.6em;
    text-decoration: none;
    cursor: pointer;
  `
