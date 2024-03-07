import { BoxRenderer } from '@editor/plugins/box/renderer'
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
          '-ml-side mt-8',
          'md:absolute md:left-side md:top-9 md:z-10 md:w-[200px]',
          'lg:w-[220px]',
          'xl:left-side xl:w-[245px]'
        )}
      >
        <BoxRenderer boxType="blank" anchorId="exams-info-box">
          <>
            <div className="pb-2 sm:flex md:block">
              <p className="serlo-p mb-2 max-w-lg font-normal leading-normal">
                Willkommen im Prüfungsbereich für{' '}
                <b className="inline-block">
                  {isInBYTax ? 'Bayern' : 'Niedersachsen'}
                </b>
                .
                <br />
                Die anderen Bundesländer, noch mehr Aufgaben und unseren
                Discord-Server findest du hier:
              </p>
              <p>
                <Link
                  href="/mathe-pruefungen"
                  className={cn(
                    'serlo-button-light mx-side mt-2 !px-3 !py-2',
                    'sm:mr-7 sm:flex sm:w-min sm:justify-around sm:rounded-lg sm:!px-4 sm:!py-2.5'
                  )}
                >
                  <FaIcon
                    icon={faGraduationCap}
                    className={cn(
                      'mr-1 text-brand-400',
                      'sm:mr-2 sm:mt-3 sm:text-3xl',
                      'md:hidden xl:block'
                    )}
                  />
                  <span>Mathe- Prüfungen Startseite</span>
                </Link>
              </p>
            </div>
            {!isInBYTax ? ( // only for niedersachsen
              <div className="serlo-p mb-0 mt-2 border-t pt-2 text-sm font-normal">
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
