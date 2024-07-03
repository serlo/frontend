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

  const editorStrings = useEditorStrings()
  const imageStrings = editorStrings.plugins.image
  const apiKey = 'secret'

  useEffect(() => {
    if (isLoadingImage) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isLoadingImage])

  const handleSearch = async () => {
    if (!query) return
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`
      )
      const data = (await response.json()) as PixabayResponse
      setImages(data.hits)
    } catch (error) {
      console.error('Error fetching images from Pixabay:', error)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="min-h-[80vw]">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Suche"
        className="ml-10 rounded border p-2"
      />
      <button
        onClick={handleSearch}
        className="ml-2 rounded bg-blue-500 p-2 text-white"
      >
        Search
      </button>
      <div
        className={cn(
          'max-h-[100vw] overflow-y-auto',
          'mt-4 flex flex-wrap px-8 ',
          isLoadingImage && 'max-h-100',
          isLoadingImage && 'border-1 border border-red-500'
        )}
        style={{ overflow: isLoadingImage ? 'hidden' : 'auto' }}
      >
        {isLoadingImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
            <h1 className="text-center text-xl font-bold">
              {imageStrings.loadingImage}
            </h1>
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
    </div>
  )
}
