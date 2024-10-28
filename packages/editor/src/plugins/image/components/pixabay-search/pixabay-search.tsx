import { EditorModal } from '@editor/editor-ui/editor-modal'
import { useEditStrings } from '@editor/i18n/edit-strings-provider'
import { ChangeEvent, useRef, useState, useEffect, useCallback } from 'react'
import { debounce } from 'ts-debounce'

import { PixabaySearchButton } from './pixabay-search-button'
import { PixabaySearchInput } from './pixabay-search-input'
import { PixabaySearchResults } from './pixabay-search-results'
import { PixabaySearchTags } from './pixabay-search-tags'

interface PixabayResponse {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

export interface PixabayImage {
  id: number
  webformatURL: string
  tags: string
  previewURL: string
  largeImageURL: string
}

interface PixabaySearchProps {
  onSelectImage: (imageUrl: string) => void
  onFocus: () => void
  onBlur: () => void
}

export function PixabaySearch({
  onSelectImage,
  onFocus,
  onBlur,
}: PixabaySearchProps) {
  const [query, setQuery] = useState('')
  const [images, setImages] = useState<PixabayImage[]>([])
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const editStrings = useEditStrings()
  const lang = editStrings.lang
  const imageStrings = editStrings.plugins.image

  // Pixabay API key connected to an unpaid account -> No need to keep it secret.
  const apiKey = '44761287-06b5809c17d0a9132219f5173'

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleInputKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== 'Enter') return
    await handleSearch(query)
  }

  const handleClearButtonClick = () => {
    setQuery('')
    setImages([])
    setHasSearched(false)
    setTimeout(() => {
      inputRef.current?.focus()
    })
  }

  const handleResultImageClick = (image: PixabayImage) => {
    setIsLoadingImage(true)
    onSelectImage(image.largeImageURL)
    setIsOpen(false)
  }

  const showTags = lang === 'de' && images.length === 0 && !isSearching

  return (
    <>
      <PixabaySearchButton
        onClick={() => setIsOpen(true)}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <EditorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="top-1/2 flex max-h-[90vh] w-[900px] max-w-[90vw] flex-col px-10 pt-0"
        title={imageStrings.licenceFree}
        extraTitleClassName="text-lg border-none ml-0"
      >
        <PixabaySearchInput
          query={query}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onClearButtonClick={handleClearButtonClick}
        />

        {showTags ? <PixabaySearchTags onClick={handleTagClick} /> : null}

        <PixabaySearchResults
          images={images}
          isLoadingImage={isLoadingImage}
          isSearching={isSearching}
          hasSearched={hasSearched}
          onClick={handleResultImageClick}
        />

        <div className="w-full justify-center pt-4 text-center text-sm">
          {showTags ? imageStrings.pixabayText : imageStrings.pixabayLoadedText}
        </div>
      </EditorModal>
    </>
  )
}
