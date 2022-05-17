import { faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { UuidUrlInput } from '../author/uuid-url-input'
import { PageTitle } from '../content/page-title'
import { FaIcon } from '../fa-icon'
import { PleaseLogIn } from '../user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { TaxonomyData, TaxonomyLink } from '@/data-types'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

interface TaxonomyMoveCopyProps {
  taxonomyData: TaxonomyData
}
export function TaxonomyMoveCopy({ taxonomyData }: TaxonomyMoveCopyProps) {
  const [buttonsActive, setButtonsActive] = useState(false)
  const [entityIds, setEntityIds] = useState<number[]>([])

  useEffect(() => {
    const shouldBeOn = entityIds.length > 0

    if (shouldBeOn && !buttonsActive) setButtonsActive(true)
    if (!shouldBeOn && buttonsActive) setButtonsActive(false)
  }, [entityIds])

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.subscriptions

  return (
    <>
      <PageTitle title="Move or Copy TaxonomyTerms" headTitle />

      <div className="mx-side">
        <h2 className="font-bold">Select entities to move or copy:</h2>
        {renderList()}
        <h2 className="mt-6 mb-3 font-bold">Target term:</h2>
        {renderInput()}
      </div>
    </>
  )

  function renderList() {
    return (
      <>
        <p className="mt-4">
          {taxonomyData.articles.map((node) => renderLi(node, 'article'))}
        </p>
        <p className="mt-4">
          {taxonomyData.exercises.map((node) => renderLi(node, 'exercise'))}
        </p>
        <p className="mt-4">
          {taxonomyData.videos.map((node) => renderLi(node, 'video'))}
        </p>
        <p className="mt-4">
          {taxonomyData.applets.map((node) => renderLi(node, 'applet'))}
        </p>
        <p className="mt-4">
          {taxonomyData.courses.map((node) => renderLi(node, 'course'))}
        </p>
        <p className="mt-4">
          {taxonomyData.events.map((node) => renderLi(node, 'event'))}
        </p>
      </>
    )
  }

  function renderLi(node: TaxonomyLink, type: string) {
    const isChecked = entityIds.includes(node.id)

    return (
      <div>
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              if (isChecked)
                setEntityIds(entityIds.filter((id) => id !== node.id))
              else setEntityIds([...entityIds, node.id])
            }}
          />{' '}
          <FaIcon icon={getIconByTypename(type)} /> {node.title}
        </label>{' '}
        ({' '}
        <a
          href={node.url}
          target="_blank"
          rel="noreferrer"
          className="serlo-link"
        >
          Link
        </a>{' '}
        )
      </div>
    )
  }

  function renderInput() {
    return (
      <UuidUrlInput
        supportedEntityTypes={['TaxonomyTerm']}
        supportedTaxonomyTypes={['topic', 'topicFolder']}
        unsupportedIds={[taxonomyData.id]}
        renderButtons={renderButtons}
      />
    )
  }

  function renderButtons(_type: string, id: number) {
    const buttonClass = clsx(
      'text-base serlo-button serlo-make-interactive-light mr-3',
      !buttonsActive && 'bg-gray-200 cursor-not-allowed'
    )
    return (
      <div className="mt-4">
        <button
          className={buttonClass}
          disabled={!buttonsActive}
          onClick={() => {
            console.log(id)
          }}
        >
          <FaIcon icon={faArrowRight} /> Move to folder
        </button>
        <button
          className={buttonClass}
          disabled={!buttonsActive}
          onClick={() => {
            console.log(id)
          }}
        >
          <FaIcon icon={faCopy} /> Copy to folder
        </button>
      </div>
    )
  }
}
