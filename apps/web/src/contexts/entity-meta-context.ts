import { createContext, useContext } from 'react'

export interface EntityMetaContextData {
  entityId?: number
  revisionId?: number
  licenseId?: number
}

export const EntityMetaContext = createContext<EntityMetaContextData | null>(
  null
)

export const EntityMetaProvider = EntityMetaContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

/** Provides entityId, revisionId and licenseId of the current serlo entity
 *
 * Examples:
 * - On an article page like '.../mathe/75512/rechentricks-für-die-addition' this will return ID:'75512' & revision:'undefined'.
 * - On a page rendering multiple exercises (each having a Serlo entity ID) this will return the corresponding information depending on where you are
 * - On a page not linked to any Serlo entity like '.../math' this will return undefined
 */
export function useEntityMetaData() {
  const data = useContext(EntityMetaContext)
  if (data === null) throw new Error(errorMessage)
  return data
}
