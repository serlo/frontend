import { faSave } from '@fortawesome/free-regular-svg-icons'
import nProgress from 'nprogress'
import { useEffect, useState } from 'react'

import { endpointEnmeshed } from '@/api/endpoint'
import { FaIcon } from '@/components/fa-icon'
import { showToastNotice } from '@/helper/show-toast-notice'
import { triggerSentry } from '@/helper/trigger-sentry'

export function LenabiCourseFeedback() {
  const [showWalletNotice, setShowWalletNotice] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const button = e.target as HTMLElement
      // button has data-qa with value plugin-exercise-check-answer-button?
      if (button.dataset.qa === 'plugin-exercise-check-answer-button') {
        const correctFeedback = document.querySelector(
          '[data-qa="plugin-exercise-feedback-correct"]'
        )
        const incorrectFeedback = document.querySelector(
          '[data-qa="plugin-exercise-feedback-incorrect"]'
        )
        if (correctFeedback || incorrectFeedback) {
          setShowWalletNotice(true)
          if (correctFeedback) setSuccess(true)
          else setSuccess(false)
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  if (!showWalletNotice) return null

  return (
    <div className="mx-side my-20 rounded-xl bg-brand-100 p-side text-center">
      {success
        ? 'Super, du hast den Kurs erfolgreich durchgearbeitet! '
        : 'Yeah, du hast den Kurs durchgearbeitet. '}
      <>
        Du kannst deinen Lernfortschritt jetzt speichern.
        <br />
        {!success && 'Oder du probierst dich noch mal an der Übung'}
        <br />
        <button
          className="serlo-button-green m-auto mt-2 text-center"
          onClick={saveLearningProgress}
        >
          <FaIcon icon={faSave} /> In deiner Wallet speichern
        </button>
      </>
    </div>
  )

  function saveLearningProgress() {
    const sessionId = sessionStorage.getItem('sessionId')
    const name = 'LernstandMathe'
    const value = encodeURIComponent('✓ Logistisches Wachstum')

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
