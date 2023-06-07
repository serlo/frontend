import { GetStaticPaths, GetStaticProps } from 'next'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { fetchEditorData } from '@/fetcher/fetch-editor-data'
import { prisma } from '@/helper/prisma'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface CompareProps {
  state: string
  privateLink: string
}

export default renderedPageNoHooks<CompareProps>(({ state, privateLink }) => (
  <FrontendClientBase noContainers>
    <style jsx>{`
      .wrapper-split :global(td) {
        max-width: 45vw;
        overflow: scroll;
      }
      .wrapper-split :global(pre) {
        font-size: 0.9rem;
      }

      .wrapper-single :global(pre) {
        font-size: 1.125rem !important;
      }
    `}</style>
    <div className="wrapper-split">
      <ReactDiffViewer
        leftTitle="Aktuelle Version"
        rightTitle="Privater Link"
        oldValue={JSON.stringify(JSON.parse(state), null, 2)}
        newValue={JSON.stringify(JSON.parse(privateLink), null, 2)}
        splitView
        hideLineNumbers
        compareMethod={DiffMethod.WORDS}
      />{' '}
    </div>
  </FrontendClientBase>
))

export const getStaticProps: GetStaticProps<CompareProps> = async (context) => {
  const revisionId = parseInt(context.params?.id as string)

  if (isNaN(revisionId)) {
    return { notFound: true }
  }

  const result = await fetchEditorData(context.locale!, [
    context.params?.id as string,
  ])

  if (result.errorType !== 'none') {
    return { notFound: true }
  }

  // @ts-expect-error state is unknown, but we "know it" here
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const state: string = result.initialState.state.content

  const privateLink = (
    await prisma.privateLinkPrototype.findFirstOrThrow({
      where: { key: context.params?.key as string },
    })
  ).content

  return {
    props: {
      state,
      privateLink,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
