import {
  DocumentState,
  selectEmptyTextPluginChildrenIndexes,
  selectParentPluginType,
  store,
} from '@editor/store'
import { getStaticDocument } from '@editor/store/documents/helpers'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'

import { AddRowButtonLarge } from './add-row-button-large'
import { PluginMenuModal } from './plugin-menu-modal'
import { RowEditor } from './row-editor'
import type { RowsProps } from '..'
import { ChangeRowPerAiContext } from '../contexts/change-row-per-ai'
import {
  PluginMenuActionTypes,
  PluginMenuContext,
} from '../contexts/plugin-menu'
import { isInteractivePluginType } from '../utils/plugin-menu'
import { Skeleton } from '@/components/exercise-generation/exercise-preview-page'
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

  const [aiCommands, setAiCommands] = useState<Array<AiCommand>>([])

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
      setAiCommands((prev) =>
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
      setAiCommands((prev) =>
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

  const changeAiContent = useMutation({
    mutationFn: async ({
      prompt,
      insertIndex,
    }: {
      insertIndex: number
      prompt: string
    }) => {
      const document = getStaticDocument({
        id,
        documents: store.getState().documents,
      }) as { plugin: EditorPluginType.Rows; state: DocumentState[] }

      const content = document.state[insertIndex]

      const url = new URL(
        '/api/experimental/change-content',
        window.location.href
      )

      url.searchParams.append('prompt', prompt)
      url.searchParams.append('content', JSON.stringify(content))

      const response = await fetch(url.toString(), {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to generate AI content')
      }

      // TODO: For a production implementation we need to check the response
      // schema whether a valid editor document was send to us
      return (await response.json()) as DocumentState
    },
    onSuccess: (newContent, { insertIndex, prompt }) => {
      setAiCommands((prev) =>
        prev.filter(
          (p) =>
            p.type !== 'changeContent' ||
            p.prompt !== prompt ||
            p.insertIndex !== insertIndex
        )
      )

      state.remove(insertIndex)
      state.insert(insertIndex, newContent)
    },
    onError: (error, { insertIndex, prompt }) => {
      // FIXME: Copy & Pasted code from onSuccess...
      setAiCommands((prev) =>
        prev.filter(
          (p) =>
            p.type !== 'changeContent' ||
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

    setAiCommands((prev) => [
      ...prev,
      { type: 'promptNewContent', insertIndex },
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
          const prompts = aiCommands
            .filter(isChangeContent)
            .filter((p) => p.insertIndex === index)
            .map((p) => p.prompt)
          return (
            <>
              {renderAiContentGeneration(index)}
              {renderAiChangeContentPrompt(index)}
              {prompts.length === 0 ? (
                <ChangeRowPerAiContext.Provider
                  value={() =>
                    setAiCommands((prev) => [
                      ...prev,
                      { type: 'promptChangeContent', insertIndex: index },
                    ])
                  }
                >
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
                </ChangeRowPerAiContext.Provider>
              ) : (
                <Spinner key={-index} />
              )}
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
        {renderAiContentGenerationPrompt(index)}
        {renderAiContentGenerationSpinner(index)}
      </>
    )
  }

  function renderAiContentGenerationPrompt(index: number) {
    if (
      !aiCommands
        .filter(isPromptNewContent)
        .some((p) => p.insertIndex === index)
    ) {
      return
    }

    return (
      <AiPrompt
        title="Was soll generiert werden?"
        placeholder='z.B. "Wiederhole den Satz des Pythagoras mit einer interaktiven Verständnisfrage am Ende"'
        buttonText="Inhalt generieren"
        onClose={() => {
          setAiCommands((prev) =>
            prev.filter(
              (x) => !isPromptNewContent(x) || x.insertIndex !== index
            )
          )
        }}
        onEnter={(prompt) => {
          setAiCommands((prev) => [
            ...prev.filter(
              (x) => !isPromptNewContent(x) || x.insertIndex !== index
            ),
            { type: 'generateNewContent', insertIndex: index, prompt },
          ])
          generateAiContent.mutate({ insertIndex: index, prompt })
        }}
      ></AiPrompt>
    )
  }

  function renderAiChangeContentPrompt(index: number) {
    if (
      !aiCommands
        .filter(isPromptChangeContent)
        .some((p) => p.insertIndex === index)
    ) {
      return
    }

    return (
      <AiPrompt
        title="Was soll verändert werden?"
        placeholder="z.B. „Übersetze ins Englische“"
        buttonText="Inhalt überarbeiten"
        onClose={() => {
          setAiCommands((prev) =>
            prev.filter(
              (x) => !isPromptChangeContent(x) || x.insertIndex !== index
            )
          )
        }}
        onEnter={(prompt) => {
          setAiCommands((prev) => [
            ...prev.filter(
              (x) => !isPromptChangeContent(x) || x.insertIndex !== index
            ),
            { type: 'changeContent', insertIndex: index, prompt },
          ])
          changeAiContent.mutate({ insertIndex: index, prompt })
        }}
      ></AiPrompt>
    )
  }

  function renderAiContentGenerationSpinner(index: number) {
    const prompts = aiCommands
      .filter(isGenerateNewContent)
      .filter((p) => p.insertIndex === index)
      .map((p) => p.prompt)

    return prompts.map((_prompt, index) => <Spinner key={index} />)
  }
}

function Spinner() {
  return (
    <div className="m-side mt-12 rounded-2xl bg-editor-primary-50 p-side text-almost-black">
      <Skeleton />
    </div>
  )
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

function AiPrompt({
  onClose,
  onEnter,
  title,
  placeholder,
  buttonText,
}: {
  onClose: () => void
  onEnter: (prompt: string) => void
  title: string
  placeholder: string
  buttonText: string
}) {
  const [prompt, setPrompt] = useState('')

  return (
    <ModalWithCloseButton isOpen setIsOpen={onClose} title={title}>
      <div className="mx-4">
        <textarea
          className={cn(
            'w-full rounded-xl border-2 border-editor-primary-100',
            'bg-editor-primary-100 px-2.5 py-[3px] text-almost-black',
            'focus:border-editor-primary focus:outline-none'
          )}
          value={prompt}
          rows={5}
          placeholder={placeholder}
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
          {buttonText}
        </button>
      </div>
    </ModalWithCloseButton>
  )
}

type AiCommand =
  | PromptNewContent
  | GenerateNewContent
  | PromptChangeContent
  | ChangeContent

interface PromptNewContent {
  type: 'promptNewContent'
  insertIndex: number
}

interface GenerateNewContent {
  type: 'generateNewContent'
  insertIndex: number
  prompt: string
}

interface PromptChangeContent {
  type: 'promptChangeContent'
  insertIndex: number
}

interface ChangeContent {
  type: 'changeContent'
  insertIndex: number
  prompt: string
}

function isPromptNewContent(state: AiCommand): state is PromptNewContent {
  return state.type === 'promptNewContent'
}

function isGenerateNewContent(state: AiCommand): state is GenerateNewContent {
  return state.type === 'generateNewContent'
}

function isPromptChangeContent(state: AiCommand): state is PromptChangeContent {
  return state.type === 'promptChangeContent'
}

function isChangeContent(state: AiCommand): state is ChangeContent {
  return state.type === 'changeContent'
}
