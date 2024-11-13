import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

const SearchBar = ({ query, setQuery, suggestions, isLoading, error }) => {
  const navigate = useNavigate();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(true); // état pour afficher/cacher les suggestions
  const searchBarRef = useRef(null); // Référence au conteneur de la barre de recherche

  // Détecter les clics à l'extérieur de la barre de recherche
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSuggestionsVisible(false); // Masquer les suggestions si clic à l'extérieur
      }
    };

    // Ajouter un écouteur de clic global
    document.addEventListener('mousedown', handleClickOutside);

    // Nettoyer l'écouteur lors du démontage du composant
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Utilisation du debounce uniquement sur la logique de mise à jour de l'URL
    const debouncedSetQuery = debounce((query) => {
      setDebouncedQuery(query);
    }, 500);

    // On applique le debounce lorsque query change
    debouncedSetQuery(query);

    // Nettoyage du debounce au cas où le composant est démonté
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${debouncedQuery}`);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value); // Cette fonction met à jour immédiatement la query
    setSuggestionsVisible(true); // Afficher les suggestions lorsque l'utilisateur tape
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex lg:flex-1 lg:justify-center relative"
      ref={searchBarRef} // Associer la référence au conteneur de la barre de recherche
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}  // Directement sur la saisie sans debounce
        className="border rounded-lg px-3 py-2 text-sm w-full max-w-xs"
        aria-label="Search"
      />
      {query && isSuggestionsVisible && (
        <div className="absolute bg-white border rounded-lg shadow-lg mt-10 w-full max-w-xs z-20">
          {isLoading ? (
            <p className="p-2 text-sm text-gray-500">Loading...</p>
          ) : error ? (
            <p className="p-2 text-sm text-red-500">Something went wrong!</p>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <div
                key={product._id}
                className="p-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/search?q=${product.name}`)}
                role="option"
                aria-selected="false"
                aria-label={`Go to ${product.name}`}
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
