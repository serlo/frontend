import { createContext, useContext } from 'react'

export interface UuidsContextData {
  entityId?: number
  revisionId?: number
}

export const UuidsContext = createContext<UuidsContextData | null>(null)

UuidsContext['Provider']['propTypes']

export const UuidsProvider = UuidsContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

/** Provides entity ID & revision ID of the Serlo entity in our database.
 *
 * Examples:
 * - On an article page like '.../mathe/75512/rechentricks-für-die-addition' this will return ID:'75512' & revision:'undefined'.
 * - On a page rendering multiple exercises (each having a Serlo entity ID) this will return the corresponding information depending on where you are
 * - On a page not linked to any Serlo entity like '.../math' this will return undefined
 */
export function useEntityData() {
  const data = useContext(UuidsContext)
  if (data === null) throw new Error(errorMessage)
  return data
}
