import { useHotkeys } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

interface usePluginMenuKeyboardHandlerArgs {
  enabled: boolean
  currentlyFocusedItemIndex: number
  setCurrentlyFocusedItemIndex: React.Dispatch<React.SetStateAction<number>>
  columns: number
  basicItemsLength: number
  intearctiveItemsLength: number
  searchInputRef: React.RefObject<HTMLInputElement>
}

export function usePluginMenuKeyboardHandler({
  enabled,
  currentlyFocusedItemIndex,
  setCurrentlyFocusedItemIndex,
  basicItemsLength,
  intearctiveItemsLength,
  columns,
  searchInputRef,
}: usePluginMenuKeyboardHandlerArgs) {
  const handleArrowKeyPress = (event: KeyboardEvent) => {
    const totalItems = basicItemsLength + intearctiveItemsLength
    const basicPluginsCount = basicItemsLength
    const interactivePluginsStartIndex = basicPluginsCount

    const isInBasicGrid =
      currentlyFocusedItemIndex < interactivePluginsStartIndex
    const isInInteractiveGrid =
      currentlyFocusedItemIndex >= interactivePluginsStartIndex

    const fullBasicRowsCount = Math.floor(basicPluginsCount / columns)
    const lastBasicRowItemCount = basicPluginsCount % columns
    const isInLastFullRowOfBasic =
      currentlyFocusedItemIndex >= (fullBasicRowsCount - 1) * columns &&
      currentlyFocusedItemIndex < fullBasicRowsCount * columns

    const isInFirstRowOfBasic = currentlyFocusedItemIndex < columns
    const isInLastRowOfBasic =
      currentlyFocusedItemIndex >= fullBasicRowsCount * columns &&
      currentlyFocusedItemIndex < basicPluginsCount
    const isInFirstRowOfInteractive =
      currentlyFocusedItemIndex >= interactivePluginsStartIndex &&
      currentlyFocusedItemIndex < interactivePluginsStartIndex + columns

    switch (event.key) {
      case Key.ArrowDown:
        if (isInBasicGrid) {
          if (isInLastRowOfBasic) {
            const indexInFirstInteractiveRow =
              currentlyFocusedItemIndex % columns
            setCurrentlyFocusedItemIndex(
              interactivePluginsStartIndex + indexInFirstInteractiveRow
            )
          } else if (
            isInLastFullRowOfBasic &&
            currentlyFocusedItemIndex % columns >= lastBasicRowItemCount
          ) {
            setCurrentlyFocusedItemIndex(fullBasicRowsCount * columns)
          } else {
            setCurrentlyFocusedItemIndex((prev: number) =>
              Math.min(prev + columns, totalItems - 1)
            )
          }
        } else if (isInInteractiveGrid) {
          setCurrentlyFocusedItemIndex((prev) =>
            Math.min(prev + columns, totalItems - 1)
          )
        }
        break

      case Key.ArrowUp:
        if (isInInteractiveGrid) {
          if (isInFirstRowOfInteractive) {
            const indexInLastRowOfBasic =
              (currentlyFocusedItemIndex - interactivePluginsStartIndex) %
              columns
            if (indexInLastRowOfBasic < lastBasicRowItemCount) {
              setCurrentlyFocusedItemIndex(
                fullBasicRowsCount * columns + indexInLastRowOfBasic
              )
            } else {
              setCurrentlyFocusedItemIndex(
                fullBasicRowsCount * columns + lastBasicRowItemCount - 1
              )
            }
          } else {
            setCurrentlyFocusedItemIndex((prev) => Math.max(prev - columns, 0))
          }
        } else if (isInBasicGrid) {
          if (isInFirstRowOfBasic) {
            searchInputRef.current?.focus()
          } else {
            setCurrentlyFocusedItemIndex((prev) => Math.max(prev - columns, 0))
          }
        }
        break

      case Key.ArrowLeft:
        setCurrentlyFocusedItemIndex((prev) => Math.max(prev - 1, 0))
        break

      case Key.ArrowRight:
        setCurrentlyFocusedItemIndex((prev) =>
          Math.min(prev + 1, totalItems - 1)
        )
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
      scopes: ['global'],
      enableOnContentEditable: true,
    },
    [currentlyFocusedItemIndex]
  )
}
