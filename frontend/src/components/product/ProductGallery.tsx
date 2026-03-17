import { useState } from 'react'
import type { ProductImage } from '@chocopix/shared'
import { Modal } from '@/components/ui/Modal'

interface ProductGalleryProps {
  images: ProductImage[]
  imageId?: string
}

export const ProductGallery = ({ images, imageId }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div>
        <button type="button" className="block w-full overflow-hidden rounded-[32px]" onClick={() => setIsOpen(true)}>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            data-product-image-id={imageId}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="aspect-square w-full object-cover"
          />
        </button>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedImage(image)}
              className="overflow-hidden rounded-2xl border border-cocoa-900/10"
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <img src={selectedImage.src} alt={selectedImage.alt} loading="lazy" decoding="async" className="max-h-[75vh] w-full rounded-3xl object-cover" />
      </Modal>
    </>
  )
}
