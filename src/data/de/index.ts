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
      eventLog: "Aktivitäten"
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
      close: "Schließen"
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
      trashedNotice: "Dieser Inhalt wurde zum Löschen markiert.",
      strategy: "Lösungsstrategie",
      picture: "Bild"
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
      error: "Die Kommentare konnten leider nicht geladen werden, bitte versuch es später noch einmal.",
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
      warning: "WICHTIG: Damit alle Bilder und Formeln gedruckt werden, scrolle bitte einmal bis zum Ende der Seite BEVOR du diesen Dialog öffnest. Vielen Dank!"
    },
    profiles: {
      aboutMe: "Über mich",
      recentActivities: "Aktivitäten",
      showAllActivities: "Alle Aktivitäten anzeigen",
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
        reviews: "Reviews",
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
      createThread: "%actor% hat eine %thread% in einem %object% erstellt.",
      createEntity: "%actor% hat %object% erstellt.",
      setLicense: "%actor% hat die Lizenz von %repository% geändert.",
      createEntityLink: "%actor% hat %child% mit %parent% verknüpft.",
      removeEntityLink: "%actor% hat die Verknüpfung von %child% mit %parent% entfernt.",
      createEntityRevision: "%actor% hat eine %revision% von %entity% erstellt.",
      checkoutRevision: "%actor% hat eine %revision% von %repository% übernommen.",
      rejectRevision: "%user% hat eine %revision% in %repository% nicht übernommen.",
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
      title: "Meine Aktivitäten"
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
      sort: "Unterelemente sortieren",
      edit: "Überarbeiten",
      unrevisedEdit: 'Show unrevised revisions',
      organize: "Baumstruktur bearbeiten",
      moveToGroupedTextExercise: "Inhalt zu anderer Gruppe verschieben",
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
      confirm: "Bestätigen"
    }
  }
};