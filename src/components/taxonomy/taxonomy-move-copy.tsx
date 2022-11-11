import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { UuidUrlInput } from '../author/uuid-url-input'
import { PageTitle } from '../content/page-title'
import { FaIcon } from '../fa-icon'
import { Breadcrumbs } from '../navigation/breadcrumbs'
import { StaticInfoPanel } from '../static-info-panel'
import { PleaseLogIn } from '../user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  InstanceData,
  TaxonomyData,
  TaxonomyLink,
  UuidType,
  UuidWithRevType,
} from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import {
  FrontendExerciseGroupNode,
  FrontendExerciseNode,
  FrontendNodeType,
} from '@/frontend-node-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { showToastNotice } from '@/helper/show-toast-notice'
import {
  useCreateEntityLinkMutation,
  useDeleteEntityLinkMutation,
} from '@/mutations/taxonomyTerm'

interface TaxonomyMoveCopyProps {
  taxonomyData: TaxonomyData
}
export function TaxonomyMoveCopy({ taxonomyData }: TaxonomyMoveCopyProps) {
  const [buttonsActive, setButtonsActive] = useState(false)
  const [entityIds, setEntityIds] = useState<number[]>([])
  const [removedEntityIds, setRemovedEntityIds] = useState<number[]>([])

  useEffect(() => {
    const shouldBeActive = entityIds.length > 0

    if (shouldBeActive && !buttonsActive) setButtonsActive(true)
    if (!shouldBeActive && buttonsActive) setButtonsActive(false)
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
            url: taxonomyData.alias,
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
          {taxonomyData.articles.map((node) =>
            renderLi(node, UuidType.Article)
          )}
        </p>
        <p className="mt-4">
          {taxonomyData.exercisesContent.map((node) => {
            const title = getPreviewStringFromExercise(node, strings)

            return renderLi(
              {
                id: node.context.id,
                title,
                url: node.href ?? `/${node.context.id}`,
              },
              UuidType.Exercise
            )
          })}
        </p>
        <p className="mt-4">
          {taxonomyData.videos.map((node) => renderLi(node, UuidType.Video))}
        </p>
        <p className="mt-4">
          {taxonomyData.applets.map((node) => renderLi(node, UuidType.Applet))}
        </p>
        <p className="mt-4">
          {taxonomyData.courses.map((node) => renderLi(node, UuidType.Course))}
        </p>
        <p className="mt-4">
          {taxonomyData.events.map((node) => renderLi(node, UuidType.Event))}
        </p>
        {renderFolderNotice()}
      </>
    )
  }

  function renderLi(node: TaxonomyLink, typename: UuidType) {
    if (removedEntityIds.includes(node.id)) return null
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
          <FaIcon icon={getIconByTypename(typename)} /> {node.title}
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
        supportedEntityTypes={[UuidType.TaxonomyTerm]}
        supportedTaxonomyTypes={[
          TaxonomyTermType.Topic,
          TaxonomyTermType.ExerciseFolder,
        ]}
        unsupportedIds={[taxonomyData.id]}
        renderButtons={renderButtons}
      />
    )
  }

  function renderButtons(
    _typename: UuidWithRevType,
    id: number,
    _title: string,
    taxType?: TaxonomyTermType
  ) {
    const buttonClass = clsx(
      'text-base serlo-button-light mr-3',
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

      if (isMove && removeSuccess) {
        setRemovedEntityIds([...removedEntityIds, ...entityIds])
        setEntityIds([])
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

  function renderFolderNotice() {
    if (!taxonomyData.exercises.length) return null
    return (
      <StaticInfoPanel type="info" icon={faInfoCircle}>
        {replacePlaceholders(loggedInStrings.exerciseFolderNotice, {
          break: <br />,
          exerciseFolder: strings.entities.exerciseFolder,
        })}
      </StaticInfoPanel>
    )
  }
}

export function getPreviewStringFromExercise(
  node: FrontendExerciseNode | FrontendExerciseGroupNode,
  strings: InstanceData['strings']
) {
  const typeString = getTranslatedType(strings, node.type)

  const titleState =
    node.type === FrontendNodeType.Exercise
      ? node.task.edtrState?.content[0].children?.[0]
      : node.content[0].children?.[0]

  if (!titleState) return typeString

  const titleString =
    (titleState.type === FrontendNodeType.SlateP &&
      titleState.children?.[0].type === FrontendNodeType.Text &&
      titleState.children?.[0].text) ||
    (titleState.children?.[0].type === FrontendNodeType.InlineMath &&
      titleState.children?.[0].formula) ||
    (titleState.type === FrontendNodeType.SlateContainer &&
      titleState.children?.[0].children?.[0].type === FrontendNodeType.Text &&
      titleState.children?.[0].children?.[0].text)

  if (!titleString) return typeString

  const title = `${typeString}: "${
    titleString.length < 60 ? titleString : titleString.substring(0, 50) + '…'
  }"`
  return title
}
