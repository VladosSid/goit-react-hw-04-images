import PropTypes from 'prop-types';

import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  elementSearch,
}) => {
  return (
    <>
      <ImageGalleryItemLi onClick={() => elementSearch(largeImageURL)}>
        <ImageGalleryItemImage src={webformatURL} />
      </ImageGalleryItemLi>
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  elementSearch: PropTypes.func,
};
