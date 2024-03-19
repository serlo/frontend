export function MaintenanceBanner() {
  return (
    <div className="mb-12 block rounded-lg bg-orange-300 p-3">
      <p>
        <b>🧑‍🔧 Vorsicht!</b>
        <br /> Am Mittwoch (20.3.) wird zwischen 17 und 22 Uhr an der Datenbank
        gearbeitet.
        <br />
        Vor allem Aufgabengruppen sind betroffen.
        <br />
        <br />
        <b>Es wird zeitweise nicht möglich sein zu speichern.</b>
        <br />
        <br />
        <small>
          Sagt uns auf Slack / im Community-Chat Bescheid, wenn euch (ab
          Donnerstag) Probleme über den Weg laufen.
        </small>
      </p>
    </div>
  )
}
