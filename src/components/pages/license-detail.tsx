import { HSpace } from '@/components/content/h-space'
import { useInstanceData } from '@/contexts/instance-context'
import { LicenseDetailData } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export function LicenseDetail({
  title,
  content,
  iconHref,
  id,
}: LicenseDetailData) {
  const { strings } = useInstanceData()
  return (
    <>
      <HSpace amount={70} />
      <p className="serlo-p text-lg font-bold text-brand-light -mb-4">
        {strings.license.readMore}
      </p>
      <h2 className="serlo-h2">{title}</h2>
      <HSpace amount={20} />
      {renderArticle(content, `license${id}`)}
      {iconHref && (
        <p className="serlo-p">
          <img src={iconHref} alt="License Badge" />
        </p>
      )}
    </>
  )
}
