import React from 'react'

import { Link } from '@/components/content/link'
import { StatsViews } from '@/components/content/stats-views'
import {
  FrontendClientBase,
  IdContext,
  StatsContext,
} from '@/components/frontend-client-base'
import { HeaderFooter } from '@/components/header-footer'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { StyledH1 } from '@/components/tags/styled-h1'
import { StyledP } from '@/components/tags/styled-p'

export default function TopPages() {
  return (
    <FrontendClientBase>
      <HeaderFooter>
        <RelativeContainer>
          <MaxWidthDiv>
            <StyledH1>Top-Seiten</StyledH1>
            <Top100 />
          </MaxWidthDiv>
        </RelativeContainer>
      </HeaderFooter>
    </FrontendClientBase>
  )
}

function Top100() {
  const stats = React.useContext(StatsContext)
  const [limit, setLimit] = React.useState(100)
  if (!stats?.statsData) return null
  const entries = []
  for (const id in stats.statsData.counts) {
    entries.push({ id, count: stats.statsData.counts[id] })
  }
  entries.sort((a, b) => b.count - a.count)
  return (
    <>
      {entries.slice(0, limit).map((entry, id) => {
        const path = Object.keys(stats.statsData.uuid2paths[entry.id])[0]
        return (
          <StyledP key={entry.id}>
            {id + 1}) <Link href={path}>{path}</Link>{' '}
            <IdContext.Provider value={parseInt(entry.id)}>
              <StatsViews />
            </IdContext.Provider>
          </StyledP>
        )
      })}
      <button onClick={() => setLimit(limit + 100)}>Mehr anzeigen</button>
    </>
  )
}
