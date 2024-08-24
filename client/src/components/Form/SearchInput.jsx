import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../store/Search';

const SearchInput = () => {
  const navigate = useNavigate();
  const { searchItem, setSearchItem } = useSearch(); // Destructure correctly

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Searching for:', searchItem.keyword);
    try {
      const response = await fetch(`http://localhost:7000/api/v1/product/search/${searchItem.keyword}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Search results:', data);
      setSearchItem({ ...searchItem, result: data }); // Correct property name
      navigate('/searcher');
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  return (
    <div>
      <form className='d-flex' role='search' onSubmit={handleSubmit}>
        <input
          type="search"
          className="form-control me-2"
          placeholder="Search"
          aria-label='search'
          value={searchItem.keyword}
          onChange={(e) => setSearchItem({ ...searchItem, keyword: e.target.value })}
        />
        <button type="submit" className="btn btn-outline-secondary">Search</button>
      </form>
    </div>
  );
};

export default SearchInput;
