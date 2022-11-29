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
  };

  elementSearch = id => {
    const { dataApi, openModal } = this.props;

    for (let i = 0; i < dataApi.length; i++) {
      if (dataApi[i].id === id) {
        this.setState(({ urlEl }) => ({
          urlEl: dataApi[i].largeImageURL,
        }));

        openModal();
      }
    }
  };

  render() {
    const { urlEl } = this.state;
    const { dataApi, showModal, openModal } = this.props;
    return (
      <>
        {dataApi.map(({ webformatURL, id }) => (
          <ImageGalleryItemLi key={id} onClick={() => this.elementSearch(id)}>
            <ImageGalleryItemImage src={webformatURL} />
          </ImageGalleryItemLi>
        ))}

        {showModal && (
          <Modal onClose={openModal}>
            <BtnCloseModal onClick={openModal}></BtnCloseModal>
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
