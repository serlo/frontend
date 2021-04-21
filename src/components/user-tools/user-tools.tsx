import {
  faClock,
  faPencilAlt,
  faShareAlt,
  faTools,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import { LazyTippy } from '../navigation/lazy-tippy'
import { AuthorToolsData } from './author-tools-hover-menu'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInComponents } from '@/contexts/logged-in-components'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface UserToolsProps {
  id: number
  onShare?: () => void
  hideEdit: boolean
  data: AuthorToolsData
  unrevisedRevision?: number
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
  unrevisedRevision,
  aboveContent,
}: UserToolsProps) {
  const { strings } = useInstanceData()
  const auth = useAuthentication()
  const loggedInData = useLoggedInData()
  const lic = useLoggedInComponents()

  // note: we hide the ui on ssr and fade it in on the client
  const [firstPass, setFirstPass] = useState(true)

  useEffect(() => {
    if (firstPass && (!auth.current || (auth.current && lic))) {
      setFirstPass(false)
    }
  }, [auth, lic, firstPass])

  // note: this component is added twice, once without aboveContent and once with it
  // (responsive variants)

  // HELP!! This component got somewhat super complicated ^^
  // (maybe I have some better ideas another day ...)

  return aboveContent ? renderInlineContainer() : renderSideContainer()

  function renderInlineContainer() {
    return (
      <nav
        className={clsx(
          'lg:hidden block mr-4 -mt-4 mb-8',
          'flex justify-end transition-opacity',
          firstPass ? 'opacity-0' : 'opacity-100'
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
          'absolute right-8 bottom-8 h-full items-end',
          'lg:flex hidden transition-opacity',
          firstPass ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="sticky bottom-8 flex-col flex items-start">
          {renderButtons()}
        </div>
      </nav>
    )
  }

  function renderButtons() {
    if (firstPass) {
      if (aboveContent) {
        return renderButton({ size: 'small', text: '', icon: faShareAlt }) // placeholder button
      }
      return null
    }

    return data.type === 'Profile' ? (
      renderProfileButtons()
    ) : (
      <>
        {(!hideEdit || auth.current) && renderEdit()}
        {renderShare()}
        {auth.current && renderExtraTools()}
      </>
    )
  }

  function renderEdit() {
    // TODO!!! Check permissions. createEntityRevision / editTaxonomy ?
    // show history should only available to people who are able to create revision ? (= guest)

    const showHistory = unrevisedRevision !== undefined && unrevisedRevision > 0

    if (showHistory) {
      return renderUnrevised()
    }

    const editHref =
      data.type == 'Page'
        ? `/page/revision/create/${data.id}/${data.revisionId || ''}`
        : data.type == 'Taxonomy'
        ? `/taxonomy/term/update/${id}`
        : `/entity/repository/add-revision/${id}`

    return renderButton({
      icon: faPencilAlt,
      hideOnSmall: true,
      href: editHref,
      text: ` ${strings.edit.button}`,
      size: aboveContent ? 'small' : 'large',
    })
  }

  function renderUnrevised() {
    return renderButton({
      icon: faClock,
      text: ` ${strings.edit.unrevised} (${unrevisedRevision || ''})`,
      href: `/entity/repository/history/${id}`,
      size: aboveContent ? 'small' : 'large',
    })
  }

  function renderShare() {
    return renderButton({
      icon: faShareAlt,
      text: ` ${strings.share.button}!`,
      asButton: true,
      onClick: onShare,
      size: aboveContent ? 'small' : 'large',
    })
  }

  function renderExtraTools() {
    if (!lic || !loggedInData) return null // safeguard
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

    const Comp = lic.AuthorToolsHoverMenu

    return (
      <LazyTippy
        interactive
        content={<Comp data={data} />}
        placement={aboveContent ? 'bottom' : 'left-end'}
        delay={[0, 300]}
        interactiveBorder={aboveContent ? 10 : 40}
      >
        <div>
          {renderButton({
            icon: faTools,
            asButton: true,
            hideOnSmall: true,
            text: ` ${loggedInData.strings.tools}`,
            size: aboveContent ? 'small' : 'large',
          })}
        </div>
      </LazyTippy>
    )
  }

  function renderProfileButtons() {
    return renderButton({
      icon: faPencilAlt,
      href: '/user/settings',
      text: ` ${loggedInData?.strings.authorMenu.editProfile}`,
      size: aboveContent ? 'small' : 'large',
    })
  }
}

interface RenderButtonProps {
  icon: IconDefinition
  text: string
  href?: string
  asButton?: boolean
  hideOnSmall?: boolean
  onClick?: () => void
  size: 'small' | 'large'
}

function renderButton({
  icon,
  text,
  href,
  asButton,
  hideOnSmall,
  onClick,
  size,
}: RenderButtonProps) {
  const Comp = asButton
    ? (props: any) => <button {...props}></button>
    : (props: any) => <a {...props}></a>

  if (size == 'small') {
    return (
      <Comp
        onClick={onClick}
        href={href}
        className={clsx(
          'serlo-button serlo-make-interactive-green',
          'text-sm m-0.5 ml-1 leading-browser',
          { 'hidden sm:block': hideOnSmall }
        )}
      >
        {renderInner()}
      </Comp>
    )
  } else {
    return (
      <Comp
        onClick={onClick}
        href={href}
        className={clsx(
          'serlo-button serlo-make-interactive-transparent-green',
          'py-1 m-1 serlo-input-font-reset leading-browser'
        )}
      >
        {renderInner()}
      </Comp>
    )
  }

  function renderInner() {
    return (
      <>
        <FontAwesomeIcon icon={icon} className="lg: mr-0.5" />
        {text}
      </>
    )
  }
}
