/**
 * This file is part of Serlo.org.
 *
 * Copyright (c) 2013-2021 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2021 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/serlo.org for the canonical source repository
 */
export declare enum Plugin {
    AlphabetSort = "@serlo-org/alphabet-sort",
    Anchor = "@serlo-org/anchor",
    Blockquote = "@serlo-org/blockquote",
    Equations = "@serlo-org/equations",
    Geogebra = "@serlo-org/geogebra",
    H5p = "@serlo-org/h5p",
    Highlight = "@serlo-org/highlight",
    Hint = "@serlo-org/hint",
    Image = "@splish-me/image",
    Injection = "@serlo-org/injection",
    InputExercise = "@serlo-org/input-exercise",
    License = "@serlo-org/license",
    MatchingExercise = "@serlo-org/matching-exercise",
    ScMcExercise = "@serlo-org/sc-mc-exercise",
    Solution = "@serlo-org/solution",
    Spoiler = "@serlo-org/spoiler",
    StepByStep = "@serlo-org/step-by-step",
    Table = "@serlo-org/table",
    Text = "@splish-me/slate"
}
export declare type Legacy = LegacyRow[] | string;
export declare type LegacyRow = {
    col: number;
    content: string;
}[];
export declare type Splish = {
    id?: string;
    cells: Cell[];
};
export declare type Row = Splish;
export declare type Cell = RowCell | ContentCell;
declare type RowCell = {
    id?: string;
    size?: number;
    rows: Row[];
};
export declare type ContentCell<S = unknown> = {
    id?: string;
    size?: number;
    inline?: null;
    content: {
        plugin: SplishPlugin;
        state: S;
    };
};
export declare function isContentCell(cell: Cell): cell is ContentCell;
declare type SplishPlugin = {
    name: Plugin | 'code';
    version?: string;
};
export declare type Edtr = RowsPlugin | LayoutPlugin | OtherPlugin;
export declare type RowsPlugin = {
    plugin: 'rows';
    state: Edtr[];
};
export declare type LayoutPlugin = {
    plugin: 'layout';
    state: {
        child: Edtr;
        width: number;
    }[];
};
export declare type OtherPlugin = {
    plugin: 'anchor' | 'article' | 'blockquote' | 'error' | 'exercise' | 'geogebra' | 'highlight' | 'image' | 'important' | 'injection' | 'inputExercise' | 'spoiler' | 'scMcExercise' | 'solution' | 'table' | 'text' | 'video';
    state: unknown;
};
export declare function isSplish(content: Legacy | Splish): content is Splish;
export declare function isEdtr(content: Legacy | Splish | Edtr): content is Edtr;
export {};
//# sourceMappingURL=types.d.ts.map