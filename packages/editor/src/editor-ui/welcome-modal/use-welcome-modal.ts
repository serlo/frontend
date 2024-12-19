import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import * as t from 'io-ts'
import { useEffect, useState } from 'react'

const localStorageKey = 'serlo-editor::hasUserSeenWelcomeModal'

export const useWelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const localStorageValue = localStorage.getItem(localStorageKey)
    if (localStorageValue === null) return setIsOpen(true)
    const hasSeenModal = decodeWelcomeModalData(localStorageValue)
    if (!hasSeenModal) setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem(localStorageKey, 'true')
  }

  return { isOpen, onClose: handleClose }
}

const WelcomeModalDataCodec = t.boolean

function decodeWelcomeModalData(input: string) {
  return pipe(
    WelcomeModalDataCodec.decode(JSON.parse(input)),
    fold(
      () => false,
      (decoded) => decoded
    )
  )
}
