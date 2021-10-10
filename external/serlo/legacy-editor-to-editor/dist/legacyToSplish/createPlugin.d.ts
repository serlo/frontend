import { NormalizedObject } from './normalizeMarkdown';
import { ValueJSON } from 'slate';
import { ContentCell, Splish } from '../splishToEdtr/types';
declare const createPlugins: ({ normalized, elements }: NormalizedObject) => {
    cells: ContentCell<SplishPluginState>[];
}[];
interface SplishDocumentIdentifier {
    type: '@splish-me/editor-core/editable';
    state: Splish;
}
export interface SplishCodeState {
    language: string;
    src: string;
}
export interface SplishSpoilerState {
    title: string;
    content: SplishDocumentIdentifier;
}
export interface SplishTableState {
    src: string;
}
export interface SplishBlockquoteState {
    child: SplishDocumentIdentifier;
}
export interface SplishInjectionState {
    description: string;
    src: string;
}
export interface SplishGeogebraState {
    description: string;
    src: string;
}
export interface SplishImageState {
    description: string;
    src: string;
    title: string;
    href?: string;
}
export interface SplishTextState {
    importFromHtml?: string;
    editorState?: ValueJSON;
}
export declare type SplishPluginState = SplishCodeState | SplishSpoilerState | SplishTableState | SplishBlockquoteState | SplishInjectionState | SplishGeogebraState | SplishImageState | SplishTextState;
export default createPlugins;
//# sourceMappingURL=createPlugin.d.ts.map