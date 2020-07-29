import {
  InstanceData,
  InstanceLandingData,
  ServerSideStrings,
  LoggedInData,
} from '@/data-types'
import { serloDomain } from '@/helper/serlo-domain'

export const enInstanceData: InstanceData = {
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

export const enInstanceLandingData: InstanceLandingData = {
  lang: 'en',
  strings: {
    vision:
      'It is our vision to enable personalized learning and provide high quality educational resources worldwide – completely free of charge. Serlo is a grassroots organization inspired by Wikipedia. We already provide thousands of articles, videos and solved exercises for five million German students every year. Now it’s time to go international.',
    learnMore: 'Learn more',
    democraticallyStructured: 'democratically structured',
    nonProfit: 'non-profit',
    transparent: 'transparent',
    openlyLicensed: 'openly licensed',
    adFree: 'ad-free',
    freeOfCharge: 'free of charge',
    wikiTitle: 'Serlo is the Wikipedia for Learning',
    wikiText: '', //TODO: Missing, contacted Jakob.
    movementTitle: 'Become a Part of Our Movement for Open Education',
    callForAuthors:
      'We are looking for teachers and enthusiastic educators who are passionate about their subject. Become part of our community to create new learning material and help us improve existing content.',
    communityLink: 'Visit the landing page for authors',
    callForOther:
      'Serlo is being developed by highly motivated volunteers and employees worldwide. We offer a diverse range of jobs and volunteering opportunities in the fields of software development, content editing and NGO management.', //TODO: Placeholder, contacted Jakob.
    getInvolved: 'Mach mit!', //TODO: Placeholder, contacted Jakob.
  },
}

export const enServerSideStrings: ServerSideStrings = {
  title: 'learn with Serlo!',
}

export const enLoggedInData: LoggedInData = {
  authMenu: [
    {
      url: '/user/notifications',
      title: 'Benachrichtigungen',
      icon: 'notifications',
    },
    {
      url: '',
      title: 'user',
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
