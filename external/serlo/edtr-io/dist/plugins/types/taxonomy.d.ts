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
import * as React from 'react';
export declare const taxonomyTypeState: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    term: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    taxonomy: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    parent: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    position: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    description: import("@edtr-io/plugin").StateType<string, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    id: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    term: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    taxonomy: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    parent: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    position: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    description: import("@edtr-io/plugin").StateType<string, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    id: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    term: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        name: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    taxonomy: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    parent: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    position: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    description: import("@edtr-io/plugin").StateType<string, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    id: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
}>>;
export declare const taxonomyTypePlugin: EditorPlugin<typeof taxonomyTypeState>;
//# sourceMappingURL=taxonomy.d.ts.map