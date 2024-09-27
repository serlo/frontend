export type StaticStrings = typeof staticStrings

export const staticStrings = {
  plugins: {
    course: {
      showPages: 'Show course overview',
      pages: 'Course overview',
      next: 'Next',
      back: 'Back',
      noPagesWarning:
        'Sorry there seem to be no reviewed pages in this course yet.',
      noRevisionForPage: 'unreviewed page',
    },
  },
} as const
