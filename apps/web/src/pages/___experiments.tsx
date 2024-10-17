import {
  PreferenceName,
  getWithoutContext,
  setWithoutContext,
} from '@editor/core/contexts'
import { useState } from 'react'

import { cn } from '@/helper/cn'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export interface LegalData {
  contentHtml: string
  isGerman: boolean
}

export default renderedPageNoHooks(() => {
  return <Content />
})

export function Content() {
  const [iterator, setIterator] = useState(0)
  return (
    <main className="mx-auto max-w-2xl py-16">
      <h1 className="serlo-h1" id="experiments">
        🧪 Experimente
      </h1>

      <div>
        <h3 className="serlo-h3 mb-3">
          {renderFeatureButton('intermediateTasksExperiment')} Zwischentexte für
          Aufgaben mit Teilaufgaben 🛠
        </h3>
        <p className="serlo-p">
          Experimentelles Feature: nur für Teammitglieder im Prüfungsbereich.
        </p>
      </div>
    </main>
  )

  function renderFeatureButton(feature: PreferenceName) {
    const isActive = getWithoutContext(feature)

    return (
      <button
        className="inline-block cursor-pointer align-bottom"
        onClick={() => {
          setWithoutContext(feature, !isActive)
          setIterator(iterator + 1)
        }}
      >
        <div
          className={cn(
            'flex h-6 w-12 rounded-full bg-gray-300 p-1 duration-300 ease-in-out',
            isActive && 'bg-green-400'
          )}
        >
          <div
            className={cn(
              'h-4 w-4 transform rounded-full bg-white shadow-md duration-300 ease-in-out',
              isActive && 'translate-x-6'
            )}
          ></div>
        </div>
      </button>
    )
  }
}
