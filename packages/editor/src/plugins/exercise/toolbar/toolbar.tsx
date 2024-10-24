import { PluginToolbar, PreviewButton } from '@editor/editor-ui/plugin-toolbar'
import { DropdownButton } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/dropdown-button'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { getPluginTitle } from '@editor/plugin/helpers/get-plugin-title'
import { selectStaticDocument, useStore } from '@editor/store'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import {
  faArrowsRotate,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'

import type { ExerciseProps } from '..'

export const ExerciseToolbar = ({
  id,
  state,
  previewActive,
  setPreviewActive,
}: ExerciseProps & {
  previewActive: boolean
  setPreviewActive: (active: boolean) => void
}) => {
  const { interactive, hideInteractiveInitially } = state
  const pluginStrings = useEditStrings().plugins
  const store = useStore()
  const exStrings = pluginStrings.exercise

  function getToolbarTitle() {
    if (!interactive.defined) return undefined
    const interactiveType = selectStaticDocument(
      store.getState(),
      interactive.id
    ).plugin
    return `${getPluginTitle(pluginStrings, 'exercise')}: ${getPluginTitle(pluginStrings, interactiveType)}`
  }

  const pluginSettings = interactive.defined ? (
    <>
      <PreviewButton
        previewActive={previewActive}
        setPreviewActive={setPreviewActive}
      />
      <div className="exercise-toolbar-interactive-target" />
    </>
  ) : undefined

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Exercise}
      pluginTitle={getToolbarTitle()}
      pluginControls={
        <>
          <PluginDefaultTools pluginId={id} />
          {interactive.defined ? (
            <>
              <DropdownButton
                separatorTop
                onClick={() => {
                  if (window.confirm(exStrings.confirmRemoveInteractive)) {
                    interactive.remove()
                  }
                }}
                label={exStrings.changeInteractive}
                icon={faArrowsRotate}
                dataQa="change-interactive-button"
              />
              <DropdownButton
                onClick={() => {
                  if (hideInteractiveInitially.defined) {
                    hideInteractiveInitially.remove()
                  } else hideInteractiveInitially.create(true)
                }}
                label={
                  exStrings.hideInteractiveInitially[
                    hideInteractiveInitially.defined ? 'deactivate' : 'activate'
                  ]
                }
                icon={hideInteractiveInitially.defined ? faEye : faEyeSlash}
                dataQa="toggle-interactive-default-visibility"
              />
            </>
          ) : null}
        </>
      }
      pluginSettings={pluginSettings}
      // make sure exercise toolbar shows over child plugin toolbars
      className="!z-[22] mt-2.5"
    />
  )
}
