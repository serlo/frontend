import React from 'react'

import { HSpace } from '../content/h-space'
import { Injection } from '../content/injection'
import { Lazy } from '../content/lazy'
import { SpecialCss } from '../content/special-css'
import { RelativeContainer } from '../navigation/relative-container'
import { StyledH1 } from '../tags/styled-h1'
import { StyledP } from '../tags/styled-p'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'

export function Explore() {
  const [ids, setIds] = React.useState<number[]>([])
  const [stems, setStems] = React.useState<any>({})

  const debouncedSearch = React.useCallback(
    (() => {
      let timer: number
      return (query: string) => {
        clearTimeout(timer)
        timer = setTimeout(() => runSearch(query), 500)
      }
    })(),
    [stems]
  )

  React.useEffect(() => {
    void (async () => {
      const res = await fetch(
        'https://gist.githubusercontent.com/Entkenntnis/f5e888a4e4ec96510066c5d800232d20/raw/91197a0901db631e039db488703ae5d359971686/stems_exercises_23_dez_2020.json'
      )
      const json = await res.json()
      setStems(json)
    })()
  }, [])

  function runSearch(query: string) {
    console.log('search:', query)
    const lower = query.toLowerCase()
    const words = lower
      .split(/[^a-zäöüß0-9]/)
      .map((x) => stem(x))
      .filter((x) => x)
    console.log(words)
    const candidates = new Set<number>()
    for (const word of words) {
      if (stems[word]) {
        for (const id of stems[word]) {
          candidates.add(id)
        }
      }
    }
    const ranking = []
    for (const candidate of candidates) {
      let keep = true
      for (const word of words) {
        if (!stems[word] || !stems[word].includes(candidate)) keep = false
      }
      if (keep) ranking.push({ id: candidate, score: 10 })
    }
    ranking.sort((a, b) => {
      if (a.score == b.score) return b.id - a.id
      return b.score - a.score
    })
    console.log(ranking)
    setIds(ranking.map((el) => el.id))
  }

  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <SpecialCss>
          <HSpace amount={50} />
          <StyledH1>Entdecke Übungsaufgaben auf Serlo</StyledH1>
          {stems && (
            <>
              <HSpace amount={10} />
              <StyledP>
                Suche: <InputField debouncedSearch={debouncedSearch} />
              </StyledP>
              <StyledP>
                <em>{ids.length} Ergebnisse (von 3169)</em>
              </StyledP>
              <HSpace amount={30} />
              <hr />
              {ids.map((id) => {
                return (
                  <React.Fragment key={id}>
                    <Lazy>
                      <Injection href={`/${id}`} key={id} />
                    </Lazy>
                    <hr />
                  </React.Fragment>
                )
              })}
            </>
          )}
          {!stems && <StyledP>Suchindex wird geladen ...</StyledP>}
        </SpecialCss>
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

function InputField({ debouncedSearch }: { debouncedSearch: any }) {
  const [query, setQuery] = React.useState('')

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        debouncedSearch(e.target.value)
      }}
    />
  )
}

// CISTEM

/**
 * CISTEM Stemmer for German
 *
 * This is the official Javascript implementation of the CISTEM stemmer.
 * It is based on the paper
 * Leonie Weißweiler, Alexander Fraser (2017). Developing a Stemmer for German Based on a Comparative Analysis of Publicly Available Stemmers. In Proceedings of the German Society for Computational Linguistics and Language Technology (GSCL)
 * which can be read here:
 * http://www.cis.lmu.de/~weissweiler/cistem/
 *
 * In the paper, we conducted an analysis of publicly available stemmers, developed
 * two gold standards for German stemming and evaluated the stemmers based on the
 * two gold standards. We then proposed the stemmer implemented here and show
 * that it achieves slightly better f-measure than the other stemmers and is
 * thrice as fast as the Snowball stemmer for German while being about as fast as
 * most other stemmers.
 */

const stripge = /^ge(.{4,})/
const replxx = /(.)\1/g
const replxxback = /(.)\*/g
const replü = /ü/g
const replö = /ö/g
const replä = /ä/g
const replß = /ß/g
const replsch = /sch/g
const replei = /ei/g
const replie = /ie/g
const replschback = /\$/g
const repleiback = /%/g
const replieback = /&/g
const stripemr = /e[mr]$/
const stripnd = /nd$/
const stript = /t$/
const stripesn = /[esn]$/

/**
 * This method takes the word to be stemmed and a boolean specifiying if case-insensitive stemming should be used and returns the stemmed word. If only the word
 * is passed to the method or the second parameter is 0, normal case-sensitive stemming is used, if the second parameter is 1, case-insensitive stemming is used.
 * Case sensitivity improves performance only if words in the text may be incorrectly upper case.
 * For all-lowercase and correctly cased text, best performance is achieved by
 * using the case-sensitive version.
 * @param {String} word
 * @param {boolean} case_insensitive
 * @returns {String}
 */
function stem(word: string, case_insensitive = false) {
  if (word.length == 0) return word

  const upper = word[0] === word[0].toUpperCase()
  word = word.toLowerCase()

  word = word.replace(replü, 'u')
  word = word.replace(replö, 'o')
  word = word.replace(replä, 'a')
  word = word.replace(replß, 'ss')

  word = word.replace(stripge, '$1')
  word = word.replace(replsch, '$')
  word = word.replace(replei, '%')
  word = word.replace(replie, '&')
  word = word.replace(replxx, '$1*')

  while (word.length > 3) {
    let result

    if (word.length > 5) {
      result = word.replace(stripemr, '')
      if (result !== word) {
        word = result
        continue
      }

      result = word.replace(stripnd, '')
      if (result !== word) {
        word = result
        continue
      }
    }

    if (!upper || case_insensitive) {
      result = word.replace(stript, '')
      if (result !== word) {
        word = result
        continue
      }
    }

    result = word.replace(stripesn, '')
    if (result !== word) {
      word = result
      continue
    } else {
      break
    }
  }

  word = word.replace(replxxback, '$1$1')
  word = word.replace(repleiback, 'ei')
  word = word.replace(replieback, 'ie')
  word = word.replace(replschback, 'sch')

  return word
}
