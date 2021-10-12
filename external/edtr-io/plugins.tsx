/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
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
import { deprecatedPlugin } from './plugins/deprecated'
import { equationsPlugin } from './plugins/equations'
import { errorPlugin } from './plugins/error'
import { exercisePlugin } from './plugins/exercise'
import { createHighlightPlugin } from './plugins/highlight'
import { createImagePlugin } from './plugins/image'
import { createImportantPlugin } from './plugins/important'
import { injectionPlugin } from './plugins/injection'
import { layoutPlugin } from './plugins/layout'
import { separatorPlugin } from './plugins/separator'
import { solutionPlugin } from './plugins/solution'
import { tablePlugin } from './plugins/table'
import { appletTypePlugin } from './plugins/types/applet'
import { articleTypePlugin } from './plugins/types/article'
import { courseTypePlugin } from './plugins/types/course'
import { coursePageTypePlugin } from './plugins/types/course-page'
import { eventTypePlugin } from './plugins/types/event'
import { mathPuzzleTypePlugin } from './plugins/types/math-puzzle'
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
  | 'type-math-puzzle'
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
  return {
    anchor: createAnchorPlugin({
      i18n: {
        label: editorStrings.anchor.identifier,
        placeholder: editorStrings.anchor.idOfTheAnchor,
      },
    }),
    article: articlePlugin,
    articleIntroduction: createMultimediaExplanationPlugin({
      explanation: {
        plugin: 'text',
        config: {
          placeholder: editorStrings.article.writeAShortIntroduction,
        },
      },
      plugins: [
        {
          name: 'image',
          title: editorStrings.multimedia.image,
        },
      ],
      i18n: {
        changeMultimediaType: editorStrings.multimedia.changeTheMultimediaType,
        illustrating: {
          label: editorStrings.multimedia.howImportantIsTheMultimediaContent,
          values: {
            illustrating: editorStrings.multimedia.itIsIllustrating,
            explaining: editorStrings.multimedia.itIsEssential,
          },
        },
      },
    }),
    blockquote: createBlockquotePlugin({
      content: {
        plugin: 'text',
      },
    }),
    error: errorPlugin,
    deprecated: deprecatedPlugin,
    equations: equationsPlugin,
    exercise: exercisePlugin,
    geogebra: createGeogebraPlugin({
      i18n: {
        label: editorStrings.geogebra.geoGebraUrlOrId,
      },
    }),
    highlight: createHighlightPlugin({
      i18n: {
        code: {
          label: editorStrings.highlight.clickHereAndEnterYourSourceCode,
          placeholder: editorStrings.highlight.enterYourSourceCodeHere,
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
            editorStrings.inputExercise.numberExactSolution,
          [InputExerciseType.InputExpressionEqualMatchChallenge]:
            editorStrings.inputExercise
              .mathematicalExpressionEquivalentSolution,
        },
        type: {
          label: editorStrings.inputExercise.chooseTheExerciseType,
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
          title: editorStrings.multimedia.geoGebraApplet,
        },
      ],
      i18n: {
        changeMultimediaType: editorStrings.multimedia.changeTheMultimediaType,
        illustrating: {
          label: editorStrings.multimedia.howImportantIsTheMultimediaContent,
          values: {
            illustrating: editorStrings.multimedia.itIsIllustrating,
            explaining: editorStrings.multimedia.itIsEssential,
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
          dragLabel: editorStrings.rows.dragTheElementWithinTheDocument,
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
          label: editorStrings.scMcExercise.chooseTheExerciseType,
        },
        answer: {
          addLabel: editorStrings.scMcExercise.addAnswer,
          fallbackFeedback: {
            wrong: editorStrings.scMcExercise.wrong,
          },
        },
        globalFeedback: {
          missingCorrectAnswers:
            editorStrings.scMcExercise.almostYouMissedAtLeastOneCorrectAnswer,
          correct: editorStrings.scMcExercise.correct,
          wrong: editorStrings.scMcExercise.wrong,
        },
      },
    }),
    separator: separatorPlugin,
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
      blockquote: 'blockquote',
      i18n: {
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
          toggleTitle: editorStrings.text.mathFormulaStrgM,
          displayBlockLabel: editorStrings.text.displayAsBlock,
          placeholder: editorStrings.text.formula,
          editors: {
            visual: editorStrings.text.visual,
            latex: editorStrings.text.laTeX,
            noVisualEditorAvailableMessage:
              editorStrings.text.onlyLaTeXEditorAvailable,
          },
          helpText(
            KeySpan: React.ComponentType<{ children: React.ReactNode }>
          ) {
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
                  {editorStrings.text.mathSymbols}:{' '}
                  <KeySpan>{'\\<NAME>'}</KeySpan>, {editorStrings.text.eG}{' '}
                  <KeySpan>\neq</KeySpan> (≠), <KeySpan>\pm</KeySpan> (±), ...
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
          toggleStrongTitle: editorStrings.text.boldStrgB,
          toggleEmphasizeTitle: editorStrings.text.italicStrgI,
        },
        suggestions: {
          noResultsMessage: editorStrings.text.noItemsFound,
        },
      },
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
    'type-math-puzzle': mathPuzzleTypePlugin,
    'type-page': pageTypePlugin,
    'type-taxonomy': taxonomyTypePlugin,
    'type-text-exercise': textExerciseTypePlugin,
    'type-text-exercise-group': textExerciseGroupTypePlugin,
    'type-text-solution': textSolutionTypePlugin,
    'type-user': userTypePlugin,
    'type-video': videoTypePlugin,
  }
}
