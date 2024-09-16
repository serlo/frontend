import {
  faArrowUpFromBracket,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'

import { SelectMediaPanelButton } from './button'
import { SelectMediaByUrl } from './select-by-url'
import { Embed, Resource } from '../services/types'
import { cn } from '@/helper/cn'

interface SelectMediaPanelProps {
  extraClassName?: string
  onSelect: (resource: Resource) => void
  allowEmbedding?: Embed[]
}

export function SelectMediaPanel({
  onSelect,
  extraClassName,
  allowEmbedding,
}: SelectMediaPanelProps) {
  return (
    <div
      className={cn(
        'almost-black flex flex-col items-center space-y-4 bg-yellow-50 p-8',
        extraClassName
      )}
    >
      <SelectMediaPanelButton
        onClick={() => void 0}
        icon={faArrowUpFromBracket}
        label="Datei hochladen"
      />
      <SelectMediaPanelButton
        onClick={() => void 0}
        icon={faSearch}
        label="Datei suchen"
      />
      <SelectMediaByUrl onSelect={onSelect} allowEmbedding={allowEmbedding} />
    </div>
  )
}
