import { cn } from '@/helper/cn'

export function NumberKeyboard({
  addCharacter,
  removeCharacter,
  isDisabled,
}: {
  addCharacter: (char: string) => void
  removeCharacter: () => void
  isDisabled?: boolean
}) {
  return (
    <nav
      className={cn(
        'mt-6 border-t border-t-gray-200 pt-6',
        isDisabled && 'pointer-events-none opacity-30'
      )}
    >
      <div>{[1, 2, 3, 4, 5].map((number) => renderButton(String(number)))}</div>
      <div className="mt-2">
        {[6, 7, 8, 9, 0].map((number) => renderButton(String(number)))}
        <span className="relative -top-5">
          {renderButton('⌫', removeCharacter)}
        </span>
      </div>
    </nav>
  )

  function renderButton(label: string, onClick?: () => void) {
    return (
      <button
        onClick={onClick ? onClick : () => addCharacter(label)}
        className="serlo-button-light me-2 h-10 w-10"
      >
        {label}
      </button>
    )
  }
}
