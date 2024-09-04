import {
  DocumentState,
  selectEmptyTextPluginChildrenIndexes,
  selectParentPluginType,
  store,
} from '@editor/store'
import { getStaticDocument } from '@editor/store/documents/helpers'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { AddRowButtonLarge } from './add-row-button-large'
import { PluginMenuModal } from './plugin-menu-modal'
import { RowEditor } from './row-editor'
import type { RowsProps } from '..'
import {
  PluginMenuActionTypes,
  PluginMenuContext,
} from '../contexts/plugin-menu'
import { isInteractivePluginType } from '../utils/plugin-menu'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { cn } from '@/helper/cn'

export function RowsInnerEditor({ state, config, id }: RowsProps) {
  // since this is only used to check if the current plugin is the child of the
  // root plugin (like a template plugin or article plugin)
  // this should not change – so we don't need to use useAppSelector here
  const parentType = selectParentPluginType(store.getState(), id)

  // TODO: For finally integrating AI into the editor it would be better to
  // create a new plugin type for the main content type, something like a
  // plugin "learningResource" => At this level we can then enable / disable
  // the AI features instead of using this flag.
  const isRootRow = parentType === EditorPluginType.Rows

  const isParentTemplatePlugin = parentType?.startsWith('type-')
  const showLargeAddButton =
    parentType === EditorPluginType.Article || isParentTemplatePlugin

  const { pluginMenuState, pluginMenuDispatch } = useContext(PluginMenuContext)

  const [aiContentGenerationStates, setAiContentGenerationStates] = useState<
    Array<AiContentGenerationState>
  >([])

  const generateAiContent = useMutation({
    mutationFn: async ({ prompt }: { insertIndex: number; prompt: string }) => {
      const document = getStaticDocument({
        id,
        documents: store.getState().documents,
      }) as { plugin: EditorPluginType.Rows; state: DocumentState[] }

      const before = {
        plugin: EditorPluginType.Rows,
        state: document.state.slice(0, pluginMenuState.insertIndex),
      }
      const after = {
        plugin: EditorPluginType.Rows,
        state: document.state.slice(pluginMenuState.insertIndex),
      }

      const url = new URL(
        '/api/experimental/generate-content',
        window.location.href
      )

      url.searchParams.append('prompt', prompt)
      url.searchParams.append('before', JSON.stringify(before))
      url.searchParams.append('after', JSON.stringify(after))

      const response = await fetch(url.toString(), {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to generate AI content')
      }

      // TODO: For a production implementation we need to check the response
      // schema whether a valid editor document was send to us
      return (await response.json()) as {
        plugin: EditorPluginType.Rows
        state: DocumentState[]
      }
    },
    onSuccess: (newContent, { insertIndex, prompt }) => {
      setAiContentGenerationStates((prev) =>
        prev.filter(
          (p) =>
            p.type !== 'generateNewContent' ||
            p.prompt !== prompt ||
            p.insertIndex !== insertIndex
        )
      )

      for (const row of newContent.state) {
        state.insert(insertIndex, row)
        insertIndex++
      }
    },
    onError: (error, { insertIndex, prompt }) => {
      // FIXME: Copy & Pasted code from onSuccess...
      setAiContentGenerationStates((prev) =>
        prev.filter(
          (p) =>
            p.type !== 'generateNewContent' ||
            p.prompt !== prompt ||
            p.insertIndex !== insertIndex
        )
      )

      console.error('Failed to generate AI content', error)
    },
  })

  function handleOpenPluginMenu(insertIndex: number) {
    pluginMenuDispatch({
      type: PluginMenuActionTypes.OPEN,
      payload: { insertIndex },
    })
  }

  function handleInsertPlugin(pluginType: EditorPluginType) {
    if (pluginType === EditorPluginType.AiGeneratedContent) {
      handleInsertAiGeneratedContent()
      return
    }

    const pluginToInsert = isInteractivePluginType(pluginType)
      ? wrapExercisePlugin(pluginType)
      : { plugin: pluginType }

    if (pluginMenuState.insertCallback) {
      pluginMenuState.insertCallback(pluginToInsert)
    } else {
      state.insert(pluginMenuState.insertIndex, pluginToInsert)
      removeEmptyTextPluginChildren()
    }

    pluginMenuDispatch({ type: PluginMenuActionTypes.CLOSE })
  }

  function handleInsertAiGeneratedContent() {
    pluginMenuDispatch({ type: PluginMenuActionTypes.CLOSE })

    const insertIndex = pluginMenuState.insertIndex

    // This should never happen, but just to be sure
    if (insertIndex === undefined) return

    setAiContentGenerationStates((prev) => [
      ...prev,
      { type: 'insertPrompt', insertIndex },
    ])
  }

  function removeEmptyTextPluginChildren() {
    const indexes = selectEmptyTextPluginChildrenIndexes(store.getState(), id)
    indexes.forEach((index) => {
      if (index !== pluginMenuState.insertIndex) state.remove(index)
    })
  }

  return (
    <>
      <div className="relative mt-6">
        {state.map((row, index) => {
          const hideAddButton = showLargeAddButton && index === state.length - 1
          return (
            <>
              {renderAiContentGeneration(index)}
              <RowEditor
                config={config}
                key={row.id}
                index={index}
                rows={state}
                row={row}
                isRootRow={isRootRow}
                hideAddButton={!!hideAddButton}
                onAddButtonClick={handleOpenPluginMenu}
              />
            </>
          )
        })}
      </div>
      {renderAiContentGeneration(state.length)}
      {showLargeAddButton ? (
        <AddRowButtonLarge
          onClick={() => {
            handleOpenPluginMenu(state.length)
          }}
        />
      ) : null}
      <PluginMenuModal onInsertPlugin={handleInsertPlugin} />
    </>
  )

  function renderAiContentGeneration(index: number) {
    return (
      <>
        {renderAiContentGenerationPrompts(index)}
        {renderAiContentGenerationSpinner(index)}
      </>
    )
  }

  function renderAiContentGenerationPrompts(index: number) {
    if (
      !aiContentGenerationStates
        .filter(isInsertPrompt)
        .some((p) => p.insertIndex === index)
    ) {
      return
    }

    return (
      <AiContentGenerationPrompt
        onClose={() => {
          setAiContentGenerationStates((prev) =>
            prev.filter((x) => !isInsertPrompt(x) || x.insertIndex !== index)
          )
        }}
        onEnter={(prompt) => {
          setAiContentGenerationStates((prev) => [
            ...prev.filter(
              (x) => !isInsertPrompt(x) || x.insertIndex !== index
            ),
            { type: 'generateNewContent', insertIndex: index, prompt },
          ])
          generateAiContent.mutate({ insertIndex: index, prompt })
        }}
      ></AiContentGenerationPrompt>
    )
  }

  function renderAiContentGenerationSpinner(index: number) {
    const prompts = aiContentGenerationStates
      .filter(isGenerateNewContent)
      .filter((p) => p.insertIndex === index)
      .map((p) => p.prompt)

    return prompts.map((prompt, index) => (
      <div
        key={index}
        className="m-side mt-12 rounded-2xl bg-editor-primary-50 p-side"
      >
        <FaIcon icon={faSpinner} className="animate-spin-slow" /> Generiere
        Inhalt für „{prompt}“
      </div>
    ))
  }
}

function wrapExercisePlugin(pluginType: EditorPluginType) {
  return {
    plugin: EditorPluginType.Exercise,
    state: {
      content: { plugin: EditorPluginType.Rows },
      interactive: {
        plugin: pluginType,
      },
    },
  }
}

function AiContentGenerationPrompt({
  onClose,
  onEnter,
}: {
  onClose: () => void
  onEnter: (prompt: string) => void
}) {
  const [prompt, setPrompt] = useState('')

  return (
    <ModalWithCloseButton
      isOpen
      setIsOpen={onClose}
      title="Prompt für Inhaltserstellung"
    >
      <div className="mx-4">
        <textarea
          className={cn(
            'w-full rounded-xl border-2 border-editor-primary-100',
            'bg-editor-primary-100 px-2.5 py-[3px] text-almost-black',
            'focus:border-editor-primary focus:outline-none'
          )}
          value={prompt}
          rows={5}
          placeholder='z.B. "Wiederhole den Satz des Pythagoras mit einer interaktiven Verständnisfrage am Ende"'
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnter(prompt)
            }
          }}
        />
        <button
          className="serlo-button-editor-primary serlo-tooltip-trigger mt-4 px-4"
          onClick={() => onEnter(prompt)}
        >
          Inhalt generieren
        </button>
      </div>
    </ModalWithCloseButton>
  )
}

type AiContentGenerationState = InsertPrompt | GenerateNewContent

interface InsertPrompt {
  type: 'insertPrompt'
  insertIndex: number
}

interface GenerateNewContent {
  type: 'generateNewContent'
  insertIndex: number
  prompt: string
}

function isInsertPrompt(
  state: AiContentGenerationState
): state is InsertPrompt {
  return state.type === 'insertPrompt'
}

function isGenerateNewContent(
  state: AiContentGenerationState
): state is GenerateNewContent {
  return state.type === 'generateNewContent'
}
