import { MultimediaRenderer } from './renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { EditorMultimediaPlugin } from '@/serlo-editor-integration/types/editor-plugins'

export function MultimediaStaticRenderer({
  state,
  setOpen,
}: EditorMultimediaPlugin & { setOpen?: (arg: boolean) => void }) {
  const { explanation, multimedia, width: mediaWidth } = state

  // TODO: hide empty plugins
  const isEmpty = false
  // const isEmpty =
  //   !mediaChild &&
  //   children.length === 1 &&
  //   children[0] &&
  //   children[0].children?.length === 1 &&
  //   children[0].children?.[0].children?.length === 0

  if (isEmpty) return null

  return (
    <MultimediaRenderer
      media={<StaticRenderer state={multimedia} />}
      explanation={<StaticRenderer state={explanation} />}
      mediaWidth={mediaWidth ?? 50}
      onClick={({ target }: React.MouseEvent<HTMLDivElement>) => {
        if (!setOpen || (target as HTMLElement).tagName !== 'IMG') return
        setOpen(true)
      }}
      extraImageClass={setOpen ? 'mobile:[&_img]:cursor-zoom-in' : ''}
    />
  )
}
