import React, { useEffect, useState } from "react";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = "99eb9fd1";

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const searchMovies = async () => {
    try {
		setErrorMessage("");
		setMovies([]);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          searchInput
        )}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setErrorMessage("Invalid movie name. Please try again.");
      }
    } catch (error) {
      setErrorMessage(`${error}An error occurred. Please try again later`);
    }
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        placeholder="Enter movie title"
      />
      <button onClick={searchMovies}>Search</button>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie" key={movie.imdbID}>
            <h2>{`${movie.Title} (${movie.Year})`}</h2>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
