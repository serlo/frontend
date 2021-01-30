import { Router } from 'next/router'
import NProgress from 'nprogress'

import { NProgressStyles } from './n-progress-styles'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export const NProgressRouter = () => <NProgressStyles />
