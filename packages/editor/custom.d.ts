declare module '*.svg' {
  import { FC, SVGAttributes } from 'react'
  const content: FC<SVGAttributes<SVGElement>>
  export default content
}
