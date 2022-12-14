import { useState, useEffect } from 'react';

import api from '../helpers/api';

import { Global, css } from '@emotion/react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
import ButtonLoadMore from './Button';
import Loader from './Loader';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [dataRequest, setDataRequest] = useState([]);
  const [errorApi, setErrorApi] = useState('');
  const [loader, setLoader] = useState(false);

  const onSearch = valueSearch => {
    if (searchQuery !== valueSearch) {
      setDataRequest([]);
      setPageNumber(1);
    }

    setSearchQuery(valueSearch);
  };

  const requestApi = async () => {
    try {
      setLoader(state => !state);
      const request = await api.fetchImagesWithQuery(searchQuery, pageNumber);

      setDataRequest([...dataRequest, ...request.hits]);
    } catch (error) {
      setErrorApi(error.message);
      console.log(errorApi);
    } finally {
      setLoader(state => !state);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    requestApi();
  }, [searchQuery, pageNumber]); // eslint-disable-line

  return (
    <div>
      <Global
        styles={css`
          html {
            box-sizing: border-box;
            width: 100vw;
            overflow-x: hidden;
          }

          *,
          *::before,
          *::after {
            box-sizing: inherit;
          }

          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
            color: #212121;
            background-color: #fff;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          img {
            display: block;
            max-width: 100%;
            height: auto;
          }
        `}
      />
      {loader && <Loader />}

      <Searchbar onSearch={onSearch} />
      <ImageGallery dataApi={dataRequest} />
      {dataRequest.length > 11 ? (
        <ButtonLoadMore loadMore={() => setPageNumber(state => state + 1)} />
      ) : null}
    </div>
  );
}

export default App;
