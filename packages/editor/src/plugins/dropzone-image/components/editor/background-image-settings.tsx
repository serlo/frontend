import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import { FaIcon } from '@editor/editor-ui/fa-icon'
import { OverlayInput } from '@editor/editor-ui/overlay-input'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { type ImageProps } from '@editor/plugins/image'
import { LicenseDropdown } from '@editor/plugins/image/components/licence-dropdown'
import {
  runChangeDocumentSaga,
  selectDocument,
  useAppDispatch,
  useAppSelector,
} from '@editor/store'
import { cn } from '@editor/utils/cn'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export function BackgroundImageSettings({ id }: { id: string }) {
  const imageStrings = useEditStrings().plugins.image
  const dispatch = useAppDispatch()

  const document = useAppSelector((state) => selectDocument(state, id))
  if (!document) return null
  const state = document.state as ImageProps['state']

  const { alt, src, imageSource, licence } = state

  function handleChange(
    prop: 'src' | 'alt' | 'imageSource' | 'licence',
    value: string
  ) {
    if (!id) return
    const isOptional = Object.hasOwn(state[prop], 'defined')

    const newValue = isOptional
      ? value.length
        ? { defined: true, value }
        : { defined: false, value: null }
      : value

    dispatch(
      runChangeDocumentSaga({
        id,
        state: { initial: () => ({ ...state, [prop]: newValue }) },
      })
    )
  }

  const srcValue = src ? String(src) : ''

  return (
    <>
      <OverlayInput
        label={imageStrings.imageUrl}
        autoFocus
        placeholder={imageStrings.placeholderEmpty}
        value={srcValue}
        onChange={(e) => handleChange('src', e.target.value)}
      />
      <OverlayInput
        label={imageStrings.imageSource}
        placeholder={imageStrings.placeholderSource}
        value={imageSource.defined ? imageSource.value : ''}
        onChange={(e) => handleChange('imageSource', e.target.value)}
        tooltip={
          <span className="serlo-tooltip-trigger w-1/4">
            <FaIcon className="ml-2" icon={faQuestionCircle} />
            <EditorTooltip text={imageStrings.imageSourceHelpText} />
          </span>
        }
      />
      <LicenseDropdown
        currentLicence={licence?.defined ? licence?.value : undefined}
        onLicenseChange={(license: string) => handleChange('licence', license)}
        src={srcValue}
      />
      <label className="mx-auto mb-0 mt-5 flex flex-row justify-between">
        <span className="w-[20%]">{imageStrings.alt}</span>
        <textarea
          placeholder={imageStrings.altPlaceholder}
          value={alt.defined ? alt.value : ''}
          onChange={(e) => handleChange('alt', e.target.value)}
          className={cn(`
            serlo-input-font-reset
            mt-1.5 min-h-[100px] w-3/4 resize-none rounded-md
            border-2 border-editor-primary-100  bg-editor-primary-100 p-2.5 
            focus:border-editor-primary-300 focus:outline-none
          `)}
        />
      </label>
    </>
  )
}
