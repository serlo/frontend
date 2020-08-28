import React from 'react'
// import styled from 'styled-components'

import { HSpace } from '@/components/content/h-space'
import { StyledH2 } from '@/components/tags/styled-h2'
import { StyledP } from '@/components/tags/styled-p'
import { LicenseDetailData } from '@/data-types'
import { renderArticle } from '@/schema/article-renderer'

export function LicenseDetail({ title, content, iconHref }: LicenseDetailData) {
  return (
    <>
      <HSpace amount={70} />
      {/* <_StyledP>Was bedeutet das?</_StyledP> TODO: use i18n, not done now to avoid merge problems with other branches*/}
      <StyledH2>{title}</StyledH2>
      <HSpace amount={20} />
      {renderArticle(content)}

      {iconHref && (
        <StyledP>
          <img src={iconHref} alt="License Badge" />
        </StyledP>
      )}
    </>
  )
}

// const _StyledP = styled(StyledP)`
//   font-size: 1.25rem;
//   font-weight: bold;
//   color: ${(props) => props.theme.colors.lightblue};
//   margin-bottom: -15px;
// `
