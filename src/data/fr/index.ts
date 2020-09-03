import { headerData, footerData } from './menu-data';
export const instanceData = {
  lang: "fr",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "La plateforme d'apprentissage libre",
      search: "Recherche",
      login: "Se connecter"
    },
    footer: {
      summaryHeading: "Serlo.org est le Wikipedia pour l'apprentissage.",
      summaryText: "Nous sommes une communauté de visionnaires qui travaille sans relâche pour offrir une éducation gratuite et accessible à tous.",
      learnMore: "En savoir plus",
      participate: "Rejoignez-nous",
      donate: "Faire un don",
      toTop: "En haut"
    },
    categories: {
      article: 'Article',
      course: "Cours",
      video: "Vidéo",
      applet: 'Applet',
      folder: "Dossier",
      exercises: "Exercices"
    },
    entities: {
      topicFolder: "Dossie d'éxercices",
      comment: "Commentaire",
      revision: "Révision",
      thread: "Fil"
    },
    share: {
      button: "Partager",
      title: "Partager",
      copyLink: "Copier le lien",
      copySuccess: "Lien copié!",
      close: "Fermer"
    },
    edit: {
      button: "Modifier"
    },
    license: {
      readMore: "Information"
    },
    course: {
      showPages: "Afficher la vue globale du cours",
      pages: "Vue globale du cours",
      next: "Suivant"
    },
    content: {
      show: "montrer",
      hide: "cacher",
      prerequisite: "Pour cet éxercice tu as besoin des connaissances de base suivantes:",
      solution: 'Solution',
      task: 'Task',
      exerciseGroup: 'Exercise group',
      right: 'Right',
      wrong: 'Wrong',
      check: 'Check',
      yourAnswer: 'Your answer…',
      chooseOption: 'Click on one of the options.'
    },
    cookie: {
      part1: "En utilisant ce site Web, vous déclarez que vous acceptez",
      part2: "et",
      part3: '.',
      link1: "notre politique de confidentialitéPrivacy Policy",
      link2: "nos conditions d'utilisation.",
      button: "Je suis d'accord"
    },
    notifications: {
      notifications: 'Notifications',
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
    errors: {
      title: '😬 Websites make mistakes sometimes…',
      defaultMessage: 'So sorry, we ran into a problem loading this content.',
      temporary: 'The good news? The problem seems to be temporary, so please try again later.',
      permanent: 'We will see what we can do about that… ',
      typeNotSupported: 'Please try reloading this page.',
      refreshNow: 'Refresh now',
      backToPrevious: 'Back to previous page',
      backToHome: 'To our home page'
    }
  }
};
export const instanceLandingData = {
  lang: "fr",
  strings: {
    vision: "Nous sommes une organisation communautaire à but non lucratif supportant l'apprentissage personnalisé et travaillant à la réalisation d'opportunités éducatives égales. Cette plateforme propose des milliers d'articles d'instruction, des vidéos pédagogiques et des exercices pratiques aux millions d'étudiant(e)s et d'élèves dans le monde entier - complètement gratuit. Maintenant, vous êtes invité de joindre l'équipe Serlo francophone.",
    learnMore: "En savoir plus",
    democraticallyStructured: "structure démocratique",
    nonProfit: "non-lucratif",
    transparent: 'transparent',
    openlyLicensed: "licence libre",
    adFree: "sans publicité",
    freeOfCharge: "gratuit",
    wikiTitle: "Serlo est le Wikipédia pour l'apprentissage",
    wikiText: "Tout comme Wikipédia, cette plateforme est créée par une communauté d'auteurs engagé(e)s. Serlo Education est gérée et détenue par des équipes décentralisées de bénévoles et de professionnels dans le monde entier.",
    movementTitle: "Rejoignez notre mouvement pour l'éducation libre",
    callForAuthors: "Nous cherchons des enseignant(e)s et des éducateur(e)s enthousiastes et passionné(e)s de leur matière. Devenez un(e) auteur sur serlo.org ! Vous pouvez créer du nouveau matériel pédagogique et nous aider à améliorer le contenu existant.",
    communityLink: "Visitez la page d'accueil d'auteurs",
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
    title: "Utilisateur",
    icon: 'user',
    children: [{
      url: '/user/public',
      title: "Profil public"
    }, {
      url: '/user/settings',
      title: "Éditer profil"
    }, {
      url: '/auth/password/change',
      title: "mettre à jour le mot de passe"
    }, {
      url: '/event/history/user/me',
      title: "Activités récentes"
    }, {
      url: '/api/auth/logout',
      title: "Se déconnecter"
    }]
  }],
  strings: {
    tools: "Autres outils",
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
      moveToTextExercise: 'Move content to other text-exercise',
      sortEntities: 'Sort content',
      newEntity: 'New Entity',
      exercise: 'Exercise',
      exerciseGroup: 'Exercise Group',
      event: 'Event'
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