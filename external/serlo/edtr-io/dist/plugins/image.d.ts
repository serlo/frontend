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
import { LoadedFile, UploadValidator } from '@edtr-io/plugin';
declare enum FileErrorCode {
    TOO_MANY_FILES = 0,
    NO_FILE_SELECTED = 1,
    BAD_EXTENSION = 2,
    FILE_TOO_BIG = 3,
    UPLOAD_FAILED = 4
}
export interface FileError {
    errorCode: FileErrorCode;
    message: string;
}
export declare const validateFile: UploadValidator<FileError[]>;
export declare function createUploadImageHandler(getCsrfToken: () => string): (file: File) => Promise<string>;
export declare function createReadFile(getCsrfToken: () => string): (file: File) => Promise<LoadedFile>;
export declare function createImagePlugin(getCsrfToken: () => string): import("@edtr-io/plugin").EditorPlugin<import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
    src: import("@edtr-io/plugin").StateType<import("@edtr-io/plugin").FileState<string>, import("@edtr-io/plugin").FileState<string>, import("@edtr-io/plugin").UploadStateReturnType<string>>;
    link: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }> | undefined, import("@edtr-io/plugin").Optional<import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }>>, {
        defined: false;
        create(value?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
                value: boolean;
                get(): boolean;
                set(value: boolean | ((currentValue: boolean) => boolean)): void;
            }>;
        }> | undefined): void;
    } | (import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }> & {
        defined: true;
        remove(): void;
    })>;
    alt: import("@edtr-io/plugin").StateType<string | undefined, import("@edtr-io/plugin").Optional<string>, {
        defined: false;
        create(value?: string | undefined): void;
    } | ({
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    } & {
        defined: true;
        remove(): void;
    })>;
    maxWidth: import("@edtr-io/plugin").StateType<number | undefined, import("@edtr-io/plugin").Optional<number>, {
        defined: false;
        create(value?: number | undefined): void;
    } | ({
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    } & {
        defined: true;
        remove(): void;
    })>;
}>, import("@edtr-io/internal__plugin-state").StateTypesValueType<{
    src: import("@edtr-io/plugin").StateType<import("@edtr-io/plugin").FileState<string>, import("@edtr-io/plugin").FileState<string>, import("@edtr-io/plugin").UploadStateReturnType<string>>;
    link: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }> | undefined, import("@edtr-io/plugin").Optional<import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }>>, {
        defined: false;
        create(value?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
                value: boolean;
                get(): boolean;
                set(value: boolean | ((currentValue: boolean) => boolean)): void;
            }>;
        }> | undefined): void;
    } | (import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }> & {
        defined: true;
        remove(): void;
    })>;
    alt: import("@edtr-io/plugin").StateType<string | undefined, import("@edtr-io/plugin").Optional<string>, {
        defined: false;
        create(value?: string | undefined): void;
    } | ({
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    } & {
        defined: true;
        remove(): void;
    })>;
    maxWidth: import("@edtr-io/plugin").StateType<number | undefined, import("@edtr-io/plugin").Optional<number>, {
        defined: false;
        create(value?: number | undefined): void;
    } | ({
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    } & {
        defined: true;
        remove(): void;
    })>;
}>, import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
    src: import("@edtr-io/plugin").StateType<import("@edtr-io/plugin").FileState<string>, import("@edtr-io/plugin").FileState<string>, import("@edtr-io/plugin").UploadStateReturnType<string>>;
    link: import("@edtr-io/plugin").StateType<import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }> | undefined, import("@edtr-io/plugin").Optional<import("@edtr-io/internal__plugin-state").StateTypesValueType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }>>, {
        defined: false;
        create(value?: import("@edtr-io/internal__plugin-state").StateTypesSerializedType<{
            href: import("@edtr-io/plugin").StateType<string, string, {
                value: string;
                get(): string;
                set(value: string | ((currentValue: string) => string)): void;
            }>;
            openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
                value: boolean;
                get(): boolean;
                set(value: boolean | ((currentValue: boolean) => boolean)): void;
            }>;
        }> | undefined): void;
    } | (import("@edtr-io/internal__plugin-state").StateTypesReturnType<{
        href: import("@edtr-io/plugin").StateType<string, string, {
            value: string;
            get(): string;
            set(value: string | ((currentValue: string) => string)): void;
        }>;
        openInNewTab: import("@edtr-io/plugin").StateType<boolean, boolean, {
            value: boolean;
            get(): boolean;
            set(value: boolean | ((currentValue: boolean) => boolean)): void;
        }>;
    }> & {
        defined: true;
        remove(): void;
    })>;
    alt: import("@edtr-io/plugin").StateType<string | undefined, import("@edtr-io/plugin").Optional<string>, {
        defined: false;
        create(value?: string | undefined): void;
    } | ({
        value: string;
        get(): string;
        set(value: string | ((currentValue: string) => string)): void;
    } & {
        defined: true;
        remove(): void;
    })>;
    maxWidth: import("@edtr-io/plugin").StateType<number | undefined, import("@edtr-io/plugin").Optional<number>, {
        defined: false;
        create(value?: number | undefined): void;
    } | ({
        value: number;
        get(): number;
        set(value: number | ((currentValue: number) => number)): void;
    } & {
        defined: true;
        remove(): void;
    })>;
}>>, import("@edtr-io/plugin-image").ImagePluginConfig>;
export {};
//# sourceMappingURL=image.d.ts.map