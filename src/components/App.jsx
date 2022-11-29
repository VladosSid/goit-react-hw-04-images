import { Component } from 'react';

import api from '../helpers/api';

import { Global, css } from '@emotion/react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
import ButtonLoadMore from './Button';

export class App extends Component {
  state = {
    searchQuery: '',
    pageNumber: 1,
    dataRequest: [],
    error: '',
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onSearch = valueSearch => {
    this.setState({ searchQuery: valueSearch });
  };

  increaseNumberPages = () => {
    this.setState(prevState => ({
      pageNumber: (prevState.pageNumber += 1),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      this.requestApi();
    }

    if (prevState.pageNumber !== pageNumber) {
      this.requestApi();
    }
  }

  requestApi = async () => {
    const { pageNumber, searchQuery } = this.state;

    try {
      let { dataRequest } = this.state;

      const request = await api.fetchImagesWithQuery(searchQuery, pageNumber);

      this.setState({ dataRequest: [...dataRequest, ...request.hits] });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { dataRequest, showModal } = this.state;

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
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery
          dataApi={dataRequest}
          openModal={this.toggleModal}
          showModal={showModal}
        />
        {dataRequest.length > 11 ? (
          <ButtonLoadMore loadMore={this.increaseNumberPages} />
        ) : null}
      </div>
    );
  }
}
