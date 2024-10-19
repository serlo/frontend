import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { SerloExtraContext } from '@editor/utils/serlo-extra-context'
import { useContext, useEffect, useState } from 'react'

export function useSerloQuickbarData(shouldNotFetch?: boolean) {
  const { lang } = useEditStrings()
  const isSerloLinkSearchActive =
    useContext(SerloExtraContext).isSerlo && lang === 'de'

  const [quickbarData, setQuickbarData] = useState<QuickbarData | null>(null)

  useEffect(() => {
    if (!isSerloLinkSearchActive || shouldNotFetch) return
    if (!quickbarData) {
      fetchQuickbarData()
        .then((fetchedData) => fetchedData && setQuickbarData(fetchedData))
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quickbarData, isSerloLinkSearchActive])

  return { quickbarData }
}

// duplicated code from frontend quickbar

export interface QuickbarDataEntry {
  title: string
  id: string
  path: string[]
  isTax: boolean
  count: number // ~ visits in last 3 weeks
  pathLower: string[]
  titleLower: string
  root: string
}

export type QuickbarData = QuickbarDataEntry[]

export const quickbarUrl = 'https://de.serlo.org/api/stats/quickbar.json'

export async function fetchQuickbarData(subject?: string) {
  const req = await fetch(quickbarUrl)
  const data = (await req.json()) as QuickbarData

  data.forEach((entry) => {
    entry.pathLower = entry.path.map((x) => x.toLowerCase())
    entry.titleLower = entry.title.toLowerCase()
  })

  const subjectLower = subject?.toLowerCase() ?? ''

  const filteredData = subject
    ? data.filter((entry) => entry.root?.toLowerCase().startsWith(subjectLower))
    : data

  return filteredData
}

export function findResults(data: QuickbarData, query: string) {
  let results: { entry: QuickbarData[number]; score: number }[] = []

  const keywords = query.toLowerCase().split(' ')

  for (const entry of data) {
    let score = 0
    const preparedQuery = (query.charAt(0) === '/' ? query.slice(1) : query)
      .toLowerCase()
      .trim()
    if (
      entry.titleLower.includes(preparedQuery) ||
      preparedQuery === entry.id
    ) {
      score += 100
      if (entry.titleLower.startsWith(preparedQuery)) {
        score += 10
      } else if (entry.titleLower.includes(' ' + preparedQuery)) {
        score += 8
      } else if (preparedQuery.includes(entry.id)) {
        score += 8
      }
    } else {
      let noHit = 0
      let kwCount = 0
      for (const keyword of keywords) {
        if (keyword) {
          kwCount++
          if (entry.titleLower.includes(keyword)) {
            score += 10
            continue
          }
          let hitContinue = false
          for (const p of entry.pathLower) {
            if (p.includes(keyword)) {
              score += 2
              hitContinue = true
              break
            }
          }
          if (hitContinue) continue
          noHit++
        }
      }
      if (kwCount > 0) {
        if (noHit >= kwCount / 2) {
          score = 0
        } else {
          score *= 1 - noHit / kwCount
        }
      }
    }
    if (score > 0) {
      score += Math.log10(entry.count)
      results.push({ entry, score })
      results.sort((a, b) => b.score - a.score)
      results = results.slice(0, 7)
    }
  }
  return results
}
