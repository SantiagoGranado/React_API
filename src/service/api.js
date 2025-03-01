const API_KEY = '2589436';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async ({ query, year, type }) => {
  
  let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
  if (year) {
    url += `&y=${year}`;
  }
  if (type) {
    url += `&type=${type}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
