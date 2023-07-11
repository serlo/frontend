import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { FrontendNodeType } from '@/frontend-node-types'
import { tw } from '@/helper/tw'
import { renderArticle } from '@/schema/article-renderer'

const ContentPage: NextPage = () => {
  return (
    <FrontendClientBase entityId={123}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Prototype Nächste Iteration Aufgabenordner</title>
      </Head>
      <Content />
    </FrontendClientBase>
  )
}

function Content() {
  const [modal, setModal] = useState(false)
  const [id, setId] = useState('')

  return (
    <>
      <h1 className="serlo-h1 my-12">Prozentrechnen üben und Co.</h1>
      <div className="serlo-p">Hier sind ein paar Übungsaufgaben und Co.</div>
      <div className="my-8 flex justify-center">
        {renderExercise('Einführung', '195105')}
        {renderExercise('Finde Gleichung', '195101')}
      </div>
      <div className="my-8 flex justify-center">
        {renderExercise('Textaufgabe 1', '37779')}
        {renderExercise('Textaufgabe 2', '37958')}
        {renderExercise('Textaufgabe 3', '8265')}
      </div>
      <div className="flex justify-center">
        {renderExercise('H5P Dragging', '278818')}
        {renderExercise('H5P Memory', '278959')}
      </div>
      {modal && renderModal()}
    </>
  )

  function renderExercise(title: string, href: string) {
    return (
      <div
        className="mx-6 flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-yellow-300"
        onClick={() => {
          setModal(true)
          setId(href)
        }}
      >
        {title}
      </div>
    )
  }

  function renderModal() {
    return (
      <>
        <div className="fixed inset-0 z-[150] bg-gray-100"></div>
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => {
            setModal(false)
          }}
        >
          <button
            onClick={() => {
              setModal(false)
            }}
            className={tw`
              absolute right-4 top-4 z-[300] h-10 w-10 rounded-full bg-blue-200 text-xl
              hover:bg-blue-300
            `}
          >
            <FaIcon icon={faTimes} />
          </button>
          <div
            className={tw`
              relative z-[200] mx-8 my-8 flex flex
              max-h-[calc(100%-48px)] min-h-[400px]
              w-[900px] max-w-full flex-col overflow-y-auto rounded-xl bg-white py-8 px-6
            `}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            {renderArticle([{ type: FrontendNodeType.Injection, href: id }])}
          </div>
        </div>
        <style jsx global>{`
          body {
            position: fixed;
          }
        `}</style>
      </>
    )
  }
}

export default ContentPage
