import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: "de",
  headerData: headerData,
  footerData: footerData,
  secondaryMenus: secondaryMenus,
  strings: {
    header: {
      slogan: "Die freie Lernplattform",
      search: "Suche",
      login: "Anmelden",
      skipLinks: {
        sentence: "Springe zum %content% oder %footer%",
        content: "Inhalt",
        footer: "Footer"
      }
    },
    search: {
      privacy: "Die Suche wird von Google bereitgestellt. Schau dir unsere %privacypolicy% an, um herauszufinden, welche Informationen verarbeitet werden.",
      agree: "Zustimmen um zu suchen"
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
      events: "Veranstaltungen",
      unrevised: "Ungeprüft",
      subterms: "Unter-Themenbereich",
      exercisesContent: "Aufgaben-Inhalte"
    },
    entities: {
      applet: 'Applet',
      article: "Artikel",
      course: "Kurs",
      coursePage: "Kursseite",
      event: "Veranstaltung",
      exercise: "Aufgabe",
      exerciseGroup: "Aufgabe mit Teilaufgaben",
      topic: "Themenbereich",
      groupedExercise: "Teilaufgabe",
      page: "Seite",
      solution: "Lösung",
      taxonomyTerm: "Taxonomie-Begriff",
      user: "Benutzer*in",
      video: 'Video',
      exerciseFolder: "Aufgabensammlung",
      comment: "Kommentar",
      revision: "Bearbeitung",
      thread: "Diskussion",
      threads: "Diskussionen",
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
      userEditsMine: "Meine ungeprüften Bearbeitungen",
      editProfile: "Profil bearbeiten & Einstellungen",
      recycleBin: "Papierkorb",
      diagon: "Winkelgasse",
      discussions: "Kommentare",
      manageRoles: "User-Rollen verwalten"
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
    editOrAdd: {
      button: "Überarbeiten",
      addNewEntities: "Inhalt hinzufügen",
      addNewExercises: "Aufgabe hinzufügen",
      editExercises: "Aufgaben überarbeiten",
      unrevised: "Zeige neue Bearbeitungen",
      inviteModal: {
        title: "Erstelle mit uns Lerninhalte!",
        text: "Hallo! %break% Spitze, dass du etwas zu diesem Inhalt beitragen möchtest 👍\nJede*r kann Inhalte bearbeiten, aber du brauchst einen Account.\n\n",
        loginButton: "Jetzt einloggen",
        registerButton: "Neuen Account anlegen",
        psText: "%link% kannst du herausfinden, auf welche Arten du beitragen kannst.",
        psLinkText: "Hier"
      }
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
      back: "Zurück",
      noPagesWarning: "Leider gibt es für diesen Kurs noch keine akzeptierten Seiten.",
      noRevisionForPage: "Ungegeprüfte Seite"
    },
    content: {
      show: "anzeigen",
      hide: "ausblenden",
      trashedNotice: "Dieser Inhalt wurde gelöscht.",
      unrevisedNotice: "Dieser Inhalt wurde noch nicht überprüft. Über den %link% kannst du dir die Entwürfe anzeigen lassen.",
      emptyNotice: "Hier gibt es keinen Inhalt. Bitte bearbeiten oder löschen.",
      picture: "Bild",
      previewImage: "Vorschaubild",
      imageAltFallback: "Bild",
      exercisesTitle: "Übungsaufgaben",
      moreExercises: "Weitere Aufgaben zum Thema findest du im folgenden Aufgabenordner",
      relatedContentTitle: "Du hast noch nicht genug vom Thema?",
      relatedContentText: "Hier findest du noch weitere passende Inhalte zum Thema:",
      sourcesTitle: "Quellen",
      exercises: {
        prerequisite: "Für diese Aufgabe benötigst Du folgendes Grundwissen:",
        task: "Aufgabenstellung",
        correct: "Richtig",
        missedSome: "Fast! Dir fehlt noch mindestens eine richtige Antwort.",
        wrong: "Leider nicht richtig",
        feedback: 'Feedback',
        answer: "Antwort",
        check: "Stimmt's?",
        yourAnswer: "Deine Antwort…",
        chooseOption: "Klicke auf eine der Optionen",
        printModeChooseOption: "Kreuze eine der Optionen an",
        strategy: "Lösungsstrategie",
        showSolution: "Lösung anzeigen",
        hideSolution: "Lösung ausblenden"
      },
      boxTypes: {
        blank: "Blanko",
        example: "Beispiel",
        quote: "Zitat",
        approach: "Vorgehen",
        remember: "Merke",
        attention: "Vorsicht",
        note: "Beachte",
        definition: 'Definition',
        theorem: "Satz",
        proof: "Beweis"
      }
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
      hideReplies: "Einklappen",
      showArchived: "Archivierte %threads% anzeigen",
      copyLink: "Kommentarlink kopieren",
      commentsOverviewExplanation: "Hier siehst du eine Liste mit allen Kommentaren, die zu den Inhalten auf %instance%.serlo.org hinterlassen wurden. %break% Beantworte Fragen oder finde Inhalte, die du verbessern und überarbeiten kannst. %break% Der Link über dem Kommentar bringt dich zum entsprechenden Inhalt.",
      edit: "Kommentar bearbeiten",
      cancelEdit: "Abbrechen",
      saveEdit: "Speichern"
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
      help1: "Hier landen alle Bearbeitungen der Autor*innen. Diese werden in der Qualitätskontrolle durch die %reviewersLink% überprüft und freigegeben.",
      reviewers: "Reviewer*innen",
      reviewersUrl: "/community/202923/rollen-der-serlo-community",
      help2: "Alle können die Bearbeitungen anschauen und weiter bearbeiten. In der Vorschau können Reviewer*in die Bearbeitung übernehmen und Feedback geben.",
      help3: "Du möchtest Reviewer*in werden? Melde dich bei: %contactLink%.",
      contactPerson: 'LinaMaria',
      contactPersonUrl: 'https://community.serlo.org/direct/LinaMaria',
      help4: "Wie geht das Reviewen? Hier gibt es die %guidelineLink%.",
      guideline: "Anleitung",
      guidelineUrl: "/140473",
      subjectLinks: "Direkt zum Fach",
      showMoreEntities: "Alle in %subject% anzeigen",
      showMoreRevisions: "%number weitere anzeigen",
      newLabelText: "neu",
      newLabelNote: "Dieser Inhalt ist neu angelegt",
      wipLabelText: 'wip',
      wipLabelNote: "Diese Bearbeitung ist noch in Arbeit. Bitte noch nicht reviewen.",
      newAuthorText: "neuer Autor",
      newAuthorNote: "Diese Autor*in hat noch nicht viele Bearbeitungen gemacht und freut sich bestimmt über ein schnelles Review.",
      noUnrevisedRevisions: "Aktuell gibt es keine Bearbeitungen von dir, die sich noch im Review befinden.",
      importedContentText: "importiert",
      importedContentNote: "Diese Bearbeitung enthält importierte Inhalte",
      importedContentIdentifier: "Inhalt importiert von"
    },
    errors: {
      title: "😬 Auch Webseiten machen mal Fehler…",
      defaultMessage: "Es tut uns leid, beim Laden dieses Inhalts ging was schief.",
      temporary: "Die gute Nachricht? Das Problem scheint temporär zu sein, bitte versuch es später noch einmal.",
      permanent: "Wir werden sehen, was wir da machen können…",
      typeNotSupported: "Bitte versuche diese Seite noch einmal zu laden.",
      refreshNow: "Jetzt aktualisieren",
      backToPrevious: "Zurück zur vorherigen Seite",
      backToHome: "Zur Startseite",
      deletedComment: {
        title: "Hoppla, das gibt's hier nicht mehr",
        text: "Sorry, dieser %type% ist nicht mehr online.%break% Aber er wurde absichtlich gelöscht und war deine Zeit wahrscheinlich sowieso nicht wert 💚"
      }
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
      inviteModal: {
        part1: "%username% ist noch nicht in unserem Community-Chat unter %chatLink% aktiv.",
        part2: "Du kannst %username% zum Chat einladen, um Direktnachrichten zu senden.",
        messagePlaceholder: "Optional: Persönliche Nachricht",
        button: "Einladung senden",
        success: "✨ Erfolgreich eingeladen!"
      },
      activityGraph: {
        edits: "Bearbeitungen",
        comments: "Kommentare",
        reviews: 'Reviews',
        taxonomy: "Taxonomie",
        legendary: "💙 Oh wow! 💙",
        untilNextLevel: "%amount% mehr um diesen Kreis zu füllen 🎉"
      },
      editMotivation: "Motivationstext ändern",
      addMotivation: "Motivation hinzufügen",
      lockedDescriptionTitle: "Deine Beschreibung ist aktuell nur für dich sichtbar.",
      lockedDescriptionText: "Nach deinen ersten Aktivitäten auf Serlo wird sie für alle sichtbar."
    },
    notices: {
      welcome: "👋 Willkommen %username%!",
      bye: "👋 Bis bald!",
      alreadyLoggedIn: "👋 Willkommen zurück",
      warningLoggedOut: "⚠️ Du wurdest abgemeldet. Bitte melde dich wieder an und benutze dann \"Änderungen laden\" um deine aktuellen Änderungen wiederherzustellen.",
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
    auth: {
      pleaseLogInLink: "Bitte melde dich an,",
      pleaseLogInText: "um diese Funktion zu benutzen.",
      register: {
        registerTitle: "Deinen Serlo Account erstellen",
        passwordRequirements: "Mindestens 8 Zeichen, länger ist besser.",
        registerIntro: "Du brauchst keinen Account zum Lernen auf serlo.org. %break% Aber wenn du kommentieren oder mitwirken willst, bist du hier genau richtig."
      },
      recoverTitle: "Deinen Account wiederherstellen",
      recoveryInstructions: "Gib hier deine Mailadresse an und schick sie uns. %break% Du bekommst dann eine Mail mit einem Link zum Passwort-Zurücksetzen.",
      verify: {
        title: "Bestätige deine Mailadresse",
        instructions: "Gib hier deine Mailadresse an und schick sie ab, um einen Bestätigungslink per Mail zu bekommen.",
        alreadyDone: "Du bist eingeloggt, das heißt deine Mailadresse ist schon bestätigt 😊."
      },
      settings: {
        title: "Dein Passwort ändern",
        instruction: "Gib hier dein neues Passwort an."
      },
      loggingOut: "Du wirst abgemeldet …",
      login: {
        confirmAction: "Vorgang bestätigen",
        signIn: "Mit deinem Account anmelden",
        logOut: "Abmelden",
        newHere: "Bist du neu hier?",
        registerNewAccount: "Einen neuen Account anlegen",
        forgotPassword: "Hast du %forgotLinkText%?",
        forgotLinkText: "dein Passwort vergessen",
        validSessionDetected: "Hey, du bist schon in einem anderen Tab angemeldet. Lade bitte die Seite neu."
      },
      fields: {
        identifier: "Benutzername oder E-Mailadresse",
        username: "Benutzername",
        password: "Passwort",
        email: "E-Mail-Adresse",
        interest: "Ich bin hier als…"
      },
      interests: {
        pleaseChoose: "bitte auswählen",
        parent: "Elternteil",
        teacher: "Lehrer*in",
        pupil: "Schüler*in",
        student: "Student*in",
        other: "Sonstige"
      },
      messages: {
        code1010003: "Zur Sicherheit überprüfen wir hier noch mal, ob das dein Account ist.",
        code1010001: "Anmelden",
        code1010002: "Mit NBP Account anmelden",
        code1010013: "Weiter mit SSO",
        code1040001: "Account anlegen",
        code1040002: "Mit NBP Account registrieren",
        code1040003: "Weiter",
        code1050001: "Deine Änderungen wurden gespeichert! 🎉",
        code1060001: "Du hast deinen Account wiederhergestellt. Bitte ändere dein Passwort in den nächsten Minuten.",
        code1060002: "Wir haben dir eine E-Mail mit einem Link zum Wiederherstellen an die angegebene Adresse geschickt. %break% Schau in deine Mailbox und benutze den Link.",
        code1070003: "Speichern",
        code1070005: "Absenden",
        code1080001: "Eine E-Mail mit einem Bestätigungslink wurde an die angegebene E-Mail-Adresse gesendet.",
        code1080002: "Du hast deine E-Mail-Adresse erfolgreich bestätigt.",
        code4000001: '%reason%',
        code4000002: "%field% bitte noch angeben.",
        // Should map to usernameInvalid
        code4000004: '%reason%',
        code4000005: '%reason%',
        code4000006: "Der Benutzername, die E-Mail-Adresse oder das Passwort stimmen so nicht. Bitte überprüfe deine Eingabe.",
        code4000007: "Ein Account mit der selben E-Mailadresse oder dem selben Benutzernamen existiert schon.",
        code4000008: "Der Bestätigungscode ist ungültig. Bitte versuche es nochmal.",
        code4000010: "Hast du deine E-Mailadresse schon bestätigt?.%break% %verificationLinkText%",
        code4060004: "Der Link zum Wiederherstellen ist nicht gültig oder wurde schon benutzt. Bitte versuche dir noch mal einen Link zuschicken zu lassen.",
        code4070001: "Der Bestätigungslink ist nicht gültig oder wurde schon benutzt. Bitte versuche dir noch mal einen Link zuschicken zu lassen.",
        code4070005: "Dieser Bestätigungslink ist leider nicht mehr gültig. Bitte versuche eine neue E-Mail anzufordern."
      },
      usernameInvalid: 'Your username may only contain letters, digits, underscores (_) and hyphens (-).',
      usernameTooLong: "Sorry, dieser Benutzername ist zu lang. 32 Zeichen oder weniger sind erlaubt.",
      passwordTooShort: "Leider ist dieses Passwort zu kurz. Bitte wähle ein Passwort, das mindestens 8 Zeichen lang ist.",
      passwordTooLong: "Sorry, dieses Passwort ist zu lang. Bitte wähle ein Passwort, das höchstens 72 Zeichen lang ist.",
      passwordTooSimilar: "Sorry, dieses Passwort ist deiner Mailadresse oder deinem Benutzernamen zu ähnlich.",
      emailInvalid: "Sorry, das ist keine gültige E-Mail-Adresse. Schau nach, ob du dich vertippt hast.",
      registrationCheckboxAgreement: "Ich stimme der %privacypolicy% und den %terms% zu. Ich bin einverstanden E-Mail Benachrichtigungen von Serlo zu erhalten von denen ich mich jederzeit abmelden kann.",
      consentNeededBeforeProceeding: "Wir brauchen dein Einverständnis, um fortzufahren.",
      terms: "Nutzungsbedingungen",
      signUp: "Account anlegen",
      verificationProblem: "Wenn du keine Mail bekommen hast",
      verificationLinkText: "Klick hier, um eine neue Bestätigungsmail zu erhalten."
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
      entityInParentPreposition: 'in',
      commentInParentPreposition: "zu",
      setThreadStateArchived: "%actor% hat eine %thread% archiviert.",
      setThreadStateUnarchived: "%actor% hat eine %thread% aus dem Archiv geholt.",
      createComment: "%actor% hat einen %comment% in einer %thread% erstellt.",
      createThread: "%actor% hat eine %thread% in %object% erstellt.",
      createEntity: "%actor% hat %object% erstellt.",
      setLicense: "%actor% hat die Lizenz von %repository% geändert.",
      createEntityLink: "%actor% hat %child% zugewiesen zu %parent%.",
      removeEntityLink: "%actor% hat die Zuweisung von %child% zu %parent% entfernt.",
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
      inviteToChat: "%actor% hat dich in den Chat eingeladen: %comment% Gehe zu %chatLink% , um mit %actor% und anderen zu chatten.",
      entityPlaceholderFallback: "Inhalt"
    },
    actions: {
      loadMore: "Weitere laden"
    },
    bin: {
      title: "Titel",
      trashed: "Gelöscht…"
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
      url: '/event/history/user/me',
      title: "Meine Bearbeitungen"
    }, {
      url: '/subscriptions/manage',
      title: "Abonnements"
    }, {
      url: '/auth/settings',
      title: "Passwort ändern"
    }, {
      url: '/user/settings',
      title: "Einstellungen"
    }, {
      url: '/auth/logout',
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
      confirmTrash: "Bist du sicher, dass du diesen Inhalt löschen willst?",
      restoreContent: "Aus dem Papierkorb wiederherstellen",
      sortCoursePages: "Kursseiten sortieren",
      sortGroupedExercises: "Teilaufgaben sortieren",
      edit: "Überarbeiten",
      editTax: "Titel & Beschreibung bearbeiten",
      unrevisedEdit: "Zeige neue Bearbeitungen",
      sortEntities: "Inhalte sortieren",
      newEntity: "Neuer Inhalt",
      editProfile: "Profil bearbeiten",
      directLink: "Direkter Link zu diesem Inhalt",
      analyticsLink: "Analytics Daten anschauen"
    },
    notifications: {
      hide: "Neue Benachrichtigungen für diesen Inhalt deaktivieren.",
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
      loadedSentence: "%loadedCount% von %totalCount% Einträgen geladen.",
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
    mutations: {
      success: {
        trash: "Erfolgreich gelöscht 🗑",
        restore: "Erfolgreich wiederhergestellt ♻️",
        accept: "Bearbeitung wurde akzeptiert ✅",
        reject: "Bearbeitung wurde nicht akzeptiert ❌",
        save: "Bearbeitung erfolgreich gespeichert ✅",
        updated: "Erfolgreich aktualisiert",
        generic: "Hat geklappt 🎉",
        saveNeedsReview: "Danke für deine Bearbeitung 🎉 Die Reviewer*innen prüfen sie bald und dann ist sie auf der Seite sichtbar."
      },
      errors: {
        UNAUTHENTICATED: "Für diese Funktion musst du dich einloggen!",
        FORBIDDEN: "Dafür fehlen dir leider die Rechte!",
        INVALID_TOKEN: '',
        BAD_USER_INPUT: "Sorry, das ist so nicht unterstützt…",
        UNKNOWN: "Ein unbekannter Fehler…",
        valueMissing: "Bitte alle Pflichtfelder ausfüllen"
      }
    },
    editor: {
      confirmRouteChange: "Willst du wirklich die Seite verlassen ohne zu speichern?",
      noChangesWarning: "Bisher hast du nichts geändert",
      edtrIo: {
        localStorage: {
          found: "Du hast lokal gespeicherte Änderungen dieses Inhalts. Möchtest du sie laden?",
          foundButton: "Änderungen laden",
          restoreInitial: "Du kannst auch wieder zurück zur Ausgangsversion. Vorsicht, dabei werden deine bisherigen Änderungen gelöscht.",
          restoreInitialButton: "Änderungen löschen",
          confirmRestore: "Sicher, dass du deine Änderugen unwiderruflich löschen möchtest?"
        },
        extendedSettings: "Erweiterte Einstellungen",
        close: "Schließen",
        notSupportedYet: "Dieser Inhaltstyp wird vom neuen Editor noch nicht unterstützt.",
        editInOld: "Du kannst den Inhalt im alten Editor bearbeiten",
        conversionError: "Leider trat ein Fehler bei der Konvertierung auf.",
        notConverted: "Dieser Inhalt wurde noch nicht im neuen Editor bearbeitet.",
        box: "Box",
        boxDesc: "Ein Rahmen für Beispiele, Zitate, Warnungen, Beweise (math.), …",
        text: 'Text',
        textDesc: "Schreibe Text und Matheformeln, und formatiere sie.",
        blockquoteTitle: "Zitat",
        quoteDescription: "Erzeuge eingerückten Text für Zitate.",
        geogebraTitle: 'GeoGebra Applet',
        geogebraDesc: "Binde Applets von GeoGebra Materials via Link oder ID ein.",
        highlightTitle: "Code",
        highlightDesc: "Schreibe Code und hebe ihn je nach Programmiersprache hervor.",
        anchor: "Sprungmarke",
        anchorDesc: "Füge eine Sprungmarke innerhalb deines Inhalts hinzu.",
        image: "Bild",
        imageDesc: "Lade Bilder hoch oder verwende Bilder, die bereits online sind.",
        importantTitle: "Merksatz",
        importantDesc: "Hebe wichtige Aussagen hervor.",
        injectionTitle: "serlo.org Inhalt",
        injectionDesc: "Binde einen Inhalt von serlo.org via ID ein.",
        multimediaTitle: "Erklärung mit Multimedia-Inhalt",
        multimediaDesc: "Erstelle einen veranschaulichenden oder erklärenden Multimedia-Inhalt mit zugehöriger Erklärung.",
        spoiler: 'Spoiler',
        spoilerDesc: "In diese ausklappbare Box kannst du zum Beispiel Exkurse hinzufügen.",
        serloTable: "Tabelle",
        serloTableDesc: "Schöne Tabellen erstellen.",
        table: "Tabelle",
        tableDesc: "Erstelle eine Tabelle mit Markdown.",
        video: 'Video',
        videoDesc: "Binde Videos von YouTube, Vimeo, Wikimedia Commons oder BR ein.",
        solutionSeparator: "Lösungs-Trenner",
        solutionSeparatorDesc: "Unterteile die Lösung in einzelne Lösungsschritte.",
        save: "Speichern",
        saveWithReview: "Speichern und reviewen lassen",
        cancel: "Abbrechen",
        saving: "Speichert…",
        missingChanges: "Du musst zuerst die Änderungen ausfüllen.",
        missingLicenseTerms: "Du musst zuerst die Lizenzbedingungen akzeptieren.",
        missingChangesAndLicenseTerms: "Du musst zuerst die Lizenzbedingungen akzeptieren und die Änderungen ausfüllen.",
        errorSaving: "Es trat ein Fehler beim Speichern auf.",
        saveLocallyAndRefresh: "Du kannst die Bearbeitung lokal zwischenspeichern, dann die Seite neu laden und es erneut versuchen.",
        revisionSaved: "Bearbeitung gespeichert",
        saveRevision: "Bearbeitung zwischenspeichern",
        changes: "Beschreibe deine Änderungen am Inhalt",
        skipReview: "Bearbeitung ohne Review freischalten (nicht empfohlen)",
        enableNotifs: "Benachrichtigungen auf serlo.org erhalten",
        enableNotifsMail: "Benachrichtigungen per E-mail erhalten",
        switchRevision: "Andere Version auswählen",
        importOther: "Aus einem anderen Inhalt importieren",
        importOtherExplanation: "Du kannst den Content eines anderen Inhalts hier importieren. Füge dazu einfach hier die URL oder ID eines anderen Inhalts auf serlo.org ein. (Nur gleiche Inhaltstypen sind erlaubt – also Artikel können nur in Artikeln importiert werden). Diese Funktion ist NICHT dazu gedacht exakte Kopien anzulegen. Aufgabengruppen und Kurse werden nicht unterstützt (aber Aufgaben und Kursseiten klappen)",
        importOtherWarning: "Vorsicht: Diese Funktion überschreibt alle bestehenden Inhalte in diesem Editor.",
        importOtherButton: "Inhalte Importieren",
        current: "Aktuell",
        author: "Verfasser",
        createdAt: "Zeitstempel",
        settings: "Einstellungen",
        equationsTitle: "Terme und Gleichungen",
        equationsDesc: "Erstelle Termumformungen und löse mehrzeilige Gleichungen.",
        ready: "Bereit zum Speichern?"
      },
      anchor: {
        identifier: "Name",
        anchorId: "Name der Sprungmarke"
      },
      geogebra: {
        urlOrId: "GeoGebra Materials URL oder ID"
      },
      highlight: {
        clickAndEnter: "Klicke hier und füge deinen Quellcode ein…",
        enterHere: "Füge hier deinen Quellcode ein. Verlasse den Bereich, um eine Vorschau zu sehen.",
        language: "Programmiersprache",
        enterLanguage: "Programmiersprache eingeben",
        showLineNumbers: "Zeilennummern anzeigen"
      },
      inputExercise: {
        text: 'Text',
        chooseType: "Wähle den Antworttyp",
        unit: "Einheit (optional)",
        addAnswer: "Antwort hinzufügen",
        enterTheValue: "Gib hier die Antwort ein",
        yourSolution: "Deine Lösung",
        number: "Zahl (exakte Lösung, z.B. \"0,5\" ≠ \"1/2\" ≠ \"2/4\")",
        mathematicalExpressionSolution: "Mathematischer Ausdruck (äquivalente Lösung, z.B. \"0,5\" = \"1/2\" = \"2/4\")"
      },
      multimedia: {
        image: "Bild",
        video: 'Video',
        geogebraTitle: 'GeoGebra Applet',
        changeType: "Tausche das Multimedia Element aus",
        howImportant: "Wie wichtig ist der Multimedia Inhalt?",
        isIllustrating: "Es ist nur eine Veranschaulichung",
        isEssential: "Es spielt eine zentrale Rolle"
      },
      rows: {
        searchForTools: "Suche hier nach Tools…",
        duplicate: "Duplizieren",
        remove: "Löschen",
        close: "Schließen",
        dragElement: "Verschiebe das Element innerhalb des Dokuments",
        addAnElement: "Füge ein Element hinzu"
      },
      scMcExercise: {
        singleChoice: "Single Choice",
        multipleChoice: "Multiple Choice",
        chooseType: "Wähle den Aufgabentyp",
        addAnswer: "Antwort hinzufügen"
      },
      serloTable: {
        mode: "Modus",
        columnHeaders: "Nur Spaltentitel",
        rowHeaders: "Nur Zeilentitel",
        columnAndRowHeaders: "Spalten- und Zeilentitel",
        convertToText: "Text als Inhalt",
        convertToImage: "Bild als Inhalt",
        row: "Zeile",
        column: "Spalte",
        addType: "%type% hinzufügen",
        addTypeBefore: "%type% davor hinzufügen",
        deleteType: "%type% löschen",
        confirmDelete: "Sicher, dass diese %type% und ihren Inhalt löschen willst?"
      },
      spoiler: {
        enterATitle: "Titel eingeben"
      },
      text: {
        quote: "Zitat",
        setColor: "Einfärben",
        resetColor: "Farbe zurücksetzen",
        colors: "Textfarben",
        closeSubMenu: "Untermenü schließen",
        heading: "Überschrift",
        headings: "Überschriften",
        link: 'Link (%ctrlOrCmd% + K)',
        enterUrl: "Hier Link einfügen",
        openInNewTab: "Öffne den Link in einem neuen Tab",
        orderedList: "Nummerierte Liste",
        unorderedList: "Aufzählung",
        lists: "Listen",
        mathFormula: "Matheformel (%ctrlOrCmd% + M)",
        code: 'Code (%ctrlOrCmd% + ⇧ + `)',
        displayAsBlock: "eigene Zeile",
        formula: "[neue Formel]",
        visual: "visuell",
        laTeX: 'LaTeX',
        onlyLaTeX: "Nur LaTeX verfügbar",
        shortcuts: "Tastenkürzel",
        fraction: "Bruch",
        superscript: "Hochgestellt",
        or: "oder",
        subscript: "Tiefgestellt",
        root: "Wurzel",
        mathSymbols: "Mathematische Symbole",
        eG: "z.B.",
        functions: "Funktionen",
        bold: "Fett (%ctrlOrCmd% + B)",
        italic: "Kursiv (%ctrlOrCmd% + I)",
        noItemsFound: "keine Einträge gefunden"
      },
      image: {
        noImagePasteInLists: "Einfügen von Bildern ist innerhalb von Listen nicht möglich."
      },
      video: {
        videoUrl: 'Video URL',
        description: "Beschreibung",
        title: "Titel",
        url: 'URL',
        seoTitle: "Titel für Suchmaschinen",
        noVideoPasteInLists: "Einfügen von Videos ist innerhalb von Listen nicht möglich."
      },
      error: {
        convertionError: "Dieser Teil des Dokuments konnte nicht automatisch konvertiert werden."
      },
      exercise: {
        addChoiceExercise: "Auswahlaufgabe hinzufügen",
        choiceExercise: "Auswahlaufgabe",
        addInputExercise: "Eingabefeld hinzufügen",
        inputExercise: "Eingabefeld",
        addH5pExercise: "H5P-Inhalt hinzufügen",
        h5pExercise: "H5P-Inhalt",
        addOptionalInteractiveEx: "Füge optional ein interaktives Element hinzu:",
        changeInteractive: "Interaktives Element ändern",
        removeInteractive: "Interaktives Element entfernen"
      },
      injection: {
        illegalInjectionFound: "Ungültige Injection gefunden",
        serloEntitySrc: "Serlo Inhalt {{src}}",
        serloId: "Serlo ID",
        placeholder: "Serlo ID (z.B. 1565)"
      },
      box: {
        type: "Art der Box",
        titlePlaceholder: "(optionaler Titel)",
        anchorId: "Sprungmarke (anchor id)",
        emptyContentWarning: "Boxen ohne Inhalt werden nicht angezeigt"
      },
      layout: {
        toDragConvert: "Um die Inhalte zu verschieben, konvertiere sie für den neuen Editor:",
        oneColumnLayout: "Einspaltiges Layout",
        multimediaTitle: "Erklärung mit Multimedia-Inhalt"
      },
      pageLayoutColums: {
        chooseRatio: "Spaltenverhältnis auswählen"
      },
      solution: {
        optionalExplanation: "Beschreibe hier optional die Lösungsstrategie",
        fundamentalsNote: "Für diese Aufgabe benötigst du folgendes Grundwissen:",
        idArticle: "ID eines Artikels, z.B. 1855",
        openArticleTab: "Öffne den Artikel in einem neuen Tab",
        linkTitle: "Titel der Verlinkung",
        showSolution: "Lösung anzeigen",
        hideSolution: "Lösung ausblenden"
      },
      applet: {
        seoTitle: "Titel für Suchmaschinen",
        seoDesc: "Beschreibung für Suchmaschinen",
        title: "Titel"
      },
      article: {
        seoTitle: "Titel für Suchmaschinen",
        seoDesc: "Beschreibung für Suchmaschinen",
        title: "Titel",
        writeShortIntro: "Fasse das Thema des Artikels kurz zusammen",
        stillWantMore: "Du hast noch nicht genug vom Thema?",
        moreOnTopic: "Hier findest du noch weitere passende Inhalte zum Thema",
        addSource: "Quellenangabe hinzufügen",
        removeLabel: "Löschen",
        dragLabel: "Ziehen, um die Reihenfolge zu ändern",
        openInTab: "In neuem Tab öffnen",
        sources: "Quellen",
        sourceText: "Quelle",
        sourceUrl: "Optionaler Link",
        moreInFolder: "Weitere Aufgaben zum Thema findest du im folgenden Aufgabenordner",
        addModal: {
          introText: "Was würde den Lernenden nach dem Artikel weiterhelfen?%break% Hier kannst du %exercises% einbetten oder eine %exerciseFolder% verlinken. %break% Oder du kannst weiterführende %articles%, %courses% oder %videos% empehlen.",
          introText2: "Du kannst entweder eine Serlo ID oder einen Link einfügen, oder unten Inhalte aus dem Elternordner einfügen.",
          buttonEx: "Aufgaben hinzufügen",
          buttonExFolder: "Aufgabenordner auswählen",
          buttonContent: "Inhalt hinzufügen",
          buttonAddType: "%type% hinzufügen",
          title: "Weiterführende Inhalte oder Übungsaufgaben hinzufügen",
          invalidInput: "Ungültige ID oder URL",
          fetchError: "Etwas ist schief gelaufen, bitte versuche es später noch einmal",
          loading: "Wird geladen …",
          notFound: "Inhalt konnte nicht gefunden werden",
          unsupportedType: "Sorry, der Typ [%type%] wird hier nicht unterstützt",
          unsupportedId: "Sorry, diese ID ist hier nicht erlaubt. (z.B. weil sie schon ausgewählt ist, oder weil du diese ID bearbeitest…)",
          addFromFolderTitle: "Aus dem Ordner",
          placeholder: "Eine Serlo Id oder URL hier einfügen",
          exerciseFolderNote: "Hier kann nur ein Ordner ausgewählt werden"
        }
      },
      coursePage: {
        explanation: "Erklärung",
        video: 'Video',
        question: "Frage",
        title: "Titel"
      },
      course: {
        seoDesc: "Beschreibung für Suchmaschinen",
        title: "Titel",
        removeCoursePage: "Kursseite entfernen",
        addCoursePage: "Kursseite hinzufügen"
      },
      event: {
        seoTitle: "Titel für Suchmaschinen",
        seoDesc: "Beschreibung für Suchmaschinen",
        title: "Titel"
      },
      page: {
        title: "Titel"
      },
      taxonomy: {
        title: "Titel"
      },
      textExerciseGroup: {
        removeExercise: "Teilaufgabe entfernen",
        addExercise: "Teilaufgabe hinzufügen",
        kindOfExerciseGroup: "Art der Aufgabengruppe",
        notCohesive: "nicht zusammenhängend",
        cohesive: "zusammenhängend"
      },
      textExercise: {
        removeSolution: "Lösung entfernen",
        createSolution: "Lösung hinzufügen"
      },
      equations: {
        leftHandSide: "linke Seite",
        transformation: "Umformung",
        mode: "Modus",
        transformationExample: "z.B. -3x",
        transformationOfEquations: "Gleichungsumformung",
        transformationOfTerms: "Termumformung",
        addNewRow: "Neue Zeile hinzufügen",
        explanation: "Erklärung",
        term: 'Term',
        rightHandSide: "rechte Seite",
        combineLikeTerms: "Fasse die Terme zusammen.",
        setEqual: "Setze die Terme gleich.",
        firstExplanation: "Erste Erklärung",
        addNew: "Neue Gleichung hinzufügen"
      },
      deprecated: {
        unsupported: "Dieser Teil des Dokuments enthält Features, die nicht mehr unterstützt werden."
      }
    },
    profileSettings: {
      editAbout: "Deine Beschreibung",
      showInstructions: "Anleitung anzeigen",
      editImage: {
        header: "Profilbild",
        buttonText: "So kannst du dein Profilbild ändern",
        description: "Wir benutzen die Bilder von %chatLink% als Profilbilder. Um dein Bild zu ändern musst du diesen Schritten folgen:",
        steps: {
          goToChat: "Gehe zu %chatLink%.",
          signIn: "Melde dich an.",
          goToMyAccount: "Gehe im Usermenü auf %myAccountLink%.",
          myAccount: "Mein Account",
          uploadPicture: "Lade ein neues Bild hoch (ein quadratisches!) und klicke oben auf \"Änderungen speichern\".",
          refreshPage: "Komme hierher zurück und aktualisiere dein Bild mit %refreshLink%.",
          refreshLink: "diesem magischem Link"
        }
      },
      motivation: {
        header: 'Motivation',
        buttonText: "So kannst du deinen Motivationstext ändern",
        intro: "Motivationen sind eine neue Funktion, die wir aktuell testen. Um deinen Motivationstext zu ändern musst du ein kurzes Formular ausfüllen.",
        privacy: "Das Formular und die Datenspeicherung werden von Google angeboten und persönliche Daten werden zu diesem Anbieter übertragen werden, wenn du dieses Feature benutzt.",
        toForm: "Motivationsformular"
      },
      delete: {
        heading: "So kannst du deinen Account löschen",
        text: "Wenn du deinen Account löschen möchtest, schreib uns bitte unter %mailLink%.%break% Bitte schreibe von deiner registrierten E-Mail-Adresse und gib %subjectLine% als Betreff an.",
        deleteAccount: "Account löschen"
      }
    },
    backend: {
      pages: "Statische Seiten",
      authorization: "Rechtevergabe",
      navigation: 'Navigation',
      recycleBin: "Papierkorb"
    },
    pages: {
      newPage: "Neue Seite erstellen",
      deletedPages: "Gelöschte Seiten"
    },
    taxonomyTermTools: {
      copyMove: {
        title: "Inhalte in Ordner verschieben / kopieren",
        select: "Inhalte zum kopieren oder verschieben auswählen:",
        target: "Zielordner:",
        link: 'Link',
        moveButtonText: "Verschieben zu: %type%",
        copyButtonText: "Kopieren zu %type% ",
        moveSuccess: "Erfolgreich verschoben",
        copySuccess: "Erfolgreich kopiert",
        exerciseFolderNotice: "Kopieren oder verschieben von \"%exerciseFolder%\" wird derzeit nicht unterstützt. %break% Bitte erstelle einen neuen Ordner und verschiebe stattdessen die Inhalte."
      },
      deleteAdd: {
        confirmDelete: "Bist du sicher, dass du diese Zuweisung löschen möchtest?",
        addSuccess: "Erfolgreich zugewiesen, Seite wird neu geladen …",
        addNewTitle: "Neue Zuweisung hinzufügen",
        addButtonText: "Zuweisen"
      },
      sort: {
        title: "Inhalte sortieren",
        saveButtonText: "Reihenfolge speichern"
      }
    },
    roles: {
      addButton: "Als %role% hinzufügen"
    }
  }
};
export const kratosMailStrings = {
  recovery: {
    valid: {
      subject: '👉 Access to your Serlo account',
      'body.plaintext': `👋 Hi {{ .Identity.traits.username }},
versuchst du wieder Zugang zu deinem Account zu bekommen? (Wenn nein, kannst du die Mail einfach ignorieren)
 
Um dein Passwort zurückzusetzen, öffne bitte diesen Link im Browser:
{{ .RecoveryURL }}

Das Serlo-Team wünscht dir viel Erfolg!`,
      body: `<p>👋 Hi <b>{{ .Identity.traits.username }}</b>,</p>
<p>versuchst du wieder Zugang zu deinem Account zu bekommen? (Wenn nein, kannst du die Mail einfach ignorieren)</p>
 
<p>Um dein Passwort zurückzusetzen, öffne bitte diesen Link im Browser:
<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a><br/><br/>Viel Erfolg! Dein Serlo Team</p>`
    },
    invalid: {
      subject: '👉 Account access attempted',
      'body.plaintext': `👋 Hi there!

You (or someone else) entered this email address when trying to recover access to an account at serlo.org.

But this email address is not linked to a user in our website and therefore the attempt failed.

If it was you, check if you signed up using a different address.

Otherwise please just ignore this email.

✌️`,
      body: `<p>👋 Hi there!</p>
<p>You (or someone else) entered this email address when trying to recover access to an account at <a href="https://serlo.org">serlo.org</a>. </p>
<p>But this email address is not linked to a user in our website and therefore the attempt failed.</p>
<p>If it was you, check if you signed up using a different address.</p>
<p>Otherwise, please just ignore this email.</p>
<p>✌️</p>`
    }
  },
  verification: {
    valid: {
      subject: '👋 Please verify your email address',
      'body.plaintext': `Hi {{ .Identity.traits.username }},

      We are excited to have you at serlo.org 🎉

      Please verify your brand new account by clicking the following link:

{{ .VerificationURL }}

Your Community-Support 💚`,
      body: `<p>Hi <b>{{ .Identity.traits.username }}</b>,</p>
<p>wunderbar dich auf serlo.org zu haben 🎉</p>
<p>Bitte bestätige deinen brandneuen Account mit einem Klick auf diesen Link:<br/>
<a style="color: #007ec1 !important;" href="{{ .VerificationURL }}">{{ .VerificationURL }}</a>
</p><p>Dein Community-Support 💚</p>`
    },
    invalid: {
      subject: `👋 Someone tried to verify this email address`,
      'body.plaintext': `👋 Hi there,

Someone asked to verify this email address, but we were unable to find an account at serlo.org for this address.

If it was you, check if you registered using a different address.

Otherwise, please just ignore this email.

✌️`,
      body: `<p>👋 Hi there,</p>
<p>Someone asked to verify this email address, but we were unable to find an account at <a href="https://serlo.org">serlo.org</a> for this address.</p>
<p>If this was you, check if you registered using a different address.</p>
<p>Otherwise, please just ignore this email.</p>
<p>✌️</p>`
    }
  }
};