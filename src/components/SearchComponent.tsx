// SearchComponent.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from 'store/searchReducer';

const SearchComponent = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: any) => state.search.searchTerm);

  // Simple debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounce setSearchTerm
  const debouncedSetSearchTerm = debounce((term) => {
    dispatch(setSearchTerm(term));
  }, 300);

  const handleInputChange = (event) => {
    const { value } = event.target;
    debouncedSetSearchTerm(value);
  };

  return (
    <div>
      <label htmlFor="searchInput">Search:</label>
      <input
        type="text"
        id="searchInput"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;
