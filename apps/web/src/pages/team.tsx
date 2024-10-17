import { either as E } from 'fp-ts'
import * as t from 'io-ts'
import { type GetStaticProps } from 'next'
import Head from 'next/head'

import { Link } from '@/components/content/link'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { SecondaryMenu } from '@/components/navigation/secondary-menu'
import { TeamDataEntry, TeamGrid } from '@/components/pages/team/team-grid'
import { useInstanceData } from '@/contexts/instance-context'
import { SecondaryMenuLink } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { prettifyLinksInSecondaryMenu } from '@/fetcher/prettify-links-state/prettify-links-in-secondary-menu'
import { getInstanceDataByLang } from '@/helper/feature-i18n'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface TeamPageData {
  teamData: TeamDataEntry[]
  secondaryMenuData?: SecondaryMenuLink[]
}

export default renderedPageNoHooks((props: TeamPageData) => (
  <FrontendClientBase noHeaderFooter noContainers>
    <Content {...props} />
  </FrontendClientBase>
))

function Content({ teamData, secondaryMenuData }: TeamPageData) {
  const { lang } = useInstanceData()
  const isDe = lang === 'de'
  const isEs = lang === 'es'

  const title = isDe ? 'Team' : isEs ? 'Equipo' : 'Meet the Team'

  return (
    <FrontendClientBase>
      <Head>
        <title>Serlo Team</title>
      </Head>
      {secondaryMenuData ? <SecondaryMenu data={secondaryMenuData} /> : null}
      <MaxWidthDiv showNav={!!secondaryMenuData}>
        <h1 className="serlo-h1 mt-12" itemProp="name">
          {title}
        </h1>
        <MaxWidthDiv>
          <main id="content">
            <>
              {lang === 'de' ? (
                <div>
                  <p className="serlo-p">
                    Serlo.org ist ein Gemeinschaftsprojekt der{' '}
                    <Link href="https://de.serlo.org/community">
                      Autor*innen
                    </Link>
                    , der Vereinsmitglieder, aller weiteren Unterstützer*innen
                    und Spender*innen und des ehren- und hauptamtlichen Teams,
                    das auf dieser Seite vorgestellt wird.
                  </p>
                  <p className="serlo-p">
                    Wir suchen Verstärkung! Bewirb dich auf eine unserer{' '}
                    <Link href="https://de.serlo.org/jobs">
                      Praktika,Engagements oder Jobs
                    </Link>
                    !
                  </p>
                  <h2 className="serlo-h2">
                    Ehren- und hauptamtliche Teammitglieder
                  </h2>
                </div>
              ) : null}

              {lang === 'es' ? (
                <div>
                  <p className="serlo-p">
                    Serlo.org es un proyecto en equipo que crean los autores,
                    los miembros de la asociación, todos los demás socios y
                    donantes, y el equipo de voluntarios que trabaja a tiempo
                    completo. En esta página nos presentamos.
                  </p>

                  <h2 className="serlo-h2">
                    Voluntarios y miembros del equipo a tiempo completo
                  </h2>
                </div>
              ) : null}

              {lang === 'en' ? (
                <div>
                  <p className="serlo-p">
                    Serlo.org is a collaborative project composed of hundreds of
                    authors, team-members and full-time employees.
                  </p>

                  <h2 className="serlo-h2">
                    Our team of volunteers and full-time members
                  </h2>
                </div>
              ) : null}
            </>
          </main>
        </MaxWidthDiv>
      </MaxWidthDiv>

      <TeamGrid data={teamData} />
    </FrontendClientBase>
  )
}

// data source: https://docs.google.com/spreadsheets/d/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/edit?gid=0#gid=0

const required = t.type({
  firstName: t.string,
  lastName: t.string,
  user: t.string,
})
const optional = t.partial({
  position: t.string,
  extraLinkUrl: t.string,
  extraLinkText: t.string,
  photo: t.string,
})

const TeamDataDecoder = t.array(t.intersection([required, optional]))

const errorMessage =
  'Could not build team page, check opensheet.elk.sh or data in sheet'

export const getStaticProps: GetStaticProps<TeamPageData> = async (context) => {
  const isDe = context.locale === 'de'
  const isEs = context.locale === 'es'
  const lang = isDe ? 'de' : isEs ? 'es' : 'en'
  const uuid = isDe ? 21439 : isEs ? 181476 : 32840

  const { secondaryMenus } = getInstanceDataByLang(lang as Instance)

  const menu = secondaryMenus.find(({ entries }) =>
    entries.some(({ id }) => id === uuid)
  )

  const menuData = menu?.entries.map((entry) => ({
    ...entry,
    active: entry.id === uuid,
  }))

  const secondaryMenuData = await prettifyLinksInSecondaryMenu(menuData)

  let teamData: TeamDataEntry[] = []
  try {
    const response = await fetch(
      `https://opensheet.elk.sh/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/teamdata_${lang}`
    )
    const data = TeamDataDecoder.decode((await response.json()) as unknown)

    if (E.isRight(data)) {
      teamData = data.right.map((entry) => {
        return {
          position: '',
          extraLinkUrl: '',
          extraLinkText: '',
          photo: '',
          ...entry,
        }
      })
    } else {
      throw new Error(errorMessage)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    // eslint-disable-next-line no-console
    console.error(errorMessage)
  }

  return { props: { teamData, secondaryMenuData } }
}
