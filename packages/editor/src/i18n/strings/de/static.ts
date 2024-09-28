export type StaticStrings = typeof staticStrings

export const staticStrings = {
  plugins: {
    article: {
      exercisesTitle: 'Übungsaufgaben',
      moreExercises:
        'Weitere Aufgaben zum Thema findest du im folgenden Aufgabenordner',
      relatedContentTitle: 'Du hast noch nicht genug vom Thema?',
      relatedContentText:
        'Hier findest du noch weitere passende Inhalte zum Thema:',
      sourcesTitle: 'Quellen',
    },
    audio: {
      failed: 'Sorry, beim laden der Audio-Datei ist was schiefgegangen.',
    },
    box: {
      types: {
        blank: 'Blanko',
        example: 'Beispiel',
        quote: 'Zitat',
        approach: 'Vorgehen',
        remember: 'Merke',
        attention: 'Vorsicht',
        note: 'Beachte',
        definition: 'Definition',
        theorem: 'Satz',
        proof: 'Beweis',
      },
    },
    course: {
      title: 'Kurse',
      showPages: 'Kursübersicht anzeigen',
      pages: 'Kursübersicht',
      next: 'Weiter',
      back: 'Zurück',
      noPagesWarning:
        'Leider gibt es für diesen Kurs noch keine akzeptierten Seiten.',
      noRevisionForPage: 'Ungegeprüfte Seite',
    },
    exercise: {
      prerequisite: 'Für diese Aufgabe benötigst Du folgendes Grundwissen:',
      task: 'Aufgabenstellung',
      correct: 'Richtig',
      missedSome: 'Fast! Dir fehlt noch mindestens eine richtige Antwort.',
      wrong: 'Leider nicht richtig',
      feedback: 'Feedback',
      answer: 'Antwort',
      check: "Stimmt's?",
      yourAnswer: 'Deine Antwort…',
      chooseOption: 'Klicke auf eine der Optionen.',
      printModeChooseOption: 'Kreuze eine der Optionen an.',
      strategy: 'Strategie',
      solution: 'Lösungsvorschlag',
      showHiddenInteractive: 'Hier deine Lösung prüfen',
    },
    image: {
      altFallback: 'Bild',
    },
    imageGallery: {
      lightboxSrTitle:
        'Popup mit einem großen Bild und Schaltflächen, um zu anderen Bildern in der Galerie zu navigieren',
    },
    video: {
      failed: 'Sorry, das Video konnte nicht geladen werden.',
    },
  },
  embed: {
    activateEmbed: 'Aktivieren',
    previewImage: 'Vorschaubild',
  },
  misc: {
    ctrl: 'Strg',
    return: 'Enter',
    loading: 'Laden',
  },
}
