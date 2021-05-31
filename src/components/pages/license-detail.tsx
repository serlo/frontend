import { HSpace } from '@/components/content/h-space'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
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
      <StyledH2>{title}</StyledH2>
      <HSpace amount={20} />
      {renderArticle(content, `license${id}`)}
      {iconHref && (
        <StyledP>
          <img src={iconHref} alt="License Badge" />
        </StyledP>
      )}
    </>
  )
}
