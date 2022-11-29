import { Component } from 'react';

import { LoadMore, Footer } from './Button.styled';

export class ButtonLoadMore extends Component {
  render() {
    const { loadMore } = this.props;
    return (
      <Footer>
        <LoadMore onClick={loadMore}>Load more</LoadMore>
      </Footer>
    );
  }
}

export default ButtonLoadMore;
