import {
  InstanceData,
  LandingData,
  ServerSideStrings,
  LoggedInData,
} from '@/data-types'
import { serloDomain } from '@/helper/serlo-domain'

export const frInstanceData: InstanceData = {
  lang: 'en',
  headerData: [
    {
      url: '',
      title: 'Subjects',
      icon: 'subject',
      children: [{ url: '/106103', title: 'Subjects under construction' }],
    },
    { url: '/23727', title: 'About Serlo', icon: 'about' },
    { url: '/27469', title: 'Get involved!', icon: 'participate' },
    {
      url: '',
      title: 'Community',
      icon: 'community',
      children: [
        {
          url: '/35587',
          title: 'Starting page for authors',
        },
        { url: 'https://community.serlo.org/', title: 'Chat for authors' },
        { url: '/entity/unrevised', title: 'Unrevised changes' },
      ],
    },
  ],
  footerData: {
    footerNavigation: [
      {
        title: 'General',
        children: [
          { title: 'About Serlo', url: '/serlo' },
          { title: 'Get involved!', url: '/27469' },
          { title: 'Contact', url: '/41043' },
          {
            title: 'Serlo in other languages',
            url: `https://en.${serloDomain}/global`,
          },
          {
            title: 'Back into the old design',
            url: `https://de.${serloDomain}/disable-frontend`,
          },
          {
            title: 'API',
            url: `https://en.${serloDomain}/community/technology-and-development/content-api`,
          },
        ],
      },
      {
        title: 'Stay in touch',
        children: [
          {
            title: 'Newsletter',
            url:
              'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
            icon: 'newsletter',
          },
          {
            title: 'GitHub',
            url: 'https://github.com/serlo',
            icon: 'github',
          },
        ],
      },
      {
        title: 'Legal terms',
        children: [
          { title: 'Privacy Policy', url: `https://de.${serloDomain}/privacy` },
          {
            title: 'Terms of use',
            url: `https://de.${serloDomain}/terms`,
          },
          { title: 'Imprint', url: `https://de.${serloDomain}/imprint` },
        ],
      },
    ],
    aboutHref: '/serlo',
    participationHref: '/27469',
    donationHref: '/spenden',
  },
  strings: {
    header: {
      slogan: 'The Open Learning Platform',
      search: 'Search',
      login: 'Login',
    },
    footer: {
      summaryHeading: 'Serlo.org is the Wikipedia for learning.',
      summaryText:
        'We are a community of visionaries working tirelessly to make great education freely available to everyone.',
      learnMore: 'Mehr Erfahren',
      participate: 'Join the cause',
      donate: 'Donate',
      toTop: 'To Top',
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
      button: 'Share',
      title: 'Share!',
      copyLink: 'Copy link',
      copySuccess: 'Link copied! ',
      close: 'Close',
    },
    edit: {
      button: 'Edit',
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
      part1: 'By using this website you declare that you agree with our',
      part2: 'and',
      part3: '.',
      link1: 'Privacy Policy',
      link2: 'Terms of use',
      button: 'Agree',
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
  title: 'learn with Serlo!',
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
        { url: '/user/public', title: 'Öffentliches Profil' },
        {
          url: '/user/settings',
          title: 'Profil bearbeiten',
        },
        {
          url: '/auth/password/change',
          title: 'Passwort aktualisieren',
        },
        {
          url: '/event/history/user/me',
          title: 'Meine Aktivitäten',
        },
        {
          url: '/api/auth/logout',
          title: 'Ausloggen',
        },
      ],
    },
  ],
  strings: {
    tools: 'Weitere Tools',
  },
}
