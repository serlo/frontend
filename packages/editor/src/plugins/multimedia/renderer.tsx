import { cn } from '@editor/utils/cn'

export interface MultimediaRendererProps {
  media: JSX.Element
  explanation: JSX.Element
  mediaWidth: number // 25 | 50 Percent
  extraMediaClasses?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function MultimediaRenderer({
  media,
  explanation,
  mediaWidth,
  extraMediaClasses,
  onClick,
}: MultimediaRendererProps) {
  const widthClasses = getWidthClasses()

  return (
    <div className={cn('flex rounded-xl', widthClasses.wrapper)}>
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
          extraMediaClasses
        )}
      >
        {media}
      </div>
    </div>
  )

  function getWidthClasses() {
    const width = Math.round(mediaWidth / 25) * 25
    return {
      wrapper:
        width === 25
          ? 'multimedia-renderer-wrapper-quarter'
          : 'multimedia-renderer-wrapper-half',
      explanation: width === 25 ? 'mobile:basis-3/4' : 'mobile:basis-2/4',
      media: width === 25 ? 'mobile:basis-1/4' : 'mobile:basis-2/4',
    }
  }
}
