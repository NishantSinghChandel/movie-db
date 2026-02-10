import { useEffect, useState } from "react";
import { useParams } from "react-router";
const apiKey = import.meta.env.VITE_TMBD_API_KEY;
export const MovieDetailPage = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    if (id) {
      getMovieById();
    }
  }, [id]);

  const getMovieById = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
    const options = {
      method: "GET",
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((detail) => {
        setMovieDetail(detail);
        console.log(detail);
      })
      .catch((err) => console.error(err));
  };

  return <div> Movie Detail Page {id}</div>;
};
