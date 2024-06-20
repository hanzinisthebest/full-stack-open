import React from 'react';

const SearchForm = ({ query, onChangeOfQuery }) => {
  return (
    <form>
      <input
        type="text"
        value={query}
        onChange={onChangeOfQuery}
        placeholder="Search for a country..."
      />
    </form>
  );
};

export default SearchForm;
