import Modal from 'react-modal'

import { useEditorStrings } from '@/contexts/logged-in-data-context'

export const MathHelpModal = ({
  isHelpOpen,
  setIsHelpOpen,
}: {
  isHelpOpen: boolean
  setIsHelpOpen: (isOpen: boolean) => void
}) => {
  const mathStrings = useEditorStrings().plugins.text.math
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isHelpOpen}
      onRequestClose={() => void setIsHelpOpen(false)}
      style={{
        overlay: {
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        content: {
          borderRadius: 0,
          backgroundColor: '#ffffff',
          width: '90%',
          maxWidth: '600px',
          maxHeight: 'calc(100vh - 80px)',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          margin: '0 auto',
        },
      }}
    >
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
    </Modal>
  )

  function renderKey(text: string) {
    return (
      <span className="min-w-[20px] rounded-md bg-[#ddd] px-1 py-0.5 text-center text-almost-black">
        {text}
      </span>
    )
  }
}
