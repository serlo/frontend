import { LicenseIcons } from '../content/license/license-icons'
import { HSpace } from '@/components/content/h-space'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseDetailData } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export function LicenseDetail({
  title,
  content,
  id,
  isDefault,
}: LicenseDetailData) {
  const { strings } = useInstanceData()
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
      {renderArticle(content, `license${id}`)}
    </>
  )
}
