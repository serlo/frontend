import { cn } from '@editor/utils/cn'

export function getStyleHacks(
  focused: boolean,
  isMediaChildFocused: boolean,
  isMediaChildFocusedWithin: boolean
) {
  return cn(
    // active border style in editor
    focused && '[&>div]:border-editor-primary-100',

    // when a top toolbar is shown, do not round top border (for article intro, first rows child, media child)
    `
    [&:has(.explanation-wrapper>.plugin-wrapper-container:not(.plugin-rows):focus-within)>div]:rounded-t-none
    [&:has(.explanation-wrapper_.rows-child:first-child:focus-within)>div]:rounded-t-none
    [&:has(.media-wrapper:focus-within)>div]:rounded-t-none
    `,
    // for multimedia plugin itself
    focused && '[&>div]:rounded-t-none',

    // also make top border yellow
    `
    [&:has(.explanation-wrapper>.plugin-wrapper-container:not(.plugin-rows):focus-within)>div]:border-t-transparent
    [&:has(.explanation-wrapper_.rows-child:first-child:focus-within)>div]:border-t-transparent
    [&:has(.media-wrapper:focus-within)>div]:border-t-transparent
    `,

    // fix add button position
    '[&_.add-trigger]:relative [&_.add-trigger]:-left-1/4',

    // Improve toolbars for multimedia children.
    // hacky but this way the complexity is contained in the parent plugin

    // put top child toolbars in position of multimedia toolbar (for article intro, first rows child, media child)
    `
    [&_.explanation-wrapper>.plugin-wrapper-container_.plugin-toolbar]:!-top-[12]
    [&_.explanation-wrapper_.rows-child:first-child_.plugin-toolbar]:!-top-[12]
    [&_.media-wrapper_.plugin-toolbar]:!-top-[12]
    `,

    // adapt to borders of parent
    `
    [&_.explanation-wrapper_.rows-child:not(:first-child)_.plugin-toolbar]:!ml-[1px]
    [&_.explanation-wrapper_.rows-child:not(:first-child)_.plugin-toolbar]:!mr-0
    [&_.explanation-wrapper_.rows-child:not(:first-child)_.plugin-toolbar]:rounded-t-none
    `,

    // make media-child's toolbar full width of multimedia plugin
    // also media-wrapper needs to be relative to be clickable (is float:right)
    // but needs to be static to not restrict toolbar width
    (isMediaChildFocused || isMediaChildFocusedWithin) &&
      '[&_.media-wrapper]:!static [&_.media-wrapper_.plugin-wrapper-container]:!static',

    // top toolbars border radius right (for article intro, first rows child, media child)
    `
    [&_.explanation-wrapper>.plugin-wrapper-container_.plugin-toolbar]:rounded-tr-none
    [&_.explanation-wrapper_.rows-child:first-child_.plugin-toolbar]:rounded-tr-none
    [&_.media-wrapper_.plugin-toolbar]:rounded-tr-none
    `
  )
}
