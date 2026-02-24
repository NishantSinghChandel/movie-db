import { useEffect, useState } from "react";
import MovieCard from "../cards/MovieCard";

const apiKey = import.meta.env.VITE_TMBD_API_KEY;

export default function TrendingVideos() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies();
  }, []);

  function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const options = {
      method: "GET",
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <h1>Trending Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
