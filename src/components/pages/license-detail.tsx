import { LicenseIcons } from '../content/license/license-icons'
import { HSpace } from '@/components/content/h-space'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseDetailData } from '@/data-types'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export function LicenseDetail({
  title,
  content,
  isDefault,
}: LicenseDetailData) {
  const { strings } = useInstanceData()
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
      <HSpace amount={20} />
      <StaticRenderer document={content} />
    </>
  )
}
