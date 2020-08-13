import { headerData, footerData } from './menu-data';
export const instanceData = {
  lang: 'en',
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: 'The Open Learning Platform',
      search: 'Search',
      login: 'Login'
    },
    footer: {
      summaryHeading: 'Serlo.org is the Wikipedia for learning.',
      summaryText: 'We are a community of visionaries working tirelessly to make great education freely available to everyone.',
      learnMore: 'Learn more',
      participate: 'Join the cause',
      donate: 'Donate',
      toTop: 'To Top'
    },
    categories: {
      article: 'Article',
      course: 'Course',
      video: 'Video',
      applet: 'Applet',
      folder: 'Folder',
      exercises: 'Exercises'
    },
    entities: {
      topicFolder: 'Exercise folder',
      comment: 'Comment',
      revision: 'Revision',
      thread: 'Thread'
    },
    share: {
      button: 'Share',
      title: 'Share!',
      copyLink: 'Copy link',
      copySuccess: 'Link copied! ',
      close: 'Close'
    },
    edit: {
      button: 'Edit'
    },
    license: {
      readMore: 'Info'
    },
    course: {
      showPages: 'Show course overview',
      pages: 'Course overview',
      next: 'Next'
    },
    content: {
      show: 'show',
      hide: 'hide',
      prerequisite: 'For this task you need the following basic knowledge:',
      solution: 'Solution',
      exerciseGroup: 'Exercise group',
      right: 'Right',
      wrong: 'Wrong',
      check: 'Check',
      yourAnswer: 'Your answer…',
      chooseOption: 'Click on one of the options.'
    },
    cookie: {
      part1: 'By using this website you declare that you agree with our',
      part2: 'and',
      part3: '.',
      link1: 'Privacy Policy',
      link2: 'Terms of use',
      button: 'Agree'
    },
    notifications: {
      notifications: 'Notifications',
      pleaseLogInLink: 'Bitte melde dich an',
      pleaseLogInText: 'um deine Benachrichtigungen zu sehen.'
    }
  }
};
export const instanceLandingData = {
  lang: "de",
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
export const serverSideStrings = {
  title: 'learn with Serlo!'
};
export const loggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: 'Notifications',
    icon: 'notifications'
  }, {
    url: '',
    title: 'User',
    icon: 'user',
    children: [{
      url: '/user/public',
      title: 'Public profile'
    }, {
      url: '/user/settings',
      title: 'Edit profile'
    }, {
      url: '/auth/password/change',
      title: 'Change password'
    }, {
      url: '/event/history/user/me',
      title: 'Recent activities'
    }, {
      url: '/api/auth/logout',
      title: 'Log out'
    }]
  }],
  strings: {
    tools: 'Other Tools',
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
      entityPlaceholderApplet: 'Applet',
      entityPlaceholderCoursePage: 'Kursseite',
      entityPlaceholderExercise: 'Aufgabe',
      entityPlaceholderGroupedExercise: 'gruppierte Aufgabe',
      entityPlaceholderExerciseGroup: 'Aufgabengruppe',
      entityPlaceholderEvent: 'Event',
      entityPlaceholderCourse: 'Kurs',
      entityPlaceholderTaxonomyTerm: 'Begriff',
      entityPlaceholderFallback: 'Inhalt'
    }
  }
};