import { Store } from 'pullstate'

import { createTextBlock } from './text-block'
import { Block } from './types'

interface PrototypeState {
  textAreaBlocks: Block[]
}

export const PrototypeStateStore = new Store<PrototypeState>({
  textAreaBlocks: [createTextBlock()],
})
