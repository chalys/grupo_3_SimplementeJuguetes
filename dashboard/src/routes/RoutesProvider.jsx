import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../pages/Root";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import { routesProducts } from "./RoutesProducts";
import { routesUsers } from "./RoutesUsers";
import { routesCategories }from "./RoutesCategories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      ...routesProducts,
      ...routesCategories,
      ...routesUsers,
      {
        path: "/ordenes",
        element: <Orders />,
      },
    ],
  },
]);

export const RouterProvider_ = () => <RouterProvider router={router} />;
