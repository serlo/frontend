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
    authorMenu: {
      log: 'Log',
      settings: 'Settings',
      moveCoursePage: 'Move this page to another course',
      thisCoursePage: 'This course-page',
      addCoursePage: 'Add course-page',
      wholeCourse: 'Whole course',
      copyItems: 'Copy items',
      moveItems: 'Move items',
      addGroupedTextExercise: 'Add grouped-text-exercise',
      changeLicense: 'Change License',
      subscribe: 'Subscribe',
      subscribeNotifications: 'Recieve notifications',
      subscribeNotificationsAndMail: 'Recieve notifications and emails',
      convert: 'Convert (beta)',
      history: 'History',
      editAssignments: 'Edit topic and curriculum assignments',
      flagContent: 'Flag content',
      moveToTrash: 'Move to trash',
      sort: 'Sort children',
      edit: 'Edit',
      organize: 'Organize',
      moveToGroupedTextExercise: 'Move content to other grouped-text-exercise',
      moveToTextExercise: 'Move content to other text-exercise'
    },
    notifications: {
      loadMore: "Load more",
      unknownProblem: "There was a problem loading the notifications, please try again later.",
      loading: "Loading notifications",
      hide: "Hide notifications for this content.",
      setThreadStateArchived: "%actor% archived %thread%.",
      setThreadStateUnarchived: "%actor% restored %thread%.",
      createComment: "%actor% commented in %thread%: %comment%.",
      createThread: "%actor% started %thread% on %object%.",
      createEntity: "%actor% created %object%.",
      setLicense: "%actor% changed the license of %repository%.",
      createEntityLink: "%actor% associated %child% with %parent%.",
      removeEntityLink: "%actor% dissociated %child% from %parent%.",
      createEntityRevision: "%actor% created a %revision% of %entity%.",
      checkoutRevision: "%actor% checked out %revision% in %repository%.",
      rejectRevision: "%actor% rejected a %revision% in %repository%.",
      createTaxonomyLink: "%actor% added %child% to %parent%.",
      removeTaxonomyLink: "%actor% removed %child% from %parent%.",
      createTaxonomyTerm: "%actor% created %term%.",
      setTaxonomyTerm: "%actor% updated %term%.",
      setTaxonomyParentDeleted: "%actor% removed the parent of %child%.",
      setTaxonomyParentChangedFrom: "%actor% changed parent of %child% from %previousparent% to %parent%.",
      setTaxonomyParentChanged: "%actor% changed parent of %child% to %parent%.",
      setUuidStateTrashed: "%actor% trashed %object%.",
      setUuidStateRestored: "%actor% restored %object%.",
      entityPlaceholderPage: "Page",
      entityPlaceholderArticle: "Article",
      entityPlaceholderVideo: 'Video',
      entityPlaceholderApplet: 'Applet',
      entityPlaceholderCoursePage: "Course page",
      entityPlaceholderExercise: "Exercise",
      entityPlaceholderGroupedExercise: "Grouped exercise",
      entityPlaceholderExerciseGroup: "Exercise group",
      entityPlaceholderEvent: 'Event',
      entityPlaceholderCourse: "Course",
      entityPlaceholderTaxonomyTerm: "Term",
      entityPlaceholderFallback: "Content"
    }
  }
};