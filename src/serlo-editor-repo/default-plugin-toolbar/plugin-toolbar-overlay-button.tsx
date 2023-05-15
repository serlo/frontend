import { useRef, useState } from 'react'
import Modal from 'react-modal'

import { EditorTooltip } from '../editor-ui/editor-tooltip'
import { PluginToolbarOverlayButtonProps } from '../plugin-toolbar'
import { Button } from './button'
import { DefaultPluginToolbarConfig } from './config'
import { StyledIconContainer } from './icon-container'

export function createPluginToolbarOverlayButton(
  _config: DefaultPluginToolbarConfig
) {
  return function PluginToolbarOverlayButton({
    className,
    icon,
    label,
    ...modalProps
  }: PluginToolbarOverlayButtonProps) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <WrappedModal
          {...modalProps}
          isOpen={open}
          onRequestClose={() => {
            setOpen(false)
          }}
        />
        <Button
          className={`${className ?? ''} serlo-tooltip-trigger`}
          onClick={() => {
            setOpen(true)
          }}
        >
          <EditorTooltip text={label} className="-ml-4 !pb-2" hideOnHover />
          <StyledIconContainer>{icon}</StyledIconContainer>
        </Button>
      </>
    )
  }
}

function WrappedModal({
  renderContent,
  contentRef,
  ...props
}: Pick<PluginToolbarOverlayButtonProps, 'contentRef' | 'renderContent'> &
  Omit<Modal.Props, 'contentRef'> & { onRequestClose(): void }) {
  const appended = useRef(false)
  const children = (
    <div
      ref={(ref) => {
        // The ref `appended` ensures that we only append the content once so that we don't lose focus on every render
        if (ref && contentRef.current && !appended.current) {
          appended.current = true
          ref.appendChild(contentRef.current)
        } else if (!props.isOpen) {
          appended.current = false
        }
      }}
    />
  )

  return (
    <Modal
      {...props}
      ariaHideApp={false}
      style={{
        overlay: {
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        content: {
          borderRadius: 0,
          backgroundColor: '#ffffff',
          width: '90%',
          maxWidth: '600px',
          maxHeight: 'calc(100vh - 80px)',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          margin: '0 auto',
          transform: 'none',
        },
      }}
    >
      {renderContent
        ? renderContent(children, {
            close() {
              props.onRequestClose()
            },
          })
        : children}
    </Modal>
  )
}
