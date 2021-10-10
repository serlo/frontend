import { EditorPluginProps } from '@edtr-io/plugin';
import { DocumentState } from '@edtr-io/store';
import * as React from 'react';
import { layoutState } from '.';
export declare const LayoutRenderer: React.FunctionComponent<EditorPluginProps<typeof layoutState> & {
    insert?: (options?: DocumentState) => void;
    remove?: () => void;
}>;
//# sourceMappingURL=editor.d.ts.map