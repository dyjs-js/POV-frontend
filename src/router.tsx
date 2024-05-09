import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import Users from "./routes/Users";
import NotFound from "./routes/NotFound";
import BookDetail from "./routes/BookDetail";
import MyPage from "./routes/MyPage";
import UploadReview from "./routes/UploadReview";
import UploadPhotos from "./routes/UploadPhotos";
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
        path: "books/mypage",
        element: <MyPage />,
      },

      {
        path: "books/upload",
        element: <UploadReview />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "books/:bookPk",
        element: <BookDetail />,
      },
      {
        path: "books/:bookPk/photos",
        element: <UploadPhotos />,
      },
    ],
  },
]);

export default router;
