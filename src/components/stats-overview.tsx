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

  const [data, setData] = useState<any>()

  const [limit, setLimit] = useState<number>(20)

  const [sorted, setSorted] = useState<any>([])

  const [sortOption, setSortOption] = useState<any>('views')

  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    if (!stats) return
    const rows: any = []
    for (const id in stats.stats.counts) {
      rows.push(stats.stats.counts[id])
    }
    setData(rows)
  }, [stats])

  useEffect(() => {
    if (data) {
      const newRows = data.slice(0)
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
        const path = row.path
        const filterParts = filter.split(' ')
        if (!path || !filterParts.every((filter) => path.includes(filter)))
          continue
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
            <StyledP>Daten-Zeitraum: {stats.stats.date}</StyledP>
            <StyledP>Es wurden insgesamt:</StyledP>
            <StyledUl>
              <StyledLi>
                <StyledP>{stats.stats.summary.views} Seiten aufgerufen</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{stats.stats.summary.clicks} Links geklickt</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>
                  {stats.stats.summary.solutions} Lösungen angezeigt
                </StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>
                  {stats.stats.summary.interactives} interaktive Aufgaben
                  (Sc/Mc/Input) überprüft
                </StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>
                  {stats.stats.summary.spoilers} Spoiler geöffnet
                </StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{stats.stats.summary.searches} mal gesucht</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{stats.stats.summary.videos} Videos geladen</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{stats.stats.summary.applets} Applets geladen</StyledP>
              </StyledLi>
              <StyledLi>
                <StyledP>{stats.stats.summary.shares} Inhalte geteilt</StyledP>
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
                <option value="clicks">meiste Links geklickt</option>
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
              <br />
              <br />
              Filter:{' '}
              <input
                value={filter}
                onChange={(value) => setFilter(value.target.value)}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <small>
                (Beispiel:{' '}
                <span
                  style={{ color: 'grey', cursor: 'pointer' }}
                  onClick={() => setFilter('biologie vögel')}
                >
                  biologie vögel
                </span>
                )
              </small>
            </StyledP>

            <TableWrapper>
              <StyledTable>
                <tbody>
                  <StyledTr>
                    <StyledTh>Nr</StyledTh>
                    <StyledTh>Seite</StyledTh>
                    <StyledTh>Aufrufe</StyledTh>
                    <StyledTh title="Prozent intern / Suchmaschine / Website o. LMS">
                      i/s/w
                    </StyledTh>
                    <StyledTh title="Aktionen (siehe rechts) pro 100 Aufrufe">
                      AphA
                    </StyledTh>
                    <StyledTh title="Klicks auf einen Link">Klicks</StyledTh>
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
                        <StyledTd
                          style={{
                            backgroundColor:
                              'id' == sortOption ? 'lightyellow' : '',
                          }}
                        >
                          {generateLink(row)}
                        </StyledTd>
                        <StyledTd
                          style={{
                            backgroundColor:
                              sortOption == 'views' ? 'lightyellow' : '',
                          }}
                        >
                          {row.views}
                        </StyledTd>
                        <StyledTd>{`${Math.round(
                          ((row.internal ?? 0) * 100) / row.views
                        )}/${Math.round(
                          ((row.searchengine ?? 0) * 100) / row.views
                        )}/${Math.round(
                          ((row.website ?? 0) * 100) / row.views
                        )}`}</StyledTd>
                        <StyledTd
                          style={{
                            backgroundColor:
                              'apha' == sortOption ? 'lightyellow' : '',
                          }}
                        >
                          {row.apha < 0 ? '--' : row.apha}
                        </StyledTd>
                        {[
                          'clicks',
                          'solutions',
                          'interactives',
                          'spoilers',
                          'searches',
                          'videos',
                          'applets',
                          'shares',
                        ].map((key: string) => (
                          <StyledTd
                            key={key}
                            style={{
                              backgroundColor:
                                key == sortOption ? 'lightyellow' : '',
                            }}
                          >
                            {row[key]}
                          </StyledTd>
                        ))}
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

  function generateLink(row: any) {
    const path = row.path
    let title = path as string
    if (title.length > 45) {
      title = '...' + title.substring(title.length - 45)
    }
    return <Link href={path}>{title}</Link>
  }
}
