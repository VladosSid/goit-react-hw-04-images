import PropTypes from 'prop-types';

import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ dataApi }) => {
  return (
    <>
      {dataApi.map(({ webformatURL, id }) => (
        <ImageGalleryItemLi key={id}>
          <ImageGalleryItemImage src={webformatURL} />
        </ImageGalleryItemLi>
      ))}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
