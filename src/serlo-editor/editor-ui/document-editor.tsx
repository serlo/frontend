import clsx from 'clsx'
import { useState, useRef } from 'react'

import { tw } from '@/helper/tw'

export interface DocumentEditorProps {
  children: React.ReactNode // The rendered document
  settingsRef: React.RefObject<HTMLDivElement> // The rendered settings
  toolbarRef: React.RefObject<HTMLDivElement> // The rendered toolbar buttons
  hasToolbar: boolean // `true` if the document has rendered any toolbar buttons
  renderSideToolbar?(children: React.ReactNode): React.ReactNode // Render prop to override rendering of toolbar
  focused: boolean // `true` if the document is focused
  isInlineChildEditor: boolean
}

// TODO: Rename this to something like `SideToolbarWrapper` or something similar?
export function DocumentEditor({
  focused,
  children,
  renderSideToolbar,
  toolbarRef,
  hasToolbar,
  isInlineChildEditor,
}: DocumentEditorProps) {
  const [hasHover, setHasHover] = useState(false)

  const showToolbar = hasToolbar || renderSideToolbar !== undefined

  const isFocused = focused && showToolbar
  const isHovered = hasHover && showToolbar

  const isAppended = useRef(false)
  const toolbar = (
    <>
      <div
        ref={(ref) => {
          // The ref `isAppended` ensures that we only append the content once
          // so that we don't lose focus on every render
          if (ref && toolbarRef.current && !isAppended.current) {
            isAppended.current = true
            ref.appendChild(toolbarRef.current)
          }
        }}
      />
    </>
  )

  if (isInlineChildEditor) return <>{children}</>

  return (
    <div
      className={clsx(
        'document-editor-container',
        (isFocused || isHovered) && 'default-document-editor-container py-0',
        'relative -ml-[7px] mb-6 min-h-[10px] border-l-2 pl-[5px] transition-all',
        isFocused || isHovered
          ? isFocused
            ? 'border-almost-black'
            : 'border-gray-200'
          : 'border-transparent',
        !isFocused && isHovered
          ? tw`
            hover:[&:has(.default-document-editor-container):hover>.toolbar-container>div]:border-transparent
            hover:[&:has(.default-document-editor-container):hover>.toolbar-container>div]:opacity-0
          `
          : ''
      )}
      onMouseEnter={() => setHasHover(true)}
      onMouseLeave={() => setHasHover(false)}
    >
      {children}
      <div
        className={clsx(
          'toolbar-container absolute left-0 top-0 -translate-x-full [transform-origin:center_top]',
          isHovered ? 'z-[21]' : 'z-auto',
          isFocused || isHovered
            ? 'pointer-events-auto'
            : 'pointer-events-none',
          tw`
            before:pointer-events-none before:absolute before:right-0 before:top-0 before:z-[15]
            before:h-full before:w-0.5 before:opacity-100 before:content-[_]`
        )}
      >
        <div
          className={clsx(
            'relative z-[21] mr-0.5 flex flex-col items-end rounded-l-md bg-white pb-2.5 transition-opacity',
            isFocused ? 'opacity-100' : isHovered ? 'opacity-70' : 'opacity-0'
          )}
        >
          {renderSideToolbar ? renderSideToolbar(toolbar) : toolbar}
        </div>
      </div>
    </div>
  )
}
