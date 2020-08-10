import { headerData, footerData } from './menu-data';
import { InstanceData, ServerSideStrings, LoggedInData, InstanceLandingData } from '@/data-types';
export const instanceData: InstanceData = {
  lang: "fr",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "La plateforme d'apprentissage libre",
      search: "Recherche",
      login: 'Login'
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
    taxonomy: {
      topicFolder: "Dossie d'éxercices"
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
    }
  }
};
export const instanceLandingData: InstanceLandingData = {
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
export const serverSideStrings: ServerSideStrings = {
  title: "Apprendre avec Serlo!"
};
export const loggedInData: LoggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: "Notifications",
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
    tools: "Autres outils"
  }
};