import { useEffect, useState } from "react";
import { useParams } from "react-router";
const apiKey = import.meta.env.VITE_TMBD_API_KEY;
import {
  formatCurrency,
  formatReadableDate,
  formatMinutes,
} from "../utils/format";
export const MovieDetailPage = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [similarMoviesList, setSimilarMoviesList] = useState([]);
  const [castList, setCastList] = useState([]);
  const {
    poster_path,
    title,
    overview,
    runtime,
    vote_average,
    release_date,
    genres,
    budget,
    spoken_languages,
    revenue,
    status,
  } = movieDetail;

  useEffect(() => {
    if (id) {
      getMovieById();
      getSimilarMoviesById();
      getCreditsByMovieId();
    }
  }, [id]);

  const getCreditsByMovieId = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
    const options = {
      method: "GET",
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(({ cast }) => {
        setCastList(cast);
        console.log(cast);
      })
      .catch((err) => console.error(err));
  };

  const getSimilarMoviesById = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`;
    const options = {
      method: "GET",
    };

    fetch(url, options)
      .then((res) => res.json())
      .then(({ results }) => {
        setSimilarMoviesList(results);
      })
      .catch((err) => console.error(err));
  };

  const getMovieById = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    const options = {
      method: "GET",
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((detail) => {
        setMovieDetail(detail);
      })
      .catch((err) => console.error(err));
  };

  if (!Object.keys(movieDetail).length) return null;

  return (
    <div className="bg-gradient-to-b from-blue-950 via-blue-900 to-black min-h-screen text-white">
      {/* Hero Section */}
      <div
        className="relative h-[75vh] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${poster_path}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>

          <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-white text-xs">
              {vote_average.toFixed()} ⭐
            </span>
            <span>{new Date(release_date).getFullYear()}</span>
            <span>{formatMinutes(runtime)}</span>
            {genres.map((genre) => (
              <span key={genre.id} className="border px-2 py-1 rounded text-xs">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-gray-300 mb-6">{overview}</p>

          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold">
              ▶ Play
            </button>
            <button className="bg-gray-700/70 hover:bg-gray-600 transition px-6 py-3 rounded-lg font-semibold">
              + My List
            </button>
          </div>
        </div>
      </div>

      {/* Movie Details Section */}
      <div className="px-8 md:px-16 py-10 grid md:grid-cols-3 gap-10">
        {/* Left Info */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed mb-6">{overview}</p>

          <h3 className="text-xl font-semibold mb-3">Cast</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {castList.map(({ name, profile_path }, index) => (
              <div
                key={index}
                className="min-w-[120px] bg-blue-800/40 p-3 rounded-lg text-center hover:bg-blue-700 transition"
              >
                <div
                  style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original/${profile_path}')`,
                  }}
                  className="w-16 h-16 mx-auto rounded-full bg-cover bg-start mb-2"
                ></div>
                <p className="text-sm">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Info Card */}
        <div className="bg-blue-900/60 p-6 rounded-xl shadow-lg backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-4">Movie Info</h3>

          <div className="space-y-3 text-gray-300 text-sm">
            <p>
              <span className="font-semibold text-white">Release Date:</span>{" "}
              {formatReadableDate(release_date)}
            </p>
            <p>
              <span className="font-semibold text-white">Language:</span>{" "}
              {spoken_languages.map((lang) => (
                <span key={lang.name}>{lang.name}</span>
              ))}
            </p>
            <p>
              <span className="font-semibold text-white">Budget:</span> $
              {formatCurrency(budget)}
            </p>
            <p>
              <span className="font-semibold text-white">Revenue:</span> $
              {formatCurrency(revenue)}
            </p>
            <p>
              <span className="font-semibold text-white">Status:</span> {status}
            </p>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="px-8 md:px-16 pb-16">
        <h2 className="text-2xl font-semibold mb-6">More Like This</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {similarMoviesList.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="bg-blue-800/40 rounded-lg overflow-hidden hover:scale-105 hover:bg-blue-700 transition duration-300"
            >
              <div
                className="h-52 bg-gray-600 bg-cover bg-start no-repeat"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original/${item.poster_path}')`,
                }}
              ></div>
              <div className="p-3">
                <h4 className="text-sm font-semibold">{item.title}</h4>
                <p className="text-xs text-gray-400">
                  {new Date(item.release_date).getFullYear()}
                  {item.vote_average > 0
                    ? ` • ${item.vote_average.toFixed()}⭐`
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
