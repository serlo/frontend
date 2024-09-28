export type StaticStrings = typeof staticStrings

export const staticStrings = {
  plugins: {
    article: {
      exercisesTitle: 'Exercises',
      moreExercises: 'You can find more exercises in the following folder:',
      relatedContentTitle: 'Still want more?',
      relatedContentText: 'You can find more content on this topic here:',
      sourcesTitle: 'Sources',
    },
    audio: {
      failed: "Sorry, the audio file couldn't be loaded.",
    },
    box: {
      types: {
        blank: 'Blank',
        example: 'Example',
        quote: 'Quote',
        approach: 'Approach',
        remember: 'Remember',
        attention: 'Attention',
        note: 'Note',
        definition: 'Definition',
        theorem: 'Theorem',
        proof: 'Proof',
      },
    },
    course: {
      title: 'Course',
      showPages: 'Show course overview',
      pages: 'Course overview',
      next: 'Next',
      back: 'Back',
      noPagesWarning:
        'Sorry there seem to be no reviewed pages in this course yet.',
      noRevisionForPage: 'unreviewed page',
    },
    exercise: {
      prerequisite: 'For this task you need the following basic knowledge:',
      task: 'Task',
      correct: 'Correct',
      missedSome: 'Almost! You missed at least one correct answer.',
      wrong: 'Wrong',
      feedback: 'Feedback',
      answer: 'Answer',
      check: 'Check',
      yourAnswer: 'Your answer…',
      chooseOption: 'Click on one of the options.',
      printModeChooseOption: 'Check one of the options.',
      strategy: 'Strategy',
      solution: 'Proposed Solution',
      showHiddenInteractive: 'Check your solution here',
    },
    image: {
      altFallback: 'Image',
    },
    imageGallery: {
      lightboxSrTitle:
        'Modal displaying a single large image, with buttons to navigate to other images in the gallery',
    },
    video: {
      failed: "Sorry, the video couldn't be loaded.",
    },
  },
  embed: {
    activateEmbed: 'Activate',
    previewImage: 'Preview Image',
  },
  misc: {
    ctrl: 'ctrl',
    return: 'return',
    loading: 'Loading',
  },
}
