import clsx from 'clsx'
import { zip } from 'ramda'
import { Fragment, useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { shuffleArray } from '@/helper/shuffle-array'

const positions = [
  ['8%', '-10%'],
  ['72%', '-18%'],
  ['65%', '62%'],
  ['82%', '22%'],
  ['15%', '42%'],
]

export function CommunityWallInformatik() {
  const [persons, setPersons] = useState<
    { name: string; role: string; imgSrc: string }[]
  >([
    {
      name: 'metzgaria',
      role: 'Lehrerin',
      imgSrc:
        'https://assets.serlo.org/59636d3d8b05b_caf5ac55b28cbd593d03f7ba7812d2016a61ae61.jpg',
    },
    {
      name: 'nish',
      role: 'Team',
      imgSrc:
        'https://assets.serlo.org/5996d7a3e84ff_7c59204083b1095e2995638232d83b0b608cb910.jpg',
    },
    {
      name: 'karin',
      role: 'Team',
      imgSrc:
        'https://assets.serlo.org/5d1605d55ea14_067f65467fb550862aa307ba6674dba6a5e05776.jpeg',
    },
    {
      name: 'flora_jana',
      role: 'Team',
      imgSrc:
        'https://assets.serlo.org/5a005278ce575_e72a8367c20d1bf53add676fa2893b34c5823fdb.jpg',
    },
    {
      name: 'wo_fo',
      role: 'Autor',
      imgSrc:
        'https://assets.serlo.org/608ab2f4f15cc_eb53f93cc23d03b2eb8df6bf53a5628f7e2dbebf.jpg',
    },
    {
      name: 'corinna',
      role: 'Autorin',
      imgSrc: 'https://community.serlo.org/avatar/Corinna',
    },
    {
      name: 'hwlang',
      role: 'Autor',
      imgSrc: 'https://community.serlo.org/avatar/hwlang',
    },
  ])

  useEffect(() => {
    setPersons((p) => shuffleArray(p))
  }, [])

  return (
    <>
      <div className="z-10 justify-center relative mt-32">
        <div className="md:absolute text-center w-full z-20">
          <h3
            className={clsx(
              'text-center text-4xl font-extrabold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-20 mx-auto relative z-10 mb-8'
            )}
          >
            Lust mitzumachen?
          </h3>
          <p className="jsx-1406289065 text-2xl leading-cozy text-truegray-700 max-w-2xl mx-auto">
            Alle Inhalte auf serlo.org werden von einer ehrenamtlichen Community
            aus Lehrkräften, Studierenden, Schüler*innen und anderen
            Bildungsbegeisterten gestaltet. Erweitere mit uns dieses Angebot um
            noch mehr Lernenden Bildung frei verfügbar zu machen!
          </p>
          <div className="group text-center">
            <Link
              className="mt-10 serlo-new-landing-button inline-block group-hover:bg-brand-light hover:no-underline"
              href="/mitmachen"
            >
              Mehr erfahren
            </Link>
            <div className="relative">
              <div className="absolute flex justify-center inset-0">
                <div
                  className={clsx(
                    'pointer-events-none select-none w-72 h-5',
                    'group-hover:opacity-100 opacity-0 group-hover:rotate-1',
                    'transition-all ease-linear duration-200',
                    'bg-underlined bg-contain bg-no-repeat bg-top'
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-wrap justify-evenly',
            'md:block md:pb-12 md:h-630 md:relative lg:h-[770px]'
          )}
        >
          {renderPersons()}
        </div>
      </div>
    </>
  )

  function renderPersons() {
    return zip(persons, positions).map((arg, index) => {
      const [{ name, role, imgSrc }, [left, top]] = arg
      const lineBreak = index % 5 === 1
      const hideMobile = index > 3

      return (
        <Fragment key={name}>
          <figure
            className={clsx(
              'mt-12 mx-1 text-center group',
              'w-1/3v sm:w-1/4v md:w-1/8v md:absolute z-30',
              hideMobile && 'hidden md:block'
            )}
            style={{ left, top }}
          >
            <div className="relative w-full z-0">
              <div
                className={clsx(
                  'bg-wiggle absolute -left-12 -right-12 pb-6/5',
                  'bg-no-repeat bg-contain opacity-0 group-hover:opacity-100',
                  'transition-all ease-linear duration-200 group-hover:rotate-1'
                )}
              ></div>
            </div>
            <Link
              className="hover:no-underline relative z-10 whitespace-nowrap"
              href={`/user/profile/${name}`}
            >
              <img
                src={imgSrc}
                alt={`Avatar of ${name}`}
                className="rounded-full w-full"
              />
              <p className="text-base mt-2 mb-2 font-bold text-gray-700">
                @{name}
              </p>
              <span
                className={clsx(
                  'text-white text-base font-bold px-2 py-1',
                  'rounded-2xl',
                  role.includes('Autor')
                    ? 'bg-yellow'
                    : role.includes('Team')
                    ? 'bg-brand-light'
                    : role.includes('Lehrer')
                    ? 'bg-newgreen'
                    : 'bg-berry'
                )}
              >
                {role}
              </span>
            </Link>
          </figure>
          {lineBreak && <div className="md:hidden h-0 w-full"></div>}
        </Fragment>
      )
    })
  }
}
