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
import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin';
declare const separatorState: import("@edtr-io/plugin").StateType<undefined, undefined, {
    value: undefined;
    get(): undefined;
    set(value: ((currentValue: undefined) => undefined) | undefined): void;
}>;
export declare type SeparatorPluginState = typeof separatorState;
export declare type SeparatorProps = EditorPluginProps<SeparatorPluginState>;
export declare const separatorPlugin: EditorPlugin<SeparatorPluginState>;
export {};
//# sourceMappingURL=separator.d.ts.map