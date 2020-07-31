import {
  InstanceData,
  LandingData,
  ServerSideStrings,
  LoggedInData,
} from '@/data-types'
import { serloDomain } from '@/helper/serlo-domain'

export const frInstanceData: InstanceData = {
  lang: 'fr',
  headerData: [
    {
      url: '',
      title: 'Matières',
      icon: 'subject',
      children: [{ url: '/141585', title: 'Mathématiques'},
				{url: '/148617', title: 'Boîte à méthodes'},
				{url: '/141604', title: 'Nouvelle matières'}],
    },
    { url: '/23727', title: 'À propos de serlo', icon: 'about' },
    { url: '/27469', title: 'Participe!', icon: 'participate' },
    {
      url: '',
      title: 'Communauté',
      icon: 'community',
      children: [
        {
          url: '/35587',
          title: 'Page de démarrage pour les auteurs',
        },
        { url: 'https://community.serlo.org/', title: 'Chat pour les auteurs' },
        { url: '/entity/unrevised', title: 'Modifications non révisées' },
      ],
    },
  ],
  footerData: {
    footerNavigation: [
      {
        title: 'Général',
        children: [
          { title: 'À propos de serlo', url: '/serlo' },
          { title: 'Participes!', url: '/141581' },
          { title: 'Contact', url: '/41043' },
          {
            title: "Serlo dans d'autres langues",
            url: `https://en.${serloDomain}/global`,
          },
          {
            title: 'API',
            url: `https://en.${serloDomain}/community/technology-and-development/content-api`,
          },
        ],
      },
      {
        title: 'Restez en contact',
        children: [
          {
            title: 'GitHub',
            url: 'https://github.com/serlo',
            icon: 'github',
          },
        ],
      },
      {
        title: 'Termes légaux',
        children: [
          { title: 'Privacy Policy', url: `https://de.${serloDomain}/privacy` },
          {
            title: "Conditions d'utilisation",
            url: `https://de.${serloDomain}/terms`,
          },
          { title: 'Imprimer', url: `https://de.${serloDomain}/imprint` },
        ],
      },
    ],
    aboutHref: '/serlo',
    participationHref: '/27469',
    donationHref: '/spenden',
  },
  strings: {
    header: {
      slogan: "La plateforme d'apprentissage libre",
      search: 'Recherche',
      login: 'Login',
    },
    footer: {
      summaryHeading: 'Serlo.org is the Wikipedia for learning.',
      summaryText:
        'We are a community of visionaries working tirelessly to make great education freely available to everyone.',
      learnMore: 'En savoir plus',
      participate: 'Rejoignez-nous',
      donate: 'Faire un don',
      toTop: 'En haut',
    },
    categories: {
      article: 'Article',
      course: 'Course',
      video: 'Video',
      applet: 'Applet',
      folder: 'Folder',
      exercises: 'Exercises',
    },
    share: {
      button: 'Partager',
      title: 'Share',
      copyLink: 'Copier le lien',
      copySuccess: 'Lien copié!',
      close: 'Fermer',
    },
    edit: {
      button: 'Modifier',
    },
    license: {
      readMore: 'Info',
    },
    course: {
      showPages: 'Show course overview',
      pages: 'Course overview',
      next: 'Next',
    },
    taxonomy: {
      topicFolder: 'Exercise folder',
    },
    content: {
      show: 'show',
      hide: 'hide',
      prerequisite: 'For this task you need the following basic knowledge:',
      solution: 'Solution',
      exerciseGroup: 'Exercise group',
      right: 'Right',
      wrong: 'Wrong',
      check: 'Check',
      yourAnswer: 'Your answer…',
      chooseOption: 'Click on one of the options.',
    },
    cookie: {
      part1: 'En utilisant ce site Web, vous déclarez que vous acceptez',
      part2: 'et',
      part3: '.',
      link1: 'notre politique de confidentialitéPrivacy Policy',
      link2: "nos conditions d'utilisation.",
      button: "Je suis d'accord",
    },
  },
}

export const frInstanceLandingData: LandingData = {
  strings: {
    vision:
      "Nous sommes une organisation communautaire à but non lucratif supportant l'apprentissage personnalisé et travaillant à la réalisation d'opportunités éducatives égales. Cette plateforme propose des milliers d'articles d'instruction, des vidéos pédagogiques et des exercices pratiques aux millions d'étudiant(e)s et d'élèves dans le monde entier - complètement gratuit. Maintenant, vous êtes invité de joindre l'équipe Serlo francophone.",
    learnMore: 'En savoir plus',
    democraticallyStructured: 'structure démocratique',
    nonProfit: 'non-lucratif',
    transparent: 'transparent',
    openlyLicensed: 'licence libre',
    adFree: 'sans publicité',
    freeOfCharge: 'gratuit',
    wikiTitle: "Serlo est le Wikipédia pour l'apprentissage",
    wikiText:
      "Tout comme Wikipédia, cette plateforme est créée par une communauté d'auteurs engagé(e)s. Serlo Education est gérée et détenue par des équipes décentralisées de bénévoles et de professionnels dans le monde entier.",
    movementTitle: "Rejoignez notre mouvement pour l'éducation libre",
    callForAuthors:
      'Nous cherchons des enseignant(e)s et des éducateur(e)s enthousiastes et passionné(e)s de leur matière. Devenez un(e) auteur sur serlo.org ! Vous pouvez créer du nouveau matériel pédagogique et nous aider à améliorer le contenu existant.',
    communityLink: "Visitez la page d'accueil d'auteurs",
    callForOther:
      "Nous offrons une variété d'emplois et de possibilités de bénévolat dans les domaines du développement de logiciel, de la conception, la traduction, la communication, la gestion de projet et d'autres.",
    getInvolved: 'Participe!',
  },
}

export const frServerSideStrings: ServerSideStrings = {
  title: 'Apprendre avec Serlo!',
}

export const frLoggedInData: LoggedInData = {
  authMenu: [
    {
      url: '/user/notifications',
      title: 'Benachrichtigungen',
      icon: 'notifications',
    },
    {
      url: '',
      title: 'Benutzer',
      icon: 'user',
      children: [
        { url: '/user/public', title: 'Profil public' },
        {
          url: '/user/settings',
          title: 'Éditer profil',
        },
        {
          url: '/auth/password/change',
          title: 'mettre à jour le mot de passe',
        },
        {
          url: '/event/history/user/me',
          title: 'Activités récentes',
        },
        {
          url: '/api/auth/logout',
          title: 'Se déconnecter',
        },
      ],
    },
  ],
  strings: {
    tools: 'Autres outils',
  },
}
