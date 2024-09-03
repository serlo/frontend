import {
  DocumentState,
  selectEmptyTextPluginChildrenIndexes,
  selectParentPluginType,
  store,
} from '@editor/store'
import { getStaticDocument } from '@editor/store/documents/helpers'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { AddRowButtonLarge } from './add-row-button-large'
import { PluginMenuModal } from './plugin-menu-modal'
import { RowEditor } from './row-editor'
import type { RowsProps } from '..'
import {
  PluginMenuActionTypes,
  PluginMenuContext,
} from '../contexts/plugin-menu'
import { isInteractivePluginType } from '../utils/plugin-menu'

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
    onSuccess: (newContent, { insertIndex }) => {
      for (const row of newContent.state) {
        state.insert(insertIndex, row)
        insertIndex++
      }
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

    // This should never happen, but just to be sure
    if (pluginMenuState.insertIndex === undefined) return

    // TODO: Make a more beatufiul prompt
    const prompt = window.prompt('Prompt für AI:')

    if (prompt === null || prompt.trim() === '') return

    generateAiContent.mutate({
      insertIndex: pluginMenuState.insertIndex,
      prompt,
    })
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
          )
        })}
      </div>
      {showLargeAddButton ? (
        <AddRowButtonLarge
          onClick={() => {
            handleOpenPluginMenu(state.length)
          }}
        />
      ) : null}
      <PluginMenuModal
        onInsertPlugin={handleInsertPlugin}
        isRootRow={isRootRow}
      />
    </>
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
