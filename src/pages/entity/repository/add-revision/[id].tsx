import request, { gql } from 'graphql-request'
import { GetServerSideProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { MathSpan } from '@/components/content/math-span'
import { Editor } from '@/components/editor/editor'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface AddRevisionProps {
  id: number
  content: string
  title: string
}

export default renderedPageNoHooks<AddRevisionProps>(
  ({ id, content, title }) => (
    <FrontendClientBase>
      <div className="controls w-full" />
      <MathSpan formula="" />
      <div className="edtr-io">
        <Editor
          state={{
            id,
            license: {
              agreement:
                'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> (http://creativecommons.org/licenses/by-sa/4.0/) und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche die Gesellschaft für freie Bildung e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> (http://de.serlo.org/21654) festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> (http://de.serlo.org/21654) verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
              iconHref: 'https://i.creativecommons.org/l/by-sa/4.0/88x31.png',
              id: 1,
              title: 'Dieses Werk steht unter der freien Lizenz cc-by-sa-4.0',
              url: 'https://creativecommons.org/licenses/by-sa/4.0/',
            },
            changes: '',
            title,
            content,
            reasoning: '',
            meta_title: '',
            meta_description: '',
          }}
        />
      </div>
      <style jsx global>{`
        .edtr-io h1 {
          @apply mx-side mb-9 mt-4 p-0 font-bold text-3.5xl special-hyphens-auto;
        }
        .edtr-io h2 {
          @apply mt-0 mb-6 pb-1 pt-6;
          @apply text-2.5xl font-bold special-hyphens-auto;
          @apply text-truegray-900 border-truegray-300 border-b;
        }
        .edtr-io {
          @apply text-lg leading-cozy;
        }
        .edtr-io a {
          @apply text-brand no-underline break-words hover:underline;
        }
      `}</style>
    </FrontendClientBase>
  )
)

export const getServerSideProps: GetServerSideProps<AddRevisionProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)
  const data = await request<{
    uuid: { currentRevision: { title: string; content: string } }
  }>(
    endpoint,
    gql`
      query uuid($id: Int) {
        uuid(id: $id) {
          ... on Article {
            currentRevision {
              title
              content
            }
          }
        }
      }
    `,
    { id }
  )
  return {
    props: {
      id,
      title: data.uuid.currentRevision.title,
      content: data.uuid.currentRevision.content,
    },
  }
}
