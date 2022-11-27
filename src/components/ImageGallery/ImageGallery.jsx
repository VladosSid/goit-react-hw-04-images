import { ImageGalleryList } from './ImageGallery.style';

import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ dataApi }) => {
  console.log(dataApi.length);
  return (
    <ImageGalleryList>
      {dataApi.length !== 0 ? <ImageGalleryItem dataApi={dataApi} /> : null}
    </ImageGalleryList>
  );
};

export default ImageGallery;
