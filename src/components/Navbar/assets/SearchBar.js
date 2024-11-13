import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ query, setQuery, suggestions, isLoading }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex lg:flex-1 lg:justify-center relative"
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm w-full max-w-xs"
      />
      {query && (
        <div className="absolute bg-white border rounded-lg shadow-lg mt-10 w-full max-w-xs z-20">
          {isLoading ? (
            <p className="p-2 text-sm text-gray-500">Loading...</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <div
                key={product._id}
                className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {product.name}
              </div>
            ))
          ) : (
            <p className="p-2 text-sm text-gray-500">No results found</p>
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
