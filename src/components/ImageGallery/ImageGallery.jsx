import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, handleOpenModalImage }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            handleOpenModalImage={() => handleOpenModalImage(largeImageURL)}
          />
        );
      })}
    </ul>
  );
};
