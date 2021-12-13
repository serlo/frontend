import clsx from 'clsx'
import Cookies from 'js-cookie'
import { useState } from 'react'

import { useAuthentication } from '@/auth/use-authentication'

const testUsers = [
  'botho',
  'carolinjaser',
  'claudiar',
  'dal',
  'inyono',
  'kathongi',
  'kulla',
  'metzgaria',
  'simon',
  'wolfgang',
]

export const features = {
  editor: { cookieName: 'useEditorInFrontend', isActive: false },
  boxPlugin:
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? null
      : { cookieName: 'useBoxPlugin', isActive: false },
}

type Feature = keyof typeof features

export function ProfileExperimental() {
  const auth = useAuthentication()
  const [, updateState] = useState({}) //refresh comp

  if (!testUsers.includes((auth.current?.username ?? '').toLowerCase())) {
    return null
  }

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

    if (features[feature]!.isActive) {
      Cookies.remove(features[feature]!.cookieName)
    } else {
      Cookies.set(features[feature]!.cookieName, '1', { expires: 60 })
    }
    updateState({})
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
