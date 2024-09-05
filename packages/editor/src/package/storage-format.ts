import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { getCurrentDatetime } from '@editor/util/get-current-datetime'
import * as t from 'io-ts'
import { v4 as uuid_v4 } from 'uuid'

import { getEditorVersion } from './editor-version'

/** The creator of the saved data -> Serlo editor */
const documentType = 'https://serlo.org/editor'

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

// A migration takes an unknown state with `version: number` and returns an unknown state with `version: number`.
type Migration = (
  state: unknown & { version: number }
) => unknown & { version: number }

const StateBeforeMigrationZeroType = t.type({
  type: t.literal(documentType),
  variant: EditorVariantType,
  version: t.literal(0),
  dateModified: t.string,
  document: t.type({
    plugin: t.string,
    state: t.unknown,
  }),
})

type StateBeforeMigrationZeroType = t.TypeOf<
  typeof StateBeforeMigrationZeroType
>

// Usage: Do not change existing migrations. Only if you are sure that they never ran in any system where content needs to be supported long term. Instead, create a new migration. It needs to be at the end of the array. The last migration should return `StorageFormat`
const migrations: Migration[] = [
  // Migration 0: Add editorVersion & id
  (state) => {
    if (!StateBeforeMigrationZeroType.is(state))
      throw new Error(
        `Unexpected type during migration. Expected ${JSON.stringify(StateBeforeMigrationZeroType)} but got ${JSON.stringify(state)}`
      )

    return {
      ...state,
      editorVersion: getEditorVersion(),
      id: uuid_v4(),
    }
  },

  // Migration 1: Add domainOrigin
  (state): StorageFormat => {
    const expectedType = t.type({
      id: t.string,
      type: t.literal(documentType),
      variant: EditorVariantType,
      version: t.number,
      editorVersion: t.string,
      dateModified: t.string,
      document: DocumentType,
    })
    if (!expectedType.is(state))
      throw new Error(
        `Unexpected type during migration. Expected ${JSON.stringify(expectedType)} but got ${JSON.stringify(state)}`
      )

    return {
      ...state,
      domainOrigin: window.location.origin,
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

function deepCopy(obj: unknown) {
  return JSON.parse(JSON.stringify(obj)) as unknown
}

/** Migrates outdated states to the most recent `StorageFormat`. */
export function migrate(
  stateBeforeMigration: unknown,
  variant: EditorVariant
): {
  migratedState: StorageFormat
  stateChanged: boolean
} {
  let stateChanged = false

  // If the state is in the old format ({ plugin: string, state: unknown }) & missing `version` property -> Add metadata (including `version`) so that type matches what should be present before running migrations[0]
  let migratingState = prepareStateForMigrations()
  function prepareStateForMigrations() {
    if (!t.type({ version: t.number }).is(stateBeforeMigration)) {
      stateChanged = true
      const statePlusMetadata: StateBeforeMigrationZeroType = {
        type: documentType,
        variant,
        version: 0,
        dateModified: getCurrentDatetime(),
        document: deepCopy(stateBeforeMigration) as t.TypeOf<
          typeof DocumentType
        >,
      }
      return statePlusMetadata
    } else {
      return deepCopy(stateBeforeMigration) as { version: number }
    }
  }

  // The property `version` tells us which entries in the migrations array we still have to run. Example: `version: 2` means we need to run migration[2], migration[3], ... if they exist
  const nextMigrationIndex = migratingState.version
  for (let i = nextMigrationIndex; i < migrations.length; i++) {
    migratingState = migrations[i](migratingState)
    stateChanged = true
    migratingState.version = i + 1
  }

  if (!StorageFormatType.is(migratingState))
    throw new Error(
      'Storage format after migrations does not match StorageFormatType'
    )

  if (stateChanged) {
    migratingState.editorVersion = getEditorVersion()
    migratingState.dateModified = getCurrentDatetime()
  }

  return { migratedState: migratingState, stateChanged }
}

const DocumentType = t.type({
  plugin: t.string,
  state: t.unknown,
})

const StorageFormatType = t.type({
  // Constant values (set at creation)
  id: t.string, // https://dini-ag-kim.github.io/amb/20231019/#id
  type: t.literal(documentType),
  variant: EditorVariantType,
  domainOrigin: t.string,

  // Variable values (can change when state modified)
  version: t.literal(currentVersion), // Index of the next migration to apply
  editorVersion: t.string,
  dateModified: t.string,
  document: DocumentType,
})

export type StorageFormat = t.TypeOf<typeof StorageFormatType>
