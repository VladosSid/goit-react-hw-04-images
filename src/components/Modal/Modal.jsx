import { Component } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export class Modal extends Component {
  render() {
    return (
      <Overlay>
        <ModalEl>{this.props.children}</ModalEl>
      </Overlay>
    );
  }
}

export default Modal;
