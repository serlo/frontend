import { useState } from 'react'

import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface SnackProps {
  id: number
}

export function Snack({ id }: SnackProps) {
  const [active, setActive] = useState(false)
  const { strings } = useInstanceData()

  if (!active) {
    return (
      <div className="flex flex-col items-center">
        <img
          src="https://assets.serlo.org/60c866871453d_2cfd88a1c1e0d977c69240ba81c35279b9faa46f.jpg"
          className="rounded-2xl w-96 cursor-pointer"
          onClick={() => setActive(true)}
        />
        <button
          className="serlo-button serlo-make-interactive-primary mt-16 mb-20"
          onClick={() => setActive(true)}
        >
          Snack starten!
        </button>
        <small>
          {replacePlaceholders(strings.embed.text, {
            provider: <b>Learning Snacks</b>,
            privacypolicy: (
              <a href="/privacy" target="_blank" className="underline">
                {strings.entities.privacyPolicy}
              </a>
            ),
          })}
        </small>
      </div>
    )
  } else {
    return (
      <div className="bg-white my-20" style={{ height: '70vh', width: '100%' }}>
        <iframe
          src={`https://www.learningsnacks.de/embed/${id}`}
          style={{ width: '100%', height: '100%' }}
        ></iframe>
        <a
          href={`https://www.learningsnacks.de/share/${id}`}
          className="relative my-4 h-5 text-center float-right"
        >
          © siehe Snack
        </a>
      </div>
    )
  }
}
