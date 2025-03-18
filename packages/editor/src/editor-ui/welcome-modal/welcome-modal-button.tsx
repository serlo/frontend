import { cn } from '@editor/utils/cn'

interface WelcomeModalButtonProps {
  isActive: boolean
  onClick: () => void
}

export function WelcomeModalButton(props: WelcomeModalButtonProps) {
  const { isActive, onClick } = props

  return (
    <button
      className={cn(
        'h-4 w-4 rounded-full transition-all',
        isActive ? 'w-8 bg-brand-600' : 'border-2 border-brand-600'
      )}
      onClick={onClick}
    />
  )
}
