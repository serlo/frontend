import { initI18n } from '@serlo/i18n'
import { useEffect, useState } from 'react'

import { Editor as SerloEditor } from '../../../external/edtr-io/editor'

export function Editor({ state }: any) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    void initI18n({
      language: 'de',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      resources: require('i18next-resource-store-loader!@serlo/i18n/resources'),
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return <p>loading</p>

  return (
    <SerloEditor
      getCsrfToken={() => 'stub'}
      mayCheckout
      onSave={() => {
        alert('not implemented')
        return new Promise((res) => {
          res(undefined)
        })
      }}
      type="article"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      initialState={state}
    />
  )
}
