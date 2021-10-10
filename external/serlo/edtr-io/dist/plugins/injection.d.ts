/// <reference types="react" />
import { EditorPlugin } from '@edtr-io/plugin';
export declare const injectionState: import("@edtr-io/plugin").StateType<string, string, {
    value: string;
    get(): string;
    set(value: string | ((currentValue: string) => string)): void;
}>;
export declare type InjectionPluginState = typeof injectionState;
export declare const injectionPlugin: EditorPlugin<InjectionPluginState>;
export declare function InjectionRenderer(props: {
    src: string;
}): JSX.Element;
//# sourceMappingURL=injection.d.ts.map