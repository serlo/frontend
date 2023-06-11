import { GetServerSideProps } from 'next'

import { FrontendClientBase } from '@/components/frontend-client-base'
import { prisma } from '@/helper/prisma'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface SurveyProps {
  showPopupA: number
  showPopupB: number

  exitPopupA: number
  exitPopupB: number

  clickPopupA: number
  clickPopupB: number

  showButtonA: number
  showButtonB: number

  exitButtonA: number
  exitButtonB: number

  clickButtonA: number
  clickButtonB: number
}

export default renderedPageNoHooks<SurveyProps>((props) => {
  return (
    <FrontendClientBase entityId={-1} authorization={{}}>
      <h1 className="serlo-h1 mt-12" itemProp="name">
        Mitmach-Woche Schnell-Auswertung
      </h1>
      <div className="min-h-1/4">
        <h2 className="my-4 font-bold">Ansprache A (Mitmachen)</h2>
        <p>Popup angezeigt: {props.showPopupA}</p>
        <p>Popup geschlossen: {props.exitPopupA}</p>
        <p>Klick: {props.clickPopupA}</p>

        <p className="mt-4">Phase 2 Button angezeigt: {props.showButtonA}</p>
        <p>Phase 2 Button geschlossen: {props.exitButtonA}</p>
        <p>Phase 2 Button Klick: {props.clickButtonA}</p>

        <h2 className="my-4 font-bold">
          Ansprache B (Für Lerngruppe anpassen)
        </h2>
        <p>Popup angezeigt: {props.showPopupB}</p>
        <p>Popup geschlossen: {props.exitPopupB}</p>
        <p>Klick: {props.clickPopupB}</p>

        <p className="mt-4">Phase 2 Button angezeigt: {props.showButtonB}</p>
        <p>Phase 2 Button geschlossen: {props.exitButtonB}</p>
        <p>Phase 2 Button Klick: {props.clickButtonB}</p>
      </div>
    </FrontendClientBase>
  )
})

export const getServerSideProps: GetServerSideProps<SurveyProps> = async () => {
  const data = await prisma.mitmachWoche.findMany()
  if (!data) {
    return { notFound: true }
  }

  const output: SurveyProps = {
    showPopupA: 0,
    showPopupB: 0,
    exitPopupA: 0,
    exitPopupB: 0,
    clickPopupA: 0,
    clickPopupB: 0,
    showButtonA: 0,
    showButtonB: 0,
    exitButtonA: 0,
    exitButtonB: 0,
    clickButtonA: 0,
    clickButtonB: 0,
  }

  data.forEach((entry) => {
    if (entry.isProduction) {
      /*if (entry.event === 'show') {
        shown++
      } else if (entry.event === 'yes') {
        yes++
      } else if (entry.event === 'exit') {
        exit++
      } else if (entry.event === 'rarely') {
        rarely++
      } else if (entry.event === 'no') {
        no++
      } else if (entry.event === 'noStudent') {
        noStudent++
      }*/
      if (entry.event === 'show-popup-a') {
        output.showPopupA++
      } else if (entry.event === 'show-popup-b') {
        output.showPopupB++
      } else if (entry.event === 'exit-popup-a') {
        output.exitPopupA++
      } else if (entry.event === 'exit-popup-b') {
        output.exitPopupB++
      } else if (entry.event === 'click-popup-a') {
        output.clickPopupA++
      } else if (entry.event === 'click-popup-b') {
        output.clickPopupB++
      } else if (entry.event === 'show-button-a') {
        output.showButtonA++
      } else if (entry.event === 'show-button-b') {
        output.showButtonB++
      } else if (entry.event === 'exit-button-a') {
        output.exitButtonA++
      } else if (entry.event === 'exit-button-b') {
        output.exitButtonB++
      } else if (entry.event === 'click-button-a') {
        output.clickButtonA++
      } else if (entry.event === 'click-button-b') {
        output.clickButtonB++
      } else {
        console.log(entry.event)
      }
    }
  })

  return {
    props: { ...output },
  }
}
