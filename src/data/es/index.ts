import { headerData, footerData } from './menu-data';
export const instanceData = {
  lang: "es",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "La Plataforma para el Aprendizaje Abierto",
      search: "Buscar",
      login: "Ingresar"
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
      article: "Artículo",
      course: "Curso",
      video: "Vídeo",
      applet: 'Applet',
      folder: "Carpeta",
      exercises: "Ejercicios"
    },
    entities: {
      topicFolder: "Carpeta de ejercicios",
      comment: "Comentar",
      revision: "Revisión",
      thread: "Tema"
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
      showPages: "Mostrar descripción del curso",
      pages: "Descripción del curso",
      next: "Siguiente"
    },
    content: {
      show: "mostrar",
      hide: "ocultar",
      prerequisite: "Para este ejercicio se necesitan los siguientes conocimientos básicos:",
      solution: "Solución",
      exerciseGroup: "Grupo de ejercicios",
      right: "Correcto",
      wrong: "Incorrecto",
      check: "Comprobar",
      yourAnswer: "Tu respuesta...",
      chooseOption: "Elige una de las opciones."
    },
    cookie: {
      part1: "Al utilizar este sitio web, declara que acepta nuestra",
      part2: "y",
      part3: '.',
      link1: "Política de privacidad",
      link2: "Términos de uso",
      button: "Aceptar"
    },
    notifications: {
      notifications: "Notificaciones",
      pleaseLogInLink: 'Bitte melde dich an',
      pleaseLogInText: 'um deine Benachrichtigungen zu sehen.'
    }
  }
};
export const instanceLandingData = {
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
export const serverSideStrings = {
  title: "Aprende con Serlo!"
};
export const loggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: "notifications",
    icon: 'notifications'
  }, {
    url: '',
    title: "user",
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
    tools: "Otras herramientas",
    notifications: {
      loadMore: 'Weitere laden',
      unknownProblem: 'Es gibt ein Problem beim laden der Benachrichtigungen, bitte versuche es später noch einmal.',
      loading: 'Benachrichtigungen werden geladen',
      hide: 'Benachrichtigungen für diesen Inhalt nicht mehr anzeigen.',
      setThreadStateArchived: '%actor% hat einen %thread% archiviert.',
      setThreadStateUnarchived: '%actor% hat einen %thread% unarchiviert.',
      createComment: '%actor% hat einen %comment% in einem %thread% erstellt.',
      createThread: '%actor% hat einen %thread% in einem %object% erstellt.',
      createEntity: '%actor% hat %object% erstellt.',
      setLicense: '%actor% hat die Lizenz von %repository% geändert.',
      createEntityLink: '%actor% hat %child% mit %parent% verknüpft.',
      removeEntityLink: '%actor% hat die Verknüpfung von %child% mit %parent% entfernt.',
      createEntityRevision: '%actor% hat eine %revision% von %entity% erstellt.',
      checkoutRevision: '%actor% hat eine %revision% von %repository% übernommen.',
      rejectRevision: '%actor% hat %revision% für %repository% abgelehnt.',
      createTaxonomyLink: '%actor% hat %child% in %parent% eingeordnet.',
      removeTaxonomyLink: '%actor% hat %child% aus %parent% entfernt.',
      createTaxonomyTerm: '%actor% hat den %term% erstellt.',
      setTaxonomyTerm: '%actor% hat den %term% geändert.',
      setTaxonomyParentDeleted: '%actor% hat den Elternknoten von %child% entfernt.',
      setTaxonomyParentChangedFrom: '%actor% hat den Elternknoten von %child% von %previousparent% auf %parent% geändert.',
      setTaxonomyParentChanged: '%actor% hat den Elternknoten von %child% auf %parent% geändert.',
      setUuidStateTrashed: '%actor% hat %object% in den Papierkorb verschoben.',
      setUuidStateRestored: '%actor% hat %object% aus dem Papierkorb wieder hergestellt.',
      entityPlaceholderPage: 'Seite',
      entityPlaceholderArticle: "Artículo",
      entityPlaceholderVideo: "Vídeo",
      entityPlaceholderApplet: 'Applet',
      entityPlaceholderCoursePage: 'Kursseite',
      entityPlaceholderExercise: 'Aufgabe',
      entityPlaceholderGroupedExercise: 'gruppierte Aufgabe',
      entityPlaceholderExerciseGroup: 'Aufgabengruppe',
      entityPlaceholderEvent: "Evento",
      entityPlaceholderCourse: "Curso",
      entityPlaceholderTaxonomyTerm: 'Begriff',
      entityPlaceholderFallback: 'Inhalt'
    }
  }
};