import { NavLink } from "react-router";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export default function MovieCard({ movie, onClick }) {
  const {
    id,
    title = "Untitled",
    poster_path = null,
    vote_average = null,
    release_date = "",
    overview,
  } = movie || {};
  return (
    <article
      className="group max-w-xs bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden transform hover:scale-[1.02] transition-transform duration-200"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="w-full">
        {poster_path ? (
          <img
            src={`${IMAGE_BASE}${poster_path}`}
            alt={title}
            loading="lazy"
            className="w-full h-[300px] object-cover object-center block"
          />
        ) : (
          <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-semibold line-clamp-2 text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {release_date}
            </p>
          </div>

          <div className="flex-shrink-0 ml-2">
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.377 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.55 2.703c-.785.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.46 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
              </svg>
              <span>{vote_average ? vote_average.toFixed(1) : "--"}</span>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {overview || "No overview available."}
        </p>

        <div className="flex justify-between items-center mt-2">
          <button className="text-xs sm:text-sm px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm">
            <NavLink to={`${id}`} end>
              View
            </NavLink>
          </button>

          <a
            href={`https://www.themoviedb.org/search?query=${encodeURIComponent(
              title,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            TMDB
          </a>
        </div>
      </div>
    </article>
  );
}
