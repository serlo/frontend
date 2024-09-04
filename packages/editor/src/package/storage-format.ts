import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { getCurrentDatetime } from '@editor/util/get-current-datetime'
import * as t from 'io-ts'
import { v4 as uuid_v4 } from 'uuid'

import { getEditorVersion } from './editor-version'

/** The creator of the saved data -> Serlo editor */
const documentType = 'https://serlo.org/editor'

type Migration = (state: unknown, variant: EditorVariant) => unknown

const migrations: Migration[] = [
  // Migration 0: Transform old format to new StorageFormat
  (state, variant): StorageFormat => {
    // No need to run this migration if the state is in the correct format
    if (StorageFormatType.is(state)) {
      return state
    }

    // Check if the state is in our old document format
    if (isValidDocument(state)) {
      return {
        id: uuid_v4(),
        type: documentType,
        variant,
        version: 0,
        domainOrigin: window.location.origin,
        editorVersion: getEditorVersion(),
        dateModified: getCurrentDatetime(),
        document: state,
      }
    }

    // State is neither in the new format nor the old format, throw!
    throw new Error('Invalid state format')
  },
  // Migration 1: Add `editorVersion` and `id`
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
      domainOrigin: window.location.origin,
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
    domainOrigin: window.location.origin,
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

export function migrate(
  stateBeforeMigration: unknown,
  variant: EditorVariant
): {
  migratedState: StorageFormat
  stateChanged: boolean
} {
  let migratedState: StorageFormat
  let stateChanged = false

  // Check if the state is the (old format)
  if (
    isValidDocument(stateBeforeMigration) &&
    !StorageFormatType.is(stateBeforeMigration)
  ) {
    migratedState = {
      id: uuid_v4(),
      type: documentType,
      variant,
      domainOrigin: window.location.origin,
      version: 0,
      editorVersion: getEditorVersion(),
      dateModified: getCurrentDatetime(),
      document: stateBeforeMigration,
    }
    stateChanged = true
  } else if (StorageFormatType.is(stateBeforeMigration)) {
    // deep copy
    migratedState = JSON.parse(
      JSON.stringify(stateBeforeMigration)
    ) as StorageFormat
  } else {
    throw new Error(
      `Unknown, invalid state format. Got ${JSON.stringify(stateBeforeMigration)}`
    )
  }

  const nextMigrationIndex = migratedState.version

  for (let i = nextMigrationIndex; i < migrations.length; i++) {
    migratedState = migrations[i](migratedState, variant) as StorageFormat
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
  t.literal('lti-tool'),
  t.literal('serlo-org'),
  t.literal('kiron'),
  t.literal('scobees'),
  t.literal('moodle'),
  t.literal('chancenwerk'),
  t.literal('unknown'),
])

export type EditorVariant = t.TypeOf<typeof EditorVariantType>

const DocumentType = t.type({
  plugin: t.string,
  state: t.unknown,
})

type Document = t.TypeOf<typeof DocumentType>

function isValidDocument(obj: unknown): obj is Document {
  return DocumentType.is(obj)
}

const StorageFormatType = t.type({
  // Constant values (set at creation)
  id: t.string, // https://dini-ag-kim.github.io/amb/20231019/#id
  type: t.literal(documentType),
  variant: EditorVariantType,
  domainOrigin: t.string,

  // Variable values (can change when state modified)
  version: t.number, // Index of the next migration to apply (if there is one). Example: 2 -> Apply migration[2], migration[3], ... until end of array
  editorVersion: t.string,
  dateModified: t.string,
  document: DocumentType,
})
export type StorageFormat = t.TypeOf<typeof StorageFormatType>
