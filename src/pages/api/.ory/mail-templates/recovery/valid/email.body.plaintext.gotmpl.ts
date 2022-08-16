import { NextApiRequest, NextApiResponse } from 'next'

const template = `
{{define "en_template"}}
👋 Hi,
please recover access to your account by clicking the following link:

<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a>
{{end}}

{{define "de_template"}}
👋 Hi,
mit dem folgenen Link kommst du wieder in deinen Serlo-Account:

<a href="{{ .RecoveryURL }}">{{ .RecoveryURL }}</a>
{{end}}

{{- if eq .Identity.traits.language "en" -}}
{{ template "en_template" . }}
{{- end -}}
{{- if eq .Identity.traits.language "de" -}}
{{ template "de_template" . }}
{{- end -}}
`

export default function de(_req: NextApiRequest, res: NextApiResponse) {
  res.send(template)
}
