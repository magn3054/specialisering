import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./views/NotFound";
import "./App.css";
import DefaultPage from "./views/DefaultPage";
import Scene2 from "./views/Scene2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DefaultPage />,
      },
      {
        path: "scene2",
        element: <Scene2 />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
