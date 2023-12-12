import {
  faArrowRight,
  faCopy,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { TaxonomyTerm } from '@serlo/authorization'
import { cn } from '@serlo/tailwind/helper/cn'
import { useEffect, useState } from 'react'

import { getPreviewStringFromExercise } from './get-preview-string-from-exercise'
import { UuidUrlInput } from '../../author/uuid-url-input'
import { PageTitle } from '../../content/page-title'
import { FaIcon } from '../../fa-icon'
import { InfoPanel } from '../../info-panel'
import { Breadcrumbs } from '../../navigation/breadcrumbs'
import { PleaseLogIn } from '../../user/please-log-in'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  TaxonomyData,
  TaxonomyLink,
  UuidType,
  UuidWithRevType,
} from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
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
  const canDo = useCanDo()

  const canMove = canDo(TaxonomyTerm.change) && canDo(TaxonomyTerm.removeChild)

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()

  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.copyMove

  const exercisesData = taxonomyData.exercisesContent.map((exercise) => ({
    id: exercise.serloContext?.uuid ?? 0,
    title: getPreviewStringFromExercise(exercise, strings),
    url: `/${exercise.serloContext?.uuid}`,
  }))

  const categories = [
    { links: taxonomyData.articles, type: UuidType.Article },
    { links: taxonomyData.videos, type: UuidType.Video },
    { links: taxonomyData.applets, type: UuidType.Applet },
    { links: taxonomyData.courses, type: UuidType.Course },
    { links: taxonomyData.events, type: UuidType.Event },
    { links: taxonomyData.events, type: UuidType.Event },
    { links: exercisesData, type: UuidType.Exercise },
  ]

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

        {categories.map(({ links, type }) => {
          return (
            <ul className="mt-4 list-none" key={type}>
              {links.map((node) => renderLi(node, type))}
            </ul>
          )
        })}

        <h2 className="mb-3 mt-6 font-bold">{loggedInStrings.target}</h2>

        <UuidUrlInput
          supportedEntityTypes={[UuidType.TaxonomyTerm]}
          supportedTaxonomyTypes={[
            TaxonomyTermType.Topic,
            TaxonomyTermType.ExerciseFolder,
          ]}
          unsupportedIds={[taxonomyData.id]}
          renderButtons={renderButtons}
        />
      </div>
      {renderFolderNotice()}
    </>
  )

  function renderLi(node: TaxonomyLink, typename: UuidType) {
    if (removedEntityIds.includes(node.id)) return null
    const isChecked = entityIds.includes(node.id)
    return (
      <li>
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
      </li>
    )
  }

  function renderButtons(
    _typename: UuidWithRevType,
    id: number,
    _title: string,
    taxType?: TaxonomyTermType
  ) {
    const buttonClass = cn(
      'serlo-button-light mr-3 text-base',
      !buttonsActive &&
        'cursor-not-allowed bg-gray-100 text-gray-400 hover:bg-gray-100 hover:text-gray-400'
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
        {renderButton('copy')}
        {canMove ? renderButton('move') : null}
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
    // only show if there are exercise folders
    if (!taxonomyData.exercises.length) return null
    return (
      <InfoPanel type="info" icon={faInfoCircle}>
        {replacePlaceholders(loggedInStrings.exerciseFolderNotice, {
          break: <br />,
          exerciseFolder: strings.entities.exerciseFolder,
        })}
      </InfoPanel>
    )
  }
}
