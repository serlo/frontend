import { FrontendClientBase } from '@/components/frontend-client-base'
import { EditorPresentation } from '@/components/pages/editor/editor-presentation'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase noContainers noHeaderFooter>
      <EditorPresentation />
    </FrontendClientBase>
  )
})
