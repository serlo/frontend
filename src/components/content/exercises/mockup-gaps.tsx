import { faSave } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import nProgress from 'nprogress'
import { useState } from 'react'

import { endpointEnmeshed } from '@/api/endpoint'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'
import { GapEx, Gappy } from '@/pages/___gaps'

export function MockupGaps() {
  const [showWalletNotice, setShowWalletNotice] = useState(false)
  const [success, setSuccess] = useState(false)

  function onFeedbackHandler(success: boolean) {
    setShowWalletNotice(true)
    setSuccess(success)
  }

  /*
  Wähle die richtigen Begriffe für die Lücken.
  Das [logistische] Wachstum verläuft in drei Phasen:
  Zunächst wächst die Größe [exponentiell] und der Graph steigt [stark].
  In der zweiten Phase ist das Wachstum [annähernd linear]. In diesem Bereich liegt auch [der Wendepunkt].
  Der Graph [steigt] in der dritten Phase [schwach]. Das Wachstum ist [beschränkt].

  [die Asymptote] [kubisch] [fällt] [logarithmische]
  */

  return (
    <>
      <GapEx
        choices={[
          'logistische',
          'exponentiell',
          'stark',
          'annähernd linear',
          'der Wendepunkt',
          'steigt',
          'schwach',
          'beschränkt',
          'die Asymptote',
          'kubisch',
          'fällt',
          'logarithmische',
        ]}
        count={8}
        onFeedback={onFeedbackHandler}
      >
        <div className="serlo-p mb-block leading-relaxed">
          <p className="mb-4">
            <b>Wähle die richtigen Begriffe für die Lücken.</b>
          </p>
          <p className="mb-4">
            Das <Gappy index={0} /> Wachstum verläuft in drei Phasen:
          </p>
          <p className="mb-4">
            Zunächst wächst die Größe <Gappy index={1} /> und der Graph steigt{' '}
            <Gappy index={2} />.
          </p>
          <p className="mb-4">
            In der zweiten Phase ist das Wachstum <Gappy index={3} />.<br /> In
            diesem Bereich liegt auch <Gappy index={4} />.
          </p>
          <p className="mb-4">
            Der Graph <Gappy index={5} /> in der dritten Phase{' '}
            <Gappy index={6} />
            . Das Wachstum ist <Gappy index={7} />.
          </p>
        </div>
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
              onClick={saveLearningProgress}
            >
              <FontAwesomeIcon icon={faSave} /> In deiner Wallet speichern
            </button>
          </>
        </div>
      ) : null}
    </>
  )

  function saveLearningProgress() {
    const sessionId = sessionStorage.getItem('sessionId')
    const name = 'Lernstand-Mathe'
    const value = encodeURIComponent('✓ Bruchaddition')

    if (!sessionId) return

    nProgress.start()

    fetch(
      `${endpointEnmeshed}/attributes?name=${name}&value=${value}&sessionId=${sessionId}`,
      { method: 'POST' }
    )
      .then((res) => res.json())
      .then(() => {
        setTimeout(() => {
          nProgress.done()
          showToastNotice(
            '👌 Lernstand wurde erfolgreich an deine Wallet gesendet',
            'success',
            6000
          )
          setShowWalletNotice(false)
        }, 540)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(e))
        triggerSentry({
          message: `Error in User-Journey: Saving Attribute: ${JSON.stringify(
            e
          )}`,
        })
        setShowWalletNotice(false)
      })
  }
}
