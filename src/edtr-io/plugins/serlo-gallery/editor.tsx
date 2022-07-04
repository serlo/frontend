// import clsx from 'clsx'

import { PluginToolbarButton } from '@edtr-io/core'
import { faTrashAlt } from '@edtr-io/ui'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { SerloGalleryPluginProps } from '.'
import { SerloGalleryRenderer } from './renderer'
import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const SerloGalleryEditor: React.FunctionComponent<
  SerloGalleryPluginProps
> = (props) => {
  // const editorStrings = loggedInData.strings.editor
  const { images } = props.state

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null

  const imagePlugins = images.map((image, index) =>
    image.render(getPluginProps(index))
  )

  return (
    <div className="group">
      <SerloGalleryRenderer images={imagePlugins} />
      <div className=" hidden group-focus-within:block">
        {renderAddButton()}
        {images.length > 5 && renderWarning()}
      </div>
    </div>
  )

  function renderAddButton() {
    return (
      <div className="mx-side mt-2">
        <button
          className="serlo-button-light text-base w-full py-1"
          onMouseDownCapture={() => {
            images.insert()
          }}
        >
          {/* TODO: i18n */}
          <FaIcon icon={faPlusCircle} /> Add Image
        </button>
      </div>
    )
  }

  function renderRemoveButton(index: number) {
    return (
      <PluginToolbarButton
        className="text-xl"
        label="Remove Image"
        icon={<FaIcon icon={faTrashAlt} />}
        onClick={() => {
          images.remove(index)
        }}
      ></PluginToolbarButton>
    )
  }
  // TODO: should this be a soft warning or a hard limit?
  function renderWarning() {
    return (
      <div className="text-center mt-4">
        <span className="bg-amber-100 p-0.5 text-sm rounded-sm">
          ⚠️ We suggest no more than 6 images.
        </span>
      </div>
    )
  }

  function getPluginProps(index: number) {
    return {
      renderSettings(children: React.ReactNode) {
        return children
      },
      renderToolbar(children: React.ReactNode) {
        return (
          <div className="rounded-sm bg-white mr-[2px] text-center">
            {children}
            {renderRemoveButton(index)}
          </div>
        )
      },
    }
  }
}
