export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  handleOpenModalImage,
}) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatURL}
        alt={id}
        className="ImageGalleryItem-image"
        onClick={handleOpenModalImage}
      />
    </li>
  );
};
