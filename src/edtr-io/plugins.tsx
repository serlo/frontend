import { EditorPlugin } from '@edtr-io/plugin'
import { createAnchorPlugin } from '@edtr-io/plugin-anchor'
import { createBlockquotePlugin } from '@edtr-io/plugin-blockquote'
import { createGeogebraPlugin } from '@edtr-io/plugin-geogebra'
import {
  createInputExercisePlugin,
  InputExerciseType,
} from '@edtr-io/plugin-input-exercise'
import { createMultimediaExplanationPlugin } from '@edtr-io/plugin-multimedia-explanation'
import { createRowsPlugin, RowsConfig } from '@edtr-io/plugin-rows'
import { createScMcExercisePlugin } from '@edtr-io/plugin-sc-mc-exercise'
import { createSpoilerPlugin } from '@edtr-io/plugin-spoiler'
import { createTextPlugin } from '@edtr-io/plugin-text'
import { createVideoPlugin } from '@edtr-io/plugin-video'
import * as React from 'react'

import { articlePlugin } from './plugins/article'
import { createBoxPlugin } from './plugins/box'
import { deprecatedPlugin } from './plugins/deprecated'
import { equationsPlugin } from './plugins/equations'
import { errorPlugin } from './plugins/error'
import { exercisePlugin } from './plugins/exercise'
import { createHighlightPlugin } from './plugins/highlight'
import { createImagePlugin } from './plugins/image'
import { createImportantPlugin } from './plugins/important'
import { injectionPlugin } from './plugins/injection'
import { layoutPlugin } from './plugins/layout'
import { pageLayoutPlugin } from './plugins/page-layout'
import { separatorPlugin } from './plugins/separator'
import { serloTablePlugin } from './plugins/serlo-table'
import { solutionPlugin } from './plugins/solution'
import { tablePlugin } from './plugins/table'
import { appletTypePlugin } from './plugins/types/applet'
import { articleTypePlugin } from './plugins/types/article'
import { courseTypePlugin } from './plugins/types/course'
import { coursePageTypePlugin } from './plugins/types/course-page'
import { eventTypePlugin } from './plugins/types/event'
import { pageTypePlugin } from './plugins/types/page'
import { taxonomyTypePlugin } from './plugins/types/taxonomy'
import { textExerciseTypePlugin } from './plugins/types/text-exercise'
import { textExerciseGroupTypePlugin } from './plugins/types/text-exercise-group'
import { textSolutionTypePlugin } from './plugins/types/text-solution'
import { userTypePlugin } from './plugins/types/user'
import { videoTypePlugin } from './plugins/types/video'
import { SerializedDocument } from './serialized-document'
import { LoggedInData } from '@/data-types'

type PluginType =
  | SerializedDocument['plugin']
  | 'type-applet'
  | 'type-article'
  | 'type-course'
  | 'type-course-page'
  | 'type-event'
  | 'type-page'
  | 'type-taxonomy'
  | 'type-text-exercise'
  | 'type-text-exercise-group'
  | 'type-text-solution'
  | 'type-user'
  | 'type-video'

