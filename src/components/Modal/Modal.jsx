import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalEl } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { onClose } = this.props;
    if (e.code === 'Escape') {
      onClose();
    }
  };

  handleBackdropClick = e => {
    const { onClose } = this.props;

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalEl>{this.props.children}</ModalEl>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
