import { cn } from '@serlo/frontend/src/helper/cn'
import Script from 'next/script'
import { useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'

export interface GeogebraRendererProps {
  geogebraId: string
  url: string
}

export function GeogebraRenderer({ geogebraId, url }: GeogebraRendererProps) {
  const [uuid] = useState(uuid_v4())
  const elementId = `ggb-element-${uuid}`
  const containerId = `${elementId}-container`

  return (
    <>
      <Script
        src="https://www.geogebra.org/apps/deployggb.js"
        onReady={() => {
          // https://wiki.geogebra.org/en/Reference:GeoGebra_App_Parameters
          const params = {
            appName: '…',
            showToolBar: false,
            showAlgebraInput: false,
            showMenuBar: false,
            material_id: geogebraId,
            showResetIcon: true,
            enableLabelDrags: false,
            enableShiftDragZoom: false,
            enableRightClick: false,
            capturingThreshold: null,
            showToolBarHelp: false,
            errorDialogsActive: true,
            useBrowserForJS: false,
            enableFileFeatures: false,
            borderColor: 'transparent',
            scaleContainerClass: containerId,
          }

          // deployggb.js will define 'GGBApplet' on the global object. We use 'globalThis' instead of 'global' or 'window' for compatibility.
          // https://javascript.info/global-object
          // Using 'global' lead to error 'global not defined' in editor package when using vite.
          if (Object.hasOwn(globalThis, 'GGBApplet')) {
            //@ts-expect-error no types for Geogebra script
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            const applet = new globalThis.GGBApplet(params, true)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            applet.inject(elementId)
          }
        }}
      />
      <div
        className={cn(
          `${containerId} absolute top-0 flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-brand-50 p-0`
        )}
      >
        {url ? <div id={`${elementId}`} className="mx-auto"></div> : null}
      </div>
    </>
  )
}

export function parseId(idOrUrl: string) {
  const id = idOrUrl.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + id
  return { cleanId: id, url }
}
