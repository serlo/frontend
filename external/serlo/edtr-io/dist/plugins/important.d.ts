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
import * as React from 'react';
export declare const importantState: import("@edtr-io/plugin").StateType<{
    plugin: string;
    state?: unknown;
}, string, {
    get(): string;
    id: string;
    render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
    replace: (plugin: string, state?: unknown) => void;
}>;
export declare type ImportantPluginState = typeof importantState;
export declare type ImportantProps = EditorPluginProps<ImportantPluginState>;
export declare function createImportantPlugin(): EditorPlugin<ImportantPluginState>;
//# sourceMappingURL=important.d.ts.map