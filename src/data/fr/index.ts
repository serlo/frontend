import { headerData, footerData, landingSubjectsData } from './menu-data';
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
    search: {
      privacy: "La recherche est fournie par Google. Consultez notre %privacypolicy% pour savoir quelles sont les informations traitées.",
      agree: "Accepter"
    },
    footer: {
      summaryHeading: "Serlo.org est le Wikipedia pour l'apprentissage.",
      summaryText: "Nous sommes une communauté de visionnaires qui travaille sans relâche pour offrir une éducation gratuite et accessible à tous.",
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
      events: "Événements"
    },
    entities: {
      applet: "applet",
      article: "article",
      course: "Cours",
      coursePage: "Page du cours",
      event: "Événement",
      exercise: "Exercice",
      exerciseGroup: "Groupe d'exercices",
      folder: "Dossier",
      groupedExercise: "Exercice groupé",
      page: "page",
      solution: "solution",
      taxonomyTerm: "Terme de taxonomie",
      user: "Utilisateur·Utilisatrice",
      video: "Vidéo",
      topicFolder: "Dossier d'exercice",
      comment: "Commentaire",
      revision: "Révision",
      thread: 'Thread',
      threads: 'Threads',
      topic: "Thèmes",
      subject: "Sujet",
      userProfile: "Profil d'utilisateur·utilisatrice",
      privacyPolicy: "Politique de confidentialité",
      content: "Contenu"
    },
    pageTitles: {
      notifications: "Tes notifications",
      subscriptions: "Gérer les abonnements",
      revisionHistory: "Historique des révisions"
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
      close: "Fermer"
    },
    edit: {
      button: "Modifier",
      unrevised: "Afficher les révisions non révisées"
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
      back: 'Back'
    },
    content: {
      show: "montrer",
      hide: "cacher",
      prerequisite: "Pour cet éxercice tu as besoin des connaissances de base suivantes:",
      task: "Tâche",
      right: "Vrai",
      wrong: "Faux",
      check: "Vérifier",
      yourAnswer: "Ta réponse...",
      chooseOption: "Sélectionne une des options :",
      trashedNotice: "Ce contenu est marqué pour être supprimé.",
      strategy: "Stratégie de solution",
      picture: 'Picture'
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
      showArchived: "Afficher les %threads% affichés",
      copyLink: "Copier le lien du commentaire"
    },
    revisions: {
      toOverview: "Retour à la vue d'ensemble",
      toContent: "Back to content",
      changes: "Modifications",
      title: "Titre",
      content: "Contenu",
      metaTitle: "Titre-méta",
      metaDescription: "Description-méta",
      compare: "Comparer",
      currentVersion: "Version actuelle",
      thisVersion: "Cette Version",
      currentNotice: "Ceci est la version actuellement acceptée.",
      rejectedNotice: 'This revision was not accepted.',
      by: "De"
    },
    revisionHistory: {
      changes: "Modifications",
      author: "Auteur·e",
      date: 'Date',
      createNew: "Créer une nouvelle révision à partir de cette révision spécifique"
    },
    errors: {
      title: "😬 Les sites Web font parfois des erreurs…",
      defaultMessage: "Désolé, nous avons rencontré un problème lors du chargement de ce contenu.",
      temporary: "Les bonnes nouvelles ? Le problème semble être temporaire, veuille réessayer plus tard.",
      permanent: "Nous verrons ce que nous pouvons faire à cet égard… ",
      typeNotSupported: "Veuille essayer de recharger cette page.",
      refreshNow: "Actualiser maintenant",
      backToPrevious: "Retour à la page précédente",
      backToHome: "Aller à notre page d'accueil"
    },
    print: {
      warning: "IMPORTANT : Pour t'assurer que toutes les images et formules sont imprimées, fais défiler la page une fois vers le bas AVANT d'ouvrir ce dialogue. Merci!"
    },
    profiles: {
      aboutMe: "À propos de moi",
      activeSince: "Avec Serlo depuis",
      recentActivities: "Activités récentes",
      showAllActivities: "Afficher toutes les activités",
      lastLogin: "Dernière connexion",
      roles: "Rôles",
      instanceRoles: 'Roles on %lang%.serlo.org:',
      otherRoles: 'Other roles:',
      directMessage: "Message direct ",
      howToEditImage: {
        heading: 'How to edit your profile picture',
        description: 'Currently we use the images from %chatUrl% as profile pictures. In order to change your picture, do the following:',
        steps: {
          goToChat: 'Go to %chatUrl%.',
          signIn: 'Sign in.',
          goToMyAccount: 'Go in the user menu to %myAccountLink%.',
          myAccount: 'My Account',
          uploadPicture: 'Upload a new picture and click "Save changes".'
        }
      }
    },
    notices: {
      welcome: "👋 Bienvenue %username%!",
      bye: "👋 À bientôt !",
      revisionSaved: "La révision est enregistrée et sera bientôt révisée 👍",
      revisionAccepted: "La révision a été acceptée avec succès ✅",
      revisionRejected: "La révision a été rejetée avec succès ❎",
      revisionSavedAccepted: "La révision a été enregistrée avec succès et acceptée ✅"
    },
    loading: {
      isLoading: "Chargement de contenu en cours…",
      unknownProblem: "Désolé,une erreure s'est produite lors du chargement du contenu, veuille réessayer plus tard."
    },
    login: {
      pleaseLogInLink: "Veuille te connecter",
      pleaseLogInText: "pour utiliser cette fonctionnalité."
    },
    keys: {
      ctrl: 'ctrl',
      return: "touche Entrée"
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
      title: 'Own profile'
    }, {
      url: '/auth/password/change',
      title: "mettre à jour le mot de passe"
    }, {
      url: '/event/history/user/me',
      title: "Activités récentes"
    }, {
      url: '/subscriptions/manage',
      title: "Abonnements"
    }, {
      url: '/api/auth/logout',
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
      restoreContent: "Restaurer à partir de la corbeille",
      sort: "Trier les sous-éléments",
      edit: "Modifier",
      organize: "Organiser",
      moveToGroupedTextExercise: "Déplacer le contenu vers un autre exercice de texte groupé",
      moveToTextExercise: "Déplacer le contenu vers un autre exercice de texte",
      sortEntities: "Trier le contenu",
      newEntity: "Nouveau contenu",
      editProfile: "Modifier profil",
      directLink: 'Direct link to this content'
    },
    notifications: {
      loadMore: "Charger d'avantage",
      hide: "Masquer les notifications pour ce contenu.",
      setToRead: "Set notification to read.",
      setAllToRead: "Set all visible to read",
      showNew: "New",
      showRead: "Read",
      setThreadStateArchived: "%actor% a archivé %thread%.",
      setThreadStateUnarchived: "%actor% a restauré %thread%.",
      createComment: "%actor% a commenté dans %thread%: %comment%.",
      createThread: "%actor% a commencé un %thread% dans  un %object%.",
      createEntity: "%actor% a créé %object%.",
      setLicense: "%actor% a modifié la licence de %repository%.",
      createEntityLink: "%actor% a associé %child% à %parent%.",
      removeEntityLink: "%actor% a dissocié %child% de %parent%.",
      createEntityRevision: "%actor% a créé une %revision% de %entity%.",
      checkoutRevision: "%actor% checked out a %revision% in %repository%.",
      rejectRevision: "%actor% did not accept a %revision% in %repository%.",
      createTaxonomyLink: "%actor% a ajouté %child% à %parent%.",
      removeTaxonomyLink: "%actor% a supprimé %child% de %parent%.",
      createTaxonomyTerm: "%actor% a créé %term%.",
      setTaxonomyTerm: "%actor% a mis à jour %term%.",
      setTaxonomyParentDeleted: "%actor% a supprimé le nœud parent de %child%.",
      setTaxonomyParentChangedFrom: "%actor% a changé le nœud parent de %child% de %previousparent% à %parent%.",
      setTaxonomyParentChanged: "%actor% a changé le nœud parent de %child% à %parent%.",
      setUuidStateTrashed: "%actor% a mis %object% dans la corbeille.",
      setUuidStateRestored: "%actor% a restauré %object%.",
      entityPlaceholderFallback: "Contenu"
    },
    subscriptions: {
      mail: "E-mails",
      subscription: "Abonnement",
      noMails: "désactiver",
      noNotifications: "annuler"
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
        explanation: 'Please tell the author why you will not accept the submission.'
      },
      confirm: "Confirmer"
    }
  }
};