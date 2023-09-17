import clsx from 'clsx'

import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorMultimediaPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function MultimediaStaticRenderer({ state }: EditorMultimediaPlugin) {
  const { explanation, multimedia, width: mediaWidth } = state
  const widthClass = getWidthClass()

  return (
    <div className="mx-side mb-8 mt-8 flex flex-col-reverse rounded-xl border-3 border-brand-50 pt-4 mobile:block">
      <div
        className={clsx(
          'media-wrapper relative z-10 mobile:float-right mobile:-mb-1 mobile:ml-2 mobile:mt-1',
          widthClass
        )}
      >
        <StaticRenderer state={multimedia} />
      </div>
      {/* 1px margin fixes mistery bug in firefox */}
      <div className="explanation-wrapper ml-[1px]">
        <StaticRenderer state={explanation} />
      </div>
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
