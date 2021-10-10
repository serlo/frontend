import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin';
import * as React from 'react';
declare const articleState: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    introduction: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    content: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    exercises: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }[], {
        id: string;
        value: string;
    }[], {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }[] & {
        set(updater: (currentList: string[], deserialize: (serialized: {
            plugin: string;
            state?: unknown;
        }) => string) => string[]): void;
        insert(index?: number | undefined, options?: {
            plugin: string;
            state?: unknown;
        } | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
    exerciseFolder: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    relatedContent: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>>;
    sources: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>[], {
        id: string;
        value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>;
    }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>[] & {
        set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[]): void;
        insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }> | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    introduction: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    content: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    exercises: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }[], {
        id: string;
        value: string;
    }[], {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }[] & {
        set(updater: (currentList: string[], deserialize: (serialized: {
            plugin: string;
            state?: unknown;
        }) => string) => string[]): void;
        insert(index?: number | undefined, options?: {
            plugin: string;
            state?: unknown;
        } | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
    exerciseFolder: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    relatedContent: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>>;
    sources: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>[], {
        id: string;
        value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>;
    }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>[] & {
        set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[]): void;
        insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }> | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    introduction: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    content: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    exercises: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }[], {
        id: string;
        value: string;
    }[], {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }[] & {
        set(updater: (currentList: string[], deserialize: (serialized: {
            plugin: string;
            state?: unknown;
        }) => string) => string[]): void;
        insert(index?: number | undefined, options?: {
            plugin: string;
            state?: unknown;
        } | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
    exerciseFolder: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    relatedContent: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        articles: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        courses: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
        videos: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], {
            id: string;
            value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>;
        }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[] & {
            set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }>[]): void;
            insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
                id: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
                title: import("@edtr-io/plugin").StateType<string, string, {
                    value: string;
                    get(): string;
                    set(value: string | ((currentValue: string) => string)): void;
                }>;
            }> | undefined): void;
            remove(index: number): void;
            move(from: number, to: number): void;
        }>;
    }>>;
    sources: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>[], {
        id: string;
        value: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>;
    }[], import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>[] & {
        set(updater: (currentList: import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[], deserialize: (serialized: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>) => import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>[]): void;
        insert(index?: number | undefined, options?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }> | undefined): void;
        remove(index: number): void;
        move(from: number, to: number): void;
    }>;
}>>;
export declare type ArticlePluginState = typeof articleState;
export declare type ArticleProps = EditorPluginProps<ArticlePluginState>;
export declare const articlePlugin: EditorPlugin<ArticlePluginState>;
export {};
//# sourceMappingURL=article.d.ts.map