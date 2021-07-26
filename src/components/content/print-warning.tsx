import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { isPrintMode } from '@/helper/print-mode'

export function PrintWarning({ warning }: { warning: string }) {
  const [scrolledToBottom, setScrolled] = useState(false)

  useEffect(() => {
    if (!scrolledToBottom) {
      window.addEventListener('scroll', () => {
        try {
          const heightOfWindow = window.innerHeight
          const contentScrolled = window.pageYOffset
          const bodyHeight = document.body.offsetHeight

          const height = bodyHeight - heightOfWindow
          const p = contentScrolled / height

          if (p > 0.9 && !scrolledToBottom) setScrolled(true)
        } catch (e) {
          //
        }
      })
    }
  }, [scrolledToBottom])

  if (isPrintMode) return null
  if (scrolledToBottom) return null

  return <PrintWarningDiv>{warning}</PrintWarningDiv>
}

const PrintWarningDiv = styled.div`
  display: none;

  @media print {
    display: block;
    border: 1.5px solid black;
    font-size: 1.125rem;
    padding: 10px;
    margin-top: 10px;
  }
`
