import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.style';

import ImageGalleryItem from '../ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { dataApi, openModal, showModal } = this.props;
    return (
      <>
        <ImageGalleryList>
          {dataApi.length !== 0 ? (
            <ImageGalleryItem
              dataApi={dataApi}
              openModal={openModal}
              showModal={showModal}
            />
          ) : null}
        </ImageGalleryList>
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
