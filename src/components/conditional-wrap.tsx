import { FC } from 'react'
// from https://gist.github.com/kitze/23d82bb9eb0baabfd03a6a720b1d637f

export interface ConditonalWrapProps {
  children: JSX.Element
  condition: boolean
  wrapper: (children: JSX.Element) => JSX.Element
}

export const ConditonalWrap: FC<ConditonalWrapProps> = ({
  condition,
  wrapper,
  children,
}) => (condition ? wrapper(children) : children)
