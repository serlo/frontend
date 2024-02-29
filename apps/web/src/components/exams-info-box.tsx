import { BoxRenderer } from '@editor/plugins/box/renderer'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import { Link } from './content/link'
import { FaIcon } from './fa-icon'

// manually for now,
// we need to figure out an elegant way to get all taxonomy ids that contain
// exams in the long term

const examsTaxIdsBY = [
  75678, 290075, 261569, 226922, 178169, 247427, 293322, 261415, 247428, 247429,
  75049, 288940, 272196, 232930, 180388, 146968, 146967, 95100, 75548, 75050,
  76750, 288945, 272224, 234076, 180403, 146981, 139217, 94502, 76714, 76717,
  20852, 274629, 248460, 231486, 179851, 137533, 106725, 76975, 70296, 70295,
  70304, 21007, 91252, 262133, 253867, 201338, 201337, 186715, 91264, 91265,
  91253, 201339, 201340, 201341, 91266, 91267,
]

const examsTaxIdsNI = [
  300763, 300785, 300786, 300787, 300762, 300764, 300765, 300766, 297604,
  300698, 300714, 300718, 300778, 300804, 300805, 300806, 297606, 300750,
  300754, 300755, 297605,
]

export function ExamsInfoBox({ id }: { id: number }) {
  const isInBYTax = examsTaxIdsBY.includes(id)
  const isInNITax = examsTaxIdsNI.includes(id)

  if (!isInBYTax && !isInNITax) return null

  return (
    <>
      <div className="-ml-side mt-8">
        <BoxRenderer boxType="blank" anchorId="exams-info-box">
          <div className="py-4">
            <p className="serlo-p mb-2 font-normal  leading-normal">
              Du bist grade im Prüfungsbereich für{' '}
              <b>{isInBYTax ? 'Bayern' : 'Niedersachsen'}</b>.
              <br />
              Die anderen Bundesländer, noch mehr Prüfungsaufgaben <br /> und
              unseren Discord-Server findest du hier:
            </p>
            <Link
              href="/mathe-pruefungen"
              className="serlo-button-blue mx-side !px-3 !py-2"
            >
              <FaIcon icon={faGraduationCap} /> Mathe-Prüfungen Startseite
            </Link>
          </div>
        </BoxRenderer>
        <style jsx global>
          {`
            #secondary-menu {
              display: none !important;
            }
          `}
        </style>
      </div>
    </>
  )
}