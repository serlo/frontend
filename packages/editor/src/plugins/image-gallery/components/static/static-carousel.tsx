import { useState, useRef, useEffect } from 'react'

import { StaticCarouselImage } from './static-carousel-image'
import { GridImage } from '../../types'
import { cn } from '@/helper/cn'

interface StaticCarouselProps {
  images: GridImage[]
}

export function StaticCarousel({ images }: StaticCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startingTouchLocation = useRef(0)
  const isSwipingHorizontally = useRef(true)

  useEffect(() => {
    function handleTouchMove(event: TouchEvent) {
      if (!dragging) return

      const currentTouchLocation = event.touches[0].clientX
      const newSwipeDistance =
        currentTouchLocation - startingTouchLocation.current

      // Check if the user is swiping horizontally
      if (isSwipingHorizontally.current) {
        isSwipingHorizontally.current =
          Math.abs(newSwipeDistance) >
          swipeDistanceNeededToPreventVerticalScroll
      }

      // If the user is swiping horizontally, prevent vertical scrolling
      // and update the horizontal swipe distance for visual swipe preview
      if (isSwipingHorizontally.current) {
        event.preventDefault()
        setSwipeDistance(newSwipeDistance)
      }
    }

    // In order to prevent vertical scrolling while swiping, the touchmove event has to be passive.
    // By default touchmove events are passive on Chrome, which means they can't be prevented.
    // Therefore, we use a native event listener, instead of a React event listener.
    // https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent#using_with_addeventlistener_and_preventdefault
    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => document.removeEventListener('touchmove', handleTouchMove)
  }, [dragging])

  function handleTouchStart(event: React.TouchEvent) {
    startingTouchLocation.current = event.touches[0].clientX
    setDragging(true)
    isSwipingHorizontally.current = true
  }

  function handleTouchEnd() {
    setDragging(false)
    if (swipeDistance > swipeDistanceNeededToChangeImage) {
      handlePrevious()
    }
    if (swipeDistance < -swipeDistanceNeededToChangeImage) {
      handleNext()
    }
    setSwipeDistance(0)
  }

  function handlePrevious() {
    if (currentIndex === 0) return
    setCurrentIndex((previousIndex) => previousIndex - 1)
  }

  function handleNext() {
    if (currentIndex === images.length - 1) return
    setCurrentIndex((previousIndex) => previousIndex + 1)
  }

  return (
    <div
      className="relative mx-auto w-full max-w-md overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn(
          'flex items-center gap-x-4',
          'transition-transform duration-300 ease-out'
        )}
        style={{ transform: getTransformValue(currentIndex, swipeDistance) }}
      >
        {images.map((image, index) => (
          <StaticCarouselImage
            key={image.src + index}
            image={image}
            position={`${index + 1}/${images.length}`}
          />
        ))}
      </div>
    </div>
  )
}

const swipeDistanceNeededToPreventVerticalScroll = 6
const swipeDistanceNeededToChangeImage = 50

function getTransformValue(index: number, swipeDistance: number) {
  const imageWidth = `-${index * 90}%`
  const gapWidth = `${index * 24}px`
  const centeringFactor = '10%'
  const swipedPixels = `${swipeDistance}px`
  return `translateX(calc(${imageWidth} + ${gapWidth} + ${centeringFactor} + ${swipedPixels}))`
}
