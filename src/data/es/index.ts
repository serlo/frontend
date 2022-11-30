import { Instance } from '@/fetcher/graphql-types/operations';
import { headerData, footerData, landingSubjectsData, secondaryMenus } from './menu-data';
export const instanceData = {
  lang: Instance["Es"],
  headerData: headerData,
  footerData: footerData,
  secondaryMenus: secondaryMenus,
  strings: {
    header: {
      slogan: "La Plataforma para el Aprendizaje Abierto",
      search: "Buscar",
      login: "Ingresar",
      skipLinks: {
        sentence: 'Skip to %content% or %footer%',
        content: 'content',
        footer: 'footer'
      }
    },
    search: {
      privacy: "La búsqueda es proporcionada por Google. Mira  nuestra  %privacypolicy%  para saber qué información se procesa.",
      agree: "Acepta utilizar el motor de búsqueda"
    },
    footer: {
      summaryHeading: "Serlo.org es la Wikipedia para el aprendizaje.",
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
      subterms: 'Subterms',
      exercisesContent: "Ejercicios contenido"
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
      user: "Usuario",
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
      discussions: 'Comments',
      manageRoles: 'Manage User Roles'
    },
    roles: {
      donor: "Donante",
      author: "Autor",
      reviewer: "Revisor"
    },
    share: {
      button: "Compartir",
      title: "¡Comparte!",
      copyLink: "Copiar enlace",
      copySuccess: "!Enlace copiado!",
      close: "Cerrar",
      pdf: "Descargar PDF",
      pdfNoSolutions: "PDF sin soluciones"
    },
    editOrAdd: {
      button: 'Edit',
      addNewEntities: 'Add new content',
      addNewExercises: 'Add new exercises',
      editExercises: 'Edit exercises',
      unrevised: 'Show unrevised revisions',
      inviteModal: {
        title: 'Create with us!',
        text: 'Hello! %break% Great that you want to contribute to this content 👍 %break% Everybody can edit, but you need an account to do so.',
        loginButton: 'Login now',
        registerButton: 'Register new account',
        psText: 'You can find out in what ways you can contribute %link%.',
        psLinkText: 'here'
      }
    },
    license: {
      readMore: "Información",
      special: "Licencia diferente",
      nonFree: "El uso de este contenido podría estar más restringido que nuestro otro contenido."
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
      emptyNotice: "No hay contenido aquí. Por favor, edite o elimine.",
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
        strategy: "Estrategia de solución"
      },
      boxTypes: {
        blank: "Espacio en blanco",
        example: "Ejemplo",
        quote: "Cita",
        approach: "Planteamiento",
        remember: "Recuerda",
        attention: "Atención",
        note: "Nota",
        definition: "Definición",
        theorem: "Teorema",
        proof: "Prueba"
      }
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
      twingle: "Cargar formulario de donación"
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
      showArchived: "Mostrar  %threads% archivados",
      copyLink: "Copiar el vínculo del comentario",
      commentsOverviewExplanation: 'Here you can see all comments that were written to content on %instance%.serlo.org. %break% Answer questions or find content you could improve. %break% The link above the comment brings you to the relevant entity.'
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
      positionForGrouped: "Este/a %exercise_or_solution% es parte de %title%.",
      helpLink: "Ayuda de revisión"
    },
    revisionHistory: {
      changes: "Cambios",
      author: "Autor",
      date: "Fecha",
      edit: "Edición",
      editLabel: "Crear una nueva revisión a partir de esta revisión específica",
      view: "Mostrar",
      viewLabel: "Mostrar esta revisión",
      status: "Estado"
    },
    unrevisedRevisions: {
      help1: 'All edits by our Authors show up here. %reviewersLink% will check the quality and approve the changes.',
      reviewers: 'Reviewers',
      reviewersUrl: 'https://de.serlo.org/community/202923/rollen-der-serlo-community',
      help2: 'Everybody can preview the edits and continue editing. Inside the preview reviewers can accept the edit and also give feedback.',
      help3: 'You want to be a reviewer? Get in contact with: %contactLink%.',
      contactPerson: 'LinaMaria',
      contactPersonUrl: 'https://community.serlo.org/direct/LinaMaria',
      help4: 'How to review? See our %guidelineLink%.',
      guideline: 'Guideline for Reviewing',
      guidelineUrl: 'https://docs.google.com/document/d/1p03xx2KJrFw8Mui4-xllvSTHcEPi8G1bdC8rGXcH6f8/',
      subjectLinks: 'To Subjects',
      showMoreEntities: "Mostrar todo en %subject%",
      showMoreRevisions: "Mostrar %number% más…",
      newLabelText: "nuevo",
      newLabelNote: "Esta es una nueva entidad",
      wipLabelText: "limpiar",
      wipLabelNote: "Marcado como trabajo en progreso. No revises todavía.",
      newAuthorText: "nuevo autor",
      newAuthorNote: "Esta es una de las primeras ediciones de este autor, quizás priorizar esto.",
      noUnrevisedRevisions: "No hay contenido sin revisar, ¡todo listo! 🎉"
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
      alreadyLoggedIn: '👋 Hi! You are already logged in',
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
      pleaseLogInLink: 'Please log in',
      pleaseLogInText: 'to use this feature.',
      registerTitle: 'Register your Serlo Account',
      recoverTitle: 'Recover your account',
      recoveryInstructions: 'Insert and submit your email address. We will then send you an email with a reset link.',
      verify: {
        title: 'Verify your email',
        instructions: 'Insert and submit your email address to verify it.',
        alreadyDone: 'You are logged in, so you have already verified your email😊.'
      },
      settings: {
        title: 'Change your password',
        instruction: 'Insert your new password.'
      },
      loggingOut: 'Logging you out …',
      login: {
        confirmAction: 'Confirm Action',
        signIn: 'Sign in to your Account',
        logOut: 'Log out',
        newHere: 'Are you new here?',
        registerNewAccount: 'Register new account',
        forgotPassword: 'Did you %forgotLinkText%?',
        forgotLinkText: 'forget your password'
      },
      fields: {
        identifier: 'Username or Email address',
        username: 'Username',
        password: 'Password',
        email: 'Email'
      },
      messages: {
        code1010003: 'Please confirm this action by verifying that it is you.',
        code1010001: 'Sign in',
        code1010013: 'Continue',
        code1040001: 'Register',
        code1040003: 'Continue',
        code1050001: 'Your changes have been saved! 🎉',
        code1060001: 'You successfully recovered your account. Please change your password in the next minutes.',
        code1060002: 'An email containing a recovery link has been sent to the email address you provided.',
        code1080001: 'An email containing a verification link has been sent to the email address you provided.',
        code1080002: 'You have successfully verified your email address.',
        code4000001: '%reason%',
        code4000002: '%field% is missing.',
        code4000003: 'Length must be >= %expected_length%, but got %actual_length%.',
        code4000005: '%reason%',
        code4000006: 'The username, email address or password was incorrect. Please check for spelling mistakes.',
        code4000007: 'An account with the same email or username exists already.',
        code4000008: 'The provided authentication code is invalid, please try again.',
        code4000010: 'Have you already verified your email address?.%break% %verificationLinkText%',
        code4060004: 'The recovery link is not valid or has already been used. Please try requesting an email again',
        code4070001: 'The verification link is not valid or has already been used. Please try requesting an email again.'
      },
      usernameInvalid: 'Your username may only contain letters, digits, underscores (_) and hyphens (-).',
      passwordInvalid: 'Sorry, this password is too short. Please choose one that is at least 8 characters long.',
      registrationAgreement: 'By clicking %signup%, you agree to our %privacypolicy% and %terms%. You may receive email notifications from us and can opt out at any time.',
      terms: 'Terms',
      signUp: 'Register',
      verificationLinkText: 'Click here to request the verification email again.'
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
      createEntityLink: "%actor% asoció %child% con %parent%.",
      removeEntityLink: "%actor% disoció %child% de %parent%.",
      createEntityRevision: '%actor% created %revision% of %entity%.',
      checkoutRevision: '%actor% checked out %revision% in %repository%.',
      rejectRevision: '%actor% did not accept %revision% in %repository%.',
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
  lang: Instance["Es"],
  subjectsData: landingSubjectsData,
  strings: {
    vision: "Somos una organización de base comunitaria sin ánimo de lucro, que apoya el aprendizaje personalizado, y trabaja por la igualdad de oportunidades educativas. Esta plataforma de aprendizaje ofrece miles de artículos de instrucción, videos de aprendizaje y ejercicios de práctica para millones de estudiantes en todo el mundo - completamente gratis. Ahora es el momento de unirte a nosotros en tu idioma.",
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
    title: "Usuario",
    icon: 'user',
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
      copyItems: "Copiar elementos",
      moveItems: "Mover elementos",
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
      editTax: 'Edit Title & Text',
      unrevisedEdit: "Mostrar revisiones sin revisar",
      organize: "Organizar",
      moveToGrouped: "Mover contenido a otro grupo de ejercicios de texto",
      moveToTextExercise: "Mover contenido a otro ejercicio de texto",
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
      loadedSentence: 'Loaded %loadedCount% of %totalCount% entries.',
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
        saveNeedsReview: 'Thank you for your edit 🎉 The reviewers will check it soon and then it will appear on the site.'
      },
      errors: {
        UNAUTHENTICATED: "¡Tienes que iniciar sesión para usar esta función!",
        FORBIDDEN: "Lo sentimos, ¡no estás autorizado para hacer esto!",
        INVALID_TOKEN: '',
        BAD_USER_INPUT: "Lo sentimos, estás intentando algo que no es posible…",
        UNKNOWN: "Un error desconocido…",
        valueMissing: "Por favor completa todos los campos requeridos"
      }
    },
    editor: {
      confirmRouteChange: "¿Estás seguro de que quieres salir sin guardar?",
      noChangesWarning: 'Nothing changed so there is no need to save yet',
      edtrIo: {
        extendedSettings: "Ajustes extendidos",
        close: "Cerrar",
        notSupportedYet: "Este tipo de contenido aún no está respaldado por el nuevo editor.",
        editInOld: "Edita el contenido en el antiguo editor.",
        conversionError: "Se produjo un error durante la conversión.",
        oldRevisionFound: "Hemos encontrado una revisión anterior creada por ti. ¿Deseas restaurarla?",
        notConverted: "Esta entidad aún no ha sido convertida al nuevo editor.",
        box: "Contenedor",
        boxDesc: "Un contenedor para ejemplos, comillas, advertencias, teoremas, notas…",
        text: "Texto",
        textDesc: "Redacta el contenido usando texto enriquecido y fórmulas matemáticas.",
        blockquoteTitle: "Cita",
        quoteDescription: "Crear texto indentado para las citas.",
        geogebraTitle: "Aplicación GeoGebra",
        geogebraDesc: "Insertar el Material de la aplicación GeoGebra a través de URL o ID.",
        highlightTitle: "Código fuente",
        highlightDesc: "Resalta la sintaxis del código fuente.",
        anchor: "Ancla",
        anchorDesc: "Insertar un ancla.",
        image: "Imágen",
        imageDesc: "Subir imágenes.",
        importantTitle: "Afirmación Importante",
        importantDesc: "Un recuadro para resaltar afirmaciones importantes.",
        injectionTitle: "serlo.org Contenido",
        injectionDesc: "Insertar el contenido de serlo.org a través de su ID.",
        multimediaTitle: "Contenido multimedia asociado con el texto",
        multimediaDesc: "Crear una ilustración o explicación de contenido multimedia asociado con el texto.",
        spoiler: "Spoiler/desplegable",
        spoilerDesc: "Una caja colapsable.",
        serloTable: "Tabla",
        serloTableDesc: 'Create pretty tables',
        table: "Tabla",
        tableDesc: "Crear tablas usando Markdown.",
        video: "Vídeo",
        videoDesc: "Inserta vídeos de YouTube, Vimeo, Wikimedia Commons o BR.",
        solutionSeparator: "Separador de Solución",
        solutionSeparatorDesc: "Desglosa la solución en pasos individuales.",
        save: "Guardar",
        saveWithReview: 'Save and get review',
        cancel: "Cancelar",
        saving: "Guardando…",
        missingChanges: "Tienes que indicar los cambios que has hecho",
        missingLicenseTerms: "Necesitas aceptar los términos de la licencia",
        missingChangesAndLicenseTerms: "Necesitas indicar los cambios que has realizado y aceptar los términos de la licencia",
        errorSaving: "Se ha producido un error al guardar.",
        saveLocallyAndRefresh: "Puedes guardar la revisión localmente, actualiza la página e intenta guardar de nuevo.",
        revisionSaved: "Revisión guardada",
        saveRevision: "Guardar revisión",
        changes: 'Describe your changes to the content',
        skipReview: "Omitir la revisión de pares (no recomendado)",
        enableNotifs: "Habilitar notificaciones de serlo.org",
        enableNotifsMail: "Activar notificaciones por correo electrónico",
        switchRevision: "Cambiar a otra revisión",
        current: "Actual",
        author: "Autor",
        createdAt: "¿Cuándo?",
        settings: "Configuración",
        equationsTitle: "Términos y ecuaciones",
        equationsDesc: "Escribe manipulaciones de términos y resuelve ecuaciones múltiples.",
        ready: "¿Listo para guardar?"
      },
      anchor: {
        identifier: "Identificador",
        anchorId: "ID del ancla"
      },
      geogebra: {
        urlOrId: "URL o ID de GeoGebra"
      },
      highlight: {
        clickAndEnter: "Haz clic aquí e introduce tu código fuente…",
        enterHere: "Introduce tu código fuente aquí",
        language: "Idioma",
        enterLanguage: "Introducir idioma",
        showLineNumbers: "Mostrar números de línea"
      },
      inputExercise: {
        text: "Texto",
        chooseType: "Elige el tipo de ejercicio",
        unit: "Unidad",
        addAnswer: "Añadir respuesta",
        enterTheValue: "Introduzca el valor",
        yourSolution: "Tu solución",
        number: "Número (solución exacta, por ejemplo \"0,5\" ≠ \"1/2\" ≠ \"2/4\")",
        mathematicalExpressionSolution: "Expresión matemática (solución equivaletne, por ejemplo \"0,5\" = \"1/2\" = \"2/4\")"
      },
      multimedia: {
        image: "Imágen",
        video: "Vídeo",
        geogebraTitle: "Aplicación GeoGebra",
        changeType: "Cambiar el tipo multimedia",
        howImportant: "¿Qué tan importante es el contenido multimedia?",
        isIllustrating: "Está ilustrando",
        isEssential: "Es esencial"
      },
      rows: {
        searchForTools: "Buscar herramientas…",
        duplicate: "Duplicar",
        remove: "Eliminar",
        close: "Cerrar",
        dragElement: "Arrastra el elemento dentro del documento",
        addAnElement: "Añadir un elemento"
      },
      scMcExercise: {
        singleChoice: "Elección única",
        multipleChoice: "Múltiple elección",
        chooseType: "Elige el tipo de ejercicio",
        addAnswer: "Añadir respuesta"
      },
      serloTable: {
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
        enterATitle: "Introduzca un título"
      },
      text: {
        quote: "Cita",
        setColor: "Elegir color",
        resetColor: "Restablecer color",
        colors: "Colores",
        closeSubMenu: "Cerrar sub-menú",
        heading: "Encabezado",
        headings: "Encabezados",
        link: "Vínculo (%ctrlOrCmd% + K)",
        enterUrl: "Introducir URL",
        openInNewTab: "Abrir en una nueva pestaña",
        orderedList: "Lista ordenada",
        unorderedList: "Lista sin ordenar",
        lists: "Listas",
        mathFormula: "Fórmula matemática (%ctrlOrCmd% + M)",
        code: "Código (%ctrlOrCmd% + + + `)",
        displayAsBlock: "Mostrar en bloque",
        formula: "[fórmula]",
        visual: 'visual',
        laTeX: 'LaTeX',
        onlyLaTeX: "Sólo está disponible el editor LaTeX ",
        shortcuts: "Acceso directo",
        fraction: "Fracción",
        superscript: "Superíndice",
        or: "ó",
        subscript: "Subíndice",
        root: "Raíz",
        mathSymbols: "Símbolos matemáticos",
        eG: "por ejemplo,",
        functions: "Funciones",
        bold: "Negrilla (%ctrlOrCmd% + B)",
        italic: "Itálica (%ctrlOrCmd% + I)",
        noItemsFound: "Elementos no encontrados"
      },
      video: {
        videoUrl: "URL del vídeo",
        description: "Descripción",
        title: "Título",
        url: 'URL',
        seoTitle: "Título para motores de búsqueda"
      },
      error: {
        convertionError: "Esta parte del documento no pudo ser convertida."
      },
      exercise: {
        addChoiceExercise: "Añadir ejercicio de elección",
        choiceExercise: "Ejercicio de opción múltiple",
        addInputExercise: "Añada ejercicio de respuesta escrita",
        inputExercise: "Ejercicio de respuesta escrita",
        addOptionalInteractiveEx: "Añada un ejercicio opcional interactivo:",
        changeInteractive: "Cambiar elemento interactivo",
        removeInteractive: "Eliminar elemento interactivo"
      },
      injection: {
        illegalInjectionFound: "Entrada ilegal encontrada",
        serloEntitySrc: "entidad de Serlo {{src}}",
        serloId: 'Serlo ID:'
      },
      box: {
        type: "Tipo de contenedor",
        titlePlaceholder: "(título opcional)",
        anchorId: "ID de Ancla (marca de posición)",
        emptyContentWarning: "Los contenedores sin contenido no se visualizarán"
      },
      layout: {
        toDragConvert: "Para que el contenido sea arrastrable, conviértalo para el nuevo editor:",
        oneColumnLayout: "Diseño con una columna",
        multimediaTitle: "Contenido multimedia asociado con el texto"
      },
      pageLayoutColums: {
        chooseRatio: "Elige la proporción de la columna"
      },
      solution: {
        optionalExplanation: "Tienes la opción de explicar la estrategia de solución aquí",
        fundamentalsNote: "Para este ejercicio, necesitas tener los siguentes conocimientos:",
        idArticle: "ID de un artículo, p. ej., 1855",
        openArticleTab: "Abrir el artículo en una nueva pestaña:",
        linkTitle: "Título del enlace",
        showSolution: "Mostrar la solución",
        hideSolution: "Ocultar la solución"
      },
      applet: {
        seoTitle: "Título para motores de búsqueda",
        seoDesc: "Descripción para los motores de búsqueda",
        title: "Título"
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
        dragLabel: "Arrastra para cambiar el orden",
        openInTab: "Abrir en una pestaña nueva",
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
      coursePage: {
        explanation: "Explicación",
        video: "Vídeo",
        question: "Pregunta",
        title: "Título"
      },
      course: {
        seoDesc: "Descripción para los motores de búsqueda",
        title: "Título",
        removeCoursePage: "Eliminar página del curso",
        addCoursePage: "Añadir página del curso"
      },
      event: {
        seoTitle: "Título para motores de búsqueda",
        seoDesc: "Descripción para los motores de búsqueda",
        title: "Título"
      },
      page: {
        title: "Título"
      },
      taxonomy: {
        title: "Título"
      },
      textExerciseGroup: {
        removeExercise: "Eliminar ejercicio",
        addExercise: "Añadir ejercicio",
        kindOfExerciseGroup: "Tipo de grupo de ejercicios",
        notCohesive: "no es cohesivo",
        cohesive: "cohesivo"
      },
      textExercise: {
        removeSolution: "Eliminar solución",
        createSolution: "Crear solución"
      },
      equations: {
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
        addNew: "Añadir nueva ecuación"
      },
      deprecated: {
        unsupported: "Esta parte del documento contiene funciones que ya no son compatibles."
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
      newPage: 'Add new Page',
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
      addButton: 'Add as %role%'
    }
  }
};
export const kratosMailStrings = {
  recovery: {
    valid: {
      subject: '👉 Access to your Serlo account',
      'body.plaintext': `👋 Hi {{ .Identity.traits.username }},
Are you trying to get access to your account at serlo.org? If not please just ignore this mail.
 
To reset your password please open the following link in your browser:
{{ .RecoveryURL }}`,
      body: `<p>👋 Hi <b>{{ .Identity.traits.username }}</b>,</p>
<p>Are you trying to get access to your account at serlo.org? If not please just ignore this mail.</p>
 
<p>To reset your password please open the following link in your browser:
<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a></p>`
    },
    invalid: {
      subject: '👉 Account access attempted',
      'body.plaintext': `👋 Hi there!

You (or someone else) entered this email address when trying to recover access to an account at serlo.org.

But this email address is not linked to a user in our website and therefore the attempt failed.

If it was you, check if you signed up using a different address.

Otherwise please just ignore this email.

✌️`,
      body: `<p>👋 Hi there!</p>
<p>You (or someone else) entered this email address when trying to recover access to an account at <a href="https://serlo.org">serlo.org</a>. </p>
<p>But this email address is not linked to a user in our website and therefore the attempt failed.</p>
<p>If it was you, check if you signed up using a different address.</p>
<p>Otherwise, please just ignore this email.</p>
<p>✌️</p>`
    }
  },
  verification: {
    valid: {
      subject: '👋 Please verify your email address',
      'body.plaintext': `Hi {{ .Identity.traits.username }},

      We are excited to have you at serlo.org 🎉

      Please verify your brand new account by clicking the following link:

{{ .VerificationURL }}

Your Community-Support 💚`,
      body: `<p>Hi <b>{{ .Identity.traits.username }}</b>,</p>
<p>We are excited to have you at serlo.org 🎉</p>
<p>Please verify your account by clicking the following link:<br/>
<a style="color: #007EC1 !important;" href="{{ .VerificationURL }}">{{ .VerificationURL }}</a>
</p><p>Your Community-Support 💚</p>
      `
    },
    invalid: {
      subject: `👋 Someone tried to verify this email address`,
      'body.plaintext': `👋 Hi there,

Someone asked to verify this email address, but we were unable to find an account at serlo.org for this address.

If it was you, check if you registered using a different address.

Otherwise, please just ignore this email.

✌️`,
      body: `<p>👋 Hi there,</p>
<p>Someone asked to verify this email address, but we were unable to find an account at <a href="https://serlo.org">serlo.org</a> for this address.</p>
<p>If this was you, check if you registered using a different address.</p>
<p>Otherwise, please just ignore this email.</p>
<p>✌️</p>`
    }
  }
};