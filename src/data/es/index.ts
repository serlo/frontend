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
    authorMenu: {
      log: 'Log',
      settings: 'Settings',
      moveCoursePage: 'Move this page to another course',
      thisCoursePage: 'This course-page',
      addCoursePage: 'Add course-page',
      wholeCourse: 'Whole course',
      copyItems: 'Copy items',
      moveItems: 'Move items',
      addGroupedTextExercise: 'Add grouped-text-exercise',
      changeLicense: 'Change License',
      subscribe: 'Subscribe',
      subscribeNotifications: 'Recieve notifications',
      subscribeNotificationsAndMail: 'Recieve notifications and emails',
      convert: 'Convert (beta)',
      history: 'History',
      editAssignments: 'Edit topic and curriculum assignments',
      flagContent: 'Flag content',
      moveToTrash: 'Move to trash',
      sort: 'Sort children',
      edit: 'Edit',
      organize: 'Organize',
      moveToGroupedTextExercise: 'Move content to other grouped-text-exercise',
      moveToTextExercise: 'Move content to other text-exercise'
    },
    notifications: {
      loadMore: "Load more",
      unknownProblem: "There was a problem loading the notifications, please try again later.",
      loading: "Loading notifications",
      hide: "Hide notifications for this content.",
      setThreadStateArchived: "%actor% archived %thread%.",
      setThreadStateUnarchived: "%actor% restored %thread%.",
      createComment: "%actor% commented in %thread%: %comment%.",
      createThread: "%actor% started %thread% on %object%.",
      createEntity: "%actor% created %object%.",
      setLicense: "%actor% changed the license of %repository%.",
      createEntityLink: "%actor% associated %child% with %parent%.",
      removeEntityLink: "%actor% dissociated %child% from %parent%.",
      createEntityRevision: "%actor% created a %revision% of %entity%.",
      checkoutRevision: "%actor% checked out %revision% in %repository%.",
      rejectRevision: "%actor% rejected a %revision% in %repository%.",
      createTaxonomyLink: "%actor% added %child% to %parent%.",
      removeTaxonomyLink: "%actor% removed %child% from %parent%.",
      createTaxonomyTerm: "%actor% created %term%.",
      setTaxonomyTerm: "%actor% updated %term%.",
      setTaxonomyParentDeleted: "%actor% removed the parent of %child%.",
      setTaxonomyParentChangedFrom: "%actor% changed parent of %child% from %previousparent% to %parent%.",
      setTaxonomyParentChanged: "%actor% changed parent of %child% to %parent%.",
      setUuidStateTrashed: "%actor% trashed %object%.",
      setUuidStateRestored: "%actor% restored %object%.",
      entityPlaceholderPage: "Page",
      entityPlaceholderArticle: "Article",
      entityPlaceholderVideo: 'Video',
      entityPlaceholderApplet: 'Applet',
      entityPlaceholderCoursePage: "Course page",
      entityPlaceholderExercise: "Exercise",
      entityPlaceholderGroupedExercise: "Grouped exercise",
      entityPlaceholderExerciseGroup: "Exercise group",
      entityPlaceholderEvent: 'Event',
      entityPlaceholderCourse: "Course",
      entityPlaceholderTaxonomyTerm: "Term",
      entityPlaceholderFallback: "Content"
    }
  }
};