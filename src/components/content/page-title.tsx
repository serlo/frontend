import clsx from 'clsx'
import Head from 'next/head'
import { PropsWithChildren } from 'react'

type PageTitleProps = PropsWithChildren<{
  headTitle?: boolean
  title: string
  icon?: JSX.Element
  extraBold?: boolean
}>

export function PageTitle({
  headTitle,
  title,
  icon,
  extraBold,
}: PageTitleProps) {
  return (
    <>
      {headTitle && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      <h1
        className={clsx(
          'serlo-h1 mt-20',
          extraBold &&
            'font-extrabold tracking-tight text-4xl text-truegray-700'
        )}
      >
        {title} {icon}
      </h1>
    </>
  )
}
