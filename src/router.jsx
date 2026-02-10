import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import { MovieDetailPage } from "./pages/movie-detail.jsx";

export const router = createBrowserRouter([
  {
    path: "/movie-db/",
    element: <App />,
  },
  {
    path: `/movie-db/:id`,
    element: <MovieDetailPage />,
  },
  { path: "*", element: <div>Page Not Found</div> },
]);
