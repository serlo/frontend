import { Descendant } from 'slate'

export interface GridImage {
  src: string
  caption?: Descendant
  dimensions: {
    width: number
    height: number
  }
}
