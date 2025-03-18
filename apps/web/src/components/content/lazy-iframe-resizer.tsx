import dynamic from 'next/dynamic'

export const LazyIframeResizer = dynamic(
  () =>
    import('./iframe-resizer').then((module) => ({
      default: module.IFrameResizer,
    })),
  {
    ssr: false,
  }
)
