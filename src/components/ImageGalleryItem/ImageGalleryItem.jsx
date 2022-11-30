import PropTypes from 'prop-types';
import { Component } from 'react';

import Modal from '../Modal';

import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { BtnCloseModal } from '../../globalStyle/btnCloseModal.styled';

export class ImageGalleryItem extends Component {
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
  };

  componentDidUpdate(prevProps, prevState) {
    const { urlEl } = this.state;
    if (prevState.urlEl !== urlEl) {
      this.toggleModal();
    }
  }

  render() {
    const { urlEl, showModal } = this.state;
    const { dataApi } = this.props;
    return (
      <>
        {dataApi.map(({ webformatURL, id, largeImageURL }) => (
          <ImageGalleryItemLi
            key={id}
            onClick={() => this.elementSearch(largeImageURL)}
          >
            <ImageGalleryItemImage src={webformatURL} />
          </ImageGalleryItemLi>
        ))}

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

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
