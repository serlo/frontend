import { cn } from '@editor/utils/cn'

export interface MultimediaRendererProps {
  mediaWidth: number // 25 | 50 Percent
  media: JSX.Element
  explanation: JSX.Element
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  extraImageClass?: string
}

export function MultimediaRenderer({
  mediaWidth,
  media,
  explanation,
  onClick,
  extraImageClass,
}: MultimediaRendererProps) {
  const widthClasses = getWidthClasses()

  return (
    <div className="flex rounded-xl">
      <div
        className={cn(
          'explanation-wrapper',
          '[&_div.my-block:last-child]:mb-0 [&_div.my-block]:mt-0',
          widthClasses.explanation
        )}
      >
        {explanation}
      </div>
      <div
        onClick={onClick}
        className={cn(
          'media-wrapper relative',
          widthClasses.media,
          extraImageClass
        )}
      >
        {media}
      </div>
      <div className="clear-both" />
    </div>
  )

  function getWidthClasses() {
    const width = Math.round(mediaWidth / 25) * 25
    return {
      explanation: width === 25 ? 'mobile:basis-3/4' : 'mobile:basis-2/4',
      media: width === 25 ? 'mobile:basis-1/4' : 'mobile:basis-2/4',
    }
  }
}
