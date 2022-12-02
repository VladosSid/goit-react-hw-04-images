import { Component } from 'react';

import api from '../helpers/api';

import { Global, css } from '@emotion/react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
import ButtonLoadMore from './Button';
import Loader from './Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    dataRequest: [],
    error: '',
    loader: false,
  };

  onSearch = valueSearch => {
    const { searchQuery } = this.state;
    if (searchQuery !== valueSearch) {
      this.setState({ dataRequest: [], pageNumber: 1 });
    }

    this.setState({ searchQuery: valueSearch });
  };

  increaseNumberPages = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
      loader: !prevState.loader,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { loader } = this.state;

    const { searchQuery, pageNumber } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.requestApi();

      this.setState({ loader: !loader });
    }

    if (prevState.pageNumber !== pageNumber) {
      this.requestApi();
    }
  }

  requestApi = async () => {
    const { pageNumber, searchQuery } = this.state;

    try {
      const { dataRequest } = this.state;

      const request = await api.fetchImagesWithQuery(searchQuery, pageNumber);

      this.setState({
        dataRequest: [...dataRequest, ...request.hits],
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      const { loader } = this.state;
      this.setState({ loader: !loader });
    }
  };

  render() {
    const { dataRequest, loader } = this.state;

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

        <Searchbar onSearch={this.onSearch} />
        <ImageGallery dataApi={dataRequest} />
        {dataRequest.length > 11 ? (
          <ButtonLoadMore loadMore={this.increaseNumberPages} />
        ) : null}
      </div>
    );
  }
}
