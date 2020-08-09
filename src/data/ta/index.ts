import { headerData, footerData } from './menu-data';
import { InstanceData, ServerSideStrings, LoggedInData, InstanceLandingData } from '@/data-types';
export const instanceData: InstanceData = {
  lang: "ta",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "அனைவருக்கும் திறந்த உரிமம் உள்ள ஓர் இணையத்தளம்",
      search: "தேடுக",
      login: "உள்நுழை"
    },
    footer: {
      summaryHeading: "கற்பதற்கு விக்கிபீடியா போன்றது Serlo.org.",
      summaryText: "நாங்கள் கல்வியை அனைவருக்கும் இலவசமாகக் கிடைக்கச் செய்ய அயராது உழைக்கிறோம்",
      learnMore: "மேலும் அறிக",
      participate: "சேருங்கள்",
      donate: "தானம் செய்",
      toTop: "மேல் நோக்கி"
    },
    categories: {
      article: "கட்டுரை",
      course: 'Course',
      video: 'Video',
      applet: 'Applet',
      folder: 'Folder',
      exercises: 'Exercises'
    },
    share: {
      button: "பகிர்க",
      title: "பகிர்!",
      copyLink: "இணைப்பை நகலெடுக்கவும்",
      copySuccess: "இணைப்பு நகலெடுக்கப்பட்டது!",
      close: "நெருக்கமான"
    },
    edit: {
      button: "தொகு"
    },
    license: {
      readMore: "தகவல்"
    },
    course: {
      showPages: 'Show course overview',
      pages: 'Course overview',
      next: 'Next'
    },
    taxonomy: {
      topicFolder: 'Exercise folder'
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
      chooseOption: 'Click on one of the options.'
    },
    cookie: {
      part1: "இந்த வலைத்தளத்தைப் பயன்படுத்துவதன் மூலம் நீங்கள் எங்களுடன் உடன்படுகிறீர்கள் என்று அறிவிக்கிறீர்கள்",
      part2: "மற்றும்",
      part3: '.',
      link1: "தனியுரிமைக் கொள்கை",
      link2: "பயன்பாட்டு விதிமுறைகளை",
      button: "ஒப்புக்கொள்கிறேன்"
    }
  }
};
export const instanceLandingData: InstanceLandingData = {
  lang: "ta",
  strings: {
    vision: "நாம் சமமான கல்வி வாய்ப்புகளை நோக்கி இணைந்து பணிபுரியும் ஒரு குழு. இந்த இணையத்தளத்தில் எண்ணற்ற விவரக் கட்டுரைகள், பயிற்சிகள் மற்றும் ஒலிப் பேழைகள் அனைத்துப் பாடங்களுக்கும் வழங்கப்பட்டுவருகின்றன. இவை அனைத்தும் இலவசமாக உலகம் முழுவதும் உள்ள மாணவர்களுக்காக உருவாக்கப்பட்டுவருகின்றன. இனி வரும் காலங்களில், தமிழ்மொழியிலும் இவ்வாறான இலவசப் பாடத்திட்டங்களை உருவாக்க நீங்களும் எம்முடன் இணைந்து பணியாற்றலாம்.",
    learnMore: "மேலும் அறிக",
    democraticallyStructured: "ஜனநாயக ரீதியாக",
    nonProfit: "இலாப நோக்கற்றது",
    transparent: "ஒளி புகும்",
    openlyLicensed: "திறந்த உரிமம்",
    adFree: "விளம்பரமின்றி",
    freeOfCharge: "இலவசம்",
    wikiTitle: "Serlo ஓர் கற்றலுக்கான விக்கிபீடியா",
    wikiText: "Serlo.org விக்கிபீடியாபோல திறந்த உரிமம் கொண்ட ஓர் இணையத்தளம். இது எம் எழுத்தாளர் குழுவால் உருவாக்கப்படுகின்றது.",
    movementTitle: "நீங்களும் இதில் பணியாற்றலாம்",
    callForAuthors: "ஆசிரியர்களும் ஆர்வமுள்ள எழுத்தாளர்களும் பாடங்களை உருவாக்க பல வழிகளில் உதவலாம். புதுப் பயிற்சிகளை உருவாக்குவதற்கும் இந்தத் தளத்தின் சில உள்ளடக்கங்களை இன்னும் மேம்படுத்துவதற்கும் நீங்கள் உதவலாம். அதற்கு கீழுள்ள இணையத்திற்குச் செல்லவும்.",
    communityLink: "எழுத்தாளருக்கான பக்கத்தைப் பார்வையிடவும்",
    callForOther: "நாங்கள் பல வகையான வேலைவாய்ப்புகளையும் பொதுச்சேவையாகப் பணியாற்றும் வாய்ப்புகளையும் வழங்குகின்றோம். இந்த இணையத்தளதிற்கு மொழிபெயர்ப்பாளர்கள், வடிவமைப்பாளர்கள், தொலைத்தொடர்பாளர்கள் போன்ற துறை சார்ந்தவர்களை நாங்கள் தேடி நிற்கின்றோம். இணைந்து கொள்ளுங்கள்.",
    getInvolved: "நீங்களும் ஈடுபடுங்கள்!"
  }
};
export const serverSideStrings: ServerSideStrings = {
  title: "Serlo உடன் கற்றுக்கொள்ளுங்கள்!"
};
export const loggedInData: LoggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: "Notifications",
    icon: 'notifications'
  }, {
    url: '',
    title: 'User',
    icon: 'user',
    children: [{
      url: '/user/public',
      title: 'Public profile'
    }, {
      url: '/user/settings',
      title: 'Edit profile'
    }, {
      url: '/auth/password/change',
      title: 'Change password'
    }, {
      url: '/event/history/user/me',
      title: 'Recent activities'
    }, {
      url: '/api/auth/logout',
      title: 'Log out'
    }]
  }],
  strings: {
    tools: "Weitere Tools"
  }
};