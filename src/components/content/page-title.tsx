import Head from 'next/head'
import * as React from 'react'

import { StyledH1 } from '../tags/styled-h1'

type PageTitleProps = React.PropsWithChildren<{
  headTitle?: boolean
  title: string
  icon?: JSX.Element
}>

export function PageTitle({ headTitle, title, icon }: PageTitleProps) {
  return (
    <>
      {headTitle && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <StyledH1 extraSpaceAbove>
        {title} {icon}
      </StyledH1>
    </>
  )
}
