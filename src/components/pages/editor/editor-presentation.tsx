import clsx from 'clsx'
import { Fragment } from 'react'

import { BasicPlugins } from './basic-plugins'
import { EditorPartnerList } from './editor-partner-list'
import { EducationPlugins } from './education-plugins'
import { Link } from '@/components/content/link'
import { Video } from '@/components/content/video'
import { HeadTags } from '@/components/head-tags'
import { Logo } from '@/components/navigation/header/logo'
// import { UuidType } from '@/data-types'
// import { FeaturedContentData } from '@/data/de/de-subject-landing-data'
import {
  PageTeamRenderer,
  TeamDataEntry,
} from '@/edtr-io/plugins/page-team/renderer'
import { breakpoints } from '@/helper/breakpoints'

const h2Class =
  'text-center text-4xl leading-cozy tracking-tight font-extrabold'
const h3Class = 'text-gray-700 text-[1.3rem] font-extrabold'
// const italicClass = 'text-brand italic font-handwritten text-3xl'

// const maxOnMobile = 4
// const exampleContent: FeaturedContentData[] = [
//   {
//     title: 'Das Auge',
//     type: UuidType.Article,
//     url: '/biologie/70830/das-auge',
//     img: 'https://assets.serlo.org/legacy/58edd84b38d59_7374c3b5a6911d6b3fdbbcfad0fa1d9f0a862a5e.jpg',
//   },
//   {
//     title: 'Verdauung des Menschen',
//     type: UuidType.Article,
//     url: '/biologie/64745/verdauung-des-menschen',
//     img: 'https://assets.serlo.org/legacy/580f3ab3a9ffa_d91850964649b000f8250c316108710b949c5ab8.png',
//   },
//   {
//     title: 'Das Endoplasmatische Retikulum',
//     type: UuidType.Article,
//     url: '/biologie/133613/das-endoplasmatische-retikulum',
//     img: 'https://assets.serlo.org/5c97a58091829_5595cf6758a636ee5e8cb24bd457bf2eef8ad7d2.jpg',
//   },
//   {
//     title: 'Der Golgi-Apparat',
//     type: UuidType.Article,
//     url: '/biologie/133567/der-golgi-apparat',
//     img: 'https://assets.serlo.org/5c97665b24dbb_530eab1e397f05fb9a5da9e85a3c42696728f50f.jpg',
//   },
// ]
// TODO: (on jobs page) fix share button, fix overflow

const roadmapData = [
  {
    title: 'Latest Release',
    steps: ['Migration Algorithm for new versions of data format'],
  },
  {
    title: 'Next up',
    steps: [
      'dozens of smaller UX improvements',
      'Update Slate to 0.82',
      'Release of updated data- and exchange-format for Serlo Editor content',
    ],
  },
  {
    title: 'Soon',
    steps: [
      'H5P integration',
      'Further UX improvements',
      'Fill-in-the-gap exercises',
      'Drag & Drop exercises',
    ],
  },
  {
    title: 'Later',
    steps: [
      'More exercise plugins',
      'Improved focus management',
      'LMS integrations',
      'Global copy & paste',
    ],
  },
]

