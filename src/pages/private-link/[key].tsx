import { GetStaticPaths, GetStaticProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { convertState } from '@/fetcher/convert-state'
import { FrontendContentNode } from '@/frontend-node-types'
import { prisma } from '@/helper/prisma'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { renderArticle } from '@/schema/article-renderer'

interface PrivateLinkProps {
  title: string
  value: FrontendContentNode[]
}

export default renderedPageNoHooks<PrivateLinkProps>(({ title, value }) => {
  return (
    <FrontendClientBase entityId={-1} authorization={{}}>
      <h1 className="serlo-h1 mt-12" itemProp="name">
        {title}
      </h1>
      <div className="min-h-1/4">{renderArticle(value)}</div>
    </FrontendClientBase>
  )
})

export const getStaticProps: GetStaticProps<PrivateLinkProps> = async (
  context
) => {
  const key = context.params?.key as string
  const data = await prisma.privateLinkPrototype.findFirst({ where: { key } })
  if (!data) {
    return { notFound: true }
  }

  return {
    props: {
      title: data.title,
      value: JSON.parse(
        JSON.stringify(convertState(data.content))
      ) as PrivateLinkProps['value'],
    },
    revalidate: 60 * 15, // 15 min,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
