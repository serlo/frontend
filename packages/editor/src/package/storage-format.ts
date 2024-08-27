import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import * as t from 'io-ts'
import { v4 as uuid_v4 } from 'uuid'

import { getEditorVersion } from './editor-version'

/** The creator of the saved data -> Serlo editor */
const documentType = 'https://serlo.org/editor'

type Migration = (state: { version: number }) => { version: number }

const migrations: Migration[] = [
  // Migration: Add `editorVersion` and `id`
  (state): StorageFormat => {
    const expectedType = t.type({
      type: t.literal(documentType),
      variant: EditorVariantType,
      version: t.number,
      dateModified: t.string,
      document: t.type({
        plugin: t.string,
        state: t.unknown,
      }),
    })
    if (!expectedType.is(state))
      throw new Error(
        `Unexpected type during migration. Expected ${JSON.stringify(expectedType)} but got ${JSON.stringify(state)}`
      )

    const editorVersion = getEditorVersion()
    const id = uuid_v4()

    return {
      ...state,
      editorVersion,
      id,
    }
  },
  // ...
  // Add new migrations here. Make sure the last one returns the new StorageFormat.
]

const currentVersion = migrations.length

export function createEmptyDocument(
  editorVariant: EditorVariant
): StorageFormat {
  return {
    id: uuid_v4(),
    type: documentType,
    variant: editorVariant,
    version: currentVersion,
    editorVersion: getEditorVersion(),
    dateModified: getCurrentDatetime(),
    document: {
      plugin: TemplatePluginType.GenericContent,
      state: {
        content: {
          plugin: EditorPluginType.Rows,
        },
      },
    },
  }
}

export function migrate(stateBeforeMigration: unknown): {
  migratedState: StorageFormat
  stateChanged: boolean
} {
  if (!t.type({ version: t.number }).is(stateBeforeMigration))
    throw new Error(
      `Missing property 'version: number' in state while trying to perform migrations. Got ${JSON.stringify(stateBeforeMigration)}`
    )

  // Only apply migrations for this version number and higher
  const nextMigrationIndex = stateBeforeMigration.version

  // Create deep copy
  let migratedState = JSON.parse(JSON.stringify(stateBeforeMigration)) as {
    version: number
  }
  let stateChanged = false
  for (let i = nextMigrationIndex; i < migrations.length; i++) {
    migratedState = migrations[i](migratedState)
    stateChanged = true
    migratedState.version = i + 1
  }

  if (!StorageFormatType.is(migratedState))
    throw new Error(
      'Storage format after migrations does not match StorageFormatType'
    )

  if (stateChanged) {
    migratedState.editorVersion = getEditorVersion()
    migratedState.dateModified = getCurrentDatetime()
  }

  return { migratedState, stateChanged }
}

/** The variant of the Serlo editor that created this saved data */
const EditorVariantType = t.union([
  t.literal('https://github.com/serlo/serlo-editor-for-edusharing'),
  t.literal('https://github.com/serlo/serlo-editor-as-lti-tool/'),
])
export type EditorVariant = t.TypeOf<typeof EditorVariantType>

const StorageFormatType = t.type({
  // Constant values (set at creation)
  id: t.string, // https://dini-ag-kim.github.io/amb/20231019/#id
  type: t.literal(documentType),
  variant: EditorVariantType,

  // Variable values (can change when state modified)
  version: t.number, // Index of the next migration to apply (if there is one). Example: 2 -> Apply migration[2], migration[3], ... until end of array
  editorVersion: t.string,
  dateModified: t.string,
  document: t.type({
    plugin: t.string,
    state: t.unknown,
  }),
})
export type StorageFormat = t.TypeOf<typeof StorageFormatType>

export function getCurrentDatetime() {
  return new Date().toISOString()
}
