import { Component } from 'react';

import api from '../helpers/api';

import { Global, css } from '@emotion/react';
import { Searchbar } from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
    dataRequest: [],
    error: '',
  };

  onSearch = valueSearch => {
    this.setState({ searchQuery: valueSearch });

    this.requestApi();
  };

  requestApi = async () => {
    try {
      const { searchQuery, dataRequest } = this.state;

      const request = await api.fetchImagesWithQuery(searchQuery);
      // console.log(dataRequest.hits);

      this.setState({ dataRequest: [...request.hits, ...dataRequest] });
      // console.log(this.state);
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { dataRequest } = this.state;
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
        <ImageGallery dataApi={dataRequest} />
      </div>
    );
  }
}
