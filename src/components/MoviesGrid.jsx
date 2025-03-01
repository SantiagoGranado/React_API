import React from 'react';

const MoviesGrid = ({ movies }) => {
  return (
    <div className="grid">
      {movies.map(movie => (
        <div key={movie.imdbID} className="card">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : 'https://picsum.photos/200/300'}
            alt={movie.Title}
          />
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MoviesGrid;
