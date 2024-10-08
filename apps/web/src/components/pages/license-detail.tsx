import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'

import { LicenseIcons } from '../content/license/license-icons'
import { HSpace } from '@/components/content/h-space'
import { useInstanceData } from '@/contexts/instance-context'
import { getLicense } from '@/data/licenses/licenses-helpers'
import { LicenseDetailData } from '@/data-types'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function LicenseDetail({ id, content }: LicenseDetailData) {
  const { strings, licenses } = useInstanceData()
  const { title, isDefault } = getLicense(licenses, id)
  editorRenderers.init(createRenderers())

  return (
    <>
      <HSpace amount={70} />
      <p className="serlo-p -mb-4 text-center text-lg font-bold text-brand-500">
        {strings.license.readMore}
      </p>
      <h1 className="serlo-h2 text-center">{title}</h1>
      <figure className="mx-side mb-10 text-center">
        <LicenseIcons title={title} isDefault={isDefault} />
      </figure>
      <EditorRenderer document={content} />
    </>
  )
}
