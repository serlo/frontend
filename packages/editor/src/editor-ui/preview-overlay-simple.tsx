import { cn } from '@serlo/tailwind/helper/cn'

interface PreviewOverlaySimpleProps {
  previewActive: boolean
  fullOpacity: boolean
  children: React.ReactNode
}

export function PreviewOverlaySimple({
  previewActive,
  fullOpacity,
  children,
}: PreviewOverlaySimpleProps) {
  return (
    <div className="relative">
      <div
        className={cn(
          'absolute top-0 z-20 h-full w-full',
          previewActive ? 'hidden' : 'bg-white bg-opacity-80',
          fullOpacity ? 'bg-opacity-0' : ''
        )}
      />
      {children}
    </div>
  )
}
