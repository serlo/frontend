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

const editorCookieName = 'useEditorInFrontend'

export function ProfileExperimental() {
  const auth = useAuthentication()
  const [, updateState] = useState({}) //refresh comp

  if (!testUsers.includes((auth.current?.username ?? '').toLowerCase())) {
    return null
  }

  const isActive =
    typeof window === 'undefined'
      ? undefined
      : Cookies.get(editorCookieName) === '1'

  function handleButtonClick() {
    if (isActive) {
      Cookies.remove(editorCookieName)
    } else {
      Cookies.set(editorCookieName, '1', { expires: 60 })
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
          ⚠️ Editor im Frontend{' '}
          <button
            onClick={handleButtonClick}
            className={clsx(
              'serlo-button',
              isActive
                ? 'serlo-make-interactive-light'
                : 'serlo-make-interactive-primary'
            )}
            onPointerUp={(e) => e.currentTarget.blur()} // use focus-visible soonish
          >
            {isActive ? 'deaktivieren' : 'aktivieren'}{' '}
          </button>
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
    </section>
  )
}
