import { licenses } from './license-data-short'
import {
  headerData,
  footerData,
  landingSubjectsData,
  secondaryMenus,
} from './menu-data'
export const instanceData = {
  lang: 'en',
  headerData,
  footerData,
  secondaryMenus,
  licenses,
  strings: {
    header: {
      slogan: 'The Open Learning Platform',
      search: 'Search',
      login: 'Login',
      skipLinks: {
        sentence: 'Skip to %content% or %footer%',
        content: 'content',
        footer: 'footer',
      },
    },
    search: {
      privacy:
        'The search is provided by Google. See our %privacypolicy% to find out what information is processed.',
      agree: 'Agree to use search',
    },
    footer: {
      summaryHeading: 'Serlo.org is the Wikipedia for learning.',
      summaryText:
        'We are a community of visionaries working tirelessly to make great education freely available to everyone.',
      learnMore: 'Learn more',
      participate: 'Join the cause',
      donate: 'Donate',
      toTop: 'To Top',
    },
    categories: {
      articles: 'Articles',
      courses: 'Courses',
      videos: 'Videos',
      applets: 'Applets',
      folders: 'Folders',
      exercises: 'Exercises',
      events: 'Events',
      unrevised: 'Unrevised',
      subterms: 'Subterms',
      exercisesContent: 'Exercises Content',
    },
    entities: {
      applet: 'Applet',
      article: 'Article',
      course: 'Course',
      coursePage: 'Course Page',
      event: 'Event',
      exercise: 'Exercise',
      exerciseGroup: 'Exercise Group',
      topic: 'Folder',
      page: 'Page',
      solution: 'Solution',
      taxonomyTerm: 'Taxonomy Term',
      user: 'User',
      video: 'Video',
      exerciseFolder: 'Exercise folder',
      comment: 'Comment',
      revision: 'Revision',
      thread: 'Thread',
      threads: 'Threads',
      subject: 'Subject',
      userProfile: 'User Profile',
      privacyPolicy: 'Privacy Policy',
      content: 'Content',
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
      discussions: 'Comments',
      manageRoles: 'Manage User Roles',
    },
    roles: {
      donor: 'Donor',
      author: 'Author',
      reviewer: 'Reviewer',
    },
    share: {
      button: 'Share',
      title: 'Share!',
      copyLink: 'Copy link',
      copySuccess: 'Link copied! ',
      copyFailed: 'Error copying link! ',
      close: 'Close',
      pdf: 'Download as PDF',
      pdfNoSolutions: 'PDF without solutions',
    },
    modal: {
      leaveNow: 'Leave now',
      noStay: 'No, I want to stay',
    },
    editOrAdd: {
      button: 'Edit',
      addNewEntities: 'Add new content',
      addNewExercises: 'Add new exercises',
      editExercises: 'Edit exercises',
      unrevised: 'Show unrevised revisions',
      inviteModal: {
        title: 'Create with us!',
        text: 'Hello! %break% Great that you want to contribute to this content 👍 %break% Everybody can edit, but you need an account to do so.',
        loginButton: 'Login now',
        registerButton: 'Register new account',
        psText: 'You can find out in what ways you can contribute %link%.',
        psLinkText: 'here',
      },
    },
    license: {
      readMore: 'Info',
      special: 'Different license',
      nonFree:
        'Usage of this content might be more restricted than our other content.',
      appliesTo: 'Applies to',
    },
    course: {
      showPages: 'Show course overview',
      pages: 'Course overview',
      next: 'Next',
      back: 'Back',
      noPagesWarning:
        'Sorry there seem to be no reviewed pages in this course yet.',
      noRevisionForPage: 'unreviewed page',
    },
    content: {
      show: 'show',
      hide: 'hide',
      trashedNotice: 'This content is marked for deletion.',
      unrevisedNotice:
        'This content has no accepted revision yet. Please use the %link% to preview.',
      emptyNotice: 'There is no content here. Please edit or delete.',
      picture: 'Picture',
      previewImage: 'Preview Image',
      imageAltFallback: 'Image',
      exercisesTitle: 'Exercises',
      moreExercises: 'You can find more exercises in the following folder:',
      relatedContentTitle: 'Still want more?',
      relatedContentText: 'You can find more content on this topic here:',
      sourcesTitle: 'Sources',
      exercises: {
        prerequisite: 'For this task you need the following basic knowledge:',
        task: 'Task',
        correct: 'Correct',
        missedSome: 'Almost! You missed at least one correct answer.',
        wrong: 'Wrong',
        feedback: 'Feedback',
        answer: 'Answer',
        check: 'Check',
        yourAnswer: 'Your answer…',
        chooseOption: 'Click on one of the options.',
        printModeChooseOption: 'Check one of the options.',
        strategy: 'Strategy',
        solution: 'Proposed Solution',
        showHiddenInteractive: 'Check your solution here',
      },
      boxTypes: {
        blank: 'Blank',
        example: 'Example',
        quote: 'Quote',
        approach: 'Approach',
        remember: 'Remember',
        attention: 'Attention',
        note: 'Note',
        definition: 'Definition',
        theorem: 'Theorem',
        proof: 'Proof',
      },
      imageGalleryLightboxSrTitle:
        'Modal displaying a single large image, with buttons to navigate to other images in the gallery',
      loadingVideoFailed: 'Something went wrong',
      loadingAudioFailed: 'Something went wrong',
    },
    consent: {
      title: 'Consent for external Content',
      intro:
        'While using this site you may allowed us to load content from external providers. You can read about the details in the %privacypolicy%.',
      revokeTitle: 'Revoke',
      revokeText:
        'Here you can revoke your consent. In this case we ask again, before we load content from those providers',
      noConsent: 'not consented',
      revokeConsent: 'Revoke consent',
    },
    embed: {
      text: 'By clicking on image or button above you agree that external content from %provider% will be loaded. Also personal data may be transferred to this service in accordance with our %privacypolicy%.',
      video: 'Play Video from %provider%',
      applet: 'Load Applet from %provider%',
      twingle: 'Load Donation Form',
      audio: 'Play audio from %provider%',
      general: 'Activate',
    },
    comments: {
      question: 'Do you have a question?',
      questionLink: 'Write it here',
      commentsOne: 'Comment',
      commentsMany: 'Comments',
      submit: 'Submit',
      archiveThread: 'Archive thread',
      restoreThread: 'Restore thread',
      deleteThread: 'Delete thread',
      deleteComment: 'Delete comment',
      postedOn: 'Posted on',
      placeholder: 'Your question or suggestion…',
      placeholderReply: 'Your answer…',
      loading: 'Looking for comments ...',
      error: 'Sorry, comments could not be loaded, please try again later.',
      showMoreReply: 'Show one more reply',
      showMoreReplies: 'Show %number% more replies',
      hideReplies: 'Hide',
      showArchived: 'Show archived %threads%',
      copyLink: 'Copy comment link',
      commentsOverviewExplanation:
        'Here you can see all comments that were written to content on %instance%.serlo.org. %break% Answer questions or find content you could improve. %break% The link above the comment brings you to the relevant entity.',
      edit: 'Edit comment',
      cancelEdit: 'Cancel',
      saveEdit: 'Save',
    },
    revisions: {
      toOverview: 'Back to overview',
      toContent: 'Go to content',
      changes: 'Changes',
      context: 'Context (current version)',
      title: 'Title',
      content: 'Content',
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
      helpLink: 'Revision Help',
    },
    revisionHistory: {
      changes: 'Changes',
      author: 'Author',
      date: 'Date',
      edit: 'Edit',
      editLabel: 'Create a new revision starting from this specific revision',
      view: 'Show',
      viewLabel: 'Show this revision',
      status: 'Status',
    },
    unrevisedRevisions: {
      help1:
        'All edits by our Authors show up here. %reviewersLink% will check the quality and approve the changes.',
      reviewers: 'Reviewers',
      reviewersUrl:
        'https://de.serlo.org/community/202923/rollen-der-serlo-community',
      help2:
        'Everybody can preview the edits and continue editing. Inside the preview reviewers can accept the edit and also give feedback.',
      help4: 'How to review? See our %guidelineLink%.',
      guideline: 'Guideline for Reviewing',
      guidelineUrl:
        'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/',
      subjectLinks: 'To Subjects',
      showMoreEntities: 'Show all in %subject%',
      showMoreRevisions: 'Show %number% more…',
      newLabelText: 'new',
      newLabelNote: 'This is a new entity',
      wipLabelText: 'wip',
      wipLabelNote: 'Marked as work in progress. Do not review yet.',
      newAuthorText: 'new author',
      newAuthorNote:
        'This is one of the first edits of this author, maybe prioritise this.',
      noUnrevisedRevisions: 'No unrevised revisions, all done! 🎉',
      importedContentText: 'imported',
      importedContentNote: 'This revision includes imported content',
      importedContentIdentifier: 'Content imported from',
    },
    errors: {
      title: '😬 Websites make mistakes sometimes…',
      defaultMessage: 'So sorry, we ran into a problem loading this content.',
      temporary:
        'The good news? The problem seems to be temporary, so please try again later.',
      permanent: 'We will see what we can do about that… ',
      typeNotSupported: 'Please try reloading this page.',
      refreshNow: 'Refresh now',
      backToPrevious: 'Back to previous page',
      backToHome: 'To our home page',
      deletedComment: {
        title: 'Whoops, this is not here anymore',
        text: 'Sorry, this %type% is no longer online.%break% But it was deleted for a reason and was probably not worth your time anyway 💚',
      },
    },
    print: {
      preparingNotice: 'Preparing print!',
      warning:
        'IMPORTANT: To make sure all images and formulas print, please scroll down to the end of the page once BEFORE you open this dialog. Thank you!',
    },
    profiles: {
      aboutMe: 'About me',
      recentActivities: 'Recent activities',
      showAllActivities: 'Show all activities',
      noActivities: 'No activities so far.',
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
      inviteModal: {
        part1:
          '%username% is not yet active in our community chat at %chatLink%.',
        part2: 'You can invite %username% to the chat to send direct messages.',
        messagePlaceholder: 'Optional: Personal message',
        button: 'Send invitation',
        success: '✨ Successfully invited!',
      },
      activityGraph: {
        edits: 'Edits',
        comments: 'Comments',
        reviews: 'Reviews',
        taxonomy: 'Taxonomy',
        legendary: '💙 Just wow! 💙',
        untilNextLevel: '%amount% more to complete this circle 🎉',
      },
      editMotivation: 'Edit motivation',
      addMotivation: 'Add motivation',
      lockedDescriptionTitle:
        'Your description currently hidden from the public.',
      lockedDescriptionText:
        'After your first contributions it will become visible to everybody.',
    },
    notices: {
      welcome: '👋 Welcome %username%!',
      bye: '👋 See you soon!',
      alreadyLoggedIn: '👋 Welcome back',
      warningLoggedOut:
        '⚠️ You were logged out. Please login again and then use "Load stored edits" to restore your current changes.',
      revisionSaved: 'Revision is saved and will be reviewed soon 👍',
      revisionAccepted: 'Revision was successfully accepted ✅',
      revisionRejected: 'Revision was successfully rejected ❎',
      revisionSavedAccepted: 'Revision was successfully saved and accepted ✅',
    },
    loading: {
      oneMomentPlease: 'One moment please…',
      isLoading: 'Content is loading…',
      unknownProblem:
        'Sorry, there was a problem loading the content, please try again later.',
    },
    auth: {
      pleaseLogInLink: 'Please log in',
      pleaseLogInText: 'to use this feature.',
      register: {
        registerTitle: 'Register your Serlo Account',
        passwordRequirements: 'At least 8 characters, longer is better.',
        registerIntro:
          'You do not need an account for studying on serlo.org. %break% If you want to comment, or work on content you came to the right place',
        newsletterSubscription:
          'Receive concise updates on our current activities in our newsletter. We use your information for sending purposes and for personal greetings. Look forward to relevant information and our annual fundraising campaign once a year. (optional)',
      },
      recoverTitle: 'Recover your account',
      recoveryInstructions:
        'Insert and submit your email address. %break% We will then send you an email with a reset link.',
      verify: {
        title: 'Verify your email',
        instructions: 'Insert and submit your email address to verify it.',
        alreadyDone:
          'You are logged in, so you have already verified your email😊.',
      },
      settings: {
        title: 'Change your password',
        instruction: 'Insert your new password.',
      },
      loggingOut: 'Logging you out …',
      login: {
        confirmAction: 'Confirm Action',
        signIn: 'Sign in to your Account',
        logOut: 'Log out',
        newHere: 'Are you new here?',
        registerNewAccount: 'Register new account',
        forgotPassword: 'Did you %forgotLinkText%?',
        forgotLinkText: 'forget your password',
        validSessionDetected:
          'Hey, you are already logged in in another tab. Reload the page to see it!',
      },
      fields: {
        identifier: 'Username or Email address',
        username: 'Username',
        password: 'Password',
        email: 'Email',
        interest: "I'm here as...",
      },
      interests: {
        pleaseChoose: 'please choose',
        parent: 'Parent',
        teacher: 'Teacher',
        pupil: 'Pupil',
        student: 'University student',
        other: 'Other',
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
        code1060001:
          'You successfully recovered your account. Please change your password in the next minutes.',
        code1060002:
          'An email containing a recovery link has been sent to the email address you provided. %break% Check your mailbox and click on the provided link it contains.',
        code1070003: 'Save',
        code1070005: 'Submit',
        code1080001:
          'An email containing a verification link has been sent to the email address you provided.',
        code1080002: 'You have successfully verified your email address.',
        code4000001: '%reason%',
        code4000002: '%field% is missing.',
        // Should map to usernameInvalid
        code4000004: '%reason%',
        code4000005: '%reason%',
        code4000006:
          'The username, email address or password was incorrect. Please check for spelling mistakes.',
        code4000007:
          'An account with the same email or username exists already.',
        code4000008:
          'The provided authentication code is invalid, please try again.',
        code4000010:
          'Have you already verified your email address?.%break% %verificationLinkText%',
        code4060004:
          'The recovery link is not valid or has already been used. Please try requesting an email again',
        code4070001:
          'The verification link is not valid or has already been used. Please try requesting an email again.',
        code4070005:
          'Sorry, this verification link is not valid any more. Please try requesting an email again.',
      },
      usernameInvalid:
        'Your username may only contain letters, digits, underscores (_) and hyphens (-).',
      usernameTooLong:
        "Sorry, this username is too long, make sure it's 32 characters or less",
      passwordTooShort:
        'Sorry, this password is too short. Please choose one that is at least 8 characters long.',
      passwordTooLong:
        'Sorry, this password is too long. Please choose one that has a maximum of 72 characters.',
      passwordTooSimilar:
        'Sorry, this password is too similar to your email or username.',
      emailInvalid:
        'Sorry, this is not a valid email address. Check for typos.',
      registrationCheckboxAgreement:
        'I agree to the %privacypolicy% and %terms%. I may receive email notifications from Serlo and can opt out at any time.',
      consentNeededBeforeProceeding: 'We need your consent before proceeding.',
      terms: 'Terms',
      signUp: 'Register',
      verificationProblem: 'In case you did not get it',
      verificationLinkText:
        'Click here to request the verification email again.',
      badRole:
        'You are only allowed to log in through VIDIS if you are a teacher.',
      somethingWrong: 'Sorry, something went wrong!',
    },
    keys: {
      ctrl: 'ctrl',
      return: 'return',
    },
    eventLog: {
      currentEvents: 'Current events',
      oldestEvents: '%amount% oldest events',
      globalDescription: 'All events that happen somewhere on %lang%.serlo.org',
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
      setTaxonomyParentChangedFrom:
        '%actor% changed parent of %child% from %previousparent% to %parent%.',
      setTaxonomyParentChanged:
        '%actor% changed parent of %child% to %parent%.',
      setUuidStateTrashed: '%actor% trashed %object%.',
      setUuidStateRestored: '%actor% restored %object%.',
      inviteToChat:
        '%actor% invited you to the Chat: %comment% Go to %chatLink% to chat with %actor% and others.',
      entityPlaceholderFallback: 'Content',
    },
    actions: {
      loadMore: 'Load more',
    },
    bin: {
      title: 'Title',
      trashed: 'Trashed…',
    },
  },
}
export const instanceLandingData = {
  lang: 'en',
  subjectsData: landingSubjectsData,
  strings: {
    vision:
      'It is our vision to enable personalized learning and provide high quality educational resources worldwide – completely free of charge. Serlo is a grassroots organization inspired by Wikipedia. We already provide thousands of articles, videos and solved exercises for five million German students every year. Now it’s time to go international.',
    learnMore: 'Learn more',
    democraticallyStructured: 'democratically structured',
    nonProfit: 'non-profit',
    transparent: 'transparent',
    openlyLicensed: 'openly licensed',
    adFree: 'ad-free',
    freeOfCharge: 'free of charge',
    wikiTitle: 'Serlo is the Wikipedia for Learning',
    wikiText:
      'Just like Wikipedia, this platform is created by an engaged community of authors. Serlo Education is run and owned by decentralized teams of volunteers and professionals all over the world.',
    movementTitle: 'Become a Part of Our Movement for Open Education',
    callForAuthors:
      'We are looking for teachers and enthusiastic educators who are passionate about their subject. Become part of our community to create new learning material and help us improve existing content.',
    communityLink: 'Visit the landing page for authors',
    callForOther:
      'We offer a diverse range of jobs and volunteering opportunities in the fields of software development, design, translation, communications, project management and more.',
    getInvolved: 'Get involved!',
  },
}
export const serverSideStrings = {
  title: 'learn with Serlo!',
  topicTitleAffix: 'Basics & Exercises',
}

