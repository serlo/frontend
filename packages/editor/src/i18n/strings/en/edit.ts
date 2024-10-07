export type EditStrings = typeof editStrings

export const editStrings = {
  lang: 'en',
  confirmRouteChange: 'Are you sure you want to leave without saving?',
  noChangesWarning: 'Nothing changed so there is no need to save yet',
  addPluginsModal: {
    searchInputPlaceholder: 'Search...',
    basicPluginsTitle: 'Content Elements',
    interactivePluginsTitle: 'Exercises',
    noPluginsFoundTitle: 'Sorry, no elements match your search.',
    noPluginsFoundDescription:
      'Please try different keywords or browse through all available elements.',
  },
  pluginMenu: {
    singleChoiceExercise: {
      title: 'Single Choice Exercise',
      description:
        'A question with a selection of answer options and a single correct one.',
    },
    multipleChoiceExercise: {
      title: 'Multiple Choice Exercise',
      description:
        'A question with a selection of answer options with potentially multiple correct answers.',
    },
    blanksExercise: {
      title: 'Fill In The Blanks (Typing)',
      description:
        'Create a fill in the blanks exercise (text or table) where learners add the answers via typing.',
    },
    blanksExerciseDragAndDrop: {
      title: 'Fill In The Blanks (Drag&Drop)',
      description:
        'Create a fill in the blanks exercise (text or table) where learners add the answers via drag and drop.',
    },
  },
  plugins: {
    anchor: {
      title: 'Anchor',
      description: 'Insert an anchor.',
      identifier: 'Identifier (e.g. "long-explanation")',
      anchorId: 'ID of the anchor',
    },
    box: {
      title: 'Container',
      description:
        'Insert a container for examples, quotes, warnings, theorems, notes…',
      type: 'Type of box',
      typeTooltip: 'Choose the type of the box',
      titlePlaceholder: '(optional title)',
      anchorId: 'Anchor ID',
      emptyContentWarning: 'Boxes without content will not be displayed',
    },
    dropzoneImage: {
      title: 'Interactive Image (Dropzones)',
      description:
        'Create an exercise where given answers must be dragged into the correct zones of a picture or a blank background.',
      backgroundImage: 'Background image',
      addDropZone: 'Add drop zone',
      removeDropZone: 'Remove drop zone',
      dropzoneVisibility: 'Dropzone Visibility',
      visibilityOptions: {
        full: 'full',
        partial: 'partial',
        none: 'none',
      },
      answers: {
        add: 'Add answer',
        remove: 'Remove answer',
        edit: 'Edit answer',
        settings: 'Answer settings',
        answersPlaceholder: 'Here you will find your dropzone answers',
      },
      answerZone: {
        description: 'Description (optional)',
        sizeLabel: 'Configure the size of the drop zone',
        duplicate: 'Duplicate zone',
        delete: 'Delete zone',
      },
      backgroundType: {
        description:
          'Insert a background image or proceed with a blank background',
        image: 'Background Image',
        blank: 'Blank background',
      },
      backgroundShapes: {
        description: 'Choose the layout of the background',
        square: 'Square',
        landscape: 'Landscape',
        portrait: 'Portrait',
      },
      or: 'or',
      modal: {
        settings: 'Settings',
        createDropZone: 'New Drop Zone',
        edit: 'Edit Answer',
        createWrongAnswer: 'Create Wrong Answer',
      },
    },
    unsupported: {
      title: 'Unsupported',
      description: 'Plugin not supported by this version of the editor.',
      notSupported: 'Sorry, this plugin is not supported:',
      explanation:
        'It will not be displayed to users. You can either remove it or asks developers for support.',
    },
    equations: {
      title: 'Terms and equations',
      description:
        'Create term transformations and solve multi-line equations.',
      leftHandSide: 'left-hand side',
      transformation: 'transformation',
      mode: 'Mode',
      transformationExample: 'e.g. -3x',
      transformationOfEquations: 'Transformation of equations',
      transformationOfTerms: 'Transformation of terms',
      addNewRow: 'Add new row',
      explanation: 'Explanation',
      term: 'Term',
      rightHandSide: 'right-hand side',
      combineLikeTerms: 'Combine like terms.',
      setEqual: 'Set the terms equal to each other.',
      firstExplanation: 'First explanation',
      removeRowLabel: 'Remove row',
    },
    geogebra: {
      title: 'GeoGebra Applet',
      description: 'Embed GeoGebra materials applets via URL or ID.',
      chooseApplet: 'Choose Applet',
      urlOrId: 'GeoGebra URL or ID',
    },
    highlight: {
      title: 'Source Code',
      description:
        'Write code and highlight it according to the programming language.',
      clickAndEnter: 'Click here and enter your source code…',
      enterHere: 'Enter your source code here',
      language: 'Language',
      languageTooltip: 'Choose language for syntax highlighting',
      showLineNumbers: 'Line numbers',
      lineNumbersTooltip: 'Should users see line numbers?',
    },
    image: {
      title: 'Image',
      galleryTitle: 'Gallery',
      description: 'Upload images or search online for freely licensed images.',
      upload: 'Upload Image',
      uploadMultiple: 'Upload Images',
      imageUrl: 'Image URL',
      imageSource: 'Image Source',
      imageSourceHelpText: 'Add the author or source of this image here',
      invalidImageUrl: 'Error: Invalid or Incomplete URL',
      invalidImageUrlMessage:
        'The URL you entered is either invalid or incomplete. Please ensure you have copied and pasted the full URL correctly. The URL should start with "http://" or "https://".',
      search: 'Search',
      searchOnline: 'Search online for licence-free images',
      placeholderSource: 'Source (optional)',
      placeholderEmpty: 'https://example.com/image.png',
      placeholderUploading: 'Uploading…',
      placeholderFailed: 'Upload failed…',
      retry: 'Retry',
      failedUpload: 'Upload failed',
      captionPlaceholder: 'Optional caption',
      href: 'Link',
      hrefPlaceholder: 'Link the image',
      alt: 'Description (hidden)',
      altPlaceholder: 'Describe what the image shows',
      maxWidth: 'Maximum width',
      maxWidthPlaceholder: 'Enter the maximum width',
      helpTooltipText: 'More information and help related to Image Plugin',
      change: 'Change image',
      licence: 'Licence',
      licenceHelpText:
        'External content with the following licenses may be integrated on serlo.org:',
      licenceFree: 'Licence Free Images',
      pixabayText: 'Images will be fetched from Pixabay',
      pixabayLoadedText: 'These images were loaded from Pixabay.',
      searching: 'Searching for images ...',
      loadingImage: 'Downloading image ...',
      noImagesFound: 'No images found',
    },
    imageGallery: {
      title: 'Image Gallery',
      description:
        'Add an image gallery to display related images in an organized way.',
      modalScreenReaderTitle:
        'Modal displaying single image options for caption and settings.',
      addImages: 'Add Images',
      tooManyImagesMessage:
        'You can only upload %max_images% images in this element. Please select fewer images and try again.',
      alreadyMaxImagesMessage:
        'Maximum of %max_images% images reached. Please remove one or more images to upload new ones.',
    },
    injection: {
      title: 'serlo.org Content',
      description: 'Embed an existing content from serlo.org via ID.',
      illegalInjectionFound: 'Illegal injection found',
      serloEntitySrc: 'Serlo entity {{src}}',
      serloId: 'Serlo ID',
      placeholder: 'Serlo ID (e.g. /1565)',
      invalidStateWarning:
        "Please use a valid Serlo ID (just numbers). E.g. '/1555'",
    },
    interactiveVideo: {
      title: 'Interactive Video',
      description: 'Create an interactive video with questions and feedback.',
      editOverlayTitle: 'Edit Exercise',
      titlePlaceholder: 'Title',
      defaultTitle: 'Exercise',
      autoOpenLabel: 'Automatically open',
      autoOpenExplanation: 'Content automatically opens when video is at mark',
      mandatoryLabel: 'Mandatory Exercise',
      mandatoryExplanation: 'Exercise has to be solved to continue video',
      forceRewatchLabel: 'Auto Rewatch',
      forceRewatchExplanation:
        'If an exercise is answered incorrectly, the video jumps back to the last mark',
      editMark: 'Edit',
      removeMark: 'Remove',
      addOverlayContent: 'Add exercise',
    },
    multimedia: {
      title: 'Multimedia content associated with text',
      description:
        'Create an illustrating or explaining multimedia content associated with text.',
      chooseSize: 'Choose size of multimedia element',
      changeType: 'Change the multimedia type',
      howImportant: 'How important is the multimedia content?',
      isIllustrating: 'It is illustrating',
      isEssential: 'It is essential',
      reset: 'Reset the multimedia content',
    },
    pageLayout: {
      title: 'Layout Column for Pages',
      description: "The plugin the people want but don't get 🤫",
      chooseRatio: 'Choose column ratio',
    },
    pasteHack: {
      title: 'Experimental State-Paste Plugin',
      description: 'only on staging',
    },
    pageTeam: {
      title: 'Team Overview',
      description: 'Only for the teampages',
    },
    pagePartners: {
      title: 'Partner List',
      description:
        'Only for partner page (List of partner logos like on de.serlo.org/)',
    },
    rows: {
      title: 'Rows',
      description: 'Rows plugin holds other plugins',
      searchForTools: 'Search for tools…',
      duplicate: 'Duplicate',
      copyAnchorLink: 'Copy link to this element',
      remove: 'Remove',
      close: 'Close',
      dragElement: 'Drag the element within the document',
      addAnElement: 'Add an element',
    },
    serloTable: {
      title: 'Table',
      description: 'Create a customizable table.',
      mode: 'Mode',
      columnHeaders: 'Only column headers',
      rowHeaders: 'Only row headers',
      columnAndRowHeaders: 'Column and row headers',
      convertToText: 'Convert to text',
      convertToImage: 'Convert to image',
      row: 'row',
      column: 'column',
      addType: 'Add %type%',
      addTypeBefore: 'Add %type% before',
      deleteType: 'Delete %type%',
      confirmDelete:
        'Are you sure you want to delete this %type% and the content in it?',
    },
    spoiler: {
      title: 'Spoiler',
      description:
        'Insert a fold-out box, e.g. for additional content or help.',
      enterATitle: 'Enter a title',
    },
    solution: {
      title: 'Non interactive exercise',
      description:
        'Create a non-interactive task that learners answer manually. You can still include solutions and strategies.',
    },
    text: {
      title: 'Text',
      description: 'Compose content using rich text and math formulas.',
      placeholder: 'Write something...',
      addButtonExplanation: 'Click to insert new element',
      quote: 'Quote',
      setColor: 'Set color',
      resetColor: 'Reset color',
      colors: 'Colors',
      closeSubMenu: 'Close sub menu',
      heading: 'Heading',
      headings: 'Headings',
      link: 'Link (%ctrlOrCmd% + K)',
      noElementPasteInLists:
        'Sorry, pasting elements inside of lists is not allowed.',
      pastingPluginNotAllowedHere:
        'Sorry, pasting this plugin here is not allowed.',
      linkOverlay: {
        placeholder: 'https://… or /1234',
        inputLabel: 'Paste or type a link',
        edit: 'Edit Link',
        remove: 'Remove Link',
        customLink: 'Custom Link',
        invalidLinkWarning:
          'Please provide a valid link that starts with http(s)://…',
      },
      openInNewTab: 'Open in new tab',
      orderedList: 'Ordered list',
      unorderedList: 'Unordered list',
      lists: 'Lists',
      mathFormula: 'Math formula (%ctrlOrCmd% + M)',
      code: 'Code (%ctrlOrCmd% + ⇧ + C)',
      blank: 'Blank',
      createBlank: 'Create Blank',
      removeBlank: 'Remove Blank',
      bold: 'Bold (%ctrlOrCmd% + B)',
      italic: 'Italic (%ctrlOrCmd% + I)',
      colorNames: {
        blue: 'Blue',
        green: 'Green',
        orange: 'Orange',
      },
      math: {
        formula: '[formula]',
        visual: 'visual',
        latex: 'LaTeX',
        latexEditorTitle: 'LaTeX editor',
        onlyLatex: 'Only LaTeX editor available',
        shortcuts: 'Shortcuts',
        fraction: 'Fraction',
        superscript: 'Superscript',
        or: 'or',
        subscript: 'Subscript',
        root: 'Root',
        mathSymbols: 'Math symbols',
        eG: 'e.g.',
        functions: 'Functions',
        displayAsBlock: 'Display as block',
        closeMathFormulaEditor: 'Close math formula editor',
      },
    },
    video: {
      title: 'Video',
      description:
        'Embed videos from e.g. YouTube, Vimeo or Wikimedia Commons.',
      videoUrl: 'Video URL',
      videoDescription: 'Description',
      titlePlaceholder: 'Title',
      url: 'URL',
      seoTitle: 'Title for search engines',
    },
    audio: {
      title: 'Audio',
      description: 'Link to audio files on Vocaroo',
      audioUrl: 'Enter Audio URL',
    },
    exercise: {
      title: 'Exercise',
      description: 'Interactive or text based exercise',
      placeholder: 'Type the assignment here (Optional)',
      hideInteractiveInitially: {
        info: 'Interactive element collapsed on load',
        deactivate: 'Load Interactive Element visible',
        activate: 'Load Interactive Element collapsed',
      },
      addOptionalInteractiveEx: 'Add an optional interactive exercise:',
      changeInteractive: 'Change interactive element',
      confirmRemoveInteractive:
        'Your current changes will be replaced. Are you sure?',
      createSolution: 'Create solution',
      removeSolution: 'Remove solution',
      previewMode: 'Preview',
      previewIsActiveHint: 'Preview mode is active',
      previewIsDeactiveHint: 'Here you can edit',
    },
    exerciseGroup: {
      title: 'Exercise Group',
      description: 'Group multiple exercises together',
    },
    inputExercise: {
      title: 'Input Exercise',
      description:
        'Create a task where an exact input or value can be entered and validated.',
    },
    textAreaExercise: {
      title: 'Text Box Exercise',
      description: 'A big text box for long answers. No feedback.',
    },
    scMcExercise: {
      title: 'SC/MC Exercise',
    },
    h5p: {
      title: 'H5P',
      description: 'Import an interactive task from H5P via URL.',
    },
    blanksExercise: {
      title: 'Fill In The Blanks',
      placeholder: 'Write a text and add blanks',
      chooseType: 'Choose the exercise type',
      chooseChildPluginType: 'Choose the answer type',
      modes: {
        typing: 'Typing',
        'drag-and-drop': 'Drag & Drop',
      },
      dummyAnswers: 'Extra incorrect answers',
      addDummyAnswer: 'Add an incorrect answer',
      removeDummyAnswer: 'Remove extra answer',
      addAlternativeAnswer: 'Add an alternative answer',
      removeAlternativeAnswer: 'Remove alternative answer',
      alternativeAnswers: 'Alternative answers',
      acceptMathEquivalents: 'Accept all equivalent mathematical values',
      childPluginSelection:
        'Would you like to add blanks to a text or a table?',
    },
  },
  templatePlugins: {
    entity: {
      titlePlaceholder: 'Title',
      seoTitle: 'Title for search engines',
      seoDesc: 'Description for search engines',
      moveUpLabel: 'Move up',
      moveDownLabel: 'Move down',
    },
    article: {
      stillWantMore: 'Still want more?',
      moreOnTopic: 'You can find more content on this topic here',
      addSource: 'Add source',
      removeLabel: 'Remove',
      dragLabel: 'Drag to change order',
      openInTab: 'Open in new tab',
      sources: 'Sources',
      sourceText: 'Source Text',
      sourceUrl: 'Optional URL',
      moreInFolder: 'You can find more exercises in the following folder',
      addModal: {
        introText:
          'After reading the article, what would help out learners next? %break% Here you can add some %exercises% or link to a single %exerciseFolder%. %break% Or you can suggest %articles%, %courses% or %videos% to follow up with.',
        introText2:
          'You can either paste an Serlo ID, an URL or choose content from the parent folder below.',
        buttonEx: 'Add exercises',
        buttonExFolder: 'Select exercise folder',
        buttonContent: 'Add content',
        buttonAddType: 'Add %type%',
        title: 'Add related Content or Exercises',
        invalidInput: 'Invalid id or url',
        fetchError: 'Something went wrong, please try later',
        loading: 'Loading…',
        notFound: 'Could not find that content',
        unsupportedType: 'Sorry, type [%type%] is not supported here',
        unsupportedId: 'Sorry, this ID is not supported here',
        addFromFolderTitle: 'From the folder',
        placeholder: 'Paste Serlo ID or URL here',
        exerciseFolderNote: 'Only one can be selected here',
      },
    },
    course: {
      removeCoursePage: 'Remove course page',
      addCoursePage: 'Add course page',
      confirmDelete: 'Are you sure you want to delete this course page?',
    },
    inputExercise: {
      chooseType: 'Choose the exercise type',
      unit: 'Unit',
      addAnswer: 'Add answer',
      enterTheValue: 'Enter the value',
      feedbackPlaceholder: 'Add a feedback message for this answer',
      yourSolution: 'Your solution',
      types: {
        'input-string-normalized-match-challenge': "Text (exact, e.g. 'tiger')",
        'input-number-exact-match-challenge': "Number (exact, e.g. '0.5')",
        'input-expression-equal-match-challenge':
          "Mathematical expression (equivalent, e.g. '0.5' or '1/2' or '2/4'",
      },
    },
    scMcExercise: {
      singleChoice: 'Single-choice',
      multipleChoice: 'Multiple-choice',
      chooseType: 'Choose the exercise type',
      addAnswer: 'Add answer',
    },
    solution: {
      optionalExplanation: 'Optionally explain the solution strategy here',
      idArticle: 'ID of an article, e.g. 1855',
      openArticleTab: 'Open the article in a new tab:',
      linkTitle: 'Title of the link',
      showSolution: 'Show solution',
      hideSolution: 'Hide solution',
      changeLicense: 'Change license',
      addPrerequisite: 'Add link',
    },
    textExerciseGroup: {
      removeExercise: 'Remove exercise',
      addExercise: 'Add exercise',
      kindOfExerciseGroup: 'Kind of exercise group',
      addIntermediateTask: 'Add Intermediate Task',
      removeIntermediateTask: 'Remove intermediate Task',
      intermediateTask: 'Intermediate Task',
    },
  },
  edtrIo: {
    localStorage: {
      found:
        'You have locally saved edits of this revision. Do you want to load them?',
      foundButton: 'Load stored edits',
      restoreInitial:
        'Want to start fresh? Beware that this will delete your current edits!',
      restoreInitialButton: 'Delete changes',
      confirmRestore: 'Are you sure you want to delete all your changes?',
    },
    settings: 'Settings',
    extendedSettings: 'Extended Settings',
    close: 'Close',
    save: 'Save',
    saveWithReview: 'Save and get review',
    cancel: 'Cancel',
    saving: 'Saving…',
    missingChanges: 'You need to fill out the changes you made',
    missingLicenseTerms: 'You need to accept the license terms',
    missingChangesAndLicenseTerms:
      'You need to fill out the changes you made and accept the license terms',
    errorSaving: 'An error occurred during saving.',
    saveLocallyAndRefresh:
      'You can store the revision locally, refresh the page and try to save again.',
    revisionSaved: 'Revision saved',
    saveRevision: 'Save revision',
    changes: 'Describe your changes to the content',
    skipReview: 'Skip peer review (not recommended)',
    enableNotifs: 'Enable serlo.org notifications',
    enableNotifsMail: 'Enable notifications via e-mail',
    switchRevision: 'Switch to another revision',
    importOther: 'Import content from other entity',
    importOtherExplanation:
      "Just paste the url or id of another serlo.org entity of the same type here to duplicate it's content here. Do NOT use this to make exact copies or move content. Exercise Groups and Courses are not supported (but Exercises and Course Pages).",
    importOtherWarning:
      'Warning: This overwrites everything that is already present in this editor!',
    importOtherButton: 'Import content',
    current: 'Current',
    author: 'Author',
    createdAt: 'when?',
    ready: 'Ready to save?',
    pluginCopySuccess: 'Plugin copied!',
    pluginCopyInfo: 'You can now paste this plugin into text plugins',
    pluginCopyButtonLabel: 'Copy plugin to clipboard',
  },
}
