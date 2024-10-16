import Head from 'next/head'
import { PropsWithChildren } from 'react'

import { cn } from '@/helper/cn'

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
        className={cn(
          'serlo-h1 mt-20 hyphens-manual',
          extraBold &&
            'text-4xl font-extrabold tracking-tight text-almost-black'
        )}
      >
        {title} {icon}
      </h1>
    </>
  )
}
