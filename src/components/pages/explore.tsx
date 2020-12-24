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
  const [stems, setStems] = React.useState<any>({})
  const [categories, setCategories] = React.useState<any>({})

  const [choices, setChoices] = React.useState<any>([])
  const [limit, setLimit] = React.useState(10)
  const [query, setQuery] = React.useState<string>('')

  //const [index, setIndex] = React.useState<any>({})
  //const [ids, setIds] = React.useState<number[]>([])

  React.useEffect(() => {
    void (async () => {
      const res = await fetch(
        'https://gist.githubusercontent.com/Entkenntnis/f5e888a4e4ec96510066c5d800232d20/raw/91197a0901db631e039db488703ae5d359971686/stems_exercises_23_dez_2020.json'
      )
      const json = await res.json()
      const res2 = await fetch(
        'https://gist.githubusercontent.com/Entkenntnis/43245321524b433f5c34d42a2cf6c2a0/raw/47aa23106e1142268d58c0f4c8e3ce0789e4fad1/categories_exercises_24_dez_2020.json'
      )
      const json2 = await res2.json()

      setStems(json)
      setCategories(json2)
    })()
  }, [])

  let index: any = {
    subject: {},
    type: {},
    age: {},
  }

  console.log('search:', query)
  const lower = query.toLowerCase()
  const words = lower
    .split(/[^a-zäöüß0-9]/)
    .map((x) => stem(x))
    .filter((x) => x)
  console.log(words)

  let ids = words.map((word) => stems[word] || [])

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
        /*if (
          )
        ) {
          // use filter
          return choices.includes(cat.subject)
        }
        if () {
          // use filter
          return choices.includes(cat.type)
        }
        if () {
          // use filter
          console.log('use age')
          return choices.includes(cat.age)
        }*/
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

  return (
    <RelativeContainer>
      <MaxWidthDiv>
        <SpecialCss>
          <HSpace amount={50} />
          <StyledH1>Entdecke Aufgaben auf Serlo</StyledH1>
          {stems && categories ? (
            <>
              <InputForm runSearch={setQuery} />
              <StyledP>
                <em>{ids.length} Ergebnisse (von 3169)</em>
              </StyledP>
              {choices.length > 0 ? (
                <>
                  <StyledP>
                    Filter:{' '}
                    {choices.map((choice: any) => (
                      <>
                        {choice}{' '}
                        <span
                          style={{ color: 'blue', cursor: 'pointer' }}
                          onClick={() =>
                            setChoices(choices.filter((c: any) => c != choice))
                          }
                        >
                          [x]
                        </span>
                        ,{' '}
                      </>
                    ))}
                  </StyledP>
                  <HSpace amount={20} />
                </>
              ) : (
                <HSpace amount={40} />
              )}

              {((index && ids.length > 10) || choices.length > 0) && (
                <>
                  <CategorySelector
                    catIndex={index.subject}
                    heading="Fächer"
                    choices={choices}
                    setChoices={setChoices}
                  />
                  <CategorySelector
                    catIndex={index.type}
                    heading="Typ"
                    choices={choices}
                    setChoices={setChoices}
                  />
                  <CategorySelector
                    catIndex={index.age}
                    heading="Altersstufe"
                    choices={choices}
                    setChoices={setChoices}
                  />
                </>
              )}
              {ids.slice(0, limit).map((id) => (
                <React.Fragment key={id}>
                  <HSpace amount={50} />
                  <Lazy>
                    <Injection href={`/${id}`} key={id} />
                  </Lazy>
                </React.Fragment>
              ))}
              {ids.length > limit && (
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

function InputForm(props: any) {
  const [query, setQuery] = React.useState('')

  return (
    <StyledP>
      Suche:{' '}
      <input
        onKeyDown={(e) => {
          if (e.key == 'Enter') {
            props.runSearch(query)
          }
        }}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />{' '}
      <button
        onClick={() => {
          props.runSearch(query)
        }}
      >
        Los
      </button>
    </StyledP>
  )
}

function CategorySelector(props: any) {
  const { catIndex, heading, choices, setChoices } = props

  if (!catIndex) return null

  const categories = []

  for (const key of Object.keys(catIndex)) {
    categories.push({ key, count: catIndex[key] })
  }

  if (categories.length <= 1) return null

  categories.sort((a, b) => b.count - a.count)

  console.log('render', heading, choices)

  return (
    <>
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
    </>
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
