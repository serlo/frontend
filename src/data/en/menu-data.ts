import { serloDomain } from '../../helper/serlo-domain'
import { InstanceData, LandingSubjectsData } from '@/data-types'

export const landingSubjectsData: LandingSubjectsData = {
  subjects: [
    { url: '/23591', title: 'Mathematics', icon: 'math' },
    { url: '/63179', title: 'Applied Sustainability', icon: 'sustainability' },
  ],
  additionalLinks: [],
}

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'Subjects',
    icon: 'subject',
    children: [
      { url: '/63179', title: 'Applied Sustainability' },
      { url: '/23591', title: 'Mathematics' },
      { url: '/106103', title: 'Subjects under construction' },
    ],
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
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'General',
      children: [
        { title: 'About Serlo', url: '/serlo' },
        { title: 'Get involved!', url: '/27469' },
        { title: 'Contact', url: '/41043' },
        {
          title: 'Serlo in other languages',
          url: `/global`,
        },
        {
          title: 'API',
          url: `/105250`,
        },
      ],
    },
    {
      title: 'Stay in touch',
      children: [
        {
          title: 'Newsletter',
          url: 'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
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
        { title: 'Privacy Policy', url: `https://en.${serloDomain}/privacy` },
        {
          title: 'Revoke consent',
          url: `/consent`,
        },
        {
          title: 'Terms of use',
          url: `https://en.${serloDomain}/terms`,
        },
        { title: 'Imprint', url: `/imprint` },
      ],
    },
  ],
  aboutHref: '/serlo',
  participationHref: '/27469',
  donationHref: '/spenden',
}

export const taxonomyMenus: InstanceData['taxonomyMenus'] = {
  // Math
  23591: [
    { title: 'Topics', id: 23593 },
    { title: 'New here?', id: 49386 },
    { title: 'Guidelines', id: 48345 },
    { title: 'Edit Taxonomy', url: '/taxonomy/term/organize/23593' },
  ],
  //Musik
  48415: [
    { title: 'Music', id: 48404 },
    { title: 'Topics', id: 48415 },
  ],
  //Applied Sustainability
  63179: [
    { title: 'Topics', id: 112089 },
    { title: 'New here?', id: 56861 },
    { title: 'Guidelines', id: 56677 },
    { title: 'Edit Taxonomy', url: '/taxonomy/term/organiid8416' },
  ],
  //Sex Education
  78339: [
    { title: 'Sex Education', id: 78337 },
    { title: 'Topics', id: 78339 },
  ],
  //Community
  48537: [
    { title: 'Community', id: 35587 },
    { title: 'Help for Editors', id: 84500 },
    { title: 'New Subjects and Topics', id: 106103 },
    { title: 'Sandbox for Authors', id: 106102 },
    { title: 'All Activities on Serlo', url: '/event/history' },
    { title: 'All Discussions', url: '/discussions' },
    { title: 'Start new Serlo teams', id: 48538 },
    { title: 'Community Values', id: 48210 },
    { title: 'Community Overview', id: 48537 },
  ],
}

export const pageMenus: InstanceData['pageMenus'] = [
  [
    { title: 'About Serlo', id: 23727 },
    { title: 'How to learn with serlo.org', id: 110332 },
    { title: 'Impact', id: 110335 },
    { title: 'Team', id: 32840 },
    { title: 'Partners and Donors', id: 110337 },
    { title: 'Serlo.org in other languages', id: 93321 },
  ],
  [
    { title: 'Get Involved!', id: 27469 },
    { title: 'Contact', id: 41043 },
  ],
]
