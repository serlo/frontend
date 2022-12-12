import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <PageTitle title="Tut uns keid, keine Logins heute Nacht" />
    <p className="serlo-p">
      Heute Nacht (12.12. ab 20:30) arbeiten wir am Login-System, deswegen ist
      das Einloggen und Registrieren bis morgen früh nicht möglich.
      <br />
      Wenn alles klappt ist morgen alles wieder aktiv (und schöner und
      schneller).
    </p>
    <p className="serlo-p">
      Gute Nacht,
      <br />
      dein Serlo Software Team 🦉
    </p>
  </FrontendClientBase>
))
