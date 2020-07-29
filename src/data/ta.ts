import {
  InstanceData,
  InstanceLandingData,
  ServerSideStrings,
  LoggedInData,
} from '@/data-types'
import { serloDomain } from '@/helper/serlo-domain'

export const taInstanceData: InstanceData = {
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

export const taInstanceLandingData: InstanceLandingData = {
  lang: 'ta',
  strings: {
    vision:
      'நாம் சமமான கல்வி வாய்ப்புகளை நோக்கி இணைந்து பணிபுரியும் ஒரு குழு. இந்த இணையத்தளத்தில் எண்ணற்ற விவரக் கட்டுரைகள், பயிற்சிகள் மற்றும் ஒலிப் பேழைகள் அனைத்துப் பாடங்களுக்கும் வழங்கப்பட்டுவருகின்றன. இவை அனைத்தும் இலவசமாக உலகம் முழுவதும் உள்ள மாணவர்களுக்காக உருவாக்கப்பட்டுவருகின்றன. இனி வரும் காலங்களில், தமிழ்மொழியிலும் இவ்வாறான இலவசப் பாடத்திட்டங்களை உருவாக்க நீங்களும் எம்முடன் இணைந்து பணியாற்றலாம்.',
    learnMore: 'மேலும் அறிக',
    democraticallyStructured: 'ஜனநாயக ரீதியாக',
    nonProfit: 'இலாப நோக்கற்றது',
    transparent: 'ஒளி புகும்',
    openlyLicensed: 'திறந்த உரிமம்',
    adFree: 'விளம்பரமின்றி',
    freeOfCharge: 'இலவசம்',
    wikiTitle: 'Serlo ஓர் கற்றலுக்கான விக்கிபீடியா',
    wikiText:
      'Serlo.org விக்கிபீடியாபோல திறந்த உரிமம் கொண்ட ஓர் இணையத்தளம். இது எம் எழுத்தாளர் குழுவால் உருவாக்கப்படுகின்றது.',
    movementTitle: 'நீங்களும் இதில் பணியாற்றலாம்',
    callForAuthors:
      'ஆசிரியர்களும் ஆர்வமுள்ள எழுத்தாளர்களும் பாடங்களை உருவாக்க பல வழிகளில் உதவலாம். புதுப் பயிற்சிகளை உருவாக்குவதற்கும் இந்தத் தளத்தின் சில உள்ளடக்கங்களை இன்னும் மேம்படுத்துவதற்கும் நீங்கள் உதவலாம். அதற்கு கீழுள்ள இணையத்திற்குச் செல்லவும்.',
    communityLink: 'எழுத்தாளருக்கான பக்கத்தைப் பார்வையிடவும்',
    callForOther:
      'நாங்கள் பல வகையான வேலைவாய்ப்புகளையும் பொதுச்சேவையாகப் பணியாற்றும் வாய்ப்புகளையும் வழங்குகின்றோம். இந்த இணையத்தளதிற்கு மொழிபெயர்ப்பாளர்கள், வடிவமைப்பாளர்கள், தொலைத்தொடர்பாளர்கள் போன்ற துறை சார்ந்தவர்களை நாங்கள் தேடி நிற்கின்றோம். இணைந்து கொள்ளுங்கள்.',
    getInvolved: 'நீங்களும் ஈடுபடுங்கள்!',
  },
}

export const taServerSideStrings: ServerSideStrings = {
  title: 'learn with Serlo!',
}

export const taLoggedInData: LoggedInData = {
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
