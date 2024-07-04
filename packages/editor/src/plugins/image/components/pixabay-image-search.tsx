import React, { ChangeEvent, useState, useEffect } from 'react'

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

  const [showTags, setShowTags] = useState(true)

  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image
  const apiKey = 'secret'

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) return
    setIsSearching(true)
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&image_type=photo`
      )
      const data = (await response.json()) as PixabayResponse
      setImages(data.hits)
      setShowTags(false)
    } catch (error) {
      setShowTags(true)
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

  return (
    <div className="min-h-[60vw] pt-10">
      <h2 className="mb-6 ml-10 mt-10 font-bold">{imageStrings.licenceFree}</h2>
      {/* Search input */}
      <div className="w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Suche"
          onKeyDown={handleKeyDown}
          className="ml-10 w-[90%] rounded rounded-lg border border-0 bg-yellow-100 p-2 px-4 py-2 text-gray-600"
        />
      </div>

      {/* Search tags */}
      {showTags && (
        <div>
          <div className="mb-6 mt-10 flex flex-wrap  justify-center">
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
          'mt-4 flex flex-wrap px-8 ',
          isLoadingImage && 'max-h-100',
          isLoadingImage && 'border-1 border border-red-500'
        )}
        style={{ overflow: isLoadingImage ? 'hidden' : 'auto' }}
      >
        {/* Loading overlay */}
        {(isLoadingImage || isSearching) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
            <h1 className="text-center text-xl font-bold">
              {isLoadingImage
                ? imageStrings.loadingImage
                : isSearching
                  ? imageStrings.searching
                  : 'Hmm'}
            </h1>
          </div>
        )}

        {/* Images grid */}
        {!showTags && images.length === 0 && (
          <div className="mt-10 w-full text-center text-lg">
            {imageStrings.noImagesFound}
          </div>
        )}
        {images.map((image) => (
          <div
            className="mb-4 w-1/2 cursor-pointer px-2"
            key={image.id}
            onClick={() => {
              setIsLoadingImage(true)
              onSelectImage(image.largeImageURL)
            }}
          >
            <img
              src={image.webformatURL}
              alt={image.tags}
              className="h-auto w-full rounded-lg"
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
