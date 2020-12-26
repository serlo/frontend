import levenshtein from 'fast-levenshtein'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import styled from 'styled-components'

import { HSpace } from '../content/h-space'
import { Injection } from '../content/injection'
import { Lazy } from '../content/lazy'
import { Link } from '../content/link'
import { SpecialCss } from '../content/special-css'
import { RelativeContainer } from '../navigation/relative-container'
import { StyledH1 } from '../tags/styled-h1'
import { StyledP } from '../tags/styled-p'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import theme from '@/components/pages/explore.module.css'

export function Explore() {
  const [searchIndex, setSearchIndex] = React.useState<any>({})

  const ranking = React.useRef<any>([])
  const counts = React.useRef<any>({ age: {} })

  const [choices, setChoices] = React.useState<any>([])
  const [limit, setLimit] = React.useState(10)
  const [query, setQuery] = React.useState<string>('')
  const [counter, setCounter] = React.useState(1)

  React.useEffect(() => {
    void (async () => {
      const res3 = await fetch(
        'https://gist.githubusercontent.com/Entkenntnis/a5019187ea4a11a59df8ac88376fb45c/raw/cf6acd07702fb37c6446944860e9ddc88a6b6d0e/exercise_index_26_dez_2020.json'
      )
      const json3 = await res3.json()

      json3.lengthCache = {}

      for (const key of Object.keys(json3.tokens)) {
        json3.lengthCache[key] = Object.keys(json3.tokens[key]).length
      }

      json3.autocomplete.tokenList = Object.keys(json3.autocomplete.tokens)

      //console.log(json3)

      setSearchIndex(json3)

      //console.log(searchIndex)
    })()
  }, [])

  React.useEffect(() => {
    console.log('search:', query)
    const lower = query.toLowerCase()
    const words = lower
      .split(/[^a-zäöüß0-9]/)
      .map((x) => stem(x))
      .filter((x) => x)
    console.log(words)

    const candidates: any = {}

    const addFromToken = (token: any) => {
      if (token) {
        for (const id of Object.keys(token)) {
          if (!candidates[id]) candidates[id] = 0
          candidates[id]++
        }
      }
    }

    // collect all possible results
    for (const word of words) {
      addFromToken(searchIndex.tokens[word])
    }

    const minCount = Math.ceil(words.length / 2)
    const excludeList: any = []
    for (const id in candidates) {
      if (candidates[id] < minCount) {
        excludeList.push(id)
      }
    }

    console.log(excludeList)

    const confirmed = true

    /*if (candidates.size > 10000) {
      confirmed = confirm(
        'Diese Suche kann etwas länger dauern ... Fortfahren?'
      )
    }*/

    if (confirmed) {
      ranking.current = []

      for (const id in candidates) {
        if (excludeList.includes(id)) continue
        if (choices.length > 0) {
          if (
            !searchIndex.payloads[id].age.some((age: any) =>
              choices.includes(age)
            )
          )
            continue
        }
        ranking.current.push({
          id,
          score: score(id, words, searchIndex),
        })
      }

      ranking.current.sort((a: any, b: any) => b.score - a.score)

      // count
      counts.current = { age: {} }
      for (const entry of ranking.current) {
        const ages = searchIndex.payloads[entry.id].age
        for (const age of ages) {
          if (!counts.current.age[age]) counts.current.age[age] = 0
          counts.current.age[age]++
        }
      }

      //console.log(counts.current)

      setCounter(counter + 1)
    }
  }, [query, choices])

  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <SpecialCss>
          <HSpace amount={50} />
          <StyledH1>Entdecke Aufgaben auf Serlo</StyledH1>
          {searchIndex ? (
            <>
              <InputForm
                runSearch={(query: string) => {
                  setLimit(10)
                  console.log('split')
                  setQuery(query)
                }}
                searchIndex={searchIndex}
              />
              <StyledP>
                <em>{ranking.current.length} Ergebnisse</em>
              </StyledP>
              {choices.length > 0 ? (
                <FacetDiv>
                  <StyledP>
                    Filter:{' '}
                    {choices.map((choice: any) => (
                      <React.Fragment key={choice}>
                        <strong>{choice}</strong>{' '}
                        <span
                          style={{ color: 'blue', cursor: 'pointer' }}
                          onClick={() =>
                            setChoices(choices.filter((c: any) => c != choice))
                          }
                        >
                          [x]
                        </span>
                        ,{' '}
                      </React.Fragment>
                    ))}
                  </StyledP>
                </FacetDiv>
              ) : null}
              {choices.length == 0 && (
                <CategorySelector
                  counts={counts.current.age}
                  heading="Altersstufe"
                  choices={choices}
                  setChoices={setChoices}
                />
              )}
              {ranking.current.slice(0, limit).map(({ id, score }: any) => (
                <React.Fragment key={id}>
                  <Document id={id} score={score} />
                </React.Fragment>
              ))}
              {ranking.current.length > limit && (
                <StyledP>
                  <button
                    onClick={() => {
                      setLimit(limit + 10)
                    }}
                  >
                    Mehr anzeigen
                  </button>
                </StyledP>
              )}
            </>
          ) : (
            <StyledP>Suchindex wird geladen ...</StyledP>
          )}
        </SpecialCss>
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

const autocompleteStopwords = ['zu', 'zur', 'zum', 'und', 'aufgaben']

function InputForm(props: any) {
  const [inputValue, setInputValue] = React.useState('')
  const [suggestions, setSuggestions] = React.useState<string[]>([])

  const throttled = React.useCallback(
    throttle(500, ({ value }: any) => {
      // to search
      const query = value.toLowerCase()

      const tokens = query.split(/[^a-zäöüß0-9]/).filter((x: any) => x)

      if (tokens.length > 0) {
        const frontToken = tokens[tokens.length - 1]
        const fixedToken = tokens.slice(0, -1)

        let docs = Object.keys(props.searchIndex.autocomplete.docs)

        for (const t of fixedToken) {
          docs = docs.filter((doc) =>
            props.searchIndex.autocomplete.tokens[t]?.includes(parseInt(doc))
          )
        }

        const relevantTokens = props.searchIndex.autocomplete.tokenList.filter(
          (t: any) =>
            t.includes(frontToken) &&
            !fixedToken.includes(t) &&
            props.searchIndex.autocomplete.tokens[t]?.some((doc: any) => {
              return docs.includes(doc.toString())
            })
        )

        if (relevantTokens.length == 1 || relevantTokens.includes(frontToken)) {
          const relTok =
            relevantTokens.length == 1 ? relevantTokens[0] : frontToken
          docs = docs.filter((doc) =>
            props.searchIndex.autocomplete.tokens[relTok].includes(
              parseInt(doc)
            )
          )
          for (const id of docs) {
            for (const token of props.searchIndex.autocomplete.docs[id]) {
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
          .map((t: any) => [...fixedToken, t].join(' '))
          .map((val: any) => {
            return {
              val,
              distance: levenshtein.get(val, query),
            }
          })

        entries.sort((a: any, b: any) => a.distance - b.distance)

        setSuggestions(entries.slice(0, 5).map((entry: any) => entry.val))
      }
    }),
    [props.searchIndex]
  )

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '20px' }} />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={throttled}
          onSuggestionsClearRequested={() => {
            setSuggestions([])
          }}
          getSuggestionValue={(str: any) => {
            return str
          }}
          renderSuggestion={(str: any) => str}
          inputProps={{
            value: inputValue,
            onChange: (e: any, { newValue }: any) => {
              setInputValue(newValue)
            },
            onKeyDown: (e: any) => {
              if (e.key == 'Enter') {
                props.runSearch(inputValue)
              }
            },
          }}
          theme={theme}
        />
        <div style={{ width: '20px' }} />
        <button
          onClick={() => {
            props.runSearch(inputValue)
          }}
        >
          Los
        </button>
      </div>
      <HSpace amount={40} />
    </>
  )
}

function throttle(delay: any, fn: any) {
  let inThrottle = false
  let last: any = undefined

  return (args: any) => {
    if (inThrottle) {
      last = () => {
        fn(args)
      }
      return
    }

    inThrottle = true
    fn(args)
    const resetThrottle = () => {
      if (last) {
        last()
        last = undefined
        setTimeout(resetThrottle, delay)
      }
      inThrottle = false
    }
    setTimeout(resetThrottle, delay)
  }
}
function CategorySelector(props: any) {
  const { counts, heading, choices, setChoices } = props

  if (!counts) return null

  const categories = []

  for (const key of Object.keys(counts)) {
    categories.push({ key, count: counts[key] })
  }

  if (categories.length <= 1) return null

  categories.sort((a, b) => b.count - a.count)

  return (
    <FacetDiv>
      <StyledP>
        <strong>{heading}</strong>:
        {categories.map((cat) => (
          <React.Fragment key={cat.key}>
            <label>
              <input
                type="checkbox"
                checked={choices.includes(cat.key)}
                onChange={() => {
                  if (choices.includes(cat.key)) {
                    setChoices(choices.filter((c: any) => c != cat.key))
                  } else {
                    setChoices([...choices, cat.key])
                  }
                }}
              />
              {choices.includes(cat.key) ? (
                <strong>
                  {cat.key} ({cat.count})
                </strong>
              ) : (
                <>
                  {cat.key} ({cat.count})
                </>
              )}
            </label>
            &nbsp;&nbsp;
          </React.Fragment>
        ))}
      </StyledP>
    </FacetDiv>
  )
}

function Document({ id, score }: any) {
  return (
    <>
      <HSpace amount={60} />
      <p style={{ textAlign: 'right' }}>
        <small>
          Aufgabe <Link href={`/${id}`}>{id}</Link> (Score:{' '}
          {Math.round(score * 100) / 100})
        </small>
      </p>
      <Lazy>
        {' '}
        <Injection href={`/${id}`} key={id} />
      </Lazy>
    </>
  )
}

function score(id: any, words: string[], searchIndex: any) {
  // task score
  const weight = calculateTFIDF(
    id,
    words,
    searchIndex.tokens,
    searchIndex.payloads[id].docLength,
    searchIndex
  )

  //console.log('weights', weightTask, weightSolution, weightTax)
  const penaltyFactor = searchIndex.payloads[id].solutionMissing ? 0.45 : 1

  //console.log(id, weight, penaltyFactor)

  return (weight + Math.log(id) * 0.05) * penaltyFactor
}

function calculateTFIDF(
  id: any,
  words: any,
  tokens: any,
  length: any,
  searchIndex: any
) {
  let score = 0
  let occurCount = 0
  for (const word of words) {
    const token = tokens[word]
    if (token) {
      if (token[id]) {
        occurCount++
        const tf = Math.sqrt(Math.min(token[id], 4))
        const idf =
          Math.log(4000 / ((searchIndex.lengthCache[word] as number) + 1)) + 1
        const fieldLength = Math.max(
          1 / Math.sqrt(Math.max(40, length)),
          1 / 60
        )
        score += tf * idf * fieldLength
        //console.log('idf', idf)
      }
    }
  }

  return (occurCount / words.length) * score
}

const FacetDiv = styled.div`
  background-color: ${(props) => props.theme.colors.lightBlueBackground};
  padding-top: 20px;
  padding-bottom: 1px;
`

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

/*let ids = words.map((word) => stems[word] || [])

  if (ids.length > 0) {
    let results = ids[0].filter((id: number) =>
      ids.every((arr) => arr.includes(id))
    )

    for (const id of results) {
      if (categories[id]) {
        const { subject, type, age } = categories[id]

        if (!index.subject[subject]) index.subject[subject] = 0
        if (!index.type[type]) index.type[type] = 0
        if (!index.age[age]) index.age[age] = 0

        index.subject[subject]++
        index.type[type]++
        index.age[age]++
      }
    }

    results = results.filter((id: any) => {
      const cat = categories[id]
      if (cat) {
        const hasSubjectChoice = !Object.keys(index.subject).every(
          (key) => !choices.includes(key)
        )
        const hasTypeChoice = !Object.keys(index.type).every(
          (key) => !choices.includes(key)
        )
        const hasAgeChoice = !Object.keys(index.age).every(
          (key) => !choices.includes(key)
        )

        if (hasSubjectChoice) {
          if (!choices.includes(cat.subject)) return false
        }

        if (hasTypeChoice) {
          if (!choices.includes(cat.type)) return false
        }

        if (hasAgeChoice) {
          if (!choices.includes(cat.age)) return false
        }

        //console.log(noAge)
        return true
      }
    })

    index = {
      subject: {},
      type: {},
      age: {},
    }

    for (const id of results) {
      if (categories[id]) {
        const { subject, type, age } = categories[id]

        if (!index.subject[subject]) index.subject[subject] = 0
        if (!index.type[type]) index.type[type] = 0
        if (!index.age[age]) index.age[age] = 0

        index.subject[subject]++
        index.type[type]++
        index.age[age]++
      }
    }

    console.log(index)

    ids = results
  }

  */
