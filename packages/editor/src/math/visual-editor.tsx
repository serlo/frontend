import { cn } from '@serlo/frontend/src/helper/cn'
import * as MQ from 'react-mathquill'

import type { MathEditorProps } from './editor'

if (typeof window !== 'undefined') {
  MQ.addStyles()
}

function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

function isAndroid() {
  return isTouchDevice() && navigator && /(android)/i.test(navigator.userAgent)
}

function alternativeTextArea() {
  const x = document.createElement('input')
  x.setAttribute('type', 'password')
  return x
}

interface SaneKeyboardHandler {
  typedText: (text: string) => void
  keystroke: (key: string, event: unknown) => void
}

function alternativeSaneKeyboard(
  el_: [HTMLInputElement],
  handler: SaneKeyboardHandler
) {
  const el = el_[0]
  el.value = ' '
  el.addEventListener('input', () => {
    const value: string = el.value
    if (value.length === 2) {
      handler.typedText(value.charAt(1))
    } else if (value.length === 0) {
      handler.keystroke('Backspace', { preventDefault: () => null })
    }
    setTimeout(() => {
      el.value = ' '
    })
  })
}

interface MathField {
  typedText(text: string): void
  latex(): string
  focus(): void
}

interface VisualEditorProps extends MathEditorProps {
  onError(): void
}

export function VisualEditor(props: VisualEditorProps) {
  const mathQuillConfig = {
    supSubsRequireOperand: true,
    autoCommands: 'pi alpha beta gamma delta',
    handlers: {
      moveOutOf: (dir: -1 | 1) => {
        if (dir === 1 && typeof props.onMoveOutRight === 'function') {
          props.onMoveOutRight()
        } else if (dir === -1 && typeof props.onMoveOutLeft === 'function') {
          props.onMoveOutLeft()
        }
      },
      deleteOutOf: (dir: -1 | 1) => {
        if (dir === 1 && typeof props.onDeleteOutRight === 'function') {
          props.onDeleteOutRight()
        } else if (dir === -1 && typeof props.onDeleteOutLeft === 'function') {
          props.onDeleteOutLeft()
        }
      },
      upOutOf: (mathField: MathField) => {
        mathField.typedText('^')
      },
      downOutOf: (mathField: MathField) => {
        mathField.typedText('_')
      },
    },
    ...(isAndroid()
      ? {
          substituteTextarea: alternativeTextArea,
          substituteKeyboardEvents: alternativeSaneKeyboard,
        }
      : {}),
  }

  return (
    <div
      className={cn(`
        rounded-sm focus-within:outline
        focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-editor-primary
        [&_.mq-editable-field]:!border-none [&_.mq-editable-field]:!shadow-none
      `)}
    >
      <MQ.EditableMathField
        latex={props.state}
        onChange={(mathFieldRef) => {
          // Should always be defined after first render cycle!
          if (mathFieldRef?.latex) {
            props.onChange(mathFieldRef.latex())
          }
        }}
        onCopy={(event: React.ClipboardEvent) => {
          event.stopPropagation()
        }}
        onCut={(event: React.ClipboardEvent) => {
          event.stopPropagation()
        }}
        // @ts-expect-error https://github.com/serlo/serlo-editor-issues-and-documentation/issues/67
        config={mathQuillConfig}
        mathquillDidMount={onMount}
      />
    </div>
  )

  function onMount(ref: MathField) {
    if (ref.latex() === '' && props.state !== '') {
      props.onError()
    }
    setTimeout(() => {
      ref.focus()
    })
  }
}
