import { cn } from '@/helper/cn'

export function SelectionCard({
  onClick,
  title,
  icon,
  dataQa,
}: {
  onClick: () => void
  title: string
  icon: JSX.Element
  dataQa?: string
}) {
  return (
    <button
      className={cn(
        'w-min rounded-md bg-editor-primary-100 px-5 py-3',
        'transition-colors hover:bg-editor-primary-200 active:bg-editor-primary-200'
      )}
      onClick={onClick}
      data-qa={dataQa}
    >
      <span
        className={cn(
          'mx-auto mb-3 block w-fit items-center rounded-md border-2 border-gray-600',
          '[&>svg]:rounded-md'
        )}
      >
        {icon}
      </span>
      {title}
    </button>
  )
}
