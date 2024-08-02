import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';


function SearchComponent({ onSearchResults, onSearchQueryChange }) {
  const [query, setQuery] = useState('');
  const { authToken } = useAuth();

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://np0gqaxmz1.execute-api.us-west-2.amazonaws.com/dev/person/search/${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });
      const data = await response.json();
      onSearchResults(data.data);
      onSearchQueryChange(query);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  return (
    <div>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username or email"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchComponent;
