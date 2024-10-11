import { licenses } from './license-data-short';
import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: "ta",
  headerData,
  footerData,
  secondaryMenus,
  licenses,
  strings: {
    header: {
      slogan: "அனைவருக்கும் திறந்த உரிமம் உள்ள ஓர் இணையத்தளம்",
      search: "தேடுக",
      login: "உள்நுழை",
      skipLinks: {
        sentence: 'Skip to %content% or %footer%',
        content: "உட்பொருள்",
        footer: 'footer'
      }
    },
    search: {
      privacy: 'The search is provided by Google. See our %privacypolicy% to find out what information is processed.',
      agree: 'Agree to use search'
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
      folders: "கோப்புறைகள்",
      exercises: "பயிற்சிகள்",
      events: "நிகழ்வுகள்",
      unrevised: 'Unrevised',
      subterms: 'Subterms',
      exercisesContent: 'Exercises Content'
    },
    entities: {
      applet: "ஆப்லெட்",
      article: "கட்டுரை",
      course: "வகுப்பு",
      coursePage: "வகுப்பு-பக்கம்",
      event: "நிகழ்வு",
      exercise: "பயிற்சிகள்",
      exerciseGroup: "பயிற்சி கோப்புறை",
      topic: "கோப்புறை",
      page: "பக்கம்",
      solution: "தீர்வு",
      taxonomyTerm: 'Taxonomy Term',
      user: "பயனர்",
      video: "காணொளி",
      exerciseFolder: 'Exercise folder',
      comment: "கருத்து",
      revision: "மீட்டல்",
      thread: 'Thread',
      threads: 'Threads',
      subject: "பாடம்",
      userProfile: 'User Profile',
      privacyPolicy: "தனியுரிமைக் கொள்கை",
      content: "உட்பொருள்"
    },
    pageTitles: {
      notifications: 'Your Notifications',
      subscriptions: 'Manage Subscriptions',
      revisionHistory: 'Revision History',
      eventLog: 'Event Log',
      unrevisedRevisions: 'Unrevised Revisions',
      userEdits: 'Edits by %user%',
      userEditsMine: 'My Unrevised Revisions',
      editProfile: 'Edit Profile & Settings',
      recycleBin: 'Recycle Bin',
      diagon: 'Diagon Alley',
      discussions: "கருத்துகள்",
      manageRoles: 'Manage User Roles'
    },
    roles: {
      donor: 'Donor',
      author: "எழுத்தாளர்",
      reviewer: 'Reviewer'
    },
    share: {
      button: "பகிர்க",
      title: "பகிர்!",
      copyLink: "இணைப்பை நகலெடுக்கவும்",
      copySuccess: 'Link copied!',
      copyFailed: 'Error copying link!',
      close: "நெருக்கமான",
      pdf: 'Download as PDF',
      pdfNoSolutions: 'PDF without solutions'
    },
    modal: {
      leaveNow: 'Leave now',
      noStay: 'No, I want to stay'
    },
    editOrAdd: {
      button: "திருத்தம்",
      addNewEntities: "புதிய உள்ளடக்கம் சேர்க்கவும்",
      addNewExercises: 'Add new exercises',
      editExercises: 'Edit exercises',
      unrevised: 'Show unrevised revisions',
      inviteModal: {
        title: 'Create with us!',
        text: 'Hello! %break% Great that you want to contribute to this content 👍 %break% Everybody can edit, but you need an account to do so.',
        loginButton: "இப்போது உள்நுழைக",
        registerButton: 'Register new account',
        psText: 'You can find out in what ways you can contribute %link%.',
        psLinkText: "இங்கே"
      }
    },
    license: {
      readMore: "தகவல்",
      special: 'Different license',
      nonFree: 'Usage of this content might be more restricted than our other content.',
      appliesTo: 'Applies to'
    },
    content: {
      show: "காட்டு",
      hide: "மறை",
      trashedNotice: "இந்த உள்ளடக்கம் குப்பையாக குறிக்கப்பட்டுள்ளது.",
      unrevisedNotice: 'This content has no accepted revision yet. Please use the %link% to preview.',
      emptyNotice: 'There is no content here. Please edit or delete.',
      picture: "படம்",
      previewImage: 'Preview Image',
      task: "பணி"
    },
    consent: {
      title: 'Consent for external Content',
      intro: 'While using this site you may allowed us to load content from external providers. You can read about the details in the %privacypolicy%.',
      revokeTitle: 'Revoke',
      revokeText: 'Here you can revoke your consent. In this case we ask again, before we load content from those providers',
      noConsent: 'not consented',
      revokeConsent: 'Revoke consent'
    },
    embed: {
      text: 'By clicking on image or button above you agree that external content from %provider% will be loaded. Also personal data may be transferred to this service in accordance with our %privacypolicy%.',
      video: 'Play Video from %provider%',
      applet: 'Load Applet from %provider%',
      twingle: 'Load Donation Form',
      audio: 'Play audio from %provider%',
      general: "செயல்படுத்துங்கள்"
    },
    comments: {
      question: "உங்களுக்கு கேள்வி உள்ளதா?",
      questionLink: 'Write it here',
      commentsOne: "கருத்து",
      commentsMany: "கருத்துகள்",
      submit: "இணைக்க",
      archiveThread: 'Archive thread',
      restoreThread: 'Restore thread',
      deleteThread: 'Delete thread',
      deleteComment: "கருத்தை நீக்கவும்",
      postedOn: 'Posted on',
      placeholder: 'Your question or suggestion…',
      placeholderReply: "உங்கள் பதில்:",
      loading: 'Looking for comments ...',
      error: 'Sorry, comments could not be loaded, please try again later.',
      showMoreReply: 'Show one more reply',
      showMoreReplies: 'Show %number% more replies',
      hideReplies: 'Hide',
      showArchived: 'Show archived %threads%',
      copyLink: 'Copy comment link',
      commentsOverviewExplanation: 'Here you can see all comments that were written to content on %instance%.serlo.org. %break% Answer questions or find content you could improve. %break% The link above the comment brings you to the relevant entity.',
      edit: "திருத்து",
      cancelEdit: "ரத்து செய்",
      saveEdit: "சேமி"
    },
    revisions: {
      toOverview: 'Back to overview',
      toContent: 'Go to content',
      changes: "மாற்றங்கள்",
      context: 'Context (current version)',
      title: "தலைப்பு",
      content: "உட்பொருள்",
      metaTitle: 'Meta Title',
      metaDescription: 'Meta Description',
      diff: 'Source view',
      sidebyside: 'Side By Side',
      currentVersion: 'Current Version',
      thisVersion: 'This Version',
      currentNotice: 'This is the currently accepted version.',
      rejectedNotice: 'This revision was not accepted.',
      noCurrentNotice: 'There is no accepted revision yet.',
      unknownNotice: 'This revision was accepted once or was never reviewed.',
      by: 'By',
      parentFallbackLink: 'To parent content',
      hasChanges: 'There have been changes in this area',
      positionForGrouped: 'This %exercise% is part of %title%.',
      helpLink: 'Revision Help'
    },
    revisionHistory: {
      changes: "மாற்றங்கள்",
      author: "எழுத்தாளர்",
      date: "தேதி",
      edit: "திருத்தம்",
      editLabel: "இந்த குறிப்பிட்ட திருத்தத்திலிருந்து திருத்தத்தை உருவாக்கவும்",
      view: "காட்டு",
      viewLabel: 'Show this revision',
      status: 'Status'
    },
    unrevisedRevisions: {
      help1: 'All edits by our Authors show up here. %reviewersLink% will check the quality and approve the changes.',
      reviewers: "விமர்சகர்கள்",
      reviewersUrl: 'https://de.serlo.org/community/202923/rollen-der-serlo-community',
      help2: 'Everybody can preview the edits and continue editing. Inside the preview reviewers can accept the edit and also give feedback.',
      help4: 'How to review? See our %guidelineLink%.',
      guideline: 'Guideline for Reviewing',
      guidelineUrl: 'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/',
      subjectLinks: "படங்கள்",
      showMoreEntities: 'Show all in %subject%',
      showMoreRevisions: 'Show %number% more…',
      newLabelText: "புதிய",
      newLabelNote: 'This is a new entity',
      wipLabelText: 'wip',
      wipLabelNote: 'Marked as work in progress. Do not review yet.',
      newAuthorText: "புதிய எழுத்தாளர்",
      newAuthorNote: 'This is one of the first edits of this author, maybe prioritise this.',
      noUnrevisedRevisions: 'No unrevised revisions, all done! 🎉',
      importedContentText: 'imported',
      importedContentNote: 'This revision includes imported content',
      importedContentIdentifier: 'Content imported from'
    },
    errors: {
      title: '😬 Websites make mistakes sometimes…',
      defaultMessage: 'So sorry, we ran into a problem loading this content.',
      temporary: 'The good news? The problem seems to be temporary, so please try again later.',
      permanent: 'We will see what we can do about that… ',
      typeNotSupported: 'Please try reloading this page.',
      refreshNow: 'Refresh now',
      backToPrevious: 'Back to previous page',
      backToHome: 'To our home page',
      deletedComment: {
        title: 'Whoops, this is not here anymore',
        text: 'Sorry, this %type% is no longer online.%break% But it was deleted for a reason and was probably not worth your time anyway 💚'
      }
    },
    print: {
      preparingNotice: 'Preparing print!',
      warning: 'IMPORTANT: To make sure all images and formulas print, please scroll down to the end of the page once BEFORE you open this dialog. Thank you!'
    },
    profiles: {
      aboutMe: 'About me',
      recentActivities: "சமீபத்திய செய்தவை",
      showAllActivities: 'Show all activities',
      noActivities: 'No activities so far.',
      lastLogin: "கடைசி உள்நுழைவு",
      yearsWithSerlo: 'Years with Serlo!',
      yearWithSerlo: 'Year with Serlo!',
      roles: "செயல்பங்கு",
      instanceRoles: 'Roles on %lang%.serlo.org:',
      otherRoles: 'Other roles:',
      directMessage: 'Direct message',
      goToChat: 'Go to Chat',
      registerChat: 'Register for Chat',
      inviteToChat: 'Invite to chat',
      inviteModal: {
        part1: '%username% is not yet active in our community chat at %chatLink%.',
        part2: 'You can invite %username% to the chat to send direct messages.',
        messagePlaceholder: 'Optional: Personal message',
        button: 'Send invitation',
        success: '✨ Successfully invited!'
      },
      activityGraph: {
        edits: "கையாளுதல்",
        comments: "கருத்துகள்",
        reviews: "மீளாய்வு",
        taxonomy: "வகைப்பாடு",
        legendary: '💙 Just wow! 💙',
        untilNextLevel: '%amount% more to complete this circle 🎉'
      },
      editMotivation: 'Edit motivation',
      addMotivation: 'Add motivation',
      lockedDescriptionTitle: 'Your description currently hidden from the public.',
      lockedDescriptionText: 'After your first contributions it will become visible to everybody.'
    },
    notices: {
      welcome: '👋 Welcome %username%!',
      bye: "👋 விரைவில் சந்திப்போம்!",
      alreadyLoggedIn: "👋 மீண்டும் வருக",
      warningLoggedOut: '⚠️ You were logged out. Please login again and then use "Load stored edits" to restore your current changes.',
      revisionSaved: 'Revision is saved and will be reviewed soon 👍',
      revisionAccepted: 'Revision was successfully accepted ✅',
      revisionRejected: 'Revision was successfully rejected ❎',
      revisionSavedAccepted: 'Revision was successfully saved and accepted ✅'
    },
    loading: {
      oneMomentPlease: 'One moment please…',
      isLoading: 'Content is loading…',
      unknownProblem: 'Sorry, there was a problem loading the content, please try again later.'
    },
    auth: {
      pleaseLogInLink: "நீங்கள் உள்நுழைய வேண்டும்!",
      pleaseLogInText: 'to use this feature.',
      register: {
        registerTitle: 'Register your Serlo Account',
        passwordRequirements: 'At least 8 characters, longer is better.',
        registerIntro: 'You do not need an account for studying on serlo.org. %break% If you want to comment, or work on content you came to the right place',
        newsletterSubscription: 'Receive concise updates on our current activities in our newsletter. We use your information for sending purposes and for personal greetings. Look forward to relevant information and our annual fundraising campaign once a year. (optional)'
      },
      recoverTitle: 'Recover your account',
      recoveryInstructions: 'Insert and submit your email address. %break% We will then send you an email with a reset link.',
      verify: {
        title: 'Verify your email',
        instructions: 'Insert and submit your email address to verify it.',
        alreadyDone: 'You are logged in, so you have already verified your email😊.'
      },
      settings: {
        title: "உங்கள் கடவுச்சொல்லை மாற்ற",
        instruction: 'Insert your new password.'
      },
      loggingOut: 'Logging you out …',
      login: {
        confirmAction: 'Confirm Action',
        signIn: 'Sign in to your Account',
        logOut: "வெளியேறு",
        newHere: "நீங்கள் இங்கு புதியவரா?",
        registerNewAccount: 'Register new account',
        forgotPassword: 'Did you %forgotLinkText%?',
        forgotLinkText: 'forget your password',
        validSessionDetected: 'Hey, you are already logged in in another tab. Reload the page to see it!'
      },
      fields: {
        identifier: 'Username or Email address',
        username: "பயனர்பெயர்",
        password: "கடவுச்சொல்",
        email: 'Email',
        interest: "I'm here as..."
      },
      interests: {
        pleaseChoose: 'please choose',
        parent: "பெற்றோர்",
        teacher: "ஆசிரியர்கள்",
        pupil: "மாணவர்கள்",
        student: "பல்கலைக்கழக மாணவர்",
        other: "வேறு"
      },
      messages: {
        code1010003: 'Please confirm this action by verifying that it is you.',
        code1010001: 'Sign in',
        code1010002: 'Sign in via „Mein Bildungsraum“',
        code1010013: 'Continue with SSO',
        code1040001: 'Register',
        code1040002: 'Register via „Mein Bildungsraum“',
        code1040003: 'Continue',
        code1050001: 'Your changes have been saved! 🎉',
        code1060001: 'You successfully recovered your account. Please change your password in the next minutes.',
        code1060002: 'An email containing a recovery link has been sent to the email address you provided. %break% Check your mailbox and click on the provided link it contains.',
        code1070003: "சேமி",
        code1070005: "இணைக்க",
        code1080001: 'An email containing a verification link has been sent to the email address you provided.',
        code1080002: 'You have successfully verified your email address.',
        code4000001: '%reason%',
        code4000002: '%field% is missing.',
        // Should map to usernameInvalid
        code4000004: '%reason%',
        code4000005: '%reason%',
        code4000006: 'The username, email address or password was incorrect. Please check for spelling mistakes.',
        code4000007: 'An account with the same email or username exists already.',
        code4000008: 'The provided authentication code is invalid, please try again.',
        code4000010: 'Have you already verified your email address?.%break% %verificationLinkText%',
        code4060004: 'The recovery link is not valid or has already been used. Please try requesting an email again',
        code4070001: 'The verification link is not valid or has already been used. Please try requesting an email again.',
        code4070005: 'Sorry, this verification link is not valid any more. Please try requesting an email again.'
      },
      usernameInvalid: 'Your username may only contain letters, digits, underscores (_) and hyphens (-).',
      usernameTooLong: "Sorry, this username is too long, make sure it's 32 characters or less",
      passwordTooShort: 'Sorry, this password is too short. Please choose one that is at least 8 characters long.',
      passwordTooLong: 'Sorry, this password is too long. Please choose one that has a maximum of 72 characters.',
      passwordTooSimilar: 'Sorry, this password is too similar to your email or username.',
      emailInvalid: 'Sorry, this is not a valid email address. Check for typos.',
      registrationCheckboxAgreement: 'I agree to the %privacypolicy% and %terms%. I may receive email notifications from Serlo and can opt out at any time.',
      consentNeededBeforeProceeding: 'We need your consent before proceeding.',
      terms: 'Terms',
      signUp: 'Register',
      verificationProblem: 'In case you did not get it',
      verificationLinkText: 'Click here to request the verification email again.',
      badRole: 'You are only allowed to log in through VIDIS if you are a teacher.',
      somethingWrong: 'Sorry, something went wrong!'
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
      entityInParentPreposition: 'in',
      commentInParentPreposition: 'on',
      setThreadStateArchived: '%actor% archived %thread%.',
      setThreadStateUnarchived: '%actor% restored %thread%.',
      createComment: '%actor% commented in %thread%: %comment%.',
      createThread: '%actor% started %thread% on %object%.',
      createEntity: '%actor% created %object%.',
      setLicense: '%actor% changed the license of %repository%.',
      createEntityLink: '%actor% associated %child% with %parent%.',
      removeEntityLink: '%actor% dissociated %child% from %parent%.',
      createEntityRevision: '%actor% created %revision% of %entity%.',
      checkoutRevision: '%actor% checked out %revision% in %repository%.',
      rejectRevision: '%actor% did not accept %revision% in %repository%.',
      createTaxonomyLink: '%actor% added %child% to %parent%.',
      removeTaxonomyLink: '%actor% removed %child% from %parent%.',
      createTaxonomyTerm: '%actor% created %term%.',
      setTaxonomyTerm: '%actor% updated %term%.',
      setTaxonomyParentDeleted: '%actor% removed the parent of %child%.',
      setTaxonomyParentChangedFrom: '%actor% changed parent of %child% from %previousparent% to %parent%.',
      setTaxonomyParentChanged: '%actor% changed parent of %child% to %parent%.',
      setUuidStateTrashed: '%actor% trashed %object%.',
      setUuidStateRestored: '%actor% restored %object%.',
      inviteToChat: '%actor% invited you to the Chat: %comment% Go to %chatLink% to chat with %actor% and others.',
      entityPlaceholderFallback: "உட்பொருள்"
    },
    actions: {
      loadMore: 'Load more'
    },
    bin: {
      title: "தலைப்பு",
      trashed: 'Trashed…'
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
  title: "Serlo உடன் கற்றுக்கொள்ளுங்கள்!",
  topicTitleAffix: 'Basics & Exercises'
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
      url: '/event/history/user/me',
      title: 'My Edits'
    }, {
      url: '/subscriptions/manage',
      title: "சந்தாக்கள்"
    }, {
      url: '/auth/settings',
      title: "கடவுச்சொல்லை மாற்று"
    }, {
      url: '/user/settings',
      title: "அமைப்புகள்"
    }, {
      url: '/auth/logout',
      title: "வெளியேறு"
    }]
  }],
  strings: {
    tools: 'Other Tools',
    authorMenu: {
      log: "பதிவு",
      settings: "அமைப்புகள்",
      moveOrCopyItems: 'Move or copy items',
      addGroupedTextExercise: 'Add grouped-text-exercise',
      changeLicense: 'Change License',
      subscribe: "சந்தா",
      subscribeNotifications: 'Receive notifications',
      subscribeNotificationsAndMail: 'Receive notifications and emails',
      unsubscribeNotifications: "சந்தாவை நிறுத்துதல்",
      convert: 'Convert (beta)',
      history: "வரலாறு",
      editAssignments: "தலைப்பு மற்றும் பாடத்திட்ட பணிகளை உருவாக்கவும்.",
      moveToTrash: "குப்பைக்கு நகர்த்தவும்",
      confirmTrash: 'Are you sure you want to delete this content?',
      restoreContent: 'Restore from trash',
      sortCoursePages: 'Sort course pages',
      edit: "திருத்தம்",
      editTax: 'Edit Title & Text',
      unrevisedEdit: 'Show unrevised revisions',
      sortEntities: 'Sort content',
      newEntity: 'New Entity',
      editProfile: "சுயவிவர திருத்தம்",
      directLink: 'Direct link to this content',
      analyticsLink: 'See analytics data'
    },
    notifications: {
      hide: 'Deactivate new notifications for this content.',
      setToRead: 'Set notification to read.',
      setAllToRead: 'Set all visible to read',
      showNew: 'New',
      showRead: 'Read'
    },
    subscriptions: {
      mail: "மின்னஞ்சல்",
      subscription: "சந்தா",
      noMails: 'deactivate',
      getMails: "செயல்படுத்துங்கள்",
      noNotifications: 'cancel',
      loadedSentence: 'Loaded %loadedCount% of %totalCount% entries.',
      loadMoreLink: "மேலும் ஏற்று"
    },
    revisions: {
      checkout: {
        action: "ஏற்கிறேன்",
        title: "திருத்தம் ஏற்கப்பட்டுள்ளது",
        explanation: 'Please give the author some feedback.'
      },
      reject: {
        action: "மறுக்கிறேன்",
        title: 'Reject Revision',
        explanation: 'Please tell the author why you will not accept the submission.'
      },
      confirm: "உறுதிப்படுத்தவும்",
      unrevisedTaxNote: 'New content, not accepted yet'
    },
    mutations: {
      success: {
        trash: 'Successfully trashed 🗑',
        restore: 'Successfully restored ♻️',
        accept: 'Edit was accepted ✅',
        reject: 'Edit not rejected ❌',
        save: 'Edit successfully saved ✅',
        updated: 'Successfully updated ✅',
        generic: 'Success 🎉',
        saveNeedsReview: 'Thank you for your edit 🎉 The reviewers will check it soon and then it will appear on the site.'
      },
      errors: {
        UNAUTHENTICATED: 'You have to log in to use this function!',
        FORBIDDEN: 'Sorry, you are not allowed to do that!',
        INVALID_TOKEN: '',
        BAD_USER_INPUT: 'Sorry, you are trying something that is not supported…',
        UNKNOWN: 'An unknown error…',
        valueMissing: 'Please fill all required fields'
      }
    },
    profileSettings: {
      editAbout: 'Your description',
      showInstructions: 'Show instructions',
      editImage: {
        header: 'Profile picture',
        buttonText: 'How to edit your profile picture',
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
        header: 'Motivation',
        buttonText: 'How to edit your motivation',
        intro: 'Motivations are a new feature we test at the moment. To edit your motivation you have to fill out a simple form.',
        privacy: 'The form and data storage is offered by Google and personal data may be transferred to this service when using this feature.',
        toForm: 'Motivation Form'
      },
      delete: {
        heading: 'How to delete your account',
        text: 'If you want to delete your account, please write us at %mailLink%.%break% Make sure to use your registered email address and %subjectLine% as subject line.',
        deleteAccount: 'Delete Account'
      }
    },
    backend: {
      pages: 'Static Pages',
      authorization: "அங்கீகரித்தல்",
      navigation: "வழிசெலுத்தல்",
      recycleBin: 'Recycle Bin'
    },
    pages: {
      newPage: 'Add new Page',
      deletedPages: 'Deleted Pages'
    },
    taxonomyTermTools: {
      copyMove: {
        title: 'Move / Copy Entities in Taxonomy',
        select: 'Select entities to move or copy:',
        target: 'Target term:',
        link: 'Link',
        moveButtonText: 'Move to %type%',
        copyButtonText: 'Copy to %type%',
        moveSuccess: 'Sucessfully moved',
        copySuccess: 'Sucessfully copied',
        exerciseFolderNotice: 'Copying or moving the type %exerciseFolder% is not supported at the moment. %break% Please create a new folder and move the contents instead.'
      },
      deleteAdd: {
        confirmDelete: 'Are you sure you want to remove this assignment?',
        addSuccess: 'Sucessfully assigned, reloading …',
        addNewTitle: 'Add new assignment',
        addButtonText: 'Assign'
      },
      sort: {
        title: 'Sort Entities',
        saveButtonText: 'Save order'
      }
    },
    roles: {
      addButton: 'Add as %role%'
    }
  }
};
export const kratosMailStrings = {
  recovery: {
    valid: {
      subject: '👉 Access to your Serlo account',
      'body.plaintext': `👋 Hi {{ .Identity.traits.username }},
Are you trying to get access to your account at serlo.org? If not please just ignore this mail.

To reset your password please open the following link in your browser:
{{ .RecoveryURL }}

Best of luck from your Serlo team`,
      body: `<p>👋 Hi <b>{{ .Identity.traits.username }}</b>,</p>
<p>Are you trying to get access to your account at serlo.org? If not please just ignore this mail.</p>

<p>To reset your password please open the following link in your browser:
<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a><br/><br/>Best of luck from your Serlo team</p>`
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
<p>We are excited to have you at serlo.org 🎉</p>
<p>Please verify your account by clicking the following link:<br/>
<a style="color: #007ec1 !important;" href="{{ .VerificationURL }}">{{ .VerificationURL }}</a>
</p><p>Your Community-Support 💚</p>
      `
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