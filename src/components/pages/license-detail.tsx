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
      <p className="serlo-p text-lg font-bold text-brand-light -mb-4 text-center">
        {strings.license.readMore}
      </p>
      <h1 className="serlo-h2 text-center">{title}</h1>
      <figure className="mx-side text-center mb-10">
        <LicenseIcons title={title} isDefault={isDefault} />
      </figure>
      <HSpace amount={20} />
      {renderArticle(content, `license${id}`)}
    </>
  )
}
