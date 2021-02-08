import { useContext, useEffect, useState } from 'react'

import { HSpace } from './content/h-space'
import { Link } from './content/link'
import { SpecialCss } from './content/special-css'
import { TableWrapper } from './content/table-wrapper'
import { StatsContext } from './frontend-client-base'
import { Button } from './navigation/course-navigation'
import { MaxWidthDiv } from './navigation/max-width-div'
import { RelativeContainer } from './navigation/relative-container'
import { StyledH3 } from './tags/styled-h3'
import { StyledLi } from './tags/styled-li'
import { StyledP } from './tags/styled-p'
import { StyledTable } from './tags/styled-table'
import { StyledTd } from './tags/styled-td'
import { StyledTh } from './tags/styled-th'
import { StyledTr } from './tags/styled-tr'
import { StyledUl } from './tags/styled-ul'

export function StatsOverview() {
  const stats = useContext(StatsContext)

  const [data, setData] = useState<any>(undefined)

  const [limit, setLimit] = useState<number>(20)

  const [sorted, setSorted] = useState<any>([])

  const [sortOption, setSortOption] = useState<any>('views')

  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    if (!stats) return
    const data: any = {}

    data.dates = Object.keys(stats.stats)
    data.dates.sort()

    data.totalViews = 0
    data.internalNavs = 0
    data.searches = 0
    data.solutions = 0
    data.videos = 0
    data.applets = 0
    data.shares = 0
    data.spoilers = 0
    data.interactives = 0

    data.uuid2path = {}

    for (const path in stats.path2uuid) {
      const id = stats.path2uuid[path]
      if (!data.uuid2path[id] && id >= 0) {
        data.uuid2path[id] = path
      }
    }

    data.rows = []
    data.id2row = {}

    // pass zero: collect ids
    for (const date of data.dates) {
      const cur = stats.stats[date]

      for (const id in cur.views) {
        if (!data.id2row[id]) {
          const row = {
            id,
            views: 0,
            internal: 0,
            external: 0,
            navs: 0,
            solutions: 0,
            spoilers: 0,
            searches: 0,
            videos: 0,
            applets: 0,
            shares: 0,
            interactives: 0,
          }
          data.rows.push(row)
          data.id2row[id] = row
        }
      }
    }

    for (const date of data.dates) {
      const cur = stats.stats[date]

      for (const id in cur.views) {
        data.totalViews += cur.views[id].sum
        data.internalNavs += cur.views[id].internal
        const row = data.id2row[id]
        if (row) {
          row.views += cur.views[id].sum
          row.internal += cur.views[id].internal
          row.external += cur.views[id].external
        }
      }

      for (const id in cur.clicks) {
        const row = data.id2row[id]
        if (row) {
          for (const targetId in cur.clicks[id]) {
            row.navs += cur.clicks[id][targetId]
          }
        }
      }

      for (const event in cur.events) {
        if (event.startsWith('clicksearch_')) {
          const id = event.substring(12)
          const row = data.id2row[id]
          if (row) {
            row.searches += cur.events[event]
          }
          data.searches += cur.events[event]
        }
        if (event.startsWith('opensolution_')) {
          const row = getRow(event)
          if (row) {
            row.solutions += cur.events[event]
          }
          data.solutions += cur.events[event]
        }
        if (event.startsWith('loadvideo_')) {
          const row = getRow(event)
          if (row) {
            row.videos += cur.events[event]
          }
          data.videos += cur.events[event]
        }
        if (event.startsWith('loadgeogebra_')) {
          const row = getRow(event)
          if (row) {
            row.applets += cur.events[event]
          }
          data.applets += cur.events[event]
        }
        if (event.startsWith('share_')) {
          const id = event.substring(6)
          const row = data.id2row[id]
          if (row) {
            row.shares += cur.events[event]
          }
          data.shares += cur.events[event]
        }
        if (event.startsWith('openspoiler_')) {
          const row = getRow(event)
          if (row) {
            row.spoilers += cur.events[event]
          }
          data.spoilers += cur.events[event]
        }
        if (
          event.startsWith('checksc_') ||
          event.startsWith('checkmc_') ||
          event.startsWith('checkinput_')
        ) {
          const row = getRow(event)
          if (row) {
            row.interactives += cur.events[event]
          }
          data.interactives += cur.events[event]
        }
      }
    }

    data.rows = data.rows.filter((row: any) => row.id > 0)
    data.rows.forEach((row: any) => {
      row.apha =
        row.views < 10
          ? -1
          : Math.round(
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              ((row.navs +
                row.solutions +
                row.spoilers +
                row.searches +
                row.videos +
                row.applets +
                row.interactives +
                row.shares) *
                100) /
                row.views
            )
    })

    //console.log(data.rows)

    setData(data)

    function getRow(event: string) {
      const m1 = /[a-z]+_entity([\d]+)_/gm.exec(event)
      const m2 = /[a-z]+_tax([\d]+)_/gm.exec(event)
      const entityId = m1 ? m1[1] : m2 ? m2[1] : ''
      return data.id2row[entityId]
    }
  }, [stats])

  useEffect(() => {
    if (data) {
      const newRows = data.rows.slice(0)
      setSorted(newRows)
      newRows.sort((a: any, b: any) => {
        return b[sortOption] - a[sortOption]
      })
    }
  }, [data, sortOption])

  if (stats && data) {
    const visibleRows = []

    for (const row of sorted) {
      if (visibleRows.length >= limit) break
      if (filter) {
        const path = data.uuid2path[row.id]
        if (!path || !path.includes(filter)) continue
      }
      visibleRows.push(row)
    }

    return (
      <RelativeContainer>
        <MaxWidthDiv width={1200}>
          <SpecialCss>
            <HSpace amount={40} />
            <StyledH3>
              Herzlich Willkommen bei den Statistiken und Insights von Serlo!
            </StyledH3>
            <StyledP>
              Hier finden sich neue Funktionen im Aufbau, um mithilfe von
              Statistiken besser zu verstehen, wie User mit den Inhalt umgehen.
            </StyledP>
            <StyledP>
              Während der Alpha-Phase können viele Änderungen passieren.
              Außerdem können die verfügbaren Daten schwanken bzw. Angaben
              können ungenau / fehlerhaft sein. Nutzung daher auf eigene Gefahr.
            </StyledP>
            <StyledP>Daten-Zeitraum: {data.dates.join(', ')}</StyledP>
            <StyledP>Es wurden insgesamt:</StyledP>
            <StyledUl>
              <StyledLi>
                <StyledP>{data.totalViews} Seiten aufgerufen</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{data.internalNavs} interne Links geklickt</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{data.solutions} Lösungen angezeigt</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>
                  {data.interactives} interaktive Aufgaben (Sc/Mc/Input)
                  überprüft
                </StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{data.spoilers} Spoiler geöffnet</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{data.searches} mal gesucht</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{data.videos} Videos geladen</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{data.applets} Applets geladen</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{data.shares} Inhalte geteilt</StyledP>
              </StyledLi>
            </StyledUl>

            <StyledP>
              Tabelle sortieren nach:{' '}
              <select
                onChange={(val) => {
                  setSortOption(val.target.value)
                }}
                value={sortOption}
              >
                <option value="views">meiste Aufrufe</option>
                <option value="navs">meiste Links geklickt</option>
                <option value="apha">meiste Aktionen pro 100 Aufrufe</option>
                <option value="solutions">meiste Lösungen angezeigt</option>
                <option value="interactives">
                  meiste interaktive Aufgaben überprüft
                </option>
                <option value="spoilers">meiste Spoiler aufgeklappt</option>
                <option value="searches">
                  häufigsten die Suche angeklickt
                </option>
                <option value="videos">meiste Videos geladen</option>
                <option value="applets">meiste Applets geladen</option>
                <option value="shares">am meisten geteilt</option>
                <option value="id">größte Id</option>
              </select>{' '}
              Filter:{' '}
              <input
                value={filter}
                onChange={(value) => setFilter(value.target.value)}
              />
            </StyledP>

            <TableWrapper>
              <StyledTable>
                <tbody>
                  <StyledTr>
                    <StyledTh>Nr</StyledTh>
                    <StyledTh>Seite</StyledTh>
                    <StyledTh>Aufrufe</StyledTh>
                    <StyledTh title="geschätzter Anteil von Aufrufen die von extern auf die Seite kommen">
                      extern
                    </StyledTh>
                    <StyledTh title="Aktionen (siehe rechts) pro 100 Aufrufe">
                      AphA
                    </StyledTh>
                    <StyledTh title="Klicks auf interne Links">Kl.</StyledTh>
                    <StyledTh title="Lösungen angezeigt">Lös.</StyledTh>
                    <StyledTh title="Interaktive Aufgaben">Int.</StyledTh>
                    <StyledTh title="Spoiler aufgeklappt">Sp.</StyledTh>
                    <StyledTh title="Suche angeklickt">Su.</StyledTh>
                    <StyledTh title="Video geladen">Vid.</StyledTh>
                    <StyledTh title="Applet geladen">Ap.</StyledTh>
                    <StyledTh title="Inhalt geteilt">Tl.</StyledTh>
                  </StyledTr>
                  {visibleRows.map((row: any, i: number) => {
                    return (
                      <StyledTr key={i}>
                        <StyledTd>{i + 1}</StyledTd>
                        <StyledTd>{generateLink(row)}</StyledTd>
                        <StyledTd>{row.views}</StyledTd>
                        <StyledTd>{getExternBound(row)}</StyledTd>
                        <StyledTd>{row.apha < 0 ? '--' : row.apha}</StyledTd>
                        <StyledTd>{row.navs}</StyledTd>
                        <StyledTd>{row.solutions}</StyledTd>
                        <StyledTd>{row.interactives}</StyledTd>
                        <StyledTd>{row.spoilers}</StyledTd>
                        <StyledTd>{row.searches}</StyledTd>
                        <StyledTd>{row.videos}</StyledTd>
                        <StyledTd>{row.applets}</StyledTd>
                        <StyledTd>{row.shares}</StyledTd>
                      </StyledTr>
                    )
                  })}
                </tbody>
              </StyledTable>
            </TableWrapper>
            <StyledP>
              <Button onClick={() => setLimit(limit + 20)}>
                Mehr anzeigen
              </Button>
            </StyledP>
          </SpecialCss>
        </MaxWidthDiv>
      </RelativeContainer>
    )
  }
  return <StyledP>Daten werden geladen ...</StyledP>

  function getExternBound(row: any) {
    if (row.views < 10) return '--'
    const lowerBound = Math.round((row.external * 100) / row.views)
    const upperBound = Math.round(100 - (row.internal * 100) / row.views)
    let text = ' '
    if (lowerBound == upperBound) {
      text += `${lowerBound}% `
    } else {
      text += `${lowerBound}-${upperBound}% `
    }
    return text
  }

  function generateLink(row: any) {
    const path = data.uuid2path[row.id]
    if (!path) {
      return <Link href={`/${row.id}`}>/{row.id}</Link>
    }
    let title = decodeURI(path)
    if (title.length > 45) {
      title = '...' + title.substring(title.length - 45)
    }
    return <Link href={path}>{title}</Link>
  }
}
