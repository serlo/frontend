import { FC, SVGAttributes } from 'react'

declare module '*.svg' {
  const content: FC<SVGAttributes<SVGElement>>
  export default content
}
