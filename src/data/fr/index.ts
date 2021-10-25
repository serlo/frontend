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
      userEditsMine: 'My Unrevised Revisions'
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
      back: "Précédent"
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
      strategy: "Stratégie de solution",
      picture: "Image",
      previewImage: "Aperçu de l'image",
      exercisesTitle: "Exercices",
      moreExercises: "Tu peux trouver plus d'exercices dans le dossier suivant :",
      relatedContentTitle: "Tu en veux encore plus?",
      relatedContentText: "Tu peux en trouver plus ici :",
      sourcesTitle: 'Sources'
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
      invitation: "💬 %username% t'a invité dans le chat de la communauté Serlo !\nClique sur %chatlink% pour rejoindre.",
      inviteModal: {
        part1: "%username% n'est pas encore actif dans notre chat de la communauté à %chatLink%.",
        part2: "Tu peux inviter %username% dans le chat pour envoyer des messages directs :",
        button: "Envoyer une invitation"
      },
      activityGraph: {
        edits: "Modifications",
        comments: "Commentaires",
        reviews: "Révisions",
        taxonomy: "Taxonomie",
        legendary: "💙 Wow! 💙",
        untilNextLevel: "%amount% de plus pour compléter ce cercle 🎉"
      },
      howToEditImage: {
        heading: "Comment modifier votre photo de profil",
        description: "Actuellement nous utilisons les images de %chatLink% comme des photos de profil. Pour changer la photo, fais ce qui suit :",
        steps: {
          goToChat: "Aller à %chatLink%.",
          signIn: "Se connecter.",
          goToMyAccount: "Aller dans le menu utilisateur de %myAccountLink%.",
          myAccount: "Mon Compte",
          uploadPicture: "Télécharge une nouvelle image (assure-toi qu'elle est carrée) et clique sur \"Enregistrer les modifications\".",
          refreshPage: "Reviens ici et rafraîchisse l'image en cliquant sur %refreshLink%.",
          refreshLink: "ce lien"
        }
      },
      motivation: {
        edit: "Modifier la motivation",
        add: "Ajouter une motivation",
        heading: "Comment modifier ta motivation",
        intro: "Les motivations sont une nouvelle fonctionnalité que nous testons pour le moment. Pour modifier ta motivation, tu dois remplir un formulaire simple.",
        privacy: "Le formulaire et le stockage des données sont offerts par Google et les données personnelles peuvent être transférées à ce service lors de l'utilisation de cette fonctionnalité.",
        toForm: "Formulaire de motivation"
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
      inviteToChat: "T'as été invité dans le Chat! %break% Clique sur %chatLink% pour discuter avec %actor% et d'autres.",
      entityPlaceholderFallback: "Contenu"
    },
    actions: {
      loadMore: "Charger plus"
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
      url: '/auth/password/change',
      title: "mettre à jour le mot de passe"
    }, {
      url: '/event/history/user/me',
      title: "Mes modifications"
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
      sortCoursePages: "Trier les pages du cours",
      sortGroupedExercises: "Trier les exercices groupés",
      edit: "Modifier",
      unrevisedEdit: "Afficher les révisions non révisées",
      organize: "Organiser",
      moveToGrouped: 'Move content to other grouped-text-exercise',
      moveToTextExercise: "Déplacer le contenu vers un autre exercice de texte",
      sortEntities: "Trier le contenu",
      newEntity: "Nouveau contenu",
      editProfile: "Modifier profil",
      directLink: "Lien direct vers ce contenu"
    },
    notifications: {
      hide: "Masquer les notifications pour ce contenu.",
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
    editor: {
      edtrIo: {
        extendedSettings: 'Extended Settings',
        close: 'Close',
        notSupportedYet: "This content type isn't supported by the new editor, yet.",
        editInOld: 'Edit the content in the old editor.',
        conversionError: 'An error occurred during the conversion.',
        oldRevisionFound: 'We found an old revision created by you. Do you want to restore it?',
        notConverted: "This entity hasn't been converted to the new editor, yet.",
        text: 'Text',
        textDesc: 'Compose content using rich text and math formulas.',
        blockquoteTitle: 'Quotation',
        quoteDescription: 'Create indented text for quotations.',
        geogebraTitle: 'GeoGebra Applet',
        geogebraDesc: 'Embed GeoGebra Materials applets via URL or ID.',
        highlightTitle: 'Source Code',
        highlightDesc: 'Highlight the syntax of source code.',
        anchor: 'Anchor',
        anchorDesc: 'Insert an anchor.',
        image: 'Image',
        imageDesc: 'Upload images.',
        importantTitle: 'Important Statement',
        importantDesc: 'A box to highlight important statements.',
        injectionTitle: 'serlo.org Content',
        injectionDesc: 'Embed serlo.org content via their ID.',
        multimediaTitle: 'Multimedia content associated with text',
        multimediaDesc: 'Create an illustrating or explaining multimedia content associated with text.',
        spoiler: 'Spoiler',
        spoilerDesc: 'A collapsible box.',
        table: 'Table',
        tableDesc: 'Create tables using Markdown.',
        video: 'Video',
        videoDesc: 'Embed YouTube, Vimeo, Wikimedia Commons or BR videos.',
        solutionSeparator: 'Solution Separator',
        solutionSeparatorDesc: 'Divide the solution into individual steps.',
        save: 'Save',
        cancel: 'Cancel',
        saving: 'Saving…',
        missingChanges: 'You need to fill out the changes you made',
        missingLicenseTerms: 'You need to accept the license terms',
        missingChangesAndLicenseTerms: 'You need to fill out the changes you made and accept the license terms',
        errorSaving: 'An error occurred during saving.',
        saveLocallyAndRefresh: 'You can store the revision locally, refresh the page and try to save again.',
        revisionSaved: 'Revision saved',
        saveRevision: 'Save revision',
        changes: 'Changes',
        skipReview: 'Skip peer review (not recommended)',
        enableNotifs: 'Enable serlo.org notifications',
        enableNotifsMail: 'Enable notifications via e-mail',
        switchRevision: 'Switch to another revision',
        current: 'Current',
        author: 'Author',
        createdAt: 'when?',
        settings: 'Settings',
        equationsTitle: 'Terms and equations',
        equationsDesc: 'Write term manipulations and solve multiline equations.'
      },
      anchor: {
        identifier: 'Identifier',
        anchorId: 'ID of the anchor'
      },
      geogebra: {
        urlOrId: 'GeoGebra URL or ID'
      },
      highlight: {
        clickAndEnter: 'Click here and enter your source code…',
        enterHere: 'Enter your source code here',
        language: 'Language',
        enterLanguage: 'Enter language',
        showLineNumbers: 'Show line numbers'
      },
      inputExercise: {
        text: 'Text',
        chooseType: 'Choose the exercise type',
        unit: 'Unit',
        addAnswer: 'Add answer',
        enterTheValue: 'Enter the value',
        yourSolution: 'Your solution',
        correct: 'Correct',
        wrong: 'Wrong',
        number: "Number (exact solution, e.g. '0,5' ≠ '1/2' ≠ '2/4')",
        mathematicalExpressionSolution: "Mathematical expression (equivalent solution, e.g. '0,5' = '1/2' = '2/4')"
      },
      multimedia: {
        image: 'Image',
        video: 'Video',
        geogebraTitle: 'GeoGebra Applet',
        changeType: 'Change the multimedia type',
        howImportant: 'How important is the multimedia content?',
        isIllustrating: 'It is illustrating',
        isEssential: 'It is essential'
      },
      rows: {
        searchForTools: 'Search for tools…',
        duplicate: 'Duplicate',
        remove: 'Remove',
        close: 'Close',
        dragElement: 'Drag the element within the document',
        addAnElement: 'Add an element'
      },
      scMcExercise: {
        singleChoice: 'Single-choice',
        multipleChoice: 'Multiple-choice',
        chooseType: 'Choose the exercise type',
        addAnswer: 'Add answer',
        wrong: 'Wrong',
        missedSome: 'Almost! You missed at least one correct answer',
        correct: 'Correct'
      },
      spoiler: {
        enterATitle: 'Enter a title'
      },
      text: {
        quote: 'Quote',
        setColor: 'Set color',
        resetColor: 'Reset color',
        colors: 'Colors',
        closeSubMenu: 'Close sub menu',
        heading: 'Heading',
        headings: 'Headings',
        linkStrgK: 'Link (Strg + K)',
        enterUrl: 'Enter URL',
        openInNewTab: 'Open in new tab',
        orderedList: 'Ordered list',
        unorderedList: 'Unordered list',
        lists: 'Lists',
        mathFormula: 'Math formula (Strg + M)',
        displayAsBlock: 'Display as block',
        formula: '[formula]',
        visual: 'visual',
        laTeX: 'LaTeX',
        onlyLaTeX: 'Only LaTeX editor available',
        shortcuts: 'Shortcuts',
        fraction: 'Fraction',
        superscript: 'Superscript',
        or: 'or',
        subscript: 'Subscript',
        root: 'Root',
        mathSymbols: 'Math symbols',
        eG: 'e.g.',
        functions: 'Functions',
        bold: 'Bold (Strg + B)',
        italic: 'Italic (Strg + I)',
        noItemsFound: 'No items found'
      },
      video: {
        videoUrl: 'Video URL',
        description: 'Description',
        title: 'Title',
        url: 'URL',
        seoTitle: 'Title for search engines'
      },
      error: {
        convertionError: 'This part of the document could not be converted.'
      },
      exercise: {
        addChoiceExercise: 'Add choice exercise',
        choiceExercise: 'Choice exercise',
        addInputExercise: 'Add input exercise',
        inputExercise: 'Input exercise',
        addOptionalInteractiveEx: 'Add an optional interactive exercise:'
      },
      injection: {
        illegalInjectionFound: 'Illegal injection found',
        serloEntitySrc: 'Serlo entity {{src}}',
        serloId: 'Serlo ID:'
      },
      layout: {
        toDragConvert: 'To make the content draggable, convert them for the new editor:',
        oneColumnLayout: 'One-column layout',
        multimediaTitle: 'Multimedia content associated with text'
      },
      solution: {
        optionalExplanation: 'Optionally explain the solution strategy here',
        fundamentalsNote: 'For this exercise, you need the following fundamentals:',
        idArticle: 'ID of an article, e.g. 1855',
        openArticleTab: 'Open the article in a new tab:',
        linkTitle: 'Title of the link',
        showSolution: 'Show solution',
        hideSolution: 'Hide solution'
      },
      applet: {
        seoTitle: 'Title for search engines',
        seoDesc: 'Description for search engines',
        title: 'Title'
      },
      article: {
        seoTitle: 'Title for search engines',
        seoDesc: 'Description for search engines',
        title: 'Title',
        writeShortIntro: 'Write a short introduction',
        exercises: 'Exercises',
        dragTheExercise: 'Drag the exercise',
        removeExercise: 'Remove exercise',
        addOptionalExercise: 'Add optional exercise',
        stillWantMore: 'Still want more?',
        moreOnTopic: 'You can find more content on this topic here',
        articles: 'Articles',
        addArticle: 'Add article',
        idArticle: 'ID of an article, e.g. 1855',
        openArticleTab: 'Open the article in a new tab:',
        dragTheArticle: 'Drag the article',
        courses: 'Courses',
        addCourse: 'Add course',
        idCourse: 'ID of a course, e.g. 51979',
        openCourseTab: 'Open the course in a new tab:',
        dragTheCourse: 'Drag the course',
        videos: 'Videos',
        addVideo: 'Add video',
        idVideo: 'ID of a video, e.g. 40744',
        openVideoTab: 'Open the video in a new tab:',
        dragTheVideo: 'Drag the video',
        linkTitle: 'Title of the link',
        sources: 'Sources',
        linkUrl: 'URL of the link',
        openInNewTab: 'Open the link in a new tab:',
        dragTheSource: 'Drag the source',
        addSource: 'Add source',
        moreInFolder: 'You can find more exercises in the following folder',
        exFolderId: 'ID of an exercise folder, e.g. 30560',
        openExerciseTab: 'Open the exercise folder in a new tab:'
      },
      coursePage: {
        explanation: 'Explanation',
        video: 'Video',
        question: 'Question',
        title: 'Title'
      },
      course: {
        seoDesc: 'Description for search engines',
        title: 'Title',
        removeCoursePage: 'Remove course page',
        addCoursePage: 'Add course page'
      },
      event: {
        seoTitle: 'Title for search engines',
        seoDesc: 'Description for search engines',
        title: 'Title'
      },
      page: {
        title: 'Title'
      },
      taxonomy: {
        title: 'Title'
      },
      textExerciseGroup: {
        removeExercise: 'Remove exercise',
        addExercise: 'Add exercise',
        kindOfExerciseGroup: 'Kind of exercise group',
        notCohesive: 'not cohesive',
        cohesive: 'cohesive'
      },
      textExercise: {
        removeSolution: 'Remove solution',
        createSolution: 'Create solution'
      },
      equations: {
        leftHandSide: 'left-hand side',
        transformation: 'transformation',
        mode: 'Mode',
        transformationOfEquations: 'Transformation of equations',
        transformationOfTerms: 'Transformation of terms',
        addNewRow: 'Add new row',
        explanation: 'Explanation',
        term: 'Term',
        rightHandSide: 'right-hand side',
        combineLikeTerms: 'Combine like terms.',
        setEqual: 'Set the terms equal to each other.'
      },
      deprecated: {
        unsupported: 'This part of the document contains features that are no longer supported.'
      }
    }
  }
};