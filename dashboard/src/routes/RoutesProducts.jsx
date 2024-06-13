import DetailProduct from "../pages/DetailProduct";
import Products from "../pages/Products";

export const routesProducts = [
  {
    path: "/productos",
    element: <Products />,
  },
  {
    path: "/productos/:id",
    element: <DetailProduct />
  },
]