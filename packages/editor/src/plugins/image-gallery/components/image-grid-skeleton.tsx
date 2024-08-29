import { cn } from '@/helper/cn'

const baseClasses =
  'flex items-center justify-center h-40 animate-pulse bg-gray-300'

export function ImageGridSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(className, 'flex flex-wrap gap-4')}>
      <div className={`${baseClasses} w-[calc(34%-0.5rem)]`}>
        {renderImageIcon()}
      </div>
      <div className={`${baseClasses} w-[calc(66%-0.5rem)]`}>
        {renderImageIcon()}
      </div>
      <div className={`${baseClasses} w-[calc(60%-0.5rem)]`}>
        {renderImageIcon()}
      </div>
      <div className={`${baseClasses} w-[calc(40%-0.5rem)]`}>
        {renderImageIcon()}
      </div>
    </div>
  )

  function renderImageIcon() {
    return (
      <svg
        className="h-10 w-10 text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
      </svg>
    )
  }
}
