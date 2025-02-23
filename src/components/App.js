import React, { useState } from "react";
import "../styles/App.css";

const API_KEY = "99eb9fd1"; // Replace with your actual OMDb API Key

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError(""); // Clear error
      } else {
        setMovies([]);
        setError("Invalid movie name. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>🎬 Search Movie</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="search-bar"
        />
        <button onClick={fetchMovies} data-testid="search-button">
          Search
        </button>
      </div>

      {error && <p className="error" data-testid="error-message">{error}</p>}

      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card" data-testid="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title} ({movie.Year})</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
