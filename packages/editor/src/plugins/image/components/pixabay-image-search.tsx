import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import React, {
  ChangeEvent,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { debounce } from 'ts-debounce'

import { FaIcon } from '@/components/fa-icon'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { useInstanceData } from '@/contexts/instance-context'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'

interface PixabayResponse {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

interface PixabayImage {
  id: number
  webformatURL: string
  tags: string
  previewURL: string
  largeImageURL: string
}

interface PixabayImageSearchProps {
  onSelectImage: (imageUrl: string) => void
}

const germanSearchTags = {
  math: 'Mathematik',
  nature: 'Natur',
  plants: 'Pflanzen',
  adventure: 'Abenteuer',
  teamwork: 'Teamwork',
  journey: 'Reise',
  sports: 'Sport',
  chemistry: 'Chemie',
  lab: 'Labor',
  tech: 'Technologie',
  humans: 'Menschen',
  pyramide: 'Pyramide',
  cylinder: 'Zylinder',
  art: 'Kunst',
  music: 'Musik',
  school: 'Schule',
}

export const PixabayImageSearch = ({
  onSelectImage,
}: PixabayImageSearchProps) => {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState<PixabayImage[]>([])
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const { lang } = useInstanceData()
  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image
  // Pixabay API key connected to an unpaid account -> No need to keep it secret.
  const apiKey = '44761287-06b5809c17d0a9132219f5173'
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) return
    setIsSearching(true)
    setHasSearched(true)
    try {
      if (!apiKey) return
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo&lang=de`
      )
      const data = (await response.json()) as PixabayResponse
      setImages(data.hits)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching images from Pixabay:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      void handleSearch(searchQuery)
    }, 300),
    []
  )

  useEffect(() => {
    if (query.length > 3) {
      void debouncedSearch(query)
    }
    // Cancel the debounce if the component is unmounted or the query changes
    return () => {
      debouncedSearch.cancel()
    }
  }, [query, debouncedSearch])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleTagClick = async (tag: string) => {
    setQuery(tag)
    await handleSearch(tag)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    await handleSearch(query)
  }

  const isGermanLocale = lang === 'de'
  const showTags = isGermanLocale && images.length === 0 && !isSearching

  return (
    <div
      className={cn(
        'max-h-[60vw] pt-2',
        isGermanLocale ? 'min-h-[20vw]' : 'min-h-[5vw]'
      )}
    >
      <h2 className="mb-6 ml-10 mt-10 font-bold">{imageStrings.licenceFree}</h2>
      {/* Search input */}
      <div className="relative ml-10 w-[90%]">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={imageStrings.search}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border-0 bg-yellow-100 py-2 pl-4 pr-10 text-gray-600"
        />
        {query && (
          <div
            className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center justify-center px-4 text-gray-400"
            onClick={() => {
              setQuery('')
              setImages([])
              setHasSearched(false)
              setTimeout(() => {
                inputRef.current?.focus()
              })
            }}
          >
            <FaIcon icon={faXmarkCircle} />
          </div>
        )}
      </div>

      {/* Search tags */}
      {showTags && (
        <div>
          <div className="mb-6 mt-10 flex flex-wrap justify-center">
            {Object.values(germanSearchTags).map((tagKey) => (
              <button
                key={tagKey}
                onClick={() => handleTagClick(tagKey)}
                className="m-2 inline-block rounded-md bg-white px-2 py-1 text-sm text-black shadow-md"
              >
                {tagKey}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className={cn(
          'max-h-[500px]',
          'mt-4 flex flex-wrap px-8',
          isLoadingImage && 'max-h-100 border-1 border border-red-500',
          isLoadingImage ? 'overflow-hidden' : 'overflow-auto'
        )}
      >
        {/* Loading overlay */}
        {(isLoadingImage || isSearching) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
            <h1 className="text-center text-xl font-bold">
              <LoadingSpinner noText />
              {isLoadingImage
                ? imageStrings.loadingImage
                : imageStrings.searching}
            </h1>
          </div>
        )}

        {/* Images grid */}
        {hasSearched && images.length === 0 && !isSearching && (
          <div className="mt-10 w-full text-center text-lg">
            {imageStrings.noImagesFound}
          </div>
        )}
        {images.map((image) => (
          <div className="w-1/2  px-2 pb-4" key={image.id}>
            <img
              src={image.webformatURL.replace('_640', '_340')}
              alt={image.tags}
              className="h-auto w-full cursor-pointer rounded-lg"
              loading="lazy"
              onClick={() => {
                setIsLoadingImage(true)
                onSelectImage(image.largeImageURL)
              }}
            />
          </div>
        ))}
      </div>
      <div className="w-full justify-center pt-4 text-center text-sm">
        {showTags ? imageStrings.pixabayText : imageStrings.pixabayLoadedText}
      </div>
    </div>
  )
}
