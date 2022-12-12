//TODO: remove again after deploy

import { PageTitle } from './content/page-title'

export function NoLoginTonight() {
  return (
    <div>
      <PageTitle title="Tut uns keid, keine Logins heute Nacht" />
      <p className="serlo-p">
        Heute Nacht (12.12. ab 20:30 GMT+1) arbeiten wir am Login-System,
        deswegen ist das Einloggen und Registrieren bis morgen früh nicht
        möglich.
        <br />
        Wenn alles klappt ist morgen alles wieder aktiv (und schöner und
        schneller).
      </p>
      <p className="serlo-p">
        Gute Nacht,
        <br />
        dein Serlo Software Team 🦉
      </p>
    </div>
  )
}
