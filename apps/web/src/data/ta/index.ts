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
      groupedExercise: 'Grouped Exercise',
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
      copySuccess: "இணைப்பு நகலெடுக்கப்பட்டது!",
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
    course: {
      showPages: "வகுப்பு மேலோட்டத்தைக் காட்டவும்",
      pages: 'Course overview',
      next: "அடுத்து",
      back: 'Back',
      noPagesWarning: 'Sorry there seem to be no reviewed pages in this course yet.',
      noRevisionForPage: 'unreviewed page'
    },
    content: {
      show: "காட்டு",
      hide: "மறை",
      trashedNotice: "இந்த உள்ளடக்கம் குப்பையாக குறிக்கப்பட்டுள்ளது.",
      unrevisedNotice: 'This content has no accepted revision yet. Please use the %link% to preview.',
      emptyNotice: 'There is no content here. Please edit or delete.',
      picture: "படம்",
      previewImage: 'Preview Image',
      imageAltFallback: "படம்",
      exercisesTitle: "பயிற்சிகள்",
      moreExercises: 'You can find more exercises in the following folder:',
      relatedContentTitle: 'Still want more?',
      relatedContentText: 'You can find more content on this topic here:',
      sourcesTitle: 'Sources',
      exercises: {
        prerequisite: 'For this task you need the following basic knowledge:',
        task: "பணி",
        correct: "சரி",
        missedSome: 'Almost! You missed at least one correct answer.',
        wrong: "பிழை",
        feedback: "கருத்து",
        answer: "பதில்",
        check: "சரிபார்க்கவும்",
        yourAnswer: "உங்கள் பதில்:",
        chooseOption: 'Click on one of the options.',
        printModeChooseOption: 'Check one of the options.',
        strategy: 'Strategy',
        solution: 'Proposed Solution'
      },
      boxTypes: {
        blank: 'Blank',
        example: 'Example',
        quote: 'Quote',
        approach: 'Approach',
        remember: "நினைவில் கொள்க:",
        attention: "கவனத்தில் கொள்க!",
        note: "குறிப்பு",
        definition: 'Definition',
        theorem: 'Theorem',
        proof: 'Proof'
      },
      loadingVideoFailed: 'Something went wrong',
      loadingAudioFailed: 'Something went wrong'
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
      help3: 'You want to be a reviewer? Get in contact with: %contactLink%.',
      contactPerson: 'LinaMaria',
      contactPersonUrl: 'https://community.serlo.org/direct/LinaMaria',
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
      verificationLinkText: 'Click here to request the verification email again.'
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
      moveCoursePage: 'Move this page to another course',
      thisCoursePage: 'This course-page',
      addCoursePage: 'Add course-page',
      wholeCourse: 'Whole course',
      moveOrCopyItems: 'Move or copy items',
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
      confirmTrash: 'Are you sure you want to delete this content?',
      restoreContent: 'Restore from trash',
      sortCoursePages: 'Sort course pages',
      sortGroupedExercises: 'Sort grouped Exercises',
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
    editor: {
      confirmRouteChange: 'Are you sure you want to leave without saving?',
      noChangesWarning: 'Nothing changed so there is no need to save yet',
      plugins: {
        anchor: {
          title: 'Anchor',
          description: 'Insert an anchor.',
          identifier: 'Identifier (e.g. "long-explanation")',
          anchorId: 'ID of the anchor'
        },
        box: {
          title: 'Container',
          description: 'A container for examples, quotes, warnings, theorems, notes…',
          type: 'Type of box',
          typeTooltip: 'Choose the type of the box',
          titlePlaceholder: '(optional title)',
          anchorId: 'Anchor ID',
          emptyContentWarning: 'Boxes without content will not be displayed'
        },
        unsupported: {
          title: 'Unsupported',
          notSupported: 'Sorry, this plugin is not supported:',
          explanation: 'It will not be displayed to users. You can either remove it or asks developers for support.'
        },
        equations: {
          title: 'Terms and equations',
          description: 'Write term manipulations and solve multiline equations.',
          leftHandSide: 'left-hand side',
          transformation: 'transformation',
          mode: 'Mode',
          transformationExample: 'e.g. -3x',
          transformationOfEquations: 'Transformation of equations',
          transformationOfTerms: 'Transformation of terms',
          addNewRow: 'Add new row',
          explanation: "விளக்கம்",
          term: 'Term',
          rightHandSide: 'right-hand side',
          combineLikeTerms: 'Combine like terms.',
          setEqual: 'Set the terms equal to each other.',
          firstExplanation: 'First explanation',
          moveUpLabel: 'Move up',
          removeRowLabel: 'Remove row'
        },
        geogebra: {
          title: 'GeoGebra Applet',
          description: 'Embed GeoGebra Materials applets via URL or ID.',
          chooseApplet: 'Choose Applet',
          urlOrId: 'GeoGebra URL or ID'
        },
        highlight: {
          title: 'Source Code',
          description: 'Highlight the syntax of source code.',
          clickAndEnter: 'Click here and enter your source code…',
          enterHere: 'Enter your source code here',
          language: "மொழி",
          languageTooltip: 'Choose language for syntax highlighting',
          showLineNumbers: 'Line numbers',
          lineNumbersTooltip: 'Should users see line numbers?'
        },
        image: {
          title: "படம்",
          description: 'Upload images.',
          upload: 'Upload',
          imageUrl: 'Image URL',
          placeholderEmpty: 'https://example.com/image.png',
          placeholderUploading: 'Uploading…',
          placeholderFailed: 'Upload failed…',
          retry: 'Retry',
          failedUpload: 'Upload failed',
          captionPlaceholder: 'Optional caption',
          href: 'Link',
          hrefPlaceholder: 'Link the image',
          alt: 'Description (hidden)',
          altPlaceholder: 'Describe what the image shows',
          maxWidth: 'Maximum width',
          maxWidthPlaceholder: 'Enter the maximum width'
        },
        injection: {
          title: 'serlo.org Content',
          description: 'Embed serlo.org content via their ID.',
          illegalInjectionFound: 'Illegal injection found',
          serloEntitySrc: 'Serlo entity {{src}}',
          serloId: 'Serlo ID',
          placeholder: 'Serlo ID (e.g. 1565)'
        },
        multimedia: {
          title: 'Multimedia content associated with text',
          description: 'Create an illustrating or explaining multimedia content associated with text.',
          chooseSize: 'Choose size of multimedia element',
          changeType: 'Change the multimedia type',
          howImportant: 'How important is the multimedia content?',
          isIllustrating: 'It is illustrating',
          isEssential: 'It is essential',
          reset: 'Reset the multimedia content'
        },
        pageLayout: {
          title: 'Layout Column for Pages',
          description: "The plugin the people want but don't get 🤫",
          chooseRatio: 'Choose column ratio'
        },
        pasteHack: {
          title: 'Experimental State-Paste Plugin',
          description: 'only on staging'
        },
        pageTeam: {
          title: 'Team Overview',
          description: 'Only for the teampages'
        },
        pagePartners: {
          title: 'Partner List',
          description: 'Only for partner page (List of partner logos like on de.serlo.org/)'
        },
        rows: {
          title: 'Rows',
          searchForTools: 'Search for tools…',
          duplicate: 'Duplicate',
          copyAnchorLink: 'Copy link to this element',
          remove: "நீக்கு",
          close: "நெருக்கமான",
          dragElement: 'Drag the element within the document',
          addAnElement: 'Add an element'
        },
        serloTable: {
          title: 'Table',
          description: 'Create pretty tables',
          mode: 'Mode',
          columnHeaders: 'Only column headers',
          rowHeaders: 'Only row headers',
          columnAndRowHeaders: 'Column and row headers',
          convertToText: 'Convert to text',
          convertToImage: 'Convert to image',
          row: 'row',
          column: 'column',
          addType: "இணைக்குக %type%",
          addTypeBefore: 'Add %type% before',
          deleteType: 'Delete %type%',
          confirmDelete: 'Are you sure you want to delete this %type% and the content in it?'
        },
        spoiler: {
          title: 'Spoiler',
          description: 'A collapsible box.',
          enterATitle: 'Enter a title'
        },
        text: {
          title: 'Text',
          description: 'Compose content using rich text and math formulas.',
          placeholder: 'Write something or add element:',
          addButtonExplanation: 'Click to insert new element',
          quote: 'Quote',
          setColor: 'Set color',
          resetColor: "நிறத்தை மீட்டமை",
          colors: 'Colors',
          closeSubMenu: 'Close sub menu',
          heading: "தலைப்பு",
          headings: "தலைப்புகள்",
          link: 'Link (%ctrlOrCmd% + K)',
          noElementPasteInLists: 'Sorry, pasting elements inside of lists is not allowed.',
          pastingPluginNotAllowedHere: 'Sorry, pasting this plugin here is not allowed.',
          linkOverlay: {
            placeholder: 'https://… or /1234',
            inputLabel: 'Paste or type a link',
            edit: 'Edit Link',
            remove: 'Remove Link',
            customLink: 'Custom Link',
            invalidLinkWarning: 'Please provide a valid link that starts with http(s)://…'
          },
          openInNewTab: "புதியத் தாவலில் திற",
          orderedList: "கட்டளையிட்ட பட்டியல்",
          unorderedList: "கட்டளையிடாத பட்டியல்",
          lists: "பட்டியல்கள்",
          mathFormula: 'Math formula (%ctrlOrCmd% + M)',
          code: 'Code (%ctrlOrCmd% + ⇧ + `)',
          blank: 'Blank',
          createBlank: 'Create Blank',
          removeBlank: 'Remove Blank',
          bold: 'Bold (%ctrlOrCmd% + B)',
          italic: 'Italic (%ctrlOrCmd% + I)',
          noItemsFound: "உருப்படிகள் எதுவும் இல்லை",
          colorNames: {
            blue: 'Blue',
            green: 'Green',
            orange: 'Orange'
          },
          math: {
            formula: '[formula]',
            visual: 'visual',
            latex: 'LaTeX',
            latexEditorTitle: 'LaTeX editor',
            onlyLatex: 'Only LaTeX editor available',
            shortcuts: 'Shortcuts',
            fraction: 'Fraction',
            superscript: 'Superscript',
            or: "அல்லது",
            subscript: 'Subscript',
            root: 'Root',
            mathSymbols: 'Math symbols',
            eG: "உதாரணமாக.",
            functions: "செயல்பாடுகள்",
            displayAsBlock: 'Display as block',
            closeMathFormulaEditor: 'Close math formula editor'
          }
        },
        video: {
          title: "காணொளி",
          description: 'Embed YouTube, Vimeo, Wikimedia Commons or BR videos.',
          videoUrl: 'Video URL',
          videoDescription: "விவரிப்பு:",
          titlePlaceholder: "தலைப்பு",
          url: 'URL',
          seoTitle: 'Title for search engines'
        },
        audio: {
          title: 'Audio',
          description: 'Link to audio files on Vocaroo',
          audioUrl: 'Enter Audio URL'
        },
        exercise: {
          title: "பயிற்சிகள்",
          description: 'Interactive or text based exercise'
        },
        inputExercise: {
          title: 'Input Exercise',
          description: 'Solution can be text or math'
        },
        textAreaExercise: {
          title: 'Text Box Exercise',
          description: 'A big text box for long answers. No feedback.'
        },
        scMcExercise: {
          title: 'SC/MC Exercise',
          description: 'Single Choice or Multiple Choice'
        },
        blanksExercise: {
          title: 'Fill In The Blanks',
          description: 'Text with blanks',
          placeholder: 'Write a text and add blanks',
          chooseType: 'Choose the exercise type',
          modes: {
            typing: 'Typing',
            'drag-and-drop': 'Drag & Drop'
          },
          previewMode: "முற்பார்வை",
          previewIsActiveHint: 'Edit the exercise again',
          previewIsDeactiveHint: 'Preview the exercise',
          dummyAnswers: 'Extra incorrect answers',
          addDummyAnswer: 'Add an incorrect answer',
          removeDummyAnswer: 'Remove extra answer',
          addAlternativeAnswer: 'Add an alternative answer',
          removeAlternativeAnswer: 'Remove alternative answer',
          alternativeAnswers: 'Alternative answers',
          acceptMathEquivalents: 'Accept all equivalent mathematical values'
        }
      },
      templatePlugins: {
        applet: {
          seoTitle: 'Title for search engines',
          seoDesc: 'Description for search engines',
          placeholder: "தலைப்பு"
        },
        article: {
          seoTitle: 'Title for search engines',
          seoDesc: 'Description for search engines',
          title: "தலைப்பு",
          writeShortIntro: "ஒரு சிறிய அறிமுகத்தை எழுதுங்கள்",
          stillWantMore: 'Still want more?',
          moreOnTopic: 'You can find more content on this topic here',
          addSource: 'Add source',
          removeLabel: "நீக்கு",
          moveUpLabel: 'Move up',
          dragLabel: 'Drag to change order',
          openInTab: "புதியத் தாவலில் திற",
          sources: 'Sources',
          sourceText: 'Source Text',
          sourceUrl: 'Optional URL',
          moreInFolder: 'You can find more exercises in the following folder',
          addModal: {
            introText: 'After reading the article, what would help out learners next? %break% Here you can add some %exercises% or link to a single %exerciseFolder%. %break% Or you can suggest %articles%, %courses% or %videos% to follow up with.',
            introText2: 'You can either paste an Serlo ID, an URL or choose content from the parent folder below.',
            buttonEx: 'Add exercises',
            buttonExFolder: 'Select exercise folder',
            buttonContent: "உள்ளடக்கம் சேர்க்கவும்",
            buttonAddType: "இணைக்குக %type%",
            title: 'Add related Content or Exercises',
            invalidInput: 'Invalid id or url',
            fetchError: 'Something went wrong, please try later',
            loading: "ஏற்றுகிறது...",
            notFound: 'Could not find that content',
            unsupportedType: 'Sorry, type [%type%] is not supported here',
            unsupportedId: 'Sorry, this ID is not supported here',
            addFromFolderTitle: 'From the folder',
            placeholder: 'Paste Serlo ID or URL here',
            exerciseFolderNote: 'Only one can be selected here'
          }
        },
        course: {
          seoDesc: 'Description for search engines',
          title: "தலைப்பு",
          removeCoursePage: 'Remove course page',
          addCoursePage: 'Add course page'
        },
        coursePage: {
          explanation: "விளக்கம்",
          video: "காணொளி",
          question: "கேள்வி",
          title: "தலைப்பு"
        },
        exercise: {
          scMcExercise: 'Choice Exercise',
          inputExercise: 'Input Exercise',
          textAreaExercise: 'Text Box Exercise',
          blanksExercise: 'Fill In The Blanks Exercise',
          h5p: 'H5p Exercise',
          addOptionalInteractiveEx: 'Add an optional interactive exercise:',
          changeInteractive: 'Change interactive element',
          removeInteractive: 'Remove interactive element',
          createSolution: 'Create solution',
          removeSolution: 'Remove solution'
        },
        event: {
          seoTitle: 'Title for search engines',
          seoDesc: 'Description for search engines',
          title: "தலைப்பு"
        },
        inputExercise: {
          chooseType: 'Choose the exercise type',
          unit: "அலகுகள்",
          addAnswer: 'Add answer',
          enterTheValue: 'Enter the value',
          feedbackPlaceholder: 'Add a feedback message for this answer',
          yourSolution: 'Your solution',
          types: {
            'input-string-normalized-match-challenge': "Text (exact, e.g. 'tiger')",
            'input-number-exact-match-challenge': "Number (exact, e.g. '0.5')",
            'input-expression-equal-match-challenge': "Mathematical expression (equivalent, e.g. '0.5' or '1/2' or '2/4'"
          }
        },
        page: {
          title: "தலைப்பு"
        },
        scMcExercise: {
          singleChoice: 'Single-choice',
          multipleChoice: 'Multiple-choice',
          chooseType: 'Choose the exercise type',
          addAnswer: 'Add answer',
          previewMode: "முற்பார்வை",
          previewIsActiveHint: 'Preview mode is active',
          previewIsDeactiveHint: 'Here you can edit'
        },
        solution: {
          optionalExplanation: 'Optionally explain the solution strategy here',
          idArticle: 'ID of an article, e.g. 1855',
          openArticleTab: 'Open the article in a new tab:',
          linkTitle: 'Title of the link',
          showSolution: "விடையைக் காட்டு",
          hideSolution: "விடையை மறைக்கவும்",
          changeLicense: "உத்தரவு மாற்றுதல்",
          addPrerequisite: 'Add link'
        },
        textExerciseGroup: {
          removeExercise: 'Remove exercise',
          addExercise: 'Add exercise',
          kindOfExerciseGroup: 'Kind of exercise group',
          notCohesive: 'not cohesive',
          cohesive: 'cohesive'
        }
      },
      edtrIo: {
        localStorage: {
          found: 'You have locally saved edits of this revision. Do you want to load them?',
          foundButton: 'Load stored edits',
          restoreInitial: 'Want to start fresh? Beware that this will delete your current edits!',
          restoreInitialButton: 'Delete changes',
          confirmRestore: 'Are you sure you want to delete all your changes?'
        },
        settings: "அமைப்புகள்",
        extendedSettings: 'Extended Settings',
        close: "நெருக்கமான",
        save: "சேமி",
        saveWithReview: 'Save and get review',
        cancel: "ரத்து செய்",
        saving: 'Saving…',
        missingChanges: 'You need to fill out the changes you made',
        missingLicenseTerms: 'You need to accept the license terms',
        missingChangesAndLicenseTerms: 'You need to fill out the changes you made and accept the license terms',
        errorSaving: 'An error occurred during saving.',
        saveLocallyAndRefresh: 'You can store the revision locally, refresh the page and try to save again.',
        revisionSaved: 'Revision saved',
        saveRevision: "மீட்டலை புதுப்பித்தல் ",
        changes: 'Describe your changes to the content',
        skipReview: 'Skip peer review (not recommended)',
        enableNotifs: 'Enable serlo.org notifications',
        enableNotifsMail: 'Enable notifications via e-mail',
        switchRevision: 'Switch to another revision',
        importOther: 'Import content from other entity',
        importOtherExplanation: "Just paste the url or id of another serlo.org entity of the same type here to duplicate it's content here. Do NOT use this to make exact copies or move content. Exercise Groups and Courses are not supported (but Exercises and Course Pages).",
        importOtherWarning: 'Warning: This overwrites everything that is already present in this editor!',
        importOtherButton: 'Import content',
        current: "தற்போது",
        author: "எழுத்தாளர்",
        createdAt: 'when?',
        ready: "சேமிக்கத் தயாரா?",
        anchorLinkWarning: 'This link will only work in the frontend and for content that has a somewhat new revision.',
        pluginCopyInfo: 'You can now paste this plugin into text plugins',
        pluginCopyButtonLabel: 'Copy plugin to clipboard'
      },
      taxonomy: {
        title: "தலைப்பு"
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
    },
    ai: {
      exerciseGeneration: {
        buttonTitleSingular: 'Generate an exercise with AI',
        buttonTitle: 'AI generate exercise group',
        initialModalTitle: 'Create an exercise automatically with help of AI',
        modalTitleWithTaxonomy: 'Exercise generation with AI: ',
        confirmCloseDescription: 'Do you want to cancel the exercise generation? Your data will be lost.',
        summary: 'Summary',
        nextButton: "அடுத்து",
        nextExerciseButton: 'Next exercise',
        previousButton: 'Previous exercise',
        generateExerciseButton: 'Generate exercise',
        generateExercisesButton: 'Generate exercises',
        somethingWentWrong: 'Something went wrong. Please try again.',
        hallucinationWarning: 'The AI can generate incorrect exercises. Please review carefully.',
        topic: {
          title: 'About which %topic% would you like to generate exercises?',
          topic: "தலைப்பு",
          defaultLabel: 'Topic',
          otherTopicLabel: 'Other topic',
          customTopicPlaceholder: 'Enter custom topic'
        },
        grade: {
          title: 'Which %grade% are the students in?',
          grade: 'grade',
          label: 'Grade',
          university: 'University'
        },
        exerciseType: {
          title: 'What %exerciseType% are you interested in?',
          exerciseType: 'exercise type',
          label: 'Exercise type',
          subtasksTitleSummary: 'Subtasks',
          subtasksTitle: 'Should there be subtasks?',
          subtasksTitleExerciseGroup: 'How many subtasks should there be?',
          noSubtasks: 'No',
          yesSubtasks: 'Yes',
          subtasksLabel: "பயிற்சிகள்",
          numberOfSubtasksPlaceholder: 'Number of subtasks',
          chooseOption: 'Choose an option',
          multipleChoice: 'Multiple Choice',
          singleChoice: 'Single Choice',
          inputExercise: 'Input exercise',
          blanksExercise: 'Fill In The Blanks Exercise'
        },
        difficulty: {
          title: 'What is the %difficulty% level of the exercise and learning goal?',
          difficulty: 'difficulty',
          label: 'Difficulty',
          learningGoalLabel: 'Learning goal',
          learningGoalExample: 'Example: Students understand the basics of algebra.',
          learningGoalPlaceholder: 'Enter learning goal',
          chooseOption: 'Choose an option',
          easy: 'Easy',
          medium: 'Medium',
          hard: 'Hard'
        },
        priorKnowledge: {
          title: 'What is the %priorKnowledge% that the students should have?',
          priorKnowledge: 'prior knowledge',
          label: 'Prior Knowledge',
          example: 'Example: The students know how basic algebra works and already solved some exercises on the topic.',
          placeholder: 'E.g., Basic arithmetic, fundamentals of algebra'
        },
        preview: {
          loadingHeading: 'Exercise is being generated...',
          patience: 'It can take up to two minutes',
          publishExercise: 'Publish exercise',
          openExerciseInEditor: 'Open in editor',
          regenerate: 'Regenerate exercise'
        }
      }
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