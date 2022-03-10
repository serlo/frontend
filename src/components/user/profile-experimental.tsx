import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const features = {
  boxPlugin:
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? null
      : { cookieName: 'useBoxPlugin', isActive: false },
  legacyEditor: { cookieName: 'useLegacyEditor', isActive: false },
  legacyDesign:
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? null
      : { cookieName: 'useFrontend', isActive: false },
}

type Feature = keyof typeof features

const showExperimentsStorageKey = 'showExperiments'

export function ProfileExperimental() {
  const [, updateState] = useState({}) //refresh comp

  useEffect(() => {
    if (window.location.hash === '#enable-experiments') {
      localStorage.setItem(showExperimentsStorageKey, '1')
      window.location.hash = ''
    }

    if (window.location.hash === '#disable-experiments')
      localStorage.removeItem(showExperimentsStorageKey)
  })

  if (!localStorage.getItem(showExperimentsStorageKey)) return null

  // check cookies
  Object.keys(features).forEach((feature) => {
    const _feature = feature as Feature
    if (features[_feature]) {
      features[_feature]!.isActive =
        typeof window === 'undefined'
          ? false
          : Cookies.get(features[_feature]!.cookieName) === '1'
    }
  })

  function handleButtonClick(feature: Feature) {
    if (!features[feature]) return

    if (features[feature]!.isActive)
      Cookies.remove(features[feature]!.cookieName)
    else Cookies.set(features[feature]!.cookieName, '1', { expires: 60 })

    updateState({})
  }

  return (
    <section className="mt-10">
      <h2 className="serlo-h2" id="experiments">
        🧪 Experimente
      </h2>
      {features['boxPlugin'] && (
        <div>
          <h3 className="serlo-h3 mb-3">
            ⬛ Editor: Box Plugin {renderFeatureButton('boxPlugin')}
          </h3>
          <p className="serlo-p">
            Das neue Box Plugin, bisher nur für Staging.
          </p>
        </div>
      )}
      {features['legacyDesign'] && (
        <div>
          <h3 className="serlo-h3 mb-3">
            👻 Frontend: Altes Design{' '}
            <a
              href="/disable-frontend"
              className="serlo-button serlo-make-interactive-primary"
            >
              aktivieren{' '}
            </a>
          </h3>
          <p className="serlo-p">
            Zurück ins alte Design, sollte nur noch bei akuten Problemen oder
            zum Vergleichen mit den neuen Design benutzt werden.
          </p>
        </div>
      )}
      {features['legacyEditor'] && (
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

  function renderFeatureButton(feature: Feature) {
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
