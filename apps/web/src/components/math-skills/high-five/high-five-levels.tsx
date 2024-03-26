import { LevelSkillHeader } from './level-skill-header'
import { RealmathInjection } from './realmath-injection'
import { exercisesGrade5 } from '../exercises/grade-5'

interface TreeNode {
  title: string
  deps: number[]
  x: number
  y: number
}

export const nodes: Record<number, TreeNode> = {
  0: { title: 'Start', deps: [], x: 60, y: 50 },
  1: { title: 'Umfang', deps: [0], x: 57, y: 130 },
  2: { title: 'Quadratzahlen', deps: [0], x: 190, y: 35 },
  3: { title: 'Zeit', deps: [0], x: 141, y: 163 },
  4: { title: 'KoSi', deps: [1], x: 45, y: 250 },
  5: { title: 'Winkel', deps: [1], x: 130, y: 230 },
  6: { title: 'Einzeichnen', deps: [4], x: 70, y: 370 },
  7: { title: 'Fläche', deps: [4, 5], x: 160, y: 420 },
  8: { title: 'Sektoren', deps: [5], x: 230, y: 340 },
  9: { title: 'Verschiebung', deps: [6], x: 65, y: 635 },
  10: { title: 'Quadrate zeichnen', deps: [6], x: 130, y: 550 },
  11: { title: 'Rechteck-Profi', deps: [7], x: 210, y: 620 },
  12: { title: 'Kreuzung', deps: [7, 8], x: 240, y: 490 },
  13: { title: 'Winkelnamen', deps: [8], x: 330, y: 560 },
  14: { title: 'Ordnung', deps: [3], x: 250, y: 270 },
  15: { title: 'Römer', deps: [3], x: 340, y: 220 },
  16: { title: 'Diagramm', deps: [14], x: 340, y: 420 },
  17: { title: 'Runden', deps: [14, 15], x: 480, y: 400 },
  18: { title: 'Große Zahlen', deps: [15], x: 520, y: 340 },
  19: { title: 'Längenmaße', deps: [16], x: 460, y: 620 },
  20: { title: 'Entfernungen', deps: [16], x: 620, y: 600 },
  21: { title: 'Quersumme', deps: [17], x: 580, y: 500 },
  22: { title: 'Zahlenstrahl', deps: [17, 18], x: 730, y: 540 },
  23: { title: 'Münzen', deps: [18], x: 730, y: 420 },
  24: { title: 'Potenzen', deps: [2], x: 310, y: 140 },
  25: { title: 'Kopfrechnen', deps: [2], x: 393, y: 39 },
  26: { title: 'Einmaleins', deps: [24], x: 520, y: 260 },
  27: { title: 'Zahlenstern', deps: [24, 25], x: 510, y: 160 },
  28: { title: 'Rechenbaum', deps: [25], x: 558, y: 45 },
  29: { title: 'Thermometer', deps: [26], x: 720, y: 320 },
  30: { title: 'Pfeile', deps: [26, 27], x: 660, y: 240 },
  31: { title: 'Zahlenpyramide', deps: [27], x: 710, y: 180 },
  32: { title: 'Division', deps: [28], x: 660, y: 110 },
  33: { title: 'Profi-Baum', deps: [28], x: 730, y: 50 },
} as const

export const levelComponents: Record<
  number,
  (counter: number, onClose: () => void) => JSX.Element
