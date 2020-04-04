/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2020 Serlo Education e.V.
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
 * @copyright Copyright (c) 2013-2020 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
import { EditorPlugin } from '@edtr-io/plugin'
import { createTextPlugin } from '@edtr-io/plugin-text'
import { createAnchorPlugin } from '@edtr-io/plugin-anchor'
import { createBlockquotePlugin } from '@edtr-io/plugin-blockquote'
import { createGeogebraPlugin } from '@edtr-io/plugin-geogebra'
import { createHighlightPlugin } from '@edtr-io/plugin-highlight'
//import { createHintPlugin } from '@edtr-io/plugin-hint'
import { createImportantStatementPlugin } from '@edtr-io/plugin-important-statement'
import { createInputExercisePlugin } from '@edtr-io/plugin-input-exercise'
import { createRowsPlugin, RowsConfig } from '@edtr-io/plugin-rows'
import { createScMcExercisePlugin } from '@edtr-io/plugin-sc-mc-exercise'
//import { createSolutionPlugin } from '@edtr-io/plugin-solution'
import { createSpoilerPlugin } from '@edtr-io/plugin-spoiler'
import { createVideoPlugin } from '@edtr-io/plugin-video'

/*import { appletTypePlugin } from './plugins/types/applet'
import { articleTypePlugin } from './plugins/types/article'
import { courseTypePlugin } from './plugins/types/course'
import { coursePageTypePlugin } from './plugins/types/course-page'
import { eventTypePlugin } from './plugins/types/event'
import { mathPuzzleTypePlugin } from './plugins/types/math-puzzle'
import { pageTypePlugin } from './plugins/types/page'
import { textExerciseTypePlugin } from './plugins/types/text-exercise'
import { textExerciseGroupTypePlugin } from './plugins/types/text-exercise-group'
import { textHintTypePlugin } from './plugins/types/text-hint'
import { textSolutionTypePlugin } from './plugins/types/text-solution'
import { userTypePlugin } from './plugins/types/user'
import { videoTypePlugin } from './plugins/types/video'
import { errorPlugin } from './plugins/error'*/
import { createImagePlugin } from './plugins/image'
import { injectionPlugin } from './plugins/injection'
//import { layoutPlugin } from './plugins/layout'
import { tablePlugin } from './plugins/table'
import { createMultimediaExplanationPlugin } from '@edtr-io/plugin-multimedia-explanation'

export function createPlugins(
  /*getCsrfToken: () => string,*/
  registry: RowsConfig['plugins']
): Record<string, EditorPlugin<any, any>> {
  return {
    anchor: createAnchorPlugin(),
    blockquote: createBlockquotePlugin({ content: { plugin: 'text' } }),
    /*error: errorPlugin,*/
    geogebra: createGeogebraPlugin(),
    highlight: createHighlightPlugin(),
    /*hint: createHintPlugin(),*/
    image: createImagePlugin(/*getCsrfToken*/),
    // important: createImportantStatementPlugin(), ??
    injection: injectionPlugin,
    inputExercise: createInputExercisePlugin({ feedback: { plugin: 'text' } }),
    /*layout: layoutPlugin,*/
    multimedia: createMultimediaExplanationPlugin({
      explanation: { plugin: 'text' },
      plugins: [
        {
          name: 'image',
          title: 'Bild'
        },
        {
          name: 'video',
          title: 'Video'
        },
        {
          name: 'geogebra',
          title: 'GeoGebra Applet'
        }
      ]
    }),
    rows: createRowsPlugin({ plugins: registry, content: { plugin: 'text' } }),
    scMcExercise: createScMcExercisePlugin({
      content: { plugin: 'text' },
      feedback: { plugin: 'text' }
    }),
    /*solution: createSolutionPlugin(),*/
    spoiler: createSpoilerPlugin({ content: { plugin: 'text' } }),
    table: tablePlugin,
    text: createTextPlugin({ registry: registry }),
    video: createVideoPlugin()

    // Internal plugins for our content types
    /*'type-applet': appletTypePlugin,
    'type-article': articleTypePlugin,
    'type-course': courseTypePlugin,
    'type-course-page': coursePageTypePlugin,
    'type-event': eventTypePlugin,
    'type-math-puzzle': mathPuzzleTypePlugin,
    'type-page': pageTypePlugin,
    'type-text-exercise': textExerciseTypePlugin,
    'type-text-exercise-group': textExerciseGroupTypePlugin,
    'type-text-hint': textHintTypePlugin,
    'type-text-solution': textSolutionTypePlugin,
    'type-user': userTypePlugin,
    'type-video': videoTypePlugin*/
  }
}
