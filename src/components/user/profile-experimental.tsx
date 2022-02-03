import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const features = {
  editor: { cookieName: 'useEditorInFrontend', isActive: false },
  boxPlugin:
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? null
      : { cookieName: 'useBoxPlugin', isActive: false },
  oldDesign:
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
          : Cookies.get(features[_feature]!.cookieName) === '1' ||
            (_feature === 'oldDesign' &&
              Cookies.get(features[_feature]!.cookieName) === '1.1')
    }
  })

  function handleButtonClick(feature: Feature) {
    if (!features[feature]) return
    const oldDesign = feature === 'oldDesign'

    if (features[feature]!.isActive) {
      if (oldDesign) Cookies.set(features[feature]!.cookieName, '0')
      else Cookies.remove(features[feature]!.cookieName)
    } else {
      if (oldDesign) Cookies.set(features[feature]!.cookieName, '1.1')
      else Cookies.set(features[feature]!.cookieName, '1', { expires: 60 })
    }
    updateState({})
    if (oldDesign) window.location.reload()
  }

  return (
    <section className="mt-10">
      <h2 className="serlo-h2" id="experiments">
        🧪 Experimente
      </h2>
      <div>
        <h3 className="serlo-h3 mb-3">
          ⚠️ Editor im Frontend {renderFeatureButton('editor')}
        </h3>
        <p className="serlo-p">
          Hier kannst du den Editor im neuen Frontend aktivieren. Prinzipiell
          funktioniert das, aber wir gehen davon aus, dass es in Sonderfällen zu
          Problemen kommt und brauchen deswegen euch als mutige Tester*innen.{' '}
        </p>
        <p className="serlo-p">
          Bitte besondere Vorsicht beim Review von den Inhalten, die ihr damit
          bearbeitet.
        </p>
        <p className="serlo-p">
          <b className="block mt-4">Was passieren könnte:</b>
          <ul className="serlo-ul">
            <li>Bestimmte Inhalte laden nicht</li>
            <li>Änderungen könnten nicht gespeichert werden</li>
            <li>
              Versteckte Felder (z.B. in den Einstellungen) werden leer
              abgespeichert
            </li>
            <li>… andere unerwartete nervige Sachen?</li>
          </ul>
        </p>
      </div>
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
      {features['oldDesign'] && (
        <div>
          <h3 className="serlo-h3 mb-3">
            👻 Frontend: Altes Design {renderFeatureButton('oldDesign')}
          </h3>
          <p className="serlo-p">
            Zurück ins alte Design, sollte nur noch bei akuten Problemen oder
            zum Vergleichen mit den neuen Design benutzt werden.
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
