import { Router } from 'next/router'
import NProgress from 'nprogress'
import React from 'react'

import { NProgressStyles } from './n-progress-styles'
import { ProgressProvider } from '@/contexts/progress-context'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export function NProgressRouter(props: any) {
  return (
    <ProgressProvider value={NProgress}>
      <NProgressStyles /> {props.children}
    </ProgressProvider>
  )
}
