import { migrate } from '@editor/package/storage-format'

test('A document not being in the storage format can be migrated', () => {
  const { stateChanged, migratedState } = migrate({ plugin: 'rows' }, 'unknown')

  expect(stateChanged).toBe(true)
  expect(migratedState).toMatchObject({
    type: 'https://serlo.org/editor',
    document: { plugin: 'rows' },
  })
})
