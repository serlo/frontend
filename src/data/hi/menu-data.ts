import { serloDomain } from '../../helper/serlo-domain'
import { InstanceData, LandingSubjectsData } from '@/data-types'

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
        { title: 'Imprint', url: `https://de.${serloDomain}/imprint` },
      ],
    },
  ],
  aboutHref: '/112510',
  participationHref: '/112518',
  donationHref: '/spenden',
}
