import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

type RenderLayout<T> = (pageProps: T, props: AppProps<T>) => JSX.Element

export type NextRenderedPage<T = {}> = NextPage<T> & {
  renderer: RenderLayout<T>
}

export function renderedPageNoHooks<T>(renderer: RenderLayout<T>) {
  const NextPage: NextRenderedPage<T> = () => null
  NextPage.renderer = renderer
  return NextPage
}

export function isRenderedPage(page: NextPage): page is NextRenderedPage {
  return !!(page as NextRenderedPage).renderer
}
