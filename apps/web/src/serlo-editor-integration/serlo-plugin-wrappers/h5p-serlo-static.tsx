import { parseH5pUrl } from '@editor/plugins/h5p/renderer'
import type { EditorH5PDocument } from '@editor/types/editor-plugins'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { useEntityData } from '@/contexts/uuids-context'
import { exerciseSubmission } from '@/helper/exercise-submission'
import { useCreateExerciseSubmissionMutation } from '@/mutations/use-experiment-create-exercise-submission-mutation'

const H5PPlayerUI = dynamic(
  () => import('@lumieducation/h5p-react').then((mod) => mod.H5PPlayerUI),
  { ssr: false }
)

// Special version for serlo.org with exercise submission events
export function H5pSerloStaticRenderer(props: EditorH5PDocument) {
  const { asPath } = useRouter()
  const ab = useAB()
  const { entityId, revisionId } = useEntityData()
  const trackExperiment = useCreateExerciseSubmissionMutation(asPath)
  const [onClient, setOnClient] = useState(false)
  const id = parseH5pUrl(props.state)
  const { strings } = useInstanceData()

  useEffect(() => {
    requestAnimationFrame(() => {
      setOnClient(true)
    })
    const handleSubmissionEvent = (e: Event) => {
      const e_id = (e as CustomEvent).detail as string
      const id = parseH5pUrl(props.state)

      if (e_id === id) {
        exerciseSubmission(
          {
            path: asPath,
            entityId,
            revisionId,
            result: e.type === 'h5pExerciseCorrect' ? 'correct' : 'wrong',
            type: 'h5p',
          },
          ab,
          trackExperiment
        )
      }
    }
    const { body } = window.document
    body.addEventListener('h5pExerciseCorrect', handleSubmissionEvent)
    body.addEventListener('h5pExerciseWrong', handleSubmissionEvent)

    return () => {
      // Unbind the event listener on clean up
      body.removeEventListener('h5pExerciseCorrect', handleSubmissionEvent)
      body.removeEventListener('h5pExerciseWrong', handleSubmissionEvent)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!id) {
    return <p className="serlo-p">{strings.errors.defaultMessage}</p>
  }

  if (!onClient) {
    return (
      <div
        className="mx-side mb-block"
        style={{ width: 727, height: 500 }}
      ></div>
    )
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

          console.log(id, contents)

          console.log(data)
          return data
        }}
      />
    </div>
  )
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
