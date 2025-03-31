export type StaticStrings = typeof staticStrings

export const staticStrings = {
  lang: 'de',
  plugins: {
    article: {
      exercisesTitle: 'Übungsaufgaben',
      moreExercises:
        'Weitere Aufgaben zum Thema findest du im folgenden Aufgabenordner',
      relatedContentTitle: 'Du hast noch nicht genug vom Thema?',
      relatedContentText:
        'Hier findest du noch weitere passende Inhalte zum Thema:',
      sourcesTitle: 'Quellen',
      subsectionTypes: {
        articles: 'Artikel',
        courses: 'Kurse',
        videos: 'Videos',
      },
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
      pages: 'Kursübersicht',
      next: 'Weiter',
      back: 'Zurück',
      noRevisionForPage: 'Ungegeprüfte Seite',
    },
    exercise: {
      title: 'Aufgabe',
      prerequisite: 'Für diese Aufgabe benötigst Du folgendes Grundwissen:',
      task: 'Aufgabenstellung',
      answer: 'Antwort',
      check: "Stimmt's?",
      yourAnswer: 'Deine Antwort…',
      chooseOption: 'Klicke auf eine der Optionen.',
      printModeChooseOption: 'Kreuze eine der Optionen an.',
      strategy: 'Strategie',
      solution: 'Lösungsvorschlag',
      showHiddenInteractive: 'Hier deine Lösung prüfen',
      feedback: {
        title: 'Feedback',
        correct: 'Richtig!',
        missedSome: 'Fast! Dir fehlt noch mindestens eine richtige Antwort.',
        incorrect0: 'Schade, leider noch nicht richtig.',
        incorrect1: "Versuch's nochmal.",
        incorrect2: 'Probiere es nochmal.',
        incorrect3: 'Überleg nochmal!',
        incorrect4: "Versuch's nochmal, das war leider noch nicht richtig.",
        incorrect5: 'Das war leider noch nicht richtig, überleg nochmal.',
        incorrect6: 'Probiere es nochmal, das war leider noch nicht richtig.',
      },
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
    interactiveVideo: {
      play: 'Abspielen',
      rewind: 'Zurückspulen',
      mandatoryWarning: 'Du musst erst die Aufgabe lösen.',
      exerciseSolved: "Gut gemacht! Jetzt geht's weiter.",
      repeatPromt:
        'Schau dir doch noch mal den Teil des Videos vor der Aufgabe an',
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
