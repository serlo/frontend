import Head from 'next/head'
import React from 'react'

import { StyledH1 } from '../tags/styled-h1'

type PageTitleProps = React.PropsWithChildren<{
  headTitle?: boolean
  title: string
}>

export function PageTitle({ headTitle, title }: PageTitleProps) {
  return (
    <>
      {headTitle && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <StyledH1 extraSpaceAbove>{title}</StyledH1>
    </>
  )
}
