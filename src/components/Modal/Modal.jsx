import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // eslint-disable-line

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalEl>{children}</ModalEl>
    </Overlay>,
    modalRoot
  );
}

export default Modal;
