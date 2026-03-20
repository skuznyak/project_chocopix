import { useState } from 'react'
import type { ProductImage } from '@chocopix/shared'
import { Modal } from '@/components/ui/Modal'

interface ProductGalleryProps {
  images: ProductImage[]
  imageId?: string
  productName: string
}

export const ProductGallery = ({ images, imageId, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div>
        <button
          type="button"
          aria-label={`Відкрити фото товару ${productName}`}
          className="block w-full overflow-hidden rounded-[32px]"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt || `Фото товару ${productName} від ChocoPix`}
            data-product-image-id={imageId}
            loading="eager"
            decoding="async"
            className="aspect-square w-full object-cover"
          />
        </button>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((image) => (
            <button
              key={image.id}
              type="button"
              aria-label={`Переглянути інше фото товару ${productName}`}
              onClick={() => setSelectedImage(image)}
              className="overflow-hidden rounded-2xl border border-cocoa-900/10"
            >
              <img
                src={image.src}
                alt={image.alt || `Мініатюра товару ${productName}`}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <img
          src={selectedImage.src}
          alt={selectedImage.alt || `Збільшене фото товару ${productName}`}
          loading="lazy"
          decoding="async"
          className="max-h-[75vh] w-full rounded-3xl object-cover"
        />
      </Modal>
    </>
  )
}
