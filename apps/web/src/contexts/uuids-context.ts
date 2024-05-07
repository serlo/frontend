import { createContext, useContext } from 'react'

import { UuidType } from '@/data-types'

// Provides ID & type & revision ID of the Serlo entity in our database. Examples:
// - On an article page like '.../mathe/75512/rechentricks-für-die-addition' this will return ID:'75512' & type:'Article' & revision:'undefined'.
// - On a page rendering multiple exercises (each having a Serlo entity ID) this will return the corresponding information depending on where you are
// - On a page not linked to any Serlo entity like '.../math' this will return undefined

export const UuidsContext = createContext<{
  entity: { entityId?: number; entityType?: UuidType }
  revisionId?: number
} | null>(null)

export const UuidsProvider = UuidsContext.Provider

const errorMessage = 'attempted to use uuid data outside of provider!'

export function useEntityId() {
  const data = useContext(UuidsContext)
  if (data === null) {
    throw new Error(errorMessage)
  }
  return data.entity.entityId
}

export function useEntityType() {
  const data = useContext(UuidsContext)
  if (data === null) {
    throw new Error(errorMessage)
  }
  return data.entity.entityType
}

export function useRevisionId() {
  const data = useContext(UuidsContext)
  if (data === null) {
    throw new Error(errorMessage)
  }
  return data.revisionId
}
