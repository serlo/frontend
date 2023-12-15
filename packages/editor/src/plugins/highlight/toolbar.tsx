import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { PluginToolbar } from '@editor/editor-ui/plugin-toolbar'
import { PluginDefaultTools } from '@editor/editor-ui/plugin-toolbar/plugin-tool-menu/plugin-default-tools'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { cn } from '@serlo/frontend/src/helper/cn'

import type { HighlightProps } from '.'

const languages = ['text', 'c', 'javascript', 'jsx', 'markup', 'java', 'python']

export const HighlightToolbar = ({ id, state }: HighlightProps) => {
  const highlightStrings = useEditorStrings().plugins.highlight

  return (
    <PluginToolbar
      pluginType={EditorPluginType.Highlight}
      pluginSettings={
        <>
          <div className="serlo-tooltip-trigger">
            <EditorTooltip
              text={highlightStrings.languageTooltip}
              className="-ml-4 !pb-1"
            />
            <select
              onChange={(e) => state.language.set(e.target.value)}
              className={cn(`
                mr-2 cursor-pointer rounded-md !border border-gray-500 bg-editor-primary-100
                px-1 py-[1px] text-sm transition-all
              hover:bg-editor-primary-200 focus:bg-editor-primary-200 focus:outline-none
              `)}
              value={state.language.value}
            >
              {languages.map((language) => {
                return (
                  <option
                    key={language}
                    value={language}
                    className="capitalize"
                  >
                    {language}
                  </option>
                )
              })}
            </select>
          </div>
          <button
            onClick={() => {
              state.showLineNumbers.set(!state.showLineNumbers.value)
            }}
            className="serlo-tooltip-trigger mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200"
          >
            <EditorTooltip
              text={highlightStrings.lineNumbersTooltip}
              className="-ml-5 !pb-1"
            />
            {highlightStrings.showLineNumbers}{' '}
            <FaIcon
              icon={state.showLineNumbers.value ? faCheckCircle : faCircle}
            />
          </button>
        </>
      }
      pluginControls={<PluginDefaultTools pluginId={id} />}
    />
  )
}
