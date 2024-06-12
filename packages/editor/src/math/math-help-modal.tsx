import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'

export const MathHelpModal = ({
  isHelpOpen,
  setIsHelpOpen,
}: {
  isHelpOpen: boolean
  setIsHelpOpen: (isOpen: boolean) => void
}) => {
  const mathStrings = useEditorStrings().plugins.text.math
  return (
    <ModalWithCloseButton isOpen={isHelpOpen} setIsOpen={setIsHelpOpen}>
      <>
        {mathStrings.shortcuts}:
        <br />
        <br />
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
      </>
    </ModalWithCloseButton>
  )

  function renderKey(text: string) {
    return (
      <span className="min-w-[20px] rounded-md bg-[#ddd] px-1 py-0.5 text-center text-almost-black">
        {text}
      </span>
    )
  }
}
