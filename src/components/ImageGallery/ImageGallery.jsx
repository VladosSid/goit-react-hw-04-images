import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.style';
import Modal from '../Modal';
import { BtnCloseModal } from '../../globalStyle/btnCloseModal.styled';

import ImageGalleryItem from '../ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    urlEl: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  elementSearch = urlImg => {
    this.setState({ urlEl: urlImg });

    this.toggleModal();
  };

  resetUrl = () => {
    this.setState({ urlEl: '' });
  };

  render() {
    const { urlEl, showModal } = this.state;

    const { dataApi } = this.props;
    return (
      <>
        <ImageGalleryList>
          {dataApi.length !== 0
            ? dataApi.map(({ webformatURL, id, largeImageURL }) => (
                <ImageGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  elementSearch={this.elementSearch}
                />
              ))
            : null}
        </ImageGalleryList>

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <BtnCloseModal onClick={this.toggleModal}></BtnCloseModal>
            <img src={urlEl} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
