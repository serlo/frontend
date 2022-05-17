import { serloDomain } from '../../helper/serlo-domain'
import { InstanceData, LandingSubjectsData } from '@/data-types'

export const landingSubjectsData: LandingSubjectsData = {
  subjects: [],
  additionalLinks: [],
}

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'பாடங்கள்',
    icon: 'subject',
    children: [
      { url: '/140522', title: 'இலக்கணம்' },
      { url: '/140524', title: 'வரலாறு' },
      { url: '/148667', title: 'அகராதி' },
    ],
  },
  { url: '/23727', title: 'Serlo பற்றி', icon: 'about' },
  {
    url: '/get-involved',
    title: 'நீங்களும் ஈடுபடுங்கள்!',
    icon: 'participate',
  },
  {
    url: '',
    title: 'சமூகC',
    icon: 'community',
    children: [
      {
        url: '/140520',
        title: 'ஆசிரியர்களுக்கான தொடக்க பக்கம்',
      },
      {
        url: 'https://community.serlo.org/',
        title: 'ஆசிரியர்களுக்கான அரட்டை',
      },
      { url: '/entity/unrevised', title: 'சரிபார்க்கப்படாத மாற்றங்கள்' },
    ],
  },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'பொதுவாக',
      children: [
        { title: 'Serlo பற்றி', url: '/serlo' },
        { title: 'நீங்களும் ஈடுபடுங்கள்!', url: '/get-involved' },
        { title: 'தொடர்பு', url: '/41043' },
        {
          title: 'பிற மொழிகளில் Serlo',
          url: `https://en.${serloDomain}/global`,
        },
        {
          title: 'API',
          url: `https://en.${serloDomain}/community/technology-and-development/content-api`,
        },
      ],
    },
    {
      title: 'தொடர்பில் இருக்கவும்',
      children: [
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: 'github',
        },
      ],
    },
    {
      title: 'சட்ட விதிமுறைகள்',
      children: [
        {
          title: 'தனியுரிமைக் கொள்கை',
          url: `https://de.${serloDomain}/privacy`,
        },
        {
          title: 'Revoke consent',
          url: `/consent`,
        },
        {
          title: 'பயன்பாட்டு விதிமுறைகளை',
          url: `https://de.${serloDomain}/terms`,
        },
        { title: 'முத்திரை', url: `https://de.${serloDomain}/imprint` },
      ],
    },
  ],
  aboutHref: '/serlo',
  participationHref: '/27469',
  donationHref: '/spenden',
}

export const taxonomyMenus: InstanceData['taxonomyMenus'] = {
  140527: [
    { title: 'இலக்கணம்', id: 140522 },
    { title: 'பாடங்கள்', id: 140527 },
  ],
}

export const pageMenus: InstanceData['pageMenus'] = []
