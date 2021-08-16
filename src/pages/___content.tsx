import { NextPage } from 'next'

type ListData = string[][]

// from https://github.com/serlo/frontend/wiki/Schema
const entities = [
  ['Page', '/serlo'],
  ['Article', '/27801'],
  ['CoursePage', '/52020'],
  ['Video', '/40744'],
  ['Applet', '/138114'],
  ['TaxonomyTerm', '/5'],
  ['TaxonomyTerm (lvl)', '/1386'],
  ['Exercise', '/54210'],
  ['ExerciseGroup', '/53205'],
  ['GroupedExercise', '/53209'],
  ['Solution', '/195107'],
  ['Course', '/51979'],
  ['Event', '/145590'],
]

const ContentPage: NextPage = () => {
  return (
    <>
      <Style />
      <nav>
        <h2>Entities</h2>
        <ul>{renderLis(entities)}</ul>
        <h2>Review Types</h2>…<h2>Special Cases</h2>…<h2>Logged in Stuff</h2>…
      </nav>
      <iframe name="show" />
    </>
  )

  function renderLis(lis: ListData) {
    return lis.map((li) => (
      <li key={li[0]}>
        <a href={li[1]} target="show">
          {li[0]}
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
