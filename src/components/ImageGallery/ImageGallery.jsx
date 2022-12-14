import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.style';
import Modal from '../Modal';
import { BtnCloseModal } from '../../globalStyle/btnCloseModal.styled';

import ImageGalleryItem from '../ImageGalleryItem';

export function ImageGallery({ dataApi }) {
  const [urlEl, setUrlEl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const elementSearch = urlImg => {
    setUrlEl(urlImg);

    setShowModal(state => !state);
  };

  return (
    <>
      <ImageGalleryList>
        {dataApi.length !== 0
          ? dataApi.map(({ webformatURL, id, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                elementSearch={elementSearch}
              />
            ))
          : null}
      </ImageGalleryList>

      {showModal && (
        <Modal onClose={() => setShowModal(state => !state)}>
          <BtnCloseModal
            onClick={() => setShowModal(state => !state)}
          ></BtnCloseModal>
          <img src={urlEl} alt="" />
        </Modal>
      )}
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  dataApi: PropTypes.arrayOf(PropTypes.object),
};
