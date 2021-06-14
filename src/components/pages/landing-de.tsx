import clsx from 'clsx'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Link } from '../content/link'
import { HeadTags } from '../head-tags'
import { PartnerListNew } from '../landing/partner-list-new'
import { HeaderNew } from '../navigation/header-new'
import { LandingSubjects } from '@/components/landing/landing-subjects'
import { SearchInputNew } from '@/components/navigation/search-input-new'
import { useInstanceData } from '@/contexts/instance-context'
import { FooterLink, InstanceLandingData } from '@/data-types'
import { shuffleArray } from '@/helper/shuffle-array'

export interface LandingDEProps {
  data: InstanceLandingData
}

export function LandingDE({ data }: LandingDEProps) {
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

  const { headerData, footerData } = useInstanceData()

  useEffect(() => {
    shuffleArray(persons)
    setPersons(persons)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const subjectsData = data.subjectsData

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

  return (
    <>
      <div className="overflow-hidden">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat"
            rel="stylesheet"
          />
        </Head>
        <HeadTags data={{ title: 'Serlo – Die freie Lernplattform' }} />
        <HeaderNew />

        <section className="text-center max-w-3xl mx-auto mt-40">
          <PWithWink
            as="p"
            className="text-brand italic font-handwritten text-3xl"
          >
            Schön dich heute zu sehen.
          </PWithWink>
          <h1
            className={clsx(
              'text-center text-5xl font-extrabold text-truegray-700',
              'tracking-tight',
              'max-w-2xl mt-2 mb-6 mx-auto'
            )}
          >
            Was möchtest du <Underlined className="pb-2">Lernen ?</Underlined>
          </h1>
          <div className="md:hidden mt-10 mb-8">
            <SearchInputNew />
          </div>
          <p className="text-3xl leading-cozy">
            Hier auf Serlo findest du <b>einfache Erklärungen,</b> ausgewählte{' '}
            <b>Lernvideos</b> und interaktive <b>Übungsaufgaben</b> mit
            Musterlösungen.
          </p>
        </section>
        <section>
          <LandingSubjects data={subjectsData} />
        </section>

        <AboutSection>
          <div
            className={clsx(
              'text-center text-4xl text-truegray-700',
              'tracking-tight',
              'max-w-2xl mt-7 mx-auto'
            )}
          >
            <p className="mb-8">
              Unsere Lernplattform ist gemeinnützig und damit komplett
              kostenlos, werbefrei und frei lizenziert.{' '}
              <Underlined
                className="font-handwritten text-brand"
                style={{ fontSize: '1.2em' }}
              >
                Für immer!
              </Underlined>
            </p>
            <p className="font-bold mb-8">
              Jeden Monat lernen über 1.5 Millionen Schüler*innen und Lehrkräfte
              gemeinsam mit Serlo.
            </p>
            <ButtonWithWings
              className={clsx(
                'text-white font-bold text-xl bg-brand rounded-lg',
                'px-8 py-4 tracking-tight',
                'hover:bg-brand-light hover:no-underline'
              )}
              href="/serlo"
            >
              Mehr über uns
            </ButtonWithWings>
          </div>
        </AboutSection>

        <section>
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
                className={clsx(
                  'text-white font-bold text-xl bg-brand rounded-lg',
                  'px-8 py-4 tracking-tight',
                  'group-hover:bg-brand-light hover:no-underline'
                )}
                href="/mitmachen"
              >
                Magst du mitmachen?
              </Link>
              <div className="relative">
                <div className="absolute flex justify-center inset-0">
                  <div
                    className={clsx(
                      'pointer-events-none select-none w-72 h-5 mt-6',
                      'group-hover:opacity-100 opacity-0 group-hover:transform group-hover:rotate-1',
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
              'mb-52 flex flex-wrap justify-evenly',
              'md:relative md:block md:mb-72 md:h-630'
            )}
          >
            {renderPersons()}
          </div>
        </section>

        <section className="mt-36 mb-20">
          <img src="/_assets/img/landing/birds.svg" className="mx-auto" />

          <h3
            className={clsx(
              'text-center text-4xl text-truegray-700 font-bold',
              'leading-cozy tracking-tight',
              'max-w-2xl mt-7 mx-auto'
            )}
          >
            Zusammen setzen wir uns dafür ein, dass gute Bildung nicht abhängig
            vom Geldbeutel der Eltern ist.
          </h3>
        </section>
      </div>
      <PartnerSection className="text-center">
        <h3
          className={clsx(
            'text-center text-4xl text-truegray-700 font-bold',
            'leading-cozy tracking-tight',
            'max-w-2xl mt-32 mx-auto relative z-10 mb-16'
          )}
        >
          Partner und Förderer
        </h3>
        <PartnerListNew />
        <ButtonWithWink
          className={clsx(
            'hidden md:inline-block mx-auto',
            'text-truegray-700 font-bold text-xl rounded-lg',
            'px-8 py-4 tracking-tight border-truegray-700 border-solid border-2',
            'hover:border-brand-light hover:no-underline hover:text-brand-light'
          )}
          href="/partner"
        >
          Alle Förderer ansehen
        </ButtonWithWink>
        <Separator />
      </PartnerSection>
      <Footer className="px-side md:px-side-lg pb-10">
        {renderFooterNav()}
        <Separator />
        <div>{renderFooterLine()}</div>
      </Footer>
    </>
  )

  function renderPersons() {
    // const randomPositions = positions.sort(() => 0.5 - Math.random()) // good enough
    return persons.map(({ name, role, imgSrc }, index) => {
      if (index >= positions.length) return null
      const lineBreak = index === 1 || index === 6
      const hideMobile = index > 6
      const pos = positions[index]
      return (
        <Fragment key={name}>
          <div
            className={clsx(
              'mt-12 mx-1 text-center group',
              'w-1/4v md:w-1/8v md:absolute',
              hideMobile && 'hidden md:block'
            )}
            style={{ left: pos[0], top: pos[1] }}
          >
            <div className="relative w-full z-0">
              <div
                className={clsx(
                  'bg-wiggle absolute -left-12 -right-12 pb-6/5',
                  'bg-no-repeat bg-contain opacity-0 group-hover:opacity-100',
                  'transition-all ease-linear duration-200 group-hover:transform group-hover:rotate-1'
                )}
              ></div>
            </div>
            <Link
              className="hover:no-underline relative z-10"
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

  function renderFooterNav() {
    return (
      <nav className="flex flex-wrap md:flex justify-center md:justify-between">
        <div className="md:mr-5 text-center md:text-left">
          <h1 className="font-handwritten text-4xl -mt-2 mb-10">
            Serlo:
            <br />
            Die freie Lernplattform
          </h1>
          <SloganButton
            className={clsx(
              'text-white text-xl bg-brand rounded-lg',
              'px-8 py-4 mb-5 tracking-tight block text-center',
              'hover:bg-brand-light hover:no-underline',
              'mx-auto md:mx-0'
            )}
            href="/mitmachen"
          >
            Mitmachen
          </SloganButton>
          <SloganButton
            className={clsx(
              'text-white text-xl bg-brand rounded-lg',
              'px-8 py-4 tracking-tight block text-center',
              'hover:bg-brand-light hover:no-underline',
              'mx-auto md:mx-0'
            )}
            href="/spenden"
          >
            Spenden
          </SloganButton>
        </div>
        <Separator className="md:hidden" />
        <FooterMenuCol>
          {renderFooterNavChildren(footerData.footerNavigation[0].children)}
        </FooterMenuCol>
        <FooterMenuCol>
          {renderFooterNavChildren(headerData[0].children as FooterLink[])}
        </FooterMenuCol>

        <FooterMenuCol className="hidden md:block">
          {renderFooterNavChildren(footerData.footerNavigation[1].children)}
        </FooterMenuCol>
      </nav>
    )
  }

  function renderFooterNavChildren(items?: FooterLink[]) {
    if (!items) return null

    return items.map((item) => (
      <>
        <Link
          className={clsx(
            'inline-block text-truegray-700 mb-2 w-auto',
            'border-transparent border-b-2 hover:no-underline hover:border-brand hover:text-brand'
          )}
          key={item.url}
          href={item.url}
          noExternalIcon
        >
          {item.title}
        </Link>
        <br />
      </>
    ))
  }

  function renderFooterLine() {
    return (
      <div className="text-center md:text-right">
        {footerData.footerNavigation[2].children.map((item) => (
          <>
            <Link
              key={item.title}
              className="mr-3 text-truegray-700"
              href={item.url}
              noExternalIcon
            >
              {item.title}
            </Link>
          </>
        ))}
        {footerData.footerNavigation[1].children.map((item) => (
          <>
            <Link
              key={item.title}
              className="mr-3 text-truegray-700 md:hidden"
              href={item.url}
              noExternalIcon
            >
              {item.title}
            </Link>
          </>
        ))}
      </div>
    )
  }
}

const AboutSection = styled.section`
  padding-top: 11rem;
  padding-bottom: 9rem;
  margin: 6rem 0 0 0;
  background-image: url('/_assets/img/landing/about-big-arrow.svg'),
    url('/_assets/img/landing/about-container.svg');
  background-position: 20% 19%;
  background-repeat: no-repeat, no-repeat;
  background-size: 82%, 100vw 100%;
`

const Underlined = styled.i`
  padding-right: 1rem;
  background: url('/_assets/img/landing/simple-underline.svg') no-repeat bottom;
`

const ButtonWithWings = styled(Link)`
  &:after,
  &:before {
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

  &:after {
    margin-left: 1rem;
    transform: scaleX(-1);
  }

  &:before {
    margin-left: -5rem;
  }

  &:hover {
    &:after,
    &:before {
      opacity: 1;
    }
  }
`

const ButtonWithWink = styled(ButtonWithWings)`
  &:after,
  &:before {
    background: url('/_assets/img/landing/wink-left.svg') no-repeat;
    margin-top: -2rem;
    background-size: 65%;
  }
`

const PWithWink = styled(ButtonWithWink)`
  &:after,
  &:before {
    margin-top: -1rem;
    background-size: 75%;
    width: 2.5rem;
    height 2.5rem;
    opacity: 1;
  }
  &:after {
    margin-left: -0.5rem;
  }
   &:before {
    margin-left: -1.5rem;
  }
`

const PartnerSection = styled.footer`
  padding-top: 1rem;
  background: url('/_assets/img/landing/footer-container.svg') no-repeat;
  background-size: 100% 100%;
`

const Footer = styled.footer`
  background-color: #eef1f5;
`

const Separator = styled.hr`
  border: 0;
  outline: none;
  background: url('/_assets/img/landing/separator.svg') no-repeat center center;
  height: 2rem;
  width: 80%;
  margin: 0 auto;
  padding: 5rem 0;
`

const FooterMenuCol = styled.div`
  /* flex-grow: 2; */
  margin-right: 2rem;
  max-width: 50%;
`

const SloganButton = styled(Link)`
  max-width: 190px;
`
