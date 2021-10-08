import { headerData, footerData, landingSubjectsData } from './menu-data';
export const instanceData = {
  lang: "ta",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "அனைவருக்கும் திறந்த உரிமம் உள்ள ஓர் இணையத்தளம்",
      search: "தேடுக",
      login: "உள்நுழை"
    },
    search: {
      privacy: 'The search is provided by Google. See our %privacypolicy% to find out what information is processed.',
      agree: 'Agree'
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
      articles: "கட்டுரைகள்",
      courses: "வகுப்புப்புகள்",
      videos: "காணொளிகள்",
      applets: 'Applets',
      folders: 'Folders',
      exercises: "பயிற்சிகள்",
      events: "நிகழ்வுகள்"
    },
    entities: {
      applet: "ஆப்லெட்",
      article: "கட்டுரை",
      course: "வகுப்பு",
      coursePage: "வகுப்பு-பக்கம்",
      event: 'Event',
      exercise: 'Exercise',
      exerciseGroup: "பயிற்சிப் பதிவுகள்",
      folder: "அடைவு",
      groupedExercise: 'Grouped Exercise',
      page: "பக்கம்",
      solution: "தீர்வு",
      taxonomyTerm: 'Taxonomy Term',
      user: "பயனர்",
      video: "காணொளி",
      topicFolder: 'Exercise folder',
      comment: "கருத்து",
      revision: "மீட்டல்",
      thread: 'Thread',
      threads: 'Threads',
      topic: 'Topic',
      subject: 'Subject',
      userProfile: 'User Profile',
      privacyPolicy: 'Privacy Policy',
      content: "Content"
    },
    pageTitles: {
      notifications: 'Your Notifications',
      subscriptions: "Manage Subscriptions",
      revisionHistory: "Revision History",
      eventLog: "Event Log",
      unrevisedRevisions: 'Unrevised Revisions'
    },
    roles: {
      donor: "Donor",
      author: 'Author',
      reviewer: 'Reviewer'
    },
    share: {
      button: "பகிர்க",
      title: "பகிர்!",
      copyLink: "இணைப்பை நகலெடுக்கவும்",
      copySuccess: "இணைப்பு நகலெடுக்கப்பட்டது!",
      close: "நெருக்கமான",
      pdf: 'Download as PDF',
      pdfNoSolutions: 'PDF without solutions'
    },
    edit: {
      button: "தொகு",
      unrevised: 'Show unrevised revisions'
    },
    license: {
      readMore: "தகவல்",
      special: 'Different license',
      nonFree: 'Usage of this content might be more restricted than our other content.'
    },
    course: {
      showPages: "வகுப்பு மேலோட்டத்தைக் காட்டவும்",
      pages: 'Course overview',
      next: "அடுத்து",
      back: 'Back'
    },
    content: {
      show: "காட்டு",
      hide: "மறை",
      prerequisite: 'For this task you need the following basic knowledge:',
      task: 'Task',
      right: "சரி",
      wrong: "பிழை",
      feedback: 'Feedback',
      answer: 'Answer',
      check: "சரிபார்க்கவும்",
      yourAnswer: "உங்கள் பதில்:",
      chooseOption: 'Click on one of the options.',
      printModeChooseOption: 'Check one of the options.',
      trashedNotice: "இந்த உள்ளடக்கம் குப்பையாக குறிக்கப்பட்டுள்ளது.",
      unrevisedNotice: 'This content has no accepted revision yet. Please use the %link% to preview.',
      strategy: 'Solution Strategy',
      picture: 'Picture',
      previewImage: 'Preview Image',
      exercisesTitle: 'Exercises',
      moreExercises: 'You can find more exercises in the following folder:',
      relatedContentTitle: 'Still want more?',
      relatedContentText: 'You can find more content on this topic here:',
      sourcesTitle: 'Sources'
    },
    consent: {
      title: 'Consent for external Content',
      intro: 'While using this site you may allowed us to load content from external providers. You can read about the details in the %privacypolicy%.',
      revokeTitle: 'Revoke',
      revokeText: 'Here you can revoke your consent. In this case we ask again, before we load content from those providers',
      noConsent: 'No content saved.',
      revokeConsent: 'Revoke consent'
    },
    embed: {
      text: 'By clicking on image or button above you agree that external content from %provider% will be loaded. Also personal data may be transferred to this service in accordance with our %privacypolicy%.',
      video: 'Play Video from %provider%',
      applet: 'Load Applet from %provider%',
      twingle: 'Load Donation Form'
    },
    comments: {
      question: 'Do you have a question?',
      commentsOne: "கருத்து",
      commentsMany: "கருத்துகள்",
      submit: "இணைக்க",
      archiveThread: 'Archive thread',
      restoreThread: 'Restore thread',
      deleteThread: 'Delete thread',
      deleteComment: 'Delete comment',
      postedOn: 'Posted on',
      placeholder: "Your question or suggestion…",
      placeholderReply: "உங்கள் பதில்:",
      loading: 'Looking for comments ...',
      error: 'Sorry, comments could not be loaded, please try again later.',
      showMoreReply: 'Show one more reply',
      showMoreReplies: 'Show %number% more replies',
      showArchived: 'Show archived %threads%',
      copyLink: 'Copy comment link'
    },
    revisions: {
      toOverview: "Back to overview",
      toContent: "Go to content",
      changes: "மாற்றங்கள்",
      context: "Context (current version)",
      title: "தலைப்பு",
      content: "உட்பொருள்",
      metaTitle: "Meta Title",
      metaDescription: "Meta Description",
      diff: "Source view",
      sidebyside: "Side By Side",
      currentVersion: "Current Version",
      thisVersion: "This Version",
      currentNotice: "This is the currently accepted version.",
      rejectedNotice: 'This revision was not accepted.',
      noCurrentNotice: 'There is no accepted revision yet.',
      unknownNotice: 'This revision was accepted once or was never reviewed.',
      by: 'By',
      parentFallbackLink: 'To parent content',
      hasChanges: 'There have been changes in this area',
      positionForGrouped: 'This %exercise_or_solution% is part of %title%.',
      helpLink: 'Revision Help'
    },
    revisionHistory: {
      changes: 'Changes',
      author: 'Author',
      date: 'Date',
      edit: 'Edit',
      editLabel: 'Create a new revision starting from this specific revision',
      view: 'Show',
      viewLabel: 'Show this revision',
      status: 'Status'
    },
    unrevisedRevisions: {
      supportLinks: 'Review support',
      guideline: 'Guideline for reviewing',
      showMoreEntities: 'Show all in %subject%',
      showMoreRevisions: 'Show %number% more…',
      newLabelText: 'new',
      newLabelNote: 'This is a new entity',
      wipLabelText: 'wip',
      wipLabelNote: 'Marked as work in progress. Do not review yet.',
      newAuthorText: 'new author',
      newAuthorNote: 'This is one of the first edits of this author, maybe prioritise this.'
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
      preparingNotice: 'Preparing print!',
      warning: 'IMPORTANT: To make sure all images and formulas print, please scroll down to the end of the page once BEFORE you open this dialog. Thank you!'
    },
    profiles: {
      aboutMe: 'About me',
      recentActivities: 'Recent activities',
      showAllActivities: 'Show all activities',
      lastLogin: 'Last login',
      yearsWithSerlo: 'Years with Serlo!',
      yearWithSerlo: 'Year with Serlo!',
      roles: 'Roles',
      instanceRoles: 'Roles on %lang%.serlo.org:',
      otherRoles: 'Other roles:',
      directMessage: 'Direct message',
      goToChat: 'Go to Chat',
      registerChat: 'Register for Chat',
      inviteToChat: 'Invite to chat',
      invitation: '💬 %username% has invited you to the Serlo community chat!\nGo to %chatlink% to join.',
      inviteModal: {
        part1: '%username% is not yet active in our community chat at %chatLink%.',
        part2: 'You can invite %username% to the chat to send direct messages:',
        button: 'Send invitation'
      },
      activityGraph: {
        edits: "Edits",
        comments: "Comments",
        reviews: "Reviews",
        taxonomy: "Taxonomy",
        legendary: "💙 Just wow! 💙",
        untilNextLevel: "%amount% more to complete this circle 🎉"
      },
      howToEditImage: {
        heading: 'How to edit your profile picture',
        description: 'Currently we use the images from %chatLink% as profile pictures. In order to change your picture, do the following:',
        steps: {
          goToChat: 'Go to %chatLink%.',
          signIn: 'Sign in.',
          goToMyAccount: 'Go in the user menu to %myAccountLink%.',
          myAccount: 'My Account',
          uploadPicture: 'Upload a new picture (make sure it is square) and click "Save changes".',
          refreshPage: 'Come back here and refresh the image using %refreshLink%.',
          refreshLink: 'this link'
        }
      },
      motivation: {
        edit: 'Edit motivation',
        add: 'Add motivation',
        heading: 'How to edit your motivation',
        intro: 'Motivations are a new feature we test at the moment. To edit your motivation you have to fill out a simple form.',
        privacy: 'The form and data storage is offered by Google and personal data may be transferred to this service when using this feature.',
        toForm: 'Motivation Form'
      }
    },
    notices: {
      welcome: '👋 Welcome %username%!',
      bye: '👋 See you soon!',
      revisionSaved: 'Revision is saved and will be reviewed soon 👍',
      revisionAccepted: 'Revision was successfully accepted ✅',
      revisionRejected: 'Revision was successfully rejected ❎',
      revisionSavedAccepted: 'Revision was successfully saved and accepted ✅'
    },
    loading: {
      oneMomentPlease: 'One moment please…',
      isLoading: 'Content is loading…',
      unknownProblem: "Sorry, there was a problem loading the content, please try again later."
    },
    login: {
      pleaseLogInLink: 'Please log in',
      pleaseLogInText: 'to use this feature.'
    },
    keys: {
      ctrl: 'ctrl',
      return: 'return'
    },
    eventLog: {
      currentEvents: 'Current events',
      oldestEvents: '%amount% oldest events',
      globalDescription: 'All events that happen somewhere on %lang%.serlo.org'
    },
    events: {
      setThreadStateArchived: "%actor% archived %thread%.",
      setThreadStateUnarchived: "%actor% restored %thread%.",
      createComment: "%actor% commented in %thread%: %comment%.",
      createThread: "%actor% started %thread% on %object%.",
      createEntity: "%actor% created %object%.",
      setLicense: "%actor% changed the license of %repository%.",
      createEntityLink: "%actor% associated %child% with %parent%.",
      removeEntityLink: "%actor% dissociated %child% from %parent%.",
      createEntityRevision: "%actor% created a %revision% of %entity%.",
      checkoutRevision: "%actor% checked out a %revision% in %repository%.",
      rejectRevision: "%actor% did not accept a %revision% in %repository%.",
      createTaxonomyLink: "%actor% added %child% to %parent%.",
      removeTaxonomyLink: "%actor% removed %child% from %parent%.",
      createTaxonomyTerm: "%actor% created %term%.",
      setTaxonomyTerm: "%actor% updated %term%.",
      setTaxonomyParentDeleted: "%actor% removed the parent of %child%.",
      setTaxonomyParentChangedFrom: "%actor% changed parent of %child% from %previousparent% to %parent%.",
      setTaxonomyParentChanged: "%actor% changed parent of %child% to %parent%.",
      setUuidStateTrashed: "%actor% trashed %object%.",
      setUuidStateRestored: "%actor% restored %object%.",
      inviteToChat: "You have been invited to the Chat! %break% Go to %chatLink% to chat with %actor% and others.",
      entityPlaceholderFallback: "Content"
    },
    actions: {
      loadMore: "Load more"
    }
  }
};
export const instanceLandingData = {
  lang: "ta",
  subjectsData: landingSubjectsData,
  strings: {
    vision: "நாம் சமமான கல்வி வாய்ப்புகளை நோக்கி இணைந்து பணிபுரியும் ஒரு குழு. இந்த இணையத்தளத்தில் எண்ணற்ற விவரக் கட்டுரைகள், பயிற்சிகள் மற்றும் ஒலிப் பேழைகள் அனைத்துப் பாடங்களுக்கும் வழங்கப்பட்டுவருகின்றன. இவை அனைத்தும் இலவசமாக உலகம் முழுவதும் உள்ள மாணவர்களுக்காக உருவாக்கப்பட்டுவருகின்றன. இனி வரும் காலங்களில், தமிழ்மொழியிலும் இவ்வாறான இலவசப் பாடத்திட்டங்களை உருவாக்க நீங்களும் எம்முடன் இணைந்து பணியாற்றலாம்.",
    learnMore: "மேலும் அறிக",
    democraticallyStructured: "ஜனநாயக ரீதியாக",
    nonProfit: "இலாப நோக்கற்றது",
    transparent: "வெளிப்படைத்தன்மை",
    openlyLicensed: "திறந்த உரிமம்",
    adFree: "விளம்பரமின்றி",
    freeOfCharge: "இலவசம்",
    wikiTitle: "Serlo கற்பதற்கு விக்கிபீடியா போன்றது",
    wikiText: "Serlo.org விக்கிபீடியாபோல திறந்த உரிமம் கொண்ட ஓர் இணையத்தளம். இது எம் எழுத்தாளர் குழுவால் உருவாக்கப்படுகின்றது.",
    movementTitle: "நீங்களும் இதில் பண்ணியாற்றலாம்",
    callForAuthors: "ஆசிரியர்களும் ஆர்வமுள்ள எழுத்தாளர்களும் பாடங்களை உருவாக்க பல வழிகளில் உதவலாம். புதுப் பயிற்சிகளை உருவாக்குவதற்கும் இந்தத் தளத்தின் சில உள்ளடக்கங்களை இன்னும் மேம்படுத்துவதற்கும் நீங்கள் உதவலாம். அதற்கு கீழுள்ள இணையத்திற்குச் செல்லவும்.",
    communityLink: "ஆசிரியர்களுக்கான பக்கத்தை  பார்வையிடுங்கள்",
    callForOther: "நாங்கள் பல வகையான வேலைவாய்ப்புகளையும் பொதுச்சேவையாகப் பணியாற்றும் வாய்ப்புகளையும் வழங்குகின்றோம். இந்த இணையத்தளதிற்கு மொழிபெயர்ப்பாளர்கள், வடிவமைப்பாளர்கள், தொலைத்தொடர்பாளர்கள் போன்ற துறை சார்ந்தவர்களை நாங்கள் தேடி நிற்கின்றோம். இணைந்து கொள்ளுங்கள்.",
    getInvolved: "பங்கேற்கவும்!"
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
      url: '/user/me',
      title: 'Own profile'
    }, {
      url: '/auth/password/change',
      title: "கடவுச்சொல்லை மாற்று"
    }, {
      url: '/event/history/user/me',
      title: "சமீபத்திய செய்தவை"
    }, {
      url: '/entity/unrevised/user/me',
      title: "Unrevised Revisions"
    },  {
      url: '/subscriptions/manage',
      title: "சந்தாக்கள்"
    }, {
      url: '/api/auth/logout',
      title: "வெளியேறு"
    }]
  }],
  strings: {
    tools: 'Other Tools',
    authorMenu: {
      log: "பதிவு",
      settings: "அமைப்புகள்",
      moveCoursePage: 'Move this page to another course',
      thisCoursePage: 'This course-page',
      addCoursePage: 'Add course-page',
      wholeCourse: 'Whole course',
      copyItems: 'Copy items',
      moveItems: 'Move items',
      addGroupedTextExercise: 'Add grouped-text-exercise',
      changeLicense: 'Change License',
      subscribe: "சந்தா",
      subscribeNotifications: 'Recieve notifications',
      subscribeNotificationsAndMail: 'Recieve notifications and emails',
      unsubscribeNotifications: "சந்தாவை நிறுத்துதல்",
      convert: 'Convert (beta)',
      history: "வரலாறு",
      editAssignments: "தலைப்பு மற்றும் பாடத்திட்ட பணிகளை உருவாக்கவும்.",
      moveToTrash: "குப்பைக்கு நகர்த்தவும்",
      restoreContent: 'Restore from trash',
      sortCoursePages: 'Sort course pages',
      sortGroupedExercises: 'Sort grouped Exercises',
      edit: "திருத்தம்",
      unrevisedEdit: 'Show unrevised revisions',
      organize: "ஒழுங்குபடுத்த",
      moveToGroupedTextExercise: 'Move content to other grouped-text-exercise',
      moveToTextExercise: 'Move content to other text-exercise',
      sortEntities: 'Sort content',
      newEntity: 'New Entity',
      editProfile: 'Edit profile',
      directLink: 'Direct link to this content'
    },
    notifications: {
      hide: "Hide notifications for this content.",
      setToRead: "Set notification to read.",
      setAllToRead: "Set all visible to read",
      showNew: "New",
      showRead: "Read"
    },
    subscriptions: {
      mail: "E-mails",
      subscription: "Subscription",
      noMails: "deactivate",
      getMails: "activate",
      noNotifications: "cancel",
      loadedSentence: "Loaded %loadedCount% of %totalCount% subscriptions.",
      loadMoreLink: "Load more!"
    },
    revisions: {
      checkout: {
        action: 'Accept',
        title: 'Accept Revision',
        explanation: 'Please give the author some feedback.'
      },
      reject: {
        action: 'Reject',
        title: 'Reject Revision',
        explanation: 'Please tell the author why you will not accept the submission.'
      },
      confirm: 'Confirm',
      unrevisedTaxNote: 'New content, not accepted yet'
    }
  }
};