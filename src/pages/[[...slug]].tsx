import { NextPage } from 'next'
import React from 'react'

import { InitialProps } from '@/data-types'
import { getInitialProps } from '@/fetcher/get-initial-props'

const PageView: NextPage<{}> = () => {
  return <p>Old render path</p>
}

PageView.getInitialProps = getInitialProps

export interface PageViewProps {
  fetchedData: any
  origin: string
  page?: string
  newInitialProps?: InitialProps
}

export default PageView
