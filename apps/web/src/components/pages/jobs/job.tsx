import { renderSubline } from './overview'
import { HeadTags } from '@/components/head-tags'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { UserTools } from '@/components/user-tools/user-tools'
import type { PersonioPosition } from '@/pages/jobs/[[...jobId]]'

const h2Class =
  'mx-side text-4xl leading-cozy tracking-tight font-extrabold text-gray-700'

export function Job({ position }: { position: PersonioPosition }) {
  const { id, name, employmentType, jobDescriptions } = position

  const isVolunteer = employmentType === 'trainee'

  return (
    <>
      <HeadTags data={{ title: `${name} bei Serlo` }} />

      <div className="relative">
        <MaxWidthDiv>
          <div className="mt-16 md:mt-[11vh]">
            <UserTools aboveContent />
          </div>
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
            {isVolunteer ? null : <>{renderSubline(position)}</>}
          </p>

          {jobDescriptions?.jobDescription?.map(({ name, value }) => {
            return (
              <section key={name}>
                <h2 className="serlo-h2 mb-2 border-0 font-extrabold text-gray-700">
                  {name}
                </h2>
                <div
                  className="sane-text-defaults serlo-editor-hacks mx-side text-lg"
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </section>
            )
          })}
          <section className="mx-side my-12">{renderButton()}</section>
          <UserTools />
        </MaxWidthDiv>
      </div>
      <style jsx global>{`
        .sane-text-defaults p {
          margin-bottom: 1rem !important;
        }
        .sane-text-defaults ul {
          margin: 1rem 16px 30px 0;
          list-style-type: none;
          padding-left: 1.25rem;
        }

        .sane-text-defaults ul li:before {
          position: absolute;
          background-color: rgb(142 197 226);
          content: ' ';
          margin-left: -1.25rem;
          margin-top: 9px;
          height: 0.625rem;
          width: 0.625rem;
          border-radius: 9999px;
        }
        .sane-text-defaults ul li {
          margin-bottom: 0.5rem;
        }

        .sane-text-defaults {
          font-size: 1.125rem;
          line-height: 1.33;
        }

        .sane-text-defaults a {
          overflow-wrap: break-word;
          color: rgb(0 126 193);
          text-decoration: none;
          hyphens: auto;

          &:hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </>
  )

  function renderButton() {
    if (isVolunteer) return null
    return (
      <a
        className="serlo-button-green px-5 text-xl"
        href={`https://serlo.jobs.personio.de/job/${id}?display=de#apply`}
        target="_blank"
        rel="noreferrer"
      >
        Jetzt Bewerben!
      </a>
    )
  }
}
