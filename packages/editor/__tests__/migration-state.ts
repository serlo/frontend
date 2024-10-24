import { migrate, createEmptyDocument } from '@editor/package/storage-format'

test('A document not being in the storage format can be migrated', () => {
  const { stateChanged, migratedState } = migrate({ plugin: 'rows' }, 'unknown')

  expect(stateChanged).toBe(true)
  expect(migratedState).toMatchObject({
    type: 'https://serlo.org/editor',
    document: { plugin: 'rows' },
  })
})

test('A document in a more recent storage format is not changed', () => {
  const moreRecentDocument = {
    ...createEmptyDocument('unknown'),
    version: 10000,
  }

  expect(migrate(moreRecentDocument, 'unknown')).toEqual({
    stateChanged: false,
    migratedState: moreRecentDocument,
  })
})
