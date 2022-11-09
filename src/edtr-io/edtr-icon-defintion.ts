import { createIcon } from '@edtr-io/ui'

// hack until edtr uses current fontawesome version
export type EdtrIconDefinition = Parameters<typeof createIcon>[0]
