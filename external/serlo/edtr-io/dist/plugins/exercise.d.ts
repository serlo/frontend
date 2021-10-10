import { EditorPlugin, EditorPluginProps } from '@edtr-io/plugin';
import * as React from 'react';
declare const exerciseState: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    content: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    interactive: import("@edtr-io/plugin").StateType<{
        plugin: "scMcExercise" | "inputExercise";
        state?: unknown;
    } | undefined, import("@edtr-io/plugin").Optional<string>, {
        defined: false;
        create(value?: {
            plugin: "scMcExercise" | "inputExercise";
            state?: unknown;
        } | undefined): void;
    } | ({
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: "scMcExercise" | "inputExercise", state?: unknown) => void;
    } & {
        defined: true;
        remove(): void;
    })>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    content: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    interactive: import("@edtr-io/plugin").StateType<{
        plugin: "scMcExercise" | "inputExercise";
        state?: unknown;
    } | undefined, import("@edtr-io/plugin").Optional<string>, {
        defined: false;
        create(value?: {
            plugin: "scMcExercise" | "inputExercise";
            state?: unknown;
        } | undefined): void;
    } | ({
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: "scMcExercise" | "inputExercise", state?: unknown) => void;
    } & {
        defined: true;
        remove(): void;
    })>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    content: import("@edtr-io/plugin").StateType<{
        plugin: string;
        state?: unknown;
    }, string, {
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: string, state?: unknown) => void;
    }>;
    interactive: import("@edtr-io/plugin").StateType<{
        plugin: "scMcExercise" | "inputExercise";
        state?: unknown;
    } | undefined, import("@edtr-io/plugin").Optional<string>, {
        defined: false;
        create(value?: {
            plugin: "scMcExercise" | "inputExercise";
            state?: unknown;
        } | undefined): void;
    } | ({
        get(): string;
        id: string;
        render: (props?: import("@edtr-io/internal__plugin-state").PluginProps | undefined) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, any> | null) | (new (props: any) => React.Component<any, any, any>)>;
        replace: (plugin: "scMcExercise" | "inputExercise", state?: unknown) => void;
    } & {
        defined: true;
        remove(): void;
    })>;
}>>;
export declare type ExercisePluginState = typeof exerciseState;
export declare type ExerciseProps = EditorPluginProps<ExercisePluginState>;
export declare const exercisePlugin: EditorPlugin<ExercisePluginState>;
export {};
//# sourceMappingURL=exercise.d.ts.map