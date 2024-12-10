import { EditorMetaContext } from '@editor/core/contexts/editor-meta-context'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { EditStringsProvider } from '@editor/i18n/edit-strings-provider'
import { editStrings as editStringsDe } from '@editor/i18n/strings/de/edit'
import { editStrings as editStringsEn } from '@editor/i18n/strings/en/edit'
import { editorPlugins } from '@editor/plugin/helpers/editor-plugins'
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { SubmitButtonAndFeedback } from '@editor/plugins/rows/submit-button-and-feedback-with-ai'
import { PrototypeStateStore } from '@editor/plugins/text-area-exercise/prototype-state'
import { StickyHeaderLearner } from '@editor/prototype-microadaptivity/sticky-header-learner'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowLeft,
  faArrowRight,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import NextAdapterPages from 'next-query-params/pages'
import { mergeDeepRight } from 'ramda'
import { useEffect, useState } from 'react'
import { QueryParamProvider } from 'use-query-params'

import { GetAiFeedbackButton } from '../../../../packages/editor/src/prototype-microadaptivity/get-ai-feedback-button'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { useInstanceData } from '@/contexts/instance-context'
import { microadaptivityState } from '@/data/microadaptivity-state'
import { EditorPageData } from '@/fetcher/fetch-editor-data'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { createPlugins } from '@/serlo-editor-integration/create-plugins'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

const aiFeedback = {
  feedbackStart:
    'Dein Text zeigt, dass du eine klare Meinung hast. Es gibt eine Struktur mit Anfang, Mitte und Ende, aber einige wichtige Anforderungen wurden nicht erfüllt.',
  feedback: [
    {
      title: '"Use 3-5 linking words"',
      feedback: [
        'Du hast einige Verbindungen genutzt, aber es fehlen Verbindungswörter, um die Sätze besser zu verbinden.',
      ],
      suggestion:
        "Nutze Wörter wie 'because', 'however', oder 'and' öfter, um deine Gedanken flüssiger darzustellen.",
      isCorrect: false,
    },
    {
      title: 'Inhalt',
      feedback: [
        'Dein Schlusssatz ',
        {
          type: 'link',
          text: "'In conclusion, I think there should be homework every day.'",
          href: '#jump-to-feedback',
        },
        ' widerspricht deiner Argumentation im Text.',
      ],
      suggestion:
        'Überlege dir, ob du hier klarer ausdrücken möchtest, dass du gegen tägliche Hausaufgaben bist.',
      isCorrect: false,
    },
  ],
}

export default renderedPageNoHooks<EditorPageData>((props) => {
  return (
    <FrontendClientBase
      noContainers
      noHeaderFooter
      noIndex
      loadLoggedInData /* warn: enables preview editor without login */
      serloEntityData={{ entityId: props.id }}
    >
      <div className="relative">
        <QueryParamProvider adapter={NextAdapterPages}>
          <Content />
        </QueryParamProvider>
      </div>
    </FrontendClientBase>
  )
})

