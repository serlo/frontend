import { PluginToolbar } from '../plugin-toolbar'
import { OverlayButton } from './overlay-button'
import { OverlayCheckbox } from './overlay-checkbox'
import { OverlayInput } from './overlay-input'
import { OverlaySelect } from './overlay-select'
import { OverlayTextarea } from './overlay-textarea'
import { PluginToolbarButton } from './plugin-toolbar-button'
import { PluginToolbarOverlayButton } from './plugin-toolbar-overlay-button'

export function createDefaultPluginToolbar(): PluginToolbar {
  return {
    OverlayButton,
    OverlayCheckbox,
    OverlayInput,
    OverlaySelect,
    OverlayTextarea,
    PluginToolbarButton,
    PluginToolbarOverlayButton,
  }
}
