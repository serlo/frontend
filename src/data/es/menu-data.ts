import { serloDomain } from '../../helper/urls/serlo-domain'
import { FooterIcon, InstanceData, LandingSubjectsData } from '@/data-types'

export const landingSubjectsData: LandingSubjectsData = {
  subjects: [
    { url: '/matemáticas', title: 'Aprender matemáticas', icon: 'math' },
    {
      url: '/241982/sostenibilidad-aplicada',
      title: 'Sostenibilidad aplicada',
      icon: 'sustainability',
    },
    {
      url: '/229701/estudios-en-diásporas-africanas-para-la-escuela',
      title: 'Diásporas Africanas',
      icon: 'geography',
    },
  ],
  additionalLinks: [
    {
      url: '/195616/p%C3%A1gina-de-inicio-para-padres',
      title: 'Información para los padres',
    },
    {
      url: '/195618/p%C3%A1gina-de-inicio-para-docentes',
      title: 'Información para docentes',
    },
  ],
}

export const headerData: InstanceData['headerData'] = [
  {
    url: '',
    title: 'Temas',
    icon: 'subject',
    children: [
      { url: '/matemáticas', title: 'Matemáticas' },
      {
        url: '/241982/sostenibilidad-aplicada',
        title: 'Sostenibilidad aplicada',
      },
      {
        url: '/229701/estudios-en-diásporas-africanas-para-la-escuela',
        title: 'Estudios en Diásporas Africanas',
      },
      { url: '/community/sandbox', title: 'Test Area' },
    ],
  },
  { url: '/serlo', title: 'Sobre Serlo', icon: 'about' },
  { url: '/participa', title: '¡Participa!', icon: 'participate' },
  {
    url: '',
    title: 'Comunidad',
    icon: 'community',
    children: [
      {
        url: '/community',
        title: 'Página para autores',
      },
      { url: 'https://community.serlo.org/', title: 'Chat para autores' },
      { url: '/170539', title: 'Páginas de ayuda' },
      { url: '/entity/unrevised', title: 'Cambios en revisión' },
      { url: '/discussions', title: 'Todos los comentarios' },
    ],
  },
]

export const footerData: InstanceData['footerData'] = {
  footerNavigation: [
    {
      title: 'Configuración General',
      children: [
        { title: 'A cerca de Serlo', url: '/serlo' },
        { title: 'Contactanos', url: '/181414' },
        {
          title: 'Serlo en otros idiomas',
          url: `https://en.${serloDomain}/global`,
        },
      ],
    },
    {
      title: 'Mantente en contacto',
      children: [{ title: '¡Participa!', url: '/participa' }],
    },
    {
      title: 'Products',
      children: [
        {
          title: 'GitHub',
          url: 'https://github.com/serlo',
          icon: FooterIcon.github,
        },
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
      title: 'Términos legales',
      children: [
        {
          title: 'Politica de privacidad',
          url: `https://es.${serloDomain}/privacy`,
        },
        {
          title: 'Revoke consent',
          url: `/consent`,
        },
        {
          title: 'Términos legales',
          url: `https://es.${serloDomain}/terms`,
        },
        { title: 'Imprint', url: `https://es.${serloDomain}/imprint` },
      ],
    },
  ],
  aboutHref: '/serlo',
  participationHref: '/participa',
  donationHref: '/spenden',
}

export const secondaryMenus: InstanceData['secondaryMenus'] = [
  {
    // subject: 'estudios en diásporas africanas para la escuela',
    rootId: 242308,
    landingUrl: '/229701/estudios-en-diásporas-africanas-para-la-escuela',
    entries: [
      { title: 'Todos los temas', id: 242308 },
      { title: '¿Eres nuevo aquí?', id: 180775 },
    ],
  },
  {
    // subject: 'sostenibilidad aplicada',
    rootId: 242851,
    landingUrl: '/241982/sostenibilidad-aplicada',
    entries: [{ title: '¿Eres nuevo aquí?', id: 180775 }],
  },
  {
    // subject: "matemáticas'",
    rootId: 169580,
    landingUrl: '/matemáticas',
    entries: [
      { title: 'Todos los temas', id: 169580 },
      { title: ' ¿Eres nuevo aquí?', id: 180775 },
    ],
  },
  {
    // comunidad
    rootId: 164234,
    landingUrl: '/community',
    entries: [
      { title: 'Páginas de ayuda', id: 170539 },
      { title: ' Recursos para educadores', id: 182103 },
      { title: 'Test Area', id: 164237 },
      { title: 'Todas las actividades', url: '/event/history' },
      { title: 'Todos los comentarios', url: '/discussions' },
      { title: 'Operaciones en revisión', url: '/entity/unrevised' },
    ],
  },
  {
    // about serlo
    entries: [
      { title: 'A cerca de Serlo', id: 112249 },
      { title: 'Así funciona la plataforma de aprendizaje', id: 195620 },
      { title: 'Concepto pedagógico', id: 170419 },
      { title: 'Equipo', id: 181476 },
      { title: 'Socios y Patrocinadores', id: 198326 },
      { title: 'Impacto', id: 209934 },
      { title: 'Transparencia', id: 209929 },
    ],
  },
  {
    // get involved
    entries: [
      { title: 'Participa', id: 112252 },
      { title: 'Contacto y ubicación', id: 181414 },
    ],
  },
]
