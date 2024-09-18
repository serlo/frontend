export interface GridImage {
  src: string
  caption: JSX.Element | null
  alt: string
  dimensions: {
    width: number
    height: number
  }
}