const teamData: TeamDataEntry[] = [
  {
    firstName: 'Wolfgang',
    lastName: 'Schmid',
    position: 'Project Lead',
    extraLinkUrl: 'mailto:wolfgang@serlo.org',
    extraLinkText: 'wolfgang@serlo.org',
    photo:
      'https://assets.serlo.org/5fc60fd578266_ef388187d8288b790cf5378e160278301df24c16.jpg',
  },
  {
    firstName: 'Sebastian',
    lastName: 'Sapiatz',
    position: 'Product Manager',
    extraLinkUrl: 'mailto:sebastian@serlo.org',
    extraLinkText: 'sebastian@serlo.org',
    photo:
      'https://assets.serlo.org/a0d3abe0-7491-11ed-a78a-a5b96e09d60e/image.jpg',
  },
  {
    firstName: 'Josefine',
    lastName: 'Theden-Schow',
    position: 'Partnerships',
    extraLinkUrl: 'mailto:josefine@serlo.org',
    extraLinkText: 'josefine@serlo.org',
    photo:
      'https://assets.serlo.org/cea79750-6985-11ed-b282-836733dd2d87/image.jpg',
  },
  {
    firstName: 'Vitomir',
    lastName: 'Budimir',
    position: 'Softwareentwicklung',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/36f5c060-ac80-11ed-9413-878d94834f2e/image.jpg',
  },
  {
    firstName: 'Simon',
    lastName: 'Köhl',
    position: 'Partnerships',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/5fc60eaacdf04_c185cbdb5b62400d973d553587caa6cf00ed294f.jpg',
  },
  {
    firstName: 'Stephan',
    lastName: 'Kulla',
    position: 'Developement',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/5fc610675ef12_e33cf10d89b893ff3cc99cebf5e1a1686ade44ec.jpg',
  },
  {
    firstName: 'David',
    lastName: 'Li',
    position: 'Softwareentwicklung',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/5d15e1c58bcc9_92a7a86497eed65a3372ce11c948a9c7538ebadf.jpg',
  },
  {
    firstName: 'Lars',
    lastName: 'Rasmussen ',
    position: 'Developement',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/16618150-a09a-11ed-95de-a79d3d5d7bc4/image.jpg',
  },
  {
    firstName: 'Anna',
    lastName: 'Steinberg',
    position: 'Developement',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/e8aa0a40-3d96-11ed-b861-af1c5dc40fe0/image.jpg',
  },
  //Mikey (Softwareentwicklung, ab März)
  {
    firstName: 'Botho',
    lastName: 'Willer',
    position: 'User Experience Design',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/legacy/555b0ce89c0fd_a88af44ea94ef2e7139d475f2ec3d4a5df06128c.jpg',
  },
  {
    firstName: 'Gregor ',
    lastName: 'Zupan ',
    position: 'User Experience Design',
    extraLinkUrl: '',
    extraLinkText: '',
    photo:
      'https://assets.serlo.org/98f93f80-a09b-11ed-95de-a79d3d5d7bc4/image.png',
  },
]

