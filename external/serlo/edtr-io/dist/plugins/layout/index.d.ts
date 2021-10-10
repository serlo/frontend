/// <reference types="react" />
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
export declare const layoutState: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    child: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    width: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
}>[], {
    id: string;
    value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        child: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
        width: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
    }>;
}[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    child: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    width: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
}>[] & {
    set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        child: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
        width: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
    }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        child: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
        width: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
    }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        child: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
        width: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
    }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        child: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
        width: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
    }>[]): void;
    insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        child: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
        width: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
    }> | undefined): void;
    remove(index: number): void;
    move(from: number, to: number): void;
}>;
export declare type LayoutPluginState = typeof layoutState;
export declare const layoutPlugin: EditorPlugin<LayoutPluginState>;
//# sourceMappingURL=index.d.ts.map