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
import i18n, { i18n as I18n, Module, Newable, Resource, ThirdPartyModule } from 'i18next';
export { i18n, I18n };
export declare function initI18n({ resources, language, }: {
    resources: Resource;
    language: string;
}): Promise<void>;
export declare function initI18nWithBackend<B extends Module>({ backend, options, language, }: {
    backend: B | Newable<B> | ThirdPartyModule[] | Newable<ThirdPartyModule>[];
    options?: object;
    language: string;
}): Promise<void>;
export declare function setLanguage(language: string): Promise<void>;
export declare function useI18n(): I18n;
//# sourceMappingURL=index.d.ts.map