import { cn } from '@/helper/cn'

export function SwitchButton({
  isOn,
  onClick,
}: {
  isOn: boolean
  onClick: () => void
}) {
  return (
    <button
      className="inline-block cursor-pointer align-bottom"
      onClick={onClick}
    >
      <div
        className={cn(
          'flex h-6 w-12 rounded-full bg-gray-300 p-1 duration-300 ease-in-out',
          isOn && 'bg-green-400'
        )}
      >
        <div
          className={cn(
            'h-4 w-4 transform rounded-full bg-white shadow-md duration-300 ease-in-out',
            isOn && 'translate-x-6'
          )}
        ></div>
      </div>
    </button>
  )
}
