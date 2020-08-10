import { headerData, footerData } from './menu-data';
import { InstanceData, ServerSideStrings, LoggedInData, InstanceLandingData } from '@/data-types';
export const instanceData: InstanceData = {
  lang: "de",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "Die freie Lernplattform",
      search: "Suche",
      login: "Anmelden"
    },
    footer: {
      summaryHeading: "Serlo.org ist die Wikipedia fürs Lernen",
      summaryText: "Wir sind eine engagierte Gemeinschaft, die daran arbeitet, hochwertige Bildung weltweit frei verfügbar zu machen.",
      learnMore: "Mehr Erfahren",
      participate: "Mitmachen",
      donate: "Spenden",
      toTop: "Nach oben"
    },
    categories: {
      article: "Artikel",
      course: "Kurs",
      video: 'Video',
      applet: 'Applet',
      folder: "Bereich",
      exercises: "Aufgaben"
    },
    entities: {
      topicFolder: 'Aufgabensammlung',
      comment: 'Kommentar',
      revision: 'Bearbeitung',
      thread: 'Thread',
    },
    share: {
      button: "Teilen",
      title: "Weitergeben!",
      copyLink: "Link kopieren",
      copySuccess: "In die Zwischenablage kopiert!",
      close: "Schließen"
    },
    edit: {
      button: "Inhalt überarbeiten"
    },
    license: {
      readMore: "Was bedeutet das?"
    },
    course: {
      showPages: "Kursübersicht anzeigen",
      pages: "Kursübersicht",
      next: "Weiter"
    },
    content: {
      show: "anzeigen",
      hide: "ausblenden",
      prerequisite: "Für diese Aufgabe benötigst Du folgendes Grundwissen:",
      solution: "Lösung",
      exerciseGroup: "Aufgabengruppe",
      right: "Richtig",
      wrong: "Falsch",
      check: "Stimmt's?",
      yourAnswer: "Deine Antwort…",
      chooseOption: "Klicke auf eine der Optionen"
    },
    cookie: {
      part1: "Mit der Nutzung dieser Webseite erklärst du dich mit unserer",
      part2: "und",
      part3: "einverstanden.",
      link1: "Datenschutzerklärung",
      link2: "Nutzungsbedingungen",
      button: "Verstanden"
    },
    notifications: {
      notifications: 'Benachrichtigungen',
      pleaseLogInLink: 'Bitte melde dich an',
      pleaseLogInText: 'um deine Benachrichtigungen zu sehen.',
    }
  }
};
export const instanceLandingData: InstanceLandingData = {
  lang: "de",
  strings: {
    vision: "Wir ermöglichen Schüler*innen und Studierenden selbständig und im eigenen Tempo zu lernen – unabhängig von den finanziellen Möglichkeiten ihrer Eltern, denn serlo.org ist und bleibt komplett kostenlos.\n\nUnsere Vision ist es, hochwertige Bildung weltweit frei verfügbar zu machen.",
    learnMore: "Mehr erfahren",
    democraticallyStructured: "demokratisch organisiert",
    nonProfit: 'non-profit',
    transparent: 'transparent',
    openlyLicensed: "frei lizensiert",
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
export const serverSideStrings: ServerSideStrings = {
  title: "lernen mit Serlo!"
};
export const loggedInData: LoggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: 'Benachrichtigungen',
    icon: 'notifications'
  }, {
    url: '',
    title: "Benutzer",
    icon: 'user',
    children: [{
      url: '/user/public',
      title: "Öffentliches Profil"
    }, {
      url: '/user/settings',
      title: "Profil bearbeiten"
    }, {
      url: '/auth/password/change',
      title: "Passwort aktualisieren"
    }, {
      url: '/event/history/user/me',
      title: "Meine Aktivitäten"
    }, {
      url: '/api/auth/logout',
      title: "Ausloggen"
    }]
  }],
  strings: {
    tools: "Weitere Tools",
    notifications: {
      loadMore: 'Weitere laden',
      unknownProblem: 'Es gibt ein Problem beim laden der Benachrichtigungen, bitte versuche es später noch einmal.',
      loading: 'Benachrichtigungen werden geladen',
      hide: 'Benachrichtigungen für diesen Inhalt nicht mehr anzeigen.',
      setThreadStateArchived: '%actor% hat einen %thread% archiviert.',
      setThreadStateUnarchived: '%actor% hat einen %thread% unarchiviert.',
      createComment: '%actor% hat einen %comment% in einem %thread% erstellt.',
      createThread: '%actor% hat einen %thread% in einem %object% erstellt.',
      createEntity: '%actor% hat %object% erstellt.',
      setLicense: '%actor% hat die Lizenz von %repository% geändert.',
      createEntityLink: '%actor% hat %child% mit %parent% verknüpft.',
      removeEntityLink: '%actor% hat die Verknüpfung von %child% mit %parent% entfernt.',
      createEntityRevision: '%actor% hat eine %revision% von %entity% erstellt.',
      checkoutRevision: '%actor% hat eine %revision% von %repository% übernommen.',
      rejectRevision: '%actor% hat %revision% für %repository% abgelehnt.',
      createTaxonomyLink: '%actor% hat %child% in %parent% eingeordnet.',
      removeTaxonomyLink: '%actor% hat %child% aus %parent% entfernt.',
      createTaxonomyTerm: '%actor% hat den %term% erstellt.',
      setTaxonomyTerm: '%actor% hat den %term% geändert.',
      setTaxonomyParentDeleted: '%actor% hat den Elternknoten von %child% entfernt.',
      setTaxonomyParentChangedFrom: '%actor% hat den Elternknoten von %child% von %previousparent% auf %parent% geändert.',
      setTaxonomyParentChanged: '%actor% hat den Elternknoten von %child% auf %parent% geändert.',
      setUuidStateTrashed: '%actor% hat %object% in den Papierkorb verschoben.',
      setUuidStateRestored: '%actor% hat %object% aus dem Papierkorb wieder hergestellt.',
      entityPlaceholderPage: 'Seite',
      entityPlaceholderArticle: 'Artikel',
      entityPlaceholderVideo: 'Video',
      entityPlaceholderApplet: 'Applet ',
      entityPlaceholderCoursePage: 'Kursseite',
      entityPlaceholderExercise: 'Aufgabe',
      entityPlaceholderGroupedExercise: 'gruppierte Aufgabe',
      entityPlaceholderExerciseGroup: 'Aufgabengruppe',
      entityPlaceholderEvent: 'Event',
      entityPlaceholderCourse: 'Kurs',
      entityPlaceholderTaxonomyTerm: 'Begriff',
      entityPlaceholderFallback: 'Inhalt',
    }
  }
};