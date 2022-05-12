import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons/faHourglassEmpty'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { Link } from '../content/link'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { isProduction } from '@/helper/is-production'

export const features = {
  discussionsPage: {
    cookieName: 'useDiscussionsPage',
    isActive: false,
    activeInDev: true,
  },
  tablePlugin: {
    cookieName: 'useTablePlugin',
    isActive: false,
    activeInDev: true,
  },
  addRevisionMutation: {
    cookieName: 'useAddRevisionMutation',
    isActive: false,
    activeInDev: true,
  },
  legacyEditor: {
    cookieName: 'useLegacyEditor',
    isActive: faHourglassEmpty,
    activeInDev: false,
  },
  legacyDesign: {
    cookieName: 'useFrontend',
    isActive: false,
    activeInDev: false,
  },
}

const showExperimentsStorageKey = 'showExperiments'

type FeatureKey = keyof typeof features

export function shouldUseFeature(featureKey: FeatureKey) {
  if (typeof window === 'undefined' || !hasOwnPropertyTs(features, featureKey))
    return false

  const hasYesCookie = document.cookie.includes(
    features[featureKey].cookieName + '=1'
  )
  const hasNoCookie = document.cookie.includes(
    features[featureKey].cookieName + '=0'
  )
  return isProduction
    ? hasYesCookie
    : hasYesCookie || (features[featureKey].activeInDev && !hasNoCookie)
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

  return (
    <section className="mt-10">
      <h2 className="serlo-h2" id="experiments">
        🧪 Experimente
      </h2>
      {features.discussionsPage && (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('discussionsPage')} Page: /discussions im
            Frontend 💬
          </h3>
          <p className="serlo-p">
            Alte oder neue <Link href="/discussions">/discussions</Link> Seite.
          </p>
        </div>
      )}
      {features.tablePlugin && (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('tablePlugin')} Editor: New Table Plugin 📋
          </h3>
          <p className="serlo-p">Das neue Table Plugin zum testen.</p>
        </div>
      )}
      {features.addRevisionMutation && (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('addRevisionMutation')} Revisions Speichern
            über die neue Infrastruktur ⚠️
          </h3>
          <p className="serlo-p">
            Bearbeitungen werden direkt über die API gespeichert. Vorsicht: Noch
            nicht ausführlich getestet.
          </p>
        </div>
      )}
      <hr className="mx-side mb-4 -mt-2" />
      {features.legacyDesign && (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('legacyDesign', '/disable-frontend')} Frontend:
            Altes Design 👻
          </h3>
          <p className="serlo-p">
            Zurück ins alte Design, sollte nur noch bei akuten Problemen oder
            zum Vergleichen mit den neuen Design benutzt werden.
          </p>
        </div>
      )}
      {features.legacyEditor && (
        <div>
          <h3 className="serlo-h3 mb-3">
            {renderFeatureButton('legacyEditor')} Legacy-Editor ⚠️
          </h3>
          <p className="serlo-p">
            Wenn du Probleme mit dem Editor hast, kannst du hier den alten
            Editor aktivieren.
            <br />
            Zusätzlich die Probleme dann bitte{' '}
            <a href="https://community.serlo.org/channel/software-features-and-bugs">
              gleich melden
            </a>
            , weil wir den Legacy-Editor in absehbarer Zeit ganz abschalten
            werden. Danke!
          </p>
        </div>
      )}
    </section>
  )

  function renderFeatureButton(feature: FeatureKey, href?: string) {
    if (!features[feature]) return null

    const isActive = features[feature]!.isActive
    return (
      <button
        className="inline-block cursor-pointer align-bottom"
        onClick={() =>
          href ? (window.location.href = href) : handleButtonClick(feature)
        }
      >
        <div
          className={clsx(
            'w-12 h-6 flex bg-gray-300 rounded-full p-1 duration-300 ease-in-out',
            isActive && 'bg-green-400'
          )}
        >
          <div
            className={clsx(
              'bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out',
              isActive && 'translate-x-6'
            )}
          ></div>
        </div>
      </button>
    )
  }
}
