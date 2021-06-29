import clsx from 'clsx'
import { zip } from 'ramda'
import { Fragment, useEffect, useState } from 'react'

import { Link } from '@/components/content/link'
import { shuffleArray } from '@/helper/shuffle-array'

const positions = [
  ['8%', '-5%'],
  ['80%', '2%'],
  ['38%', '12%'],
  ['60%', '18%'],
  ['19%', '36%'],
  ['49%', '59%'],
  ['73%', '48%'],
  ['4%', '74%'],
  ['30%', '84%'],
  ['65%', '89%'],
]

export function CommunityWall() {
  const [persons, setPersons] = useState<
    { name: string; role: string; imgSrc: string }[]
  >([
    {
      name: 'daniel-flueck',
      role: 'Spender',
      imgSrc: 'https://community.serlo.org/avatar/Daniel-Flueck',
    },
    {
      name: 'metzgaria',
      role: 'Lehrerin',
      imgSrc:
        'https://assets.serlo.org/59636d3d8b05b_caf5ac55b28cbd593d03f7ba7812d2016a61ae61.jpg',
    },
    {
      name: 'wandapaetzold',
      role: 'Team',
      imgSrc: 'https://community.serlo.org/avatar/WandaPaetzold',
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
      name: 'Leogato',
      role: 'Team',
      imgSrc:
        'https://assets.serlo.org/60c36164209d0_3808119825ac30f9a58ec4cb0c865d13451f45eb.jpg',
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
    {
      name: 'maria_f',
      role: 'Spenderin',
      imgSrc:
        'https://assets.serlo.org/60c5d7dd380cc_61b9718ba853191c16b30798169a669bf9803380.JPG',
    },
  ])

  useEffect(() => {
    shuffleArray(persons)
    setPersons(persons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="overflow-hidden">
      <h3
        className={clsx(
          'text-center text-4xl text-truegray-700 font-bold',
          'leading-cozy tracking-tight',
          'max-w-2xl mt-32 mx-auto relative z-10'
        )}
      >
        Wir sind eine große, ehrenamtliche Community und gestalten Serlo
        <p className="text-brand italic font-handwritten text-5xl">
          gemeinsam.
        </p>
      </h3>
      <div className="relative z-0 h-0 w-full mt-1">
        <div
          className={clsx(
            'absolute inset-0 -mt-14 h-32 ml-5',
            'bg-circled-and-arrow bg-no-repeat bg-top bg-contain'
          )}
        ></div>
      </div>

      <div className="mt-16 z-10 flex justify-center relative">
        <div className="group text-center">
          <Link
            className="serlo-new-landing-button inline-block group-hover:bg-brand-light hover:no-underline"
            href="/mitmachen"
          >
            Magst du mitmachen?
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
          'md:relative md:block md:mb-72 md:h-630'
        )}
      >
        {renderPersons()}
      </div>
    </section>
  )

  function renderPersons() {
    return zip(persons, positions).map((arg, index) => {
      const [{ name, role, imgSrc }, [left, top]] = arg
      const lineBreak = index % 5 === 1
      const hideMobile = index > 5

      return (
        <Fragment key={name}>
          <div
            className={clsx(
              'mt-12 mx-1 text-center group',
              'w-1/3v sm:w-1/4v md:w-1/8v md:absolute',
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
              <img src={imgSrc} className="rounded-full w-full" />
              <p className="text-base mt-2 mb-2 font-bold text-gray-700">
                @{name}
              </p>
              <span
                className={clsx(
                  'text-white text-base font-bold px-2 py-1',
                  'rounded-2xl',
                  role.includes('Autor')
                    ? 'bg-yellow-500'
                    : role.includes('Team')
                    ? 'bg-brand'
                    : 'bg-purple-500'
                )}
              >
                {role}
              </span>
            </Link>
          </div>
          {lineBreak && <div className="md:hidden h-0 w-full"></div>}
        </Fragment>
      )
    })
  }
}
