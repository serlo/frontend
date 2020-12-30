import levenshtein from 'fast-levenshtein'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'

import { HSpace } from '../content/h-space'
import { Injection } from '../content/injection'
import { Lazy } from '../content/lazy'
import { Link } from '../content/link'
import { SpecialCss } from '../content/special-css'
import { RelativeContainer } from '../navigation/relative-container'
import { StyledH1 } from '../tags/styled-h1'
import { StyledH3 } from '../tags/styled-h3'
import { StyledP } from '../tags/styled-p'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import theme from '@/components/pages/explore.module.css'

// eslint-disable-next-line import/no-internal-modules,import/no-unassigned-import
import 'react-tabs/style/react-tabs.css'

// eslint-disable-next-line import/no-internal-modules,import/no-commonjs
const { query2tokens } = require('../../../external/textAnalyzer.js')

export function Explore() {
  const [searchIndex, setSearchIndex] = React.useState<any>({})

  const ranking = React.useRef<any>([])
  const counts = React.useRef<any>({ age: {} })

  const ranking2 = React.useRef<any>([])
  const [limit2, setLimit2] = React.useState(10)

  const [choices, setChoices] = React.useState<any>([])
  const [limit, setLimit] = React.useState(10)
  const [query, setQuery] = React.useState<string>('')
  const [counter, setCounter] = React.useState(1)

  const [tabIndex, setTabIndex] = React.useState(0)

  React.useEffect(() => {
    setTabIndex(parseInt(sessionStorage.getItem('__tab_index') ?? '') ?? 0)
    setCounter(counter + 1)
  }, [])

  React.useEffect(() => {
    void (async () => {
      const res3 = await fetch(
        //'http://localhost:8081/entity_index_30_dez_2020.json'
        'https://gist.githubusercontent.com/Entkenntnis/808a4a9e88a89308f4f2acdada95c8fa/raw/1c88d4fc4d860d49575e6650c578b03f8d2b851c/entity_index_30_dez_2020.json'
      )
      const json3 = await res3.json()

      json3.lengthCache = {}

      for (const key of Object.keys(json3.tokens)) {
        json3.lengthCache[key] = Object.keys(json3.tokens[key]).length
      }

      json3.lengthCache2 = {}

      for (const key of Object.keys(json3.tokens2)) {
        json3.lengthCache2[key] = Object.keys(json3.tokens2[key]).length
      }

      json3.autocomplete.tokenList = Object.keys(json3.autocomplete.tokens)

      /*const avgTF: any = {}

      for (const id in json3.payloads) {
        avgTF[id] = []
      }

      for (const token in json3.tokens) {
        if (token.length > 3) {
          for (const id in json3.tokens[token]) {
            avgTF[id].push(json3.tokens[token][id])
          }
        }
      }

      for (const id in avgTF) {
        avgTF[id] =
          avgTF[id].length == 0
            ? 0
            : avgTF[id].reduce((a: number, b: number) => a + b, 0) /
              avgTF[id].length
      }

      json3.avgTF = avgTF*/

      //console.log(json3)

      setSearchIndex(json3)

      //console.log(searchIndex)
    })()
  }, [])

  React.useEffect(() => {
    if (query) sessionStorage.setItem('__explore_query', query)
  }, [query])

  React.useEffect(() => {
    console.log('search:', query)
    const words = query2tokens(query)
    console.log(words)

    const candidates: any = {}

    // collect all possible results
    for (const word of words) {
      const token = searchIndex.tokens[word]
      if (token) {
        for (const id of Object.keys(token)) {
          if (!candidates[id]) candidates[id] = 0
          candidates[id]++
        }
      }
    }

    const minCount = Math.ceil(words.length / 2)
    const excludeList: any = []
    for (const id in candidates) {
      if (candidates[id] < minCount) {
        excludeList.push(id)
      }
    }

    // DUUUPPPP
    const candidates2: any = {}
    for (const word of words) {
      const token = searchIndex.tokens2[word]
      if (token) {
        for (const id of Object.keys(token)) {
          if (!candidates2[id]) candidates2[id] = 0
          candidates2[id]++
        }
      }
    }

    const excludeList2: any = []
    for (const id in candidates2) {
      if (candidates2[id] < minCount) {
        excludeList2.push(id)
      }
    }

    //console.log(candidates2)

    //console.log(excludeList)

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
        const { score, explain } = calculateScore(id, words, searchIndex)
        ranking.current.push({
          id,
          score,
          explain,
        })
      }

      ranking.current.sort((a: any, b: any) => b.score - a.score)

      // DUUUUUPPP
      ranking2.current = []

      for (const id in candidates2) {
        if (excludeList2.includes(id)) continue
        const { score, explain } = calculateScore2(id, words, searchIndex)
        ranking2.current.push({
          id,
          score,
          explain,
        })
      }

      ranking2.current.sort((a: any, b: any) => b.score - a.score)

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
          <StyledH1>Entdecke Inhalte auf Serlo</StyledH1>
          {searchIndex ? (
            <>
              <InputForm
                runSearch={(query: string) => {
                  setLimit(10)
                  setLimit2(10)
                  setQuery(query)
                }}
                searchIndex={searchIndex}
              />

              <Tabs
                selectedIndex={tabIndex}
                onSelect={(index) => {
                  setTabIndex(index)
                  sessionStorage.setItem('__tab_index', index.toString())
                }}
              >
                <TabList style={{ marginLeft: 6 }}>
                  <Tab>Aufgaben ({ranking.current.length})</Tab>
                  <Tab>Erklärungen ({ranking2.current.length})</Tab>
                </TabList>

                <TabPanel>
                  <HSpace amount={30} />
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
                                setChoices(
                                  choices.filter((c: any) => c != choice)
                                )
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
                  {ranking.current
                    .slice(0, limit)
                    .map(({ id, explain }: any) => (
                      <React.Fragment key={id}>
                        <Document id={id} explain={explain} />
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
                </TabPanel>
                <TabPanel>
                  {ranking2.current.slice(0, limit2).map(({ id }: any) => (
                    <React.Fragment key={id}>
                      <HSpace amount={30} />
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <StyledH3 style={{ marginRight: '5px' }}>
                          <Link href={`/${id}`}>
                            {searchIndex.docs[id].title}
                          </Link>
                        </StyledH3>
                        <small>
                          [{type2string(searchIndex.docs[id].type)}]
                        </small>
                      </div>
                      <StyledP>{searchIndex.docs[id].highlight} </StyledP>
                    </React.Fragment>
                  ))}
                  {ranking2.current.length > limit2 && (
                    <StyledP>
                      <button
                        onClick={() => {
                          setLimit2(limit2 + 10)
                        }}
                      >
                        Mehr anzeigen
                      </button>
                    </StyledP>
                  )}
                  <HSpace amount={30} />
                </TabPanel>
              </Tabs>
            </>
          ) : (
            <StyledP>Suchindex wird geladen ...</StyledP>
          )}
        </SpecialCss>
      </MaxWidthDiv>
    </RelativeContainer>
  )
}

function type2string(type: string) {
  if (type == 'Article') return 'Artikel'
  if (type == 'CoursePage') return 'Kurs'
  return type
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

  React.useEffect(() => {
    if (props.searchIndex) {
      setInputValue(sessionStorage.getItem('__explore_query') ?? '')
      props.runSearch(inputValue)
    }
  }, [props.searchIndex])

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '14px' }} />
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
      <StyledP>
        <small style={{ fontSize: '0.7em' }}>
          Stand Dezember 2020, nur konvertierte Inhalte
        </small>
      </StyledP>
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

function Document({ id, explain }: any) {
  return (
    <>
      <HSpace amount={60} />
      <p style={{ textAlign: 'right' }}>
        <small>
          Aufgabe <Link href={`/${id}`}>{id}</Link> (
          <span title={explain} style={{ cursor: 'pointer' }}>
            Details
          </span>
          )
        </small>
      </p>
      <Lazy>
        {' '}
        <Injection href={`/${id}`} key={id} />
      </Lazy>
    </>
  )
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

const FacetDiv = styled.div`
  background-color: ${(props) => props.theme.colors.bluewhite};
  padding-top: 20px;
  padding-bottom: 1px;
`
