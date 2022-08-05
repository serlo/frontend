import { Link } from '@/components/content/link'
import { HeadTags } from '@/components/head-tags'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
// eslint-disable-next-line import/extensions
import { PersonioPosition } from '@/pages/jobs/[[...jobId]]'

const h2Class =
  'mx-side text-4xl leading-cozy tracking-tight font-extrabold text-gray-700'

export function Job({ position }: { position: PersonioPosition }) {
  const { id, name, employmentType, office, schedule, jobDescriptions } =
    position
  return (
    <>
      <HeadTags data={{ title: `${name} bei Serlo` }} />

      <MaxWidthDiv>
        <Breadcrumbs
          data={[
            {
              label: 'Alle Jobs anzeigen',
              url: '/jobs#stellen',
            },
          ]}
          asBackButton
        />
        <h1 className={h2Class}>{name}</h1>
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
          <Link
            className="serlo-button-blue text-2xl px-5"
            href={`https://serlo.jobs.personio.de/job/${id}?display=de#apply`}
            noExternalIcon
          >
            Jetzt Bewerben!
          </Link>
        </section>
      </MaxWidthDiv>
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
}
