import { EditorModal } from '@editor/editor-ui/editor-modal'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'

export const MathHelpModal = ({
  isHelpOpen,
  setIsHelpOpen,
}: {
  isHelpOpen: boolean
  setIsHelpOpen: (isOpen: boolean) => void
}) => {
  const mathStrings = useEditStrings().plugins.text.math
  return (
    <EditorModal
      isOpen={isHelpOpen}
      setIsOpen={setIsHelpOpen}
      title={mathStrings.shortcuts}
      extraTitleClassName="serlo-h3 mt-4"
    >
      <div className="mx-side">
        <p>
          {mathStrings.fraction}: {renderKey('/')}
        </p>
        <p>
          {mathStrings.superscript}: {renderKey('↑')} {mathStrings.or}{' '}
          {renderKey('^')}
        </p>
        <p>
          {mathStrings.subscript}: {renderKey('↓')} {mathStrings.or}{' '}
          {renderKey('_')}
        </p>
        <p>
          π, α, β, γ: {renderKey('pi')}, {renderKey('alpha')},{' '}
          {renderKey('beta')},{renderKey('gamma')}
        </p>
        <p>
          ≤, ≥: {renderKey('<=')}, {renderKey('>=')}
        </p>
        <p>
          {mathStrings.root}: {renderKey('\\sqrt')}, {renderKey('\\nthroot')}
        </p>
        <p>
          {mathStrings.mathSymbols}: {renderKey('\\<NAME>')}, {mathStrings.eG}{' '}
          {renderKey('\\neq')} (≠), {renderKey('\\pm')} (±), …
        </p>
        <p>
          {mathStrings.functions}: {renderKey('sin')}, {renderKey('cos')},{' '}
          {renderKey('ln')}, …
        </p>
      </div>
    </EditorModal>
  )

  function renderKey(text: string) {
    return (
      <span className="min-w-[20px] rounded-md bg-[#ddd] px-1 py-0.5 text-center text-almost-black">
        {text}
      </span>
    )
  }
}
