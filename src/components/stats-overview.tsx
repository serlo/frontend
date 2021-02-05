import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { SpecialCss } from './content/special-css'
import { StatsContext } from './frontend-client-base'
import { StyledH1 } from './tags/styled-h1'
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

    for (const date of data.dates) {
      const cur = stats.stats[date]

      for (const id in cur.views) {
        data.totalViews += cur.views[id].sum
        data.internalNavs += cur.views[id].internal
      }
      for (const event in cur.events) {
        if (event.startsWith('clicksearch_')) {
          data.searches++
        }
        if (event.startsWith('opensolution_')) {
          data.solutions++
        }
        if (event.startsWith('loadvideo_')) {
          data.videos++
        }
        if (event.startsWith('loadgeogebra_')) {
          data.applets++
        }
        if (event.startsWith('share_')) {
          data.shares++
        }
        if (event.startsWith('openspoiler_')) {
          data.spoilers++
        }
      }
    }

    console.log('generate data')

    setData(data)
  }, [stats])

  if (stats && data) {
    return (
      <Container>
        <SpecialCss>
          <StyledP>
            Herzlich Willkommen bei den Statistiken und Insights von Serlo! Hier
            finden sich neue Funktionen im Aufbau, um mithilfe von Statistiken
            besser zu verstehen, wie User mit den Inhalt umgehen.
          </StyledP>
          <StyledP>
            Während der Alpha-Phase können viele Änderungen passieren. Außerdem
            können die verfügbaren Daten schwanken bzw. Angaben können ungenau /
            fehlerhaft sein. Nutzung daher auf eigene Gefahr.
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
            <select>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </StyledP>

          <StyledTable>
            <tbody>
              <StyledTr>
                <StyledTh>Caption</StyledTh>
              </StyledTr>
              <StyledTr>
                <StyledTd>Value</StyledTd>
              </StyledTr>
            </tbody>
          </StyledTable>
        </SpecialCss>
      </Container>
    )
  }
  return null
}

const Container = styled.div`
  margin: 16px;
`
