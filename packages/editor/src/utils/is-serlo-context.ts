import { createContext } from 'react'

/** used to enable features only in a serlo context and not e.g. on edusharing */
export const IsSerloContext = createContext<boolean>(false)
