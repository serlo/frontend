import { cn } from '@/helper/cn'

/**
 * Simple tooltop. Uses code from EditorTooltip
 * needs to be wrapped in an element with class "serlo-tooltip-trigger"
 * ⚠️ Warning: Currently only works if editor css is loaded
 */
export function SimpleTooltip({
  text,
  subtext,
  className,
}: {
  text?: string
  subtext?: string
  className?: string
}) {
  if (!text && !subtext) return null

  return (
    <span
      className={cn(
        'serlo-tooltip sr-only pointer-events-none bottom-full block cursor-default opacity-0 transition-opacity',
        className
      )}
    >
      <span className="block w-80 max-w-fit rounded bg-almost-black px-2 py-1.5 text-center text-sm font-bold text-white">
        {text}
        {subtext ? (
          <span className="block text-gray-300">{subtext}</span>
        ) : null}
      </span>
    </span>
  )
}
