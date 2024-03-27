import { NextPage } from 'next'
import Head from 'next/head'

import { getEditUrl } from '@/helper/urls/get-edit-url'

// from https://github.com/serlo/frontend/wiki/Schema
const entities = [
  ['Page', 18922],
  ['Article', 27801],
  ['CoursePage', 52020],
  ['Video', 40744],
  ['Applet', 138114],
  ['TaxonomyTerm', 5],
  ['TaxonomyTerm (lvl)', 1386],
  ['Exercise', 54210],
  ['ExerciseGroup', 53205],
  ['Course', 51979],
  ['Event', 145590],
]

const specialCases = [
  ['Huge Equation Plugin', 202374],
  ['Long Code Block', 48121],
  ['Course w/ trashed pages', 139048],
  ['Multimedia w/ Code', 222271],
  ['SC Exercise without feedback', 7125],
]

const ContentPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <nav>
        <h2>Entities</h2>
        <ul>{renderLis(entities)}</ul>
        <h2>Review Types</h2>…<h2>Special Cases</h2>
        <ul>{renderLis(specialCases)}</ul>
        <h2>Editor Test</h2>
        <ul>{renderLis(entities, true)}</ul>
      </nav>
      <iframe name="show" />
      <Style />
    </>
  )

  function renderLis(lis: typeof entities, editor?: boolean) {
    return lis.map(([name, id]) => (
      <li key={name}>
        <a
          href={
            editor
              ? getEditUrl(
                  id as number,
                  undefined,
                  (name as string).startsWith('Taxonomy')
                )
              : `/${id}`
          }
          target="show"
        >
          {name}
        </a>
      </li>
    ))
  }
}

export default ContentPage

const Style = () => (
  <style global jsx>{`
    #__next {
      display: flex;
    }
    nav {
      width: 12vw;
      background-color: #ddd;
      padding: 0.8rem;
      font-size: 0.9rem;
    }
    nav ul {
      list-style-type: initial;
      margin-left: 1rem;
    }
    iframe {
      width: 88vw;
      height: 100vh;
    }
    h2 {
      font-weight: bold;
      margin-top: 1rem;
    }
  `}</style>
)
