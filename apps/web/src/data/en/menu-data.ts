import { serloDomain } from '../../helper/urls/serlo-domain'
import { FooterIcon, InstanceData, LandingSubjectsData } from '@/data-types'

export const landingSubjectsData: LandingSubjectsData = {
  subjects: [
    { url: '/23591/mathematics-homepage', title: 'Mathematics', icon: 'math' },
    {
      url: '/63179/applied-sustainability',
      title: 'Applied Sustainability',
      icon: 'sustainability',
    },
  ],
  additionalLinks: [],
}

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'Subjects',
    icon: 'subject',
    children: [
      { url: '/63179/applied-sustainability', title: 'Applied Sustainability' },
      { url: '/23591/mathematics-homepage', title: 'Mathematics' },
      {
        url: '/community/106103/new-subjects-and-topics',
        title: 'Subjects under construction',
      },
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
      { url: '/discussions', title: 'List of all comments' },
    ],
  },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'General',
      children: [
        { title: 'About Serlo', url: '/serlo' },
        { title: 'Contact', url: '/41043' },
        {
          title: 'Serlo in other languages',
          url: `/global`,
        },
      ],
    },
    {
      title: 'Take part',
      children: [
        {
          title: 'Newsletter',
          url: 'https://serlo.us7.list-manage.com/subscribe?u=23f4b04bf70ea485a766e532d&amp;id=a7bb2bbc4f',
          icon: FooterIcon.newsletter,
        },
        {
          title: 'Jobs',
          url: `https://de.${serloDomain}/jobs`,
          icon: FooterIcon.job,
        },
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: FooterIcon.github,
        },
        { title: 'Community', url: '/27469' },
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
        { title: 'Legal Notice', url: `/legal` },
      ],
    },
  ],
  aboutHref: '/serlo',
  participationHref: '/27469',
  donationHref: '/spenden',
}

export const secondaryMenus: InstanceData['secondaryMenus'] = [
  {
    // subject: 'math',
    rootId: 23593,
    landingUrl: '/23591/mathematics-homepage',
    entries: [
      { title: 'Topics', id: 23593 },
      { title: 'New here?', id: 49386 },
      { title: 'Guidelines', id: 48345 },
    ],
  },
  {
    // subject: 'music',
    rootId: 48415,
    landingUrl: '/48404/music',
    entries: [{ title: 'Topics', id: 48415 }],
  },
  {
    // subject: 'sustainability',
    rootId: 112089,
    landingUrl: '/63179/applied-sustainability',
    entries: [
      { title: 'Topics', id: 112089 },
      { title: 'New here?', id: 56861 },
      { title: 'Guidelines', id: 56677 },
      { title: 'Edit Taxonomy', url: '/taxonomy/term/organiid8416' },
    ],
  },
  {
    // subject: 'sex-education',
    rootId: 78339,
    landingUrl: '/78337/sex-education',
    entries: [{ title: 'Topics', id: 78339 }],
  },
  {
    rootId: 35587,
    entries: [
      { title: 'Community', id: 35587 },
      { title: 'Help for Editors', id: 84500 },
      { title: 'New Subjects and Topics', id: 106103 },
      { title: 'Test Area for Authors', id: 106102 },
      { title: 'All Activities on Serlo', url: '/event/history' },
      { title: 'All Discussions', url: '/discussions' },
      { title: 'Start new Serlo teams', id: 48538 },
      { title: 'Community Values', id: 48210 },
      { title: 'Community Overview', id: 48537 },
    ],
  },
  {
    entries: [
      { title: 'About Serlo', id: 23727 },
      { title: 'How to learn with serlo.org', id: 110332 },
      { title: 'Impact', id: 110335 },
      { title: 'Team', id: 32840 },
      { title: 'Partners and Donors', id: 110337 },
      { title: 'Serlo.org in other languages', id: 93321 },
    ],
  },
  {
    entries: [
      { title: 'Get Involved!', id: 27469 },
      { title: 'Contact', id: 41043 },
    ],
  },
]
