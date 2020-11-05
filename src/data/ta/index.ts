import { headerData, footerData, landingSubjectsData } from './menu-data';
export const instanceData = {
  lang: "ta",
  headerData: headerData,
  footerData: footerData,
  landingData: landingSubjectsData,
  strings: {
    header: {
      slogan: "அனைவருக்கும் திறந்த உரிமம் உள்ள ஓர் இணையத்தளம்",
      search: "தேடுக",
      login: "உள்நுழை"
    },
    footer: {
      summaryHeading: "கற்பதற்கு விக்கிபீடியா போன்றது Serlo.org.",
      summaryText: "நாங்கள் கல்வியை அனைவருக்கும் இலவசமாகக் கிடைக்கச் செய்ய அயராது உழைக்கிறோம்",
      learnMore: "மேலும் அறிக",
      participate: "சேருங்கள்",
      donate: "தானம் செய்",
      toTop: "மேல் நோக்கி"
    },
    categories: {
      articles: 'Articles',
      courses: 'Courses',
      videos: 'Videos',
      applets: 'Applets',
      folders: 'Folders',
      exercises: "பயிற்சிகள்",
      events: 'Events'
    },
    entities: {
      applet: 'Applet',
      article: 'Article',
      course: 'Course',
      coursePage: 'Course Page',
      event: 'Event',
      exercise: 'Exercise',
      exerciseGroup: 'Exercise Group',
      folder: 'Folder',
      groupedExercise: 'Grouped Exercise',
      page: 'Page',
      solution: 'Solution',
      taxonomyTerm: 'Taxonomy Term',
      user: 'User',
      video: 'Video',
      topicFolder: 'Exercise folder',
      comment: 'Comment',
      revision: 'Revision',
      thread: 'Thread',
      topic: 'Topic',
      subject: 'Subject'
    },
    share: {
      button: "பகிர்க",
      title: "பகிர்!",
      copyLink: "இணைப்பை நகலெடுக்கவும்",
      copySuccess: "இணைப்பு நகலெடுக்கப்பட்டது!",
      close: "நெருக்கமான"
    },
    edit: {
      button: "தொகு"
    },
    license: {
      readMore: "தகவல்"
    },
    course: {
      showPages: "வகுப்பு மேலோட்டத்தைக் காட்டவும்",
      pages: 'Course overview',
      next: "அடுத்து"
    },
    content: {
      show: "காட்டு",
      hide: "மறை",
      prerequisite: 'For this task you need the following basic knowledge:',
      task: 'Task',
      right: 'Right',
      wrong: 'Wrong',
      check: 'Check',
      yourAnswer: 'Your answer…',
      chooseOption: 'Click on one of the options.',
      trashedNotice: 'This content is marked for deletion.'
    },
    cookie: {
      part1: "இந்த வலைத்தளத்தைப் பயன்படுத்துவதன் மூலம் நீங்கள் எங்களுடன் உடன்படுகிறீர்கள் என்று அறிவிக்கிறீர்கள்",
      part2: "மற்றும்",
      part3: '.',
      link1: "தனியுரிமைக் கொள்கை",
      link2: "பயன்பாட்டு விதிமுறைகளை",
      button: "ஒப்புக்கொள்கிறேன்"
    },
    notifications: {
      notifications: "அறிவிப்புகள்",
      pleaseLogInLink: 'Please log in',
      pleaseLogInText: 'to see your notifications.'
    },
    comments: {
      question: 'Do you have a question?',
      commentsOne: 'Comment',
      commentsMany: 'Comments',
      submit: 'Submit',
      reportComment: 'Report comment',
      archiveThread: 'Archive thread',
      deleteThread: 'Delete thread',
      deleteComment: 'Delete comment',
      postedOn: 'Posted on',
      placeholder: "Your question or suggestion…",
      placeholderReply: "Your answer…"
    },
    revisions: {
      toOverview: "Back to overview",
      changes: "Changes",
      title: "Title",
      content: "Content",
      metaTitle: "Meta Title",
      metaDescription: "Meta Description",
      compare: "Compare",
      currentVersion: "Current Version",
      thisVersion: "This Version",
      thisIsCurrentVersion: "This is the currently accepted version.",
      by: 'By'
    },
    errors: {
      title: '😬 Websites make mistakes sometimes…',
      defaultMessage: 'So sorry, we ran into a problem loading this content.',
      temporary: 'The good news? The problem seems to be temporary, so please try again later.',
      permanent: 'We will see what we can do about that… ',
      typeNotSupported: 'Please try reloading this page.',
      refreshNow: 'Refresh now',
      backToPrevious: 'Back to previous page',
      backToHome: 'To our home page'
    },
    print: {
      warning: 'Important: To make sure all images and formulas print, please scroll down to the end of the page once. Thank you!'
    }
  }
};
export const instanceLandingData = {
  lang: "ta",
  subjectsData: landingSubjectsData,
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
  title: "Serlo உடன் கற்றுக்கொள்ளுங்கள்!"
};
export const loggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: "அறிவிப்புகள்",
    icon: 'notifications'
  }, {
    url: '',
    title: "பயனர்",
    icon: 'user',
    children: [{
      url: '/user/public',
      title: 'Public profile'
    }, {
      url: '/user/settings',
      title: 'Edit profile'
    }, {
      url: '/auth/password/change',
      title: "கடவுச்சொல்லை மாற்று"
    }, {
      url: '/event/history/user/me',
      title: 'Recent activities'
    }, {
      url: '/api/auth/logout',
      title: "வெளியேறு"
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
      unsubscribeNotifications: 'Unsubscribe',
      convert: 'Convert (beta)',
      history: 'History',
      editAssignments: 'Edit topic and curriculum assignments',
      flagContent: 'Flag content',
      moveToTrash: 'Move to trash',
      restoreContent: 'Restore from trash',
      sort: 'Sort children',
      edit: 'Edit',
      organize: 'Organize',
      moveToGroupedTextExercise: 'Move content to other grouped-text-exercise',
      moveToTextExercise: 'Move content to other text-exercise',
      sortEntities: 'Sort content',
      newEntity: 'New Entity'
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
      entityPlaceholderFallback: "Content"
    }
  }
};