import { faPlus, Icon } from '@edtr-io/ui'

import { useLoggedInData } from '@/contexts/logged-in-data-context'

interface SerloAddButtonProps {
  onClick: () => void
  className?: string
}

export function SerloAddButton({ onClick, className }: SerloAddButtonProps) {
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const articleStrings = loggedInData.strings.editor.article
  return (
    <button
      className={`serlo-button bg-amber-100 hover:bg-amber-300 text-base leading-browser ${
        className ?? ''
      }`}
      onClick={onClick}
    >
      <Icon icon={faPlus} /> {articleStrings.addLabel}
    </button>
  )
}
