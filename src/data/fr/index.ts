import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: "fr",
  headerData: headerData,
  footerData: footerData,
  secondaryMenus: secondaryMenus,
  strings: {
    header: {
      slogan: "La plateforme d'apprentissage libre",
      search: "Recherche",
      login: "Se connecter",
      skipLinks: {
        sentence: 'Skip to %content% or %footer%',
        content: 'content',
        footer: 'footer'
      }
    },
    search: {
      privacy: "La recherche est fournie par Google. Consultez notre %privacypolicy% pour savoir quelles sont les informations traitées.",
      agree: "Accepte d'utiliser la recherche"
    },
    footer: {
      summaryHeading: "Serlo.org est le Wikipedia pour l'apprentissage.",
      summaryText: "Nous sommes une communauté de visionnaires qui travaillent sans relâche pour offrir une éducation gratuite accessible à tous.",
      learnMore: "En savoir plus",
      participate: "Participer",
      donate: "Faire un don",
      toTop: "En haut"
    },
    categories: {
      articles: "articles",
      courses: "cours",
      videos: "vidéos",
      applets: 'Applets',
      folders: "Dossiers",
      exercises: "exercices",
      events: "Événements",
      unrevised: "Non révisé",
      subterms: 'Subterms',
      exercisesContent: "Contenu des exercices"
    },
    entities: {
      applet: "applet",
      article: "article",
      course: "Cours",
      coursePage: "Page du cours",
      event: "Événement",
      exercise: "Exercice",
      exerciseGroup: "Groupe d'exercices",
      topic: "Dossier",
      groupedExercise: "Exercice groupé",
      page: "page",
      solution: "solution",
      taxonomyTerm: "Terme de taxonomie",
      user: "Utilisateur·Utilisatrice",
      video: "Vidéo",
      exerciseFolder: "Dossier d'exercices",
      comment: "Commentaire",
      revision: "Révision",
      thread: 'Thread',
      threads: 'Threads',
      subject: "Sujet",
      userProfile: "Profil d'utilisateur·utilisatrice",
      privacyPolicy: "Politique de confidentialité",
      content: "Contenu"
    },
    pageTitles: {
      notifications: "Tes notifications",
      subscriptions: "Gérer les abonnements",
      revisionHistory: "Historique des révisions",
      eventLog: "Journal des événements",
      unrevisedRevisions: "Révisions non révisées",
      userEdits: 'Edits by %user%',
      userEditsMine: 'My Unrevised Revisions',
      editProfile: "Modifier le profil et les paramètres",
      recycleBin: "Corbeille",
      diagon: 'Diagon Alley',
      discussions: 'Comments',
      manageRoles: 'Manage User Roles'
    },
    roles: {
      donor: "Donneur·e",
      author: "Auteur·e",
      reviewer: "Réviseur·e"
    },
    share: {
      button: "Partager",
      title: "Partager",
      copyLink: "Copier le lien",
      copySuccess: "Lien copié!",
      close: "Fermer",
      pdf: "Télécharger comme PDF",
      pdfNoSolutions: "PDF sans solutions"
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
        psLinkText: 'here'
      }
    },
    license: {
      readMore: "Information",
      special: "Licence différente",
      nonFree: "L'utilisation de ce contenu pourrait être plus restreinte que notre autre contenu."
    },
    course: {
      showPages: "Afficher la vue globale du cours",
      pages: "Vue globale du cours",
      next: "Suivant",
      back: "Précédent",
      noPagesWarning: 'Sorry there seem to be no reviewed pages in this course yet.',
      noRevisionForPage: 'unreviewed page'
    },
    content: {
      show: "montrer",
      hide: "cacher",
      trashedNotice: "Ce contenu est marqué pour être supprimé.",
      unrevisedNotice: "Ce contenu n'a pas encore accepté de révision. Veuillez utiliser %link% pour un aperçu.",
      emptyNotice: 'There is no content here. Please edit or delete.',
      picture: "Image",
      previewImage: "Aperçu de l'image",
      imageAltFallback: 'Image',
      exercisesTitle: "Exercices",
      moreExercises: "Tu peux trouver plus d'exercices dans le dossier suivant :",
      relatedContentTitle: "Tu en veux encore plus?",
      relatedContentText: "Tu peux en trouver plus ici :",
      sourcesTitle: 'Sources',
      exercises: {
        prerequisite: "Pour cet éxercice tu as besoin des connaissances de base suivantes:",
        task: "Tâche",
        correct: "Correcte",
        missedSome: "Presque ! Tu as manqué au moins une réponse correcte.",
        wrong: "Incorrect",
        feedback: "Ton avis",
        answer: "Répondre",
        check: "Vérifier",
        yourAnswer: "Ta réponse...",
        chooseOption: "Sélectionne une des options :",
        printModeChooseOption: "Sélectionne une des options :",
        strategy: "Stratégie de solution",
        showSolution: 'Show solution',
        hideSolution: 'Hide solution'
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
        proof: 'Proof'
      }
    },
    consent: {
      title: "Consentement pour le contenu externe",
      intro: "Lors de l'utilisation de ce site, il se peut que tu nous autorises à charger du contenu provenant de fournisseurs externes. Tu peux lire les détails dans la %privacypolicy%.",
      revokeTitle: "Révoquer",
      revokeText: "Ici, tu peux révoquer ton consentement. Dans ce cas, nous te demandons à nouveau, avant de charger le contenu de ces fournisseurs.",
      noConsent: "Aucun contenu sauvegarder",
      revokeConsent: "Révoquer le consentement"
    },
    embed: {
      text: "En cliquant sur l'image ou le bouton au dessus, tu acceptes que le contenu externe de %provider% soit chargé. Des données personnelles peuvent également être transférées vers ce service conformément à notre %privacypolicy%.",
      video: "Jouer la vidéo de %provider%",
      applet: "Charger l'Applet de %provider%",
      twingle: "Charger le formulaire de don"
    },
    comments: {
      question: "As-tu une question?",
      commentsOne: "Commentaire",
      commentsMany: "Commentaires",
      submit: "Soumettre",
      archiveThread: "Archiver le thread",
      restoreThread: "Rétablir le fil de discussion",
      deleteThread: "Supprimer le thread",
      deleteComment: "Supprimer le commentaire",
      postedOn: "Publié le",
      placeholder: "Ta question ou suggestion...",
      placeholderReply: "Ta réponse...",
      loading: "Les commentaires sont chargés...",
      error: "Désolé, les commentaires n'ont pas pu être chargés, veuille réessayer plus tard",
      showMoreReply: "Afficher un commentaire de plus",
      showMoreReplies: "Afficher %number% commentaires supplémentaires",
      hideReplies: 'Hide',
      showArchived: "Afficher les %threads% affichés",
      copyLink: "Copier le lien du commentaire",
      commentsOverviewExplanation: 'Here you can see all comments that were written to content on %instance%.serlo.org. %break% Answer questions or find content you could improve. %break% The link above the comment brings you to the relevant entity.',
      edit: 'Edit comment',
      cancelEdit: 'Cancel',
      saveEdit: 'Save'
    },
    revisions: {
      toOverview: "Retour à la vue d'ensemble",
      toContent: "Aller au contenu",
      changes: "Modifications",
      context: "Dans le context (version actuelle)",
      title: "Titre",
      content: "Contenu",
      metaTitle: "Titre-méta",
      metaDescription: "Description-méta",
      diff: "Voir le code source",
      sidebyside: "Comparaison",
      currentVersion: "Version actuelle",
      thisVersion: "Cette version",
      currentNotice: "Ceci est la version actuellement acceptée.",
      rejectedNotice: "Cette révision n'a pas été acceptée.",
      noCurrentNotice: "Il n'existe pas encore une révision acceptée.",
      unknownNotice: "Cette révision a été actuelle auparavant ou n'a jamais été révisée.",
      by: "De",
      parentFallbackLink: "Au contenu parent",
      hasChanges: "Il y a eu des changements de ce contenu",
      positionForGrouped: "Ce %exercise_or_solution% fait partie de %title%.",
      helpLink: "Aide pour les réviseurs"
    },
    revisionHistory: {
      changes: "Modifications",
      author: "Auteur·e",
      date: 'Date',
      edit: "Modifier",
      editLabel: "Créer une nouvelle révision à partir de cette révision",
      view: "Afficher",
      viewLabel: "Afficher cette révision",
      status: "Statut"
    },
    unrevisedRevisions: {
      help1: 'All edits by our Authors show up here. %reviewersLink% will check the quality and approve the changes.',
      reviewers: 'Reviewers',
      reviewersUrl: 'https://de.serlo.org/community/202923/rollen-der-serlo-community',
      help2: 'Everybody can preview the edits and continue editing. Inside the preview reviewers can accept the edit and also give feedback.',
      help3: 'You want to be a reviewer? Get in contact with: %contactLink%.',
      contactPerson: 'LinaMaria',
      contactPersonUrl: 'https://community.serlo.org/direct/LinaMaria',
      help4: 'How to review? See our %guidelineLink%.',
      guideline: 'Guideline for Reviewing',
      guidelineUrl: 'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/',
      subjectLinks: 'To Subjects',
      showMoreEntities: "Tout afficher dans %subject%",
      showMoreRevisions: "Afficher %number% plus…",
      newLabelText: "Nouveau",
      newLabelNote: "Ce contenu est nouveau",
      wipLabelText: "essuyer",
      wipLabelNote: "Travail en cours. Ne pas encore réviser.",
      newAuthorText: "nouvel auteur",
      newAuthorNote: "C'est l'une des premières modifications de cet auteur. Peut-être, donne-lui la priorité.",
      noUnrevisedRevisions: 'No unrevised revisions, all done! 🎉',
      importedContentText: 'imported',
      importedContentNote: 'This revision includes imported content',
      importedContentIdentifier: 'Content imported from'
    },
    errors: {
      title: "😬 Les sites Web font parfois des erreurs…",
      defaultMessage: "Désolé, nous avons rencontré un problème lors du chargement de ce contenu.",
      temporary: "Les bonnes nouvelles ? Le problème semble être temporaire, veuille réessayer plus tard.",
      permanent: "Nous verrons ce que nous pouvons faire à cet égard… ",
      typeNotSupported: "Veuille essayer de recharger cette page.",
      refreshNow: "Actualiser maintenant",
      backToPrevious: "Retour à la page précédente",
      backToHome: "Aller à notre page d'accueil",
      deletedComment: {
        title: 'Whoops, this is not here anymore',
        text: 'Sorry, this %type% is no longer online.%break% But it was deleted for a reason and was probably not worth your time anyway 💚'
      }
    },
    print: {
      preparingNotice: "Préparation de l'impression !",
      warning: "IMPORTANT : Pour t'assurer que toutes les images et formules sont imprimées, fais défiler la page une fois vers le bas AVANT d'ouvrir ce dialogue. Merci!"
    },
    profiles: {
      aboutMe: "À propos de moi",
      recentActivities: "Activités récentes",
      showAllActivities: "Afficher toutes les activités",
      noActivities: 'No activities so far.',
      lastLogin: "Dernière connexion",
      yearsWithSerlo: "années chez Serlo!",
      yearWithSerlo: "année chez Serlo!",
      roles: "Rôles",
      instanceRoles: "Rôles sur %lang%.serlo.org :",
      otherRoles: "Autres rôles :",
      directMessage: "Message direct ",
      goToChat: "Aller au chat",
      registerChat: "S'inscrire au chat",
      inviteToChat: "Inviter au chat",
      inviteModal: {
        part1: "%username% n'est pas encore actif dans notre chat de la communauté à %chatLink%.",
        part2: 'You can invite %username% to the chat to send direct messages.',
        messagePlaceholder: 'Optional: Personal message',
        button: "Envoyer une invitation",
        success: '✨ Successfully invited!'
      },
      activityGraph: {
        edits: "Modifications",
        comments: "Commentaires",
        reviews: "Révisions",
        taxonomy: "Taxonomie",
        legendary: "💙 Wow! 💙",
        untilNextLevel: "%amount% de plus pour compléter ce cercle 🎉"
      },
      editMotivation: 'Edit motivation',
      addMotivation: 'Add motivation',
      lockedDescriptionTitle: 'Your description currently hidden from the public.',
      lockedDescriptionText: 'After your first contributions it will become visible to everybody.'
    },
    notices: {
      welcome: "👋 Bienvenue %username%!",
      bye: "👋 À bientôt !",
      alreadyLoggedIn: '👋 Welcome back',
      warningLoggedOut: '⚠️ You were logged out. Please login again and then use "Load stored edits" to restore your current changes.',
      revisionSaved: "La révision est enregistrée et sera bientôt révisée 👍",
      revisionAccepted: "La révision a été acceptée avec succès ✅",
      revisionRejected: "La révision a été rejetée avec succès ❎",
      revisionSavedAccepted: "La révision a été enregistrée avec succès et acceptée ✅"
    },
    loading: {
      oneMomentPlease: "Un instant SVP...",
      isLoading: "Chargement de contenu en cours…",
      unknownProblem: "Désolé,une erreure s'est produite lors du chargement du contenu, veuille réessayer plus tard."
    },
    auth: {
      pleaseLogInLink: 'Please log in',
      pleaseLogInText: 'to use this feature.',
      register: {
        registerTitle: 'Register your Serlo Account',
        passwordRequirements: 'At least 8 characters, longer is better.',
        registerIntro: 'You do not need an account for studying on serlo.org. %break% If you want to comment, or work on content you came to the right place'
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
        logOut: 'Log out',
        newHere: 'Are you new here?',
        registerNewAccount: 'Register new account',
        forgotPassword: 'Did you %forgotLinkText%?',
        forgotLinkText: 'forget your password',
        validSessionDetected: 'Hey, you are already logged in in another tab. Reload the page to see it!'
      },
      fields: {
        identifier: 'Username or Email address',
        username: 'Username',
        password: 'Password',
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
        code1010002: 'Sign in with NBP Account',
        code1010013: 'Continue with SSO',
        code1040001: 'Register',
        code1040002: 'Register with NBP Account',
        code1040003: 'Continue',
        code1050001: 'Your changes have been saved! 🎉',
        code1060001: 'You successfully recovered your account. Please change your password in the next minutes.',
        code1060002: 'An email containing a recovery link has been sent to the email address you provided. %break% Check your mailbox and click on the provided link it contains.',
        code1070003: 'Save',
        code1070005: 'Submit',
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
      usernameTooLong: 'Sorry, this username is too long, make sure it\'s 32 characters or less',
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
      return: "touche Entrée"
    },
    eventLog: {
      currentEvents: "Évenements actuels",
      oldestEvents: "%amount% événements les plus anciens",
      globalDescription: "Tous les événements qui se produisent quelque part sur %lang%.serlo.org"
    },
    events: {
      entityInParentPreposition: 'in',
      commentInParentPreposition: 'on',
      setThreadStateArchived: "%actor% a archivé %thread%.",
      setThreadStateUnarchived: "%actor% a restauré %thread%.",
      createComment: "%actor% a commenté dans %thread%: %comment%.",
      createThread: "%actor% a commencé %thread% dans %object%.",
      createEntity: "%actor% a créé %object%.",
      setLicense: "%actor% a modifié la licence de %repository%.",
      createEntityLink: "%actor% a associé %child% à %parent%.",
      removeEntityLink: "%actor% a dissocié %child% de %parent%.",
      createEntityRevision: '%actor% created %revision% of %entity%.',
      checkoutRevision: '%actor% checked out %revision% in %repository%.',
      rejectRevision: '%actor% did not accept %revision% in %repository%.',
      createTaxonomyLink: "%actor% a ajouté %child% à %parent%.",
      removeTaxonomyLink: "%actor% a retiré %child% de %parent%.",
      createTaxonomyTerm: "%actor% a créé %term%.",
      setTaxonomyTerm: "%actor% a mis à jour %term%.",
      setTaxonomyParentDeleted: "%actor% a supprimé le parent de %child%.",
      setTaxonomyParentChangedFrom: "%actor% a changé le parent de %child% de %previousparent% à %parent%.",
      setTaxonomyParentChanged: "%actor% a changé le parent de %child% à %parent%.",
      setUuidStateTrashed: "%actor% a mis %object% dans la corbeille.",
      setUuidStateRestored: "%actor% a restauré %object%.",
      inviteToChat: '%actor% invited you to the Chat: %comment% Go to %chatLink% to chat with %actor% and others.',
      entityPlaceholderFallback: "Contenu"
    },
    actions: {
      loadMore: "Charger plus"
    },
    bin: {
      title: 'Title',
      trashed: 'Trashed…'
    }
  }
};
export const instanceLandingData = {
  lang: "fr",
  subjectsData: landingSubjectsData,
  strings: {
    vision: "Notre vision est de permettre un apprentissage personnalisé et de fournir des ressources éducatives de haute qualité dans le monde entier - complètement gratuit. Serlo est une organisation de base inspirée par Wikipédia. Nous fournissons déjà des milliers d'articles, de vidéos et d'exercices résolus à cinq millions d'étudiants allemands chaque année.\nIl est maintenant temps de passer à l'international.",
    learnMore: "En savoir plus",
    democraticallyStructured: "structure démocratique",
    nonProfit: "non-lucratif",
    transparent: 'transparent',
    openlyLicensed: "licence libre",
    adFree: "sans publicité",
    freeOfCharge: "gratuit",
    wikiTitle: "Serlo est le Wikipédia pour l'apprentissage",
    wikiText: "Tout comme Wikipédia, cette plateforme est créée par une communauté d'auteur·e·s engagé·e·s. Serlo Education est gérée et détenue par des équipes décentralisées de bénévoles et de professionnel·le·s dans le monde entier.",
    movementTitle: "Rejoignez notre mouvement pour l'éducation libre",
    callForAuthors: "Nous cherchons des enseignant·e·s et des éducateur·e·s enthousiastes et passionné·e·s de leur matière. Devenez un·e auteur·e sur serlo.org, créez de nouveaux contenus et aidez-nous à assurer la qualité de la plateforme d'apprentissage.",
    communityLink: "Visitez la page d'accueil d'auteur·e·s",
    callForOther: "Nous offrons une variété d'emplois et de possibilités de bénévolat dans les domaines du développement de logiciel, de la conception, la traduction, la communication, la gestion de projet et d'autres.",
    getInvolved: "Participe!"
  }
};
export const serverSideStrings = {
  title: "Apprendre avec Serlo!"
};
export const loggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: 'Notifications',
    icon: 'notifications'
  }, {
    url: '',
    title: "Utilisateur·Utilisatrice",
    icon: 'user',
    children: [{
      url: '/user/me',
      title: "Mon profil"
    }, {
      url: '/event/history/user/me',
      title: "Mes modifications"
    }, {
      url: '/subscriptions/manage',
      title: "Abonnements"
    }, {
      url: '/auth/settings',
      title: "Changer le mot de passe"
    }, {
      url: '/user/settings',
      title: "Réglages"
    }, {
      url: '/auth/logout',
      title: "Se déconnecter"
    }]
  }],
  strings: {
    tools: "Autres outils",
    authorMenu: {
      log: "Historique",
      settings: "Réglages",
      moveCoursePage: "Déplacer cette page vers un autre cours",
      thisCoursePage: "Cette page de cours",
      addCoursePage: "Ajouter une page de cours",
      wholeCourse: "Tout le cours",
      copyItems: "Copier des éléments",
      moveItems: "Déplacer des éléments",
      addGroupedTextExercise: "Ajouter un exercice de texte groupé",
      changeLicense: "Modifier la licence",
      subscribe: "S'abonner",
      subscribeNotifications: "Recevoir des notifications",
      subscribeNotificationsAndMail: "Recevoir des notifications et des courriels",
      unsubscribeNotifications: "Désabonner",
      convert: "Convertir (beta)",
      history: "Histoire",
      editAssignments: "Modifier le sujet et le programme d'études",
      moveToTrash: "Déplacer dans la corbeille",
      confirmTrash: 'Are you sure you want to delete this content?',
      restoreContent: "Restaurer à partir de la corbeille",
      sortCoursePages: "Trier les pages du cours",
      sortGroupedExercises: "Trier les exercices groupés",
      edit: "Modifier",
      editTax: 'Edit Title & Text',
      unrevisedEdit: "Afficher les révisions non révisées",
      sortEntities: "Trier le contenu",
      newEntity: "Nouveau contenu",
      editProfile: "Modifier profil",
      directLink: "Lien direct vers ce contenu",
      analyticsLink: 'See analytics data'
    },
    notifications: {
      hide: 'Deactivate new notifications for this content.',
      setToRead: "Définir la notification comme lu.",
      setAllToRead: "Définir tous les visibles comme lus.",
      showNew: "Nouveau",
      showRead: "Lu"
    },
    subscriptions: {
      mail: 'E-mails',
      subscription: "Abonnement",
      noMails: "désactiver",
      getMails: "activer",
      noNotifications: "annuler",
      loadedSentence: 'Loaded %loadedCount% of %totalCount% entries.',
      loadMoreLink: "Charger plus!"
    },
    revisions: {
      checkout: {
        action: "Accepter",
        title: "Accepter la révision",
        explanation: "Veuille donner un commentaire à l'auteur."
      },
      reject: {
        action: "Rejeter",
        title: "Rejeter la révision",
        explanation: "Veuille indiquer à l'auteur pourquoi tu n'acceptes pas la soumission."
      },
      confirm: "Confirmer",
      unrevisedTaxNote: "Nouveau contenu, pas encore accepté"
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
      edtrIo: {
        localStorage: {
          found: 'You have locally saved edits of this revision. Do you want to load them?',
          foundButton: 'Load stored edits',
          restoreInitial: 'Want to start fresh? Beware that this will delete your current edits!',
          restoreInitialButton: 'Delete changes',
          confirmRestore: 'Are you sure you want to delete all your changes?'
        },
        extendedSettings: "Paramètres avancés",
        close: "Fermer",
        notSupportedYet: "Ce type de contenu n'est pas encore pris en charge par le nouvel éditeur.",
        editInOld: 'You can edit the content in the old editor',
        conversionError: "Une erreur s'est produite lors de la conversion.",
        notConverted: "Cette entité n'a pas encore été convertie pour le nouvel éditeur.",
        box: 'Container',
        boxDesc: 'A container for examples, quotes, warnings, theorems, notes…',
        text: "Texte",
        textDesc: "Créer contenu en utilisant du texte riche (RTF) et des formules mathématiques.",
        blockquoteTitle: "Citation",
        quoteDescription: "Créer un texte indenté pour les citations.",
        geogebraTitle: "Applet GéoGebra",
        geogebraDesc: "Intégrer une applet GeoGebra par URL ou ID.",
        highlightTitle: "Code source",
        highlightDesc: "Surligner la syntaxe d'un code source.",
        anchor: "Ancre",
        anchorDesc: "Insérer une ancre.",
        image: 'Image',
        imageDesc: "Télécharger des images.",
        importantTitle: "Déclaration importante",
        importantDesc: "Une boîte pour souligner les déclarations importantes.",
        injectionTitle: "Contenu de serlo.org",
        injectionDesc: "Intégrer contenu de serlo.org en utilisant l'ID.",
        multimediaTitle: "Contenu multimédia avec un texte",
        multimediaDesc: "Ajouter du contenu multimédia illustrant ou explicatif associé a un texte.",
        spoiler: 'Spoiler',
        spoilerDesc: "Une boîte réductible.",
        serloTable: 'Table',
        serloTableDesc: 'Create pretty tables',
        table: "Tableau",
        tableDesc: "Créer un tableau avec Markdown.",
        video: "Vidéo",
        videoDesc: "Intégrer YouTube, Vimeo, Wikimedia Commons ou les vidéos BR.",
        solutionSeparator: "Séparateur de solution",
        solutionSeparatorDesc: "Divisez la solution en différentes étapes.",
        save: "Sauvegarder",
        saveWithReview: 'Save and get review',
        cancel: "Annuler",
        saving: "Sauvegarde…",
        missingChanges: "Tu dois remplir les modifications que tu as apportées",
        missingLicenseTerms: "Tu dois accepter les conditions de licence",
        missingChangesAndLicenseTerms: "Tu dois remplir les modifications que tu as apportées et accepter les conditions de licence",
        errorSaving: "Une erreur s'est produite au cours de la sauvegarde!",
        saveLocallyAndRefresh: "Tu peux sauvegarder la révision localement, actualiser la page et essayer de sauvegarder à nouveau.",
        revisionSaved: "Révision sauvegardée",
        saveRevision: "Sauvegarder la révision",
        changes: 'Describe your changes to the content',
        skipReview: "Passer la révision (non recommandé)",
        enableNotifs: "Activer les notifications par serlo.org",
        enableNotifsMail: "Activer les notifications par e-mail",
        switchRevision: "Changer à une autre révision",
        importOther: 'Import content from other entity',
        importOtherExplanation: 'Just paste the url or id of another serlo.org entity of the same type here to duplicate it\'s content here. Do NOT use this to make exact copies or move content. Exercise Groups and Courses are not supported (but Exercises and Course Pages).',
        importOtherWarning: 'Warning: This overwrites everything that is already present in this editor!',
        importOtherButton: 'Import content',
        current: "Actuel",
        author: "Auteur",
        createdAt: "Créé le",
        settings: "Paramètres",
        equationsTitle: 'Terms and equations',
        equationsDesc: 'Write term manipulations and solve multiline equations.',
        ready: 'Ready to save?'
      },
      anchor: {
        identifier: "identifiant",
        anchorId: "ID de l'ancre"
      },
      geogebra: {
        urlOrId: "URL ou ID de GeoGebra"
      },
      highlight: {
        clickAndEnter: "Clique ici pour entrer du code source…",
        enterHere: "Saisie du code source",
        language: "Langue",
        enterLanguage: "Saisir la langue",
        showLineNumbers: "Afficher les numéros de ligne"
      },
      inputExercise: {
        text: "Texte",
        chooseType: "Choisissez le type d'exercice",
        unit: "Unité",
        addAnswer: "Ajouter une réponse",
        enterTheValue: "Saisir la réponse",
        yourSolution: "Ta solution",
        number: "Number (exact solution, e.g. \"0,5\" ≠ \"1/2\" ≠ \"2/4\")",
        mathematicalExpressionSolution: "Mathematical expression (equivalent solution, e.g. '0,5' = '1/2' = '2/4')"
      },
      multimedia: {
        image: 'Image',
        video: "Vidéo",
        geogebraTitle: "Applet GéoGebra",
        changeType: "Changer le type de multimédia",
        howImportant: "Quelle est l’importance du contenu multimédia ?",
        isIllustrating: "Ce n'est qu'une illustration",
        isEssential: "C'est essentiel"
      },
      rows: {
        searchForTools: "Rechercher des outils…",
        duplicate: "Dupliquer",
        remove: "Supprimer",
        close: "Fermer",
        dragElement: "Faire glisser l'élément dans le document",
        addAnElement: "Ajouter un élément"
      },
      scMcExercise: {
        singleChoice: "Choix unique",
        multipleChoice: "Choix multiple",
        chooseType: "Choisir le type d'exercice",
        addAnswer: "Ajouter une réponse"
      },
      serloTable: {
        mode: 'Mode',
        columnHeaders: 'Only column headers',
        rowHeaders: 'Only row headers',
        columnAndRowHeaders: 'Column and row headers',
        convertToText: 'Convert to text',
        convertToImage: 'Convert to image',
        row: 'row',
        column: 'column',
        addType: 'Add %type%',
        addTypeBefore: 'Add %type% before',
        deleteType: 'Delete %type%',
        confirmDelete: 'Are you sure you want to delete this %type% and the content in it?'
      },
      spoiler: {
        enterATitle: "Saisir un titre"
      },
      text: {
        quote: "Citation",
        setColor: "Définir la couleur",
        resetColor: "Réinitialiser la couleur",
        colors: "Couleurs",
        closeSubMenu: "Fermer le sous-menu",
        heading: "Titre",
        headings: "Titres",
        link: "Lien (%ctrlOrCmd% + K)",
        enterUrl: "Saisir l'URL",
        openInNewTab: "Ouvrir dans un nouvel onglet",
        orderedList: "Liste ordonnée",
        unorderedList: "Liste non ordonnée",
        lists: "Listes",
        mathFormula: "Formule mathématique (%ctrlOrCmd% + M)",
        code: 'Code (%ctrlOrCmd% + ⇧ + `)',
        displayAsBlock: "Afficher comme un bloc",
        formula: '[formula]',
        visual: "visuel",
        laTeX: 'LaTeX',
        onlyLaTeX: "Seulement l'éditeur LaTeX est disponible",
        shortcuts: "Raccourcis",
        fraction: 'Fraction',
        superscript: "Exposant",
        or: "ou",
        subscript: "Indice",
        root: "Racine",
        mathSymbols: "Symboles mathématiques",
        eG: "par ex.",
        functions: "Fonctions",
        bold: "Gras (%ctrlOrCmd% + B)",
        italic: "Italique (%ctrlOrCmd% + I)",
        noItemsFound: "Aucun élément trouvé"
      },
      image: {
        noImagePasteInLists: 'Pasting images inside of lists is not allowed.'
      },
      video: {
        videoUrl: "URL de la vidéo",
        description: 'Description',
        title: "Titre",
        url: 'URL',
        seoTitle: "Titre pour les moteurs de recherche",
        noVideoPasteInLists: 'Pasting videos inside of lists is not allowed.'
      },
      error: {
        convertionError: "Cette partie du document n'a pas pu être convertie."
      },
      exercise: {
        addChoiceExercise: "Ajouter un exercice de choix",
        choiceExercise: "Exercice de choix",
        addInputExercise: "Ajouter un exercice de saisie",
        inputExercise: "Exercice de saisie",
        addH5pExercise: 'Add h5p exercise',
        h5pExercise: 'H5p exercise',
        addOptionalInteractiveEx: "Ajouter un exercice interactif optionnel :",
        changeInteractive: 'Change interactive element',
        removeInteractive: 'Remove interactive element'
      },
      injection: {
        illegalInjectionFound: "Injection illégale trouvée",
        serloEntitySrc: "Entité Serlo {{src}}",
        serloId: 'Serlo ID:',
        placeholder: 'Serlo ID (e.g. 1565)'
      },
      box: {
        type: 'Type of box',
        titlePlaceholder: '(optional title)',
        anchorId: 'Anchor ID',
        emptyContentWarning: 'Boxes without content will not be displayed'
      },
      layout: {
        toDragConvert: "Pour rendre le contenu glissable, converte-le pour le nouvel éditeur :",
        oneColumnLayout: "Mise en page en une colonne",
        multimediaTitle: "Contenu multimédia avec un texte"
      },
      pageLayoutColums: {
        chooseRatio: 'Choose column ratio'
      },
      solution: {
        optionalExplanation: "Explication de la stratégie de solution (facultatif)",
        fundamentalsNote: "Pour cet exercice, vous avez besoin des fondamentaux suivants :",
        idArticle: "ID d'un article, par exemple 1855",
        openArticleTab: "Ouvrir l'article dans un nouvel onglet :",
        linkTitle: "Titre du lien",
        showSolution: "Afficher la solution",
        hideSolution: "Masquer la solution"
      },
      applet: {
        seoTitle: "Titre pour les moteurs de recherche",
        seoDesc: "Description pour les moteurs de recherche",
        title: "Titre"
      },
      article: {
        seoTitle: "Titre pour les moteurs de recherche",
        seoDesc: "Description pour les moteurs de recherche",
        title: "Titre",
        writeShortIntro: "Écrire une courte introduction",
        stillWantMore: "Tu en veux encore plus?",
        moreOnTopic: "Tu peux en trouver plus ici :",
        addSource: "Ajouter une source",
        removeLabel: 'Remove',
        dragLabel: 'Drag to change order',
        openInTab: 'Open in new tab',
        sources: 'Sources',
        sourceText: 'Source Text',
        sourceUrl: 'Optional URL',
        moreInFolder: "Tu peux trouver plus d'exercices dans le dossier suivant :",
        addModal: {
          introText: 'After reading the article, what would help out learners next? %break% Here you can add some %exercises% or link to a single %exerciseFolder%. %break% Or you can suggest %articles%, %courses% or %videos% to follow up with.',
          introText2: 'You can either paste an Serlo ID, an URL or choose content from the parent folder below.',
          buttonEx: 'Add exercises',
          buttonExFolder: 'Select exercise folder',
          buttonContent: 'Add content',
          buttonAddType: 'Add %type%',
          title: 'Add related Content or Exercises',
          invalidInput: 'Invalid id or url',
          fetchError: 'Something went wrong, please try later',
          loading: 'Loading…',
          notFound: 'Could not find that content',
          unsupportedType: 'Sorry, type [%type%] is not supported here',
          unsupportedId: 'Sorry, this ID is not supported here',
          addFromFolderTitle: 'From the folder',
          placeholder: 'Paste Serlo ID or URL here',
          exerciseFolderNote: 'Only one can be selected here'
        }
      },
      coursePage: {
        explanation: "Explication",
        video: "Vidéo",
        question: 'Question',
        title: "Titre"
      },
      course: {
        seoDesc: "Description pour les moteurs de recherche",
        title: "Titre",
        removeCoursePage: "Supprimer la page de cours",
        addCoursePage: "Ajouter une page de cours"
      },
      event: {
        seoTitle: "Titre des moteurs de recherche",
        seoDesc: "Description pour les moteurs de recherche",
        title: "Titre"
      },
      page: {
        title: "Titre"
      },
      taxonomy: {
        title: "Titre"
      },
      textExerciseGroup: {
        removeExercise: "Supprimer l'exercice",
        addExercise: "Ajouter un exercice",
        kindOfExerciseGroup: "Type de groupe d'exercice",
        notCohesive: "pas cohérent",
        cohesive: "cohérent"
      },
      textExercise: {
        removeSolution: "Supprimer la solution",
        createSolution: "Créer une solution"
      },
      equations: {
        leftHandSide: "côté gauche",
        transformation: "Transformation",
        mode: 'Mode',
        transformationExample: 'e.g. -3x',
        transformationOfEquations: 'Transformation of equations',
        transformationOfTerms: 'Transformation of terms',
        addNewRow: 'Add new row',
        explanation: 'Explanation',
        term: 'Term',
        rightHandSide: 'right-hand side',
        combineLikeTerms: 'Combine like terms.',
        setEqual: 'Set the terms equal to each other.',
        firstExplanation: 'First explanation',
        addNew: 'Add new equation'
      },
      deprecated: {
        unsupported: "Cette partie du document contient des fonctionnalités qui ne sont plus supportées."
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
      authorization: 'Authorization',
      navigation: 'Navigation',
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