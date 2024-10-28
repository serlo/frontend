import { LoadingSpinner } from '@editor/editor-ui/loading-spinner'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { cn } from '@editor/utils/cn'

import type { PixabayImage } from './pixabay-search'

interface PixabaySearchResultsProps {
  images: PixabayImage[]
  isLoadingImage: boolean
  isSearching: boolean
  hasSearched: boolean
  onClick: (image: PixabayImage) => void
}

export function PixabaySearchResults(props: PixabaySearchResultsProps) {
  const { images, isLoadingImage, isSearching, hasSearched, onClick } = props
  const imageStrings = useEditStrings().plugins.image

  return (
    <div
      className={cn(
        'mt-4 grid grid-cols-2 gap-4',
        isLoadingImage && 'max-h-100 border-1 border border-red-500',
        isLoadingImage ? 'overflow-hidden' : 'overflow-auto'
      )}
    >
      {isLoadingImage || isSearching ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
          <h1 className="text-center text-xl font-bold">
            <LoadingSpinner noText />
            {isLoadingImage
              ? imageStrings.loadingImage
              : imageStrings.searching}
          </h1>
        </div>
      ) : null}

      {hasSearched && images.length === 0 && !isSearching && (
        <div className="col-span-2 mt-10 w-full text-center text-lg">
          {imageStrings.noImagesFound}
        </div>
      )}

      {images.map((image) => (
        <img
          key={image.id}
          src={image.webformatURL.replace('_640', '_340')}
          alt={image.tags}
          className="h-auto w-full cursor-pointer rounded-lg"
          loading="lazy"
          onClick={() => onClick(image)}
        />
      ))}
    </div>
  )
}
