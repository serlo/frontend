import {
  faClock,
  faList,
  faPencilAlt,
  faQuestionCircle,
  faShareAlt,
  faTools,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaxonomyTerm, Uuid } from '@serlo/authorization'
import clsx from 'clsx'
import { useEffect, useState, cloneElement } from 'react'

import { LazyTippy } from '../navigation/lazy-tippy'
import { AuthorToolsData } from './author-tools-hover-menu'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { Link } from '@/components/content/link'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface UserToolsProps {
  id: number
  onShare?: () => void
  hideEdit?: boolean
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
  hideEdit,
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
      return clsx(
        'serlo-button serlo-make-interactive-green',
        'text-sm m-0.5 ml-1 leading-browser'
      )
    } else {
      return clsx(
        'serlo-button serlo-make-interactive-transparent-green',
        'py-1 m-1 text-base leading-browser'
      )
    }
  }

  function renderInlineContainer() {
    return (
      <nav
        className={clsx(
          'mr-4 -mt-4 mb-8',
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
          'absolute z-50 right-8 bottom-8 h-full',
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

    if (data.type === 'Profile') return renderProfileButtons()

    return (
      <>
        {data.type === 'Revision' && renderRevisionTools()}
        {(!hideEdit || auth.current) && renderEdit()}
        {renderShare()}
        {auth.current && renderExtraTools()}
      </>
    )
  }

  function renderEdit() {
    const hasUnrevised =
      unrevisedRevisions !== undefined && unrevisedRevisions > 0
    if (hasUnrevised) return renderUnrevised()

    const editHref = getEditHref()
    if (!editHref) return null

    return (
      <Link href={editHref} className={buttonClassName()}>
        {renderInner(strings.edit.button, faPencilAlt)}
      </Link>
    )
  }

  function getEditHref(): string | undefined {
    if (data.type == 'Page') {
      if (canDo(Uuid.create('PageRevision'))) {
        return `/page/revision/create/${data.id}/${data.revisionId || ''}`
      }
    } else if (data.type == 'Taxonomy') {
      if (canDo(TaxonomyTerm.set)) {
        return `/taxonomy/term/update/${id}`
      }
    } else {
      if (canDo(Uuid.create('EntityRevision'))) {
        return data.type == 'Revision'
          ? `/entity/repository/add-revision/${data.id}/${id}`
          : `/entity/repository/add-revision/${id}`
      }
    }
    return
  }

  function renderUnrevised() {
    return (
      <Link
        href={`/entity/repository/history/${id}`}
        className={buttonClassName()}
      >
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
        <Link
          href={`/entity/repository/history/${data.id}`}
          className={buttonClassName()}
        >
          {renderInner(strings.pageTitles.revisionHistory, faList)}
        </Link>
        {lang === 'de' && (
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
    const supportedTypes = [
      'Page',
      'Article',
      'Video',
      'Applet',
      'Event',
      'CoursePage',
      'Taxonomy',
      '_ExerciseInline',
      '_ExerciseGroupInline',
      '_SolutionInline',
    ]
    if (supportedTypes.indexOf(data.type) === -1) return null

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
        <FontAwesomeIcon icon={icon} className="lg:mr-0.5" /> {text}
      </>
    )
  }
}
