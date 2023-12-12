import {
  faNewspaper as articleIcon,
  faChalkboardUser as courseIcon,
  faFilePen as exerciseIcon,
} from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'
import Image from 'next/image'

import { EditorContact } from '../editor/editor-contact'
import { teamDataKulla } from '../editor/editor-team'
import { Link } from '@/components/content/link'
import { FaIcon } from '@/components/fa-icon'

export const MetadataApiPresentation = () => {
  return (
    <>
      <div
        className={cn(
          'md:relative md:left-[calc(-50vw+50%)]',
          'md:ml-0 md:text-left',
          '-mt-12 sm:text-center',
          'text-gray-700'
        )}
      >
        <section className="mt-32 px-4 text-center font-bold">
          <h1
            className={cn(
              'text-5xl font-extrabold',
              'leading-tight tracking-tight',
              'mx-auto mt-3'
            )}
          >
            <span className="serlo-underlined !pr-0 pb-2">Metadata API</span>
          </h1>
        </section>
        <section className="mx-auto mb-16 mt-16 max-w-5xl px-4 text-left">
          <div className="sm:flex sm:justify-between sm:space-x-4">
            <div className="pr-2 text-xl leading-cozy sm:flex sm:max-w-[31rem] sm:flex-1 sm:flex-col">
              <h2 className="text-[1.3rem] font-extrabold tracking-tight text-gray-700">
                <br />
                Spice up your learning apps with our Digital Learning Resources
              </h2>
              <p className="mt-4">
                Our new Metadata API makes it easy to integrate thousands of
                Serlo articles, courses, videos, and interactive exercises.
              </p>
              <p className="mt-4">
                The API is completely free and it only takes a few lines of code
                to integrate a vast repository of educational resources into
                your app or website!
              </p>
              <CallToAction />
            </div>
            <div className="-mx-side mt-8 overflow-hidden rounded-lg px-4 sm:max-w-[32rem] sm:flex-1">
              <Image
                src="/_assets/img/metadata/metadata.png"
                width={1024}
                height={1024}
                alt="A bird flying over a stack of documents"
              />
            </div>
          </div>
        </section>
        <section className="mb-20 mt-0 bg-orangeBow bg-100% px-2 pb-16 pt-16">
          <div className="mx-auto mt-2 max-w-4xl px-4 text-center text-xl sm:flex">
            <div className="mx-4 flex-1 pb-4 pt-4">
              <b className="font-handwritten text-4xl text-brand">20,000+</b>
              <br />
              Educational resources have been created with the{' '}
              <Link href="https://serlo.org/editor">Serlo Editor</Link>
            </div>
            <div className="mx-4 flex-1 pb-4 pt-4">
              <b className="font-handwritten text-4xl text-brand">~1 Mio</b>
              <br />
              Students and teachers are using the materials every month
            </div>
          </div>
        </section>
        <section className="mt-24 pb-16">
          <div className="mx-auto max-w-4xl text-center text-3xl leading-cozy"></div>

          <div className="mx-auto mt-12 max-w-4xl text-center text-3xl leading-cozy">
            <h2 className="mb-4 text-center text-4xl font-extrabold leading-cozy tracking-tight">
              Develop with the Serlo Metadata API
            </h2>
            <div className="mx-side text-left">
              <p className="mt-4 flex-1 text-xl leading-cozy">
                Join our growing community by linking to our content through the
                Serlo Metadata API from your apps/website and change the future
                of education with us!
              </p>
              <p className="mt-2 text-xl leading-cozy">
                Licensed under,{' '}
                <Link href="https://creativecommons.org/licenses/by-sa/4.0/">
                  CC-BY-SA 4.0
                </Link>
                , the usage is completely free of cost.
              </p>
              <ul className="serlo-ul text-xl">
                <li>
                  Retrieve metadata of all our articles, videos, courses and
                  quizzes
                </li>
                <li>Easy to use GraphQL interface</li>
                <li>
                  Follow popular aggregators such as{' '}
                  <Link href="https://wirlernenonline.de/">
                    WirLernenOnline
                  </Link>{' '}
                  that have already integrated our metadata
                </li>
                <li>
                  Fully compliant with the state of the art{' '}
                  <Link href="https://dini-ag-kim.github.io/amb/draft/">
                    AMB standard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mb-20 mt-0 bg-orangeBow bg-100% px-2 pb-16 pt-16">
          <div className="mx-auto mt-2 max-w-4xl px-4 text-center text-xl sm:flex">
            <div className="mx-4 flex-1 pb-4 pt-4">
              <FaIcon
                icon={articleIcon}
                className="mx-auto mr-2 text-4xl text-brand"
              />
              <b className="font-handwritten text-4xl text-brand">3,000+</b>
              <br />
              Articles
            </div>
            <div className="mx-4 flex-1 pb-4 pt-4">
              <FaIcon
                icon={courseIcon}
                className="mx-auto mr-2 text-4xl text-brand"
              />
              <b className="font-handwritten text-4xl text-brand">600+</b>
              <br />
              Courses
            </div>
            <div className="mx-4 flex-1 pb-4 pt-4">
              <FaIcon
                icon={exerciseIcon}
                className="mx-auto mr-2 text-4xl text-brand"
              />
              <b className="font-handwritten text-4xl text-brand">4000+</b>
              <br />
              Exercises
            </div>
          </div>
        </section>
        <CallToAction alignment="center" />
        <section className="mb-32 mt-8">
          <p className="flex-1 text-center text-xl leading-cozy">
            <b className="tracking-tight">
              Are you interested in using our Metadata API?
            </b>
            <br />
            Contact us with your integration requirements or read more about the
            Metadata API in our{' '}
            <Link href="https://github.com/serlo/documentation/wiki/Metadata-API">
              Wiki
            </Link>
          </p>
          <div className="mb-14 mt-8 text-center">
            <EditorContact contact={teamDataKulla} />
          </div>
        </section>
      </div>
    </>
  )
}

interface CallToActionProps {
  alignment?: 'center' | 'left'
}

function CallToAction({ alignment = 'left' }: CallToActionProps) {
  const alignmentClasses =
    alignment === 'center' ? 'sm:ml-auto sm:mr-auto' : 'sm:ml-0 sm:mr-0'
  return (
    <a
      className={`serlo-new-landing-button serlo-button-with-wings mx-auto mb-12 mt-12 max-w-xs transition-colors before:!mt-[-1.1rem] after:!mt-[-1.1rem] ${alignmentClasses}`}
      href="https://github.com/serlo/documentation/wiki/Metadata-API"
    >
      Discover developer docs!
    </a>
  )
}
