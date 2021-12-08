import { faSave } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import nProgress from 'nprogress'
import { useState } from 'react'

import { showToastNotice } from '@/helper/show-toast-notice'
import { GapEx, Gappy } from '@/pages/___gaps'

export function MockupGaps() {
  const [showWalletNotice, setShowWalletNotice] = useState(false)
  const [success, setSuccess] = useState(false)

  function onFeedbackHandler(success: boolean) {
    setShowWalletNotice(true)
    setSuccess(success)
  }

  function onSave() {
    nProgress.start()
    setTimeout(() => {
      nProgress.done()
      showToastNotice('👌 Erfolgreich in deiner Wallet gespeichert', 'success')
    }, 540)
  }

  return (
    <>
      <GapEx
        choices={[
          'Einheitswürfeln',
          '1 VE',
          '1 cm³',
          'Multiplikation',
          '120 cm³',
          'Einheitsquader',
          '1 FE',
          '1 LE',
          'Addition',
          '1 cm²',
          '17 cm³',
          '17 VE',
          '120 cm²',
          '120 VE',
        ]}
        count={5}
        onFeedback={onFeedbackHandler}
      >
        <p className="serlo-p mb-block">
          Um das Volumen eines Quaders zu bestimmen, legst du den Quader mit{' '}
          <Gappy index={0} /> aus. Diese haben ein Volumen von{' '}
          <Gappy index={1} />
          . Eine mögliche Volumeneinheit ist beispielsweise <Gappy index={2} />.
          Die Anzahl der Einheitswürfel kannst du abzählen oder durch{' '}
          <Gappy index={3} /> der Länge, Breite und Höhe des Quaders berechnen.
          Ein Quader mit der Länge 3 cm, Breite 10 cm und Höhe von 4 cm hat also
          ein Volumen von <Gappy index={4} />.
        </p>
      </GapEx>
      {showWalletNotice ? (
        <div className="bg-brand-100 mx-side p-side my-20 text-center rounded-xl">
          {success
            ? 'Super, du hast den Kurs erfolgreich durchgearbeitet! '
            : 'Yeah, du hast den Kurs durchgearbeitet. '}
          <>
            Du kannst deinen Lernfortschritt jetzt speichern.
            <br />
            {!success && 'Oder du probierst dich noch mal an der Übung'}
            <br />
            <button
              className="serlo-button serlo-make-interactive-green mt-2 m-auto text-center"
              onClick={onSave}
            >
              <FontAwesomeIcon icon={faSave} /> In deiner Wallet speichern
            </button>
          </>
        </div>
      ) : null}
    </>
  )
}
