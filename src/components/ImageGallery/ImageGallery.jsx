import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.style';

import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ dataApi }) => {
  return (
    <ImageGalleryList>
      {dataApi.length !== 0 ? <ImageGalleryItem dataApi={dataApi} /> : null}
    </ImageGalleryList>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
