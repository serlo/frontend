import Script from 'next/script'
import { useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'

import { cn } from '@/helper/cn'

export interface GeogebraRendererProps {
  geogebraId: string
  url: string
}

export function GeogebraRenderer({ geogebraId, url }: GeogebraRendererProps) {
  const [uuid] = useState(uuid_v4())
  const id = `ggb-element-${uuid}`
  const containerId = `${id}-container`

  return (
    <>
      <Script
        src="https://www.geogebra.org/apps/deployggb.js"
        onReady={() => {
          // https://wiki.geogebra.org/en/Reference:GeoGebra_App_Parameters
          const params = {
            // @@@ This value is invalid according to docs. Change? 
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
            applet.inject(id)
          }
        }}
      />
      <div className='w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-50 p-1'>
        <div className={cn(containerId, 'w-full h-full')}>
          {url ? (
            <div
              id={id}
              data-ggb-id={geogebraId}
              className="mx-auto"
            ></div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export function parseId(idOrUrl: string) {
  const id = idOrUrl.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + id
  return { cleanId: id, url }
}
