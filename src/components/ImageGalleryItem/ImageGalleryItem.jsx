import PropTypes from 'prop-types';

import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = dataApi => {
  console.log(dataApi);

  return (
    <ImageGalleryItemLi>
      <ImageGalleryItemImage src="" alt="" />
    </ImageGalleryItemLi>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
