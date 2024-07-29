import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { EditorPresentation } from '@/components/pages/editor/editor-presentation'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      loadLoggedInData
      serloEntityData={{ entityId: 1555 }}
    >
      <div className="relative">
        <EditorPresentation />
      </div>
    </FrontendClientBase>
  )
})
