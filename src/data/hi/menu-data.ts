import { serloDomain } from '../../helper/urls/serlo-domain'
import { FooterIcon, InstanceData, LandingSubjectsData } from '@/data-types'

export const landingSubjectsData: LandingSubjectsData = {
  subjects: [],
  additionalLinks: [],
}

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'विषय',
    icon: 'subject',
    children: [{ url: '/167908', title: 'निर्माणाधीन विषयों' }],
  },
  { url: '/112510', title: 'सेर्लो के बारे में', icon: 'about' },
  { url: '/112518', title: 'उलझना!', icon: 'participate' },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'Products',
      children: [
        {
          title: 'Serlo Editor',
          url: `https://en.${serloDomain}/editor`,
        },
        {
          title: 'Metadata API',
          url: `https://en.${serloDomain}/metadata`,
        },
        {
          title: 'iFrame API',
          url: 'https://github.com/serlo/documentation/wiki/iframe-API',
        },
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: FooterIcon.github,
        },
      ],
    },
    {
      title: 'कानूनी शर्तें',
      children: [
        { title: 'गोपनीयता की नीति', url: `https://de.${serloDomain}/privacy` },
        {
          title: 'Revoke consent',
          url: `/consent`,
        },
        {
          title: 'नियम और शर्ते',
          url: `https://de.${serloDomain}/terms`,
        },
        { title: 'Legal Notice', url: `https://de.${serloDomain}/legal` },
      ],
    },
  ],
  aboutHref: '/112510',
  participationHref: '/112518',
  donationHref: '/spenden',
}

export const secondaryMenus: InstanceData['secondaryMenus'] = [
  {
    entries: [
      { title: 'सेर्लो के बारे में', id: 112510 },
      { title: 'सर्लो के साथ कैसे सीखें?', id: 185252 },
      { title: 'प्रभाव', id: 185250 },
      { title: 'टीम', id: 206300 },
      { title: 'भागीदार और दाता', id: 185257 },
      { title: 'अन्य भाषाओं में सेर्लो', id: 185259 },
    ],
  },
  {
    entries: [
      { title: 'समुदाय', id: 195674 },
      { title: 'सैंडबॉक्स', id: 197295 },
      { title: 'सामुदायिक मूल्यों', id: 197268 },
    ],
  },
]
