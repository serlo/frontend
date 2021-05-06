import request from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface ParentViewProps {
  id: number
  paths: string[][]
}

// Unser Client
export default renderedPageNoHooks<ParentViewProps>((props) => (
  <FrontendClientBase entityId={props.id}>
    <div>
      <h1 className="text-4xl my-12">Zuordnungen von {props.id}</h1>
      {props.paths.map((path, i) => (
        <div key={i} className="my-4">
          {path.join(' > ')}
        </div>
      ))}
    </div>
  </FrontendClientBase>
))

// Unser Server
export const getStaticProps: GetStaticProps<ParentViewProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)

  try {
    const paths = []

    const res = await request(
      endpoint,
      `
  {
    uuid(id: ${id}) {
      ... on AbstractTaxonomyTermChild {
        taxonomyTerms {
          nodes {
            navigation {
              path {
                nodes {
                  label
                }
              }
            }
          }
        }
      }
    }
  }
  `
    )

    for (const path of res.uuid.taxonomyTerms.nodes) {
      paths.push(path.navigation.path.nodes.map((x: any) => x.label))
    }

    return {
      props: {
        id,
        paths,
      },
      revalidate: 1,
    }
  } catch (e) {
    return {
      props: {
        id,
        paths: [],
      },
      revalidate: 1,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