export function EditorPresentation() {
  // const { strings } = useInstanceData()

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
          'md:text-left md:max-w-[100vw] w-[100vw] md:ml-0',
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
          className={clsx('text-left mt-16 mb-16 px-4 mx-auto max-w-6xl')}
        >
          <div className="sm:flex">
            <div className="flex-1 text-xl leading-cozy pl-8 pr-4">
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
            </div>
            <div className="mt-8 flex-1">
              <Video src="https://www.youtube.com/watch?v=ugWtuTmiGLM" />
            </div>
          </div>
        </section>

        {/* <section className="mt-24 pb-16 mb-20 max-w-2xl mx-auto">
          <h3
            className={clsx(
              'text-center text-4xl text-truegray-700 font-bold',
              'leading-cozy tracking-tight',
              'mx-auto mb-6',
              h2Class,
              'landing-button-with-wings landing-button-with-wink p-with-wink'
            )}
          >
            Discover the Editor
          </h3>
          
        </section> */}

        <section className={clsx('partner px-2 mt-0 !pt-20 mb-20')}>
          <div className="mt-6 pb-12 sm:flex text-center text-xl max-w-4xl mx-auto px-4">
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
              <b className="text-brand font-handwritten text-4xl">123</b>
              <br />
              Authors so far used Serlo Editor to create open educational
              resources
            </div>
          </div>
        </section>
        {/* <section className={clsx('partner', 'px-2 mt-24 !pt-20')}>
          
        </section> */}
        <section className={clsx('-mb-6')}>
          <div className="max-w-7xl mx-auto">
            <h2 className={clsx(h2Class, 'mt-12 mb-12')}>Feature Overview</h2>
            <BasicPlugins />
            <EducationPlugins />
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

        <section className={clsx('partner about-serlo', 'mt-24 !pt-16 pb-16')}>
          <div className="text-3xl leading-cozy max-w-4xl text-center mx-auto">
            <img
              src="/_assets/img/jobs/impact.svg"
              className="mx-auto my-5 max-w-[12rem]"
            />
            <h2 className={clsx(h2Class, 'mb-8')}>Roadmap</h2>
            <p className="mt-4 text-base leading-cozy mb-6">
              The Serlo Editor is in active develpement. We are currently beta
              testing with the authors on the open learning platform{' '}
              <Link href="https://serlo.org">serlo.org</Link>. Some features are
              not yet reliable.
            </p>
            {renderRoadmap()}
          </div>

          <div className="mt-0 text-3xl leading-cozy max-w-4xl text-center mx-auto">
            <img
              src="/_assets/img/jobs/gemeinsam.svg"
              className="mx-auto max-w-[12rem]"
            />
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
              <p className="mt-4 text-xl leading-cozy flex-1">
                <b className="tracking-tight">
                  Are you interested in implementing the Serlo Editor in your
                  LMS?
                </b>
                <br />
                Please contact us with your integration requirements or feature
                requests.
              </p>
              <div className="text-center mt-10">
                <a
                  href=""
                  className="serlo-new-landing-button inline landing-button-with-wings"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={clsx('-mb-6')}>
          <h2 className={clsx(h2Class, 'mb-8')}>Partners</h2>
          <div className="mx-auto max-w-4xl">
            <EditorPartnerList />
          </div>
        </section>

        <section className={clsx('mt-6 text-center')}>
          <h2 className={clsx(h2Class, 'mb-8')}>About us</h2>
          <div className="text-left mx-auto max-w-4xl">
            <p className="mt-4 text-xl leading-cozy flex-1">
              The Serlo Editor is developed by Serlo Education, a non-profit
              organization dedicated to providing high quality, free of charge
              and open source educational resources to students and teachers
              worldwide. Find out more about us on{' '}
              <Link href="/serlo">serlo.org/serlo</Link>.
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <h2 className={clsx(h2Class, 'mt-16 !-mb-6')}>Team</h2>
            <PageTeamRenderer data={teamData} extraCols compact />

            <div className="text-center mt-10 mb-24">
              <a
                href=""
                className="serlo-new-landing-button inline landing-button-with-wings"
              >
                Sign up to our newsletter to stay updated!
              </a>
            </div>
          </div>
        </section>
        {/* <UserTools /> */}
      </div>

      <footer>
        <div className="bg-white py-8 text-center text-md text-brand mb-[3.5rem] ">
          <a className="hover:underline" href="/datenschutz" target="_blank">
            Datenschutz
          </a>
          {' • '}
          <a className="hover:underline" href="/impressum" target="_blank">
            Impressum
          </a>
        </div>
      </footer>

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
        .partner {
          padding-top: 1rem;
          background-image: url('/_assets/img/landing/about-container.svg');
          background-size: 100% 100%;
        }
        .about-serlo {
          background-image: url('/_assets/img/landing/footer-container.svg');
        }
      `}</style>
    </>
  )

  // function renderFeaturedBox(data: FeaturedContentData, index: number) {
  //   return (
  //     <Link
  //       className={clsx(
  //         'text-brand hover:no-underline box-border',
  //         'p-2.5 leading-cozy',
  //         'rounded hover:shadow-menu hover:text-truegray-700',
  //         'mb-4 mx-2 w-36 mobile:w-52 lg:w-44 group xl:w-48 transition-all text-left',
  //         'relative',
  //         index >= maxOnMobile ? 'hidden mobile:block' : ''
  //       )}
  //       href={data.url}
  //       key={data.title}
  //       path={[]}
  //     >
  //       <div className="mb-2.5 mr-5 bg-brand-100 group-hover:bg-white rounded-lg transition-all">
  //         {data.img ? (
  //           <img
  //             className={clsx(
  //               'object-contain object-center',
  //               'mix-blend-multiply opacity-80 transition-all',
  //               'group-hover:opacity-100',
  //               'aspect-square rounded-lg'
  //             )}
  //             alt={data.title}
  //             src={data.img}
  //           />
  //         ) : null}
  //       </div>
  //       <h4 className="font-bold text-xl mx-0 mt-1 mb-10 break-normal special-hyphens-auto">
  //         {data.title}
  //       </h4>
  //       <span className="block mt-1 font-sm text-brand-400 absolute bottom-2">
  //         {renderTypeIcon(data.type)} {getTranslatedType(strings, data.type)}
  //       </span>
  //     </Link>
  //   )
  // }

  // function renderTypeIcon(type: UuidType | TaxonomyTermType) {
  //   const icon = getIconByTypename(type)
  //   return <FaIcon icon={icon} />
  // }

  function renderRoadmap() {
    return (
      <div className="text-xl text-center sm:flex">
        {roadmapData.map(({ title, steps }) => {
          return (
            <div key={title} className="mb-12 flex-1 px-4">
              <h3 className={clsx('mb-4 font-handwritten text-brand text-3xl')}>
                {title}
              </h3>
              <ul className="">
                {steps.map((title) => {
                  return (
                    <li
                      key={title}
                      // className="bg-brand-100 px-2 py-1 rounded-lg inline-block m-1"
                      className={clsx(
                        'block px-2 py-2 mb-5',
                        'rounded-xl hover:bg-brand/5 transition-colors shadow-menu',
                        'text-lg'
                      )}
                    >
                      {title}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}
