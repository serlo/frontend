import { licenses } from './license-data-short';
import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: "hi",
  headerData,
  footerData,
  secondaryMenus,
  licenses,
  strings: {
    header: {
      slogan: "ओपन लर्निंग प्लेटफॉर्म",
      search: "खोजें",
      login: "लॉग इन करें",
      skipLinks: {
        sentence: 'Skip to %content% or %footer%',
        content: 'content',
        footer: 'footer'
      }
    },
    search: {
      privacy: "खोज गूगल द्वारा प्रदान की गई है। क्या जानकारी संसाधित है, यह जानने के लिए हमारी%privacypolicy% देखें।",
      agree: 'Agree to use search'
    },
    footer: {
      summaryHeading: "Serlo.org सीखने की विकिपीडिया है",
      summaryText: "हम महान शिक्षा को हर किसी के लिए स्वतंत्र रूप से उपलब्ध कराने के लिए अथक रूप से काम करने वाले दूरदर्शी समुदाय का एक समुदाय हैं",
      learnMore: "और जानें",
      participate: "कारण में शामिल हों",
      donate: "दान करें",
      toTop: "ऊपर"
    },
    categories: {
      articles: "लेख",
      courses: "पाठ्यक्रम",
      videos: "वीडियो",
      applets: "एप्लेट",
      folders: "फ़ोल्डर्स",
      exercises: "अभ्यास",
      events: "कार्यक्रम",
      unrevised: 'Unrevised',
      subterms: 'Subterms',
      exercisesContent: 'Exercises Content'
    },
    entities: {
      applet: "एप्लेट",
      article: "लेख",
      course: "पाठ्यक्रम",
      coursePage: "अध्ययन पृष्ठ",
      event: "कार्यक्रम",
      exercise: "अभ्यास",
      exerciseGroup: "व्यायाम समूह",
      topic: 'Folder',
      page: "पृष्ठ",
      solution: "हल",
      taxonomyTerm: "टैक्सोनोमी शब्द",
      user: "उपयोगकर्ता",
      video: "वीडियो",
      exerciseFolder: 'Exercise folder',
      comment: "टिप्पणियां",
      revision: "संशोधन",
      thread: "धागा",
      threads: "थ्रेडस",
      subject: "विषय",
      userProfile: "यूज़र प्रोफाइल",
      privacyPolicy: "गोपनीयता नीति",
      content: "सामग्री"
    },
    pageTitles: {
      notifications: "आपकी सूचनाएं",
      subscriptions: "सदस्यताओं को प्रबंधित करें",
      revisionHistory: "संशोधन इतिहास",
      eventLog: 'Event Log',
      unrevisedRevisions: 'Unrevised Revisions',
      userEdits: 'Edits by %user%',
      userEditsMine: 'My Unrevised Revisions',
      editProfile: 'Edit Profile & Settings',
      recycleBin: 'Recycle Bin',
      diagon: 'Diagon Alley',
      discussions: "टिप्पणियां",
      manageRoles: 'Manage User Roles'
    },
    roles: {
      donor: "दाताओं",
      author: "लेखक",
      reviewer: "समीक्षक"
    },
    share: {
      button: "सांझा करें",
      title: "सांझा करें",
      copyLink: "लिंक कॉपी करें",
      copySuccess: 'Link copied!',
      copyFailed: 'Error copying link!',
      close: "बंद करें",
      pdf: 'Download as PDF',
      pdfNoSolutions: 'PDF without solutions'
    },
    modal: {
      leaveNow: 'Leave now',
      noStay: 'No, I want to stay'
    },
    editOrAdd: {
      button: "संपादित",
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
        psLinkText: 'here'
      }
    },
    license: {
      readMore: "सूचना",
      special: "अलग लाइसेंस",
      nonFree: "इस सामग्री का उपयोग हमारी अन्य सामग्री की तुलना में अधिक प्रतिबंधित हो सकता है।",
      appliesTo: 'Applies to'
    },
    content: {
      show: "दिखाएँ",
      hide: "छिपाएं",
      trashedNotice: "यह सामग्री हटाने के लिए चिह्नित है",
      unrevisedNotice: 'This content has no accepted revision yet. Please use the %link% to preview.',
      emptyNotice: 'There is no content here. Please edit or delete.',
      picture: 'Picture',
      previewImage: 'Preview Image',
      task: "कार्य"
    },
    consent: {
      title: "बाहरी सामग्री के लिए सहमति",
      intro: "इस साइट का उपयोग करते समय आप हमें बाहरी प्रदाताओं से सामग्री लोड करने की अनुमति दे सकते हैं। आप विवरण के बारे में पढ़ सकते हैं %privacypolicy%.",
      revokeTitle: "वापस लेना",
      revokeText: "यहां आप अपनी सहमति रद्द कर सकते हैं। इस मामले में, हम उन प्रदाताओं से सामग्री लोड करने से पहले फिर से पूछते हैं",
      noConsent: "कोई सामग्री सहेजी नहीं गई।",
      revokeConsent: "सहमति रद्द करें"
    },
    embed: {
      text: "ऊपर की छवि या बटन पर क्लिक करके आप सहमत होते हैं कि%provider%  से बाहरी सामग्री लोड हो जाएगी। इसके अलावा व्यक्तिगत डेटा हमारे% privacypolicy% के अनुसार इस सेवा में स्थानांतरित किया जा सकता है।",
      video: "से वीडियो चलाएं %provider%",
      applet: "%provider% से लोड एप्लेट ",
      twingle: "लोड दान प्रपत्र",
      audio: 'Play audio from %provider%',
      general: "सक्रिय"
    },
    comments: {
      question: "क्या आपका कोई प्रश्न है?",
      questionLink: 'Write it here',
      commentsOne: "टिप्पणियां",
      commentsMany: "टिप्पणियां",
      submit: "जमा करें",
      archiveThread: "आर्काइव थ्रेड",
      restoreThread: "थ्रेड को पुनर्स्थापित करें",
      deleteThread: "थ्रेड मिटाएं",
      deleteComment: "टिप्पणी हटाएँ",
      postedOn: "इस दिन पोस्ट हुआ",
      placeholder: "आपका प्रश्न या सुझाव",
      placeholderReply: "आपका उत्तर",
      loading: "टिप्पणियों की तलाश में ...",
      error: "क्षमा करें, टिप्पणियां लोड नहीं की जा सकीं, कृपया बाद में पुनः प्रयास करें।",
      showMoreReply: "एक और उत्तर दिखाओ",
      showMoreReplies: " %number% और उत्तर दिखाएं",
      hideReplies: 'Hide',
      showArchived: "संग्रहीत दिखाएँ %threads%",
      copyLink: "टिप्पणी लिंक कॉपी करें",
      commentsOverviewExplanation: 'Here you can see all comments that were written to content on %instance%.serlo.org. %break% Answer questions or find content you could improve. %break% The link above the comment brings you to the relevant entity.',
      edit: 'Edit comment',
      cancelEdit: "रद्द करें",
      saveEdit: "सहेजें"
    },
    revisions: {
      toOverview: "अवलोकन पर वापस जाएं",
      toContent: 'Go to content',
      changes: "परिवर्तन",
      context: 'Context (current version)',
      title: "शीर्षक",
      content: "सामग्री",
      metaTitle: "मेटा शीर्षक",
      metaDescription: "मेटा विवरण",
      diff: 'Source view',
      sidebyside: 'Side By Side',
      currentVersion: "वर्तमान संस्करण",
      thisVersion: "यह संस्करण",
      currentNotice: "यह वर्तमान में स्वीकृत संस्करण है।",
      rejectedNotice: 'This revision was not accepted.',
      noCurrentNotice: 'There is no accepted revision yet.',
      unknownNotice: 'This revision was accepted once or was never reviewed.',
      by: "द्वारा",
      parentFallbackLink: 'To parent content',
      hasChanges: 'There have been changes in this area',
      positionForGrouped: 'This %exercise% is part of %title%.',
      helpLink: 'Revision Help'
    },
    revisionHistory: {
      changes: "परिवर्तन",
      author: "लेखक",
      date: "दिनांक",
      edit: "संपादित",
      editLabel: "इस विशिष्ट संशोधन से प्रारंभ एक नया संशोधन बनाएं",
      view: 'Show',
      viewLabel: 'Show this revision',
      status: 'Status'
    },
    unrevisedRevisions: {
      help1: 'All edits by our Authors show up here. %reviewersLink% will check the quality and approve the changes.',
      reviewers: 'Reviewers',
      reviewersUrl: 'https://de.serlo.org/community/202923/rollen-der-serlo-community',
      help2: 'Everybody can preview the edits and continue editing. Inside the preview reviewers can accept the edit and also give feedback.',
      help4: 'How to review? See our %guidelineLink%.',
      guideline: 'Guideline for Reviewing',
      guidelineUrl: 'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/',
      subjectLinks: 'To Subjects',
      showMoreEntities: 'Show all in %subject%',
      showMoreRevisions: 'Show %number% more…',
      newLabelText: 'new',
      newLabelNote: 'This is a new entity',
      wipLabelText: 'wip',
      wipLabelNote: 'Marked as work in progress. Do not review yet.',
      newAuthorText: 'new author',
      newAuthorNote: 'This is one of the first edits of this author, maybe prioritise this.',
      noUnrevisedRevisions: 'No unrevised revisions, all done! 🎉',
      importedContentText: 'imported',
      importedContentNote: 'This revision includes imported content',
      importedContentIdentifier: 'Content imported from'
    },
    errors: {
      title: "😬 वेबसाइटें कभी-कभी गलतियाँ करती हैं",
      defaultMessage: "क्षमा करें, हमें इस सामग्री को लोड करने में समस्या है।",
      temporary: "च्छी खबर? समस्या अस्थायी लगती है, इसलिए कृपया बाद में पुनः प्रयास करें।",
      permanent: "हम देखेंगे कि हम उसके बारे में क्या कर सकते हैं",
      typeNotSupported: "कृपया इस पृष्ठ को पुनः लोड करने का प्रयास करें",
      refreshNow: "अब ताज़ा करें",
      backToPrevious: "पिछले पृष्ठ पर जाएँ",
      backToHome: "होमपेज पर जाएं",
      deletedComment: {
        title: 'Whoops, this is not here anymore',
        text: 'Sorry, this %type% is no longer online.%break% But it was deleted for a reason and was probably not worth your time anyway 💚'
      }
    },
    print: {
      preparingNotice: 'Preparing print!',
      warning: "महत्वपूर्ण: सभी चित्र और सूत्र प्रिंट करने के लिए, कृपया इस संवाद को खोलने से पहले पृष्ठ के अंत में नीचे स्क्रॉल करें। धन्यवाद!"
    },
    profiles: {
      aboutMe: "मेरे बारे में",
      recentActivities: "हाल की गतिविधि",
      showAllActivities: "समस्त गतिविधयाँ दिखाएँ",
      noActivities: 'No activities so far.',
      lastLogin: "अंतिम लॉगिन",
      yearsWithSerlo: 'Years with Serlo!',
      yearWithSerlo: 'Year with Serlo!',
      roles: "भूमिकाएं",
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
        edits: "संपादित",
        comments: "टिप्पणियां",
        reviews: "समीक्षाएँ",
        taxonomy: "वर्गीकरण",
        legendary: '💙 Just wow! 💙',
        untilNextLevel: '%amount% more to complete this circle 🎉'
      },
      editMotivation: 'Edit motivation',
      addMotivation: 'Add motivation',
      lockedDescriptionTitle: 'Your description currently hidden from the public.',
      lockedDescriptionText: 'After your first contributions it will become visible to everybody.'
    },
    notices: {
      welcome: "आपका स्वागत है",
      bye: "👋जल्द ही मिलते हैं!",
      alreadyLoggedIn: '👋 Welcome back',
      warningLoggedOut: '⚠️ You were logged out. Please login again and then use "Load stored edits" to restore your current changes.',
      revisionSaved: "संशोधन सहेजा गया है और जल्द ही इसकी समीक्षा की जाएगी 👍",
      revisionAccepted: "संशोधन को सफलतापूर्वक स्वीकार कर लिया गया ✅",
      revisionRejected: "संशोधन को सफलतापूर्वक अस्वीकार कर दिया गया ❎",
      revisionSavedAccepted: "संशोधन सफलतापूर्वक सहेजा गया और स्वीकार किया गया  ✅"
    },
    loading: {
      oneMomentPlease: 'One moment please…',
      isLoading: "सामग्री लोड हो रही है ...",
      unknownProblem: "क्षमा करें, सामग्री लोड करने में समस्या थी, कृपया बाद में पुनः प्रयास करें।"
    },
    auth: {
      pleaseLogInLink: 'Please log in',
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
        title: 'Change your password',
        instruction: 'Insert your new password.'
      },
      loggingOut: 'Logging you out …',
      login: {
        confirmAction: 'Confirm Action',
        signIn: 'Sign in to your Account',
        logOut: "लॉगआउट करें",
        newHere: 'Are you new here?',
        registerNewAccount: 'Register new account',
        forgotPassword: 'Did you %forgotLinkText%?',
        forgotLinkText: 'forget your password',
        validSessionDetected: 'Hey, you are already logged in in another tab. Reload the page to see it!'
      },
      fields: {
        identifier: 'Username or Email address',
        username: "उपयोगकर्ता नाम",
        password: "पासवर्ड",
        email: 'Email',
        interest: "I'm here as..."
      },
      interests: {
        pleaseChoose: 'please choose',
        parent: 'Parent',
        teacher: 'Teacher',
        pupil: 'Pupil',
        student: 'University student',
        other: 'Other'
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
        code1070003: "सहेजें",
        code1070005: "जमा करें",
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
      return: "वापसी"
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
      entityPlaceholderFallback: "सामग्री"
    },
    actions: {
      loadMore: 'Load more'
    },
    bin: {
      title: "शीर्षक",
      trashed: 'Trashed…'
    }
  }
};
export const instanceLandingData = {
  lang: "hi",
  subjectsData: landingSubjectsData,
  strings: {
    vision: "हम नॉनप्रॉफिट आर्गेनाइजेशन संगठन हैं जो व्यक्तिगत शिक्षा का समर्थन करते हैं और समान शैक्षणिक अवसरों के लिए काम करते हैं। यह सीखने का मंच दुनिया भर के लाखों छात्रों के लिए हजारों निर्देशक लेख, वीडियो के माध्यम से सीखना और अभ्यास प्रदान करता है - पूरी तरह से नि: शुल्क। अब हिंदी में हमसे जुड़ने का समय है।",
    learnMore: "और जानें",
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
  title: "सेर्लो के साथ सीखें!",
  topicTitleAffix: 'Basics & Exercises'
};
export const loggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: "सूचनाएँ",
    icon: 'notifications'
  }, {
    url: '',
    title: "उपयोगकर्ता",
    icon: 'user',
    children: [{
      url: '/user/me',
      title: 'Own profile'
    }, {
      url: '/event/history/user/me',
      title: 'My Edits'
    }, {
      url: '/subscriptions/manage',
      title: "सब्सक्रिप्शन"
    }, {
      url: '/auth/settings',
      title: "पासवर्ड परिवर्तित करें"
    }, {
      url: '/user/settings',
      title: "सेटिंग्स"
    }, {
      url: '/auth/logout',
      title: "लॉगआउट करें"
    }]
  }],
  strings: {
    tools: "अन्य टूल",
    authorMenu: {
      log: "लॉग",
      settings: "सेटिंग्स",
      moveOrCopyItems: 'Move or copy items',
      addGroupedTextExercise: "समूहीकृत-पाठ-व्यायाम",
      changeLicense: "लायसेंस परिवर्तित करें",
      subscribe: "सदस्य बनें",
      subscribeNotifications: 'Receive notifications',
      subscribeNotificationsAndMail: 'Receive notifications and emails',
      unsubscribeNotifications: "सदस्यता रद्द",
      convert: "धर्मांतरित (बीटा)",
      history: "इतिहास",
      editAssignments: "विषय और पाठ्यचर्या असाइनमेंट संपादित करें",
      moveToTrash: "रद्दी में डालें",
      confirmTrash: 'Are you sure you want to delete this content?',
      restoreContent: "कचरे से पुनर्स्थापित करें",
      sortCoursePages: 'Sort course pages',
      edit: "संपादित",
      editTax: 'Edit Title & Text',
      unrevisedEdit: 'Show unrevised revisions',
      sortEntities: "सामग्री को क्रमबद्ध करें",
      newEntity: "नई इकाई",
      editProfile: "प्रोफ़ाइल संपादित करें",
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
      mail: "ई-मेल",
      subscription: "सदस्यता",
      noMails: "निष्क्रिय करें ",
      getMails: 'activate',
      noNotifications: "रद्द करें",
      loadedSentence: 'Loaded %loadedCount% of %totalCount% entries.',
      loadMoreLink: 'Load more!'
    },
    revisions: {
      checkout: {
        action: "स्वीकार करें ",
        title: "संशोधन स्वीकारें",
        explanation: "कृपया लेखक को कुछ प्रतिक्रिया दें"
      },
      reject: {
        action: "अस्वीकार करें",
        title: "संशोधन अस्वीकारें",
        explanation: 'Please tell the author why you will not accept the submission.'
      },
      confirm: "पुष्टि करें",
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
      authorization: "प्राधिकरण",
      navigation: "नेविगेशन",
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