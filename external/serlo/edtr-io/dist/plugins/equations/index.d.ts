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
import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin';
export declare const stepProps: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    left: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    sign: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    right: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    transform: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    explanation: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    left: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    sign: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    right: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    transform: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    explanation: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    left: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    sign: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    right: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    transform: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    explanation: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
}>>;
declare const equationsState: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    steps: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        left: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        sign: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        right: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        transform: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        explanation: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
    }>[], {
        id: string;
        value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>;
    }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        left: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        sign: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        right: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        transform: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        explanation: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
    }>[] & {
        set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>[]): void;
        insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }> | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
    firstExplanation: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    steps: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        left: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        sign: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        right: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        transform: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        explanation: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
    }>[], {
        id: string;
        value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>;
    }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        left: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        sign: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        right: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        transform: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        explanation: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
    }>[] & {
        set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>[]): void;
        insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }> | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
    firstExplanation: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    steps: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        left: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        sign: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        right: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        transform: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        explanation: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
    }>[], {
        id: string;
        value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>;
    }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        left: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        sign: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        right: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        transform: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        explanation: import("@edtr-io/plugin").StateType<{
            plugin: string;
            state?: unknown;
        }, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
    }>[] & {
        set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }>[]): void;
        insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            left: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            sign: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            right: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            transform: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            explanation: import("@edtr-io/plugin").StateType<{
                plugin: string;
                state?: unknown;
            }, string, {
                get(): string;
                id: string;
                render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
                replace: (plugin: string, state?: unknown) => void;
            }>;
        }> | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
    firstExplanation: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => import("react").ReactElement<any, string | ((props: any) => import("react").ReactElement<any, any> | null) | (new (props: any) => import("react").Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
}>>;
export declare type EquationsPluginState = typeof equationsState;
export declare type EquationsProps = EditorPluginProps<EquationsPluginState>;
export declare const equationsPlugin: EditorPlugin<EquationsPluginState>;
export {};
//# sourceMappingURL=index.d.ts.map