> = {
  0: (c, onClose) => (
    <>
      <p>
        Herzlich Willkommen bei der Tour durch die Highlights der 5. Klasse.
        Diese Tour wird entspannt, aber trotzdem (hoffentlich) nicht langweilig.
      </p>
      <p>
        Die 5. Klasse bietet einige abwechslungsreiche Themen. Gleichzeitig ist
        das eine gute Gelegenheit, deine Mathe-Skills etwas aufzufrischen.
      </p>
      <p>
        Die erste Aufgabe ist unten eingeblendet. Die Aufgabe ist abgeschlossen
        wenn du drei Skill-Punkte erreicht hast.
      </p>
      <LevelSkillHeader onClose={onClose} />
      <div className="rounded-lg border-2 border-gray-100 p-4 pt-7">
        {exercisesGrade5['euro-zerlegen'].component}
      </div>
    </>
  ),
  1: (c, onClose) => (
    <>
      <p>
        In der 5. Klasse werden auch viele Themen aus der Grundschule
        wiederholt. Dazu gehören auch Begriffe aus der Geometrie, wie Rechteck
        oder Umfang.
      </p>
      <p>Zeige, dass von einem Rechteck den Umfang berechnen kannst.</p>
      <RealmathInjection
        url="/Neues/Klasse5/umfang/rechtecksumfang.php"
        height={500}
        target={50}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  2: (c, onClose) => (
    <>
      <p>
        Hier findest du einen sanften Einstieg ins Kopfrechnen. Berechne die
        Quadratzahlen.
      </p>
      <LevelSkillHeader onClose={onClose} />
      <div className="rounded-lg border-2 border-gray-100 p-4 pt-7">
        {exercisesGrade5['quadratzahlen-berechnen'].component}
      </div>
    </>
  ),
  3: (c, onClose) => (
    <>
      <p>
        Um Zeiten umzurechnen, braucht es auf einmal so schräge Faktor wie 24
        oder 60. Doch das hält dich nicht davon ab, diese Aufgabe zu lösen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/zeit/zeit.php"
        height={450}
        target={40}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  4: (c, onClose) => (
    <>
      <p>
        KoSi ist eine freundliche Abkürzung für das lange Wort
        &quot;Koordinatensystem&quot;. Dahinter verbirgt sich die schlichte
        Idee, Punkte mit Zahlen darzustellen.
      </p>
      <p>
        Wichtig zu merken: Starte mit der x-Achse. Mache dann mit der y-Achse
        weiter. Schreibe auch die Koordinaten in dieser Reihenfolge.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/geometrie/gittternetzlesen.php"
        height={500}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  5: (c, onClose) => (
    <>
      <p>
        Verschiedene Winkel haben verschiedene Namen. Wähle den passenden Namen
        aus.
      </p>
      <RealmathInjection
        url="/Neues/Klasse6/winkel/winkelart02.php"
        height={500}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  6: (c, onClose) => (
    <>
      <p>
        Jetzt kommt die umgekehrte Aufgabe. Schiebe die Punkte an die richtige
        Stelle.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/geometrie/gittternetzzeichnen.php"
        height={500}
        target={45}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  7: (c, onClose) => (
    <>
      <p>
        Der Flächeninhalt des Rechtecks hängt sehr eng mit der Multiplikation
        zusammen - auch sehr anschaulich.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/umfang/rechtecksflaeche.php"
        height={500}
        target={75}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  8: (c, onClose) => (
    <>
      <p>
        Ein Kreis hat immer 360°. In je mehr Sektoren man den Kreis teilt, umso
        kleiner werden die Winkel.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/winkel/winkelkreis.php"
        height={500}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  9: (c, onClose) => (
    <>
      <p>
        Zeichne wieder Punkte ein. Orientiere dich diesmal an einen anderen
        Punkt.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/geometrie/gittternetzvar.php"
        height={470}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  10: (c, onClose) => (
    <>
      <p>
        Quadrate haben einen engen Zusammenhang mit Quadratzahlen! Die Brücke
        ist der Flächeninhalt.
      </p>
      <p>
        Mache dich mit diesem Zusammenhang vertraut und zeichne passende
        Quadrate. Ein bisschen Um-die-Ecke-Denken ist gefragt!
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/umfang/quadratflaeche2.php"
        height={500}
        target={45}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  11: (c, onClose) => (
    <>
      <p>
        Du kannst Fläche und Umfang berechnen und kannst auch nicht mit den
        Begriffen durcheinander!
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/rechteck/rechteckuebung.php"
        height={500}
        target={70}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  12: (c, onClose) => (
    <>
      <p>
        Wenn sich zwei Geraden kreuzen, entstehen vier Winkel. Wenn du einen der
        Winkel kennst, kannst du alle anderen drei bereits ausrechnen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse6/nebenwinkel/nebenwink00.php"
        height={500}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  13: (c, onClose) => (
    <>
      <p>
        Jedem Winkel kann mit drei Punkten ein Name gegeben werden. Starte mit
        dem ersten Schenkel, mache dann mit dem Scheitel weiter und schließe ab
        mit dem zweiten Schenkel gegen dem Uhrzeigersinn.
      </p>
      <RealmathInjection
        url="/Neues/Klasse6/winkel/winkelaufg1b.php"
        height={500}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  14: (c, onClose) => (
    <>
      <p>
        Wenn man viele Zahlen hat, kann eine Ordnung Wunder wirken um Übersicht
        reinzubringen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/zahlenausn/zahlenordnen.php"
        height={500}
        target={240}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  15: (c, onClose) => (
    <>
      <p>
        Die römischen Zahlen nutzen ein ganz anderes System als unser
        Zahlensystem und zeigt, welche Vielfalt in der Mathematik möglich ist
      </p>
      <p>
        Aber es zeigt auch, dass sich die besten Systeme durchsetzen und weniger
        optimale Systeme aus dem Alltag verdrängt werden.
      </p>
      <p>
        Aber was die römischen Zahlen immer haben werden: ihren ganz besonderen
        Stil.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/dual/roemischmemory1.php"
        height={500}
        target={100}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  16: (c, onClose) => (
    <>
      <p>
        Mit einem guten Diagramm kannst du schnell wichtige Informationen
        darstellen - wie zum Beispiel das Ergebnis der Umfrage zum Wandertag.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/diagramm/balkendiagramm.php"
        height={470}
        target={80}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  17: (c, onClose) => (
    <>
      <p>
        Manchmal sind zu viele Details auch nicht gut. Das Runden hilft, unsere
        Aufmerksamkeit auf die wesentlichen Dinge zu lenken.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/zahlenausn/zahlenrunden.php"
        height={500}
        target={50}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  18: (c, onClose) => (
    <>
      <p>
        Es wird immer Berührpunkte zwischen Mathematik und Sprache geben. Zahlen
        wollen in Worte geschrieben werden - und Worte wieder in Zahlen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/zahlenausn/textinzahl01.php"
        height={440}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  19: (c, onClose) => (
    <>
      <p>
        Dank des metrischen Systems muss man beim Umrechnen von Längeneinheiten
        nur das Komma an die richtige Stelle verschieben.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/laengen/laengen00.php"
        height={500}
        target={45}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  20: (c, onClose) => (
    <>
      <p>
        In der Tabelle siehst du alle Entfernungen zwischen den vier Städten.
        Zeige, dass du den richtigen Blick hast und die Tabelle auslesen kannst.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/laengen/entfernungen01.php"
        height={500}
        target={40}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  21: (c, onClose) => (
    <>
      <p>
        Die Ziffern einer Zahl du addieren, fühlt sich im ersten Moment etwas
        schräg an. Doch man kann daraus etwas ganz nützliches machen.
      </p>
      <p>Die Mathematik bietet manchmal kleine Überraschungen.</p>
      <RealmathInjection
        url="/Neues/Klasse5/teiler/teildurch3.php"
        height={500}
        target={80}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  22: (c, onClose) => (
    <>
      <p>
        Das erste Mal wurde vor etwa 400 Jahren der Zahlenstrahl verwendet, um
        Zahlen darzustellen und mit ihnen zu rechnen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/zahlenausn/zahlenanordnen.php"
        height={500}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  23: (c, onClose) => (
    <>
      <p>
        Unsere Münzen sind so gewählt, dass man viele Beträge mit wenigen Münzen
        darstellen kann. Trotzdem gibt es beträgt, die man mit wenigen Münzen
        darstellen kann, und andere Beträge, die mehr Münzen brauchen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/geld/eurobetrag.php"
        height={500}
        target={80}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  24: (c, onClose) => (
    <>
      <p>
        Potenz ist das lateinische Wort für Macht. Und wahrlich mächtig, wenn
        man eine Zahl wiederholt mit sich selbst multipliziert. Dabei entstehen
        schnell große Zahlen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/basis/begriff.php"
        height={500}
        target={60}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  25: (c, onClose) => (
    <>
      <p>
        Hier sind ein paar Aufgaben um deine grauen Zellen in Schwung zu
        bringen.
      </p>
      <p>Ein Schritt nach unten in der Tabelle erhöht die Zahl um 10.</p>
      <RealmathInjection
        url="/Neues/Klasse5/addieren/addimkopf.php"
        height={500}
        target={80}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  26: (c, onClose) => (
    <>
      <p>
        Sobald du das kleine Einmaleins sicher beherrscht, kannst du mit der
        schriftlichen Rechnung mit beliebig großen Zahlen umgehen.{' '}
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/multiplizieren/memory1x1-a.php"
        height={500}
        target={100}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  27: (c, onClose) => (
    <>
      <p>
        Es gibt verschiedene Möglichkeiten, vier Zahlen zu addieren. Einige
        davon sind elegant und sparen dir Arbeit.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/addieren/sternaddnat.php"
        height={500}
        target={75}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  28: (c, onClose) => (
    <>
      <p>
        In diesem Rechenbaum sind die Blätter die Zahlen und diese laufen zum
        Stamm zusammen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/subtrahieren/rechenbaummult05.php"
        height={500}
        target={50}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  29: (c, onClose) => (
    <>
      <p>
        Negative Zahlen begegnen dir schon früh bei Temperatur-Angaben. Nutze
        dieses intuitive Wissen, um das Thermometer abzulesen.
      </p>
      <RealmathInjection
        url="/Neues/Klasse6/gegenzahl/negativeinf3.php"
        height={500}
        target={75}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  30: (c, onClose) => (
    <>
      <p>
        Zahlen und Rechenoperationen lassen sich mit Pfeilen darstellen. Hier
        kannst du das ausprobieren.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/addieren/additionspfeile00.php"
        height={500}
        target={90}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  31: (c, onClose) => (
    <>
      <p>
        Ein bisschen Geduld ist gefragt! Fülle alle Felder der Pyramide aus.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/addieren/pyramide.php"
        height={500}
        target={105}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  32: (c, onClose) => (
    <>
      <p>
        In der 5. Klasse ist die Division stark eingegrenzt: Es kommen nur
        Rechnungen vor, die aufgehen. Wie auch bei diesen Kopfrechenaufgaben.
      </p>
      <RealmathInjection
        url="/Neues/Klasse5/multiplizieren/divimkopf.php"
        height={500}
        target={50}
        onClose={onClose}
        key={c}
      />
    </>
  ),
  33: (c, onClose) => (
    <>
      <p>Und zeige jetzt, dass du auch rückwärts denken kannst.</p>
      <RealmathInjection
        url="/Neues/Klasse5/subtrahieren/rechenbaummult5.php"
        height={500}
        target={75}
        onClose={onClose}
        key={c}
      />
    </>
  ),
}