function Content() {
  const { lang } = useInstanceData()

  const [feedbackIndex, setFeedbackIndex] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [triesLeft, setTriesLeft] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dots, setDots] = useState('')

  const handleButtonClick = () => {
    setIsSubmitting(true)
    setTriesLeft((previous) => previous - 1)

    // Cheap animation . => .. => ... => (repeat)
    let dotCount = 0
    const interval = setInterval(() => {
      setDots('.'.repeat((dotCount % 3) + 1))
      dotCount++
    }, 400)

    // Artificial timeout to make it look like birdie is thinking
    setTimeout(() => {
      clearInterval(interval)
      setDots('')
      setShowFeedback(true)
      setIsSubmitting(false)
    }, 1950)
  }

  useEffect(() => {
    setTimeout(() => {
      PrototypeStateStore.update((s) => {
        s.__is_starting_up = false
      })
    }, 1000)
  }, [])

  const [previewState] = useState(microadaptivityState)

  // simplest way to provide plugins to editor that can also easily be adapted by edusharing
  editorPlugins.init(createPlugins({ lang }))

  editorRenderers.init(createRenderers())

  return (
    <EditStringsProvider
      value={
        lang === 'de'
          ? mergeDeepRight(editStringsEn, editStringsDe)
          : editStringsEn
      }
    >
      <EditorMetaContext.Provider
        value={{ editorVariant: 'serlo-org', userId: 'serlo-preview-user' }}
      >
        <div className="flex flex-row">
          <aside className="relative flex-shrink flex-grow basis-0">
            <div className="sticky top-0 flex flex-row items-center gap-3 p-7">
              <FaIcon icon={faArrowLeft} />
              <span className="text-lg">Lernpfad</span>
            </div>
          </aside>
          {/* To change content width, change both max-w and basis */}
          <main
            id="content"
            className="mb-[30%] max-w-[min(100%,50rem)] flex-shrink flex-grow basis-[50rem]"
          >
            <StickyHeaderLearner />
            <section className="min-h-screen">
              <div className="mt-[3rem]">
                <EditorRenderer document={previewState} />
                {/* HACK: Microadaptivity prototype */}
                <div className="w-foll flex flex-col items-end">
                  <SubmitButtonAndFeedback
                    onClick={handleButtonClick}
                    triesLeft={triesLeft}
                    isSubmitting={isSubmitting}
                    dots={dots}
                  />
                </div>
              </div>
              {showFeedback ? (
                <div className="sticky bottom-0 z-50 mt-3">
                  <div className="flex w-full flex-col items-center">
                    <div className="flex flex-row gap-5 rounded-md bg-purple-100 p-5 shadow-plugin-focus">
                      <img src="/_assets/img/birdie.svg" className="max-w-16" />
                      <div className="flex flex-col gap-3">
                        <div>{aiFeedback.feedbackStart}</div>
                        <div className="flex flex-col gap-3">
                          {aiFeedback.feedback.map((entry, index) => {
                            if (index !== feedbackIndex) return <></>
                            return (
                              <div key={index}>
                                <div className="flex flex-row items-center gap-1 ">
                                  <FaIcon
                                    icon={faTriangleExclamation}
                                    className="mr-1 text-purple-400"
                                  />
                                  <a
                                    href="#feedback-criteria"
                                    className="text-lg font-bold"
                                  >{`${entry.title}`}</a>
                                </div>
                                <div>
                                  {entry.feedback.map((elem, index) => {
                                    if (
                                      typeof elem === 'object' &&
                                      'type' in elem
                                    ) {
                                      return (
                                        <button
                                          onClick={() =>
                                            scrollToTextAreaContaining(
                                              elem.text
                                                .replaceAll("'", '')
                                                .replaceAll('"', '')
                                            )
                                          }
                                          key={index}
                                          className="underline"
                                        >
                                          {elem.text}
                                        </button>
                                      )
                                    }
                                    return <span key={index}>{elem}</span>
                                  })}
                                </div>
                                {entry.suggestion ? (
                                  <div className="mt-2 flex flex-row gap-1">
                                    <FaIcon
                                      icon={faLightbulb}
                                      className="mr-1 mt-1 text-purple-400"
                                    />{' '}
                                    {entry.suggestion}
                                  </div>
                                ) : null}
                              </div>
                            )
                          })}
                        </div>
                        <div className="flex flex-row items-center justify-center gap-3">
                          <button
                            onClick={() =>
                              setFeedbackIndex((previous) => previous - 1)
                            }
                            className="h-8 w-8 rounded-full bg-purple-200 hover:bg-purple-300"
                          >
                            <FaIcon icon={faArrowLeft} />
                          </button>
                          <span>{feedbackIndex + 1} / 2 </span>
                          {/* <FaIcon
                    icon={faTriangleExclamation}
                    className="text-purple-400"
                  /> */}
                          <button
                            onClick={() =>
                              setFeedbackIndex((previous) => previous + 1)
                            }
                            className="h-8 w-8 rounded-full bg-purple-200 hover:bg-purple-300"
                          >
                            <FaIcon icon={faArrowRight} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </section>
          </main>
          <aside className="flex-shrink flex-grow basis-0">
            <GetAiFeedbackButton />
          </aside>
        </div>
      </EditorMetaContext.Provider>
    </EditStringsProvider>
  )
}

function scrollToTextAreaContaining(text: string) {
  // Find the textarea with the target content
  const targetTextarea = Array.from(document.querySelectorAll('textarea')).find(
    (textarea) => textarea.value === text
  )

  // Scroll into view if found
  if (targetTextarea) {
    targetTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
