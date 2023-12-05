import { getKratosMailStrings } from '../feature-i18n'
import { Instance } from '@/fetcher/graphql-types/operations'

const instancesArray = Object.values(Instance) as Instance[]

export function createLangTemplates(templateSlug: string[]) {
  const [flowType, valid, fileName] = templateSlug
  const strippedFileName = fileName.replace('.gotmpl', '').replace('email.', '')

  const templates = instancesArray
    .map((instance) => {
      const strings = getKratosMailStrings(instance)

      let string = ''
      try {
        // @ts-expect-error good enough for this use case
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        string = strings[flowType][valid][strippedFileName] as string
        if (!string) throw ''
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('unknown template requested: ' + templateSlug.join('.'))
      }
      return `{{define "${instance}_template"}}
${string}
{{end}}
`
    })
    .join('')

  return (
    templates +
    createLangTemplatesSelector(
      valid === 'invalid',
      strippedFileName === 'subject'
    )
  )
}

export function createLangTemplatesSelector(
  invalid: boolean,
  subject: boolean
) {
  if (invalid) {
    if (subject)
      return `{{ template "en_template" . }} | {{ template "de_template" . }}`
    return `
[english version below]
========================

{{ template "de_template" . }}

========================

{{ template "en_template" . }}`
  }

  return (
    instancesArray
      .map((instance, index) => {
        return `
{{- ${
          index === 0 ? '' : 'else '
        }if eq .Identity.traits.language "${instance}" -}}
{{ template "${instance}_template" . }}`
      })
      .join('') +
    `
{{- else -}}
{{ template "de_template" . }}
{{- end -}}
  `
  )
}
