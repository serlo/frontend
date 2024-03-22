import { useEffect, useState } from 'react'

import { cn } from '@/helper/cn'

export function RealmathInjection({
  url,
  height,
  onClose,
  target,
}: {
  url: string
  height?: number
  onClose: () => void
  target: number
}) {
  const [score, setScore] = useState(-1)

  function handler(e: MessageEvent) {
    if (typeof e.data === 'string') {
      const str = e.data
      if (str.startsWith('score')) {
        const score = parseInt(str.slice(5))
        if (!isNaN(score) && score > 0) {
          setScore(score)
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('message', handler)
    return () => {
      window.removeEventListener('message', handler)
    }
  }, [])
  return (
    <>
      <div className="mb-4 mt-12 w-full rounded bg-gray-100 p-3">
        {score < target ? (
          <>
            Erreiche {target} Punkte. Aktueller Stand:{' '}
            <strong>{Math.max(score, 0)} Punkte</strong>
          </>
        ) : (
          <div className="text-center">
            <button
              className=" rounded bg-newgreen px-2 py-0.5 font-bold hover:bg-newgreen-600"
              onClick={onClose}
            >
              Super, Aufgabe abschließen
            </button>
          </div>
        )}
      </div>
      <iframe
        src={`/api/frontend/realmath/embed?url=${encodeURIComponent(url)}`}
        className={cn(
          'mb-8 w-full rounded-xl border-3',
          score >= target && 'opacity-35'
        )}
        style={{ height: `${height ?? 450}px` }}
      ></iframe>
    </>
  )
}
