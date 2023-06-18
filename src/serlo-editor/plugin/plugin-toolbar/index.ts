/**
 * Defines the Interface for the Serlo Editor plugin toolbar
 *
 * The `plugin-toolbar` defines the interface that needs to be implemented
 * to provide a custom plugin toolbar. See `default-plugin-toolbar`
 * for the default plugin toolbar used by Serlo Editor
 */
import * as InternalPluginToolbar from '../../types/internal__plugin-toolbar'

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#PluginToolbarButtonProps | PluginToolbarButtonProps}
 *
 */
export type PluginToolbarButtonProps =
  InternalPluginToolbar.PluginToolbarButtonProps

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#PluginToolbarOverlayButtonProps | PluginToolbarOverlayButtonProps}
 *
 */
export type PluginToolbarOverlayButtonProps =
  InternalPluginToolbar.PluginToolbarOverlayButtonProps

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#OverlayButtonProps | OverlayButtonProps}
 *
 */
export type OverlayButtonProps = InternalPluginToolbar.OverlayButtonProps

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#OverlayCheckboxProps | OverlayCheckboxProps}
 *
 */
export type OverlayCheckboxProps = InternalPluginToolbar.OverlayCheckboxProps

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#OverlayInputProps | OverlayInputProps}
 *
 */
export type OverlayInputProps = InternalPluginToolbar.OverlayInputProps

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#OverlaySelectProps | OverlaySelectProps}
 *
 */
export type OverlaySelectProps = InternalPluginToolbar.OverlaySelectProps

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#OverlayTextareaProps | OverlayTextareaProps}
 *
 */
export type OverlayTextareaProps = InternalPluginToolbar.OverlayTextareaProps

/**
 * Type alias for {@link @edtr-io/internal__plugin-toolbar#PluginToolbar | PluginToolbar}
 *
 */
export type PluginToolbar = InternalPluginToolbar.PluginToolbar
