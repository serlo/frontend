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
import { EditorPlugin } from '@edtr-io/plugin';
import { RowsConfig } from '@edtr-io/plugin-rows';
import { i18n } from 'i18next';
import { SerializedDocument } from './serialized-document';
declare type PluginType = SerializedDocument['plugin'] | 'type-applet' | 'type-article' | 'type-course' | 'type-course-page' | 'type-event' | 'type-math-puzzle' | 'type-page' | 'type-taxonomy' | 'type-text-exercise' | 'type-text-exercise-group' | 'type-text-solution' | 'type-user' | 'type-video';
export declare function createPlugins({ getCsrfToken, i18n, registry, }: {
    getCsrfToken: () => string;
    i18n: i18n;
    registry: RowsConfig['plugins'];
}): Record<string, EditorPlugin<any, any>> & Record<PluginType, EditorPlugin<any, any>>;
export {};
//# sourceMappingURL=plugins.d.ts.map