export const loggedInData = {
  authMenu: [
    {
      url: '/user/notifications',
      title: 'Notifications',
      icon: 'notifications',
    },
    {
      url: '',
      title: 'User',
      icon: 'user',
      children: [
        {
          url: '/user/me',
          title: 'Own profile',
        },
        {
          url: '/event/history/user/me',
          title: 'My Edits',
        },
        {
          url: '/subscriptions/manage',
          title: 'Subscriptions',
        },
        {
          url: '/auth/settings',
          title: 'Change password',
        },
        {
          url: '/user/settings',
          title: 'Settings',
        },
        {
          url: '/auth/logout',
          title: 'Log out',
        },
      ],
    },
  ],
  strings: {
    tools: 'Other Tools',
    authorMenu: {
      log: 'Log',
      settings: 'Settings',
      moveOrCopyItems: 'Move or copy items',
      addGroupedTextExercise: 'Add grouped-text-exercise',
      changeLicense: 'Change License',
      subscribe: 'Subscribe',
      subscribeNotifications: 'Receive notifications',
      subscribeNotificationsAndMail: 'Receive notifications and emails',
      unsubscribeNotifications: 'Unsubscribe',
      convert: 'Convert (beta)',
      history: 'History',
      editAssignments: 'Edit topic and curriculum assignments',
      moveToTrash: 'Move to trash',
      confirmTrash: 'Are you sure you want to delete this content?',
      restoreContent: 'Restore from trash',
      sortCoursePages: 'Sort course pages',
      edit: 'Edit',
      editTax: 'Edit Title & Text',
      unrevisedEdit: 'Show unrevised revisions',
      sortEntities: 'Sort content',
      newEntity: 'New Entity',
      editProfile: 'Edit profile',
      directLink: 'Direct link to this content',
      analyticsLink: 'See analytics data',
    },
    notifications: {
      hide: 'Deactivate new notifications for this content.',
      setToRead: 'Set notification to read.',
      setAllToRead: 'Set all visible to read',
      showNew: 'New',
      showRead: 'Read',
    },
    subscriptions: {
      mail: 'E-mails',
      subscription: 'Subscription',
      noMails: 'deactivate',
      getMails: 'activate',
      noNotifications: 'cancel',
      loadedSentence: 'Loaded %loadedCount% of %totalCount% entries.',
      loadMoreLink: 'Load more!',
    },
    revisions: {
      checkout: {
        action: 'Accept',
        title: 'Accept Revision',
        explanation: 'Please give the author some feedback.',
      },
      reject: {
        action: 'Reject',
        title: 'Reject Revision',
        explanation:
          'Please tell the author why you will not accept the submission.',
      },
      confirm: 'Confirm',
      unrevisedTaxNote: 'New content, not accepted yet',
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
        saveNeedsReview:
          'Thank you for your edit 🎉 The reviewers will check it soon and then it will appear on the site.',
      },
      errors: {
        UNAUTHENTICATED: 'You have to log in to use this function!',
        FORBIDDEN: 'Sorry, you are not allowed to do that!',
        INVALID_TOKEN: '',
        BAD_USER_INPUT:
          'Sorry, you are trying something that is not supported…',
        UNKNOWN: 'An unknown error…',
        valueMissing: 'Please fill all required fields',
      },
    },
    profileSettings: {
      editAbout: 'Your description',
      showInstructions: 'Show instructions',
      editImage: {
        header: 'Profile picture',
        buttonText: 'How to edit your profile picture',
        description:
          'Currently we use the images from %chatLink% as profile pictures. In order to change your picture, do the following:',
        steps: {
          goToChat: 'Go to %chatLink%.',
          signIn: 'Sign in.',
          goToMyAccount: 'Go in the user menu to %myAccountLink%.',
          myAccount: 'My Account',
          uploadPicture:
            'Upload a new picture (make sure it is square) and click "Save changes".',
          refreshPage:
            'Come back here and refresh the image using %refreshLink%.',
          refreshLink: 'this link',
        },
      },
      motivation: {
        header: 'Motivation',
        buttonText: 'How to edit your motivation',
        intro:
          'Motivations are a new feature we test at the moment. To edit your motivation you have to fill out a simple form.',
        privacy:
          'The form and data storage is offered by Google and personal data may be transferred to this service when using this feature.',
        toForm: 'Motivation Form',
      },
      delete: {
        heading: 'How to delete your account',
        text: 'If you want to delete your account, please write us at %mailLink%.%break% Make sure to use your registered email address and %subjectLine% as subject line.',
        deleteAccount: 'Delete Account',
      },
    },
    backend: {
      pages: 'Static Pages',
      authorization: 'Authorization',
      navigation: 'Navigation',
      recycleBin: 'Recycle Bin',
    },
    pages: {
      newPage: 'Add new Page',
      deletedPages: 'Deleted Pages',
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
        exerciseFolderNotice:
          'Copying or moving the type %exerciseFolder% is not supported at the moment. %break% Please create a new folder and move the contents instead.',
      },
      deleteAdd: {
        confirmDelete: 'Are you sure you want to remove this assignment?',
        addSuccess: 'Sucessfully assigned, reloading …',
        addNewTitle: 'Add new assignment',
        addButtonText: 'Assign',
      },
      sort: {
        title: 'Sort Entities',
        saveButtonText: 'Save order',
      },
    },
    roles: {
      addButton: 'Add as %role%',
    },
  },
}

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
<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a><br/><br/>Best of luck from your Serlo team</p>`,
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
<p>✌️</p>`,
    },
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
      `,
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
<p>✌️</p>`,
    },
  },
}
