/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { faTrashAlt, Icon, styled } from '@edtr-io/ui'
import * as React from 'react'

import { HoveringOverlay, HoverPosition } from './hovering-overlay'

const InlinePreview = styled.span({
  padding: '0px 8px',
})
const ChangeButton = styled.div({
  padding: '5px 5px 5px 10px',
  display: 'inline-block',
  borderLeft: '2px solid rgba(51,51,51,0.95)',
  cursor: 'pointer',
  margin: '2px',
  '&:hover': {
    color: 'rgb(70, 155, 255)',
  },
})

export function InlineSettings({
  position = 'below',
  ...props
}: {
  children: React.ReactNode
  onDelete: React.MouseEventHandler
  position: HoverPosition
  anchor?: React.RefObject<HTMLElement>
}) {
  return (
    <HoveringOverlay position={position} anchor={props.anchor}>
      <InlinePreview>{props.children}</InlinePreview>
      <ChangeButton onClick={props.onDelete}>
        <Icon icon={faTrashAlt} />
      </ChangeButton>
    </HoveringOverlay>
  )
}
