// eslint-disable-next-line import/no-internal-modules
import searchIndex_raw from '@entkenntnis/serlo-searchindex/entity_index_30_dez_2020.json'
import levenshtein from 'fast-levenshtein'
import { NextApiRequest, NextApiResponse } from 'next'

const searchIndex: any = searchIndex_raw

const tokenList = Object.keys(searchIndex.autocomplete.tokens)

const autocompleteStopwords = ['zu', 'zur', 'zum', 'und', 'aufgaben']

export interface AutocompleteResponse {
  result: string[]
}

export default function autocomplete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const q = req.query.q
  const query = (Array.isArray(q) ? q[0] : q ?? '').toLowerCase()

  const tokens = query.split(/[^a-zäöüß0-9]/).filter((x: string) => x)
  const output: AutocompleteResponse = { result: [] }

  if (tokens.length > 0) {
    const frontToken = tokens[tokens.length - 1]
    const fixedToken = tokens.slice(0, -1)

    let docs = Object.keys(searchIndex.autocomplete.docs)

    for (const t of fixedToken) {
      docs = docs.filter((doc) =>
        searchIndex.autocomplete.tokens[t]?.includes(parseInt(doc))
      )
    }

    //console.log(docs.length)

    const relevantTokens = tokenList.filter(
      (t: any) =>
        t.includes(frontToken) &&
        !fixedToken.includes(t) &&
        searchIndex.autocomplete.tokens[t]?.some((doc: number) => {
          return docs.includes(doc.toString())
        })
    )

    //console.log(relevantTokens)

    if (relevantTokens.length == 1 || relevantTokens.includes(frontToken)) {
      const relTok = relevantTokens.length == 1 ? relevantTokens[0] : frontToken
      docs = docs.filter((doc) =>
        searchIndex.autocomplete.tokens[relTok].includes(parseInt(doc))
      )
      for (const id of docs) {
        for (const token of searchIndex.autocomplete.docs[id]) {
          if (token !== relTok && !fixedToken.includes(token)) {
            if (!autocompleteStopwords.includes(token)) {
              const newTok = `${relTok} ${token}`
              if (!relevantTokens.includes(newTok)) {
                relevantTokens.push(newTok)
              }
            }
          }
        }
      }
    }

    const entries = relevantTokens
      .map((t: string) => [...fixedToken, t].join(' '))
      .map((val: string) => {
        return {
          val,
          distance: levenshtein.get(val, query),
        }
      })

    entries.sort((a: any, b: any) => a.distance - b.distance)

    output.result.push(...entries.slice(0, 5).map((entry: any) => entry.val))
  }

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(output)
}
