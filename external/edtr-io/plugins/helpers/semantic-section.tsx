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
import { Icon, styled } from '@edtr-io/ui'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import * as React from 'react'

const Container = styled.div({
  boxShadow: '0 1px 3px 0 rgba(0,0,0,0.2)',
  marginTop: '10px',
  padding: '10px',
  minHeight: '70px',
  position: 'relative',
})

const BackgroundIcon = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
  color: 'rgba(0,0,0,0.1)',
  transform: 'translate(-15px, 10px)',
  zIndex: 0,
})

export function SemanticSection(props: SemanticSectionProps) {
  const { children, editable } = props
  if (!editable) return <>{children}</>

  return <Container>{props.children}</Container>
}

export interface SemanticSectionProps {
  children: React.ReactNode
  editable?: boolean
}
