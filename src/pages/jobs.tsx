import clsx from 'clsx'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { EntityBase } from '@/components/entity-base'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { HeadTags } from '@/components/head-tags'
import { InviteModalProps } from '@/components/user-tools/invite-modal'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { UuidType, SingleEntityPage, SlugProps } from '@/data-types'
import { fetchPageData } from '@/fetcher/fetch-page-data'
import { FrontendContentNode } from '@/frontend-node-types'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { renderArticle } from '@/schema/article-renderer'

const jobsPageId = 226222 //21563

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
)

const InviteModal = dynamic<InviteModalProps>(() =>
  import('@/components/user-tools/invite-modal').then((mod) => mod.InviteModal)
)

export default renderedPageNoHooks<{ pageData: SingleEntityPage }>(
  ({ pageData }) => {
    return (
      <FrontendClientBase
        noContainers
        entityId={jobsPageId}
        authorization={pageData.authorization}
      >
        <EntityBase
          page={{ ...pageData, secondaryMenuData: undefined }}
          entityId={jobsPageId}
        >
          <Content pageData={pageData} />
        </EntityBase>
      </FrontendClientBase>
    )
  }
)

function Content({ pageData }: { pageData: SingleEntityPage }) {
  const [shareOpen, setShareOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)

  const { entityData: data } = pageData

  return (
    <>
      <HeadTags data={{ title: 'Jobs bei Serlo' }} />
      {renderUserTools({ aboveContent: true })}
      <main className="text-truegray-700">
        <section className="text-center max-w-3xl mx-auto mt-20 md:mt-[11vh] font-bold px-2">
          <p className="text-brand font-handwritten text-3xl landing-button-with-wings landing-button-with-wink p-with-wink">
            Hey du
          </p>
          <h1
            className={clsx(
              'text-center text-5xl font-extrabold',
              'tracking-tight',
              'max-w-3xl mt-3 mb-6 mx-auto'
            )}
          >
            Digitale Bildung braucht{' '}
            <span className="pb-2 underlined">dich</span> !
          </h1>
          <div className="mt-10 mb-8 text-left font-normal max-w-2xl mx-auto"></div>
          <p className="text-3xl leading-cozy">
            Hier noch einen kurzen schönen Text?
          </p>
        </section>

        <aside className="w-full relative left-0 right-0 mt-16">
          <img src="/_assets/img/jobs/jobs-header.jpg" />
        </aside>

        <section>
          <h3
            className={clsx(
              'text-center text-4xl text-truegray-700 font-bold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-32 mx-auto relative z-10 px-2'
            )}
          >
            <p className=" italic font-handwritten text-5xl">
              Das erwartet dich
            </p>
            <div className="relative z-0 h-0 w-full mt-1">
              <div
                className={clsx(
                  'absolute inset-0 mt-[-4.3rem] h-40 ml-5 opacity-50',
                  'bg-circled-and-arrow bg-no-repeat bg-top bg-contain'
                )}
              ></div>
            </div>
            <div className="strech-wide grid mobile:grid-cols-2 md:grid-cols-3 w-[100vw] relative py-6 px-side sm:text-left sm:mx-0 sm:max-w-[100vw] text-2xl lg:py-10 lg:mb-16 text-center">
              <div className="w-full text-center">
                <img
                  src="/_assets/img/donations/donation-bird.svg"
                  className="max-h-28 mt-10 mx-auto"
                />
                <b>Impact</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Hier kommt noch ein kurzer Text hin jeweils!
                </p>
              </div>
              <div className="w-full text-center">
                <img
                  src="/_assets/img/donations/donation-bird.svg"
                  className="max-h-28 mt-10 mx-auto"
                />
                <b>Arbeit mit Sinn</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Hier kommt noch ein kurzer Text hin jeweils!
                </p>
              </div>
              <div className="w-full text-center">
                <img
                  src="/_assets/img/donations/donation-bird.svg"
                  className="max-h-28 mt-10 mx-auto"
                />
                <b>... und Unsinn</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Hier kommt noch ein kurzer Text hin jeweils!
                </p>
              </div>
              <div className="w-full text-center">
                <img
                  src="/_assets/img/donations/donation-bird.svg"
                  className="max-h-28 mt-10 mx-auto"
                />
                <b>New Work – aber richtig</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Hier kommt noch ein kurzer Text hin jeweils!
                </p>
              </div>
              <div className="w-full text-center">
                <img
                  src="/_assets/img/donations/donation-bird.svg"
                  className="max-h-28 mt-10 mx-auto"
                />
                <b>Flexibilität</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Hier kommt noch ein kurzer Text hin jeweils!
                </p>
              </div>
              <div className="w-full text-center">
                <img
                  src="/_assets/img/donations/donation-bird.svg"
                  className="max-h-28 mt-10 mx-auto"
                />
                <b>Gemeinsam</b>
                <br />
                <p className="text-xl font-normal max-w-65 mx-auto mt-2">
                  Hier kommt noch ein kurzer Text hin jeweils!
                </p>
              </div>
            </div>
          </h3>
        </section>

        <section className="text-center partner strech-wide w-[100vw] relative py-6 px-side sm:text-left sm:mx-0 sm:max-w-[100vw] lg:text-2xl lg:py-10 lg:mb-16">
          <img src="/_assets/img/landing/birds.svg" className="mx-auto mt-12" />
          <h3
            style={{ hyphens: 'auto' }}
            className={clsx(
              'text-center text-4xl font-bold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-7 mx-auto'
            )}
          >
            Unsere offenen Stellen
          </h3>
          <div className="">{data.content && renderContent(data.content)}</div>
        </section>
      </main>

      {renderUserTools()}
      {renderShareModal()}
      {renderInviteModal()}

      <style jsx>{`
        @font-face {
          font-family: 'Karmilla';
          font-style: bolder;
          font-weight: 800;
          src: url('/_assets/fonts/karmilla/karmilla-bolder.woff2')
              format('woff2'),
            url('/_assets/fonts/karmilla/karmilla-bold.woff') format('woff');
          font-display: swap;
        }
        .strech-wide {
          left: calc(-50vw + 50%);
        }

        .about {
          padding-top: 7rem;
          padding-bottom: 5rem;
          margin: 6rem 0 0 0;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat;
          background-size: 100vw 100%;

          @screen sm {
            padding-top: 11rem;
            padding-bottom: 9rem;
            background-position: 20% 19%;
            background-size: 82%, 100vw 100%;
          }
        }
        .underlined {
          padding-right: 1rem;
          white-space: nowrap;
          background: url('/_assets/img/landing/simple-underline.svg') no-repeat
            bottom;
        }
        :global(.landing-button-with-wings) {
          &:after,
          &:before {
            content: ' ';
            background: url('/_assets/img/landing/wing-left.svg') no-repeat;
            position: absolute;
            margin-top: -0.6rem;
            width: 4rem;
            height: 4rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity ease-in 0.2s;
          }

          &:after {
            margin-left: 1rem;
            transform: scaleX(-1);
          }

          &:before {
            margin-left: -5rem;
          }

          &:hover {
            &:after,
            &:before {
              opacity: 1;
            }
          }
        }
        :global(.landing-button-with-wink) {
          &:after,
          &:before {
            background: url('/_assets/img/landing/wink-left.svg') no-repeat !important;
            margin-top: -2rem !important;
            background-size: 65% !important;
          }
        }
        .p-with-wink {
          &:after,
          &:before {
            margin-top: -1rem !important;
            background-size: 75%;
            width: 2.5rem;
            height: 2.5rem;
            opacity: 1;
          }
          &:after {
            margin-left: -0.5rem;
          }
          &:before {
            margin-left: -1.5rem;
          }
        }
        .partner {
          padding-top: 1rem;
          background: url('/_assets/img/landing/footer-container.svg') no-repeat;
          background-size: 100% 100%;
        }
      `}</style>
    </>
  )

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        onShare={() => setShareOpen(true)}
        onInvite={() => setInviteOpen(true)}
        aboveContent={setting?.aboveContent}
        id={data.id}
        unrevisedRevisions={data.unrevisedRevisions}
        data={{
          type: data.typename,
          id: data.id,
          alias: data.alias,
          trashed: data.trashed,
        }}
      />
    )
  }

  function renderShareModal() {
    const showPdf = [
      UuidType.Page,
      UuidType.Article,
      UuidType.CoursePage,
      UuidType.ExerciseGroup,
      UuidType.Exercise,
      UuidType.Solution,
    ].includes(data.typename)
    return (
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        showPdf={showPdf}
      />
    )
  }

  function renderInviteModal() {
    return (
      <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
    )
  }

  function renderContent(value: FrontendContentNode[]) {
    const content = renderArticle(value, `entity${data.id}`)
    if (data.schemaData?.setContentAsSection) {
      return <section itemProp="articleBody">{content}</section>
    }
    return content
  }
}

export const getStaticProps: GetStaticProps<SlugProps> = async (context) => {
  if (context.locale !== 'de') return { notFound: true }

  const pageData = await fetchPageData(`/${jobsPageId}`)

  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData)) as SingleEntityPage,
    },
    revalidate: 60 * 60, // 1h,
    notFound: pageData.kind !== 'single-entity',
  }
}
