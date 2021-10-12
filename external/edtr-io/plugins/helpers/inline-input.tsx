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
import * as React from 'react'
import Plain from 'slate-plain-serializer'
import { Editor } from 'slate-react'

export function InlineInput(props: {
  onChange: (value: string) => void
  onFocus?: () => void
  value: string
  placeholder: string
}) {
  const { onChange, value, placeholder } = props
  const [state, setState] = React.useState(Plain.deserialize(value))
  React.useEffect(() => {
    if (Plain.serialize(state) !== value) {
      setState(Plain.deserialize(value))
    }
  }, [value, state])

  return (
    <Editor
      placeholder={placeholder}
      value={state}
      onFocus={(event: any, editor: any, next: () => void) => {
        setTimeout(() => {
          if (typeof props.onFocus === 'function') {
            props.onFocus()
          }
        })
        next()
      }}
      onChange={({ value }: any) => {
        setState(value)
        onChange(Plain.serialize(value))
      }}
    />
  )
}
