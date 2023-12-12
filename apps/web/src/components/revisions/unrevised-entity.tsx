import { faEye } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'
import { Fragment, PropsWithChildren } from 'react'

import { FaIcon } from '../fa-icon'
import { Link } from '@/components/content/link'
import { TimeAgo } from '@/components/time-ago'
import { UserLink } from '@/components/user/user-link'
import { useInstanceData } from '@/contexts/instance-context'
import type { UnrevisedRevisionsData } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'

export type UnrevisedRevisionEntity =
  UnrevisedRevisionsData['subjects'][number]['unrevisedEntities']['nodes'][number]

export interface UnrevisedEntityProps {
  entity: UnrevisedRevisionEntity
  isOwn?: boolean
}

function getNodes(entity: UnrevisedRevisionEntity) {
  if (Object.hasOwn(entity, 'revisions')) {
    return entity.revisions?.nodes
  }
  return []
}

function getTitle(entity: UnrevisedRevisionEntity) {
  if (Object.hasOwn(entity, 'currentRevision') && entity.currentRevision) {
    if (Object.hasOwn(entity.currentRevision, 'title')) {
      return entity.currentRevision.title
    }
  }

  if (Object.hasOwn(entity, 'revisions')) {
    const node = entity.revisions.nodes[0]
    if (node && Object.hasOwn(node, 'title')) {
      return node.title
    }
  }

  return entity.id.toString()
}

export function UnrevisedEntity({ entity, isOwn }: UnrevisedEntityProps) {
  const { strings } = useInstanceData()

  const nodes = getNodes(entity)
  const title = getTitle(entity)
  const isProbablyNew = entity.currentRevision === null

  return (
    <div className="mx-side mb-10">
      <Link
        title={strings.revisionHistory.viewLabel}
        href={entity.alias}
        className="font-bold"
      >
        <b>{title}</b>
      </Link>{' '}
      <span>| {getTranslatedType(strings, entity.__typename)}</span>
      {renderTable()}
    </div>
  )

  function renderTable() {
    return (
      <table className="relative mt-1 w-full border-collapse">
        <tbody>
          {nodes.map((revision) => (
            <Fragment key={revision.id}>{renderRevision(revision)}</Fragment>
          ))}
        </tbody>
      </table>
    )
  }

  function renderRevision(revision: ReturnType<typeof getNodes>[number]) {
    if (!revision) return null
    const viewUrl = `/entity/repository/compare/${entity.id}/${revision.id}`
    const isProbablyWIP = checkWIP(revision.changes)
    const isProbablyImported = checkImported(revision.changes)

    return (
      <tr className={isProbablyWIP ? 'opacity-50' : undefined}>
        <Td className="w-1/2 pl-0 pt-2.5">
          <Link href={viewUrl} className="text-black hover:no-underline">
            {revision.changes || '–'}
          </Link>
          {renderLabels(isProbablyWIP, isProbablyImported)}
        </Td>
        {isOwn ? null : (
          <Td>
            <UserLink user={revision.author} />
            {revision.author.isNewAuthor && renderAuthorLabel()}
          </Td>
        )}
        <Td className="w-1/6 pt-2.5">
          <TimeAgo datetime={new Date(revision.date)} dateAsTitle />
        </Td>
        <Td centered className="w-1/6 text-right">
          <Link
            className="group serlo-button-light my-0 ml-auto text-base transition-none hover:bg-brand-100 hover:text-brand"
            href={viewUrl}
          >
            <span className="hidden group-hover:inline">
              {strings.revisionHistory.view}
            </span>{' '}
            <FaIcon icon={faEye} />
          </Link>
        </Td>
      </tr>
    )
  }

  function renderLabels(isProbablyWIP: boolean, isProbablyImported: boolean) {
    const {
      newLabelNote,
      newLabelText,
      wipLabelNote,
      wipLabelText,
      importedContentNote,
      importedContentText,
    } = strings.unrevisedRevisions
    return (
      <>
        {' '}
        {isProbablyNew && renderLabel(newLabelText, newLabelNote)}{' '}
        {isProbablyWIP && renderLabel(wipLabelText, wipLabelNote)}
        {isProbablyImported &&
          renderLabel(importedContentText, importedContentNote)}
      </>
    )
  }

  function renderAuthorLabel() {
    const { newAuthorText, newAuthorNote } = strings.unrevisedRevisions
    return renderLabel(newAuthorText, newAuthorNote)
  }

  function renderLabel(text: string, note?: string) {
    return (
      <span
        className="serlo-button-light cursor-default text-base"
        title={note}
      >
        {text}
      </span>
    )
  }

  // test: placeholder until we get this info from the api
  function checkWIP(changes: string) {
    const wipStrings = [
      'wip',
      'in arbeit',
      'work in progress',
      'noch nicht freigeben',
      'zwischenspeicherung',
      'noch nicht fertig',
      'im aufbau',
    ]
    return wipStrings.some((testStr) => changes.toLowerCase().includes(testStr))
  }

  function checkImported(changes: string) {
    return changes.includes(
      strings.unrevisedRevisions.importedContentIdentifier
    )
  }
}

const Td = ({
  children,
  centered,
  className,
}: PropsWithChildren<{ centered?: boolean; className?: string }>) => (
  <td
    className={cn(
      className,
      'serlo-td',
      centered && 'text-center',
      'border-l-transparent border-r-transparent'
    )}
  >
    {children}
  </td>
)
