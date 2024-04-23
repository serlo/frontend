import { BoxRenderer } from '@editor/plugins/box/renderer'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'

import { Link } from './content/link'
import { FaIcon } from './fa-icon'
import {
  SupportedRegion,
  deRegions,
  extraMetaTags,
  mathExamsTaxIds,
} from '@/data/de/math-exams-data'
import { cn } from '@/helper/cn'

export function ExamsInfoBox({ examsFolderId }: { examsFolderId: number }) {
  const region = Object.entries(mathExamsTaxIds).find(([_, ids]) => {
    return ids.includes(examsFolderId)
  })?.[0] as SupportedRegion

  const extraMeta = Object.hasOwn(extraMetaTags, examsFolderId)
    ? extraMetaTags[examsFolderId as keyof typeof extraMetaTags]
    : undefined

  return (
    <>
      <div
        className={cn(
          'mt-8 sm:-ml-side',
          'xl:absolute xl:left-side xl:top-9 xl:z-10 xl:w-[200px]',
          '2xl:w-[270px]'
        )}
      >
        <BoxRenderer
          boxType="blank"
          anchorId="exams-info-box"
          className="bg-white"
        >
          <>
            <div className="">
              <p className="serlo-p mb-0 max-w-lg font-normal leading-normal">
                🎓 Prüfungsbereich für{' '}
                <b className="inline-block">{deRegions[region].title}</b> <br />
                <br />
              </p>
              <div className="sm:flex xl:block">
                <p className="serlo-p !text-sm">
                  <b>
                    Weitere Bundesländer{' '}
                    <span className="inline-block">& Aufgaben</span>:
                  </b>
                  <br />
                  <Link
                    href="/mathe-pruefungen"
                    className={cn(
                      'serlo-button-light -ml-1 mt-1 !px-3 !py-2',
                      'md:rounded-lg md:!px-4 md:!py-2.5 xl:flex xl:justify-around'
                    )}
                  >
                    <FaIcon
                      icon={faGraduationCap}
                      className={cn(
                        'mr-1 text-brand-400',
                        'xl:mr-2 xl:mt-3 xl:text-3xl',
                        'xl:hidden'
                      )}
                    />
                    <span>
                      Mathe- <span className="inline-block">Prüfungen</span>{' '}
                      Startseite
                    </span>
                  </Link>
                </p>
                <p className="serlo-p mb-3">
                  <b className="text-sm">Austausch & Hilfe:</b>
                  <br />
                  <Link
                    href="https://discord.com/invite/HyPx9jVq5G"
                    className={cn(
                      'serlo-button-light -ml-1 mt-1 !px-3 !py-2',
                      'md:rounded-lg md:!px-4 md:!py-2.5 xl:flex xl:justify-around'
                    )}
                    noExternalIcon
                  >
                    <FaIcon
                      icon={faDiscord}
                      className={cn(
                        'mr-1 text-brand-400',
                        'xl:mr-2 xl:mt-1 xl:text-3xl',
                        'xl:block xl:hidden'
                      )}
                    />
                    <span>Prüfungen-Discord</span>
                  </Link>
                </p>
              </div>
            </div>
            {region === 'niedersachsen' ? ( // only for niedersachsen
              <div className="serlo-p mb-1 border-t pt-2 text-sm font-normal xl:mt-10">
                Wichtig: Für die Aufgaben hier gelten{' '}
                <Link href="/license/detail/26">andere Nutzungbedingungen</Link>
                .
              </div>
            ) : null}
          </>
        </BoxRenderer>
        {extraMeta ? (
          <Head>
            <title>{extraMeta.title}</title>
            <meta name="description" content={extraMeta.metaDescription} />
          </Head>
        ) : null}

        <style jsx global>
          {`
            #secondary-menu {
              display: none !important;
            }
          `}
        </style>
      </div>
    </>
  )
}
