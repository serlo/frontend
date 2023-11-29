import { serloDomain } from '../../helper/urls/serlo-domain'
import { FooterIcon, InstanceData, LandingSubjectsData } from '@/data-types'

export const landingSubjectsData: LandingSubjectsData = {
  subjects: [],
  additionalLinks: [],
}

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'Matières',
    icon: 'subject',
    children: [
      { url: '/141585', title: 'Mathématiques' },
      { url: '/conseils-pour-apprendre', title: 'Conseils pour apprendre' },
      { url: '/141604', title: 'Nouvelle matières' },
    ],
  },
  { url: '/141579', title: 'À propos de serlo', icon: 'about' },
  { url: '/141581', title: 'Participe!', icon: 'participate' },
  {
    url: '',
    title: 'Communauté',
    icon: 'community',
    children: [
      {
        url: '/141583',
        title: 'Page de démarrage pour les auteurs',
      },
      { url: 'https://community.serlo.org/', title: 'Chat pour les auteurs' },
      { url: '/entity/unrevised', title: 'Modifications non révisées' },
    ],
  },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'Général',
      children: [
        { title: 'À propos de serlo', url: '/141579' },
        { title: 'Contact', url: '/143390' },
        {
          title: "Serlo dans d'autres langues",
          url: `https://en.${serloDomain}/global`,
        },
      ],
    },
    {
      title: 'Restez en contact',
      children: [
        { title: 'Participes!', url: '/141581' },
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: FooterIcon.github,
        },
      ],
    },
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
      ],
    },
    {
      title: 'Termes juridiques',
      children: [
        { title: 'Privacy Policy', url: `https://de.${serloDomain}/privacy` },
        {
          title: 'Revoke consent',
          url: `/consent`,
        },
        {
          title: "Modalités d'utilisation",
          url: `https://de.${serloDomain}/terms`,
        },
        { title: 'Imprimer', url: `https://de.${serloDomain}/legal` },
      ],
    },
  ],
  aboutHref: '/serlo',
  participationHref: '/141581',
  donationHref: '/spenden',
}

export const secondaryMenus: InstanceData['secondaryMenus'] = [
  {
    // subject: 'conseils-pour-apprendre',
    rootId: 204968,
    landingUrl: '/conseils-pour-apprendre',
    entries: [{ title: 'Tous les thèmes', id: 204968 }],
  },
]
