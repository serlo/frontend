import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons/faHourglassEmpty'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

import { Link } from '../content/link'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { isProduction } from '@/helper/is-production'

export const features = {
  boxPlugin: { cookieName: 'useBoxPlugin', isActive: false, activeInDev: true },
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
      {features.boxPlugin && (
        <div>
          <h3 className="serlo-h3 mb-3">
            ⬛ Editor: Box Plugin {renderFeatureButton('boxPlugin')}
          </h3>
          <p className="serlo-p">Das neue Box Plugin zum testen.</p>
        </div>
      )}
      {features.tablePlugin && (
        <div>
          <h3 className="serlo-h3 mb-3">
            📋 Editor: New Table Plugin {renderFeatureButton('tablePlugin')}
          </h3>
          <p className="serlo-p">Das neue Table Plugin zum testen.</p>
        </div>
      )}
      {features.addRevisionMutation && (
        <div>
          <h3 className="serlo-h3 mb-3">
            ⚠️ Revisions Speichern über die neue Infrastruktur{' '}
            {renderFeatureButton('addRevisionMutation')}
          </h3>
          <p className="serlo-p">
            Bearbeitungen werden direkt über die API gespeichert. Vorsicht: Noch
            nicht ausführlich getestet.
          </p>
        </div>
      )}
      {features.legacyDesign && (
        <div>
          <h3 className="serlo-h3 mb-3">
            👻 Frontend: Altes Design{' '}
            <Link
              unstyled
              href="/disable-frontend"
              className="serlo-button serlo-make-interactive-primary"
            >
              aktivieren{' '}
            </Link>
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
            ⚠️ Legacy-Editor {renderFeatureButton('legacyEditor')}
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

  function renderFeatureButton(feature: FeatureKey) {
    if (!features[feature]) return null
    return (
      <button
        onClick={() => handleButtonClick(feature)}
        className={clsx(
          'serlo-button',
          features[feature]!.isActive
            ? 'serlo-make-interactive-light'
            : 'serlo-make-interactive-primary'
        )}
        onPointerUp={(e) => e.currentTarget.blur()}
      >
        {features[feature]!.isActive ? 'deaktivieren' : 'aktivieren'}{' '}
      </button>
    )
  }
}
