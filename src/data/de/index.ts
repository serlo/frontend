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
    share: {
      button: "Teilen",
      title: "Weitergeben!",
      copyLink: "Link kopieren",
      copySuccess: "In Zwischenablage kopiert!",
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
    taxonomy: {
      topicFolder: "Aufgabensammlung"
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
    }
  }
};
export const instanceLandingData: InstanceLandingData = {
  lang: 'en',
  strings: {
    vision: 'It is our vision to enable personalized learning and provide high quality educational resources worldwide – completely free of charge. Serlo is a grassroots organization inspired by Wikipedia. We already provide thousands of articles, videos and solved exercises for five million German students every year. Now it’s time to go international.',
    learnMore: 'Learn more',
    democraticallyStructured: 'democratically structured',
    nonProfit: 'non-profit',
    transparent: 'transparent',
    openlyLicensed: 'openly licensed',
    adFree: 'ad-free',
    freeOfCharge: 'free of charge',
    wikiTitle: 'Serlo is the Wikipedia for Learning',
    wikiText: 'Just like Wikipedia, this platform is created by an engaged community of authors. Serlo Education is run and owned by decentralized teams of volunteers and professionals all over the world.',
    movementTitle: 'Become a Part of Our Movement for Open Education',
    callForAuthors: 'We are looking for teachers and enthusiastic educators who are passionate about their subject. Become part of our community to create new learning material and help us improve existing content.',
    communityLink: 'Visit the landing page for authors',
    callForOther: 'We offer a diverse range of jobs and volunteering opportunities in the fields of software development, design, translation, communications, project management and more.',
    getInvolved: 'Get involved!'
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
    tools: "Weitere Tools"
  }
};