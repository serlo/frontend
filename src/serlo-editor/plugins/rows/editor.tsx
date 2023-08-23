import type { RowsProps } from '.'
import { AllowedChildPlugins } from './allowed-child-plugins-context'
import { RowEditor } from './components/row-editor'

export function RowsEditor({ state, config, editable }: RowsProps) {
  if (!editable) {
    return (
      <>
        {state.map((row) => (
          <div key={row.id} className="my-block pl-[14px]">
            {row.render()}
          </div>
        ))}
      </>
    )
  }

  return (
    <AllowedChildPlugins.Provider value={config.allowedPlugins}>
      <div className="relative mt-[25px]">
        {state.map((row, index) => (
          <RowEditor
            config={config}
            key={row.id}
            index={index}
            rows={state}
            row={row}
          />
        ))}
      </div>
    </AllowedChildPlugins.Provider>
  )
}
