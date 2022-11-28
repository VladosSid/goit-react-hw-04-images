import styled from '@emotion/styled';
import close from '../image/close.svg';

export const BtnCloseModal = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  background-image: url('${close}');
  background-repeat: no-repeat;
  background-position: center;
  border: 0;
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
  }
`;
