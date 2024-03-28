import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { cn } from '@/helper/cn'
import { isProduction } from '@/helper/is-production'

export const features = {
  editorIntermediateTasks: {
    cookieName: 'useEditorIntermediateTasks',
    isActive: false,
    activeInDev: true,
    hideInProduction: false,
  },
  edtrPasteHack: {
    cookieName: 'useEdtrPasteHack',
    isActive: false,
    activeInDev: true,
    hideInProduction: true,
  },
  editorPluginCopyTool: {
    cookieName: 'useEditorPluginCopyTool',
    isActive: false,
    activeInDev: true,
    hideInProduction: false,
  },
  editorAnchorLinkCopyTool: {
    cookieName: 'useEditorAnchorLinkCopyTool',
    isActive: false,
    activeInDev: true,
    hideInProduction: false,
  },
}

const showExperimentsStorageKey = 'showExperiments'

type FeatureKey = keyof typeof features

export function shouldUseFeature(featureKey: FeatureKey) {
  if (typeof window === 'undefined' || !Object.hasOwn(features, featureKey))
    return false

  const feature = features[featureKey]

  const hasYesCookie = document.cookie.includes(feature.cookieName + '=1')
  const hasNoCookie = document.cookie.includes(feature.cookieName + '=0')
  return isProduction
    ? hasYesCookie && feature.hideInProduction === false
    : hasYesCookie || (feature.activeInDev && !hasNoCookie)
}

export function ProfileExperimental() {
  const [, updateState] = useState({}) //refresh comp

  useEffect(() => {
    if (window.location.hash === '#enable-experiments') {
      localStorage.setItem(showExperimentsStorageKey, '1')
      window.location.hash = ''
      window.location.reload()
    }

    if (window.location.hash === '#disable-experiments')
      localStorage.removeItem(showExperimentsStorageKey)
  })

  if (typeof window === 'undefined') return null
  if (isProduction && !localStorage.getItem(showExperimentsStorageKey))
    return null

  // check cookies
  Object.keys(features).forEach((featureString) => {
    const featureKey = featureString as FeatureKey
    if (features[featureKey]) {
      features[featureKey].isActive = shouldUseFeature(featureKey)
    }
  })

  function handleButtonClick(featureKey: FeatureKey) {
    if (!features[featureKey]) return
    if (features[featureKey].isActive)
      Cookies.set(features[featureKey].cookieName, '0', { expires: 60 })
    else Cookies.set(features[featureKey].cookieName, '1', { expires: 60 })

    updateState({})
  }

  function shouldBeVisible(key: FeatureKey) {
    if (!Object.hasOwn(features, key)) return false
    if (isProduction && features[key].hideInProduction) return false
    return true
  }

  return (
    <section className="mt-10">
      <h2 className="serlo-h2" id="experiments">
        🧪 Experimente
      </h2>
      {shouldBeVisible('editorIntermediateTasks') ? (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('editorIntermediateTasks')} Zwischentexte für
            Aufgaben mit Teilaufgaben 🛠
          </h3>
          <p className="serlo-p">
            Experimentelles Feature: nur für Teammitglieder im Prüfungsbereich.
          </p>
        </div>
      ) : null}
      {shouldBeVisible('edtrPasteHack') ? (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('edtrPasteHack')} Einfügen von Serlo
            Editor-State JSON 🛠
          </h3>
          <p className="serlo-p">
            Experimentelles Feature: nur aktivieren wenn du weißt was du tust.
          </p>
        </div>
      ) : null}
      <hr className="mx-side -mt-2 mb-4" />
      {shouldBeVisible('editorPluginCopyTool') ? (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('editorPluginCopyTool')} Editor: Plugin Copy
            Tool
          </h3>
          <p className="serlo-p">
            In der Editor-Toolbar der Plugins kannst du das Plugin in die
            Zwischenablage kopieren und im gleichen oder einem anderen Editor
            Content eingefügt werden. Zum einfügen einfach ein Text-Plugin
            auswählen und STRG/CMD+V oder rechtsklick&gt;einfügen benutzen. Wenn
            das Plugin an der Stelle erlaubt ist, erscheint es direkt.
          </p>
        </div>
      ) : null}
      <hr className="mx-side -mt-2 mb-4" />
      {shouldBeVisible('editorAnchorLinkCopyTool') ? (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('editorAnchorLinkCopyTool')} Editor: Anker-Link
            Tool
          </h3>
          <p className="serlo-p">
            Ein neues Tool in der Editor-Toolbar um direkt Anker-Links auf
            Editor-Plugins in die Zwischenablage zu kopieren. Wichtig:
            Funktioniert nur, wenn der Inhalt ab Juli 2023 eine neue Revision
            erhalten hat.
          </p>
        </div>
      ) : null}
    </section>
  )

  function renderFeatureButton(feature: FeatureKey, href?: string) {
    if (!features[feature]) return null

    const isActive = features[feature].isActive
    return (
      <button
        className="inline-block cursor-pointer align-bottom"
        onClick={() =>
          href ? (window.location.href = href) : handleButtonClick(feature)
        }
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
