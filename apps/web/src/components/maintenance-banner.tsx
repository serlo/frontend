export function MaintenanceBanner() {
  return (
    <div className="block rounded-lg bg-orange-300 p-3">
      <p className="">
        <span className="font-bold">Vorsicht!</span> Heute und Morgen wird an
        den Aufgabengruppen in der Datenbank gearbeitet.
        <br />
        Es wird zeitweise zu Problemen beim Speichern kommen.
        <br />
        Sagt uns auf Slack / im Community-Chat Bescheid, wenn euch etwas
        auffällt. 🧑‍🔧
      </p>
    </div>
  )
}
