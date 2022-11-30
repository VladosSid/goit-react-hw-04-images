import { createPortal } from 'react-dom';
import { InfinitySpin } from 'react-loader-spinner';

import { LoaderBox } from './Loader.styled';

const loader = document.querySelector('#loader');

export const Loader = () => {
  return createPortal(
    <LoaderBox>
      <InfinitySpin width="200" color="#4fa94d" />
    </LoaderBox>,
    loader
  );
};

export default Loader;
