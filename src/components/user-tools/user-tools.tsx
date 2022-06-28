import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faList } from '@fortawesome/free-solid-svg-icons/faList'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt'
import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import { TaxonomyTerm, Uuid } from '@serlo/authorization'
import clsx from 'clsx'
import { useEffect, useState, cloneElement } from 'react'

import { FaIcon } from '../fa-icon'
import { LazyTippy } from '../navigation/lazy-tippy'
import { AuthorToolsData } from './author-tools-hover-menu'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { ExerciseInlineType, UuidRevType, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { getEditUrl } from '@/helper/urls/get-edit-url'
import { getHistoryUrl } from '@/helper/urls/get-history-url'

interface UserToolsProps {
  id: number
  onShare?: () => void
  onInvite?: () => void
  hideEditProfile?: boolean
  data: AuthorToolsData
  unrevisedRevisions?: number
  aboveContent?: boolean
}

export interface UserToolsData {
  editHref: string
}

export function UserTools({
  id,
  onShare,
  onInvite,
  data,
  unrevisedRevisions,
  aboveContent,
  hideEditProfile,
}: UserToolsProps) {
  const { strings, lang } = useInstanceData()
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()
  const loggedInComponents = useLoggedInComponents()
  const canDo = useCanDo()
  const isRevision = data.type.includes('Revision')
  // note: we hide the ui on ssr and fade it in on the client
  const [firstPass, setFirstPass] = useState(true)

  useEffect(() => {
    if (firstPass && (!auth.current || (auth.current && loggedInComponents))) {
      setFirstPass(false)
    }
  }, [auth, loggedInComponents, firstPass])

  // note: this component is added twice, once without aboveContent and once with it
  // (responsive variants)

  return aboveContent ? renderInlineContainer() : renderSideContainer()

  function fadeIn() {
    return clsx('transition-opacity', firstPass ? 'opacity-0' : 'opacity-100')
  }

  function buttonClassName() {
    // no autocomplete here yet
    if (aboveContent) {
      return clsx('serlo-button-green', 'text-sm m-0.5 ml-1 leading-browser')
    } else {
      return clsx(
        'serlo-button-green-transparent',
        'py-1 m-1 text-base leading-browser'
      )
    }
  }

  function renderInlineContainer() {
    return (
      <nav
        className={clsx(
          'serlo-user-tools mr-4 -mt-4 mb-8',
          'flex lg:hidden justify-end',
          fadeIn()
        )}
      >
        {renderButtons()}
      </nav>
    )
  }

  function renderSideContainer() {
    return (
      <nav
        className={clsx(
          'serlo-user-tools absolute z-50 right-8 bottom-8 h-full',
          'lg:flex hidden items-end pointer-events-none',
          fadeIn()
        )}
      >
        <div
          className={clsx(
            'sticky bottom-8 flex-col flex items-start',
            'bg-white rounded-md pointer-events-auto'
          )}
        >
          {renderButtons()}
        </div>
      </nav>
    )
  }

  function renderButtons() {
    if (firstPass) {
      if (aboveContent) {
        return <button className={buttonClassName()}>X</button> // placeholder button, avoid layout shift
      }
      return null
    }

    if (data.type === UuidType.User) return renderProfileButtons()

    return (
      <>
        {isRevision && renderRevisionTools()}
        {renderEditOrInvite()}
        {renderShare()}
        {auth.current && renderExtraTools()}
      </>
    )
  }

  function renderEditOrInvite() {
    const showInvite = ![
      UuidType.Page,
      UuidType.Event,
      UuidType.TaxonomyTerm,
      UuidType.User,
    ].includes(data.type as UuidType)

    if (!auth.current && showInvite) return renderInvite()

    const editHref = getEditHref()
    if (!editHref) return null

    const hasUnrevised =
      unrevisedRevisions !== undefined && unrevisedRevisions > 0
    if (hasUnrevised) return renderUnrevised()

    return (
      <Link href={editHref} className={buttonClassName()}>
        {renderInner(strings.edit.button, faPencilAlt)}
      </Link>
    )
  }

  function renderInvite() {
    if (auth.current || onInvite === undefined) return null

    return (
      <button className={buttonClassName()} onClick={onInvite}>
        {renderInner(strings.edit.button, faPencilAlt)}
      </button>
    )
  }

  function getEditHref(): string | undefined {
    const revisionId = data.revisionId
    const { type, id } = data
    const url = getEditUrl(id, revisionId, type.startsWith('Taxonomy'))

    if (type === UuidType.Page || type === UuidRevType.Page) {
      return canDo(Uuid.create(UuidRevType.Page)) ? url : undefined
    }
    if (type == UuidType.TaxonomyTerm)
      return canDo(TaxonomyTerm.set) ? url : undefined
    return url
  }

  function renderUnrevised() {
    return (
      <Link href={getHistoryUrl(id)} className={buttonClassName()}>
        {renderInner(
          `${strings.edit.unrevised} (${unrevisedRevisions || ''})`,
          faClock
        )}
      </Link>
    )
  }

  function renderRevisionTools() {
    // cloneElement seems to be the accepted way to add additional props to an inherited component.
    return (
      <>
        {data.checkoutRejectButtons &&
          cloneElement(data.checkoutRejectButtons, {
            buttonStyle: buttonClassName(),
          })}
        <Link href={getHistoryUrl(data.id)} className={buttonClassName()}>
          {renderInner(strings.pageTitles.revisionHistory, faList)}
        </Link>
        {lang === Instance.De && (
          <Link
            href="/community/140473/hilfeseiten-für-reviewer"
            className={buttonClassName()}
          >
            {renderInner(strings.revisions.helpLink, faQuestionCircle)}
          </Link>
        )}
      </>
    )
  }

  function renderShare() {
    if (onShare === undefined) return null

    return (
      <button className={buttonClassName()} onClick={onShare}>
        {renderInner(strings.share.button, faShareAlt)}
      </button>
    )
  }

  function renderExtraTools() {
    if (!loggedInComponents || !loggedInData) return null // safeguard
    const supportedTypes: AuthorToolsData['type'][] = [
      UuidType.Page,
      UuidType.Article,
      UuidType.Video,
      UuidType.Applet,
      UuidType.Event,
      UuidType.CoursePage,
      UuidType.TaxonomyTerm,
      ExerciseInlineType.Exercise,
      ExerciseInlineType.ExerciseGroup,
      ExerciseInlineType.Solution,
    ]
    if (!supportedTypes.includes(data.type)) return null

    const AuthorToolsHoverMenu = loggedInComponents?.AuthorToolsHoverMenu

    return (
      <LazyTippy
        interactive
        content={<AuthorToolsHoverMenu data={data} />}
        placement={aboveContent ? 'bottom' : 'left-end'}
        delay={[0, 300]}
        trigger="click mouseenter focus"
        interactiveBorder={aboveContent ? 10 : 40}
      >
        <button className={buttonClassName()}>
          {renderInner(loggedInData.strings.tools, faTools)}
        </button>
      </LazyTippy>
    )
  }

  function renderProfileButtons() {
    if (!loggedInData || hideEditProfile) {
      return null
    }
    return (
      <Link href="/user/settings" className={buttonClassName()}>
        {renderInner(loggedInData.strings.authorMenu.editProfile, faPencilAlt)}
      </Link>
    )
  }

  function renderInner(text: string, icon: IconDefinition) {
    return (
      <>
        <FaIcon icon={icon} className="lg:mr-0.5" /> {text}
      </>
    )
  }
}
