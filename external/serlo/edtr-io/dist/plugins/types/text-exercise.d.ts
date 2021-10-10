import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin';
import * as React from 'react';
export declare const textExerciseTypeState: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    content: import("@edtr-io/plugin").StateType<string, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    revision: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    changes: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    license: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    id: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
} & {
    'text-solution': import("@edtr-io/plugin").StateType<unknown, string | null, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    } & {
        create: (state?: unknown) => void;
        remove: () => void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    content: import("@edtr-io/plugin").StateType<string, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    revision: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    changes: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    license: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    id: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
} & {
    'text-solution': import("@edtr-io/plugin").StateType<unknown, string | null, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    } & {
        create: (state?: unknown) => void;
        remove: () => void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    content: import("@edtr-io/plugin").StateType<string, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    revision: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    changes: import("@edtr-io/plugin").StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    license: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    id: import("@edtr-io/plugin").StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
} & {
    'text-solution': import("@edtr-io/plugin").StateType<unknown, string | null, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    } & {
        create: (state?: unknown) => void;
        remove: () => void;
    }>;
}> & {
    replaceOwnState: (newValue: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        content: import("@edtr-io/plugin").StateType<string, string, {
            get(): string;
            id: string;
            render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
            replace: (plugin: string, state?: unknown) => void;
        }>;
        revision: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        changes: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        license: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            id: import("@edtr-io/plugin").StateType<number, number, {
                value: number;
                get(): number;
                set(value: number | ((currentValue: number) => number)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            url: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            agreement: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            iconHref: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
            id: import("@edtr-io/plugin").StateType<number, number, {
                value: number;
                get(): number;
                set(value: number | ((currentValue: number) => number)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            url: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            agreement: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            iconHref: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
            id: import("@edtr-io/plugin").StateType<number, number, {
                value: number;
                get(): number;
                set(value: number | ((currentValue: number) => number)): void;
            }>;
            title: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            url: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            agreement: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            iconHref: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
        }>>;
        id: import("@edtr-io/plugin").StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
    }>) => void;
}>;
export declare const textExerciseTypePlugin: EditorPlugin<typeof textExerciseTypeState, {
    skipControls: boolean;
}>;
export declare function TextExerciseTypeEditor(props: EditorPluginProps<typeof textExerciseTypeState, {
    skipControls: boolean;
}>): JSX.Element;
//# sourceMappingURL=text-exercise.d.ts.map