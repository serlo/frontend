import { Node } from 'slate'

export default function checkArticleGuidelines(value: Node[]) {
  if (!value) return []
  return [...checkHeadings(value), ...elementWise(value, [], value.length)]
}

function elementWise(value, path, length): string[] {
  if (!value) return []
  if (Array.isArray(value)) {
    return value.flatMap((child, index) =>
      elementWise(child, path.concat(index), value.length)
    )
  }
  const childmessages = elementWise(value.children, path, length)

  const messages = []

  if (
    value.type === 'p' &&
    value.children.length == 1 &&
    value.children[0].text === ''
  ) {
    // compat: ignore one trailing paragraph
    if (path.length !== 1 || path[0] !== length - 1) {
      messages.push(
        'Hinweis: Der Artikel enthält leeren Absatz bei ' + JSON.stringify(path)
      )
    }
  }
  if (value.type === 'img') {
    if (!value.alt) {
      messages.push(
        'Hinweis: Das Bild bei ' +
          JSON.stringify(path) +
          ' hat keine Beschreibung. Füge bitte eine Beschreibung hinzu.'
      )
    }
  }
  if (value.type === 'a') {
    if (value.href.trim() === '') {
      messages.push(`Hinweis: Verlinkung bei ${JSON.stringify(path)} ist leer.`)
    }
    if (/^(http|https):\/\/(de|en)\.serlo\.org/i.test(value.href)) {
      messages.push(
        'Hinweis: Verlinkung ' +
          value.href +
          ' bei ' +
          JSON.stringify(path) +
          ' ist extern, obwohl sie auf Serlo zeigt. Entferne bitte den "de.serlo.org"-Teil'
      )
    }
  }
  if (value.text) {
    if (value.text.includes('  ')) {
      messages.push(
        `Hinweis: Der Text "${value.text}" bei ${JSON.stringify(
          path
        )} enthält doppelte Leerzeichen`
      )
    }
  }
  return [...messages, ...childmessages]
}

function checkHeadings(elements): string[] {
  let currentLevel = 1
  let currentIndex = 0
  const messages = []
  if (
    elements.length > 0 &&
    elements[0].type == 'h' &&
    elements[0].level == 1
  ) {
    currentIndex = 1
  }
  while (currentIndex < elements.length) {
    const element = elements[currentIndex]
    if (element.type === 'h') {
      if (element.level <= currentLevel + 1) {
        currentLevel = element.level // one down, same or out
      } else {
        messages.push(
          `Hinweis: Bei [${currentIndex}] kommt eine Überschrift ${element.level} nach Überschrift ${currentLevel}, Ebene dabei übersprungen. Bitte korrigieren.`
        )
        currentLevel = element.level
      }
    }
    currentIndex++
  }
  return messages
}
