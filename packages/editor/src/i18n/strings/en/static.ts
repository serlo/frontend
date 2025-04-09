export type StaticStrings = typeof staticStrings

export const staticStrings = {
  lang: 'en',
  plugins: {
    article: {
      exercisesTitle: 'Exercises',
      moreExercises: 'You can find more exercises in the following folder:',
      relatedContentTitle: 'Still want more?',
      relatedContentText: 'You can find more content on this topic here:',
      sourcesTitle: 'Sources',
      subsectionTypes: {
        articles: 'Articles',
        courses: 'Courses',
        videos: 'Videos',
      },
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
      pages: 'Course overview',
      next: 'Next',
      back: 'Back',
      noRevisionForPage: 'unreviewed page',
    },
    exercise: {
      title: 'Exercise',
      prerequisite: 'For this task you need the following basic knowledge:',
      task: 'Task',
      answer: 'Answer',
      check: 'Check',
      yourAnswer: 'Your answer…',
      chooseOption: 'Click on one of the options.',
      printModeChooseOption: 'Check one of the options.',
      strategy: 'Strategy',
      solution: 'Proposed Solution',
      showHiddenInteractive: 'Check your solution here',
      feedback: {
        title: 'Feedback',
        correct: 'Correct!',
        missedSome: 'Almost! You missed at least one correct answer.',
        incorrect0: "Unfortunately, you're answer isn't quite right yet.",
        incorrect1: 'Try again.',
        incorrect2: 'Have another go.',
        incorrect3: 'Have another think.',
        incorrect4:
          "Have another go. Unfortunately your answer isn't correct yet.",
        incorrect5: "Your answer isn't correct yet. Have another think.",
        incorrect6: "Try again, unfortunately your answer isn't correct yet.",
      },
    },
    image: {
      altFallback: 'Image',
    },
    imageGallery: {
      lightboxSrTitle:
        'Modal displaying a single large image, with buttons to navigate to other images in the gallery',
    },
    injection: {
      injectedContent: 'Source',
      license: 'License info',
    },
    video: {
      failed: "Sorry, the video couldn't be loaded.",
    },
    interactiveVideo: {
      play: 'Play',
      rewind: 'Rewind',
      mandatoryWarning: 'You have to solve the task first.',
      exerciseSolved: "Well done! Let's move on.",
      repeatPromt: 'Take another look at the part of the video before the task',
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
