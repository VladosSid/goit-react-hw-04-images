import { useState, useEffect, useRef } from 'react';

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

  const notRequestFirstRender = useRef(true);

  const onSearch = valueSearch => {
    if (searchQuery !== valueSearch) {
      setDataRequest([]);
      setPageNumber(1);
    }

    setSearchQuery(valueSearch);
  };

  const requestApi = async () => {
    setLoader(!loader);

    try {
      const request = await api.fetchImagesWithQuery(searchQuery, pageNumber);

      setDataRequest([...dataRequest, ...request.hits]);
    } catch (error) {
      setErrorApi(error.message);
      console.log(errorApi);
    } finally {
      setLoader(!loader);
    }
  };

  useEffect(() => {
    if (notRequestFirstRender.current) {
      notRequestFirstRender.current = false;
      console.log('Отмена useEffect при первом рендере');
      return;
    }
    console.log(
      'useEffect при изменении searchQuery и последующим запросом на сервер'
    );
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
        <ButtonLoadMore loadMore={setPageNumber(state => state + 1)} />
      ) : null}
    </div>
  );
}

export default App;

// export default function oldApp () {

// state = {
//   searchQuery: '',
//   pageNumber: 1,
//   dataRequest: [],
//   error: '',
//   loader: false,
// };

// onSearch = valueSearch => {
//   const { searchQuery } = this.state;
//   if (searchQuery !== valueSearch) {
//     this.setState({ dataRequest: [], pageNumber: 1 });
//   }

//   this.setState({ searchQuery: valueSearch });
// };

// increaseNumberPages = () => {
//   this.setState(prevState => ({
//     pageNumber: prevState.pageNumber + 1,
//   }));
// };

// componentDidUpdate(prevProps, prevState) {
//   const { loader } = this.state;

//   const { searchQuery, pageNumber } = this.state;
//   if (
//     prevState.searchQuery !== searchQuery ||
//     prevState.pageNumber !== pageNumber
//   ) {
//     this.requestApi();
//     this.setState({ loader: !loader });
//   }
// }

// requestApi = async () => {
//   const { pageNumber, searchQuery } = this.state;

//   try {
//     const { dataRequest } = this.state;

//     const request = await api.fetchImagesWithQuery(searchQuery, pageNumber);

//     this.setState({
//       dataRequest: [...dataRequest, ...request.hits],
//     });
//   } catch (error) {
//     this.setState({ error });
//   } finally {
//     const { loader } = this.state;
//     this.setState({ loader: !loader });
//   }
// };

//   render() {
//     const { dataRequest, loader } = this.state;

//     return (
//       <div>
//         <Global
//           styles={css`
//             html {
//               box-sizing: border-box;
//               width: 100vw;
//               overflow-x: hidden;
//             }

//             *,
//             *::before,
//             *::after {
//               box-sizing: inherit;
//             }

//             body {
//               margin: 0;
//               font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
//                 Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
//               color: #212121;
//               background-color: #fff;
//               -webkit-font-smoothing: antialiased;
//               -moz-osx-font-smoothing: grayscale;
//             }

//             img {
//               display: block;
//               max-width: 100%;
//               height: auto;
//             }
//           `}
//         />
//         {loader && <Loader />}

//         <Searchbar onSearch={this.onSearch} />
//         <ImageGallery dataApi={dataRequest} />
//         {dataRequest.length > 11 ? (
//           <ButtonLoadMore loadMore={this.increaseNumberPages} />
//         ) : null}
//       </div>
//     );
//   }
// }
