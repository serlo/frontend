import { headerData, footerData, landingSubjectsData } from './menu-data';
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
    search: {
      privacy: "La búsqueda es proporcionada por Google. Vea nuestra  %privacypolicy%  para saber qué información se procesa.",
      agree: "Estoy de acuerdo"
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
      articles: "Artículos",
      courses: "Cursos",
      videos: "Vídeos",
      applets: 'Applets',
      folders: "Carpetas",
      exercises: "Ejercicios",
      events: "Eventos"
    },
    entities: {
      applet: 'Applet',
      article: "Artículo",
      course: "Curso",
      coursePage: "Página del curso",
      event: "Evento",
      exercise: "Ejercicio",
      exerciseGroup: "Grupo de ejercicios",
      folder: "Carpeta",
      groupedExercise: "Ejercicio agrupado",
      page: "Página",
      solution: "Solución",
      taxonomyTerm: "Término de taxonomía",
      user: "Usuario",
      video: "Vídeo",
      topicFolder: "Carpeta de ejercicios",
      comment: "Comentario",
      revision: "Revisión",
      thread: "Hilo de conversación",
      threads: "Hilo de conversación",
      topic: "Tema",
      subject: "Asunto",
      userProfile: "Perfil de usuario",
      privacyPolicy: "Política de privacidad",
      content: "Contenido"
    },
    pageTitles: {
      notifications: "Tus notificaciones",
      subscriptions: "Administra las suscripciones",
      revisionHistory: "Revision History"
    },
    roles: {
      donor: "Donante",
      author: "Autor",
      reviewer: "Revisor"
    },
    share: {
      button: "Compartir",
      title: "Compartir",
      copyLink: "Copiar link",
      copySuccess: "Enlace copiado",
      close: "Cerca"
    },
    edit: {
      button: "Editar",
      unrevised: "Mostrar revisiones sin revisar"
    },
    license: {
      readMore: "Información",
      special: 'Different license',
      nonFree: 'Usage of this content might be more restricted than our other content.'
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
      task: "Tarea",
      right: "Correcto",
      wrong: "Incorrecto",
      check: "Revisa tu respuesta",
      yourAnswer: "Tu respuesta...",
      chooseOption: "Elige una de las opciones.",
      trashedNotice: "Este contenido está marcado para su eliminación.",
      strategy: 'Solution Strategy'
    },
    consent: {
      title: "Consentimiento para contenido externo",
      intro: "Al utilizar este sitio, puedes permitirnos cargar contenido de proveedores externos. Puedes leer los detalles en la %privacypolicy%.",
      revokeTitle: "Revocar",
      revokeText: "Aquí puedes revocar tu consentimiento. En este caso te lo volvemos a preguntar antes de cargar el contenido de esos proveedores",
      noConsent: "No hay contenido guardado.",
      revokeConsent: "Revocar el consentimiento"
    },
    embed: {
      text: "Al hacer clic en la imagen o en el botón superior, aceptas que se cargará el contenido externo del %provider% . También los datos personales pueden ser transferidos a este servicio de acuerdo con nuestro %privacypolicy%.",
      video: "Reproducir vídeo del %provider%",
      applet: "Cargar Applet del %provider%",
      twingle: "Cargar formulario de donación"
    },
    comments: {
      question: "¿Tienes una pregunta?",
      commentsOne: "Comentario",
      commentsMany: "Comentarios",
      submit: "Enviar",
      archiveThread: "Archivar hilo de la conversación",
      restoreThread: 'Restore thread',
      deleteThread: "Eliminar hilo de la conversación",
      deleteComment: "Eliminar comentario",
      postedOn: "Publicado el",
      placeholder: "Tus preguntas o sugerencias...",
      placeholderReply: "Tu respuesta...",
      loading: "Buscando comentarios ...",
      error: "Lo sentimos, no se han podido cargar los comentarios. Inténtalo de nuevo más tarde.",
      showMoreReply: "Mostrar una respuesta más",
      showMoreReplies: "Mostrar %number% respuestas más",
      showArchived: "Mostrar archivados %threads%",
      copyLink: "Copiar el vínculo del comentario"
    },
    revisions: {
      toOverview: "Volver a Vista general",
      changes: "Cambios",
      title: "Título",
      content: "Contenido",
      metaTitle: "Meta Título",
      metaDescription: "Meta Descripción",
      compare: "Comparar",
      currentVersion: "Versión Actual",
      thisVersion: "Esta Versión",
      thisIsCurrentVersion: "Esta es la versión aceptada actualmente.",
      by: "Por"
    },
    revisionHistory: {
      changes: 'Changes',
      author: 'Author',
      date: 'Date',
      createNew: 'Create a new revision starting from this specific revision'
    },
    errors: {
      title: "😬 Los sitios web a veces cometen errores…",
      defaultMessage: "Lo sientimos, hemos encontrado un problema al cargar este contenido.",
      temporary: "¿La buena noticia? El problema parece ser temporal, así que por favor inténtalo de nuevo más tarde.",
      permanent: "Veremos qué podemos hacer al respecto… ",
      typeNotSupported: "Por favor, intenta volver a cargar está página.",
      refreshNow: "Actualizar ahora",
      backToPrevious: "Volver a la página anterior",
      backToHome: "Ir a la página de inicio"
    },
    print: {
      warning: 'IMPORTANT: To make sure all images and formulas print, please scroll down to the end of the page once BEFORE you open this dialog. Thank you!'
    },
    profiles: {
      aboutMe: "Sobre mi",
      activeSince: 'With Serlo since',
      recentActivities: "Actividades recientes",
      showAllActivities: "Mostrar todas las actividades",
      lastLogin: 'Last login',
      roles: "Roles (funciones)",
      directMessage: 'Direct message'
    },
    notices: {
      welcome: "¡Bienvenida/o  %username%!",
      bye: "👋 ¡Nos vemos pronto!",
      revisionSaved: "La revisión se ha guardado y se revisará pronto :thumbnail s_up:",
      revisionAccepted: "Revisión aceptada con éxito ✅",
      revisionRejected: "Revisión rechazada con éxito ❎",
      revisionSavedAccepted: "Revisión guardada y aceptada con éxito ✅"
    },
    loading: {
      isLoading: "El contenido está cargando…",
      unknownProblem: "Lo sentimos, hubo un problema al cargar el contenido, por favor inténtalo de nuevo más tarde."
    },
    login: {
      pleaseLogInLink: "Por favor, inicia sesión",
      pleaseLogInText: "para utilizar esta función. "
    },
    keys: {
      ctrl: 'ctrl',
      return: 'return'
    }
  }
};
export const instanceLandingData = {
  lang: "es",
  subjectsData: landingSubjectsData,
  strings: {
    vision: "Somos una organización de base comunitaria sin ánimo de lucro que apoya el aprendizaje personalizado y trabajando por la igualdad de oportunidades educativas. Esta plataforma de aprendizaje ofrece miles de artículos de instrucción, videos de aprendizaje y ejercicios de práctica para millones de estudiantes en todo el mundo - completamente gratis. Ahora es el momento de unirte a nosotros en tu idioma.",
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
  title: "¡Aprende con Serlo!"
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
      url: '/subscriptions/manage',
      title: "Subscripciones"
    }, {
      url: '/api/auth/logout',
      title: "Cerrar sesión"
    }]
  }],
  strings: {
    tools: "Otras herramientas",
    authorMenu: {
      log: 'Log',
      settings: "Configuración",
      moveCoursePage: "Mueve esta página a otro curso",
      thisCoursePage: "Esta página del curso",
      addCoursePage: "Agregar página de curso",
      wholeCourse: "Curso completo",
      copyItems: "Copiar elementos",
      moveItems: "Mover elementos",
      addGroupedTextExercise: "Añade un grupo de ejercicios de texto",
      changeLicense: "Cambiar licencia",
      subscribe: "Subscribir",
      subscribeNotifications: "Recibir notificaciones",
      subscribeNotificationsAndMail: "Recibir notificaciones y correos electrónicos",
      unsubscribeNotifications: "Cancelar suscripción",
      convert: "Convertir (beta)",
      history: "Historial",
      editAssignments: "Editar el tema y las asignaciones de currículo",
      moveToTrash: "Mover a la papelera",
      restoreContent: "Restaurar de la papelera",
      sort: "Ordenar los niños",
      edit: "Modificar",
      organize: "Organizar",
      moveToGroupedTextExercise: "Mover contenido a otro grupo de ejercicios de texto",
      moveToTextExercise: "Mover contenido a otro ejercicio de texto",
      sortEntities: "Ordenar contenido",
      newEntity: "Nueva Entidad",
      editProfile: "Editar perfil"
    },
    notifications: {
      loadMore: "Cargar más",
      hide: "Ocultar notificaciones para este contenido.",
      setThreadStateArchived: "%actor% archivado %thread%",
      setThreadStateUnarchived: "%actor% restaurado %thread%.",
      createComment: "%actor% comentado en %thread%: %comment%.",
      createThread: "%actor% ha iniciado %thread% en %object%.",
      createEntity: "%actor% creó %object%.",
      setLicense: "%actor% cambió la licencia de %repository%.",
      createEntityLink: "%actor% vinculado %child% con %parent%.",
      removeEntityLink: "%actor% desvinculado %child% de %parent%.",
      createEntityRevision: "%actor% creó un %revision% de %entity%.",
      checkoutRevision: "%actor% ha verificado %revision% en %repository%",
      rejectRevision: "%actor% rechazó  %revision% en%repository%.",
      createTaxonomyLink: "%actor% agregó %child% a %parent%.",
      removeTaxonomyLink: "%actor% eliminó a %child% de %parent%.",
      createTaxonomyTerm: "%actor% creó %term%.",
      setTaxonomyTerm: "%actor% actualizó %term%.",
      setTaxonomyParentDeleted: "%actor% eliminó el padre de %child%.",
      setTaxonomyParentChangedFrom: "%actor% cambió el padre de %child% de  %previousparent% a %parent%.",
      setTaxonomyParentChanged: "%actor% cambió el padre de %child% a %parent%.",
      setUuidStateTrashed: "%actor% envió a la papelera %object%.",
      setUuidStateRestored: "%actor% restauró %object%.",
      entityPlaceholderFallback: "Contenido"
    },
    subscriptions: {
      mail: "E-mails",
      subscription: "Suscripción",
      noMails: "desactivar",
      noNotifications: "cancelar"
    },
    revisions: {
      accept: {
        action: 'Accept',
        title: 'Accept Revision',
        explanation: 'Please give the author some feedback.'
      },
      reject: {
        action: 'Reject',
        title: 'Reject Revision',
        explanation: 'Please tell the author why you are rejecting the submission.'
      },
      confirm: 'Confirm'
    }
  }
};