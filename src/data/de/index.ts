import { headerData, footerData, landingSubjectsData } from './menu-data';
export const instanceData = {
  lang: "de",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "Die freie Lernplattform",
      search: "Suche",
      login: "Anmelden"
    },
    search: {
      privacy: "Die Suche wird von Google bereitgestellt. Schau dir unsere %privacypolicy% an, um herauszufinden, welche Informationen verarbeitet werden.",
      agree: "Zustimmen"
    },
    footer: {
      summaryHeading: "Serlo.org ist die Wikipedia fürs Lernen.",
      summaryText: "Wir sind eine engagierte Gemeinschaft, die daran arbeitet, hochwertige Bildung weltweit frei verfügbar zu machen.",
      learnMore: "Mehr erfahren",
      participate: "Mitmachen",
      donate: "Spenden",
      toTop: "Nach oben"
    },
    categories: {
      articles: "Artikel",
      courses: "Kurse",
      videos: 'Videos',
      applets: 'Applets',
      folders: "Bereiche",
      exercises: "Aufgaben",
      events: "Veranstaltungen"
    },
    entities: {
      applet: 'Applet',
      article: "Artikel",
      course: "Kurs",
      coursePage: "Kursseite",
      event: "Veranstaltung",
      exercise: "Aufgabe",
      exerciseGroup: "Aufgabe mit Teilaufgaben",
      folder: "Bereich",
      groupedExercise: "Teilaufgabe",
      page: "Seite",
      solution: "Lösung",
      taxonomyTerm: "Taxonomie-Begriff",
      user: "Benutzer*in",
      video: 'Video',
      topicFolder: "Aufgabensammlung",
      comment: "Kommentar",
      revision: "Bearbeitung",
      thread: "Diskussion",
      threads: "Diskussionen",
      topic: "Thema",
      subject: "Fach",
      userProfile: "Userprofil",
      privacyPolicy: "Datenschutzerklärung",
      content: "Inhalt"
    },
    pageTitles: {
      notifications: "Deine Benachrichtigungen",
      subscriptions: "Abonnements verwalten",
      revisionHistory: "Bearbeitungsverlauf",
      eventLog: "Aktivitäten",
      unrevisedRevisions: "Ungeprüfte Bearbeitungen",
      userEdits: "Bearbeitungen von %user%",
      userEditsMine: "Meine ungeprüften Bearbeitungen"
    },
    roles: {
      donor: "Spender*in",
      author: "Autor*in",
      reviewer: "Reviewer*in"
    },
    share: {
      button: "Teilen",
      title: "Weitergeben!",
      copyLink: "Link kopieren",
      copySuccess: "In die Zwischenablage kopiert!",
      close: "Schließen",
      pdf: "Als PDF herunterladen",
      pdfNoSolutions: "PDF ohne Lösungen"
    },
    edit: {
      button: "Inhalt überarbeiten",
      unrevised: "Zeige neue Bearbeitungen"
    },
    license: {
      readMore: "Was bedeutet das?",
      special: "Besondere Lizenz",
      nonFree: "Die Nutzung könnte vielleicht strengeren Regeln unterliegen als bei unseren anderen Inhalten."
    },
    course: {
      showPages: "Kursübersicht anzeigen",
      pages: "Kursübersicht",
      next: "Weiter",
      back: "Zurück"
    },
    content: {
      show: "anzeigen",
      hide: "ausblenden",
      prerequisite: "Für diese Aufgabe benötigst Du folgendes Grundwissen:",
      task: "Aufgabenstellung",
      right: "Richtig",
      wrong: "Leider nicht richtig",
      feedback: 'Feedback',
      answer: "Antwort",
      check: "Stimmt's?",
      yourAnswer: "Deine Antwort…",
      chooseOption: "Klicke auf eine der Optionen.",
      printModeChooseOption: "Kreuze eine der Optionen an",
      trashedNotice: "Dieser Inhalt wurde gelöscht.",
      unrevisedNotice: "Dieser Inhalt wurde noch nicht überprüft. Über den %link% kannst du dir die Entwürfe anzeigen lassen.",
      strategy: "Lösungsstrategie",
      picture: "Bild",
      previewImage: "Vorschaubild",
      exercisesTitle: "Übungsaufgaben",
      moreExercises: "Weitere Aufgaben zum Thema findest du im folgenden Aufgabenordner",
      relatedContentTitle: "Du hast noch nicht genug vom Thema?",
      relatedContentText: "Hier findest du noch weitere passende Inhalte zum Thema:",
      sourcesTitle: "Quellen"
    },
    consent: {
      title: "Einwilligungen für externe Inhalte",
      intro: "Während dem Benutzen der Seite hast du uns vielleicht erlaubt, dass wir Inhalte von externen Anbietern laden. Die Details kannst du in unserer %privacypolicy% nachlesen.",
      revokeTitle: "Widerrufen",
      revokeText: "Hier hast du die Möglichkeit mit einem Klick deine Einwilligung zurückzuziehen. In dem Fall fragen wir wieder nach, bevor wir etwas laden.",
      noConsent: "Keine Einwilligungen gespeichert",
      revokeConsent: "Nicht mehr erlauben"
    },
    embed: {
      text: "Mit einem Klick auf Bild oder Button oben stimmst du zu, dass externe Inhalte von %provider% geladen werden. Dabei können persönliche Daten zu diesem Service übertragen werden – entsprechend unserer %privacypolicy%.",
      video: "Video abspielen von %provider%",
      applet: "Applet laden von %provider%",
      twingle: "Spendenformular laden"
    },
    comments: {
      question: "Hast du eine Frage oder Feedback?",
      commentsOne: "Kommentar",
      commentsMany: "Kommentare",
      submit: "Abschicken",
      archiveThread: "Thread archivieren",
      restoreThread: "Thread wiederherstellen",
      deleteThread: "Thread löschen",
      deleteComment: "Kommentar löschen",
      postedOn: "Gepostet am",
      placeholder: "Deine Frage oder Vorschlag…",
      placeholderReply: "Deine Antwort…",
      loading: "Kommentare werden geladen…",
      error: "Die Kommentare konnten leider nicht geladen werden. Bitte versuch es später noch einmal.",
      showMoreReply: "Einen weiteren Kommentar",
      showMoreReplies: "%number% weitere Kommentare",
      showArchived: "Archivierte %threads% anzeigen",
      copyLink: "Kommentarlink kopieren"
    },
    revisions: {
      toOverview: "Zurück zur Übersicht",
      toContent: "Zum Inhalt",
      changes: "Änderungen",
      context: "Im Zusammenhang (akzeptierte Bearbeitung)",
      title: "Titel",
      content: "Inhalt",
      metaTitle: "Meta-Titel",
      metaDescription: "Meta-Beschreibung",
      diff: "Quelltext",
      sidebyside: "Vergleich",
      currentVersion: "Akzeptierte Bearbeitung",
      thisVersion: "Diese Bearbeitung",
      currentNotice: "Das ist die aktuell akzeptierte Bearbeitung.",
      rejectedNotice: "Diese Bearbeitung wurde nicht akzeptiert.",
      noCurrentNotice: "Es gibt noch keine akzeptierte Bearbeitung.",
      unknownNotice: "Diese Revision war vorher die Akzeptierte oder wurde nie überprüft.",
      by: "Von",
      parentFallbackLink: "Zum übergeordneten Inhalt",
      hasChanges: "In diesem Bereich hat es Änderungen gegeben",
      positionForGrouped: "Diese %exercise_or_solution% ist Teil von %title%.",
      helpLink: "Reviewer-Hilfe"
    },
    revisionHistory: {
      changes: "Änderungen",
      author: "Autor*in",
      date: "Wann?",
      edit: "Überarbeiten",
      editLabel: "Erstelle eine Bearbeitung von dieser Bearbeitung aus",
      view: "Anzeigen",
      viewLabel: "Diese Bearbeitung anzeigen",
      status: 'Status'
    },
    unrevisedRevisions: {
      supportLinks: "Wie reviewe ich?",
      guideline: "Review Hilfeseite",
      showMoreEntities: "Alle in %subject% anzeigen",
      showMoreRevisions: "%number weitere anzeigen",
      newLabelText: "neu",
      newLabelNote: "Dieser Inhalt ist neu angelegt",
      wipLabelText: 'wip',
      wipLabelNote: "Diese Bearbeitung ist noch in Arbeit. Bitte noch nicht reviewen.",
      newAuthorText: "neuer Autor",
      newAuthorNote: "Diese Autor*in hat noch nicht viele Bearbeitungen gemacht und freut sich bestimmt über ein schnelles Review.",
      noUnrevisedRevisions: "Aktuell gibt es keine Bearbeitungen von dir, die sich noch im Review befinden."
    },
    errors: {
      title: "😬 Auch Webseiten machen mal Fehler…",
      defaultMessage: "Es tut uns leid, beim Laden dieses Inhalts ging was schief.",
      temporary: "Die gute Nachricht? Das Problem scheint temporär zu sein, bitte versuch es später noch einmal.",
      permanent: "Wir werden sehen, was wir da machen können…",
      typeNotSupported: "Bitte versuche diese Seite noch einmal zu laden.",
      refreshNow: "Jetzt aktualisieren",
      backToPrevious: "Zurück zur vorherigen Seite",
      backToHome: "Zur Startseite"
    },
    print: {
      preparingNotice: "Druck wird vorbereitet!",
      warning: "WICHTIG: Damit alle Bilder und Formeln gedruckt werden, scrolle bitte einmal bis zum Ende der Seite BEVOR du diesen Dialog öffnest. Vielen Dank!"
    },
    profiles: {
      aboutMe: "Über mich",
      recentActivities: "Aktivitäten",
      showAllActivities: "Alle Aktivitäten anzeigen",
      noActivities: "Bisher keine Aktivitäten.",
      lastLogin: "Zuletzt angemeldet",
      yearsWithSerlo: "Jahre dabei!",
      yearWithSerlo: "Jahr dabei!",
      roles: "Rollen",
      instanceRoles: "Rollen auf %lang%.serlo.org:",
      otherRoles: "Andere Rollen:",
      directMessage: "Direktnachricht",
      goToChat: "Zum Chat",
      registerChat: "Beim Chat anmelden",
      inviteToChat: "Zum Chat einladen",
      invitation: "💬 %username% hat dich in den Serlo Community Chat eingeladen!\nGehe zu %chatlink% um dich anzumelden.",
      inviteModal: {
        part1: "%username% ist noch nicht in unserem Community-Chat unter %chatLink% aktiv.",
        part2: "Du kannst %username% zum Chat einladen, um Direktnachrichten zu senden:",
        button: "Einladung senden"
      },
      activityGraph: {
        edits: "Bearbeitungen",
        comments: "Kommentare",
        reviews: 'Reviews',
        taxonomy: "Taxonomie",
        legendary: "💙 Oh wow! 💙",
        untilNextLevel: "%amount% mehr um diesen Kreis zu füllen 🎉"
      },
      howToEditImage: {
        heading: "So kannst du dein Profilbild ändern",
        description: "Wir benutzen die Bilder von %chatLink% als Profilbilder. Um dein Bild zu ändern musst du diesen Schritten folgen:",
        steps: {
          goToChat: "Gehe zu %chatLink%.",
          signIn: "Melde dich an.",
          goToMyAccount: "Gehe im Usermenü auf %myAccountLink%.",
          myAccount: "Mein Konto",
          uploadPicture: "Lade ein neues Bild hoch (ein quadratisches!) und klicke oben auf \"Änderungen speichern\".",
          refreshPage: "Komme hierher zurück und aktualisiere dein Bild mit %refreshLink%.",
          refreshLink: "diesem magischem Link"
        }
      },
      motivation: {
        edit: "Motivationstext ändern",
        add: "Motivation hinzufügen",
        heading: "So kannst du deinen Motivationstext ändern",
        intro: "Motivationen sind eine neue Funktion, die wir aktuell testen. Um deinen Motivationstext zu ändern musst du ein kurzes Formular ausfüllen.",
        privacy: "Das Formular und die Datenspeicherung werden von Google angeboten und persönliche Daten werden zu diesem Anbieter übertragen werden, wenn du dieses Feature benutzt.",
        toForm: "Motivationsformular"
      }
    },
    notices: {
      welcome: "👋 Willkommen %username%!",
      bye: "👋 Bis bald!",
      revisionSaved: "Die Bearbeitung wurde gespeichert und wird bald überprüft 👍",
      revisionAccepted: "Die Bearbeitung wurde akzeptiert ✅",
      revisionRejected: "Die Bearbeitung wurde nicht akzeptiert ❎",
      revisionSavedAccepted: "Die Bearbeitung wurde erfolgreich gespeichert und akzeptiert ✅"
    },
    loading: {
      oneMomentPlease: "Einen Moment bitte …",
      isLoading: "Inhalt wird geladen…",
      unknownProblem: "Es gab ein Problem beim Laden des Inhalts. Bitte versuche es später noch einmal."
    },
    login: {
      pleaseLogInLink: "Bitte melde dich an",
      pleaseLogInText: "um diese Funktion zu benutzen."
    },
    keys: {
      ctrl: "Strg",
      return: "Enter"
    },
    eventLog: {
      currentEvents: "Neuste Aktivitäten",
      oldestEvents: "%amount% älteste Aktivitäten",
      globalDescription: "Alle Aktivitäten auf %lang%.serlo.org "
    },
    events: {
      setThreadStateArchived: "%actor% hat eine %thread% archiviert.",
      setThreadStateUnarchived: "%actor% hat eine %thread% aus dem Archiv geholt.",
      createComment: "%actor% hat einen %comment% in einer %thread% erstellt.",
      createThread: "%actor% hat eine %thread% in einem/einer %object% erstellt.",
      createEntity: "%actor% hat %object% erstellt.",
      setLicense: "%actor% hat die Lizenz von %repository% geändert.",
      createEntityLink: "%actor% hat %child% mit %parent% verknüpft.",
      removeEntityLink: "%actor% hat die Verknüpfung von %child% mit %parent% entfernt.",
      createEntityRevision: "%actor% hat eine %revision% von %entity% erstellt.",
      checkoutRevision: "%actor% hat eine %revision% von %repository% übernommen.",
      rejectRevision: "%actor% hat eine %revision% in %repository% nicht übernommen.",
      createTaxonomyLink: "%actor% hat %child% in %parent% eingeordnet.",
      removeTaxonomyLink: "%actor% hat %child% aus %parent% entfernt.",
      createTaxonomyTerm: "%actor% hat den %term% erstellt.",
      setTaxonomyTerm: "%actor% hat den %term% geändert.",
      setTaxonomyParentDeleted: "%actor% hat den Elternknoten von %child% entfernt.",
      setTaxonomyParentChangedFrom: "%actor% hat den Elternknoten von %child% von %previousparent% auf %parent% geändert.",
      setTaxonomyParentChanged: "%actor% hat den Elternknoten von %child% auf %parent% geändert.",
      setUuidStateTrashed: "%actor% hat %object% in den Papierkorb verschoben.",
      setUuidStateRestored: "%actor% hat %object% aus dem Papierkorb wieder hergestellt.",
      inviteToChat: "Du wurdest in den Chat eingeladen! %break% Gehe zu %chatLink% , um mit %actor% und anderen zu chatten.",
      entityPlaceholderFallback: "Inhalt"
    },
    actions: {
      loadMore: "Weitere laden"
    }
  }
};
export const instanceLandingData = {
  lang: "de",
  subjectsData: landingSubjectsData,
  strings: {
    vision: "Wir ermöglichen Schüler*innen und Studierenden selbständig und im eigenen Tempo zu lernen – unabhängig von den finanziellen Möglichkeiten ihrer Eltern, denn serlo.org ist und bleibt komplett kostenlos.\n\nUnsere Vision ist es, hochwertige Bildung weltweit frei verfügbar zu machen.",
    learnMore: "Mehr erfahren",
    democraticallyStructured: "demokratisch organisiert",
    nonProfit: 'non-profit',
    transparent: 'transparent',
    openlyLicensed: "frei lizenziert",
    adFree: "werbefrei",
    freeOfCharge: "kostenlos",
    wikiTitle: "Serlo.org ist die Wikipedia fürs Lernen",
    wikiText: "Genau die Wikipedia wird diese Plattform von einer engagierten Autor*innen Community erstellt. Serlo Education wird betrieben von einem dezentralisierten Team Ehrenamtlicher und Professioneller überall auf der Welt.",
    movementTitle: "Werden Sie Teil unserer Bewegung für freie Bildung",
    callForAuthors: "Wir suchen Lehrkräfte mit Begeisterung für ihr Fach. Werden Sie Autor*in auf serlo.org, erstellen Sie neue Inhalte und helfen Sie uns, die Qualität der Lernplattform zu sichern.",
    communityLink: "Zur Startseite für Autor*innen",
    callForOther: "Wir suchen neue hauptamtliche und ehrenamtliche Teammitglieder für die Bereiche Softwareentwicklung, Redaktion und NGO-Management.",
    getInvolved: "Mach mit!"
  }
};
export const serverSideStrings = {
  title: "lernen mit Serlo!"
};
export const loggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: "Benachrichtigungen",
    icon: 'notifications'
  }, {
    url: '',
    title: "Benutzer*in",
    icon: 'user',
    children: [{
      url: '/user/me',
      title: "Eigenes Profil"
    }, {
      url: '/auth/password/change',
      title: "Passwort ändern"
    }, {
      url: '/event/history/user/me',
      title: "Meine Bearbeitungen"
    }, {
      url: '/subscriptions/manage',
      title: "Abonnements"
    }, {
      url: '/api/auth/logout',
      title: "Abmelden"
    }]
  }],
  strings: {
    tools: "Weitere Optionen",
    authorMenu: {
      log: "Aktivitätenlog",
      settings: "Einstellungen",
      moveCoursePage: "Kursseite in einen anderen Kurs verschieben",
      thisCoursePage: "Diese Kursseite",
      addCoursePage: "Kursseite hinzufügen",
      wholeCourse: "Gesamter Kurs",
      copyItems: "Element kopieren",
      moveItems: "Elemente verschieben",
      addGroupedTextExercise: "Textaufgabe mit Teilaufgaben hinzufügen",
      changeLicense: "Lizenz auswählen",
      subscribe: "Abonnieren",
      subscribeNotifications: "Benachrichtigungen empfangen",
      subscribeNotificationsAndMail: "Benachrichtigungen und E-Mails erhalten",
      unsubscribeNotifications: "Abbestellen",
      convert: "Umwandeln (beta)",
      history: "Bearbeitungsverlauf",
      editAssignments: "Zuweisung zu Themen und Lehrplänen bearbeiten",
      moveToTrash: "In den Papierkorb verschieben",
      restoreContent: "Aus dem Papierkorb wiederherstellen",
      sortCoursePages: "Kursseiten sortieren",
      sortGroupedExercises: "Teilaufgaben sortieren",
      edit: "Überarbeiten",
      unrevisedEdit: "Zeige neue Bearbeitungen",
      organize: "Baumstruktur bearbeiten",
      moveToGrouped: 'Move content to other grouped-text-exercise',
      moveToTextExercise: "Inhalt zu anderer Textaufgabe verschieben",
      sortEntities: "Inhalt sortieren",
      newEntity: "Neuer Inhalt",
      editProfile: "Profil bearbeiten",
      directLink: "Direkter Link zu diesem Inhalt"
    },
    notifications: {
      hide: "Benachrichtigungen für diesen Inhalt nicht mehr anzeigen.",
      setToRead: "Benachrichtigung als gelesen markieren.",
      setAllToRead: "Alle sichtbaren gelesen",
      showNew: "Neu",
      showRead: "Gelesen"
    },
    subscriptions: {
      mail: "E-Mails",
      subscription: "Abonnement",
      noMails: "deaktivieren",
      getMails: "aktivieren",
      noNotifications: "abbestellen",
      loadedSentence: "%loadedCount% von %totalCount% Abonnements geladen.",
      loadMoreLink: "Mehr laden!"
    },
    revisions: {
      checkout: {
        action: "Akzeptieren",
        title: "Bearbeitung akzeptieren",
        explanation: "Bitte gib der Autor*in ein bisschen Feedback."
      },
      reject: {
        action: "Nicht akzeptieren",
        title: "Bearbeitung nicht akzeptieren",
        explanation: "Bitte sag der Bearbeiter*in, warum die Änderung nicht angenommen wird."
      },
      confirm: "Bestätigen",
      unrevisedTaxNote: "Neuer Inhalt, noch nicht akzeptiert"
    },
    editor: {
      edtrIo: {
        extendedSettings: 'Extended Settings',
        close: 'Close',
        notSupportedYet: "This content type isn't supported by the new editor, yet.",
        editInOld: 'Edit the content in the old editor.',
        conversionError: 'An error occurred during the conversion.',
        oldRevisionFound: 'We found an old revision created by you. Do you want to restore it?',
        notConverted: "This entity hasn't been converted to the new editor, yet.",
        text: 'Text',
        textDesc: 'Compose content using rich text and math formulas.',
        blockquoteTitle: 'Quotation',
        quoteDescription: 'Create indented text for quotations.',
        geogebraTitle: 'GeoGebra Applet',
        geogebraDesc: 'Embed GeoGebra Materials applets via URL or ID.',
        highlightTitle: 'Source Code',
        highlightDesc: 'Highlight the syntax of source code.',
        anchor: 'Anchor',
        anchorDesc: 'Insert an anchor.',
        image: 'Image',
        imageDesc: 'Upload images.',
        importantTitle: 'Important Statement',
        importantDesc: 'A box to highlight important statements.',
        injectionTitle: 'serlo.org Content',
        injectionDesc: 'Embed serlo.org content via their ID.',
        multimediaTitle: 'Multimedia content associated with text',
        multimediaDesc: 'Create an illustrating or explaining multimedia content associated with text.',
        spoiler: 'Spoiler',
        spoilerDesc: 'A collapsible box.',
        table: 'Table',
        tableDesc: 'Create tables using Markdown.',
        video: 'Video',
        videoDesc: 'Embed YouTube, Vimeo, Wikimedia Commons or BR videos.',
        solutionSeparator: 'Solution Separator',
        solutionSeparatorDesc: 'Divide the solution into individual steps.',
        save: 'Save',
        cancel: 'Cancel',
        saving: 'Saving…',
        missingChanges: 'You need to fill out the changes you made',
        missingLicenseTerms: 'You need to accept the license terms',
        missingChangesAndLicenseTerms: 'You need to fill out the changes you made and accept the license terms',
        errorSaving: 'An error occurred during saving.',
        saveLocallyAndRefresh: 'You can store the revision locally, refresh the page and try to save again.',
        revisionSaved: 'Revision saved',
        saveRevision: 'Save revision',
        changes: 'Changes',
        skipReview: 'Skip peer review (not recommended)',
        enableNotifs: 'Enable serlo.org notifications',
        enableNotifsMail: 'Enable notifications via e-mail',
        switchRevision: 'Switch to another revision',
        current: 'Current',
        author: 'Author',
        createdAt: 'when?',
        settings: 'Settings',
        equationsTitle: 'Terms and equations',
        equationsDesc: 'Write term manipulations and solve multiline equations.'
      },
      anchor: {
        identifier: 'Identifier',
        anchorId: 'ID of the anchor'
      },
      geogebra: {
        urlOrId: 'GeoGebra URL or ID'
      },
      highlight: {
        clickAndEnter: 'Click here and enter your source code…',
        enterHere: 'Enter your source code here',
        language: 'Language',
        enterLanguage: 'Enter language',
        showLineNumbers: 'Show line numbers'
      },
      inputExercise: {
        text: 'Text',
        chooseType: 'Choose the exercise type',
        unit: 'Unit',
        addAnswer: 'Add answer',
        enterTheValue: 'Enter the value',
        yourSolution: 'Your solution',
        correct: 'Correct',
        wrong: 'Wrong',
        number: "Number (exact solution, e.g. '0,5' ≠ '1/2' ≠ '2/4')",
        mathematicalExpressionSolution: "Mathematical expression (equivalent solution, e.g. '0,5' = '1/2' = '2/4')"
      },
      multimedia: {
        image: 'Image',
        video: 'Video',
        geogebraTitle: 'GeoGebra Applet',
        changeType: 'Change the multimedia type',
        howImportant: 'How important is the multimedia content?',
        isIllustrating: 'It is illustrating',
        isEssential: 'It is essential'
      },
      rows: {
        searchForTools: 'Search for tools…',
        duplicate: 'Duplicate',
        remove: 'Remove',
        close: 'Close',
        dragElement: 'Drag the element within the document',
        addAnElement: 'Add an element'
      },
      scMcExercise: {
        singleChoice: 'Single-choice',
        multipleChoice: 'Multiple-choice',
        chooseType: 'Choose the exercise type',
        addAnswer: 'Add answer',
        wrong: 'Wrong',
        missedSome: 'Almost! You missed at least one correct answer',
        correct: 'Correct'
      },
      spoiler: {
        enterATitle: 'Enter a title'
      },
      text: {
        quote: 'Quote',
        setColor: 'Set color',
        resetColor: 'Reset color',
        colors: 'Colors',
        closeSubMenu: 'Close sub menu',
        heading: 'Heading',
        headings: 'Headings',
        linkStrgK: 'Link (Strg + K)',
        enterUrl: 'Enter URL',
        openInNewTab: 'Open in new tab',
        orderedList: 'Ordered list',
        unorderedList: 'Unordered list',
        lists: 'Lists',
        mathFormula: 'Math formula (Strg + M)',
        displayAsBlock: 'Display as block',
        formula: '[formula]',
        visual: 'visual',
        laTeX: 'LaTeX',
        onlyLaTeX: 'Only LaTeX editor available',
        shortcuts: 'Shortcuts',
        fraction: 'Fraction',
        superscript: 'Superscript',
        or: 'or',
        subscript: 'Subscript',
        root: 'Root',
        mathSymbols: 'Math symbols',
        eG: 'e.g.',
        functions: 'Functions',
        bold: 'Bold (Strg + B)',
        italic: 'Italic (Strg + I)',
        noItemsFound: 'No items found'
      },
      video: {
        videoUrl: 'Video URL',
        description: 'Description',
        title: 'Title',
        url: 'URL',
        seoTitle: 'Title for search engines'
      },
      error: {
        convertionError: 'This part of the document could not be converted.'
      },
      exercise: {
        addChoiceExercise: 'Add choice exercise',
        choiceExercise: 'Choice exercise',
        addInputExercise: 'Add input exercise',
        inputExercise: 'Input exercise',
        addOptionalInteractiveEx: 'Add an optional interactive exercise:'
      },
      injection: {
        illegalInjectionFound: 'Illegal injection found',
        serloEntitySrc: 'Serlo entity {{src}}',
        serloId: 'Serlo ID:'
      },
      layout: {
        toDragConvert: 'To make the content draggable, convert them for the new editor:',
        oneColumnLayout: 'One-column layout',
        multimediaTitle: 'Multimedia content associated with text'
      },
      solution: {
        optionalExplanation: 'Optionally explain the solution strategy here',
        fundamentalsNote: 'For this exercise, you need the following fundamentals:',
        idArticle: 'ID of an article, e.g. 1855',
        openArticleTab: 'Open the article in a new tab:',
        linkTitle: 'Title of the link',
        showSolution: 'Show solution',
        hideSolution: 'Hide solution'
      },
      applet: {
        seoTitle: 'Title for search engines',
        seoDesc: 'Description for search engines',
        title: 'Title'
      },
      article: {
        seoTitle: 'Title for search engines',
        seoDesc: 'Description for search engines',
        title: 'Title',
        writeShortIntro: 'Write a short introduction',
        exercises: 'Exercises',
        dragTheExercise: 'Drag the exercise',
        removeExercise: 'Remove exercise',
        addOptionalExercise: 'Add optional exercise',
        stillWantMore: 'Still want more?',
        moreOnTopic: 'You can find more content on this topic here',
        articles: 'Articles',
        addArticle: 'Add article',
        idArticle: 'ID of an article, e.g. 1855',
        openArticleTab: 'Open the article in a new tab:',
        dragTheArticle: 'Drag the article',
        courses: 'Courses',
        addCourse: 'Add course',
        idCourse: 'ID of a course, e.g. 51979',
        openCourseTab: 'Open the course in a new tab:',
        dragTheCourse: 'Drag the course',
        videos: 'Videos',
        addVideo: 'Add video',
        idVideo: 'ID of a video, e.g. 40744',
        openVideoTab: 'Open the video in a new tab:',
        dragTheVideo: 'Drag the video',
        linkTitle: 'Title of the link',
        sources: 'Sources',
        linkUrl: 'URL of the link',
        openInNewTab: 'Open the link in a new tab:',
        dragTheSource: 'Drag the source',
        addSource: 'Add source',
        moreInFolder: 'You can find more exercises in the following folder',
        exFolderId: 'ID of an exercise folder, e.g. 30560',
        openExerciseTab: 'Open the exercise folder in a new tab:'
      },
      coursePage: {
        explanation: 'Explanation',
        video: 'Video',
        question: 'Question',
        title: 'Title'
      },
      course: {
        seoDesc: 'Description for search engines',
        title: 'Title',
        removeCoursePage: 'Remove course page',
        addCoursePage: 'Add course page'
      },
      event: {
        seoTitle: 'Title for search engines',
        seoDesc: 'Description for search engines',
        title: 'Title'
      },
      page: {
        title: 'Title'
      },
      taxonomy: {
        title: 'Title'
      },
      textExerciseGroup: {
        removeExercise: 'Remove exercise',
        addExercise: 'Add exercise',
        kindOfExerciseGroup: 'Kind of exercise group',
        notCohesive: 'not cohesive',
        cohesive: 'cohesive'
      },
      textExercise: {
        removeSolution: 'Remove solution',
        createSolution: 'Create solution'
      },
      equations: {
        leftHandSide: 'left-hand side',
        transformation: 'transformation',
        mode: 'Mode',
        transformationOfEquations: 'Transformation of equations',
        transformationOfTerms: 'Transformation of terms',
        addNewRow: 'Add new row',
        explanation: 'Explanation',
        term: 'Term',
        rightHandSide: 'right-hand side',
        combineLikeTerms: 'Combine like terms.',
        setEqual: 'Set the terms equal to each other.'
      },
      deprecated: {
        unsupported: 'This part of the document contains features that are no longer supported.'
      }
    }
  }
};