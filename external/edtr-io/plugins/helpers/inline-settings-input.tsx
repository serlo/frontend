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
import { styled } from '@edtr-io/ui'
import * as React from 'react'

const InlineInputInner = styled.input({
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '2px solid #ffffff',
  color: '#ffffff',
  '&:focus': {
    outline: 'none',
    borderBottom: '2px solid rgb(70, 155, 255)',
  },
})

const InlineInputRefForward: React.RefForwardingComponent<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  return <InlineInputInner {...props} ref={ref} />
}
export const InlineSettingsInput = React.forwardRef(InlineInputRefForward)

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string
  textfieldWidth?: string
  editorInputWidth?: string
}
