import { useHotkeys } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

interface usePluginMenuKeyboardHandlerArgs {
  enabled: boolean
  focusedItemIndex: number | null
  setFocusedItemIndex: React.Dispatch<React.SetStateAction<number | null>>
  columns: number
  basicItemsLength: number
  intearctiveItemsLength: number
  searchInputRef: React.RefObject<HTMLInputElement>
}

export function usePluginMenuKeyboardHandler({
  enabled,
  focusedItemIndex,
  setFocusedItemIndex,
  basicItemsLength,
  intearctiveItemsLength,
  columns,
  searchInputRef,
}: usePluginMenuKeyboardHandlerArgs) {
  const handleArrowKeyPress = (event: KeyboardEvent) => {
    const totalItems = basicItemsLength + intearctiveItemsLength
    const basicPluginsCount = basicItemsLength
    const interactivePluginsStartIndex = basicPluginsCount
    const assumedItemIndex = focusedItemIndex ?? 0

    const isInBasicGrid = assumedItemIndex < interactivePluginsStartIndex
    const isInInteractiveGrid = assumedItemIndex >= interactivePluginsStartIndex

    const fullBasicRowsCount = Math.floor(basicPluginsCount / columns)
    const lastBasicRowItemCount = basicPluginsCount % columns
    const isInLastFullRowOfBasic =
      assumedItemIndex >= (fullBasicRowsCount - 1) * columns &&
      assumedItemIndex < fullBasicRowsCount * columns

    const isInFirstRowOfBasic = assumedItemIndex < columns
    const isInLastRowOfBasic =
      assumedItemIndex >= fullBasicRowsCount * columns &&
      assumedItemIndex < basicPluginsCount
    const isInFirstRowOfInteractive =
      assumedItemIndex >= interactivePluginsStartIndex &&
      assumedItemIndex < interactivePluginsStartIndex + columns

    switch (event.key) {
      case Key.ArrowDown:
        if (isInBasicGrid) {
          if (isInLastRowOfBasic) {
            const indexInFirstInteractiveRow = assumedItemIndex % columns
            setFocusedItemIndex(
              interactivePluginsStartIndex + indexInFirstInteractiveRow
            )
          } else if (
            isInLastFullRowOfBasic &&
            assumedItemIndex % columns >= lastBasicRowItemCount
          ) {
            setFocusedItemIndex(fullBasicRowsCount * columns)
          } else {
            setFocusedItemIndex((prev) =>
              Math.min((prev ?? 0) + columns, totalItems - 1)
            )
          }
        } else if (isInInteractiveGrid) {
          setFocusedItemIndex((prev) =>
            Math.min((prev ?? 0) + columns, totalItems - 1)
          )
        }
        break

      case Key.ArrowUp:
        if (isInInteractiveGrid) {
          if (isInFirstRowOfInteractive) {
            const indexInLastRowOfBasic =
              (assumedItemIndex - interactivePluginsStartIndex) % columns
            if (indexInLastRowOfBasic < lastBasicRowItemCount) {
              setFocusedItemIndex(
                fullBasicRowsCount * columns + indexInLastRowOfBasic
              )
            } else {
              setFocusedItemIndex(
                fullBasicRowsCount * columns + lastBasicRowItemCount - 1
              )
            }
          } else {
            setFocusedItemIndex((prev) => Math.max((prev ?? 0) - columns, 0))
          }
        } else if (isInBasicGrid) {
          if (isInFirstRowOfBasic) {
            searchInputRef.current?.focus()
          } else {
            setFocusedItemIndex((prev) => Math.max((prev ?? 0) - columns, 0))
          }
        }
        break

      case Key.ArrowLeft:
        setFocusedItemIndex((prev) => Math.max((prev ?? 0) - 1, 0))
        break

      case Key.ArrowRight:
        setFocusedItemIndex((prev) => Math.min((prev ?? 0) + 1, totalItems - 1))
        break

      default:
        break
    }
  }

  useHotkeys(
    [Key.ArrowUp, Key.ArrowDown, Key.ArrowLeft, Key.ArrowRight],
    handleArrowKeyPress,
    {
      enabled,
      preventDefault: true,
      enableOnContentEditable: true,
    }
  )
}
