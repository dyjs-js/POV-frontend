import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Users from "./routes/Users";
import NotFound from "./routes/NotFound";
import BookDetail from "./routes/BookDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "books/:bookPk",
        element: <BookDetail />,
      },
    ],
  },
]);

export default router;
