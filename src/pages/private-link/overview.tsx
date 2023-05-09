import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { prisma } from '@/helper/prisma'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface PrivateLinkProps {
  entries: { title: string; key: string; id: number; date: string }[]
}

export default renderedPageNoHooks<PrivateLinkProps>(({ entries }) => {
  return (
    <FrontendClientBase entityId={-1} authorization={{}}>
      <h1 className="serlo-h1 mt-12" itemProp="name">
        Übersicht aller privater Links
      </h1>
      <div className="min-h-1/4">
        {entries.map((entry) => (
          <div key={entry.key} className="serlo-p my-3">
            <a
              href={
                'https://frontend-git-poc-remix-serlo.vercel.app/private-link/' +
                entry.key
              }
              className="serlo-link"
            >
              {entry.title}
            </a>{' '}
            (von {entry.id}) <small>{entry.date}</small>
          </div>
        ))}
      </div>
    </FrontendClientBase>
  )
})

export const getServerSideProps: GetServerSideProps<
  PrivateLinkProps
> = async () => {
  const data = await prisma.privateLinkPrototype.findMany()
  if (!data) {
    return { notFound: true }
  }

  data.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  return {
    props: {
      entries: data.map((data) => ({
        key: data.key,
        id: data.id,
        title: data.title,
        date: data.timestamp.toLocaleString('de-De'),
      })),
    },
  }
}
