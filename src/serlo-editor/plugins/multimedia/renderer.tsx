import clsx from 'clsx'

export interface MultimediaRendererProps {
  mediaWidth: number // 25 | 50 | 75 | 100 Percent
  media: JSX.Element
  explanation: JSX.Element
  onClick?: () => void
  extraImageClass?: string
}

export function MultimediaRenderer({
  mediaWidth,
  media,
  explanation,
  onClick,
  extraImageClass,
}: MultimediaRendererProps) {
  const widthClass = getWidthClass()

  return (
    <div className="flex flex-col-reverse mobile:block">
      <div
        onClick={onClick}
        className={clsx(
          'relative z-10 mobile:float-right mobile:mt-1 mobile:-mb-1 mobile:ml-2',
          widthClass,
          extraImageClass
        )}
      >
        {media}
      </div>
      {/* 1px margin fixes mistery bug in firefox */}
      <div className="ml-[1px]">{explanation}</div>
      <div className="clear-both" />
    </div>
  )

  function getWidthClass() {
    const width = Math.round(mediaWidth / 25) * 25
    return width === 25
      ? 'mobile:w-1/4'
      : width === 50
      ? 'mobile:w-2/4'
      : width === 75
      ? 'mobile:w-3/4'
      : width === 100
      ? 'mobile:w-full'
      : 'mobile:w-2/4'
  }
}
