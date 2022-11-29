import { Component } from 'react';

import api from '../helpers/api';

import { Global, css } from '@emotion/react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';
import ButtonLoadMore from './Button';

export class App extends Component {
  state = {
    searchQuery: '',
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

    this.requestApi(valueSearch);
  };

  requestApi = async valueSearch => {
    try {
      let { dataRequest } = this.state;

      const request = await api.fetchImagesWithQuery(valueSearch);

      this.setState({ dataRequest: [...request.hits, ...dataRequest] });
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
        {dataRequest.length !== 0 ? <ButtonLoadMore /> : null}
      </div>
    );
  }
}
