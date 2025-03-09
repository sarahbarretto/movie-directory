import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const OMDB_API_URL = 'https://www.omdbapi.com/?apikey=54a9cec8';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${OMDB_API_URL}&s=${title}`);
    const data = await response.json();
    
    console.log(data.Search);
    setMovies(data.Search);
  }

  useEffect(() => { 
    searchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input placeholder="Search for a movie..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {
        movies?.length > 0 ?
          (
            <div className="container">
              {
                movies.map((movie) => {
                  return <MovieCard movie={movie} />
                })
              }
            </div>
          ):
          (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;
