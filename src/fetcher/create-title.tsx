// TODO: needs type declaration
export function createTitle(uuid: any) {
  const type = uuid.__typename

  const suffix = ' - lernen mit Serlo!'

  if (type === 'TaxonomyTerm') {
    if (uuid.type === 'topic') {
      return `${uuid.name} (Thema)${suffix}`
    }
    if (uuid.type === 'subject') {
      return `${uuid.name} - Fach${suffix}`
    }
    // missing: special behaviour on curriculum term
    return `${uuid.name}${suffix}`
  }

  // default: show revision title, works for page, article, video, applet, course-page
  if (uuid.currentRevision?.title) {
    return `${uuid.currentRevision.title}${suffix}`
  }
}
