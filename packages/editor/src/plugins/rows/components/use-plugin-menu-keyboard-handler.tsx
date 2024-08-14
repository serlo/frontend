import { useHotkeys } from 'react-hotkeys-hook'
import { Key } from 'ts-key-enum'

interface usePluginMenuKeyboardHandlerProps {
  currentlyFocusedItem: number
  setCurrentlyFocusedItem: React.Dispatch<React.SetStateAction<number>>
  columns: number
  basicItemsLength: number
  intearctiveItemsLength: number
  searchInputRef: React.RefObject<HTMLInputElement>
}

const hotkeyConfig = {
  enableOnContentEditable: true,
  scopes: ['global'],
}
export function usePluginMenuKeyboardHandler({
  currentlyFocusedItem,
  setCurrentlyFocusedItem,
  basicItemsLength,
  intearctiveItemsLength,
  columns,
  searchInputRef,
}: usePluginMenuKeyboardHandlerProps) {
  const handleArrowKeyPress = (event: KeyboardEvent) => {
    const totalItems = basicItemsLength + intearctiveItemsLength
    const basicPluginsCount = basicItemsLength
    const interactivePluginsStartIndex = basicPluginsCount

    const isInBasicGrid = currentlyFocusedItem < interactivePluginsStartIndex
    const isInInteractiveGrid =
      currentlyFocusedItem >= interactivePluginsStartIndex

    const fullBasicRowsCount = Math.floor(basicPluginsCount / columns)
    const lastBasicRowItemCount = basicPluginsCount % columns
    const isInLastFullRowOfBasic =
      currentlyFocusedItem >= (fullBasicRowsCount - 1) * columns &&
      currentlyFocusedItem < fullBasicRowsCount * columns

    const isInFirstRowOfBasic = currentlyFocusedItem < columns
    const isInLastRowOfBasic =
      currentlyFocusedItem >= fullBasicRowsCount * columns &&
      currentlyFocusedItem < basicPluginsCount
    const isInFirstRowOfInteractive =
      currentlyFocusedItem >= interactivePluginsStartIndex &&
      currentlyFocusedItem < interactivePluginsStartIndex + columns

    switch (event.key) {
      case Key.ArrowDown:
        if (isInBasicGrid) {
          if (isInLastRowOfBasic) {
            const indexInFirstInteractiveRow = currentlyFocusedItem % columns
            setCurrentlyFocusedItem(
              interactivePluginsStartIndex + indexInFirstInteractiveRow
            )
          } else if (
            isInLastFullRowOfBasic &&
            currentlyFocusedItem % columns >= lastBasicRowItemCount
          ) {
            setCurrentlyFocusedItem(fullBasicRowsCount * columns)
          } else {
            setCurrentlyFocusedItem((prev: number) =>
              Math.min(prev + columns, totalItems - 1)
            )
          }
        } else if (isInInteractiveGrid) {
          setCurrentlyFocusedItem((prev) =>
            Math.min(prev + columns, totalItems - 1)
          )
        }
        break

      case Key.ArrowUp:
        if (isInInteractiveGrid) {
          if (isInFirstRowOfInteractive) {
            const indexInLastRowOfBasic =
              (currentlyFocusedItem - interactivePluginsStartIndex) % columns
            if (indexInLastRowOfBasic < lastBasicRowItemCount) {
              setCurrentlyFocusedItem(
                fullBasicRowsCount * columns + indexInLastRowOfBasic
              )
            } else {
              setCurrentlyFocusedItem(
                fullBasicRowsCount * columns + lastBasicRowItemCount - 1
              )
            }
          } else {
            setCurrentlyFocusedItem((prev) => Math.max(prev - columns, 0))
          }
        } else if (isInBasicGrid) {
          if (isInFirstRowOfBasic) {
            searchInputRef.current?.focus()
          } else {
            setCurrentlyFocusedItem((prev) => Math.max(prev - columns, 0))
          }
        }
        break

      case Key.ArrowLeft:
        setCurrentlyFocusedItem((prev) => Math.max(prev - 1, 0))
        break

      case Key.ArrowRight:
        setCurrentlyFocusedItem((prev) => Math.min(prev + 1, totalItems - 1))
        break

      default:
        break
    }

    event.preventDefault()
  }

  useHotkeys(
    [Key.ArrowUp, Key.ArrowDown, Key.ArrowLeft, Key.ArrowRight],
    handleArrowKeyPress,
    hotkeyConfig,
    [currentlyFocusedItem]
  )
}
