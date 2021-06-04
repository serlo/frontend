import Head from 'next/head'
import * as React from 'react'

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
      <h1 className="serlo-h1 mt-20">
        {title} {icon}
      </h1>
    </>
  )
}
