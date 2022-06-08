import { useState } from 'react'

import { getSubjectSlug } from '../pages/unrevised-revisions'
import { UnrevisedEntity } from './unrevised-entity'
import { useInstanceData } from '@/contexts/instance-context'
import { UnrevisedRevisionsData } from '@/data-types'

export interface UnrevisedSubjectProps {
  subject: UnrevisedRevisionsData['subjects'][number]
}

const limiter = 3

export function UnrevisedSubject({ subject }: UnrevisedSubjectProps) {
  const [showAll, setShowAll] = useState(false)
  const { strings } = useInstanceData()

  const nodes = Array.from(subject.unrevisedEntities.nodes).reverse()
  const visibleNodes = showAll ? nodes : nodes.slice(0, limiter)
  const name = subject.taxonomyTerm.name
  if (subject.unrevisedEntities.totalCount === 0) {
    return null
  }

  return (
    <section className="mb-16">
      <h2 className="serlo-h2 border-0" id={getSubjectSlug(name)}>
        {name} ({subject.unrevisedEntities.totalCount})
      </h2>

      {visibleNodes.map((entity) => (
        <UnrevisedEntity key={entity.id} entity={entity} />
      ))}
      {renderShowAll()}
    </section>
  )

  function renderShowAll() {
    if (nodes.length <= limiter || showAll) return null
    return (
      <button
        className="serlo-button serlo-make-interactive-light mx-side"
        onClick={() => void setShowAll(true)}
      >
        {strings.unrevisedRevisions.showMoreEntities.replace('%subject%', name)}
      </button>
    )
  }
}
