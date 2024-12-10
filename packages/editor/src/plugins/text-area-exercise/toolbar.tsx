import { type TextAreaExerciseProps } from '.'
import { InteractiveToolbarPortal } from '../exercise/toolbar/interactive-toolbar-portal'

export function TextAreaExerciseToolbar({
  containerRef,
}: TextAreaExerciseProps) {
  // TODO: Plugin strings
  // const pluginsStrings = useEditStrings().plugins
  // const textAreaExerciseStrings = pluginsStrings.textAreaExercise

  // const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

  return (
    // Render into exercise toolbar
    <InteractiveToolbarPortal containerRef={containerRef}>
      <>
        {/* <button
          onClick={() => setShowSettingsModal(true)}
          className={cn(
            `mr-2 rounded-md border border-gray-500 px-1 text-sm transition-all hover:bg-editor-primary-200 focus-visible:bg-editor-primary-200`
          )}
        >
          Einstellungen <FaIcon icon={faCog} />
        </button>
        {renderSettingsModal()} */}
      </>
    </InteractiveToolbarPortal>
  )

  // function renderSettingsModal() {
  //   return (
  //     <EditorModal
  //       isOpen={showSettingsModal}
  //       setIsOpen={(open) => {
  //         const isModalClosing = !open
  //         if (isModalClosing) setShowSettingsModal(false)
  //       }}
  //       title="Title"
  //       extraTitleClassName="serlo-h3 mt-4"
  //       className="top-8 max-w-xl translate-y-0 sm:top-20"
  //     >
  //       {/* <OverlayInput
  //         label="Test"
  //         autoFocus
  //         placeholder="Test"
  //         value=""
  //         disabled
  //         onChange={(e) => null}
  //       /> */}
  //       <NiceDropdown
  //         options={[
  //           { label: 'Scaffolding', value: 'Scaffolding' },
  //           { label: 'No Scaffolding', value: 'No Scaffolding' },
  //         ]}
  //         onChange={(newValue) => {
  //           state.scaffoldingEnabled.set(
  //             newValue === 'Scaffolding' ? true : false
  //           )
  //         }}
  //         label="Scaffolding"
  //         helpText="Test"
  //         defaultValue={
  //           state.scaffoldingEnabled.value ? 'Scaffolding' : 'No Scaffolding'
  //         }
  //       />
  //     </EditorModal>
  //   )
  // }
}
