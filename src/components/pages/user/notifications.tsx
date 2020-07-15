import { NextPage } from 'next'
import React from 'react'

import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { RelativeContainer } from '@/components/navigation/relative-container'
import { NotificationsList } from '@/components/notifications/notifications-list'
import { StyledH2 } from '@/components/tags/styled-h2'
import { shouldUseNewAuth } from '@/helper/feature-auth'

export const Notifications: NextPage = () => {
  const [mounted, setMounted] = React.useState(!shouldUseNewAuth())

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? (
    <RelativeContainer>
      <MaxWidthDiv showNav>
        <main>
          <StyledH2>Was so passiert ist</StyledH2>
          <NotificationsList />
        </main>
      </MaxWidthDiv>
    </RelativeContainer>
  ) : null
}
