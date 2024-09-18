import { GridImage } from '../../types'

export function StaticLightboxImage({ caption, src, alt }: GridImage) {
  if (!caption) {
    return <img src={src} className="max-h-[60vh] bg-white" />
  }

  return (
    <div className="text-center">
      <img src={src} alt={alt} className="max-h-[60vh] bg-white" />
      <div className="mt-3 italic text-gray-100 [&_a]:text-brand-400">
        {caption}
      </div>
    </div>
  )
}
