import { BoxRenderer } from '@editor/plugins/box/renderer'
import type { GetStaticProps } from 'next'

import type { LegalData } from './legal'
import { Link } from '@/components/content/link'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { fetchAndConvertLegalMarkdown } from '@/fetcher/fetch-and-convert-legal-markdown'
import { renderedPageNoHooks } from '@/helper/rendered-page'

type PrivacyPageData = LegalData & { lastChange: string }

export default renderedPageNoHooks<PrivacyPageData>((props) => {
  return <Content {...props} />
})

function Content({ contentHtml, isGerman, lastChange }: PrivacyPageData) {
  const date = new Date(lastChange).toLocaleDateString(
    isGerman ? 'de-DE' : 'en-UK'
  )
  return (
    <FrontendClientBase>
      <PageTitle
        title={isGerman ? 'Datenschutzerklärung' : 'Privacy Policy'}
        headTitle
      />
      <p className="serlo-p">
        <i>
          {isGerman ? 'wirksam ab dem' : 'effective'} <time>{date}</time>
        </i>
        <br />
        {isGerman
          ? 'Frühere Versionen findest Du im'
          : 'You can view past versions in the'}{' '}
        <Link
          href={`https://github.com/serlo/serlo.org-legal/tree/main/${
            isGerman ? 'de' : 'en'
          }/privacy`}
        >
          {isGerman ? 'Archiv' : 'archive'}
        </Link>
      </p>

      <BoxRenderer
        boxType="blank"
        title={
          <b>
            💁{' '}
            {isGerman
              ? 'Einwilligungen für externe Inhalte'
              : 'Consent for external content'}
          </b>
        }
        anchorId=""
      >
        <p className="serlo-p mt-6">
          {isGerman
            ? 'Deine Einwilligungen kannst Du'
            : 'You can check and revoke your given consent'}{' '}
          <Link href="/consent">
            {isGerman ? 'hier überprüfen und zurückrufen' : 'here'}.
          </Link>
        </p>
      </BoxRenderer>
      <div
        className="serlo-prose-hacks"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </FrontendClientBase>
  )
}

export const getStaticProps: GetStaticProps<PrivacyPageData> = async (
  context
) => {
  const isGerman = context.locale === 'de'
  const instance = isGerman ? 'de' : 'en'

  try {
    const contentHtml = await fetchAndConvertLegalMarkdown(
      isGerman,
      'privacy/current.md'
    )

    const lastUpdateResponse = await fetch(
      `https://api.github.com/repos/serlo/serlo.org-legal/commits?path=%2F${instance}%2Fprivacy%2Fcurrent.md&page=1&per_page=1`
    )
    const json = (await lastUpdateResponse.json()) as [
      { commit: { committer: { date: string } } },
    ]
    const lastChange = json[0].commit.committer.date

    return { props: { contentHtml, isGerman, lastChange } }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return { notFound: true }
  }
}
