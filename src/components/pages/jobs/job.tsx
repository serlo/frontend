import dynamic from 'next/dynamic'
import { useState } from 'react'

import { HeadTags } from '@/components/head-tags'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
// eslint-disable-next-line import/extensions
import { PersonioPosition } from '@/pages/jobs/[[...jobId]]'

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
)
const h2Class =
  'mx-side text-4xl leading-cozy tracking-tight font-extrabold text-gray-700'

export function Job({ position }: { position: PersonioPosition }) {
  const { id, name, employmentType, office, schedule, jobDescriptions } =
    position

  const [shareOpen, setShareOpen] = useState(false)

  return (
    <>
      <HeadTags data={{ title: `${name} bei Serlo` }} />

      <div className="relative">
        <MaxWidthDiv>
          <div className="mt-16 md:mt-[11vh]">{renderUserTools(true)}</div>
          <Breadcrumbs
            data={[
              {
                label: 'Alle Jobs anzeigen',
                url: '/jobs#stellen',
              },
            ]}
            asBackButton
          />
          <h1 className={h2Class + ' mt-11 sm:mt-0'}>{name}</h1>
          <p className="serlo-p mt-2">
            {employmentType === 'permanent' ? 'Festanstellung' : ''} •{' '}
            {schedule === 'full-or-part-time' ? 'Voll- oder Teilzeit' : ''}
            {schedule === 'full-time' ? 'Vollzeit' : ''} • {office}
          </p>

          {jobDescriptions?.jobDescription?.map(({ name, value }) => {
            return (
              <section key={name}>
                <h2 className="serlo-h2 text-gray-700 font-extrabold border-0 mb-2">
                  {name}
                </h2>
                <div
                  className="serlo-editor-hacks sane-text-defaults mx-side text-lg"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </section>
            )
          })}

          <section className="my-12 mx-side">
            <a
              className="serlo-button-green text-xl px-5"
              href={`https://serlo.jobs.personio.de/job/${id}?display=de#apply`}
              target="_blank"
              rel="noreferrer"
            >
              Jetzt Bewerben!
            </a>
          </section>
          {renderUserTools(false)}
          <ShareModal
            isOpen={shareOpen}
            onClose={() => setShareOpen(false)}
            showPdf={false}
            path="jobs"
          />
        </MaxWidthDiv>
      </div>
      <style jsx global>{`
        .sane-text-defaults {
          p {
            margin-bottom: 1rem !important;
          }
        }
        @font-face {
          font-family: 'Karmilla';
          font-style: bolder;
          font-weight: 800;
          src: url('/_assets/fonts/karmilla/karmilla-bolder.woff2')
              format('woff2'),
            url('/_assets/fonts/karmilla/karmilla-bold.woff') format('woff');
          font-display: swap;
        }
      `}</style>
    </>
  )

  function renderUserTools(aboveContent: boolean) {
    return (
      <UserTools
        onShare={() => setShareOpen(true)}
        aboveContent={aboveContent}
      />
    )
  }
}
