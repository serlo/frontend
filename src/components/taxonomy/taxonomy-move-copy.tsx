import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { UuidUrlInput } from '../author/uuid-url-input'
import { PageTitle } from '../content/page-title'
import { FaIcon } from '../fa-icon'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { PleaseLogIn } from '../user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { TaxonomyData, TaxonomyLink } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import {
  useCreateEntityLinkMutation,
  useDeleteEntityLinkMutation,
} from '@/helper/mutations/taxonomyTerm'
import { showToastNotice } from '@/helper/show-toast-notice'

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityIds])

  const createEntityLink = useCreateEntityLinkMutation()
  const deleteEntityLink = useDeleteEntityLinkMutation()

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.copyMove

  return (
    <>
      <Breadcrumbs
        data={[
          {
            label: taxonomyData.title ?? strings.revisions.toContent,
            url: taxonomyData.alias ?? `/${taxonomyData.id}`,
          },
        ]}
        asBackButton
      />
      <PageTitle title={loggedInStrings.title} headTitle />

      <div className="mx-side">
        <h2 className="font-bold">{loggedInStrings.select}</h2>
        {renderList()}
        <h2 className="mt-6 mb-3 font-bold">{loggedInStrings.target}</h2>
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
          {loggedInStrings.link}
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

  function renderButtons(
    _typename: string,
    id: number,
    _title: string,
    taxType?: string
  ) {
    const buttonClass = clsx(
      'text-base serlo-button serlo-make-interactive-light mr-3',
      !buttonsActive &&
        'bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100 hover:text-gray-400'
    )

    const buttonText = (isMove: boolean) => {
      return loggedInStrings[
        isMove ? 'moveButtonText' : 'copyButtonText'
      ].replace('%type%', getTranslatedType(strings, taxType))
    }

    const onButtonClick = async (isMove: boolean) => {
      const createSuccess = await createEntityLink({
        entityIds,
        taxonomyTermId: id,
      })

      const removeSuccess = isMove
        ? createSuccess
          ? await deleteEntityLink({
              entityIds,
              taxonomyTermId: taxonomyData.id,
            })
          : false
        : true

      if (createSuccess && removeSuccess) {
        showToastNotice(
          loggedInStrings[isMove ? 'moveSuccess' : 'copySuccess'],
          'success'
        )
      }
    }

    return (
      <div className="mt-4">
        {renderButton('move')}
        {renderButton('copy')}
      </div>
    )

    function renderButton(copyOrMove: 'copy' | 'move') {
      const isMove = copyOrMove === 'move'
      return (
        <button
          className={buttonClass}
          disabled={!buttonsActive}
          onClick={() => onButtonClick(isMove)}
        >
          <FaIcon icon={isMove ? faArrowRight : faCopy} /> {buttonText(isMove)}
        </button>
      )
    }
  }
}
