import { useRef, useState, useEffect, useCallback, Fragment } from 'react'
import Autosuggest from 'react-autosuggest'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'

import { HSpace } from '../content/h-space'
import { Injection } from '../content/injection'
import { Lazy } from '../content/lazy'
import { Link } from '../content/link'
import { StyledH1 } from '../tags/styled-h1'
import { StyledH3 } from '../tags/styled-h3'
import { StyledP } from '../tags/styled-p'
import theme from '@/components/pages/explore.module.css'
import { frontendOrigin } from '@/helper/frontent-origin'
import { AutocompleteResponse } from '@/pages/api/search/autocomplete'
import { SearchQueryResponse } from '@/pages/api/search/query'
import { renderArticle } from '@/schema/article-renderer'

// eslint-disable-next-line import/no-internal-modules,import/no-unassigned-import
import 'react-tabs/style/react-tabs.css'

export function Explore() {
  const counts = useRef<any>({ age: {} })

  const [limit2, setLimit2] = useState(10)

  const [choices, setChoices] = useState<any>([])
  const [limit, setLimit] = useState(10)
  const [query, setQuery] = useState<string>('')
  const [counter, setCounter] = useState(1)
  const [result, setResult] = useState<SearchQueryResponse>({
    exercises: [],
    documents: [],
  })

  const [tabIndex, setTabIndex] = useState(0)

  const origin = frontendOrigin

  useEffect(() => {
    setTabIndex(parseInt(sessionStorage.getItem('__tab_index') ?? '0') ?? 0)
    setCounter(counter + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (query) sessionStorage.setItem('__explore_query', query)
  }, [query])

  useEffect(() => {
    console.log('search:', query)

    if (query) {
      fetch(origin + '/api/search/query?q=' + encodeURIComponent(query))
        .then((res) => res.json())
        .then((json: SearchQueryResponse) => {
          setResult(json)

          json.exercises = json.exercises.filter((exericse) => {
            if (choices.length > 0) {
              if (exericse.ageGroup.some((age) => choices.includes(age)))
                return false
            }
            return true
          })

          counts.current = { age: {} }
          for (const entry of result.exercises) {
            for (const age of entry.ageGroup) {
              if (!counts.current.age[age]) counts.current.age[age] = 0
              counts.current.age[age]++
            }
          }
          setCounter(counter + 1)
        })
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, choices])

  return (
    <div className="serlo-content-with-spacing-fixes">
      <HSpace amount={50} />
      <StyledH1>Entdecke Inhalte auf Serlo</StyledH1>
      <InputForm
        runSearch={(query: string) => {
          setLimit(10)
          setLimit2(10)
          setQuery(query)
        }}
      />

      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => {
          setTabIndex(index)
          sessionStorage.setItem('__tab_index', index.toString())
        }}
      >
        <TabList style={{ marginLeft: 6 }}>
          <Tab>Aufgaben ({result.exercises.length})</Tab>
          <Tab>Erklärungen ({result.documents.length})</Tab>
        </TabList>

        <TabPanel>
          <HSpace amount={30} />
          {choices.length > 0 ? (
            <FacetDiv>
              <StyledP>
                Filter:{' '}
                {choices.map((choice: any) => (
                  <Fragment key={choice}>
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
                  </Fragment>
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
          {result.exercises.slice(0, limit).map(({ id, explain }) => (
            <Fragment key={id}>
              <Document id={id} explain={explain} />
            </Fragment>
          ))}
          {result.exercises.length > limit && (
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
          {result.documents
            .slice(0, limit2)
            .map(({ id, title, highlight, type }) => (
              <Fragment key={id}>
                <HSpace amount={30} />
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <StyledH3 style={{ marginRight: '5px' }}>
                    <Link href={`/${id}`}>{title}</Link>
                  </StyledH3>
                  <small>[{type2string(type)}]</small>
                </div>
                <StyledP>{highlight} </StyledP>
              </Fragment>
            ))}
          {result.documents.length > limit2 && (
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
    </div>
  )
}

function type2string(type: string) {
  if (type == 'Article') return 'Artikel'
  if (type == 'CoursePage') return 'Kurs'
  return type
}

function InputForm(props: any) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttled = useCallback(
    throttle(1000, ({ value }: any) => {
      // to search
      //setSuggestions(entries.slice(0, 5).map((entry: any) => entry.val))
      fetch(
        frontendOrigin +
          '/api/search/autocomplete?q=' +
          encodeURIComponent(value)
      )
        .then((res) => res.json())
        .then((json: AutocompleteResponse) => {
          setSuggestions(json.result)
        })
        .catch(() => {})
    }),
    [props.searchIndex]
  )

  useEffect(() => {
    const value = sessionStorage.getItem('__explore_query') ?? ''
    setInputValue(value)
    props.runSearch(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <Fragment key={cat.key}>
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
          </Fragment>
        ))}
      </StyledP>
    </FacetDiv>
  )
}

function Document({ id, explain }: any) {
  return (
    <>
      <HSpace amount={60} />
      <p style={{ textAlign: 'right', marginBottom: '-10px' }}>
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
        <Injection href={`/${id}`} key={id} renderNested={renderArticle} />
      </Lazy>
    </>
  )
}

const FacetDiv = styled.div`
  background-color: ${(props) => props.theme.colors.bluewhite};
  padding-top: 20px;
  padding-bottom: 1px;
`
