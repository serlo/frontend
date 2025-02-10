import { licenses } from './license-data-short';
import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: "de",
  headerData,
  footerData,
  secondaryMenus,
  licenses,
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
      copySuccess: "Link kopiert!",
      copyFailed: "Sorry, Link konnte nicht automatisch kopiert werden.",
      close: "Schließen",
      pdf: "Als PDF herunterladen",
      pdfNoSolutions: "PDF ohne Lösungen"
    },
    modal: {
      leaveNow: "Jetzt verlassen",
      noStay: "Nein, ich möchte bleiben"
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
      nonFree: "Die Nutzung könnte vielleicht strengeren Regeln unterliegen als bei unseren anderen Inhalten.",
      appliesTo: "Gilt für"
    },
    content: {
      show: "anzeigen",
      hide: "ausblenden",
      trashedNotice: "Dieser Inhalt wurde gelöscht.",
      unrevisedNotice: "Dieser Inhalt wurde noch nicht überprüft. Über den %link% kannst du dir die Entwürfe anzeigen lassen.",
      emptyNotice: "Hier gibt es keinen Inhalt. Bitte bearbeiten oder löschen.",
      picture: "Bild",
      previewImage: "Vorschaubild",
      task: "Aufgabenstellung",
      courseNoPagesWarning: "Leider gibt es für diesen Kurs noch keine akzeptierten Seiten."
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
      twingle: "Spendenformular laden",
      audio: "Audio abspielen von %provider%",
      general: "Aktivieren"
    },
    comments: {
      question: "Hast du eine Frage oder Feedback?",
      questionLink: "Kommentiere hier",
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
      positionForGrouped: "Diese %exercise% ist Teil von %title%.",
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
    externalRevisions: {
      importOther: "Aus einem anderen Inhalt importieren",
      importOtherExplanation: "Du kannst den Content eines anderen Inhalts hier importieren. Füge dazu einfach hier die URL oder ID eines anderen Inhalts auf serlo.org ein. (Nur gleiche Inhaltstypen sind erlaubt – also Artikel können nur in Artikeln importiert werden). Diese Funktion ist NICHT dazu gedacht exakte Kopien anzulegen. Aufgabengruppen und Kurse werden nicht unterstützt (aber Aufgaben und Kursseiten klappen)",
      importOtherWarning: "Vorsicht: Diese Funktion überschreibt alle bestehenden Inhalte in diesem Editor.",
      importOtherButton: "Inhalte Importieren"
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
        registerIntro: "Du brauchst keinen Account zum Lernen auf serlo.org. %break% Aber wenn du kommentieren oder mitwirken willst, bist du hier genau richtig.",
        newsletterSubscription: "Erhalte in unserem Newsletter kompakte Updates zu unseren aktuellen Aktivitäten. Deine Angaben nutzen wir für den Versand und für persönliche Anreden. Freue dich auf relevante Informationen und einmal jährlich auf unsere Spendenkampagne. (optional)"
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
        code1010002: "Anmelden mit Mein Bildungsraum",
        code1010013: "Weiter mit SSO",
        code1010022: "Anmelden",
        // Login with password
        code1040001: "Account anlegen",
        code1040002: "Über „Mein Bildungsraum“ Account registrieren",
        code1040003: "Weiter",
        code1050001: "Deine Änderungen wurden gespeichert! 🎉",
        code1060001: "Du hast deinen Account wiederhergestellt. Bitte ändere dein Passwort in den nächsten Minuten.",
        code1060002: "Wir haben dir eine E-Mail mit einem Link zum Wiederherstellen an die angegebene Adresse geschickt. %break% Schau in deine Mailbox und benutze den Link.",
        code1070003: "Speichern",
        code1070005: "Absenden",
        code1070009: "Weiter",
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
        code4000031: "Dieses Passwort kann nicht verwendet werden, da es deinem Benutzernamen zu ähnlich ist.",
        code4000032: "Dein Passwort hat weniger als 8 Zeichen.",
        code4060004: "Der Link zum Wiederherstellen ist nicht gültig oder wurde schon benutzt. Bitte versuche dir noch mal einen Link zuschicken zu lassen.",
        code4070001: "Der Bestätigungslink ist nicht gültig oder wurde schon benutzt. Bitte versuche dir noch mal einen Link zuschicken zu lassen.",
        code4070005: "Dieser Bestätigungslink ist leider nicht mehr gültig. Bitte versuche eine neue E-Mail anzufordern."
      },
      usernameInvalid: "Der Benutzername darf nur aus Buchstaben, Ziffern, Unterstrichen (_) und Bindestrichen (-) bestehen.",
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
      verificationLinkText: "Klick hier, um eine neue Bestätigungsmail zu erhalten.",
      badRole: "Du darfst dich leider nur über VIDIS einloggen, wenn du Lehrkraft bist.",
      somethingWrong: "Sorry, irgendwas ist schief gegangen."
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
    },
    saveButton: {
      noChangesWarning: "Bisher hast du nichts geändert",
      save: "Speichern",
      saveWithReview: "Speichern und reviewen lassen",
      ready: "Bereit zum Speichern?",
      cancel: "Abbrechen",
      saving: "Speichert…",
      missingChanges: "Du musst zuerst die Änderungen ausfüllen.",
      missingLicenseTerms: "Du musst zuerst die Lizenzbedingungen akzeptieren.",
      missingChangesAndLicenseTerms: "Du musst zuerst die Lizenzbedingungen akzeptieren und die Änderungen ausfüllen.",
      errorSaving: "Beim Speichern ist ein Fehler aufgetreten, aber deine Arbeit ist lokal gespeichert. Überprüfe, ob du immer noch eingeloggt bist und probier's noch mal 🤞.",
      changes: "Beschreibe deine Änderungen am Inhalt",
      confirmRouteChange: "Willst du wirklich die Seite verlassen ohne zu speichern?"
    },
    articleAddModal: {
      introText: "Was würde den Lernenden nach dem Artikel weiterhelfen?%break% Hier kannst du %exercises% einbetten oder eine %exerciseFolder% verlinken. %break% Oder du kannst weiterführende %articles%, %courses% oder %videos% empehlen.",
      introText2: "Du kannst entweder eine Serlo ID oder einen Link einfügen, oder unten Inhalte aus dem Elternordner einfügen.",
      buttonAddType: "%type% hinzufügen",
      title: "Weiterführende Inhalte oder Übungsaufgaben hinzufügen"
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
  title: "lernen mit Serlo!",
  topicTitleAffix: "Grundlagen & Übungen"
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
      moveOrCopyItems: "Elemente verschieben oder kopieren",
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
    uuidUrlInput: {
      invalidInput: "Ungültige ID oder URL",
      fetchError: "Etwas ist schief gelaufen, bitte versuche es später noch einmal",
      loading: "Wird geladen …",
      notFound: "Inhalt konnte nicht gefunden werden",
      unsupportedType: "Sorry, der Typ [%type%] wird hier nicht unterstützt",
      unsupportedId: "Sorry, diese ID ist hier nicht erlaubt. (z.B. weil sie schon ausgewählt ist, oder weil du diese ID bearbeitest…)",
      addFromFolderTitle: "Aus dem Ordner",
      placeholder: "Eine Serlo Id oder URL hier einfügen",
      exerciseFolderNote: "Hier kann nur ein Ordner ausgewählt werden"
    },
    roles: {
      addButton: "Als %role% hinzufügen"
    }
  }
};
export const kratosMailStrings = {
  recovery: {
    valid: {
      subject: "👉 Zugang zu deinem Serlo Account",
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
      subject: "👉 Zugriff auf Account",
      'body.plaintext': `👋 Hi there!

Du (oder jemand anderes) hat versucht, mit dieser E-Mail-Adresse den Zugang zu einem Account auf serlo.org wiederherzustellen.

Allerdings ist diese E-Mail-Adresse nicht mit einem Account bei uns verknüpft und deshalb hat das nicht geklappt.

Wenn du das warst, überprüfe bitte, ob du dich mit einer anderen Adresse angemeldet hast.

Sonst kannst du diese Mail einfach ignorieren.

✌️`,
      body: `<p>👋 Hi there!</p>
<p>Du (oder jemand anderes) hat versucht, mit dieser E-Mail-Adresse den Zugang zu einem Account auf <a href="https://serlo.org">serlo.org</a> wiederherzustellen.</p>
<p>Allerdings ist diese E-Mail-Adresse nicht mit einem Account bei uns verknüpft und deshalb hat das nicht geklappt.</p>
<p>Wenn du das warst, überprüfe bitte, ob du dich mit einer anderen Adresse angemeldet hast.</p>
<p>Sonst kannst du diese Mail einfach ignorieren.</p>
<p>✌️</p>`
    }
  },
  verification: {
    valid: {
      subject: "👋 Bitte bestätige deine E-Mail-Adresse",
      'body.plaintext': `Hi {{ .Identity.traits.username }},

wunderbar dich auf serlo.org zu haben 🎉
      
Bitte bestätige deinen brandneuen Account mit einem Klick auf diesen Link:
{{ .VerificationURL }}

Dein Community-Support 💚`,
      body: `<p>Hi <b>{{ .Identity.traits.username }}</b>,</p>
<p>wunderbar dich auf serlo.org zu haben 🎉</p>
<p>Bitte bestätige deinen brandneuen Account mit einem Klick auf diesen Link:<br/>
<a style="color: #007ec1 !important;" href="{{ .VerificationURL }}">{{ .VerificationURL }}</a>
</p><p>Dein Community-Support 💚</p>`
    },
    invalid: {
      subject: `👋 Jemand hat versucht diese Mailadresse zu bestätigen`,
      'body.plaintext': `👋 Hi,

jemand hat versucht, diese E-Mail-Adresse zu bestätigen, aber es ist kein Account auf serlo.org mit dieser Adresse verknüpft.

Wenn du das warst, überprüfe bitte, ob du dich mit einer anderen Adresse angemeldet hast.

Sonst kannst du diese Mail einfach ignorieren.

✌️`,
      body: `<p>👋 Hi,</p>
<p>jemand hat versucht, diese E-Mail-Adresse zu bestätigen, aber es ist kein Account auf <a href="https://serlo.org">serlo.org</a> mit dieser Adresse verknüpft.</p>
<p>Wenn du das warst, überprüfe bitte, ob du dich mit einer anderen Adresse angemeldet hast.</p>
<p>sonst kannst du diese Mail einfach ignorieren.</p>
<p>✌️</p>`
    }
  }
};