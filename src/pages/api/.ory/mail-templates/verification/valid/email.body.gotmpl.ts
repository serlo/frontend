import { NextApiRequest, NextApiResponse } from 'next'

const template = `
{{define "en_template"}}
👋 Welcome to Serlo!
Please verify your account by clicking the following link:

<a href="{{ .VerificationURL }}">{{ .VerificationURL }}</a>
{{end}}

{{define "de_template"}}
👋 Willkommen bei Serlo!
Bitte bestätige deinen Account mit diesem Link:

<a href="{{ .VerificationURL }}">{{ .VerificationURL }}</a>
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
