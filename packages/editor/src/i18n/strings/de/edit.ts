export type EditStrings = typeof editStrings

export const editStrings = {
  lang: 'de',
  confirmRouteChange:
    'Willst du wirklich die Seite verlassen ohne zu speichern?',
  noChangesWarning: 'Bisher hast du nichts geändert',
  addPluginsModal: {
    searchInputPlaceholder: 'Suche...',
    basicPluginsTitle: 'Inhalte',
    interactivePluginsTitle: 'Aufgaben',
    noPluginsFoundTitle:
      'Leider gibt es keine Elemente, die zu deiner Suche passen.',
    noPluginsFoundDescription:
      'Versuche es mit anderen Suchbegriffen oder stöbere durch alle verfügbaren Elemente.',
  },
  pluginMenu: {
    singleChoiceExercise: {
      title: 'Single-Choice-Aufgabe',
      description:
        'Eine Aufgabe mit einer Auswahl an Antwortoptionen (Es ist immer nur eine Antwort richtig).',
    },
    multipleChoiceExercise: {
      title: 'Multiple-Choice-Aufgabe',
      description:
        'Eine Aufgabe mit einer Auswahl an Antwortoptionen (eine oder mehrere richtige Antworten).',
    },
    blanksExercise: {
      title: 'Lückentext (Eintippen)',
      description:
        'Erstelle einen Lückentext oder eine Tabelle, bei dem die Antworten durch Eintippen eingefügt werden.',
    },
    blanksExerciseDragAndDrop: {
      title: 'Lückentext (Drag&Drop)',
      description:
        'Erstelle einen Lückentext oder eine Tabelle, bei dem die Antworten via Drag und Drop eingefügt werden.',
    },
  },
  plugins: {
    anchor: {
      title: 'Sprungmarke',
      description: 'Füge eine Sprungmarke innerhalb deines Inhalts hinzu.',
      identifier: 'Ziel-Name (z.B. "lange-erlaerung")',
      anchorId: 'Name der Sprungmarke',
    },
    box: {
      title: 'Box',
      description:
        'Füge eine Box für Beispiele, Zitate, Warnungen, Definitionen, Hinweise usw. ein.',
      type: 'Art der Box',
      typeTooltip: 'Wähle die Art der Box',
      titlePlaceholder: '(optionaler Titel)',
      anchorId: 'Sprungmarke (anchor id)',
      emptyContentWarning: 'Boxen ohne Inhalt werden nicht angezeigt',
    },
    dropzoneImage: {
      title: 'Bilder mit Ablagezonen',
      description:
        'Erstelle eine Aufgabe, bei der vorgegebene Antworten in die richtigen Zonen eines Bilds oder einen leeren Hintergrund gezogen werden müssen.',
      backgroundImage: 'Hintergrundbild',
      addDropZone: 'Ablagezone hinzufügen',
      removeDropZone: 'Ablagezone entfernen',
      dropzoneVisibility: 'Ablagezone Sichtbarkeit',
      visibilityOptions: {
        full: 'Voll',
        partial: 'Nur Rahmen',
        none: 'Kein',
      },
      answers: {
        add: 'Antwort hinzufügen',
        remove: 'Antwort entfernen',
        edit: 'Antwort bearbeiten',
        settings: 'Antworteinstellungen',
        answersPlaceholder: 'Hier findest du deine Antworten',
      },
      answerZone: {
        description: 'Beschreibung (optional)',
        sizeLabel: 'Größe der Zone manuell festlegen',
        duplicate: 'Zone duplizieren',
        delete: 'Zone entfernen',
      },
      backgroundType: {
        description:
          'Füge ein Hintergrundbild hinzu oder starte mit leerem Hintergrund',
        image: 'Hintergrundbild hinzufügen',
        blank: 'Leerer Hintergrund',
      },
      backgroundShapes: {
        description: 'Lege die Ausrichtung des Hintergrundes fest',
        square: 'Quadratisch',
        landscape: 'Querformat',
        portrait: 'Hochformat',
      },
      or: 'oder',
      modal: {
        settings: 'Einstellungen',
        createDropZone: 'Neue Ablagezone',
        edit: 'Antwort bearbeiten',
        createWrongAnswer: 'Falsche Antwort hinzufügen',
      },
    },
    unsupported: {
      title: 'Nicht unterstützt',
      description:
        'Plugin wird von dieser Version des Editors nicht unterstützt.',
      notSupported: 'Sorry, dieses Plugin wird nicht unterstützt:',
      explanation:
        'Es wird Usern nicht angezeigt. Du kannst es entweder entfernen oder unsere Entwickler*innen um Unterstützung bitten.',
    },
    equations: {
      title: 'Terme und Gleichungen',
      description: 'Erstelle Termumformungen und löse mehrzeilige Gleichungen.',
      leftHandSide: 'linke Seite',
      transformation: 'Umformung',
      mode: 'Modus',
      transformationExample: 'z.B. -3x',
      transformationOfEquations: 'Gleichungsumformung',
      transformationOfTerms: 'Termumformung',
      addNewRow: 'Neue Zeile hinzufügen',
      explanation: 'Erklärung',
      term: 'Term',
      rightHandSide: 'rechte Seite',
      combineLikeTerms: 'Fasse die Terme zusammen.',
      setEqual: 'Setze die Terme gleich.',
      firstExplanation: 'Erste Erklärung',
      removeRowLabel: 'Zeile entfernen',
    },
    geogebra: {
      title: 'GeoGebra Applet',
      description: 'Binde GeoGebra Inhalte via Link oder ID ein.',
      chooseApplet: 'Applet auswählen',
      urlOrId: 'GeoGebra Materials URL oder ID',
    },
    highlight: {
      title: 'Code',
      description:
        'Schreibe Code und hebe ihn je nach Programmiersprache hervor.',
      clickAndEnter: 'Klicke hier und füge deinen Quellcode ein…',
      enterHere:
        'Füge hier deinen Quellcode ein. Verlasse den Bereich, um eine Vorschau zu sehen.',
      language: 'Programmiersprache',
      languageTooltip: "Wähle die Sprache für's Syntax-Highlighting",
      showLineNumbers: 'Zeilennummern',
      lineNumbersTooltip: 'Sollten die Besucher*innen Zeilennummern sehen?',
    },
    image: {
      title: 'Bild',
      galleryTitle: 'Galerie',
      description:
        'Lade Bilder hoch oder suche online nach frei lizenzierten Bildern.',
      upload: 'Bild hochladen',
      uploadMultiple: 'Bilder hochladen',
      imageUrl: 'Bild-URL',
      imageSource: 'Bildquelle',
      imageSourceHelpText:
        'Füge hier weitere Informationen wie den Urheber dieses Bildes hinzu.',
      invalidImageUrl: 'Fehler: Ungültige oder unvollständige URL',
      invalidImageUrlMessage:
        'Die eingegebene URL ist entweder ungültig oder unvollständig. Bitte stelle sicher, dass du die vollständige URL korrekt kopiert und eingefügt hast. Die URL sollte mit "http://" oder "https://" beginnen.',
      search: 'Suche',
      searchOnline: 'Online nach lizenzfreien Bildern suchen',
      placeholderSource: 'Quelle (optional)',
      placeholderEmpty: 'https://example.com/image.png',
      placeholderUploading: 'Wird hochgeladen …',
      placeholderFailed: 'Hochladen fehlgeschlagen',
      retry: 'Erneut versuchen',
      failedUpload: 'Hochladen fehlgeschlagen',
      captionPlaceholder: 'Bildunterschrift (optional)',
      href: 'Link',
      hrefPlaceholder: 'Bild verlinken',
      alt: 'Alternativtext (wird nicht angezeigt)',
      altPlaceholder: 'Was ist auf dem Bild zu sehen?',
      maxWidth: 'Maximale Breite',
      maxWidthPlaceholder: 'Gib die maximal Breite an',
      helpTooltipText: 'Mehr Informationen und Hilfe',
      change: 'Bild ändern',
      licence: 'Lizenz',
      licenceHelpText:
        'Externe Inhalte mit den folgenden Lizenzen können auf serlo.org integriert werden:',
      licenceFree: 'Frei lizenzierte Bilder',
      pixabayText:
        'Die Bilder werden von der freien Bilder-Datenbank von Pixabay zur Verfügung gestellt',
      pixabayLoadedText:
        'Die Bilder werden von der freien Bilder-Datenbank von Pixabay zur Verfügung gestellt',
      searching: 'Suche nach Bildern ...',
      loadingImage: 'Bilder werden heruntergeladen ...',
      noImagesFound: 'Keine Bilder gefunden',
    },
    imageGallery: {
      title: 'Bilder Galerie',
      description:
        'Füge eine Bildergalerie hinzu, um zusammenhängende Bilder organisiert darzustellen.',
      modalScreenReaderTitle:
        'Popup, das ein einzelnes Bild anzeigt mit Einstellungen und optionaler Bildunterschrift.',
      addImages: 'Bilder hinzufügen',
      tooManyImagesMessage:
        'Du kannst maximal %max_images% Bilder in der Galerie hochladen. Bitte wähle weniger Bilder aus und versuche es erneut.',
      alreadyMaxImagesMessage:
        'Maximal %max_images% Bilder erlaubt. Bitte entferne ein oder mehrere Bilder, um neue hochzuladen.',
    },
    injection: {
      title: 'serlo.org Inhalt',
      description: 'Binde einen bestehenden Inhalt von serlo.org via ID ein.',
      illegalInjectionFound: 'Ungültige Injection gefunden',
      serloEntitySrc: 'Serlo Inhalt {{src}}',
      serloId: 'Serlo ID',
      placeholder: 'Serlo ID (z.B. 1565)',
      invalidStateWarning:
        "Bitte verwende eine gültige Serlo ID (nur Zahlen) – z.B. '/1555'",
    },
    multimedia: {
      title: 'Erklärung mit Multimedia-Inhalt',
      description:
        'Erstelle einen veranschaulichenden oder erklärenden Multimedia-Inhalt mit zugehöriger Erklärung.',
      chooseSize: 'Größe des Multimedia-Inhalts',
      changeType: 'Tausche das Multimedia Element aus',
      howImportant: 'Wie wichtig ist der Multimedia Inhalt?',
      isIllustrating: 'Es ist nur eine Veranschaulichung',
      isEssential: 'Es spielt eine zentrale Rolle',
      reset: 'Multimedia-Inhalt zurücksetzen',
    },
    pageLayout: {
      title: 'Layout-Spalten für Seiten',
      description: 'Das Plugin, das alle wollen, aber nicht bekommen 🤫',
      chooseRatio: 'Spaltenverhältnis auswählen',
    },
    pasteHack: {
      title: '(experiment) Editor State einfügen',
      description: 'nur in staging',
    },
    pageTeam: {
      title: 'Teamübersicht',
      description: 'Nur für Teamseiten',
    },
    pagePartners: {
      title: 'Partner Liste',
      description:
        'Nur für die Partnerseite (Liste der Partnerlogos wie auf de.serlo.org)',
    },
    rows: {
      title: 'Zeilen',
      description: 'Rows plugin holds other plugins',
      searchForTools: 'Suche hier nach Tools…',
      duplicate: 'Duplizieren',
      copyAnchorLink: 'Link zu diesem Element kopieren',
      remove: 'Löschen',
      close: 'Schließen',
      dragElement: 'Verschiebe das Element innerhalb des Dokuments',
      addAnElement: 'Füge ein Element hinzu',
    },
    serloTable: {
      title: 'Tabelle',
      description: 'Erstelle eine anpassbare Tabelle.',
      mode: 'Modus',
      columnHeaders: 'Nur Spaltentitel',
      rowHeaders: 'Nur Zeilentitel',
      columnAndRowHeaders: 'Spalten- und Zeilentitel',
      convertToText: 'Text als Inhalt',
      convertToImage: 'Bild als Inhalt',
      row: 'Zeile',
      column: 'Spalte',
      addType: '%type% hinzufügen',
      addTypeBefore: '%type% davor hinzufügen',
      deleteType: '%type% löschen',
      confirmDelete:
        'Sicher, dass diese %type% und ihren Inhalt löschen willst?',
    },
    spoiler: {
      title: 'Spoiler',
      description:
        'Füge eine ausklappbare Box ein, z.B. für Exkurse oder Hilfestellungen.',
      enterATitle: 'Titel eingeben',
    },
    solution: {
      title: 'Freitext Aufgabe\n',
      description:
        'Erstelle eine nicht interaktive Aufgabe, die die Lernenden manuell beantworten. Du kannst weiterhin Lösungen und Strategien einfügen.',
    },
    text: {
      title: 'Text',
      description: 'Schreibe Text und Matheformeln, und formatiere sie.',
      placeholder: 'Schreibe etwas …',
      addButtonExplanation: 'Klicke, um ein neues Element einzufügen',
      quote: 'Zitat',
      setColor: 'Einfärben',
      resetColor: 'Farbe zurücksetzen',
      colors: 'Textfarben',
      closeSubMenu: 'Untermenü schließen',
      heading: 'Überschrift',
      headings: 'Überschriften',
      link: 'Link (%ctrlOrCmd% + K)',
      noElementPasteInLists:
        'Sorry,  Elemente einfügen klappt nicht in Listen.',
      pastingPluginNotAllowedHere:
        'Sorry, dieses Plugin kannst du hier nicht einfügen.',
      linkOverlay: {
        placeholder: 'Suchbegriff oder "/1234"',
        inputLabel: 'Suche einen Inhalt oder füge einen Link ein',
        edit: 'Link bearbeiten',
        remove: 'Link entfernen',
        customLink: 'Eigener Link',
        invalidLinkWarning:
          'Bitte gib einen gültigen Link ein, der anfängt mit "https(s)://…"',
      },
      openInNewTab: 'Öffne den Link in einem neuen Tab',
      orderedList: 'Nummerierte Liste',
      unorderedList: 'Aufzählung',
      lists: 'Listen',
      mathFormula: 'Matheformel (%ctrlOrCmd% + M)',
      code: 'Code (%ctrlOrCmd% + ⇧ + C)',
      blank: 'Lücke',
      createBlank: 'Lücke erstellen',
      removeBlank: 'Lücke entfernen',
      bold: 'Fett (%ctrlOrCmd% + B)',
      italic: 'Kursiv (%ctrlOrCmd% + I)',
      colorNames: {
        blue: 'Blau',
        green: 'Grün',
        orange: 'Orange',
      },
      math: {
        formula: '[neue Formel]',
        visual: 'visuell',
        latex: 'LaTeX',
        latexEditorTitle: 'LaTeX-Editor',
        onlyLatex: 'Nur LaTeX verfügbar',
        shortcuts: 'Tastenkürzel',
        fraction: 'Bruch',
        superscript: 'Hochgestellt',
        or: 'oder',
        subscript: 'Tiefgestellt',
        root: 'Wurzel',
        mathSymbols: 'Mathematische Symbole',
        eG: 'z.B.',
        functions: 'Funktionen',
        displayAsBlock: 'eigene Zeile',
        closeMathFormulaEditor: 'Mathe-Formel Editor schließen',
      },
    },
    video: {
      title: 'Video',
      description:
        'Binde Videos von z.B. YouTube, Vimeo oder Wikimedia Commons ein.',
      videoUrl: 'Video URL',
      videoDescription: 'Beschreibung',
      titlePlaceholder: 'Titel',
      url: 'URL',
      seoTitle: 'Titel für Suchmaschinen',
    },
    audio: {
      title: 'Audio',
      description: 'Audioaufnahmen von Vocaroo einbinden',
      audioUrl: 'Audio URL eingeben',
    },
    exercise: {
      title: 'Aufgabe',
      description: 'Interaktive- oder Textaufgaben',
      placeholder: 'Füge hier den Arbeitsauftrag ein (Optional)',
      hideInteractiveInitially: {
        info: 'Interaktives Element ist versteckt beim laden',
        deactivate: 'Interaktives Element sichtbar laden',
        activate: 'Interaktives Element versteckt laden',
      },
      addOptionalInteractiveEx: 'Füge optional ein interaktives Element hinzu:',
      changeInteractive: 'Interaktives Element ändern',
      confirmRemoveInteractive:
        'Your current changes will be replaced. Are you sure?',
      createSolution: 'Lösung hinzufügen',
      removeSolution: 'Lösung entfernen',
      previewMode: 'Vorschau',
      previewIsActiveHint: 'Vorschaumodus ist aktiv',
      previewIsDeactiveHint: 'Hier kannst du bearbeiten',
    },
    exerciseGroup: {
      title: 'Aufgabe mit Teilaufgaben',
      description: 'Liste von Aufgaben mit Teilaufgaben',
    },
    inputExercise: {
      title: 'Eingabefeld',
      description:
        'Erstelle eine Aufgabe, bei der eine exakte Eingabe oder ein Wert eingegeben und validiert werden kann.',
    },
    textAreaExercise: {
      title: 'Freitext',
      description: 'Ein großes Eingabefeld',
    },
    scMcExercise: {
      title: 'SC/MC Aufgabe',
    },
    h5p: {
      title: 'H5P',
      description: 'Importiere eine interaktive Aufgabe von H5P via URL.',
    },
    blanksExercise: {
      title: 'Lückentext',
      placeholder: 'Schreibe einen Text und füge Lücken ein',
      chooseType: 'Wähle den Aufgabentyp',
      chooseChildPluginType: 'Wähle den Eingabetyp',
      modes: {
        typing: 'Tippen',
        'drag-and-drop': 'Drag & Drop',
      },
      dummyAnswers: 'Falsche Antwortmöglichkeiten',
      addDummyAnswer: 'Falsche Antwort hinzufügen',
      removeDummyAnswer: 'Falsche Antwort entfernen',
      addAlternativeAnswer: 'Alternative Antwort hinzufügen',
      removeAlternativeAnswer: 'Alternative Antwort entfernen',
      alternativeAnswers: 'Alternative Antworten',
      acceptMathEquivalents:
        'Mathematisch gleichwertige Ausdrücke als gültige Antwort',
      childPluginSelection:
        'Möchtest du einen Lückentext oder eine Tabelle mit Lücken?',
    },
  },
  templatePlugins: {
    entity: {
      titlePlaceholder: 'Titel',
      seoTitle: 'Titel für Suchmaschinen',
      seoDesc: 'Beschreibung für Suchmaschinen',
      moveUpLabel: 'Eins nach oben verschieben',
      moveDownLabel: 'Nach unten verschieben',
    },
    article: {
      writeShortIntro: 'Fasse das Thema des Artikels kurz zusammen',
      stillWantMore: 'Du hast noch nicht genug vom Thema?',
      moreOnTopic: 'Hier findest du noch weitere passende Inhalte zum Thema',
      addSource: 'Quellenangabe hinzufügen',
      removeLabel: 'Löschen',
      dragLabel: 'Ziehen, um die Reihenfolge zu ändern',
      openInTab: 'Öffne den Link in einem neuen Tab',
      sources: 'Quellen',
      sourceText: 'Quelle',
      sourceUrl: 'Optionaler Link',
      moreInFolder:
        'Weitere Aufgaben zum Thema findest du im folgenden Aufgabenordner',
      addModal: {
        introText:
          'Was würde den Lernenden nach dem Artikel weiterhelfen?%break% Hier kannst du %exercises% einbetten oder eine %exerciseFolder% verlinken. %break% Oder du kannst weiterführende %articles%, %courses% oder %videos% empehlen.',
        introText2:
          'Du kannst entweder eine Serlo ID oder einen Link einfügen, oder unten Inhalte aus dem Elternordner einfügen.',
        buttonEx: 'Aufgaben hinzufügen',
        buttonExFolder: 'Aufgabenordner auswählen',
        buttonContent: 'Inhalt hinzufügen',
        buttonAddType: '%type% hinzufügen',
        title: 'Weiterführende Inhalte oder Übungsaufgaben hinzufügen',
        invalidInput: 'Ungültige ID oder URL',
        fetchError:
          'Etwas ist schief gelaufen, bitte versuche es später noch einmal',
        loading: 'Wird geladen …',
        notFound: 'Inhalt konnte nicht gefunden werden',
        unsupportedType: 'Sorry, der Typ [%type%] wird hier nicht unterstützt',
        unsupportedId:
          'Sorry, diese ID ist hier nicht erlaubt. (z.B. weil sie schon ausgewählt ist, oder weil du diese ID bearbeitest…)',
        addFromFolderTitle: 'Aus dem Ordner',
        placeholder: 'Eine Serlo Id oder URL hier einfügen',
        exerciseFolderNote: 'Hier kann nur ein Ordner ausgewählt werden',
      },
    },
    course: {
      removeCoursePage: 'Kursseite entfernen',
      addCoursePage: 'Kursseite hinzufügen',
      confirmDelete: 'Sicher, dass du diese Kursseite löschen willst?',
    },
    inputExercise: {
      chooseType: 'Wähle den Antworttyp',
      unit: 'Einheit (optional)',
      addAnswer: 'Antwort hinzufügen',
      enterTheValue: 'Gib hier die Antwort ein',
      feedbackPlaceholder: 'Schreibe ein Feedback für diese Antwort',
      yourSolution: 'Deine Lösung',
      types: {
        'input-string-normalized-match-challenge': "Text (genau, z.B. 'Tiger')",
        'input-number-exact-match-challenge': "Zahl (genau, z.B. '0.5')",
        'input-expression-equal-match-challenge':
          'Mathematischer Ausdruck (gleichwertig, z.B. "0,5", "1/2" oder "2/4")',
      },
    },
    scMcExercise: {
      singleChoice: 'Single Choice',
      multipleChoice: 'Multiple Choice',
      chooseType: 'Wähle den Antworttyp',
      addAnswer: 'Antwort hinzufügen',
    },
    solution: {
      optionalExplanation: 'Beschreibe hier optional die Lösungsstrategie',
      idArticle: 'ID eines Artikels, z.B. 1855',
      openArticleTab: 'Öffne den Artikel in einem neuen Tab',
      linkTitle: 'Titel der Verlinkung',
      showSolution: 'Lösung anzeigen',
      hideSolution: 'Lösung ausblenden',
      changeLicense: 'Lizenz ändern',
      addPrerequisite: 'Link hinzufügen',
    },
    textExerciseGroup: {
      removeExercise: 'Teilaufgabe entfernen',
      addExercise: 'Teilaufgabe hinzufügen',
      kindOfExerciseGroup: 'Art der Aufgabengruppe',
      addIntermediateTask: 'Zwischentext hinzufügen',
      removeIntermediateTask: 'Zwischentext entfernen',
      intermediateTask: 'Zwischentext',
    },
  },
  edtrIo: {
    localStorage: {
      found:
        'Du hast lokal gespeicherte Änderungen dieses Inhalts. Möchtest du sie laden?',
      foundButton: 'Änderungen laden',
      restoreInitial:
        'Du kannst auch wieder zurück zur Ausgangsversion. Vorsicht, dabei werden deine bisherigen Änderungen gelöscht.',
      restoreInitialButton: 'Änderungen löschen',
      confirmRestore:
        'Sicher, dass du deine Änderugen unwiderruflich löschen möchtest?',
    },
    settings: 'Einstellungen',
    extendedSettings: 'Erweiterte Einstellungen',
    close: 'Schließen',
    save: 'Speichern',
    saveWithReview: 'Speichern und reviewen lassen',
    cancel: 'Abbrechen',
    saving: 'Speichert…',
    missingChanges: 'Du musst zuerst die Änderungen ausfüllen.',
    missingLicenseTerms: 'Du musst zuerst die Lizenzbedingungen akzeptieren.',
    missingChangesAndLicenseTerms:
      'Du musst zuerst die Lizenzbedingungen akzeptieren und die Änderungen ausfüllen.',
    errorSaving: 'Es trat ein Fehler beim Speichern auf.',
    saveLocallyAndRefresh:
      'Du kannst die Bearbeitung lokal zwischenspeichern, dann die Seite neu laden und es erneut versuchen.',
    revisionSaved: 'Bearbeitung gespeichert',
    saveRevision: 'Bearbeitung zwischenspeichern',
    changes: 'Beschreibe deine Änderungen am Inhalt',
    skipReview: 'Bearbeitung ohne Review freischalten (nicht empfohlen)',
    enableNotifs: 'Benachrichtigungen auf serlo.org erhalten',
    enableNotifsMail: 'Benachrichtigungen per E-mail erhalten',
    switchRevision: 'Andere Version auswählen',
    importOther: 'Aus einem anderen Inhalt importieren',
    importOtherExplanation:
      'Du kannst den Content eines anderen Inhalts hier importieren. Füge dazu einfach hier die URL oder ID eines anderen Inhalts auf serlo.org ein. (Nur gleiche Inhaltstypen sind erlaubt – also Artikel können nur in Artikeln importiert werden). Diese Funktion ist NICHT dazu gedacht exakte Kopien anzulegen. Aufgabengruppen und Kurse werden nicht unterstützt (aber Aufgaben und Kursseiten klappen)',
    importOtherWarning:
      'Vorsicht: Diese Funktion überschreibt alle bestehenden Inhalte in diesem Editor.',
    importOtherButton: 'Inhalte Importieren',
    current: 'Aktuell',
    author: 'Autor*in',
    createdAt: 'Zeitstempel',
    ready: 'Bereit zum Speichern?',
    pluginCopySuccess: 'Plugin kopiert!',
    pluginCopyInfo: 'Du kannst das Plugin jetzt in Text-Plugins einfügen',
    pluginCopyButtonLabel: 'Plugin in die Zwischenablage kopieren',
  },
}
