import type { PageTeamPluginProps } from '.'
import { PageTeamRenderer } from './renderer'
import { PageTeamToolbar } from './toolbar'

export function PageTeamEditor(props: PageTeamPluginProps) {
  const { state } = props
  const { data } = state
  const noData = !data || data.length === 0

  const rendererData = data.map((entry) => {
    return {
      firstName: entry.firstName.value,
      lastName: entry.lastName.value,
      user: entry.user.value,
      position: entry.position.value,
      extraLinkUrl: entry.extraLinkUrl.value,
      extraLinkText: entry.extraLinkText.value,
      photo: entry.photo.value,
    }
  })

  return (
    <>
      <PageTeamToolbar {...props} />
      <div>
        {noData ? (
          renderDataImportExplanation()
        ) : (
          <PageTeamRenderer data={rendererData} />
        )}
      </div>
    </>
  )

  function renderDataImportExplanation() {
    return (
      <div className="bg-editor-primary-50 p-4">
        <b className="serlo-h4 mb-4 ml-0 block">Supply data to plugin</b>
        <p className="mb-4">
          Make your changes in{' '}
          <a
            target="_blank"
            href="https://docs.google.com/spreadsheets/d/1VmoqOrPByExqnXABBML_SymPO_TgDj7qQcBi3N2iTuA/edit#gid=0"
            rel="noreferrer"
            className="serlo-link"
          >
            this spreadsheet
          </a>{' '}
          (select language!) first and then use the &quot;Import
          Data&quot;-Button above.
        </p>
      </div>
    )
  }
}
