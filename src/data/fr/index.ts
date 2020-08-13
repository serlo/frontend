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
      exerciseGroup: "Groupe d'exercices",
      right: "Correct",
      wrong: "Incorrect",
      check: "Vérifier",
      yourAnswer: "Votre réponse...",
      chooseOption: "Sélectionnez une des options :"
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
      pleaseLogInLink: 'Bitte melde dich an',
      pleaseLogInText: 'um deine Benachrichtigungen zu sehen.'
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
    notifications: {
      loadMore: 'Weitere laden',
      unknownProblem: 'Es gibt ein Problem beim laden der Benachrichtigungen, bitte versuche es später noch einmal.',
      loading: 'Benachrichtigungen werden geladen',
      hide: 'Benachrichtigungen für diesen Inhalt nicht mehr anzeigen.',
      setThreadStateArchived: '%actor% hat einen %thread% archiviert.',
      setThreadStateUnarchived: '%actor% hat einen %thread% unarchiviert.',
      createComment: '%actor% hat einen %comment% in einem %thread% erstellt.',
      createThread: '%actor% hat einen %thread% in einem %object% erstellt.',
      createEntity: '%actor% hat %object% erstellt.',
      setLicense: '%actor% hat die Lizenz von %repository% geändert.',
      createEntityLink: '%actor% hat %child% mit %parent% verknüpft.',
      removeEntityLink: '%actor% hat die Verknüpfung von %child% mit %parent% entfernt.',
      createEntityRevision: '%actor% hat eine %revision% von %entity% erstellt.',
      checkoutRevision: '%actor% hat eine %revision% von %repository% übernommen.',
      rejectRevision: '%actor% hat %revision% für %repository% abgelehnt.',
      createTaxonomyLink: '%actor% hat %child% in %parent% eingeordnet.',
      removeTaxonomyLink: '%actor% hat %child% aus %parent% entfernt.',
      createTaxonomyTerm: '%actor% hat den %term% erstellt.',
      setTaxonomyTerm: '%actor% hat den %term% geändert.',
      setTaxonomyParentDeleted: '%actor% hat den Elternknoten von %child% entfernt.',
      setTaxonomyParentChangedFrom: '%actor% hat den Elternknoten von %child% von %previousparent% auf %parent% geändert.',
      setTaxonomyParentChanged: '%actor% hat den Elternknoten von %child% auf %parent% geändert.',
      setUuidStateTrashed: '%actor% hat %object% in den Papierkorb verschoben.',
      setUuidStateRestored: '%actor% hat %object% aus dem Papierkorb wieder hergestellt.',
      entityPlaceholderPage: 'Seite',
      entityPlaceholderArticle: 'Artikel',
      entityPlaceholderVideo: 'Video',
      entityPlaceholderApplet: 'Applet',
      entityPlaceholderCoursePage: 'Kursseite',
      entityPlaceholderExercise: 'Aufgabe',
      entityPlaceholderGroupedExercise: 'gruppierte Aufgabe',
      entityPlaceholderExerciseGroup: 'Aufgabengruppe',
      entityPlaceholderEvent: 'Event',
      entityPlaceholderCourse: 'Kurs',
      entityPlaceholderTaxonomyTerm: 'Begriff',
      entityPlaceholderFallback: 'Inhalt'
    }
  }
};