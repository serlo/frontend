/// <reference types="react" />
import { StateType, StateTypesSerializedType, StateTypeSerializedType, StateTypesValueType, StateTypeValueType, StateTypesReturnType, StateTypeReturnType, child } from '@edtr-io/plugin';
export declare const licenseState: StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    id: StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    title: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    url: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    agreement: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    iconHref: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    id: StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    title: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    url: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    agreement: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    iconHref: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    id: StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    title: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    url: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    agreement: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    iconHref: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
}>>;
export declare const uuid: {
    id: StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
};
export declare const license: {
    license: StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
};
export declare const entity: {
    revision: StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
    changes: StateType<string, string, {
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    }>;
    license: StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        id: StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        id: StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        id: StateType<number, number, {
            value: number;
            get(): number;
            set(value: number | ((currentValue: number) => number)): void;
        }>;
        title: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        url: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        agreement: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        iconHref: StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
    }>>;
    id: StateType<number, number, {
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    }>;
};
export declare type Uuid = StateTypesSerializedType<typeof uuid>;
export declare type License = StateTypesSerializedType<typeof license>;
export declare type Entity = Uuid & License & {
    revision: number;
    changes?: string;
};
export declare const HeaderInput: import("styled-components").StyledComponent<"input", any, {}, never>;
export declare function Controls(props: OwnProps): JSX.Element;
export declare function entityType<Ds extends Record<string, StateType>, Childs extends Record<string, StateType>>(ownTypes: Ds, children: Childs, getFocusableChildren?: (children: {
    [K in keyof Ds]: {
        id: string;
    }[];
}) => {
    id: string;
}[]): StateType<StateTypesSerializedType<Ds & Childs>, StateTypesValueType<Ds & Childs>, StateTypesReturnType<Ds & Childs> & {
    replaceOwnState: (newValue: StateTypesSerializedType<Ds>) => void;
}>;
export declare function serialized<S extends StateType>(type: S): S & {
    serialize(deserialized: any, helpers: import("@edtr-io/internal__plugin-state").StoreSerializeHelpers<string, unknown>): string;
    deserialize(serialized: string, helpers: Parameters<typeof type.deserialize>[1]): any;
};
export declare function editorContent(plugin?: string): StateType<string, StateTypeValueType<ReturnType<typeof child>>, StateTypeReturnType<ReturnType<typeof child>>>;
export declare function serializedChild(plugin: string): StateType<unknown, StateTypeValueType<ReturnType<typeof child>>, StateTypeReturnType<ReturnType<typeof child>>>;
export declare function optionalSerializedChild(plugin: string): StateType<StateTypeSerializedType<ReturnType<typeof serializedChild>> | null, StateTypeValueType<ReturnType<typeof serializedChild>> | null, StateTypeReturnType<ReturnType<typeof serializedChild>> & {
    create: (state?: unknown) => void;
    remove: () => void;
}>;
export declare function OptionalChild(props: {
    removeLabel: string;
    state: StateTypeReturnType<ReturnType<typeof serializedChild>>;
    onRemove: () => void;
}): JSX.Element;
interface OwnProps {
    changes?: StateTypeReturnType<typeof entity['changes']>;
    license?: StateTypeReturnType<typeof entity['license']>;
    subscriptions?: boolean;
}
export {};
//# sourceMappingURL=common.d.ts.map