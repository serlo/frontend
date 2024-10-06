import { cn } from '@editor/utils/cn'
import { memo, useEffect, useState } from 'react'
import { v4 as uuid_v4 } from 'uuid'

export interface GeogebraRendererProps {
  geogebraId: string
}

// Only re-render if props.geogebraId changes. Reason: Geogebra applet has its own state that is not managed by react. On re-render this state would get lost, meaning the applet would reset.
export const GeogebraRenderer = memo(
  GeogebraRenderer_,
  (previousProps, nextProps) =>
    previousProps.geogebraId === nextProps.geogebraId
)

function GeogebraRenderer_({ geogebraId }: GeogebraRendererProps) {
  const [uuid] = useState(uuid_v4())
  const elementId = `ggb-element-${uuid}`
  const containerId = `${elementId}-container`

  // Inject geogebra applet into dom
  useEffect(() => {
    const geogebraAvailable = Object.hasOwn(globalThis, 'GGBApplet')
    if (geogebraAvailable) {
      injectGeogebra()
    } else {
      fetchScriptAndInitializeGeogebra()
        .then(injectGeogebra)
        .catch(() =>
          // eslint-disable-next-line no-console
          console.error(
            'Failed to fetch Geogebra script deployggb.js. Geogebra applet will not be visible.'
          )
        )
    }

    function injectGeogebra() {
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

      //@ts-expect-error no types for Geogebra script
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const applet = new globalThis.GGBApplet(params, true)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      applet.inject(elementId)
    }

    async function fetchScriptAndInitializeGeogebra() {
      return new Promise<void>((resolve, reject) => {
        // deployggb.js will define 'GGBApplet' on the global object. We use 'globalThis' instead of 'global' or 'window' for compatibility.
        // https://javascript.info/global-object
        // Using 'global' lead to error 'global not defined' in editor package when using vite.
        const scriptTag = document.createElement('script')
        scriptTag.src = 'https://www.geogebra.org/apps/deployggb.js'
        scriptTag.addEventListener('load', () => {
          resolve()
        })
        scriptTag.addEventListener('error', () => {
          reject()
        })
        document.body.appendChild(scriptTag)
      })
    }
  }, [geogebraId, containerId, elementId])

  return (
    <>
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-brand-50 p-1">
        <div
          className={cn(
            containerId,
            'flex h-full w-full flex-col justify-center'
          )}
        >
          <div
            id={elementId}
            data-ggb-id={geogebraId}
            className="mx-auto"
          ></div>
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
