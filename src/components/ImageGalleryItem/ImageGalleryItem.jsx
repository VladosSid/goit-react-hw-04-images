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
    showModal: false,
    urlEl: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  elementSearch = id => {
    const { dataApi } = this.props;

    for (let i = 0; i < dataApi.length; i++) {
      console.log(dataApi[i]);
      if (dataApi[i].id === id) {
        this.setState(({ urlEl }) => ({
          urlEl: dataApi[i].largeImageURL,
        }));

        return this.toggleModal();
      }
    }
  };

  render() {
    const { showModal, urlEl } = this.state;
    const { dataApi } = this.props;
    return (
      <>
        {dataApi.map(({ webformatURL, id }) => (
          <ImageGalleryItemLi key={id} onClick={() => this.elementSearch(id)}>
            <ImageGalleryItemImage src={webformatURL} />
          </ImageGalleryItemLi>
        ))}

        {showModal && (
          <Modal>
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
