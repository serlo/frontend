import { licenses } from './license-data-short';
import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: "es",
  headerData,
  footerData,
  secondaryMenus,
  licenses,
  strings: {
    header: {
      slogan: "La Plataforma para el Aprendizaje Abierto",
      search: "Buscar",
      login: "Ingresar",
      skipLinks: {
        sentence: "Saltar a %content% o %footer%",
        content: "contenido",
        footer: "Pie de página"
      }
    },
    search: {
      privacy: "La búsqueda es proporcionada por Google. Mira  nuestra  %privacypolicy%  para saber qué información se procesa.",
      agree: "Acepta utilizar el motor de búsqueda"
    },
    footer: {
      summaryHeading: "Serlo.org es como la Wikipedia para el aprendizaje.",
      summaryText: "Somos una comunidad de visionarios que trabajan sin descanso para que todo el mundo tenga acceso gratuito a una educación excelente.",
      learnMore: "Aprende más",
      participate: "Únete a la causa",
      donate: "Donaciones",
      toTop: "Hacia arriba"
    },
    categories: {
      articles: "Artículos",
      courses: "Cursos",
      videos: "Vídeos",
      applets: 'Applets',
      folders: "Carpetas",
      exercises: "Ejercicios",
      events: "Eventos",
      unrevised: "Aún no revisado",
      subterms: "Subtérminos",
      exercisesContent: "Contenido de Ejercicios"
    },
    entities: {
      applet: 'Applet',
      article: "Artículo",
      course: "Curso",
      coursePage: "Página del curso",
      event: "Evento",
      exercise: "Ejercicio",
      exerciseGroup: "Grupo de ejercicios",
      topic: "Carpeta",
      groupedExercise: "Ejercicio agrupado",
      page: "Página",
      solution: "Solución",
      taxonomyTerm: "Término de taxonomía",
      user: "Usuario/a",
      video: "Vídeo",
      exerciseFolder: "Carpeta de ejercicios",
      comment: "Comentario",
      revision: "Revisión",
      thread: "Hilo de conversación",
      threads: "Hilos de conversación",
      subject: "Asunto",
      userProfile: "Perfil de usuario",
      privacyPolicy: "Política de privacidad",
      content: "Contenido"
    },
    pageTitles: {
      notifications: "Tus notificaciones",
      subscriptions: "Administrar suscripciones",
      revisionHistory: "Historial de revisiones",
      eventLog: "Registro de eventos",
      unrevisedRevisions: "Revisiones no revisadas",
      userEdits: "Ediciones por %user%",
      userEditsMine: "Mi trabajo aún sin revisar",
      editProfile: "Editar perfil y ajustes",
      recycleBin: "Papelera de reciclaje",
      diagon: "Callejón de Diagon",
      discussions: "Comentarios",
      manageRoles: "Administrar roles de usuario"
    },
    roles: {
      donor: "Donante",
      author: "Autor/a",
      reviewer: "Revisor/a"
    },
    share: {
      button: "Compartir",
      title: "¡Comparte!",
      copyLink: "Copiar enlace",
      copySuccess: "¡Enlace copiado!",
      close: "Cerrar",
      pdf: "Descargar PDF",
      pdfNoSolutions: "PDF sin soluciones"
    },
    modal: {
      leaveNow: "Salir ahora",
      noStay: "No, quiero quedarme"
    },
    editOrAdd: {
      button: "Editar",
      addNewEntities: "Añadir nuevo contenido",
      addNewExercises: "Añadir nuevos ejercicios",
      editExercises: "Editar ejercicios",
      unrevised: "Mostrar revisiones sin revisar",
      inviteModal: {
        title: "¡Crea con nosotros!",
        text: "¡Hola! %break% Genial que quieras contribuir a este contenido 👍 %break% Todo el mundo puede editar, pero necesitas una cuenta para hacerlo.",
        loginButton: "Inicie sesión",
        registerButton: "Registrar una nueva cuenta",
        psText: "Puedes averiguar de qué manera puedes contribuir %link%.",
        psLinkText: "aquí"
      }
    },
    license: {
      readMore: "Información",
      special: "Licencia diferente",
      nonFree: "El uso de este contenido podría estar más restringido que nuestro otro contenido.",
      appliesTo: "Aplica a"
    },
    course: {
      showPages: "Mostrar descripción del curso",
      pages: "Descripción del curso",
      next: "Siguiente",
      back: "Volver",
      noPagesWarning: "Lo sentimos, parece que no hay páginas revisadas en este curso todavía.",
      noRevisionForPage: "página sin revisar"
    },
    content: {
      show: "mostrar",
      hide: "ocultar",
      trashedNotice: "Este contenido está marcado para su eliminación.",
      unrevisedNotice: "Este contenido no tiene ninguna revisión aceptada todavía. Por favor, utiliza este vínculo %link% para previsualizar.",
      emptyNotice: "No hay contenido aquí. Por favor, edita o elimina.",
      picture: "Imagen",
      previewImage: "Previsualizar Imagen",
      imageAltFallback: "Imagen",
      exercisesTitle: "Ejercicios",
      moreExercises: "Puedes encontrar más ejercicios en la siguiente carpeta:",
      relatedContentTitle: "¿Todavía quieres más?",
      relatedContentText: "Puedes encontrar más contenido sobre este tema aquí:",
      sourcesTitle: "Fuentes",
      exercises: {
        prerequisite: "Para este ejercicio se necesitan los siguientes conocimientos básicos:",
        task: "Tarea",
        correct: "Correcto",
        missedSome: "¡Casi! Te faltó al menos una respuesta correcta.",
        wrong: "Incorrecto",
        feedback: "Sugerencias",
        answer: "Respuesta",
        check: "Comprobar",
        yourAnswer: "Tu respuesta...",
        chooseOption: "Elige una de las opciones.",
        printModeChooseOption: "Elige una de las opciones.",
        showSolution: "Mostrar la solución",
        hideSolution: "Ocultar la solución"
      },
      boxTypes: {
        blank: "Blanco",
        example: "Ejemplo",
        quote: "Cita",
        approach: "Planteamiento",
        remember: "Recuerda",
        attention: "Atención",
        note: "Nota",
        definition: "Definición",
        theorem: "Teorema",
        proof: "Prueba"
      },
      loadingVideoFailed: "Algo ha fallado",
      loadingAudioFailed: "Algo ha fallado"
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
      text: "Al hacer clic en la imagen o en el botón superior, aceptas que se cargará el contenido externo de %provider% . También los datos personales pueden ser transferidos a este servicio de acuerdo con nuestro %privacypolicy%.",
      video: "Reproducir vídeo de %provider%",
      applet: "Cargar Applet de %provider%",
      twingle: "Cargar formulario de donación",
      audio: "Reproducir vídeo de %provider%",
      general: "Activar"
    },
    comments: {
      question: "¿Tienes una pregunta?",
      commentsOne: "Comentario",
      commentsMany: "Comentarios",
      submit: "Enviar",
      archiveThread: "Archivar hilo de la conversación",
      restoreThread: "Restaurar hilo",
      deleteThread: "Eliminar hilo de la conversación",
      deleteComment: "Eliminar comentario",
      postedOn: "Publicado el",
      placeholder: "Tus preguntas o sugerencias...",
      placeholderReply: "Tu respuesta...",
      loading: "Buscando comentarios ...",
      error: "Lo sentimos, no se han podido cargar los comentarios. Inténtalo de nuevo más tarde.",
      showMoreReply: "Mostrar una respuesta más",
      showMoreReplies: "Mostrar %number% respuestas más",
      hideReplies: "Ocultar",
      showArchived: "Mostrar %threads% archivados",
      copyLink: "Copiar el vínculo del comentario",
      commentsOverviewExplanation: "Aquí puedes ver todos los comentarios que se han escrito al contenido de %instance%.serlo.org. %break% Responde a las preguntas o encuentra contenido que puedas mejorar. %break% El enlace situado encima del comentario te lleva a la entidad correspondiente.",
      edit: "Editar comentario",
      cancelEdit: "Cancelar",
      saveEdit: "Guardar"
    },
    revisions: {
      toOverview: "Volver a Vista general",
      toContent: "Ir al contenido",
      changes: "Cambios",
      context: "Contexto (versión actual)",
      title: "Título",
      content: "Contenido",
      metaTitle: "Meta Título",
      metaDescription: "Meta Descripción",
      diff: "Vista fuente",
      sidebyside: "Lado a Lado",
      currentVersion: "Versión Actual",
      thisVersion: "Esta Versión",
      currentNotice: "Esta es la versión aceptada actualmente.",
      rejectedNotice: "Esta revisión no fue aceptada.",
      noCurrentNotice: "Todavía no hay revisión aceptada.",
      unknownNotice: "Esta revisión fue aceptada una vez o no ha sido revisada.",
      by: "Por",
      parentFallbackLink: "A contenido padre",
      hasChanges: "Ha habido cambios en esta área",
      positionForGrouped: "Este/a %exercise% es parte de %title%.",
      helpLink: "Ayuda de revisión"
    },
    revisionHistory: {
      changes: "Cambios",
      author: "Autor",
      date: "Fecha",
      edit: "Editar",
      editLabel: "Crear una nueva revisión a partir de esta revisión específica",
      view: "Mostrar",
      viewLabel: "Mostrar esta revisión",
      status: "Estado"
    },
    unrevisedRevisions: {
      help1: "Todas las ediciones de nuestros autores aparecen aquí. %reviewersLink% comprobará la calidad y aprobará los cambios.",
      reviewers: "Revisor@s",
      reviewersUrl: "https://es.serlo.org/262065",
      help2: "Todo el mundo puede previsualizar las ediciones y continuar editando. Dentro de la vista previa l@s revisor@s pueden aceptar la edición y también dar su opinión.",
      help3: "¿Quieres ser revisor@? Ponte en contacto con:%contactLink%.",
      contactPerson: 'LinaMaria',
      contactPersonUrl: "https://es.serlo.org/user/163773/LinaMaria",
      help4: "¿Cómo revisar? Mira %guidelineLink%.",
      guideline: "Directrices para la revisión",
      guidelineUrl: 'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/',
      subjectLinks: "Ir a los temas",
      showMoreEntities: "Mostrar todo en %subject%",
      showMoreRevisions: "Mostrar %number% más…",
      newLabelText: "nuevo",
      newLabelNote: "Esta es una nueva entidad",
      wipLabelText: "limpiar",
      wipLabelNote: "Marcado como trabajo en progreso. No revises todavía.",
      newAuthorText: "nuevo autor",
      newAuthorNote: "Esta es una de las primeras ediciones de este autor, quizás priorizar esto.",
      noUnrevisedRevisions: "No hay contenido sin revisar, ¡todo listo! 🎉",
      importedContentText: "importado",
      importedContentNote: "Esta revisión incluye contenido importado",
      importedContentIdentifier: "Contenido importado de"
    },
    errors: {
      title: "😬 Los sitios web a veces cometen errores…",
      defaultMessage: "Lo sientimos, hemos encontrado un problema al cargar este contenido.",
      temporary: "¿La buena noticia? El problema parece ser temporal, así que por favor inténtalo de nuevo más tarde.",
      permanent: "Veremos qué podemos hacer al respecto… ",
      typeNotSupported: "Por favor, intenta volver a cargar está página.",
      refreshNow: "Actualizar ahora",
      backToPrevious: "Volver a la página anterior",
      backToHome: "Ir a la página de inicio",
      deletedComment: {
        title: "Ups, esto ya no está aquí",
        text: "Lo sentimos, este %type% ya no está en línea.%break% Pero fue borrado por una razón y probablemente no merezca tu tiempo de todos modos 💚"
      }
    },
    print: {
      preparingNotice: "¡Preparando impresión!",
      warning: "IMPORTANTE: Para asegurarse de que todas las imágenes y fórmulas se puedan imprimir, por favor desplácese hasta el final de la página ANTES de abrir este diálogo. ¡Gracias!"
    },
    profiles: {
      aboutMe: "Sobre mi",
      recentActivities: "Actividades recientes",
      showAllActivities: "Mostrar todas las actividades",
      noActivities: "No hay actividades hasta ahora.",
      lastLogin: "Último inicio de sesion",
      yearsWithSerlo: "¡Años con Serlo!",
      yearWithSerlo: "¡Año con Serlo!",
      roles: "Roles (funciones)",
      instanceRoles: "Roles en %lang%.serlo.org",
      otherRoles: "Otros roles:",
      directMessage: "Mensaje directo",
      goToChat: "Ir al chat",
      registerChat: "Registrate para el chat",
      inviteToChat: "Invita al chat",
      inviteModal: {
        part1: "%username%  aún no está activo/a en nuestra comunidad del chat en %chatLink%.",
        part2: "Puedes invitar a %username% al chat para enviarle mensajes directos.",
        messagePlaceholder: "Opcional: Mensaje personal",
        button: "Enviar invitación",
        success: "✨ ¡Invitación exitosa!"
      },
      activityGraph: {
        edits: "Ediciones",
        comments: "Comentarios",
        reviews: "Revisiones",
        taxonomy: "Taxonomía",
        legendary: "💙 Simplemente, ¡guau! 💙",
        untilNextLevel: "%amount% más para completar este círculo 🎉"
      },
      editMotivation: "Editar motivación",
      addMotivation: "Añadir motivación",
      lockedDescriptionTitle: "Tu descripción actualmente no es visible para el público.",
      lockedDescriptionText: "Después de tus primeras contribuciones será visible para todos."
    },
    notices: {
      welcome: "¡Bienvenida/o  %username%!",
      bye: "👋 ¡Nos vemos pronto!",
      alreadyLoggedIn: "👋 Bienvenido de nuevo",
      warningLoggedOut: "⚠️ Has cerrado la sesión. Por favor, inicia sesión de nuevo y luego usa \"Cargar ediciones almacenadas\" para restaurar tus cambios actuales.",
      revisionSaved: "La revisión se ha guardado y se revisará pronto 👍",
      revisionAccepted: "Revisión aceptada con éxito ✅",
      revisionRejected: "Revisión rechazada con éxito ❎",
      revisionSavedAccepted: "Revisión guardada y aceptada con éxito ✅"
    },
    loading: {
      oneMomentPlease: "Un momento, por favor...",
      isLoading: "El contenido está cargando…",
      unknownProblem: "Lo sentimos, hubo un problema al cargar el contenido, por favor inténtalo de nuevo más tarde."
    },
    auth: {
      pleaseLogInLink: "Por favor, inicia sesión",
      pleaseLogInText: "para utilizar esta función. ",
      register: {
        registerTitle: "Registra tu cuenta de Serlo.org",
        passwordRequirements: "Al menos 8 caracteres, si es más largo, mejor.",
        registerIntro: "No necesitas una cuenta para aprender en serlo.org.  %break%  Si quieres hacer comentarios, o trabajar en contenidos de aprendizaje has venido al lugar adecuado.",
        newsletterSubscription: "Recibe actualizaciones breves sobre nuestras actividades actuales en nuestro boletín. Utilizamos tus datos para el envío y para felicitaciones personales. Recibe información relevante y nuestra campaña anual de recaudación de fondos una vez al año. (opcional)"
      },
      recoverTitle: "Recupera tu cuenta",
      recoveryInstructions: "Introduce y envía tu dirección de correo electrónico. %break%  A continuación, te enviaremos un correo electrónico con un enlace de restablecimiento.",
      verify: {
        title: "Verifica tu email",
        instructions: "Inserta y envía tu dirección de correo electrónico para verificarla.",
        alreadyDone: "Has ingresado,  tu correo electrónico ya lo has verificado 😊."
      },
      settings: {
        title: "Cambiar tu contraseña",
        instruction: "Introduce tu nueva contraseña."
      },
      loggingOut: "Cerrando tu sesión …",
      login: {
        confirmAction: "Confirmar acción",
        signIn: "Inicia sesión con tu cuenta",
        logOut: "Cerrar sesión",
        newHere: "¿Eres nuevo aquí?",
        registerNewAccount: "Registrar una nueva cuenta",
        forgotPassword: "¿Has %forgotLinkText%?",
        forgotLinkText: "Contraseña olvidada",
        validSessionDetected: "Oye, ya has iniciado sesión en otra pestaña. ¡Recarga la página para verlo!"
      },
      fields: {
        identifier: "Nombre de usuario o dirección de correo electrónico",
        username: "Nombre de usuario",
        password: "Contraseña",
        email: "Correo electrónico",
        interest: "Estoy aquí como..."
      },
      interests: {
        pleaseChoose: "Por favor, elige",
        parent: "Padre o madre",
        teacher: "Maestro/a",
        pupil: "Alumno/a",
        student: "Estudiante universitario",
        other: "Otro"
      },
      messages: {
        code1010003: "Por favor, confirma esta acción al verificar que eres tú.",
        code1010001: "Iniciar sesión",
        code1010002: "Inicia sesión a través de „Mein Bildungsraum“ (programa en Alemania)",
        code1010013: "Continuar con SSO",
        code1040001: "Registrarse",
        code1040002: "Inscríbete a través de  „Mein Bildungsraum“ (programa de Alemania)",
        code1040003: "Continuar",
        code1050001: "Tus cambios han sido guardados! 🎉",
        code1060001: "Has recuperado tu cuenta con éxito. Por favor, cambia tu contraseña en los próximos minutos.",
        code1060002: "Se ha enviado un correo con un enlace de recuperación a la dirección de correo electrónico que proporcionaste. %break% Comprueba tu buzón y haz clic en el enlace que contiene.",
        code1070003: "Guardar",
        code1070005: "Enviar",
        code1080001: "Se ha enviado un correo electrónico con un enlace de verificación a la dirección de correo electrónico que proporcionaste.",
        code1080002: "Has verificado correctamente tu dirección de correo electrónico.",
        code4000001: '%reason%',
        code4000002: "%field% hace falta.",
        // Should map to usernameInvalid
        code4000004: '%reason%',
        code4000005: '%reason%',
        code4000006: "El nombre de usuario, la dirección de correo electrónico o la contraseña eran incorrectos. Por favor, comprueba si hay errores ortográficos.",
        code4000007: "Ya existe una cuenta con el mismo correo electrónico o nombre de usuario.",
        code4000008: "El código de autentificación proporcionado no es válido, por favor, inténtalo de nuevo.",
        code4000010: "¿Has verificado ya tu dirección de correo electrónico?%break%%verificationLinkText%",
        code4060004: "El enlace de recuperación no es válido o ya ha sido utilizado. Por favor, intenta solicitar un correo electrónico de nuevo",
        code4070001: "El enlace de verificación no es válido o ya ha sido utilizado. Por favor, intenta solicitar un correo electrónico de nuevo.",
        code4070005: "Lo sentimos, este enlace de verificación ya no es válido. Por favor, intenta solicitar un correo electrónico de nuevo."
      },
      usernameInvalid: "Tu nombre de usuario sólo puede contener letras, dígitos, guiones bajos (_) y guiones (-).",
      usernameTooLong: "Lo sentimos, este nombre de usuario es demasiado largo, asegúrate de que tiene 32 caracteres o menos.",
      passwordTooShort: "Lo sentimos, esta contraseña es demasiado corta. Por favor, elige una que tenga al menos 8 caracteres.",
      passwordTooLong: "Lo sentimos, esta contraseña es demasiado larga. Por favor, elige una que tenga un máximo de 72 caracteres.",
      passwordTooSimilar: "Lo sentimos, esta contraseña es demasiado parecida a tu correo electrónico o nombre de usuario.",
      emailInvalid: "Lo sentimos, esta dirección de correo electrónico no es válida. Comprueba si hay errores de escritura.",
      registrationCheckboxAgreement: "Estoy de acuerdo con los %privacypolicy% y %terms%. Puedo recibir notificaciones por correo electrónico de Serlo.org y puedo cancelarlas en cualquier momento.",
      consentNeededBeforeProceeding: "Necesitamos su consentimiento antes de proceder.",
      terms: "Términos",
      signUp: "Registrarse",
      verificationProblem: "En caso de que no lo hayas recibido",
      verificationLinkText: "Haz clic aquí para volver a solicitar el correo electrónico de verificación."
    },
    keys: {
      ctrl: 'ctrl',
      return: "retorno"
    },
    eventLog: {
      currentEvents: "Eventos recientes",
      oldestEvents: "%amount% de eventos pasados",
      globalDescription: "Todos los eventos que ocurrieron en algún momento en %lang%.serlo.org"
    },
    events: {
      entityInParentPreposition: "en",
      commentInParentPreposition: "en",
      setThreadStateArchived: "%actor% archivó %thread%.",
      setThreadStateUnarchived: "%actor% restauró %thread%.",
      createComment: "%actor% comentó en %thread%: %comment%.",
      createThread: "%actor% ha iniciado %thread% en %object%.",
      createEntity: "%actor% creó %object%.",
      setLicense: "%actor% cambió la licencia de %repository%.",
      createEntityLink: "%actor% vinculó %child% con %parent%.",
      removeEntityLink: "%actor% disoció %child% de %parent%.",
      createEntityRevision: "%actor% creó %revision% de %entity%.",
      checkoutRevision: "%actor% ha verificado %revision% en %repository%",
      rejectRevision: "%actor% no aceptó %revision% en %repository%.",
      createTaxonomyLink: "%actor% agregó %child% a %parent%.",
      removeTaxonomyLink: "%actor% eliminó %child% de %parent%.",
      createTaxonomyTerm: "%actor% creó %term%.",
      setTaxonomyTerm: "%actor% actualizó %term%.",
      setTaxonomyParentDeleted: "%actor% eliminó padre de %child%.",
      setTaxonomyParentChangedFrom: "%actor% cambió padre de %child% del %previousparent% a %parent%.",
      setTaxonomyParentChanged: "%actor% cambió padre de %child% a %parent%.",
      setUuidStateTrashed: "%actor% desechó %object%.",
      setUuidStateRestored: "%actor% restauró %object%.",
      inviteToChat: "%actor% te ha invitado al chat: %comment% Visita %chatLink% para chatear con %actor% y otros.",
      entityPlaceholderFallback: "Contenido"
    },
    actions: {
      loadMore: "Cargar más"
    },
    bin: {
      title: "Título",
      trashed: "Destruido..."
    }
  }
};
export const instanceLandingData = {
  lang: "es",
  subjectsData: landingSubjectsData,
  strings: {
    vision: "Nuestra visión es hacer posible el aprendizaje personalizado y proporcionar recursos educativos de alta calidad en todo el mundo, de forma totalmente gratuita. Serlo.org es una organización de base inspirada en Wikipedia. Ya proporcionamos miles de artículos, vídeos y ejercicios resueltos a cinco millones de estudiantes alemanes cada año. Ahora ha llegado el momento de internacionalizarnos.",
    learnMore: "Aprende más",
    democraticallyStructured: "estructurado democráticamente",
    nonProfit: "sin ánimo de lucro",
    transparent: "transparente",
    openlyLicensed: "con licencia abierta",
    adFree: "sin publicidad",
    freeOfCharge: "gratuito",
    wikiTitle: "Serlo es la Wikipedia para el Aprendizaje",
    wikiText: "Al igual que Wikipedia, esta plataforma es creada por una comunidad de autores comprometidos con la educación. Serlo Education está dirigido y es propiedad de de varios equipos descentralizados de voluntarios y profesionales alrededor del mundo.",
    movementTitle: "Conviértete en Parte de Nuestro Movimiento para la Educación Abierta",
    callForAuthors: "Buscamos profesores y educadores apasionados por las materias que enseñan. Forma parte de nuestra comunidad para crear nuevo material didáctico y ayudarnos a mejorar los contenidos existentes.",
    communityLink: "Visite la página de inicio de los autores",
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
    title: "Notificaciones",
    icon: 'notifications'
  }, {
    url: "[secuencia vacía]",
    title: "Usuario/a",
    icon: "usuario/a",
    children: [{
      url: '/user/me',
      title: "Perfil propio"
    }, {
      url: '/event/history/user/me',
      title: "Mis ediciones"
    }, {
      url: '/subscriptions/manage',
      title: "Suscripciones"
    }, {
      url: '/auth/settings',
      title: "Actualizar contraseña"
    }, {
      url: '/user/settings',
      title: "Configuración"
    }, {
      url: '/auth/logout',
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
      moveOrCopyItems: "Mover o copiar elementos",
      addGroupedTextExercise: "Añade un grupo de ejercicios de texto",
      changeLicense: "Cambiar licencia",
      subscribe: "Suscribirse",
      subscribeNotifications: "Recibir notificaciones",
      subscribeNotificationsAndMail: "Recibir notificaciones y correos electrónicos",
      unsubscribeNotifications: "Cancelar suscripción",
      convert: "Convertir (beta)",
      history: "Historial",
      editAssignments: "Editar el tema y las asignaciones de currículo",
      moveToTrash: "Mover a la papelera",
      confirmTrash: "¿Estás seguro de que quieres eliminar este contenido?",
      restoreContent: "Restaurar de la papelera",
      sortCoursePages: "Ordenar páginas del curso",
      sortGroupedExercises: "Ordenar ejercicios agrupados",
      edit: "Editar",
      editTax: "Editar título y texto",
      unrevisedEdit: "Mostrar revisiones sin revisar",
      sortEntities: "Ordenar contenido",
      newEntity: "Nueva Entidad",
      editProfile: "Editar perfil",
      directLink: "Enlace directo a este contenido",
      analyticsLink: "Ver datos de analytics"
    },
    notifications: {
      hide: "Desactivar nuevas notificaciones para este contenido.",
      setToRead: "Marcar notificaciones para leer.",
      setAllToRead: "Poner todas visibles para leer",
      showNew: "Nueva",
      showRead: "Leídas"
    },
    subscriptions: {
      mail: "Correos electrónicos",
      subscription: "Suscripción",
      noMails: "desactivar",
      getMails: "activar",
      noNotifications: "cancelar",
      loadedSentence: "Cargado %loadedCount% de %totalCount% entradas.",
      loadMoreLink: "¡Cargar más!"
    },
    revisions: {
      checkout: {
        action: "Aceptar",
        title: "Aceptar la revisión",
        explanation: "Por favor, dale al autor algún comentario."
      },
      reject: {
        action: "Rechazar",
        title: "Rechazar la revisión",
        explanation: "Por favor, indica al autor por qué no aceptas el trabajo."
      },
      confirm: "Confirmar",
      unrevisedTaxNote: "Nuevo contenido, aún no aceptado"
    },
    mutations: {
      success: {
        trash: "Borrado exitosamente 🗑",
        restore: "Restablecido con éxito ♻️",
        accept: "Edición aceptada ✅",
        reject: "Edición rechazada ❌ ",
        save: "Edición guardada con éxito ✅",
        updated: "Actualización exitosa ✅",
        generic: "Éxito 🎉",
        saveNeedsReview: "Gracias por tu edición 🎉 L@s revisor@s lo comprobarán pronto y luego aparecerá en el sitio."
      },
      errors: {
        UNAUTHENTICATED: "¡Tienes que iniciar sesión para usar esta función!",
        FORBIDDEN: "Lo sentimos, ¡no estás autorizado para hacer esto!",
        INVALID_TOKEN: "[secuencia vacía]",
        BAD_USER_INPUT: "Lo sentimos, estás intentando algo que no es posible…",
        UNKNOWN: "Un error desconocido…",
        valueMissing: "Por favor completa todos los campos requeridos"
      }
    },
    editor: {
      confirmRouteChange: "¿Estás seguro de que quieres salir sin guardar?",
      noChangesWarning: "Nada cambió, por lo que no hay necesidad de guardar aún",
      plugins: {
        anchor: {
          title: "Ancla",
          description: "Insertar un ancla.",
          identifier: "Identificador (por ejemplo, \"explicación larga\")",
          anchorId: "ID del ancla"
        },
        box: {
          title: "Contenedor",
          description: "Un contenedor para ejemplos, comillas, advertencias, teoremas, notas…",
          type: "Tipo de contenedor",
          typeTooltip: "Elige el tipo de caja",
          titlePlaceholder: "(título opcional)",
          anchorId: "ID de Ancla (marca de posición)",
          emptyContentWarning: "Los contenedores sin contenido no se visualizarán"
        },
        unsupported: {
          title: "Sin soporte",
          notSupported: "Lo sentimos, este plugin no es compatible:",
          explanation: "No será visible a los usuarios. Puede eliminarlo o pedir ayuda a los desarrolladores."
        },
        equations: {
          title: "Términos y ecuaciones",
          description: "Escribe manipulaciones de términos y resuelve ecuaciones múltiples.",
          leftHandSide: "Lado izquierdo",
          transformation: "transformación",
          mode: "Modalidad",
          transformationExample: "ej. -3x",
          transformationOfEquations: "Transformación de ecuaciones",
          transformationOfTerms: "Transformación de términos",
          addNewRow: "Añadir nueva fila",
          explanation: "Explicación",
          term: "Término",
          rightHandSide: "Lado derecho",
          combineLikeTerms: "Combina términos similares",
          setEqual: "Coloca los términos iguales entre sí.",
          firstExplanation: "Primera explicación",
          moveUpLabel: "Mover hacia arriba",
          removeRowLabel: "Eliminar fila"
        },
        geogebra: {
          title: "Aplicación GeoGebra",
          description: "Insertar el Material de la aplicación GeoGebra a través de URL o ID.",
          chooseApplet: "Elegir Applet",
          urlOrId: "URL o ID de GeoGebra"
        },
        highlight: {
          title: "Código fuente",
          description: "Resalta la sintaxis del código fuente.",
          clickAndEnter: "Haz clic aquí e introduce tu código fuente…",
          enterHere: "Introduce tu código fuente aquí",
          language: "Idioma",
          languageTooltip: "Elegir idioma para resaltado de sintaxis",
          showLineNumbers: "Números de línea",
          lineNumbersTooltip: "¿Deben ver los usuarios los números de línea?"
        },
        image: {
          title: "Imagen",
          description: "Subir imágenes.",
          upload: "Subir",
          imageUrl: "URL de la imagen",
          placeholderEmpty: "https://www.ejemplo.com/imagen.png",
          placeholderUploading: "Subiendo…",
          placeholderFailed: "Carga fallida...",
          retry: "Reintentar",
          failedUpload: "Carga fallida",
          captionPlaceholder: "Leyenda opcional",
          href: "Enlace",
          hrefPlaceholder: "Vincular la imagen",
          alt: "Descripción (no es visible)",
          altPlaceholder: "Describe lo que muestra la imagen",
          maxWidth: "Ancho máximo",
          maxWidthPlaceholder: "Introduce la anchura máxima"
        },
        injection: {
          title: "serlo.org Contenido",
          description: "Insertar el contenido de serlo.org a través de su ID.",
          illegalInjectionFound: "Entrada ilegal encontrada",
          serloEntitySrc: "entidad de Serlo {{src}}",
          serloId: 'Serlo ID',
          placeholder: "Serlo ID (p.ej. 1565)"
        },
        multimedia: {
          title: "Contenido multimedia asociado con el texto",
          description: "Crear una ilustración o explicación de contenido multimedia asociado con el texto.",
          chooseSize: "Elegir el tamaño del elemento multimedia",
          changeType: "Cambiar el tipo multimedia",
          howImportant: "¿Qué tan importante es el contenido multimedia?",
          isIllustrating: "Está ilustrando",
          isEssential: "Es esencial",
          reset: "Restablecer el contenido multimedia"
        },
        pageLayout: {
          title: "Diseño de Columna para Páginas",
          description: "El plugin que la gente quiere pero no obtiene 🤫",
          chooseRatio: "Elige la proporción de la columna"
        },
        pasteHack: {
          title: "Plugin Estado-Pegar Experimental",
          description: "solo en staging"
        },
        pageTeam: {
          title: "Vista General del Equipo",
          description: "Sólo para las páginas del equipo"
        },
        pagePartners: {
          title: "Lista de socios",
          description: "Sólo para la página de socio (Lista de logos de socios como en es.serlo.org/)"
        },
        rows: {
          title: "Filas",
          searchForTools: "Buscar herramientas…",
          duplicate: "Duplicar",
          copyAnchorLink: "Copiar enlace a este elemento",
          remove: "Eliminar",
          close: "Cerrar",
          dragElement: "Arrastra el elemento dentro del documento",
          addAnElement: "Añadir un elemento"
        },
        serloTable: {
          title: "Tabla",
          description: "Crear tablas bonitas",
          mode: "Modalidad",
          columnHeaders: "Sólo las etiquetas de las columnas",
          rowHeaders: "Sólo las etiquetas de las filas",
          columnAndRowHeaders: "Etiquetas de columna y fila",
          convertToText: "Convertir a texto",
          convertToImage: "Convertir a imagen",
          row: "fila",
          column: "columna",
          addType: "Agregar %type%",
          addTypeBefore: "Agregar %type% antes",
          deleteType: "Eliminar %type%",
          confirmDelete: "¿Estás seguro de que quieres eliminar este %type% y su contenido?"
        },
        spoiler: {
          title: "Spoiler/desplegable",
          description: "Una caja colapsable.",
          enterATitle: "Introduzca un título"
        },
        text: {
          title: "Texto",
          description: "Redacta el contenido usando texto enriquecido y fórmulas matemáticas.",
          placeholder: "Escribe algo o añade algún elemento:",
          addButtonExplanation: "Haz clic para insertar un nuevo elemento",
          quote: "Cita",
          setColor: "Elegir color",
          resetColor: "Restablecer color",
          colors: "Colores",
          closeSubMenu: "Cerrar sub-menú",
          heading: "Encabezado",
          headings: "Encabezados",
          link: "Vínculo (%ctrlOrCmd% + K)",
          noElementPasteInLists: "Lo sentimos, no está permitido pegar elementos dentro de listas.",
          linkOverlay: {
            placeholder: "https://… o /1234",
            inputLabel: "Pegar o escribir un enlace",
            edit: "Modificar enlace",
            remove: "Eliminar enlace",
            customLink: "Enlance Personalizado",
            invalidLinkWarning: "Por favor, proporciona un enlace válido que comience con http(s)://…"
          },
          openInNewTab: "Abrir en una nueva pestaña",
          orderedList: "Lista ordenada",
          unorderedList: "Lista sin ordenar",
          lists: "Listas",
          mathFormula: "Fórmula matemática (%ctrlOrCmd% + M)",
          code: "Código (%ctrlOrCmd% + + + `)",
          blank: "Blanco",
          createBlank: 'Create Blank',
          removeBlank: 'Remove Blank',
          bold: "Negrilla (%ctrlOrCmd% + B)",
          italic: "Itálica (%ctrlOrCmd% + I)",
          noItemsFound: "Elementos no encontrados",
          colorNames: {
            blue: "Azul",
            green: "Verde",
            orange: "Anaranjado"
          },
          math: {
            formula: "[fórmula]",
            visual: 'visual',
            latex: 'LaTeX',
            latexEditorTitle: "Editor LaTeX",
            onlyLatex: "Sólo está disponible el editor LaTeX ",
            shortcuts: "Acceso directo",
            fraction: "Fracción",
            superscript: "Superíndice",
            or: "ó",
            subscript: "Subíndice",
            root: "Raíz",
            mathSymbols: "Símbolos matemáticos",
            eG: "por ejemplo,",
            functions: "Funciones",
            displayAsBlock: "Mostrar en bloque",
            closeMathFormulaEditor: "Cerrar editor de fórmulas matemáticas"
          }
        },
        video: {
          title: "Vídeo",
          description: "Inserta vídeos de YouTube, Vimeo, Wikimedia Commons o BR.",
          videoUrl: "URL del vídeo",
          videoDescription: "Descripción",
          titlePlaceholder: "Título",
          url: 'URL',
          seoTitle: "Título para motores de búsqueda"
        },
        audio: {
          title: 'Audio',
          description: "Enlace a los archivos de audio en Vocaroo",
          audioUrl: "Introducir la URL del vídeo"
        },
        exercise: {
          title: "Ejercicio",
          description: "Ejercicio interactivo o basado en texto"
        },
        inputExercise: {
          title: "Ejercicio de respuesta escrita",
          description: "La solución puede ser texto o matemático"
        },
        textAreaExercise: {
          title: "Ejercicio de cajas de texto",
          description: "Una caja de texto grande para respuestas largas. Sin retroalimentación."
        },
        scMcExercise: {
          title: "Ejercicio SC/MC",
          description: "Opción única o múltiple"
        },
        blanksExercise: {
          title: "Ejercicio de rellenar los espacios en blanco",
          description: "Textos con blancos",
          placeholder: "Escribe un texto y añade espacios en blanco"
        }
      },
      templatePlugins: {
        applet: {
          seoTitle: "Título para motores de búsqueda",
          seoDesc: "Descripción para los motores de búsqueda",
          placeholder: "Título"
        },
        article: {
          seoTitle: "Título para motores de búsqueda",
          seoDesc: "Descripción para los motores de búsqueda",
          title: "Título",
          writeShortIntro: "Escribe una breve introducción",
          stillWantMore: "¿Todavía quieres más?",
          moreOnTopic: "Puedes encontrar más contenido sobre este tema aquí:",
          addSource: "Añadir fuente",
          removeLabel: "Eliminar",
          moveUpLabel: "Mover hacia arriba",
          dragLabel: "Arrastra para cambiar el orden",
          openInTab: "Abrir en una nueva pestaña",
          sources: "Fuentes",
          sourceText: "Fuente del texto",
          sourceUrl: "URL opcional",
          moreInFolder: "Puedes encontrar más ejercicios en la siguiente carpeta:",
          addModal: {
            introText: "Después de leer el artículo, ¿qué ayudaría a los alumnos a continuación? %break% Aquí puedes añadir algunos %exercises% o enlazar a una sola %exerciseFolder%. %break% O puedes sugerir %articles%, %courses% o %videos% para que continúen.",
            introText2: "Puedes pegar un ID de Serlo, una URL o elegir el contenido de la carpeta principal de abajo.",
            buttonEx: "Añadir ejercicios",
            buttonExFolder: "Selecciona la carpeta de ejercicios",
            buttonContent: "Añadir contenido",
            buttonAddType: "Agregar %type%",
            title: "Añadir contenido o ejercicios relacionados",
            invalidInput: "Id o url inválidos",
            fetchError: "Se produjo un error. Por favor, inténtalo más tarde.",
            loading: "Cargando…",
            notFound: "No se encontró ese contenido",
            unsupportedType: "Lo sentimos, el tipo [%type%] no se puede usar aquí",
            unsupportedId: "Disculpa, este ID no se puede usar aquí",
            addFromFolderTitle: "De la carpeta",
            placeholder: "Pegar Serlo ID o URL aquí",
            exerciseFolderNote: "Solo uno puede ser seleccionado aquí"
          }
        },
        course: {
          seoDesc: "Descripción para los motores de búsqueda",
          title: "Título",
          removeCoursePage: "Eliminar página del curso",
          addCoursePage: "Añadir página del curso"
        },
        coursePage: {
          explanation: "Explicación",
          video: "Vídeo",
          question: "Pregunta",
          title: "Título"
        },
        exercise: {
          scMcExercise: "Ejercicio de elección",
          inputExercise: "Ejercicio de respuesta escrita",
          textAreaExercise: "Ejercicio de cajas de texto",
          blanksExercise: "Ejercicio de rellenar los espacios en blanco",
          h5p: "Ejercicio h5p",
          addOptionalInteractiveEx: "Añada un ejercicio opcional interactivo:",
          changeInteractive: "Cambiar elemento interactivo",
          removeInteractive: "Eliminar elemento interactivo",
          createSolution: "Crear solución",
          removeSolution: "Eliminar solución"
        },
        event: {
          seoTitle: "Título para motores de búsqueda",
          seoDesc: "Descripción para los motores de búsqueda",
          title: "Título"
        },
        inputExercise: {
          chooseType: "Elige el tipo de ejercicio",
          unit: "Unidad",
          addAnswer: "Añadir respuesta",
          enterTheValue: "Introduzca el valor",
          feedbackPlaceholder: "Añade un mensaje de retroalimentación para esta respuesta",
          yourSolution: "Tu solución",
          types: {
            'input-string-normalized-match-challenge': "Texto (exacto, p. ej., 'tigre')",
            'input-number-exact-match-challenge': "Número (exacto, p. ej., '0.5')",
            'input-expression-equal-match-challenge': "Expresión matemática (solución equivaletne, por ejemplo \"0,5\" = \"1/2\" = \"2/4\")"
          }
        },
        page: {
          title: "Título"
        },
        scMcExercise: {
          singleChoice: "Elección única",
          multipleChoice: "Múltiple elección",
          chooseType: "Elige el tipo de ejercicio",
          addAnswer: "Añadir respuesta",
          previewMode: "Vista Previa",
          previewIsActiveHint: "El modo de vista previa está activo",
          previewIsDeactiveHint: "Aquí puedes editar"
        },
        solution: {
          optionalExplanation: "Tienes la opción de explicar la estrategia de solución aquí",
          idArticle: "ID de un artículo, p. ej., 1855",
          openArticleTab: "Abrir el artículo en una nueva pestaña:",
          linkTitle: "Título del enlace",
          showSolution: "Mostrar la solución",
          hideSolution: "Ocultar la solución",
          changeLicense: "Cambiar licencia"
        },
        textExerciseGroup: {
          removeExercise: "Eliminar ejercicio",
          addExercise: "Añadir ejercicio",
          kindOfExerciseGroup: "Tipo de grupo de ejercicios",
          notCohesive: "no es cohesivo",
          cohesive: "cohesivo"
        }
      },
      edtrIo: {
        localStorage: {
          found: "De esta edición tienes revisiones guardadas localmente. ¿Quieres cargarlas?",
          foundButton: "Cargar ediciones almacenadas",
          restoreInitial: "¿Quieres empezar nuevamente? ¡Ten en cuenta que esto eliminará tus ediciones actuales!",
          restoreInitialButton: "Eliminar cambios",
          confirmRestore: "¿Estás seguro de que quieres eliminar todos tus cambios?"
        },
        settings: "Configuración",
        extendedSettings: "Ajustes extendidos",
        close: "Cerrar",
        save: "Guardar",
        saveWithReview: "Guardar y obtener una revisión",
        cancel: "Cancelar",
        saving: "Guardando…",
        missingChanges: "Tienes que indicar los cambios que has hecho",
        missingLicenseTerms: "Necesitas aceptar los términos de la licencia",
        missingChangesAndLicenseTerms: "Necesitas indicar los cambios que has realizado y aceptar los términos de la licencia",
        errorSaving: "Se ha producido un error al guardar.",
        saveLocallyAndRefresh: "Puedes guardar la revisión localmente, actualiza la página e intenta guardar de nuevo.",
        revisionSaved: "Revisión guardada",
        saveRevision: "Guardar revisión",
        changes: "Describe tus cambios en el contenido",
        skipReview: "Omitir la revisión de pares (no recomendado)",
        enableNotifs: "Habilitar notificaciones de serlo.org",
        enableNotifsMail: "Activar notificaciones por correo electrónico",
        switchRevision: "Cambiar a otra revisión",
        importOther: "Importar contenido de otra entidad",
        importOtherExplanation: "Simplemente pega la URL o ID de otra entidad serlo.org del mismo tipo aquí para duplicar su contenido aquí. NO utilices esto para hacer copias exactas o mover contenido. Los grupos de ejercicios y cursos no están soportados (pero los ejercicios individuales y las páginas del curso si lo están).",
        importOtherWarning: "Advertencia: ¡Esto sobrescribe todo lo que ya está presente en este editor!",
        importOtherButton: "Importar contenido",
        current: "Actual",
        author: "Autor",
        createdAt: "¿Cuándo?",
        ready: "¿Listo para guardar?",
        anchorLinkWarning: "Este enlace sólo funcionará en el frontend y para contenidos que tengan una revisión algo nueva."
      },
      taxonomy: {
        title: "Título"
      }
    },
    profileSettings: {
      editAbout: "Tu descripción",
      showInstructions: "Mostrar instrucciones",
      editImage: {
        header: "Foto de perfil",
        buttonText: "Cómo editar tu foto de perfil",
        description: "Actualmente usamos las imágenes del %chatLink%  como impagen de perfil.  Para cambiar la imágen, haz lo siguiente:",
        steps: {
          goToChat: "Ir a %chatLink%.",
          signIn: "Iniciar sesión.",
          goToMyAccount: "Ir al menú de usuario a %myAccountLink%",
          myAccount: "Mi cuenta",
          uploadPicture: "Sube una nueva imagen (asegúrate de que sea cuadrada) y haz clic en \"Guardar cambios\".",
          refreshPage: "Vuelve aquí y actualiza la imagen usando %refreshLink%.",
          refreshLink: "este enlace"
        }
      },
      motivation: {
        header: "Motivación",
        buttonText: "Cómo editar tu motivación",
        intro: "La motivación es una función nueva que está a prueba en este momento. Para editar tu motivación tienes que completar un sencillo formulario.",
        privacy: "El formulario y el almacenamiento de datos lo ofrece Google y la información personal puede ser transferida a este servicio cuando se utiliza esta función.",
        toForm: "Formulario de Motivación"
      },
      delete: {
        heading: "¿Cómo eliminar mi cuenta?",
        text: "Si quieres eliminar tu cuenta, escríbenos a  %mailLink%.%break% Asegúrate de utilizar tu dirección de correo electrónico registrada y  %subjectLine% en el espacio para el asunto.",
        deleteAccount: "Eliminar cuenta"
      }
    },
    backend: {
      pages: "Páginas estáticas",
      authorization: "Autorización",
      navigation: "Navegador",
      recycleBin: "Papelera de reciclaje"
    },
    pages: {
      newPage: "Añadir nueva Página",
      deletedPages: "Páginas borradas"
    },
    taxonomyTermTools: {
      copyMove: {
        title: "Mover / Copiar entidades en Taxonomía",
        select: "Seleccionar entidades para mover o copiar:",
        target: "Término objetivo:",
        link: "Enlace",
        moveButtonText: "Mover a %type%",
        copyButtonText: "Copiar a %type%",
        moveSuccess: "Movido exitosamente",
        copySuccess: "Copiado exitosamente",
        exerciseFolderNotice: "En este momento no es posible copiar o mover el tipo %exerciseFolder%. %break% Por favor, crea una nueva carpeta y mueve el contenido en lo posible."
      },
      deleteAdd: {
        confirmDelete: "¿Está seguro de que deseas borrar esta tarea?",
        addSuccess: "Asignado con éxito, recargando  …",
        addNewTitle: "Añadir nueva tarea",
        addButtonText: "Asignar"
      },
      sort: {
        title: "Ordenar entidades",
        saveButtonText: "Guardar orden"
      }
    },
    roles: {
      addButton: "Añadir como %role%"
    },
    ai: {
      exerciseGeneration: {
        buttonTitleSingular: "Generar un ejercicio con IA (Inteligencia Artificial)",
        buttonTitle: "AI genera grupo de ejercicio",
        initialModalTitle: "Crea un ejercicio automáticamente con ayuda de la IA",
        modalTitleWithTaxonomy: "Generación de ejercicios con AI: ",
        confirmCloseDescription: "¿Quieres cancelar la generación de ejercicios? Tus datos se perderán.",
        summary: "Resumen",
        nextButton: "Siguiente",
        nextExerciseButton: "Próximo ejercicio",
        previousButton: "Ejercicio anterior",
        generateExerciseButton: "Generar ejercicio",
        generateExercisesButton: "Generar ejercicio",
        somethingWentWrong: "Algo salió mal. Inténtalo de nuevo.",
        hallucinationWarning: "La IA puede generar ejercicios incorrectos. Por favor revisa cuidadosamente.",
        topic: {
          title: "¿Sobre qué %topic% desea generar ejercicios?",
          topic: "tema",
          defaultLabel: "Tema",
          otherTopicLabel: "Otro tema",
          customTopicPlaceholder: "Introduce un tema personalizado"
        },
        grade: {
          title: "¿En qué %grade% están los alumnos?",
          grade: "grado/curso",
          label: "Grado/Curso",
          university: "Universidad"
        },
        exerciseType: {
          title: "¿Qué  %exerciseType% te interesa?",
          exerciseType: "tipo de ejercicio",
          label: "Tipo de ejercicio",
          subtasksTitleSummary: "Subtareas",
          subtasksTitle: "¿Debe haber subtareas?",
          subtasksTitleExerciseGroup: "¿Cuántas subtareas debería haber?",
          noSubtasks: 'No',
          yesSubtasks: "Si",
          subtasksLabel: "Ejercicios",
          numberOfSubtasksPlaceholder: "Número de subtareas",
          chooseOption: "Selecciona una opción",
          multipleChoice: "Selección Múltiple",
          singleChoice: "Elección Única",
          inputExercise: "Ejercicio de respuesta escrita",
          blanksExercise: "Ejercicio de rellenar los espacios en blanco"
        },
        difficulty: {
          title: "¿Cuál es el nivel de %difficulty% del ejercicio y del objetivo de aprendizaje?",
          difficulty: "dificultad",
          label: "Dificultad",
          learningGoalLabel: "Objetivos de aprendizaje",
          learningGoalExample: "Ejemplo: Los estudiantes entienden los fundamentos de la algebra.",
          learningGoalPlaceholder: "Ingresa el objetivo de aprendizaje",
          chooseOption: "Selecciona una opción",
          easy: "Fácil",
          medium: "Medio",
          hard: "Difícil"
        },
        priorKnowledge: {
          title: "¿Cuál es el  %priorKnowledge% que deben tener los alumnos?",
          priorKnowledge: "conocimientos previos",
          label: "Conocimiento previo",
          example: "Ejemplo: Los estudiantes saben cómo funciona el algoritmo básico y ya han resuelto algunos ejercicios sobre el tema.",
          placeholder: "E.g., Aritmética básica, fundamentos del algoritmo"
        },
        preview: {
          loadingHeading: "Se está generando el ejercicio...",
          patience: "Puede tardar hasta dos minutos",
          publishExercise: "Publicar ejercicio",
          openExerciseInEditor: "Abrir en el editor",
          regenerate: "Regenerar el ejercicio"
        }
      }
    }
  }
};
export const kratosMailStrings = {
  recovery: {
    valid: {
      subject: "👉 Accede a tu cuenta Serlo.org",
      'body.plaintext': `👋 Hola {{ .Identity.traits.username }}, 
¿Estás intentando acceder a tu cuenta en serlo.org? Si no es así, ignora este correo.
  
Para restablecer tu contraseña, abre el siguiente enlace en tu navegador:
{{ .RecoveryURL }}

Saludos de tu equipo de Serlo.org`,
      body: `<p>👋 Hola <b>{{ .Identity.traits.username }}</b>,</p>
<p>¿Estás intentando acceder a tu cuenta en serlo.org? Si no es así, por favor, ignora este correo.</p>
 
<p>Para restablecer tu contraseña, abre el siguiente enlace en tu navegador:
<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a><br/><br/>Mucha suerte de parte de tu equipo Serlo.org</p>`
    },
    invalid: {
      subject: "👉 Se intentó acceder a la cuenta",
      'body.plaintext': `👋¡Hola!

Tú (u otra persona) has introducido esta dirección de correo electrónico al intentar recuperar el acceso a una cuenta en serlo.org.

Pero esta dirección de correo electrónico no está vinculada a un usuario en nuestro sitio web y, por lo tanto, el intento falló.

Si has sido tú, comprueba si te has registrado con una dirección diferente.

De lo contrario, ignora este correo electrónico.

✌️`,
      body: `<p>👋 ¡Hola!</p>
<p>Tú (u otra persona) has introducido esta dirección de correo electrónico al intentar recuperar el acceso a una cuenta en serlo.org. <a href="https://serlo.org">serlo.org</a>. </p>
<p>Pero esta dirección de correo electrónico no está vinculada a un usuario en nuestro sitio web y, por lo tanto, el intento falló.</p>
<p>Si has sido tú, comprueba si te has registrado con una dirección diferente.</p>
<p>De lo contrario, ignora este correo electrónico.</p>
<p>✌️</p>`
    }
  },
  verification: {
    valid: {
      subject: "👋 Verifica tu dirección de correo electrónico",
      'body.plaintext': `Hola {{ .Identity.traits.username }},

      Estamos muy contentos de tenerte en serlo.org🎉

     Por favor, verifica tu nueva cuenta haciendo clic en el siguiente enlace:

{{ .VerificationURL }}

Tu Apoyo-a-la-Comunidad💚      `,
      body: `<p>Hola <b>{{ .Identity.traits.username }}</b>,</p>
<p>Estamos muy contentos de tenerte en serlo.org 🎉</p>
<p>Por favor, verifica tu cuenta haciendo clic en el siguiente enlace:<br/>
<a style="color: #007ec1 !important;" href="{{ .VerificationURL }}">{{ .VerificationURL }}</a>
</p><p>Tu Apoyo-a-la-Comunidad💚</p>`
    },
    invalid: {
      subject: `👋 Alguien intentó verificar esta dirección de correo electrónico`,
      'body.plaintext': `👋 Hola,

Alguien solicitó verificar esta dirección de correo electrónico, pero no pudimos encontrar una cuenta en serlo.org para esta dirección.

Si fuiste tú, comprueba si te registraste usando una dirección diferente.

Si no, por favor ignora este correo electrónico.

✌️`,
      body: `<p>👋 Hola,</p>
<p>Alguien pidió verificar esta dirección de correo electrónico, pero no pudimos encontrar una cuenta en <a href="https://serlo.org">serlo.org</a>para esta dirección.</p>
<p>Si fuiste tú, comprueba si te registraste con una dirección diferente.</p>
<p>De lo contrario, por favor, ignora este correo electrónico.</p>
<p>✌️</p>`
    }
  }
};