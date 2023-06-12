import type { ComponentType, ReactNode } from 'react'

import { createImportantPlugin } from '../serlo-editor/plugins/_on-the-way-out/important/important'
import { layoutPlugin } from '../serlo-editor/plugins/_on-the-way-out/layout'
import { tablePlugin } from '../serlo-editor/plugins/_on-the-way-out/table'
import { articlePlugin } from '../serlo-editor/plugins/article'
import { createBoxPlugin } from '../serlo-editor/plugins/box'
import { deprecatedPlugin } from '../serlo-editor/plugins/deprecated'
import { equationsPlugin } from '../serlo-editor/plugins/equations'
import { errorPlugin } from '../serlo-editor/plugins/error'
import { exercisePlugin } from '../serlo-editor/plugins/exercise'
import { H5pPlugin } from '../serlo-editor/plugins/h5p/h5p'
import { createHighlightPlugin } from '../serlo-editor/plugins/highlight'
import { createImagePlugin } from '../serlo-editor/plugins/image/image-with-serlo-config'
import { injectionPlugin } from '../serlo-editor/plugins/injection'
import { createPageLayoutPlugin } from '../serlo-editor/plugins/page-layout'
import { pagePartnersPlugin } from '../serlo-editor/plugins/page-partners'
import { pageTeamPlugin } from '../serlo-editor/plugins/page-team'
import { pasteHackPlugin } from '../serlo-editor/plugins/paste-hack'
import { separatorPlugin } from '../serlo-editor/plugins/separator'
import { createSerloTablePlugin } from '../serlo-editor/plugins/serlo-table'
import { appletTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/applet'
import { articleTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/article'
import { courseTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/course'
import { coursePageTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/course-page'
import { eventTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/event'
import { pageTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/page'
import { taxonomyTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/taxonomy'
import { textExerciseTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/text-exercise'
import { textExerciseGroupTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/text-exercise-group'
import { textSolutionTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/text-solution'
import { userTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/user'
import { videoTypePlugin } from '../serlo-editor/plugins/serlo-types-plugins/video'
import { solutionPlugin } from '../serlo-editor/plugins/solution'
import { SerializedDocument } from './serialized-document'
import { InstanceData, LoggedInData } from '@/data-types'
import { getPluginRegistry } from '@/edtr-io/get-plugin-registry'
import { isMac } from '@/helper/client-detection'
import type { EditorPlugin } from '@/serlo-editor/plugin'
import { createBlockquotePlugin } from '@/serlo-editor/plugins/_on-the-way-out/blockquote'
import { createAnchorPlugin } from '@/serlo-editor/plugins/anchor'
import { createGeogebraPlugin } from '@/serlo-editor/plugins/geogebra'
import {
  createInputExercisePlugin,
  InputExerciseType,
} from '@/serlo-editor/plugins/input-exercise'
import { createMultimediaExplanationPlugin } from '@/serlo-editor/plugins/multimedia-explanation'
import { createRowsPlugin, RowsConfig } from '@/serlo-editor/plugins/rows'
import { createScMcExercisePlugin } from '@/serlo-editor/plugins/sc-mc-exercise'
import { createSpoilerPlugin } from '@/serlo-editor/plugins/spoiler'
import { createTextPlugin } from '@/serlo-editor/plugins/text'
import { createVideoPlugin } from '@/serlo-editor/plugins/video'

export enum SerloEntityPluginType {
  Applet = 'type-applet',
  Article = 'type-article',
  Course = 'type-course',
  CoursePage = 'type-course-page',
  Event = 'type-event',
  Page = 'type-page',
  Taxonomy = 'type-taxonomy',
  TextExercise = 'type-text-exercise',
  TextExerciseGroup = 'type-text-exercise-group',
  TextSolution = 'type-text-solution',
  Video = 'type-video',
  User = 'type-user',
}

type PluginType = SerializedDocument['plugin'] | SerloEntityPluginType

export function createPlugins({
  editorStrings,
  strings,
  registry,
  type,
}: {
  editorStrings: LoggedInData['strings']['editor']
  strings: InstanceData['strings']
  registry: RowsConfig['plugins']
  type: string
}): Record<string, EditorPlugin<any, any>> &
  Record<PluginType, EditorPlugin<any, any>> {
  const replaceKeyStrings = (input: string) => {
    return input.replace('%ctrlOrCmd%', isMac ? '⌘' : strings.keys.ctrl)
  }

  const textPluginI18n = {
    blockquote: {
      toggleTitle: replaceKeyStrings(editorStrings.text.quote),
    },
    colors: {
      setColorTitle: replaceKeyStrings(editorStrings.text.setColor),
      resetColorTitle: editorStrings.text.resetColor,
      openMenuTitle: editorStrings.text.colors,
      closeMenuTitle: editorStrings.text.closeSubMenu,
    },
    headings: {
      setHeadingTitle(level: number) {
        return `${replaceKeyStrings(editorStrings.text.heading)} ${level}`
      },
      openMenuTitle: editorStrings.text.headings,
      closeMenuTitle: editorStrings.text.closeSubMenu,
    },
    link: {
      toggleTitle: replaceKeyStrings(editorStrings.text.link),
      placeholder: editorStrings.text.enterUrl,
      openInNewTabTitle: editorStrings.text.openInNewTab,
    },
    list: {
      toggleOrderedList: replaceKeyStrings(editorStrings.text.orderedList),
      toggleUnorderedList: replaceKeyStrings(editorStrings.text.unorderedList),
      openMenuTitle: editorStrings.text.lists,
      closeMenuTitle: editorStrings.text.closeSubMenu,
    },
    math: {
      toggleTitle: replaceKeyStrings(editorStrings.text.mathFormula),
      displayBlockLabel: editorStrings.text.displayAsBlock,
      placeholder: editorStrings.text.formula,
      editors: {
        visual: editorStrings.text.visual,
        latex: editorStrings.text.laTeX,
        noVisualEditorAvailableMessage: editorStrings.text.onlyLaTeX,
      },
      helpText(KeySpan: ComponentType<{ children: ReactNode }>) {
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
    code: {
      toggleTitle: replaceKeyStrings(editorStrings.text.code),
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
    box: createBoxPlugin({ editorStrings }),
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
    h5p: H5pPlugin,
    image: createImagePlugin(),
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
          correct: strings.content.exercises.correct,
          wrong: strings.content.exercises.wrong,
        },
      },
    }),
    layout: layoutPlugin,
    pageLayout: createPageLayoutPlugin(editorStrings),
    pageTeam: pageTeamPlugin,
    pagePartners: pagePartnersPlugin,
    pasteHack: pasteHackPlugin,
    multimedia: createMultimediaExplanationPlugin({
      explanation: {
        plugin: 'rows',
        config: {
          plugins: getPluginRegistry(type, editorStrings, [
            'text',
            'highlight',
            'anchor',
            'equations',
            'image',
            'serloTable',
          ]),
        },
      },
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
            wrong: strings.content.exercises.wrong,
          },
        },
        globalFeedback: {
          missingCorrectAnswers: strings.content.exercises.missedSome,
          correct: strings.content.exercises.correct,
          wrong: strings.content.exercises.wrong,
        },
      },
    }),
    separator: separatorPlugin,
    serloTable: createSerloTablePlugin(),
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
    [SerloEntityPluginType.Applet]: appletTypePlugin,
    [SerloEntityPluginType.Article]: articleTypePlugin,
    [SerloEntityPluginType.Course]: courseTypePlugin,
    [SerloEntityPluginType.CoursePage]: coursePageTypePlugin,
    [SerloEntityPluginType.Event]: eventTypePlugin,
    [SerloEntityPluginType.Page]: pageTypePlugin,
    [SerloEntityPluginType.Taxonomy]: taxonomyTypePlugin,
    [SerloEntityPluginType.TextExercise]: textExerciseTypePlugin,
    [SerloEntityPluginType.TextExerciseGroup]: textExerciseGroupTypePlugin,
    [SerloEntityPluginType.TextSolution]: textSolutionTypePlugin,
    [SerloEntityPluginType.User]: userTypePlugin,
    [SerloEntityPluginType.Video]: videoTypePlugin,
  }
}
