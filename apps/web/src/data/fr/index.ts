import { licenses } from './license-data-short';
import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: "fr",
  headerData,
  footerData,
  secondaryMenus,
  licenses,
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
      exercises: "Exercices",
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
      discussions: "Commentaires",
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
      copySuccess: 'Link copied!',
      copyFailed: 'Error copying link!',
      close: "Fermer",
      pdf: "Télécharger comme PDF",
      pdfNoSolutions: "PDF sans solutions"
    },
    modal: {
      leaveNow: 'Leave now',
      noStay: 'No, I want to stay'
    },
    editOrAdd: {
      button: "Modifier",
      addNewEntities: 'Add new content',
      addNewExercises: 'Add new exercises',
      editExercises: 'Edit exercises',
      unrevised: "Afficher les révisions non révisées",
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
      nonFree: "L'utilisation de ce contenu pourrait être plus restreinte que notre autre contenu.",
      appliesTo: 'Applies to'
    },
    content: {
      show: "montrer",
      hide: "cacher",
      trashedNotice: "Ce contenu est marqué pour être supprimé.",
      unrevisedNotice: "Ce contenu n'a pas encore accepté de révision. Veuillez utiliser %link% pour un aperçu.",
      emptyNotice: 'There is no content here. Please edit or delete.',
      picture: "Image",
      previewImage: "Aperçu de l'image",
      task: "Tâche"
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
      twingle: "Charger le formulaire de don",
      audio: 'Play audio from %provider%',
      general: "Activer"
    },
    comments: {
      question: "As-tu une question?",
      questionLink: 'Write it here',
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
      cancelEdit: "Annuler",
      saveEdit: "Sauvegarder"
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
      positionForGrouped: 'This %exercise% is part of %title%.',
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
        logOut: "Se déconnecter",
        newHere: 'Are you new here?',
        registerNewAccount: 'Register new account',
        forgotPassword: 'Did you %forgotLinkText%?',
        forgotLinkText: 'forget your password',
        validSessionDetected: 'Hey, you are already logged in in another tab. Reload the page to see it!'
      },
      fields: {
        identifier: 'Username or Email address',
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        email: 'Email',
        interest: "I'm here as..."
      },
      interests: {
        pleaseChoose: 'please choose',
        parent: 'Parent',
        teacher: "Enseignant",
        pupil: "Élève",
        student: "Étudiant universitaire",
        other: "Autres"
      },
      messages: {
        code1010003: 'Please confirm this action by verifying that it is you.',
        code1010001: 'Sign in',
        code1010002: 'Sign in via „Mein Bildungsraum“',
        code1010013: 'Continue with SSO',
        code1010022: "Se connecter",
        // Login with password
        code1040001: 'Register',
        code1040002: 'Register via „Mein Bildungsraum“',
        code1040003: 'Continue',
        code1050001: 'Your changes have been saved! 🎉',
        code1060001: 'You successfully recovered your account. Please change your password in the next minutes.',
        code1060002: 'An email containing a recovery link has been sent to the email address you provided. %break% Check your mailbox and click on the provided link it contains.',
        code1070003: "Sauvegarder",
        code1070005: "Soumettre",
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
      title: "Titre",
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
  title: "Apprendre avec Serlo!",
  topicTitleAffix: 'Basics & Exercises'
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
      moveOrCopyItems: 'Move or copy items',
      addGroupedTextExercise: "Ajouter un exercice de texte groupé",
      changeLicense: "Modifier la licence",
      subscribe: "S'abonner",
      subscribeNotifications: 'Receive notifications',
      subscribeNotificationsAndMail: 'Receive notifications and emails',
      unsubscribeNotifications: "Désabonner",
      convert: "Convertir (beta)",
      history: "Histoire",
      editAssignments: "Modifier le sujet et le programme d'études",
      moveToTrash: "Déplacer dans la corbeille",
      confirmTrash: 'Are you sure you want to delete this content?',
      restoreContent: "Restaurer à partir de la corbeille",
      sortCoursePages: "Trier les pages du cours",
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
      authorization: "Autorisation",
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