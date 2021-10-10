import * as React from 'react';
export interface EditorProps {
    getCsrfToken(): string;
    children?: React.ReactNode;
    mayCheckout: boolean;
    onSave: (data: unknown) => Promise<void>;
    onError?: (error: Error, context: Record<string, string>) => void;
    initialState: unknown;
    type: string;
}
export declare const SaveContext: React.Context<{
    onSave: EditorProps['onSave'];
    mayCheckout: boolean;
}>;
export declare function Editor(props: EditorProps): JSX.Element;
export declare function storeState(state: unknown): void;
//# sourceMappingURL=editor.d.ts.map