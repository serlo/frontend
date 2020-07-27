import Tippy from '@tippyjs/react'
import styled from 'styled-components'

import { Link } from '@/components/content/link'

export interface AuthorToolsHoverMenuProps {
  id: number
}

export function AuthorToolsHoverMenu({ id }: AuthorToolsHoverMenuProps) {
  return (
    <HoverDiv>
      <Tippy
        interactive
        placement="left-end"
        content={
          <HoverDiv>
            <HoverEntry>
              <Link href={`/subscribe/${id}/0`}>
                Benachrichtigungen erhalten
              </Link>
            </HoverEntry>
            <HoverEntry>
              <Link href={`/subscribe/${id}/1`}>
                Benachrichtigungen und E-Mail erhalten
              </Link>
            </HoverEntry>
          </HoverDiv>
        }
      >
        <HoverEntry>
          <Link>Abonnieren</Link>
        </HoverEntry>
      </Tippy>
      <HoverEntry>
        <Link>Konvertieren</Link>
      </HoverEntry>
      <HoverEntry>
        <Link href={`/page/revision/revisions/${id}`}>Bearbeitungsverlauf</Link>
      </HoverEntry>
      <HoverEntry>
        <Link href={`/event/history/${id}`}>Aktivitätenlog</Link>
      </HoverEntry>
    </HoverDiv>
  )
}

const HoverDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const HoverEntry = styled.div`
  margin-bottom: 10px;
`
