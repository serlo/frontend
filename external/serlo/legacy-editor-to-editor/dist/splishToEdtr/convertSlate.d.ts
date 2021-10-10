import { ValueJSON } from 'slate';
/**
 * This file provides a serializer for the splish slate state to html
 * and a deserializer for html to edtr-io slate state.
 * All serializers use the node names of the splish editor.
 * All deserializers use the new node names defined in the following variables.
 */
export declare const createHeadingNode: (level: number) => string;
export declare const linkNode = "@splish-me/a";
export declare const orderedListNode = "ordered-list";
export declare const unorderedListNode = "unordered-list";
export declare const listItemNode = "list-item";
export declare const listItemChildNode = "list-item-child";
export declare const paragraphNode = "paragraph";
export declare const strongMark = "@splish-me/strong";
export declare const emphasizeMark = "@splish-me/em";
export declare const katexBlockNode = "@splish-me/katex-block";
export declare const katexInlineNode = "@splish-me/katex-inline";
export declare function convertOldSlate(value: ValueJSON): ValueJSON;
export declare function htmlToSlate(html: string): ValueJSON;
//# sourceMappingURL=convertSlate.d.ts.map