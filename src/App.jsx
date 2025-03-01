import React, { useState } from 'react';
import { fetchMovies } from './service/api';
import MoviesGrid from './components/MoviesGrid';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState({ query: '', year: '', type: '' });

  const handleSearch = async (e) => {
    e.preventDefault();

    if (
      query === lastQuery.query &&
      year === lastQuery.year &&
      type === lastQuery.type
    ) {
      console.log('Búsqueda duplicada, no se ejecuta la petición');
      return;
    }
    setLastQuery({ query, year, type });

    try {
      const data = await fetchMovies({ query, year, type });
      if (data.Response === "True") {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        const customError =
          data.Error === "Incorrect IMDb ID."
            ? "El identificador IMDb ingresado no es válido. Por favor, revisa la búsqueda."
            : data.Error === "Too many results."
              ? "Se encontraron demasiados resultados. Por favor, refina tu búsqueda."
              : data.Error;
        setError(customError);
      }
    } catch (err) {
      console.error('Error al obtener los datos:', err);
      setError('Error al obtener los datos');
    }


  };

  return (
    <div className="App">
      <h1>Buscador de Películas</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Nombre de la película"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input
          type="text"
          placeholder="Año (opcional)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tipo (movie, series, game)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <MoviesGrid movies={movies} />
    </div>
  );
}

export default App;
