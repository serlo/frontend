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
          className="w-96 cursor-pointer rounded-2xl"
          onClick={() => setActive(true)}
        />
        <button
          className="serlo-button-blue mt-16 mb-20"
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
      <div className="my-20 h-[70vh] w-full bg-white">
        <iframe
          src={`https://www.learningsnacks.de/embed/${id}`}
          className="h-full w-full"
        ></iframe>
        <a
          href={`https://www.learningsnacks.de/share/${id}`}
          className="relative float-right my-4 h-5 text-center"
        >
          © siehe Snack
        </a>
      </div>
    )
  }
}
