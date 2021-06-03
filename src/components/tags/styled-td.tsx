import { PropsWithChildren, FC } from 'react'

export const StyledTd: FC<PropsWithChildren<{ className?: string }>> = (
  props
) => <td className={`serlo-td ${props.className ?? ''}`}>{props.children}</td>
