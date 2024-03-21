import { BoxRenderer } from '@editor/plugins/box/renderer'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import { Link } from './content/link'
import { FaIcon } from './fa-icon'
import { mathExamTaxBY } from '@/data/de/math-exams-taxonomies'
import { cn } from '@/helper/cn'

export function ExamsInfoBox({ examsFolderId }: { examsFolderId: number }) {
  const isInBYTax = mathExamTaxBY.includes(examsFolderId)
  return (
    <>
      <div
        className={cn(
          'mt-8 sm:-ml-side',
          'md:absolute md:left-side md:top-9 md:z-10 md:w-[180px]',
          'lg:w-[220px]',
          'bg-white xl:left-side xl:w-[245px]'
        )}
      >
        <BoxRenderer boxType="blank" anchorId="exams-info-box">
          <>
            <div className="">
              <p className="serlo-p mb-0 max-w-lg font-normal leading-normal">
                🎓 Prüfungsbereich für{' '}
                <b className="inline-block">
                  {isInBYTax ? 'Bayern' : 'Niedersachsen'}
                </b>{' '}
                <br />
                <br />
              </p>
              <div className="sm:flex md:block">
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
                        'md:hidden xl:block'
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
                        'md:hidden xl:block'
                      )}
                    />
                    <span>Prüfungen-Discord</span>
                  </Link>
                </p>
              </div>
            </div>
            {!isInBYTax ? ( // only for niedersachsen
              <div className="serlo-p mb-1 mt-10 border-t pt-2 text-sm font-normal">
                Wichtig: Für die Aufgaben hier gelten{' '}
                <Link href="/license/detail/26">andere Nutzungbedingungen</Link>
                .
              </div>
            ) : null}
          </>
        </BoxRenderer>
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
