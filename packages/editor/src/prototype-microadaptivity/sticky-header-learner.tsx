import { SwitchButton } from '@editor/editor-ui/switch-button'
import { PrototypeStateStore } from '@editor/plugins/text-area-exercise/prototype-state'
import { useEffect, useState } from 'react'

export function StickyHeaderLearner() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [timeVisible, setTimeVisible] = useState(true)
  const silentMode = PrototypeStateStore.useState((e) => e.silentMode)

  useEffect(() => {
    if (timeLeft <= 0) return // Stop when timer reaches 0

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <div className="sticky top-2 z-50 m-5 flex w-full flex-col items-center">
        <div className="mb-5 flex flex-row gap-10 rounded-lg bg-brand-100 px-5 py-2 shadow-plugin-focus">
          <div className="flex flex-row items-center">
            {timeVisible && (
              <div className="mr-2 w-10 font-bold">{formatTime(timeLeft)}</div>
            )}
            <button
              className="rounded-md bg-brand-200 px-1 hover:bg-brand-300"
              onClick={() => {
                setTimeVisible((x) => !x)
              }}
            >
              Zeit {timeVisible ? 'ausblenden' : 'einblenden'}
            </button>
          </div>
          <div className="flex flex-row items-center gap-2">
            Hilfestellungen einblenden
            <SwitchButton
              isOn={!silentMode}
              onClick={() =>
                PrototypeStateStore.update((e) => {
                  e.silentMode = !silentMode
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}
