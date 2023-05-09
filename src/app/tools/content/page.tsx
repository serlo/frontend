import { getEditUrl } from '@/helper/urls/get-edit-url'

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
  ['GroupedExercise', 53209],
  ['Solution', 195107],
  ['Course', 51979],
  ['Event', 145590],
]

// from https://github.com/serlo/frontend/wiki/Schema
const contentExamples = {
  Entities: entities,
  'Review Types': [],
  'Special Cases': [
    ['Huge Equation Plugin', 202374],
    ['Long Code Block', 48121],
    ['Course w/ trashed pages', 139048],
    ['Multimedia w/ Code', 222271],
    ['SC Exercise without feedback', 7125],
  ],
  'Edtr Test': entities,
}

// eslint-disable-next-line import/no-default-export
export default function Page() {
  return (
    <div className="flex">
      <nav className="w-[12vw] bg-brand-200 text-sm p-4">{renderLinks()}</nav>
      <iframe name="show" className="w-[88vw] h-screen" />
    </div>
  )

  function renderLinks() {
    return Object.entries(contentExamples).map(([categoryName, examples]) => {
      const isEdtr = categoryName.includes('Edtr')
      return (
        <>
          <h2 className="mt-4 font-bold">{categoryName}</h2>
          <ul className="list-[initial] ml-4">{renderLis(examples, isEdtr)}</ul>
        </>
      )
    })
  }

  function renderLis(lis: typeof entities, edtr?: boolean) {
    return lis.map(([name, id]) => {
      const href = edtr
        ? getEditUrl(
            id as number,
            undefined,
            (name as string).startsWith('Taxonomy')
          )
        : `/${id}`
      return (
        <li key={name}>
          <a href={href} target="show">
            {name}
          </a>
        </li>
      )
    })
  }
}
