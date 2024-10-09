const urls = {
  article: '/entity/create/Article/1377',
  exercise: '/entity/create/Exercise/23869',
  course: '/entity/create/Course/1377',
}

export function createNewEditorEntity(
  I,
  entityType: 'article' | 'exercise' | 'course'
) {
  I.amOnPage(urls[entityType])
  I.waitForElement('[data-document=true]', 10)
}
