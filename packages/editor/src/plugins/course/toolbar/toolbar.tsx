// import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { type CourseProps } from '..'

// WIP
export const CourseToolbar = ({ id, state }: CourseProps) => {
  return (
    <>
      {id}
      {state}
    </>
  )
  // const pluginSettings = (
  //   <ToolbarSelect
  //     tooltipText={exTemplateStrings.changeInteractive}
  //     value={currentlySelected ?? ''}
  //     changeValue={(value) => {
  //       if (interactive.defined)
  //         interactive.replace(value as InteractiveCourseType)
  //     }}
  //     options={interactiveCourseTypes.map((type) => ({
  //       value: type,
  //       text: exTemplateStrings[type],
  //     }))}
  //   />
  // )

  // return (
  //   <PluginToolbar
  //     pluginType={EditorPluginType.Course}
  //     pluginControls={
  //       <>
  //         {/* <PluginDefaultTools pluginId={id} />
  //         {state.interactive.defined ? (
  //           <>
  //             <div className="m-2 h-0.25 bg-gray-500"></div>
  //             <DropdownButton
  //               onClick={() => {
  //                 if (state.hideInteractiveInitially.defined) {
  //                   state.hideInteractiveInitially.remove()
  //                 } else state.hideInteractiveInitially.create(true)
  //               }}
  //               label={
  //                 exPluginStrings.hideInteractiveInitially[
  //                   state.hideInteractiveInitially.defined
  //                     ? 'deactivate'
  //                     : 'activate'
  //                 ]
  //               }
  //               icon={
  //                 state.hideInteractiveInitially.defined ? faEye : faEyeSlash
  //               }
  //               dataQa="toggle-interactive-default-visibility"
  //             />
  //           </>
  //         ) : null} */}
  //       </>
  //     }
  //     pluginSettings={pluginSettings}
  //     className="mt-2.5"
  //   />
  // )
}
