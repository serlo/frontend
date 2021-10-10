import * as React from 'react';
export declare function RevisionHistory<T>(props: React.PropsWithChildren<{
    id: number;
    currentRevision: number;
    onSwitchRevision: (data: T) => void;
}>): JSX.Element;
export declare function Settings(props: React.PropsWithChildren<{}>): JSX.Element;
export declare namespace Settings {
    var Textarea: ({ label, state, }: {
        label: string;
        state: {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        };
    }) => JSX.Element;
    var Select: ({ label, state, options, }: {
        label: string;
        state: {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        };
        options: {
            label: string;
            value: string;
        }[];
    }) => JSX.Element;
}
//# sourceMappingURL=settings.d.ts.map