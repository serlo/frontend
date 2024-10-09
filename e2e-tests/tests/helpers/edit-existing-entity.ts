export function editExistingEntity(I, uuid: number) {
  I.amOnPage(`/entity/repository/add-revision/${uuid}`)
  I.waitForElement('[data-document=true]', 10)
}
