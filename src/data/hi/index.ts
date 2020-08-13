import { headerData, footerData } from './menu-data';
export const instanceData = {
  lang: "hi",
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
  lang: "hi",
  strings: {
    vision: "हम नॉनप्रॉफिट आर्गेनाइजेशन संगठन हैं जो व्यक्तिगत शिक्षा का समर्थन करते हैं और समान शैक्षणिक अवसरों के लिए काम करते हैं। यह सीखने का मंच दुनिया भर के लाखों छात्रों के लिए हजारों निर्देशक लेख, वीडियो के माध्यम से सीखना और अभ्यास प्रदान करता है - पूरी तरह से नि: शुल्क। अब हिंदी में हमसे जुड़ने का समय है।",
    learnMore: "और जानो",
    democraticallyStructured: "लोकतांत्रिक",
    nonProfit: "नॉनप्रॉफिट",
    transparent: "पारदर्शक",
    openlyLicensed: "खुले तौर पर लाइसेंस प्राप्त",
    adFree: "विज्ञापन मुक्त",
    freeOfCharge: "निःशुल्क",
    wikiTitle: "सेर्लो सीखने के लिए विकिपीडिया है।",
    wikiText: "विकिपीडिया की तरह, यह मंच लेखकों के एक व्यस्त समुदाय द्वारा बनाया गया है। सेर्लो शिक्षा पूरी दुनिया में स्वयंसेवकों और पेशेवरों की विकेन्द्रीकृत टीमों द्वारा संचालित और स्वामित्व में है।",
    movementTitle: "ओपन एजुकेशन के लिए हमारे आंदोलन का एक हिस्सा बनें",
    callForAuthors: "हम उत्साही शिक्षकों की तलाश में हैं जो अपने विषय के बारे में भावुक हैं। Serlo.org पर एक लेखक बनें! आप नई सीखने की सामग्री बना सकते हैं और मौजूदा सामग्री को बेहतर बनाने में हमारी सहायता कर सकते हैं।",
    communityLink: "लेखकों के लिए लैंडिंग पृष्ठ पर जाएं",
    callForOther: "हम सॉफ्टवेयर विकास, डिजाइन, अनुवाद, संचार, परियोजना प्रबंधन और अन्य क्षेत्रों के क्षेत्र में नौकरियों और स्वयंसेवी अवसरों की विविध श्रेणी प्रदान करते हैं।",
    getInvolved: "सेर्लो में शामिल हो जाएं"
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