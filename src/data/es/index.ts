import { headerData, footerData } from './menu-data';
import { InstanceData, ServerSideStrings, LoggedInData, InstanceLandingData } from '@/data-types';
export const instanceData: InstanceData = {
  lang: "es",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "La Plataforma para el Aprendizaje Abierto",
      search: "Buscar",
      login: 'Login'
    },
    footer: {
      summaryHeading: "Serlo.org es la Wikipedia para el aprendizaje.",
      summaryText: "Somos una comunidad de visionarios que trabajan sin descanso para que todo el mundo tenga acceso gratuito a una educación excelente.",
      learnMore: "Aprende más",
      participate: "Únete a la causa",
      donate: "Donaciones",
      toTop: "a la cima"
    },
    categories: {
      article: 'Article',
      course: 'Course',
      video: 'Video',
      applet: 'Applet',
      folder: 'Folder',
      exercises: 'Exercises'
    },
    share: {
      button: "Compartir",
      title: "Compartir",
      copyLink: "Copiar link",
      copySuccess: "Enlace copiado",
      close: "Cerca"
    },
    edit: {
      button: "Editar"
    },
    license: {
      readMore: "Información"
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
      part1: "Al utilizar este sitio web, declara que acepta nuestra",
      part2: "y",
      part3: '.',
      link1: "Política de privacidad",
      link2: "Términos de uso",
      button: "Aceptar"
    }
  }
};
export const instanceLandingData: InstanceLandingData = {
  lang: "es",
  strings: {
    vision: "Somos una organización de base comunitaria sin ánimo de lucro que apoya el aprendizaje personalizado y trabajando por la igualdad de oportunidades educativas. Esta plataforma de aprendizaje ofrece miles de artículos de instrucción, videos de aprendizaje y ejercicios de práctica para millones de estudiantes en todo el mundo - completamente gratis. Ahora es el momento de unirse a nosotros en tu idioma.",
    learnMore: "Aprende más",
    democraticallyStructured: "estructurado democráticamente",
    nonProfit: "sin ánimo de lucro",
    transparent: "transparente",
    openlyLicensed: "con licencia abierta",
    adFree: "sin publicidad",
    freeOfCharge: "gratuito",
    wikiTitle: "Serlo es la Wikipedia para el Aprendizaje",
    wikiText: "Al igual que Wikipedia, esta plataforma es creada por una comunidad de autores comprometidos con la educación. “Serlo Education” es propiedad de varios equipos descentralizados de voluntarios y profesionales, y manejado por ellos mismos alrededor del mundo.",
    movementTitle: "Conviértete en Parte de Nuestro Movimiento para la Educación Abierta",
    callForAuthors: "Estamos buscando profesores, maestros y educadores entusiastas a quienes les apasionen las materias que enseñan. ¡Conviértete en un autor en serlo.org! Tu puedes crear nuevo material de aprendizaje y ayudarnos a mejorar el contenido existente.",
    communityLink: "Visita la página para autores",
    callForOther: "Nosotros ofrecemos una diversa gama de trabajo y oportunidades de voluntariado, dentro del campo del desarrollo de software, diseño, traducción, comunicación, administración de proyectos, y más.",
    getInvolved: "¡Participa!"
  }
};
export const serverSideStrings: ServerSideStrings = {
  title: "Aprende con Serlo!"
};
export const loggedInData: LoggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: 'Benachrichtigungen',
    icon: 'notifications'
  }, {
    url: '',
    title: "Benutzer",
    icon: 'user',
    children: [{
      url: '/user/public',
      title: "Perfil público"
    }, {
      url: '/user/settings',
      title: "Editar perfil"
    }, {
      url: '/auth/password/change',
      title: "Actualizar contraseña"
    }, {
      url: '/event/history/user/me',
      title: "Actividades recientes"
    }, {
      url: '/api/auth/logout',
      title: "Cerrar sesión"
    }]
  }],
  strings: {
    tools: "Otras herramientas"
  }
};