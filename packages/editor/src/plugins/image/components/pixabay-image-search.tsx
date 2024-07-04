import React, { ChangeEvent, useState } from 'react'

import { LoadingSpinner } from '@/components/loading/loading-spinner'
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

export const PixabayImageSearch = ({
  onSelectImage,
}: PixabayImageSearchProps) => {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState<PixabayImage[]>([])
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image
  const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) return
    setIsSearching(true)
    setHasSearched(true)
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo`
      )
      const data = (await response.json()) as PixabayResponse
      setImages(data.hits)
    } catch (error) {
      console.error('Error fetching images from Pixabay:', error)
    } finally {
      setIsSearching(false)
    }
  }

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

  const showTags = images.length === 0 && !isSearching

  return (
    <div className="min-h-[60vw] pt-2">
      <h2 className="mb-6 ml-10 mt-10 font-bold">{imageStrings.licenceFree}</h2>
      {/* Search input */}
      <div className="w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={imageStrings.search}
          onKeyDown={handleKeyDown}
          className="ml-10 w-[90%] rounded-lg border-0 bg-yellow-100 p-2 px-4 py-2 text-gray-600"
        />
      </div>

      {/* Search tags */}
      {showTags && (
        <div>
          <div className="mb-6 mt-10 flex flex-wrap justify-center">
            {Object.values(imageStrings.searchTags).map((tagKey) => (
              <button
                key={tagKey}
                onClick={() => handleTagClick(tagKey)}
                className="m-2 inline-block rounded-md bg-white px-4 py-2 text-black shadow-md"
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
          isLoadingImage && 'max-h-100 border-1 border border-red-500'
        )}
        style={{ overflow: isLoadingImage ? 'hidden' : 'auto' }}
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
