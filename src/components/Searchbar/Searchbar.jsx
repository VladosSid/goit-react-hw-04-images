import { useState } from 'react';

import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const submitSearch = e => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <SearchbarBox>
      <SearchForm onSubmit={submitSearch}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </SearchForm>
    </SearchbarBox>
  );
}
