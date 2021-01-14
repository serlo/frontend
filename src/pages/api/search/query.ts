// eslint-disable-next-line import/no-internal-modules
import searchIndex_raw from '@entkenntnis/serlo-searchindex/entity_index_30_dez_2020.json'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-internal-modules,import/no-commonjs
const { query2tokens } = require('../../../../external/textAnalyzer.js')

const searchIndex: any = searchIndex_raw

export interface SearchQueryResponse {
  exercises: ExerciseResult[]
  documents: DocumentResult[]
}

export interface ExerciseResult {
  id: string
  explain: string
  score: number
  ageGroup: string[]
}

export interface DocumentResult {
  id: string
  title: string
  highlight: string
  score: number
  explain: string
  type: string
}

searchIndex.lengthCache = {}

for (const key in searchIndex.tokens) {
  searchIndex.lengthCache[key] = Object.keys(searchIndex.tokens[key]).length
}

searchIndex.lengthCache2 = {}

for (const key in searchIndex.tokens2) {
  searchIndex.lengthCache2[key] = Object.keys(searchIndex.tokens2[key]).length
}

export default function autocomplete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = req.query.q
  const query = (Array.isArray(q) ? q[0] : q ?? '').toLowerCase()

  const output: SearchQueryResponse = { exercises: [], documents: [] }

  const words = query2tokens(query)

  const candidates: { [id: string]: number } = {}

  const candidates2: { [id: string]: number } = {}

  // collect all possible results
  for (const word of words) {
    const token = searchIndex.tokens[word]
    if (token) {
      for (const id in token) {
        if (!candidates[id]) candidates[id] = 0
        candidates[id]++
      }
    }
  }

  const minCount = Math.ceil(words.length / 2)
  const excludeList: string[] = []
  for (const id in candidates) {
    if (candidates[id] < minCount) {
      excludeList.push(id)
    }
  }

  for (const word of words) {
    const token = searchIndex.tokens2[word]
    if (token) {
      for (const id in token) {
        if (!candidates2[id]) candidates2[id] = 0
        candidates2[id]++
      }
    }
  }

  const excludeList2: string[] = []
  for (const id in candidates2) {
    if (candidates2[id] < minCount) {
      excludeList2.push(id)
    }
  }

  // calculate

  for (const id in candidates) {
    if (excludeList.includes(id)) continue
    const { score, explain } = calculateScore(id, words, searchIndex)
    output.exercises.push({
      id,
      score,
      explain,
      ageGroup: searchIndex.payloads[id].age,
    })
  }

  output.exercises.sort((a, b) => b.score - a.score)

  for (const id in candidates2) {
    if (excludeList2.includes(id)) continue
    const { score, explain } = calculateScore2(id, words, searchIndex)
    output.documents.push({
      id,
      score,
      title: searchIndex.docs[id].title,
      highlight: searchIndex.docs[id].highlight,
      explain,
      type: searchIndex.docs[id].type,
    })
  }

  output.documents.sort((a, b) => b.score - a.score)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(output)
}

function round2(num: number) {
  return Math.round(num * 100) / 100
}

function calculateScore(id: any, words: string[], searchIndex: any) {
  // task score
  const { weight, explain } = calculateTFIDF(
    id,
    words,
    searchIndex.tokens,
    searchIndex.payloads[id].docLength,
    searchIndex.lengthCache
  )

  //console.log('weights', weightTask, weightSolution, weightTax)
  const penaltyFactor1 = searchIndex.payloads[id].solutionMissing ? 0.45 : 1
  const penaltyFactor2 = getLinkedEntityPenalty(
    searchIndex.payloads[id].linkedEntities.length
  )

  const recencyValue = Math.log(id) * 0.01

  const taxBoost =
    words.filter((word) => searchIndex.payloads[id].taxonomy.includes(word))
      .length > 0
      ? 1
      : 0.75

  //console.log(id, weight, penaltyFactor)

  //console.log('parts', searchIndex.payloads[id].parts)

  const score =
    (weight + recencyValue) * penaltyFactor1 * penaltyFactor2 * taxBoost
  return {
    score,
    explain: `Score: ${round2(
      score
    )}, sol: ${penaltyFactor1}, lnks: ${penaltyFactor2}, rec: ${round2(
      recencyValue
    )}, tax: ${round2(taxBoost)}, ${explain}`,
  }
}

function calculateScore2(id: any, words: string[], searchIndex: any) {
  // task score
  const { weight, explain } = calculateTFIDF(
    id,
    words,
    searchIndex.tokens2,
    searchIndex.docs[id].length,
    searchIndex.lengthCache2
  )

  //console.log(id, weight, penaltyFactor)

  //console.log('parts', searchIndex.payloads[id].parts)

  return {
    score: weight,
    explain,
  }
}

function getLinkedEntityPenalty(amount: any) {
  if (amount == 0) return 0.45
  return 1
}

function calculateTFIDF(
  id: any,
  words: any,
  tokens: any,
  length: any,
  lengthCache: any
) {
  let score = 0
  let explain = ''
  let occurCount = 0
  for (const word of words) {
    const token = tokens[word]
    if (token) {
      if (token[id]) {
        occurCount++
        const tf = Math.sqrt(Math.min(token[id], 6))
        const idf = Math.log(4000 / ((lengthCache[word] as number) + 1)) + 1
        score += tf * idf
        explain += `[${word} tf:${round2(tf)} idf:${round2(idf)}] `
        //console.log('idf', idf)
      }
    }
  }

  const fieldLength = Math.max(1 / Math.sqrt(Math.max(40, length)), 1 / 60)

  const coord = occurCount / words.length

  explain += `* fl:${round2(fieldLength)} * coord:${round2(coord)}`

  const weight = coord * score * fieldLength

  return { weight, explain }
}
