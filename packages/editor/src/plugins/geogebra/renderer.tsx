import Script from 'next/script'

import { cn } from '@serlo/frontend/src/helper/cn'

export interface GeogebraRendererProps {
  id: string
  url: string
}

export function GeogebraRenderer({ id, url }: GeogebraRendererProps) {
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
            material_id: id,
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
            scaleContainerClass: `geogebra-scaler-${id}`,
          }

          if (Object.hasOwn(global, 'GGBApplet')) {
            //@ts-expect-error no types for Geogebra script
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            const applet = new window.GGBApplet(params, true)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            applet.inject(`ggb-element-${id}`)
          }
        }}
      />
      <div
        className={cn(`geogebra-scaler-${id} absolute top-0 flex h-full w-full
        items-center justify-center
        overflow-hidden rounded-xl bg-brand-50 p-0`)}
      >
        {url ? <div id={`ggb-element-${id}`} className="mx-auto"></div> : null}
      </div>
    </>
  )
}

export function parseId(idOrUrl: string) {
  const id = idOrUrl.replace('https://www.geogebra.org/m/', '')
  const url = 'https://www.geogebra.org/material/iframe/id/' + id
  return { cleanId: id, url }
}
