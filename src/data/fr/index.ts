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
      revisionHistory: "Historique des révisions",
      eventLog: "Journal des événements",
      unrevisedRevisions: "Révisions non révisées",
      userEdits: 'Edits by %user%',
      userEditsMine: 'My Unrevised Revisions',
      editProfile: 'Edit Profile & Settings',
      recycleBin: 'Recycle Bin',
      diagon: 'Diagon Alley'
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
      back: "Précédent",
      noPagesWarning: 'Sorry there seem to be no reviewed pages in this course yet.',
      noRevisionForPage: 'unreviewed page'
    },
    content: {
      show: "montrer",
      hide: "cacher",
      prerequisite: "Pour cet éxercice tu as besoin des connaissances de base suivantes:",
      task: "Tâche",
      right: "Vrai",
      wrong: "Faux",
      feedback: "Ton avis",
      answer: "Répondre",
      check: "Vérifier",
      yourAnswer: "Ta réponse...",
      chooseOption: "Sélectionne une des options :",
      printModeChooseOption: "Sélectionne une des options :",
      trashedNotice: "Ce contenu est marqué pour être supprimé.",
      unrevisedNotice: "Ce contenu n'a pas encore accepté de révision. Veuillez utiliser %link% pour un aperçu.",
      emptyNotice: 'There is no content here. Please edit or delete.',
      strategy: "Stratégie de solution",
      picture: "Image",
      previewImage: "Aperçu de l'image",
      exercisesTitle: "Exercices",
      moreExercises: "Tu peux trouver plus d'exercices dans le dossier suivant :",
      relatedContentTitle: "Tu en veux encore plus?",
      relatedContentText: "Tu peux en trouver plus ici :",
      sourcesTitle: 'Sources',
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
      copyLink: "Copier le lien du commentaire"
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
      supportLinks: "Comment réviser?",
      guideline: "Aide à la révision",
      showMoreEntities: "Tout afficher dans %subject%",
      showMoreRevisions: "Afficher %number% plus…",
      newLabelText: "Nouveau",
      newLabelNote: "Ce contenu est nouveau",
      wipLabelText: "essuyer",
      wipLabelNote: "Travail en cours. Ne pas encore réviser.",
      newAuthorText: "nouvel auteur",
      newAuthorNote: "C'est l'une des premières modifications de cet auteur. Peut-être, donne-lui la priorité.",
      noUnrevisedRevisions: 'No unrevised revisions, all done! 🎉'
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
    login: {
      pleaseLogInLink: "Veuille te connecter",
      pleaseLogInText: "pour utiliser cette fonctionnalité."
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
      setThreadStateArchived: "%actor% a archivé %thread%.",
      setThreadStateUnarchived: "%actor% a restauré %thread%.",
      createComment: "%actor% a commenté dans %thread%: %comment%.",
      createThread: "%actor% a commencé %thread% dans %object%.",
      createEntity: "%actor% a créé %object%.",
      setLicense: "%actor% a modifié la licence de %repository%.",
      createEntityLink: "%actor% a associé %child% à %parent%.",
      removeEntityLink: "%actor% a dissocié %child% de %parent%.",
      createEntityRevision: "%actor% a créé une %revision% de %entity%.",
      checkoutRevision: "%actor% a accepté une %revision% dans %repository%.",
      rejectRevision: "%actor% n'a pas accepté une %revision% dans %repository%.",
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
      url: '/auth/password/change',
      title: "Changer le mot de passe"
    }, {
      url: '/user/settings',
      title: 'Settings'
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
      confirmTrash: 'Are you sure you want to delete this content?',
      restoreContent: "Restaurer à partir de la corbeille",
      sortCoursePages: "Trier les pages du cours",
      sortGroupedExercises: "Trier les exercices groupés",
      edit: "Modifier",
      unrevisedEdit: "Afficher les révisions non révisées",
      organize: "Organiser",
      moveToGrouped: "Déplacer le contenu vers un autre exercice de texte groupé",
      moveToTextExercise: "Déplacer le contenu vers un autre exercice de texte",
      sortEntities: "Trier le contenu",
      newEntity: "Nouveau contenu",
      editProfile: "Modifier profil",
      directLink: "Lien direct vers ce contenu"
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
      loadedSentence: "%loadedCount% sur %totalCount% abonnements chargés.",
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
        save: 'Edit successfully saved ✅'
      },
      errors: {
        UNAUTHENTICATED: 'You have to log in to use this function!',
        FORBIDDEN: 'Sorry, you are not allowed to do that!',
        INVALID_TOKEN: '',
        BAD_USER_INPUT: '',
        UNKNOWN: 'An unknown error…',
        valueMissing: 'Please fill all required fields'
      }
    },
    editor: {
      confirmRouteChange: "Are you sure you want to leave without saving?",
      edtrIo: {
        extendedSettings: "Paramètres avancés",
        close: "Fermer",
        notSupportedYet: "Ce type de contenu n'est pas encore pris en charge par le nouvel éditeur.",
        editInOld: 'You can edit the content in the old editor',
        conversionError: "Une erreur s'est produite lors de la conversion.",
        oldRevisionFound: "Nous avons trouvé une ancienne révision que vous avez créée. Voulez-vous la restaurer?",
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
        serloTableDesc: '(new plugin in testing) Create tables',
        table: "Tableau",
        tableDesc: "Créer un tableau avec Markdown.",
        video: "Vidéo",
        videoDesc: "Intégrer YouTube, Vimeo, Wikimedia Commons ou les vidéos BR.",
        solutionSeparator: "Séparateur de solution",
        solutionSeparatorDesc: "Divisez la solution en différentes étapes.",
        save: "Sauvegarder",
        cancel: "Annuler",
        saving: "Sauvegarde…",
        missingChanges: "Tu dois remplir les modifications que tu as apportées",
        missingLicenseTerms: "Tu dois accepter les conditions de licence",
        missingChangesAndLicenseTerms: "Tu dois remplir les modifications que tu as apportées et accepter les conditions de licence",
        errorSaving: "Une erreur s'est produite au cours de la sauvegarde!",
        saveLocallyAndRefresh: "Tu peux sauvegarder la révision localement, actualiser la page et essayer de sauvegarder à nouveau.",
        revisionSaved: "Révision sauvegardée",
        saveRevision: "Sauvegarder la révision",
        changes: "Modifications",
        skipReview: "Passer la révision (non recommandé)",
        enableNotifs: "Activer les notifications par serlo.org",
        enableNotifsMail: "Activer les notifications par e-mail",
        switchRevision: "Changer à une autre révision",
        current: "Actuel",
        author: "Auteur",
        createdAt: "Créé le",
        settings: "Paramètres",
        equationsTitle: 'Terms and equations',
        equationsDesc: 'Write term manipulations and solve multiline equations.',
        ready: "Ready to save?"
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
        correct: "Correcte",
        wrong: "Incorrect",
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
        addAnswer: "Ajouter une réponse",
        wrong: "Incorrect",
        missedSome: "Presque ! Tu as manqué au moins une réponse correcte",
        correct: "Correcte"
      },
      serloTable: {
        mode: 'Mode',
        columnHeaders: 'Only column headers',
        rowHeaders: 'Only row headers',
        columnAndRowHeaders: 'Column and row headers',
        convertToText: 'Convert to text',
        convertToImage: 'Convert to image',
        row: "row",
        column: "column",
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
        linkStrgK: "Lien (Strg + K)",
        enterUrl: "Saisir l'URL",
        openInNewTab: "Ouvrir dans un nouvel onglet",
        orderedList: "Liste ordonnée",
        unorderedList: "Liste non ordonnée",
        lists: "Listes",
        mathFormula: "Formule mathématique (Strg + M)",
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
        bold: "Gras (Ctrl + B)",
        italic: "Italique (Ctrl + I)",
        noItemsFound: "Aucun élément trouvé"
      },
      video: {
        videoUrl: "URL de la vidéo",
        description: 'Description',
        title: "Titre",
        url: 'URL',
        seoTitle: "Titre pour les moteurs de recherche"
      },
      error: {
        convertionError: "Cette partie du document n'a pas pu être convertie."
      },
      exercise: {
        addChoiceExercise: "Ajouter un exercice de choix",
        choiceExercise: "Exercice de choix",
        addInputExercise: "Ajouter un exercice de saisie",
        inputExercise: "Exercice de saisie",
        addOptionalInteractiveEx: "Ajouter un exercice interactif optionnel :",
        changeInteractive: 'Change interactive element',
        removeInteractive: 'Remove interactive element'
      },
      injection: {
        illegalInjectionFound: "Injection illégale trouvée",
        serloEntitySrc: "Entité Serlo {{src}}",
        serloId: 'Serlo ID:'
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
          introText: 'After reading the article, what would help out learners next? %break% Here you can add some %exercises% or link to a single %topicFolder%. %break% Or you can suggest %articles%, %courses% or %videos% to follow up with.',
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
          addFromFolderTitle: 'From the folder',
          placeholder: 'Paste Serlo ID or URL here',
          topicFolderNote: 'Only one can be selected here'
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
        transformationExample: "e.g. -3x",
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
    }
  }
};