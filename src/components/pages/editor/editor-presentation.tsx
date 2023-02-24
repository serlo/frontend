import clsx from 'clsx'

import { EditorFeatures } from './editor-features'
import { EditorPartnerList } from './editor-partner-list'
import { EditorRoadmap } from './editor-roadmap'
import { EditorTeam, teamData } from './editor-team'
import { EducationPlugins } from './education-plugins'
import { Link } from '@/components/content/link'
import { Video } from '@/components/content/video'
import { HeadTags } from '@/components/head-tags'
import { Logo } from '@/components/navigation/header/logo'
import { breakpoints } from '@/helper/breakpoints'

export const h2Class =
  'text-center text-4xl leading-cozy tracking-tight font-extrabold'
const h3Class = 'text-gray-700 text-[1.3rem] font-extrabold'
// const italicClass = 'text-brand italic font-handwritten text-3xl'

// TODO: (on jobs page) fix share button, fix overflow

export function EditorPresentation() {
  return (
    <>
      <HeadTags
        data={{
          title:
            'Serlo Editor: Seamless Creation of Digital Learning Resources',
        }}
      />
      <header className="px-side lg:px-side-lg pt-6 text-center sm:text-left">
        <Logo />
      </header>

      <div
        className={clsx(
          'md:left-[calc(-50vw+50%)] md:relative',
          'md:text-left md:ml-0',
          '-mt-12 text-center',
          'text-gray-700'
        )}
      >
        <section className={clsx('font-bold text-center mt-32 px-4')}>
          <h1
            className={clsx(
              'text-5xl font-extrabold text-center',
              'tracking-tight leading-tight',
              'mt-3 mx-auto relative'
            )}
          >
            <span className="underlined !pr-0 pb-2">Serlo Editor</span>
            <sup className="text-brand text-base ml-2 mt-3 absolute">beta</sup>
          </h1>
        </section>

        <section
          className={clsx('text-left mt-16 mb-16 px-4 mx-auto max-w-5xl')}
        >
          <div className="sm:flex sm:justify-between">
            <div className="sm:flex-1 text-xl leading-cozy sm:max-w-[31rem] sm:flex sm:flex-col">
              <h2 className={clsx(h3Class, 'tracking-tight')}>
                <br />
                Seamless Creation of Digital Learning Resources
              </h2>
              <p className="mt-4">
                The Serlo Editor makes it easy and intuitive for teachers to{' '}
                <b className="tracking-tight">
                  create multimedia and interactive digital educational
                  resources
                </b>
                . Just drag and drop your content elements where you need them
                and edit everything live.
              </p>
              <p className="mt-4">
                Through its{' '}
                <b className="tracking-tight">flexible plugin architecture</b>{' '}
                the Serlo Editor can be adapted to your LMS. Everything is{' '}
                <b className="tracking-tight">open source and free of charge</b>
                .
              </p>
              <p className="mt-auto">{renderStayInTouch()}</p>
            </div>
            <div className="sm:flex-1 mt-8 -mx-side sm:max-w-[31rem]">
              <Video src="https://www.youtube.com/watch?v=ugWtuTmiGLM" />
            </div>
          </div>
        </section>

        <section
          className={clsx('bg-orangeBow bg-100% px-4 mt-12 mb-20 !pt-20 pb-20')}
        >
          <div className="max-w-7xl mx-auto">
            <EditorFeatures />
          </div>
        </section>

        <section className={clsx('-mb-6 px-4')}>
          <div className="max-w-7xl mx-auto mb-28">
            {/* <h2 className={clsx(h2Class, 'mt-12 mb-12')}>Feature Overview</h2> */}
            <EducationPlugins />
            {/* <BasicPlugins /> */}
            {/* {renderFeatureOverview()} */}
          </div>

          {/* <div className="max-w-4xl text-center mx-auto">
            <h2 className={h2Class}>Content Examples</h2>
            <div
              className={clsx(
                'mt-6 flex items-stretch justify-around',
                'px-side pb-6 flex-wrap',
                'w-full mx-auto sm:max-w-3xl lg:max-w-max'
              )}
            >
              {exampleContent.map(renderFeaturedBox)}
            </div>
          </div> */}
        </section>

        <section
          className={clsx('bg-orangeBow bg-100% px-2 mt-0 !pt-20 mb-20')}
        >
          <div className="mt-2 pb-16 sm:flex text-center text-xl max-w-4xl mx-auto px-4">
            <div className="flex-1">
              <b className="text-brand font-handwritten text-4xl">20.000+</b>
              <br />
              Learning resources have been created with the Serlo Editor
            </div>
            <div className="flex-1">
              <b className="text-brand font-handwritten text-4xl">1 Mio+</b>
              <br />
              Users per month learn with Serlo Editor content
            </div>
            <div className="flex-1">
              <b className="text-brand font-handwritten text-4xl">500+</b>
              <br />
              Authors so far used Serlo Editor to create open educational
              resources
            </div>
          </div>
        </section>

        <section id="roadmap" className={clsx('mt-24 pb-16')}>
          <div className="text-3xl leading-cozy max-w-4xl text-center mx-auto">
            <h2 className={clsx(h2Class, 'mb-4')}>Roadmap</h2>
            <EditorRoadmap />
            <p>{renderStayInTouch()}</p>
          </div>

          <div className="mt-12 text-3xl leading-cozy max-w-4xl text-center mx-auto">
            <h2 className={clsx(h2Class, 'mb-8')}>Serlo Editor in your LMS</h2>

            <div className="text-left">
              <p className="mt-4 text-xl leading-cozy flex-1">
                The Serlo Editor is free of charge and open source. We are going
                to offer several integration options to support its use in your
                LMS, including:
              </p>
              <ul className="serlo-ul text-xl">
                <li>JavaScript Library</li>
                <li>Docker Container</li>
                <li>Plugin for the most popular Learning Management Systems</li>
                <li>As a service</li>
              </ul>
              <p className="mt-20 text-xl leading-cozy flex-1 text-center">
                <b className="tracking-tight">
                  Are you interested in implementing the Serlo Editor in your
                  LMS?
                </b>
                <br />
                Please contact us with your integration requirements or feature
                requests.
              </p>
              <div className="text-center mt-8">{renderContact()}</div>
            </div>
          </div>
        </section>

        <section
          className={clsx('bg-blueWave bg-100% about-serlo px-2 mt-12 !pt-28')}
        >
          <h2 className={clsx(h2Class, 'mb-8')}>Partners</h2>
          <div className="max-w-[85rem] mx-auto">
            <EditorPartnerList />
          </div>

          <h2 className={clsx(h2Class, 'mb-8 mt-4')}>About us</h2>
          <div className="text-left mx-auto max-w-4xl">
            <p className="mt-4 text-xl leading-cozy flex-1">
              The Serlo Editor is developed by Serlo Education, a non-profit
              organization dedicated to providing high quality, free of charge
              and open source educational resources to students and teachers
              worldwide. Find out more about us on{' '}
              <Link href="/serlo">serlo.org/serlo</Link>.
            </p>
          </div>
          <div className="mx-auto px-4 max-w-7xl">
            <EditorTeam />
            <div className="text-center mb-24">
              <h2 className={clsx(h2Class)}>Connect</h2>

              <p className="mt-4 text-xl leading-cozy flex-1">
                Leave us you email address and we will reach out to you with
                updates.
              </p>
              <p className="mt-8">{renderStayInTouch(true)}</p>
            </div>
          </div>
          <footer>
            <div className="py-8 text-center text-md text-brand pb-[3.5rem] ">
              <a
                className="hover:underline"
                href="/datenschutz"
                target="_blank"
              >
                Datenschutz
              </a>
              {' • '}
              <a className="hover:underline" href="/impressum" target="_blank">
                Impressum
              </a>
            </div>
          </footer>
        </section>
        {/* <UserTools /> */}
      </div>

      <style jsx>{`
        :global(main > h1.serlo-h1) {
          display: none;
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
        .about {
          padding-top: 7rem;
          padding-bottom: 5rem;
          margin-top: 6rem 0 0 0;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-repeat: no-repeat;
          background-size: 100vw 100%;
        }
        @media (min-width: ${breakpoints.sm}) {
          .about {
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
        :global(.landing-button-with-wings):after,
        :global(.landing-button-with-wings):before {
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
        :global(.landing-button-with-wings):after {
          margin-left: 1rem;
          transform: scaleX(-1);
        }
        :global(.landing-button-with-wings):before {
          margin-left: -5rem;
        }
        :global(.landing-button-with-wings):hover:after,
        :global(.landing-button-with-wings):hover:before {
          opacity: 1;
        }
        :global(.landing-button-with-wink):after,
        :global(.landing-button-with-wink):before {
          background: url('/_assets/img/landing/wink-left.svg') no-repeat !important;
          margin-top: -2rem !important;
          background-size: 65% !important;
        }
        .p-with-wink:after,
        .p-with-wink:before {
          margin-top: -1rem !important;
          background-size: 75%;
          width: 2.5rem;
          height: 2.5rem;
          opacity: 1;
        }
        .p-with-wink:after {
          margin-left: -0.5rem;
        }
        .p-with-wink:before {
          margin-left: -1.5rem;
        }
        .about-serlo {
          background-image: url('/_assets/img/landing/footer-container.svg');
          background-size: 100% 100%;
        }

        :global(body) {
          max-width: 100vw;
          overflow-x: hidden;
          background: white;
        }
        :global(html) {
          background-color: #eff7fb;
        }
      `}</style>
    </>
  )

  function renderStayInTouch(final?: boolean) {
    return (
      <a
        href="https://forms.gle/A6qZrkHoW4Q5K3Mb6"
        className={clsx(
          'serlo-new-landing-button landing-button-with-wings inline-block !mb-8 before:!mt-[-1.1rem] after:!mt-[-1.1rem] transition-colors rounded-full',
          final ? '' : 'bg-brand-200 text-brand hover:text-white'
        )}
      >
        Stay updated!
      </a>
    )
  }

  function renderContact() {
    const { firstName, lastName, photo, extraLinkUrl, extraLinkText } =
      teamData[2]

    return (
      <div className="text-left flex text-base justify-center">
        <img
          className="rounded-full max-w-[6rem] mr-4"
          alt={`${firstName} ${lastName}`}
          src={photo}
        />
        <div className="h-min self-center -mt-2">
          <b>
            {firstName} {lastName}
          </b>
          <br />
          <Link href={extraLinkUrl}>{extraLinkText}</Link>
        </div>
      </div>
    )
  }
}
