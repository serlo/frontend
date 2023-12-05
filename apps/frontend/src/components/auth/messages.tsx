import { faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { UiText } from '@ory/client'

import { InfoPanel } from '../info-panel'
import { Message } from '@/components/auth/message'

export interface MessagesProps {
  messages: UiText[] | undefined
}

export function Messages({ messages }: MessagesProps) {
  return (
    <div className="mx-side">
      {messages
        ? messages.map((uiText) => {
            const { id, type } = uiText

            const panelType = type === 'info' ? 'info' : 'warning'

            return (
              <InfoPanel
                key={id}
                type={panelType}
                icon={type === 'info' ? faInfoCircle : faWarning}
              >
                {' '}
                <Message uiText={uiText} />
              </InfoPanel>
            )
          })
        : null}
    </div>
  )
}