export function createPlugins({
  getCsrfToken,
  editorStrings,
  registry,
}: {
  getCsrfToken: () => string
  editorStrings: LoggedInData['strings']['editor']
  registry: RowsConfig['plugins']
}): Record<string, EditorPlugin<any, any>> &
  Record<PluginType, EditorPlugin<any, any>> {
  const textPluginI18n = {
    blockquote: {
      toggleTitle: editorStrings.text.quote,
    },
    colors: {
      setColorTitle: editorStrings.text.setColor,
      resetColorTitle: editorStrings.text.resetColor,
      openMenuTitle: editorStrings.text.colors,
      closeMenuTitle: editorStrings.text.closeSubMenu,
    },
    headings: {
      setHeadingTitle(level: number) {
        return `${editorStrings.text.heading} ${level}`
      },
      openMenuTitle: editorStrings.text.headings,
      closeMenuTitle: editorStrings.text.closeSubMenu,
    },
    link: {
      toggleTitle: editorStrings.text.linkStrgK,
      placeholder: editorStrings.text.enterUrl,
      openInNewTabTitle: editorStrings.text.openInNewTab,
    },
    list: {
      toggleOrderedList: editorStrings.text.orderedList,
      toggleUnorderedList: editorStrings.text.unorderedList,
      openMenuTitle: editorStrings.text.lists,
      closeMenuTitle: editorStrings.text.closeSubMenu,
    },
    math: {
      toggleTitle: editorStrings.text.mathFormula,
      displayBlockLabel: editorStrings.text.displayAsBlock,
      placeholder: editorStrings.text.formula,
      editors: {
        visual: editorStrings.text.visual,
        latex: editorStrings.text.laTeX,
        noVisualEditorAvailableMessage: editorStrings.text.onlyLaTeX,
      },
      helpText(KeySpan: React.ComponentType<{ children: React.ReactNode }>) {
        return (
          <>
            {editorStrings.text.shortcuts}:
            <br />
            <br />
            <p>
              {editorStrings.text.fraction}: <KeySpan>/</KeySpan>
            </p>
            <p>
              {editorStrings.text.superscript}: <KeySpan>↑</KeySpan>{' '}
              {editorStrings.text.or} <KeySpan>^</KeySpan>
            </p>
            <p>
              {editorStrings.text.subscript}: <KeySpan>↓</KeySpan>{' '}
              {editorStrings.text.or} <KeySpan>_</KeySpan>
            </p>
            <p>
              π, α, β, γ: <KeySpan>pi</KeySpan>, <KeySpan>alpha</KeySpan>,{' '}
              <KeySpan>beta</KeySpan>,<KeySpan>gamma</KeySpan>
            </p>
            <p>
              ≤, ≥: <KeySpan>{'<='}</KeySpan>, <KeySpan>{'>='}</KeySpan>
            </p>
            <p>
              {editorStrings.text.root}: <KeySpan>\sqrt</KeySpan>,{' '}
              <KeySpan>\nthroot</KeySpan>
            </p>
            <p>
              {editorStrings.text.mathSymbols}: <KeySpan>{'\\<NAME>'}</KeySpan>,{' '}
              {editorStrings.text.eG} <KeySpan>\neq</KeySpan> (≠),{' '}
              <KeySpan>\pm</KeySpan> (±), ...
            </p>
            <p>
              {editorStrings.text.functions}: <KeySpan>sin</KeySpan>,{' '}
              <KeySpan>cos</KeySpan>, <KeySpan>ln</KeySpan>, ...
            </p>
          </>
        )
      },
    },
    richText: {
      toggleStrongTitle: editorStrings.text.bold,
      toggleEmphasizeTitle: editorStrings.text.italic,
    },
    suggestions: {
      noResultsMessage: editorStrings.text.noItemsFound,
    },
  }

  return {
    anchor: createAnchorPlugin({
      i18n: {
        label: editorStrings.anchor.identifier,
        placeholder: editorStrings.anchor.anchorId,
      },
    }),
    article: articlePlugin,
    articleIntroduction: createMultimediaExplanationPlugin({
      explanation: {
        plugin: 'text',
        config: {
          placeholder: editorStrings.article.writeShortIntro,
        },
      },
      plugins: [
        {
          name: 'image',
          title: editorStrings.multimedia.image,
        },
      ],
      i18n: {
        changeMultimediaType: editorStrings.multimedia.changeType,
        illustrating: {
          label: editorStrings.multimedia.howImportant,
          values: {
            illustrating: editorStrings.multimedia.isIllustrating,
            explaining: editorStrings.multimedia.isEssential,
          },
        },
      },
    }),
    blockquote: createBlockquotePlugin({
      content: {
        plugin: 'text',
      },
    }),
    box: createBoxPlugin(editorStrings),
    error: errorPlugin,
    deprecated: deprecatedPlugin,
    equations: equationsPlugin,
    exercise: exercisePlugin,
    geogebra: createGeogebraPlugin({
      i18n: {
        label: editorStrings.geogebra.urlOrId,
      },
    }),
    highlight: createHighlightPlugin({
      i18n: {
        code: {
          label: editorStrings.highlight.clickAndEnter,
          placeholder: editorStrings.highlight.enterHere,
        },
        language: {
          label: editorStrings.highlight.language,
          placeholder: editorStrings.highlight.enterLanguage,
        },
        showLineNumbers: {
          label: editorStrings.highlight.showLineNumbers,
        },
      },
    }),
    image: createImagePlugin(getCsrfToken),
    important: createImportantPlugin(),
    injection: injectionPlugin,
    inputExercise: createInputExercisePlugin({
      feedback: {
        plugin: 'text',
      },
      i18n: {
        types: {
          [InputExerciseType.InputStringNormalizedMatchChallenge]:
            editorStrings.inputExercise.text,
          [InputExerciseType.InputNumberExactMatchChallenge]:
            editorStrings.inputExercise.number,
          [InputExerciseType.InputExpressionEqualMatchChallenge]:
            editorStrings.inputExercise.mathematicalExpressionSolution,
        },
        type: {
          label: editorStrings.inputExercise.chooseType,
        },
        unit: {
          label: editorStrings.inputExercise.unit,
        },
        answer: {
          addLabel: editorStrings.inputExercise.addAnswer,
          value: {
            placeholder: editorStrings.inputExercise.enterTheValue,
          },
        },
        inputPlaceholder: editorStrings.inputExercise.yourSolution,
        fallbackFeedback: {
          correct: editorStrings.inputExercise.correct,
          wrong: editorStrings.inputExercise.wrong,
        },
      },
    }),
    layout: layoutPlugin,
    pageLayout: pageLayoutPlugin,
    multimedia: createMultimediaExplanationPlugin({
      explanation: { plugin: 'rows' },
      plugins: [
        {
          name: 'image',
          title: editorStrings.multimedia.image,
        },
        {
          name: 'video',
          title: editorStrings.multimedia.video,
        },
        {
          name: 'geogebra',
          title: editorStrings.multimedia.geogebraTitle,
        },
      ],
      i18n: {
        changeMultimediaType: editorStrings.multimedia.changeType,
        illustrating: {
          label: editorStrings.multimedia.howImportant,
          values: {
            illustrating: editorStrings.multimedia.isIllustrating,
            explaining: editorStrings.multimedia.isEssential,
          },
        },
      },
    }),
    rows: createRowsPlugin({
      content: { plugin: 'text' },
      plugins: registry,
      i18n: {
        menu: {
          searchPlaceholder: editorStrings.rows.searchForTools,
        },
        settings: {
          duplicateLabel: editorStrings.rows.duplicate,
          removeLabel: editorStrings.rows.remove,
          closeLabel: editorStrings.rows.close,
        },
        toolbar: {
          dragLabel: editorStrings.rows.dragElement,
        },
        addLabel: editorStrings.rows.addAnElement,
      },
    }),
    scMcExercise: createScMcExercisePlugin({
      content: { plugin: 'text' },
      feedback: { plugin: 'text' },
      i18n: {
        types: {
          singleChoice: editorStrings.scMcExercise.singleChoice,
          multipleChoice: editorStrings.scMcExercise.multipleChoice,
        },
        isSingleChoice: {
          label: editorStrings.scMcExercise.chooseType,
        },
        answer: {
          addLabel: editorStrings.scMcExercise.addAnswer,
          fallbackFeedback: {
            wrong: editorStrings.scMcExercise.wrong,
          },
        },
        globalFeedback: {
          missingCorrectAnswers: editorStrings.scMcExercise.missedSome,
          correct: editorStrings.scMcExercise.correct,
          wrong: editorStrings.scMcExercise.wrong,
        },
      },
    }),
    separator: separatorPlugin,
    serloTable: serloTablePlugin,
    solution: solutionPlugin,
    spoiler: createSpoilerPlugin({
      content: { plugin: 'rows' },
      i18n: {
        title: {
          placeholder: editorStrings.spoiler.enterATitle,
        },
      },
    }),
    table: tablePlugin,
    text: createTextPlugin({
      registry,
      i18n: textPluginI18n,
    }),
    video: createVideoPlugin({
      i18n: {
        src: {
          label: editorStrings.video.videoUrl,
        },
        alt: {
          label: editorStrings.video.description,
        },
      },
    }),

    // Internal plugins for our content types
    'type-applet': appletTypePlugin,
    'type-article': articleTypePlugin,
    'type-course': courseTypePlugin,
    'type-course-page': coursePageTypePlugin,
    'type-event': eventTypePlugin,
    'type-page': pageTypePlugin,
    'type-taxonomy': taxonomyTypePlugin,
    'type-text-exercise': textExerciseTypePlugin,
    'type-text-exercise-group': textExerciseGroupTypePlugin,
    'type-text-solution': textSolutionTypePlugin,
    'type-user': userTypePlugin,
    'type-video': videoTypePlugin,
  }
}
