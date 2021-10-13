import clsx from 'clsx'

import { MathSpan } from '@/components/content/math-span'
import { SerloEditor } from '@/components/edtr-io/serlo-editor'

export interface AddRevisionProps {
  id: number
  content: string
  title: string
}

export function AddRevision({ id, content, title }: AddRevisionProps) {
  return (
    <>
      <MathSpan formula="" />
      <div className={clsx('max-w-[816px] mx-auto mb-24 edtr-io')}>
        <div className="controls w-full h-12 flex justify-between pt-4 pl-5 pr-3" />
        <SerloEditor
          state={{
            id,
            license: {
              // Check: Should we just store this in i18n? or does it come from license?
              agreement:
                'Mit dem Speichern dieser Seite versicherst du, dass du deinen Beitrag (damit sind auch Änderungen gemeint) selbst verfasst hast bzw. dass er keine fremden Rechte verletzt. Du willigst ein, deinen Beitrag unter der <a href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution/Share-Alike Lizenz 4.0</a> und/oder unter einer gleichwertigen Lizenz zu veröffentlichen, welche die Gesellschaft für freie Bildung e. V. entsprechend der Regelungen in den <a href="/21654">Nutzungsbedingungen</a> festlegen darf. Falls du den Beitrag nicht selbst verfasst hast, muss er unter den <a href="/21654">Nutzungsbedingungen</a> verfügbar sein und du stimmst zu, notwendigen Lizenzanforderungen zu folgen.',
              iconHref: 'https://i.creativecommons.org/l/by-sa/4.0/88x31.png',
              id: 1,
              title: 'Dieses Werk steht unter der freien Lizenz cc-by-sa-4.0',
              url: 'https://creativecommons.org/licenses/by-sa/4.0/',
            },
            changes: '',
            title,
            content,
            reasoning: '',
            meta_title: '',
            meta_description: '',
          }}
        />
      </div>
      <style jsx global>{`
        .edtr-io h1 {
          @apply mx-side mb-9 mt-4 p-0 font-bold text-3.5xl special-hyphens-auto;
        }
        .edtr-io h2 {
          @apply mt-0 mb-6 pb-1 pt-6;
          @apply text-2.5xl font-bold special-hyphens-auto;
          @apply text-truegray-900 border-truegray-300 border-b;
        }
        .edtr-io {
          h3 {
            @apply mt-5 mb-8 pt-3 font-bold text-1.5xl text-truegray-900;
          }
          div[contenteditable] h3 {
            @apply mt-0;
          }
        }
        .edtr-io {
          @apply text-lg leading-cozy;
        }
        .edtr-io a[data-key] {
          @apply text-brand no-underline break-words hover:underline special-hyphens-auto;
        }
        .edtr-io [data-slate-object='block'] {
          @apply mb-block;
        }
        .edtr-io ul {
          @apply mx-side mb-block mt-4 pl-5 list-none;

          & > li:before {
            @apply absolute special-content-space bg-brand-lighter;
            @apply w-2.5 h-2.5 rounded-full -ml-5 mt-2.25;
          }
          & > li {
            @apply mb-2;
          }
          & > li > ul,
          & > li > ol {
            @apply mt-2 !mb-4;
          }
        }
        .edtr-io ol {
          @apply mx-side mb-block mt-0 pl-7 list-none;
          @apply special-reset-list-counter;

          & > li:before {
            @apply absolute special-content-list-counter special-increment-list-counter;
            @apply font-bold text-center rounded-full -ml-7;
            @apply mt-0.5 bg-brand-150 w-4 h-4 text-xs;
            @apply leading-tight text-brand pt-0.25;
          }
          & > li {
            @apply mb-2;
          }
          & > li > ul,
          & > li > ol {
            @apply mt-2 !mb-4;
          }
        }

        .ReactModal__Content {
          @apply rounded-xl border-none shadow-modal;
          @apply bg-white outline-none px-2.5 pt-2.5;

          h4 {
            @apply font-bold text-lg mt-5 mb-6;
          }
          .form-group {
            label {
              @apply font-bold;
            }
            textarea {
              @apply mt-1 mb-7 flex items-center rounded-2xl w-full p-2;
              @apply bg-brand-150 border-2 border-brand-150 focus-within:outline-none focus-within:border-brand-light;
            }
          }
        }

        .edtr-io .page-header h1 input {
          @apply w-full;
          @apply mb-9 mt-6 p-0 font-bold text-3.5xl special-hyphens-auto;
        }

        .edtr-io button > div > svg {
          @apply ml-1.5 mr-1.5 mb-1 mt-2;
        }
      `}</style>
    </>
  )
}
