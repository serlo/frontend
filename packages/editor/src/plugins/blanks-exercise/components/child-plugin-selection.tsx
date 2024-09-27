import IconTable from '@editor/editor-ui/assets/plugin-icons/icon-table.svg'
import IconText from '@editor/editor-ui/assets/plugin-icons/icon-text.svg'
import { SelectionCard } from '@editor/editor-ui/selection-card'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useEditorStrings } from '@editor/utils/use-editor-strings'

import type { BlanksExerciseProps } from '..'

export function ChildPluginSelection({
  childPlugin,
  setShowSelection,
}: {
  childPlugin: BlanksExerciseProps['state']['text']
  setShowSelection: (show: boolean) => void
}) {
  const pluginStrings = useEditorStrings().plugins
  const description = pluginStrings.blanksExercise.childPluginSelection

  function handleClick(plugin: EditorPluginType) {
    setShowSelection(false)
    childPlugin.replace(plugin)
  }

  return (
    <>
      <div className="py-6 text-center text-gray-500">{description}</div>
      <div className="flex justify-center gap-6 [&_svg]:min-w-20">
        <SelectionCard
          onClick={() => handleClick(EditorPluginType.Text)}
          icon={<IconText />}
          title={pluginStrings.text.title}
          dataQa="plugin-blanks-child-text-button"
        />
        <SelectionCard
          onClick={() => handleClick(EditorPluginType.SerloTable)}
          icon={<IconTable />}
          title={pluginStrings.serloTable.title}
          dataQa="plugin-blanks-child-table-button"
        />
      </div>
    </>
  )
}
