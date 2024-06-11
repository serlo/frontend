import { useInstanceData } from '@serlo/frontend/src/contexts/instance-context'
import dynamic from 'next/dynamic'

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
const localMap: Set<string> = new Set([
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
])

function rewriteDependencies(deps: string[]) {
  return deps.map((dep) => {
    if (localMap.has(dep)) {
      return dep.replace('https://app.lumi.education', '/_assets')
    }
    // eslint-disable-next-line no-console
    console.log('external dependency', dep)
    return dep.replace('https://app.lumi.education', '/api/frontend/lumi/proxy')
  })
}

// helper types

interface IPlayerModel {
  contentId: string
  dependencies: ILibraryName[]
  downloadPath: string
  embedTypes: ('iframe' | 'div')[]
  integration: IIntegration
  scripts: string[]
  styles: string[]
  translations: any
}

interface ILibraryName {
  /**
   * The name used to identify the library (e.g. H5P.Example)
   */
  machineName: string
  /**
   * The major version of the library (e.g. 1)
   */
  majorVersion: number
  /**
   * The minor version of the library (e.g. 0)
   */
  minorVersion: number
}

/**
 * The integration object is used to pass information to the H5P JavaScript
 * client running in the browser about certain settings and values of the
 * server.
 */
interface IIntegration {
  ajax: {
    /**
     * The Ajax endpoint called when the user state has changed
     * Example: /h5p-ajax/content-user-data/:contentId/:dataType/:subContentId?token=XYZ
     * You can use these placeholders:
     * :contentId (can be null for editor)
     * :dataType (values: state or any string)
     * :subContentId (seems to obsolete, always 0)
     * The H5P client will replace them with the actual values.
     */
    contentUserData: string
    /**
     * An Ajax endpoint called when the user has finished the content.
     * Example: /h5p-ajax/set-finished.json?token=XYZ
     * Only called when postUserStatistics is set to true.
     */
    setFinished: string
  }
  ajaxPath: string
  /**
   * The base URL, e.g. https://example.org
   */
  baseUrl?: string
  /**
   * The key must be of the form "cid-XXX", where XXX is the id of the content
   */
  contents?: {
    [key: string]: {
      /**
       * Can be used to override the URL used for getting content files.
       * It must be a URL to which the actual filenames can be appended.
       * Do not end it with a slash!
       * If it is a relative URL it will be appended to the hostname that
       * is in use (this is done in the H5P client).
       * If it is an absolute URL it will be used directly.
       */
      contentUrl?: string
      displayOptions: {
        copy: boolean
        copyright: boolean
        embed: boolean
        export: boolean
        frame: boolean
        icon: boolean
      }
      /**
       * The full embed code (<iframe>...</iframe> with absolute URLs).
       * Example: <iframe src=\"https://example.org/h5p/embed/XXX\" width=\":w\" height=\":h\" frameborder=\"0\" allowfullscreen=\"allowfullscreen\"></iframe>"
       */
      embedCode?: string
      /**
       * The download URL (absolute URL).
       */
      exportUrl?: string
      fullScreen: '0' | '1'
      jsonContent: string
      /**
       * The ubername with whitespace as separator.
       */
      library: string
      mainId?: string
      /**
       * The parameters.
       */
      params?: any
      /**
       * A script html tag which can be included alongside the embed code
       * to make the iframe size to the available width. Use absolute URLs.
       * Example: <script src=\"https://example.org/h5p/library/js/h5p-resizer.js\" charset=\"UTF-8\"></script>
       */
      resizeCode?: string
      /**
       * A complete list of scripts required to display the content.
       * Includes core scripts and content type specific scripts.
       */
      scripts?: string[]
      /**
       * A complete list of styles required to display the content.
       * Includes core scripts and content type specific styles.
       */
      styles?: string[]
      /**
       * The absolute URL to the current content. Used when generating
       * xAPI ids. (Becomes the attribute statement.object.id of the xAPI
       * statement. If it is a content with subcontents, the subContentId
       * will be appended like this: URL?subContentId=XXX)
       */
      url?: string
    }
  }
  /**
   * The files in this list are references when creating iframes.
   */
  core?: {
    /**
     * A list of JavaScript files that make up the H5P core
     */
    scripts?: string[]
    /**
     * A list of CSS styles that make up the H5P core.
     */
    styles?: string[]
  }
  /**
   * Can be null.
   */
  crossorigin?: any
  /**
   * Can be null.
   */
  crossoriginCacheBuster?: any
  /**
   * We pass certain configuration values to the client with the editor
   * integration object. Note that the way to pass these values to the client
   * is NOT standardized and in the PHP implementation it is not the same in
   * the Drupal, Moodle and WordPress clients. For our NodeJS version
   * we've decided to put the values into the integration object. The page
   * created by the editor renderer has to extract these values and put
   * them into the corresponding properties of the H5PEditor object!
   * See /src/renderers/default.ts how this can be done!
   */
  fullscreenDisabled?: 0 | 1
  hubIsEnabled: boolean
  /**
   * The localization strings. The namespace can for example be 'H5P'.
   */
  l10n: {
    [namespace: string]: any
  }
  /**
   * Can be null. The server can customize library behavior by setting the
   * library config for certain machine names, as the H5P client allows it to
   * be called by executing H5P.getLibraryConfig(machineName). This means that
   * libraries can retrieve configuration values from the server that way.
   */
  libraryConfig?: {
    [machineName: string]: any
  }
  /**
   * The URL at which the core **JavaScript** files are stored.
   */
  libraryUrl?: string
  /**
   * The cache buster appended to JavaScript and CSS files.
   * Example: ?q8idru
   */
  pluginCacheBuster?: string
  /**
   * If set the URL specified in ajax.setFinished is called when the user is
   * finished with a content object.
   */
  postUserStatistics: boolean
  reportingIsEnabled?: boolean
  /*
   * How often the user state of content is saved (in seconds). Set to false
   * to disable saving user state. Note that the user state is only saved if
   * the user object is passed into the render method of the player. You also
   * must set ajax.contentUserData for state saving to work.
   */
  saveFreq: number | boolean
  /**
   * Used when generating xAPI statements.
   */
  siteUrl?: string
  /**
   * The URL at which files can be accessed. Combined with the baseUrl by the
   * client.
   * Example. /h5p
   */
  url: string
  /**
   * Used to override the auto-generated library URL (libraries means "content
   * types" here). If this is unset, the H5P client will assume '/libraries'.
   * Note that the URL is NOT appended to the url or baseUrl property!
   */
  urlLibraries?: string
  user: {
    /**
     * Usage unknown.
     */
    canToggleViewOthersH5PContents?: 0 | 1
    id?: any
    mail: string
    name: string
  }
  Hub?: {
    contentSearchUrl: string
  }
}
