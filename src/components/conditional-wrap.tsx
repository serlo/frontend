// from https://gist.github.com/kitze/23d82bb9eb0baabfd03a6a720b1d637f

export interface ConditionalWrapProps {
  children: JSX.Element | (JSX.Element | null)[]
  condition: boolean
  wrapper: (children: JSX.Element | (JSX.Element | null)[]) => JSX.Element
}

export function ConditionalWrap({
  condition,
  wrapper,
  children,
}: ConditionalWrapProps) {
  return condition ? wrapper(children) : <>{children}</>
}
