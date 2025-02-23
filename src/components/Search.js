import React, { useState } from "react";

export default function Search() {
  const [movie, setMovie] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setMovie(e.target.value);
  };

  const handleFetch = (e) => {
    e.preventDefault();

    if (!movie.trim()) {
      setError("Please enter a movie name.");
      setData([]);
      return;
    }

    fetch(`https://www.omdbapi.com/?apikey=99eb9fd1&s=${movie}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.Response === "False") {
          setError("Invalid movie name. Please try again.");
          setData([]);
        } else {
          setData(res.Search || []); // Ensure it's always an array
          setError("");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Something went wrong. Please try again.");
        setData([]);
      });
  };

  return (
    <div>
      <form onSubmit={handleFetch}>
        <input
          type="text"
          value={movie}
          onChange={handleChange}
          placeholder="Enter movie name..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {data.length > 0 && (
        <ul>
          {data.map((movie) => (
            <li key={movie.imdbID}>
              <h2>{movie.Title}</h2>
              <img src={movie.Poster} alt={movie.Title} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
