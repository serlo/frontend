import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'

import { cn } from '@/helper/cn'

interface RemoveImageButtonProps {
  onClick: () => void
}

export function RemoveImageButton({ onClick }: RemoveImageButtonProps) {
  return (
    <button
      className={cn(
        'pointer-events-auto absolute right-4 top-4 h-8 w-8 rounded-full p-1',
        'bg-black bg-opacity-20 text-white hover:bg-opacity-50'
      )}
      onClick={onClick}
    >
      <FaIcon icon={faTrashCan} className="text-sm" />
    </button>
  )
}
