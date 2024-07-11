import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import dynamic from 'next/dynamic'

import { IPlayerModel } from './lumi-api-types'

const H5PPlayerUI = dynamic(
  () => import('@lumieducation/h5p-react').then((mod) => mod.H5PPlayerUI),
  { ssr: false }
)

export interface H5pRendererProps {
  url: string
}

export function parseH5pUrl(url: string) {
  const result = /https:\/\/app\.lumi\.education\/run\/([\w-]+)/i.exec(url)
  return result ? result[1] : null
}

export function H5pRenderer({ url }: H5pRendererProps) {
  const id = parseH5pUrl(url)
  const { strings } = useInstanceData()

  if (!id) {
    return <p className="serlo-p">{strings.errors.defaultMessage}</p>
  }

  return (
    <div className="mx-side mb-block" style={{ width: 727, minHeight: 500 }}>
      <H5PPlayerUI
        contentId={id}
        loadContentCallback={async (contentId) => {
          const data = (await (
            await fetch(`/api/frontend/lumi/embed/${contentId}`)
          ).json()) as IPlayerModel

          // disable user statistics
          data.integration.postUserStatistics = false
          data.integration.ajax.contentUserData = ''

          const id = data.contentId
          const contents = data.integration.contents![`cid-${id}`]

          contents.scripts = rewriteDependencies(contents.scripts!)
          contents.styles = rewriteDependencies(contents.styles!)

          data.scripts = rewriteDependencies(data.scripts)
          data.styles = rewriteDependencies(data.styles)

          if (data.integration.core) {
            data.integration.core.styles = rewriteDependencies(
              data.integration.core.styles!
            )
            data.integration.core.scripts = rewriteDependencies(
              data.integration.core.scripts!
            )
          }

          contents.contentUrl = contents.contentUrl!.replace(
            'https://app.lumi.education',
            '/api/frontend/lumi/proxy'
          )

          // console.log(data)
          return data
        }}
      />
    </div>
  )
}

// reduce load on lumi server
const localMap: Set<string> = new Set(
  [
    'https://app.lumi.education/h5p/libraries/H5P.DragQuestion-1.14/h5p-drag-question.js?version=1.14.15',
    'https://app.lumi.education/h5p/libraries/H5P.DragQuestion-1.14/css/dragquestion.css?version=1.14.15',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.5/scripts/score-points.js?version=1.5.15',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.5/scripts/explainer.js?version=1.5.15',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.5/scripts/question.js?version=1.5.15',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.5/styles/explainer.css?version=1.5.15',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.5/styles/question.css?version=1.5.15',
    'https://app.lumi.education/h5p/libraries/H5P.Image-1.1/image.js?version=1.1.22',
    'https://app.lumi.education/h5p/libraries/H5P.Image-1.1/image.css?version=1.1.22',
    'https://app.lumi.education/h5p/libraries/FontAwesome-4.5/h5p-font-awesome.min.css?version=4.5.4',
    'https://app.lumi.education/h5p/libraries/H5P.FontIcons-1.0/styles/h5p-font-icons.css?version=1.0.11',

    'https://app.lumi.education/h5p/core/styles/h5p.css?version=1.24-master',
    'https://app.lumi.education/h5p/core/styles/h5p-core-button.css?version=1.24-master',
    'https://app.lumi.education/h5p/core/styles/h5p-confirmation-dialog.css?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/jquery.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p-event-dispatcher.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p-x-api-event.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p-x-api.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p-content-type.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p-action-bar.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/request-queue.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p-confirmation-dialog.js?version=1.24-master',
    'https://app.lumi.education/h5p/core/js/h5p-tooltip.js',
    'https://app.lumi.education/h5p/core/styles/h5p-tooltip.css',
    'https://app.lumi.education/h5p/libraries/H5P.AdvancedText-1.1/text.css?version=1.1.14',
    'https://app.lumi.education/h5p/libraries/H5P.AdvancedText-1.1/text.js?version=1.1.14',
    'https://app.lumi.education/h5p/libraries/jQuery.ui-1.10/h5p-jquery-ui.js?version=1.10.22',
    'https://app.lumi.education/h5p/libraries/jQuery.ui-1.10/h5p-jquery-ui.css?version=1.10.22',
    'https://app.lumi.education/h5p/libraries/H5P.Transition-1.0/transition.js?version=1.0.4',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-ui.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progressbar.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-score-bar.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-slider.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-tip.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-throbber.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-speech-bubble.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-simple-rounded-button.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-progress-circle.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-message-dialog.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-icon.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-ui.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-progressbar.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-score-bar.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-slider.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-tip.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-speech-bubble.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-simple-rounded-button.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-progress-circle.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-message-dialog.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/css/joubel-help-dialog.css?version=1.3.19',
    'https://app.lumi.education/h5p/libraries/H5P.JoubelUI-1.3/js/joubel-help-dialog.js?version=1.3.19',

    'https://app.lumi.education/h5p/libraries/H5P.Question-1.4/styles/explainer.css?version=1.4.10',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.4/styles/question.css?version=1.4.10',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.4/scripts/score-points.js?version=1.4.10',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.4/scripts/explainer.js?version=1.4.10',
    'https://app.lumi.education/h5p/libraries/H5P.Question-1.4/scripts/question.js?version=1.4.10',

    'https://app.lumi.education/h5p/libraries/H5P.ImagePair-1.4/h5p-image-pair.css?version=1.4.0',
    'https://app.lumi.education/h5p/libraries/H5P.ImagePair-1.4/h5p-image-pair-card.js?version=1.4.0',
    'https://app.lumi.education/h5p/libraries/H5P.ImagePair-1.4/h5p-image-pair.js?version=1.4.0',

    'https://app.lumi.education/h5p/libraries/H5P.ImageMultipleHotspotQuestion-1.0/image-multiple-hotspot-question.css?version=1.0.1',
    'https://app.lumi.education/h5p/libraries/H5P.ImageMultipleHotspotQuestion-1.0/image-multiple-hotspot-question.js?version=1.0.1',

    'https://app.lumi.education/h5p/libraries/H5P.MathDisplay-1.0/scripts/mathdisplay.js?version=1.0.8',

    'https://app.lumi.education/h5p/core/styles/h5p.css?version=1.26',
    'https://app.lumi.education/h5p/core/styles/h5p-core-button.css?version=1.26',
    'https://app.lumi.education/h5p/core/styles/h5p-confirmation-dialog.css?version=1.26',
    'https://app.lumi.education/h5p/core/js/jquery.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/h5p.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/h5p-event-dispatcher.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/h5p-x-api-event.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/h5p-x-api.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/h5p-content-type.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/h5p-action-bar.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/request-queue.js?version=1.26',
    'https://app.lumi.education/h5p/core/js/h5p-confirmation-dialog.js?version=1.26',
  ].map(normalizeDepVersion)
)

function rewriteDependencies(deps: string[]) {
  return deps.map((dep) => {
    if (localMap.has(normalizeDepVersion(dep))) {
      return dep.replace('https://app.lumi.education', '/_assets')
    }
    // eslint-disable-next-line no-console
    console.log('external dependency', dep)
    return dep.replace('https://app.lumi.education', '/api/frontend/lumi/proxy')
  })
}

function normalizeDepVersion(dep: string) {
  return dep.replace(/(version=[\d])+\..+$/, '$1')
}
