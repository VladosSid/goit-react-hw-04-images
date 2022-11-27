import { Component } from 'react';

import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  recordSearch = e => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  submitSearch = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchValue);
    // this.reset();
  };

  reset = () => {
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <SearchbarBox>
        <SearchForm onSubmit={this.submitSearch}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.recordSearch}
          />
        </SearchForm>
      </SearchbarBox>
    );
  }
}
